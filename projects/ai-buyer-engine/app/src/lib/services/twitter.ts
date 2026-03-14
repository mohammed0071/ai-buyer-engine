// ============================================================
// X/Twitter API Service
// ============================================================
// 
// REQUIRED API KEYS (set in .env.local):
//   X_API_KEY         - Consumer API key
//   X_API_SECRET      - Consumer API secret
//   X_BEARER_TOKEN    - Bearer token for read-only access
//   X_ACCESS_TOKEN    - OAuth 1.0a access token (for write actions)
//   X_ACCESS_TOKEN_SECRET - OAuth 1.0a access token secret
//
// API TIER NEEDED:
//   - Basic ($100/mo): Search tweets, read timelines, post tweets
//   - Pro ($5,000/mo): Full archive search, higher rate limits
//
// HOW TO GET KEYS:
//   1. Go to developer.x.com
//   2. Create a project & app
//   3. Set app permissions to Read+Write+DM
//   4. Generate consumer keys and access tokens
//   5. Copy them to .env.local
// ============================================================

const X_API_BASE = 'https://api.twitter.com/2';

interface TwitterConfig {
  bearerToken: string;
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessTokenSecret: string;
}

function getConfig(): TwitterConfig | null {
  const bearerToken = process.env.X_BEARER_TOKEN;
  if (!bearerToken || bearerToken === 'placeholder') return null;
  return {
    bearerToken,
    apiKey: process.env.X_API_KEY || '',
    apiSecret: process.env.X_API_SECRET || '',
    accessToken: process.env.X_ACCESS_TOKEN || '',
    accessTokenSecret: process.env.X_ACCESS_TOKEN_SECRET || '',
  };
}

export function isTwitterConfigured(): boolean {
  return getConfig() !== null;
}

// Use mock mode when API not configured
const MOCK_MODE = !isTwitterConfigured();

async function twitterFetch(path: string, options: RequestInit = {}) {
  const config = getConfig();
  if (!config) throw new Error('Twitter API not configured');

  const res = await fetch(`${X_API_BASE}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${config.bearerToken}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Twitter API error ${res.status}: ${text}`);
  }

  return res.json();
}

// ---- Search ----

export async function searchTweets(query: string, maxResults: number = 10) {
  if (MOCK_MODE) {
    return {
      mock: true,
      data: [],
      message: 'Twitter API not configured. Using signal engine simulation instead.',
    };
  }

  return twitterFetch(
    `/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=${maxResults}&tweet.fields=created_at,author_id,public_metrics&expansions=author_id&user.fields=name,username,description,public_metrics,location`
  );
}

// ---- User Lookup ----

export async function getUserByUsername(username: string) {
  if (MOCK_MODE) return { mock: true, data: null };

  return twitterFetch(
    `/users/by/username/${username}?user.fields=name,username,description,public_metrics,location,created_at`
  );
}

export async function getUserTimeline(userId: string, maxResults: number = 10) {
  if (MOCK_MODE) return { mock: true, data: [] };

  return twitterFetch(
    `/users/${userId}/tweets?max_results=${maxResults}&tweet.fields=created_at,public_metrics`
  );
}

// ---- Engagement (requires OAuth 1.0a) ----

export async function likeTweet(tweetId: string) {
  if (MOCK_MODE) return { mock: true, success: true, action: 'like' };
  // Note: OAuth 1.0a signing required for write operations
  // In production, use a library like twitter-api-v2
  return { todo: true, message: 'OAuth 1.0a write actions require twitter-api-v2 library' };
}

export async function followUser(userId: string) {
  if (MOCK_MODE) return { mock: true, success: true, action: 'follow' };
  return { todo: true, message: 'OAuth 1.0a write actions require twitter-api-v2 library' };
}

export async function sendDM(recipientId: string, text: string) {
  if (MOCK_MODE) return { mock: true, success: true, action: 'dm' };
  return { todo: true, message: 'OAuth 1.0a write actions require twitter-api-v2 library' };
}

// ---- Signal Detection Queries ----

export function buildSignalQueries(keywords: string[], competitors: string[]): string[] {
  const queries: string[] = [];

  // Pain point detection
  if (keywords.length > 0) {
    queries.push(`(${keywords.slice(0, 5).join(' OR ')}) (struggling OR frustrated OR looking for OR need OR help)`);
  }

  // Buying language
  queries.push('("looking for" OR "evaluating" OR "recommendations" OR "budget approved") (tool OR software OR platform) (sales OR SDR OR outbound)');

  // Competitor engagement
  if (competitors.length > 0) {
    queries.push(`(${competitors.map(c => `@${c}`).join(' OR ')}) -is:retweet`);
  }

  return queries;
}

// ---- Status Info ----

export function getTwitterStatus() {
  const configured = isTwitterConfigured();
  return {
    configured,
    mode: configured ? 'live' : 'mock',
    message: configured
      ? 'Twitter API connected. Live signal detection active.'
      : 'Twitter API not configured. Using simulated signals. Set X_BEARER_TOKEN in environment variables to enable live detection.',
    required_keys: [
      { key: 'X_API_KEY', set: !!process.env.X_API_KEY && process.env.X_API_KEY !== 'placeholder' },
      { key: 'X_API_SECRET', set: !!process.env.X_API_SECRET && process.env.X_API_SECRET !== 'placeholder' },
      { key: 'X_BEARER_TOKEN', set: !!process.env.X_BEARER_TOKEN && process.env.X_BEARER_TOKEN !== 'placeholder' },
      { key: 'X_ACCESS_TOKEN', set: !!process.env.X_ACCESS_TOKEN && process.env.X_ACCESS_TOKEN !== 'placeholder' },
      { key: 'X_ACCESS_TOKEN_SECRET', set: !!process.env.X_ACCESS_TOKEN_SECRET && process.env.X_ACCESS_TOKEN_SECRET !== 'placeholder' },
    ],
  };
}
