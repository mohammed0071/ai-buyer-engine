# LinkedIn Integration — Technical Documentation

## Current State (MVP)

The LinkedIn integration is currently in **mock/simulation mode** for demo purposes. All LinkedIn signals, prospects, conversations, and outreach actions use simulated data that mirrors what a real LinkedIn API integration would produce.

### What's Implemented (Mock Mode)

1. **LinkedIn Signal Detection** (simulated)
   - `profile_view` — Detects when someone views your profile multiple times
   - `job_change` — Detects role changes/promotions (great timing signal)
   - `linkedin_engagement` — Comments, likes, shares on relevant posts
   - `company_growth` — Hiring signals from company job postings
   - `competitor_follower` — When prospects follow competitor company pages

2. **LinkedIn Outreach** (simulated)
   - `connect` — Automated connection requests with personalized notes
   - `view` — Strategic profile views as warm-up
   - `like` — Engaging with prospect's content
   - `dm` — Follow-up DMs after connection accepted

3. **UI Integration**
   - Platform filter pills on Signals and Outreach pages (All / X Only / LinkedIn Only)
   - Platform badges on signal cards and conversation list
   - LinkedIn icon indicators throughout the dashboard
   - LinkedIn connection in Settings → Connected Accounts (Beta badge)
   - Prospect table shows both Twitter handles and LinkedIn profiles

---

## Real LinkedIn API Integration — What's Needed

### API Access

LinkedIn restricts API access significantly. You'll need one of:

1. **LinkedIn Marketing Developer Platform** (most accessible)
   - Apply at: https://developer.linkedin.com/
   - Gives access to: Organization APIs, Share APIs, UGC Posts
   - Limitations: No profile viewing data, no DM access

2. **LinkedIn Sales Navigator API** (via partnership)
   - Requires Sales Navigator Team+ subscription
   - Access to: Lead/Account search, InMail, saved leads
   - Contact LinkedIn sales team for API partnership

3. **LinkedIn Recruiter System Connect** (enterprise only)
   - For ATS/CRM integrations
   - Not suitable for outbound sales tools

### Required OAuth Scopes

```
r_liteprofile        — Basic profile info
r_emailaddress       — Email (if shared)
w_member_social      — Post on behalf of member
r_organization_social — Read company page activity
rw_organization_admin — Manage company pages
```

### API Endpoints for Signal Detection

| Signal Type | Endpoint | Access Level |
|---|---|---|
| Profile Views | Not available via API | Scraping required (risky) |
| Post Engagement | `GET /ugcPosts?author=...` | Marketing API |
| Job Changes | `GET /people/(id)?projection=...` | Basic API |
| Company Growth | `GET /organizationalEntityShareStatistics` | Marketing API |
| Competitor Activity | `GET /organizationPageStatistics` | Marketing API |

### Outreach Automation

⚠️ **LinkedIn actively discourages automation**. Options:

1. **InMail via Sales Navigator API** — Legitimate but requires partnership
2. **Connection Requests** — No official API; requires browser automation
3. **Messaging API** — Only available for verified apps with special approval

### Recommended Architecture for Production

```
┌─────────────────────────────────────────────┐
│  LinkedIn Integration Service               │
│                                             │
│  ┌─────────┐  ┌───────────┐  ┌──────────┐  │
│  │ Webhook  │  │  Polling   │  │ Browser  │  │
│  │ Listener │  │  Service   │  │ Automator│  │
│  └────┬─────┘  └─────┬─────┘  └────┬─────┘  │
│       │              │              │        │
│       └──────────────┼──────────────┘        │
│                      │                       │
│              ┌───────▼──────┐                │
│              │ Signal Queue │                │
│              └───────┬──────┘                │
│                      │                       │
│              ┌───────▼──────┐                │
│              │  AI Scoring  │                │
│              └───────┬──────┘                │
│                      │                       │
│              ┌───────▼──────┐                │
│              │ Action Queue │                │
│              └──────────────┘                │
└─────────────────────────────────────────────┘
```

### Rate Limits

- **Marketing API**: 100 requests per day per app per member
- **Basic API**: 100,000 requests per day
- **UGC Posts**: 25 requests per minute

### Compliance Considerations

- LinkedIn TOS prohibits scraping and unauthorized automation
- Must use official APIs or get explicit partnership approval
- GDPR/CCPA compliance for storing LinkedIn profile data
- Implement data retention policies for LinkedIn-sourced signals

### Third-Party Alternatives

Instead of direct LinkedIn API, consider:

1. **Phantombuster** — LinkedIn automation with API access
2. **ProxyCurl** — LinkedIn data enrichment API
3. **Apollo.io** — Combined LinkedIn + email enrichment
4. **Snov.io** — LinkedIn prospecting tools
5. **Unipile** — Unified LinkedIn + messaging API

These provide easier access but add cost and another dependency.

---

## Migration Path: Mock → Real

1. Create `/src/lib/linkedin/` module with interface matching mock data shapes
2. Implement `LinkedInSignalProvider` that implements `SignalProvider` interface
3. Add OAuth flow for LinkedIn account connection
4. Replace mock data references with API calls behind feature flag
5. Add webhook handlers for real-time signal detection
6. Implement rate limiting and retry logic
7. Add LinkedIn-specific error handling and fallbacks
