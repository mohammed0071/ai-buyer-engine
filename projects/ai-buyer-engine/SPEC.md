# AI Buyer Engine — Product Specification

> **Version:** 1.0 (Draft)
> **Date:** 2026-03-14
> **Status:** Pre-Development
> **Comparable Product:** [AutoReach](https://autoreach.tech)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Positioning & Target Market](#2-product-positioning--target-market)
3. [Core Features](#3-core-features)
4. [Technical Architecture](#4-technical-architecture)
5. [Data Flows](#5-data-flows)
6. [Integrations](#6-integrations)
7. [MVP Scope vs Future Phases](#7-mvp-scope-vs-future-phases)
8. [Revenue Model](#8-revenue-model)
9. [Competitive Landscape](#9-competitive-landscape)
10. [Risk Analysis](#10-risk-analysis)
11. [Success Metrics](#11-success-metrics)

---

## 1. Executive Summary

The **AI Buyer Engine** is a B2B SaaS platform that detects in-market buyers through real-time signal intelligence across LinkedIn and X (Twitter), then automatically executes personalized outreach and books qualified meetings — all on autopilot.

### The Problem

- SDRs spend 3+ hours daily on manual prospecting with diminishing returns
- Traditional outbound is spray-and-pray — low conversion, high burnout
- Buying intent signals are scattered across platforms and impossible to track manually
- The window to reach a buyer at peak intent is narrow; most teams miss it

### The Solution

An AI-powered system that:
1. **Detects** real-time buyer intent signals across LinkedIn and X
2. **Qualifies** prospects against your ICP automatically
3. **Engages** with contextual, personalized warm-up interactions
4. **Converts** warm prospects into booked meetings via intelligent DM conversations
5. **Books** meetings directly into the sales team's calendar

### Market Context

- AI SDR market: $4.12B (2025) → projected $15.01B by 2030
- 82% of organizations plan AI agent integration within 1-3 years
- AI-equipped sellers are 3.7x more likely to hit quota (Gartner)
- Signal-driven outbound consistently outperforms volume-based approaches

---

## 2. Product Positioning & Target Market

### Positioning Statement

> For B2B sales teams and agencies who are tired of cold outreach that doesn't convert, the AI Buyer Engine is a signal-driven sales automation platform that detects buyers showing intent right now and engages them at the perfect moment — delivering qualified meetings on autopilot.

### Key Differentiators

| Feature | Traditional Outbound | Generic AI SDR | AI Buyer Engine |
|---|---|---|---|
| Targeting | Static lists | Enriched lists | Real-time intent signals |
| Timing | Random | Scheduled sequences | Signal-triggered (moment of intent) |
| Channels | Email/LinkedIn | Email/LinkedIn | LinkedIn + X + Email |
| Warm-up | None | Template sequences | AI-driven engagement layer |
| Personalization | Mail merge | AI-generated | Context-aware (activity + signals) |
| Meeting Booking | Manual | Semi-automated | Fully autonomous |

### Target Market

#### Primary: B2B SaaS Companies (10-200 employees)

- **Who:** VP Sales, Head of Growth, Revenue Operations leaders
- **Pain:** Can't afford large SDR teams but need predictable pipeline
- **Budget:** $500-$5,000/month on sales tools
- **Decision cycle:** 2-4 weeks

#### Secondary: Sales Agencies & Consultants

- **Who:** Agency owners running outbound for multiple clients
- **Pain:** Need scalable, repeatable client delivery
- **Budget:** $1,000-$10,000/month (multi-client)
- **Decision cycle:** 1-2 weeks

#### Tertiary: Solo Founders & Small Teams

- **Who:** Bootstrapped founders doing their own sales
- **Pain:** No time for manual prospecting
- **Budget:** $100-$500/month
- **Decision cycle:** Instant to 1 week

### Total Addressable Market (TAM)

- ~300,000 B2B SaaS companies globally (10-200 employees)
- ~50,000 sales agencies and consultants
- ~500,000 solo founders/small teams actively selling B2B
- **Estimated TAM:** $2.5B-$4B annually at target price points

---

## 3. Core Features

### 3.1 Signal Detection Engine

The brain of the platform. Monitors social platforms for real-time buyer intent signals.

#### Signal Types

**LinkedIn Signals:**
- Profile views on your team's profiles or competitor profiles
- Post engagement (likes, comments, shares) on industry-relevant content
- Job changes (new role = new budget, new priorities)
- Company growth signals (hiring sprees, new offices)
- Competitor follower activity
- Content consumption patterns (who's viewing what topics)
- Connection request patterns
- Group activity and discussions

**X/Twitter Signals:**
- Keyword mentions (pain points, competitor names, buying language)
- Engagement with competitor content
- Follower/following changes (following competitors, analysts)
- Sentiment shifts in posts (frustration, evaluation language)
- Reply patterns to industry thought leaders
- Hashtag tracking (#lookingfor, #recommendations, industry tags)
- Thread participation on relevant topics

**Composite Signals (cross-platform):**
- Multi-platform activity surge (active on both LinkedIn + X simultaneously)
- Topic clustering (same person discussing related pain points across platforms)
- Network proximity (connected to existing customers or champions)
- Timing patterns (increased activity = active evaluation phase)

#### Signal Scoring

Each signal gets a weighted score:

```
Signal Score = Base Weight × Recency Decay × Frequency Multiplier × ICP Match Score

Where:
- Base Weight: 1-100 based on signal strength (job change = 80, post like = 10)
- Recency Decay: exponential decay, half-life = 7 days
- Frequency Multiplier: 1.0-3.0 based on signal clustering
- ICP Match Score: 0.0-1.0 based on prospect fit
```

**Signal Tiers:**
- 🔴 **Hot (80-100):** Immediate outreach triggered
- 🟡 **Warm (40-79):** Engagement layer activated
- 🟢 **Watching (10-39):** Monitoring, added to nurture
- ⚪ **Noise (<10):** Filtered out

### 3.2 AI Outreach Engine

Handles the entire outreach lifecycle from warm-up to meeting request.

#### Warm-Up Layer

Before any direct outreach, the system builds familiarity:

1. **Passive Warm-Up (Days 1-3)**
   - Like relevant posts
   - View LinkedIn profile
   - Follow on X
   - Engage with their content (thoughtful replies, not generic)

2. **Active Warm-Up (Days 3-7)**
   - Comment on posts with genuine value-add insights
   - Share their content with added commentary
   - Respond to X threads they participate in
   - React to LinkedIn articles

3. **Direct Engagement (Day 7+)**
   - Personalized connection request (LinkedIn) or DM (X)
   - Reference shared interests, mutual connections, or their recent activity
   - Open with value, not pitch

#### Message Generation

All messages are AI-generated using:

- **Prospect Context:** Bio, role, company, recent posts, engagement history
- **Signal Context:** What triggered the outreach, timing relevance
- **ICP Mapping:** Specific pain points for their segment
- **Tone Matching:** Analyze prospect's communication style and mirror it
- **A/B Framework:** Multiple variants tested and optimized per segment

#### Conversation Management

The AI handles multi-turn DM conversations:

- **Objection handling:** Pre-trained on common objections with adaptive responses
- **Qualification:** Asks qualifying questions naturally within conversation
- **Escalation:** Hands off to human when conversation requires it
- **Persistence:** Follows up at intelligent intervals (not annoying, not forgotten)
- **Context memory:** Remembers previous interactions across channels

### 3.3 Meeting Booking Automation

#### Calendar Integration

- Connects to Google Calendar, Outlook, Calendly, Cal.com, HubSpot Meetings
- Real-time availability checking
- Time zone detection and conversion
- Buffer time enforcement between meetings
- Meeting type routing (discovery vs demo vs follow-up)

#### Booking Flow

```
Prospect shows interest in DM
    → AI confirms interest and suggests times
    → Sends calendar link or proposes specific slots
    → Prospect selects time
    → Confirmation sent to both parties
    → Reminder sequence activated (24h, 1h, 15min)
    → Pre-meeting brief generated for sales rep
```

#### Pre-Meeting Intelligence Brief

Auto-generated document for the sales rep including:
- Prospect's LinkedIn profile summary
- Recent social activity and interests
- Signal that triggered outreach
- Conversation history
- Company intel (size, funding, tech stack)
- Suggested talking points and pain points
- Mutual connections

### 3.4 Dashboard & Analytics

#### Real-Time Signal Feed

- Live stream of detected signals across all monitored accounts
- Filterable by signal type, score, platform, segment
- One-click actions: engage, outreach, dismiss, snooze

#### Pipeline View

- Prospects organized by stage: Detected → Warming → Engaged → Booking → Booked
- Conversion rates at each stage
- Average time-to-meeting
- Revenue attribution (when CRM connected)

#### Performance Analytics

- Signals detected per day/week/month
- Outreach volume and response rates
- Meeting booking rate
- Show rate
- Message variant performance (A/B results)
- Best-performing signal types
- Optimal outreach timing heatmaps

### 3.5 ICP Configuration

#### Profile Builder

- Define ideal customer profiles with weighted criteria
- Industry, company size, role, seniority, geography, tech stack
- Negative filters (exclude competitors, existing customers, disqualified)
- Import from CRM or CSV

#### Target Account Lists

- Upload specific account lists to monitor
- Competitor follower tracking (monitor who follows your competitors)
- Look-alike audience generation from best customers

---

## 4. Technical Architecture

### 4.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Web App      │  │  Chrome Ext  │  │  GHL Widget      │  │
│  │  (React/Next) │  │  (Optional)  │  │  (Embedded)      │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘  │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                       API GATEWAY                           │
│              (Kong / AWS API Gateway / Nginx)               │
│         Auth (JWT) | Rate Limiting | Request Routing        │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────────┐
│  Core API    │ │  Signal      │ │  Outreach        │
│  Service     │ │  Service     │ │  Service         │
│  (Node/Py)   │ │  (Python)    │ │  (Python/Node)   │
└──────┬───────┘ └──────┬───────┘ └──────┬───────────┘
       │                │                │
       ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────────┐
│  AI/LLM      │ │  Data        │ │  Job Queue       │
│  Service     │ │  Pipeline    │ │  (BullMQ/Celery)  │
│  (Python)    │ │  (Python)    │ │                   │
└──────┬───────┘ └──────┬───────┘ └──────┬───────────┘
       │                │                │
       ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATA LAYER                              │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌─────────┐  │
│  │ PostgreSQL │ │   Redis    │ │ClickHouse/ │ │  S3/R2  │  │
│  │ (Primary)  │ │ (Cache +   │ │ TimescaleDB│ │ (Files) │  │
│  │            │ │  Queues)   │ │ (Analytics)│ │         │  │
│  └────────────┘ └────────────┘ └────────────┘ └─────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Service Breakdown

#### Core API Service

- **Tech:** Node.js (Fastify/Express) or Python (FastAPI)
- **Responsibilities:** User management, workspace/team management, billing, ICP configuration, API endpoints for frontend
- **Database:** PostgreSQL (users, workspaces, settings, prospects, conversations)

#### Signal Detection Service

- **Tech:** Python (async)
- **Responsibilities:** Platform monitoring, signal detection, scoring, deduplication
- **Components:**
  - **Platform Scrapers/API Clients:** LinkedIn, X/Twitter data collection
  - **Signal Processor:** Pattern matching, NLP analysis, scoring engine
  - **Deduplication Engine:** Cross-platform identity resolution
  - **Signal Store:** Time-series storage for signal history

#### Outreach Service

- **Tech:** Python or Node.js
- **Responsibilities:** Message generation, conversation management, scheduling, warm-up orchestration
- **Components:**
  - **Message Generator:** LLM-powered personalized message creation
  - **Conversation Manager:** Multi-turn conversation state machine
  - **Scheduler:** Timing optimization, rate limiting, platform compliance
  - **Action Executor:** Platform-specific action execution (likes, comments, DMs)

#### AI/LLM Service

- **Tech:** Python
- **Responsibilities:** Centralized LLM interactions, prompt management, fine-tuning
- **Models:**
  - **Primary:** Claude/GPT-4 for conversation and message generation
  - **Fast:** Claude Haiku/GPT-4o-mini for classification and scoring
  - **Embeddings:** text-embedding-3-small for semantic matching
- **Features:**
  - Prompt versioning and A/B testing
  - Response quality monitoring
  - Token usage tracking and optimization
  - Fallback chain (primary → secondary → cached response)

#### Job Queue / Worker System

- **Tech:** BullMQ (Node.js) or Celery (Python)
- **Job Types:**
  - `signal.scan` — Periodic platform scanning
  - `signal.process` — Score and classify detected signals
  - `outreach.warmup` — Execute warm-up actions
  - `outreach.message` — Send outreach messages
  - `outreach.followup` — Schedule and send follow-ups
  - `meeting.book` — Calendar booking flow
  - `meeting.remind` — Send meeting reminders
  - `analytics.aggregate` — Roll up analytics data
- **Features:**
  - Priority queues (hot signals jump the queue)
  - Rate limiting per platform per account
  - Retry with exponential backoff
  - Dead letter queue for failed jobs

### 4.3 Data Models (Key Entities)

```sql
-- Core Entities
Workspace {
  id, name, plan, settings_json, created_at
}

User {
  id, workspace_id, email, role, connected_accounts_json
}

ICP {
  id, workspace_id, name, criteria_json, negative_filters_json, is_active
}

-- Prospect Pipeline
Prospect {
  id, workspace_id, 
  linkedin_url, twitter_handle, email,
  name, title, company, industry, location,
  enrichment_data_json,
  icp_match_score, signal_score, stage,
  first_signal_at, last_signal_at,
  created_at, updated_at
}

Signal {
  id, prospect_id, workspace_id,
  platform (linkedin|twitter|composite),
  signal_type, raw_data_json,
  score, triggered_action,
  detected_at
}

-- Outreach
Conversation {
  id, prospect_id, workspace_id,
  platform, status (warming|active|booked|stalled|dead),
  messages_json, context_json,
  started_at, last_message_at
}

OutreachAction {
  id, conversation_id, prospect_id,
  action_type (like|comment|view|dm|follow|connect),
  platform, content, status,
  scheduled_at, executed_at
}

-- Meetings
Meeting {
  id, prospect_id, workspace_id,
  calendar_event_id, meeting_type,
  scheduled_at, duration_min,
  status (scheduled|confirmed|completed|no_show|cancelled),
  pre_meeting_brief_json,
  booked_at
}

-- Analytics
DailyMetrics {
  workspace_id, date,
  signals_detected, outreach_sent, responses_received,
  meetings_booked, meetings_completed, show_rate
}
```

### 4.4 Infrastructure

#### Recommended Stack (Cloud-Native)

| Component | Service | Why |
|---|---|---|
| Compute | AWS ECS/Fargate or Railway | Auto-scaling, no server management |
| Database | Supabase (PostgreSQL) or AWS RDS | Managed, reliable, real-time subscriptions |
| Cache/Queue | Upstash Redis or AWS ElastiCache | Serverless-friendly, low latency |
| Analytics DB | ClickHouse Cloud or TimescaleDB | Time-series optimized for signal data |
| Object Storage | Cloudflare R2 or AWS S3 | Cost-effective for enrichment data |
| CDN | Cloudflare | Global edge, DDoS protection |
| Monitoring | Datadog or Grafana Cloud | Full observability |
| CI/CD | GitHub Actions | Standard, integrated |

#### Scaling Considerations

- **Signal scanning:** Horizontally scalable workers, partitioned by workspace
- **Rate limits:** Per-platform rate limit pools shared across workers
- **Data growth:** ~1000 signals/day per active workspace → partition by workspace + month
- **LLM costs:** Token budgets per workspace, cached responses for common patterns

---

## 5. Data Flows

### 5.1 Signal Detection Flow

```
┌──────────────────────────────────────────────────────────┐
│                    SIGNAL DETECTION                       │
│                                                          │
│  Scheduler (cron)                                        │
│       │                                                  │
│       ▼                                                  │
│  ┌─────────────┐    ┌──────────────┐   ┌─────────────┐  │
│  │ LinkedIn    │    │ X/Twitter    │   │ Third-party │  │
│  │ Scanner     │    │ Scanner      │   │ Data APIs   │  │
│  │             │    │              │   │ (enrichment)│  │
│  └──────┬──────┘    └──────┬───────┘   └──────┬──────┘  │
│         │                  │                  │          │
│         ▼                  ▼                  ▼          │
│  ┌──────────────────────────────────────────────────┐    │
│  │           Raw Signal Queue (Redis)               │    │
│  └──────────────────────┬───────────────────────────┘    │
│                         │                                │
│                         ▼                                │
│  ┌──────────────────────────────────────────────────┐    │
│  │         Signal Processing Pipeline               │    │
│  │  1. Deduplicate (cross-platform identity)        │    │
│  │  2. Enrich (company data, role, seniority)       │    │
│  │  3. Score (ICP match × signal strength)          │    │
│  │  4. Classify (hot / warm / watching / noise)     │    │
│  │  5. Route (trigger action or store)              │    │
│  └──────────────────────┬───────────────────────────┘    │
│                         │                                │
│              ┌──────────┼──────────┐                     │
│              ▼          ▼          ▼                     │
│         [Hot]      [Warm]     [Watching]                 │
│           │          │            │                      │
│           ▼          ▼            ▼                      │
│      Outreach    Warm-up      Signal                    │
│      Queue       Queue        Store                     │
└──────────────────────────────────────────────────────────┘
```

### 5.2 Outreach Execution Flow

```
┌──────────────────────────────────────────────────────────┐
│                  OUTREACH EXECUTION                       │
│                                                          │
│  Signal Trigger / Scheduled Task                         │
│       │                                                  │
│       ▼                                                  │
│  ┌─────────────────────────────────┐                     │
│  │   Prospect Context Assembly     │                     │
│  │   - Profile data                │                     │
│  │   - Signal history              │                     │
│  │   - Previous interactions       │                     │
│  │   - ICP mapping                 │                     │
│  └──────────────┬──────────────────┘                     │
│                 │                                        │
│                 ▼                                        │
│  ┌─────────────────────────────────┐                     │
│  │   AI Message Generation         │                     │
│  │   - Select message template     │                     │
│  │   - LLM personalization         │                     │
│  │   - Tone matching               │                     │
│  │   - Compliance check            │                     │
│  └──────────────┬──────────────────┘                     │
│                 │                                        │
│                 ▼                                        │
│  ┌─────────────────────────────────┐                     │
│  │   Rate Limiter & Scheduler      │                     │
│  │   - Platform daily limits       │                     │
│  │   - Optimal send time           │                     │
│  │   - Human-like timing jitter    │                     │
│  └──────────────┬──────────────────┘                     │
│                 │                                        │
│                 ▼                                        │
│  ┌─────────────────────────────────┐                     │
│  │   Action Executor               │                     │
│  │   - LinkedIn API / browser      │                     │
│  │   - X/Twitter API               │                     │
│  │   - Email (SMTP/API)            │                     │
│  └──────────────┬──────────────────┘                     │
│                 │                                        │
│          ┌──────┼──────┐                                 │
│          ▼      ▼      ▼                                 │
│       [Sent]  [Error] [Rate Limited]                     │
│          │      │         │                              │
│          ▼      ▼         ▼                              │
│       Monitor  Retry   Requeue                           │
│       Reply    Queue   (later)                           │
└──────────────────────────────────────────────────────────┘
```

### 5.3 Meeting Booking Flow

```
Prospect replies with interest
    │
    ▼
AI Conversation Manager
    │
    ├── Qualifies fit (asks 1-2 questions)
    │
    ▼
Check calendar availability
    │
    ├── Fetch open slots from connected calendar
    ├── Apply booking rules (buffer, working hours, timezone)
    │
    ▼
Propose meeting times (in DM)
    │
    ├── Option A: Send calendar link (Calendly/Cal.com)
    ├── Option B: Propose 3 specific times inline
    │
    ▼
Prospect confirms
    │
    ▼
Create calendar event
    │
    ├── Add to rep's calendar
    ├── Send confirmation to prospect
    ├── Push to CRM (if connected)
    │
    ▼
Post-booking automation
    │
    ├── Generate pre-meeting brief
    ├── Schedule reminder sequence
    ├── Notify sales rep (Slack/email)
    └── Update pipeline stage
```

### 5.4 Data Enrichment Flow

```
New Prospect Detected
    │
    ▼
Identity Resolution
    ├── Match LinkedIn ↔ X/Twitter profiles
    ├── Find email address
    ├── Deduplicate against existing prospects
    │
    ▼
Company Enrichment
    ├── Company size, industry, revenue
    ├── Tech stack (BuiltWith/Wappalyzer)
    ├── Funding stage/recent rounds
    ├── Recent news and press
    │
    ▼
Contact Enrichment
    ├── Full name, title, seniority
    ├── Work history / tenure
    ├── Mutual connections
    ├── Content/posting history summary
    │
    ▼
ICP Scoring
    ├── Match against active ICPs
    ├── Generate fit score (0-100)
    ├── Tag with segments
    └── Store enriched profile
```

---

## 6. Integrations

### 6.1 Platform Integrations (Data Sources)

#### LinkedIn

| Method | Approach | Limitations |
|---|---|---|
| **LinkedIn Sales Navigator API** | Official API (partner program) | Expensive, restricted access, application process |
| **LinkedIn API (Marketing/Pages)** | Official — limited to company pages | No personal profile data |
| **Browser Automation (Puppeteer/Playwright)** | Scraping via headless browser | Against ToS, detection risk, rate limits |
| **Third-party Proxies** | Services like Phantombuster, Apify, Bright Data | Cost per action, varying reliability |
| **Recommended MVP:** Use PhantomBuster or similar for initial signal collection + LinkedIn cookie-based automation for actions. Migrate to official APIs as you scale and qualify for partner access. |

**LinkedIn Actions Needed:**
- View profiles
- Monitor post engagement (who liked/commented)
- Track connection requests
- Send connection requests with notes
- Send InMail / DMs
- Like and comment on posts
- Monitor job changes and company updates

#### X/Twitter

| Method | Approach | Limitations |
|---|---|---|
| **X API v2 (Basic)** | $100/month, 10K tweets/month read | Limited volume |
| **X API v2 (Pro)** | $5,000/month, 1M tweets/month read | Expensive but sufficient |
| **X API v2 (Enterprise)** | Custom pricing, full firehose | Overkill for MVP |
| **Recommended MVP:** Start with Basic tier + strategic keyword monitoring. Upgrade to Pro as customer base grows. |

**X Actions Needed:**
- Monitor keywords and hashtags (filtered stream)
- Track user timelines and engagement
- Like tweets
- Reply to tweets
- Send DMs (requires mutual following or open DMs)
- Follow/unfollow users
- Search historical tweets

### 6.2 CRM & Sales Tool Integrations

#### GoHighLevel (GHL)

- **Priority:** High (key target audience uses GHL)
- **Integration type:** REST API + Webhooks
- **Capabilities:**
  - Push new contacts/leads
  - Sync conversation history
  - Trigger GHL workflows from signals
  - Update pipeline stages
  - Sync calendar bookings
- **Implementation:** GHL Marketplace App (OAuth 2.0)

#### HubSpot

- **Priority:** High
- **Integration:** HubSpot API v3 (OAuth)
- **Sync:** Contacts, companies, deals, meetings, notes, timeline events

#### Salesforce

- **Priority:** Medium (Phase 2)
- **Integration:** REST API + Bulk API
- **Sync:** Leads, contacts, opportunities, activities, tasks

#### Pipedrive

- **Priority:** Medium (Phase 2)
- **Integration:** REST API
- **Sync:** Persons, organizations, deals, activities

### 6.3 Calendar Integrations

| Platform | Priority | Method |
|---|---|---|
| Google Calendar | High (MVP) | Google Calendar API (OAuth 2.0) |
| Calendly | High (MVP) | Calendly API v2 |
| Cal.com | Medium | Cal.com API |
| Microsoft Outlook | Medium (Phase 2) | Microsoft Graph API |
| HubSpot Meetings | Medium | HubSpot API |

### 6.4 Communication Integrations

| Platform | Priority | Purpose |
|---|---|---|
| Slack | High | Notifications, meeting alerts, signal alerts |
| Email (SMTP/SendGrid) | High | Outreach channel, notifications |
| Zapier/Make | Medium | User-defined automations |
| Webhooks | High | Generic event broadcasting |

### 6.5 Enrichment & Data Provider Integrations

| Provider | Purpose | Priority |
|---|---|---|
| Apollo.io | Contact data, email finding | High |
| Clearbit/Breeze | Company enrichment | Medium |
| Hunter.io | Email verification | Medium |
| BuiltWith/Wappalyzer | Tech stack detection | Low (Phase 2) |
| Crunchbase | Funding/company data | Low (Phase 2) |

---

## 7. MVP Scope vs Future Phases

### Phase 1: MVP (Weeks 1-8)

**Goal:** Prove the core loop works — detect signals, execute outreach, book meetings on X/Twitter.

#### In Scope

- [ ] **X/Twitter Signal Detection**
  - Keyword monitoring (pain points, competitor mentions, buying language)
  - Competitor follower tracking
  - Engagement tracking on relevant posts
  - Basic signal scoring

- [ ] **ICP Configuration**
  - Simple form-based ICP builder (industry, role, keywords)
  - Basic negative filters
  - Manual target list upload (Twitter handles)

- [ ] **AI Outreach on X**
  - Warm-up automation (likes, follows, replies)
  - AI-generated personalized DMs
  - Multi-turn conversation handling
  - Basic objection handling

- [ ] **Meeting Booking**
  - Google Calendar integration
  - Calendly link sharing in DMs
  - Meeting confirmation messages
  - Basic reminder (24h before)

- [ ] **Dashboard**
  - Signal feed (real-time)
  - Prospect pipeline view
  - Basic analytics (signals/day, messages sent, meetings booked)
  - Conversation viewer

- [ ] **Infrastructure**
  - User auth (email + Google SSO)
  - Single workspace per account
  - Stripe billing integration
  - Basic admin panel

#### Out of Scope (MVP)

- LinkedIn integration (complex, compliance risk)
- Email outreach channel
- CRM integrations (except webhook push)
- Multi-workspace / team features
- Chrome extension
- Advanced analytics / reporting
- White-labeling

#### Tech Stack (MVP)

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | Next.js 14 (App Router) + Tailwind + shadcn/ui | Fast to build, great DX |
| API | Node.js + Fastify (or Next.js API routes) | Unified stack |
| AI | OpenAI GPT-4o + Claude 3.5 Sonnet (fallback) | Best conversation quality |
| Database | Supabase (PostgreSQL + Auth + Realtime) | All-in-one, fast setup |
| Queue | BullMQ + Redis (Upstash) | Reliable, Node.js native |
| X/Twitter | X API v2 (Basic tier) | $100/mo, sufficient for MVP |
| Hosting | Vercel (frontend) + Railway (workers) | Simple deployment |
| Payments | Stripe | Industry standard |

#### MVP Success Criteria

- 10 paying beta customers
- Average 5+ meetings booked per customer per month
- Signal-to-meeting conversion rate > 2%
- Customer retention > 70% after month 2
- System uptime > 99.5%

---

### Phase 2: LinkedIn + Scale (Weeks 9-16)

- [ ] LinkedIn signal detection (profile views, post engagement, job changes)
- [ ] LinkedIn outreach automation (connection requests, DMs, engagement)
- [ ] Cross-platform identity resolution (match LinkedIn ↔ X profiles)
- [ ] Composite signal scoring (multi-platform)
- [ ] GHL integration (full bi-directional sync)
- [ ] HubSpot integration
- [ ] Email outreach channel (via connected email or SendGrid)
- [ ] Multi-step outreach sequences (LinkedIn → X → Email)
- [ ] Team features (multi-user workspaces, role-based access)
- [ ] Advanced analytics dashboard
- [ ] Slack notifications
- [ ] Pre-meeting intelligence briefs

### Phase 3: Agency & Enterprise (Weeks 17-24)

- [ ] Multi-workspace management (agency dashboard)
- [ ] White-label option (custom branding, custom domain)
- [ ] Salesforce + Pipedrive integrations
- [ ] API for custom integrations
- [ ] Webhook builder (no-code automation)
- [ ] Advanced ICP with AI-assisted refinement
- [ ] Competitor intelligence reports
- [ ] A/B testing framework for messages
- [ ] Chrome extension for manual signal tagging
- [ ] Microsoft Outlook calendar support
- [ ] SOC 2 compliance preparation
- [ ] Custom AI model fine-tuning per customer

### Phase 4: Platform & Ecosystem (Weeks 25-36)

- [ ] Marketplace for signal templates and outreach playbooks
- [ ] Third-party signal source plugins (Reddit, Discord, G2, TrustRadius)
- [ ] Predictive analytics (forecast pipeline from signals)
- [ ] AI coaching (suggests ICP refinements, message improvements)
- [ ] Revenue attribution (connect meetings to closed deals)
- [ ] Mobile app (iOS/Android) — signal alerts and conversation management
- [ ] Partner/referral program infrastructure
- [ ] Enterprise SSO (SAML/OIDC)
- [ ] Data warehouse export (Snowflake, BigQuery)

---

## 8. Revenue Model

### 8.1 Pricing Strategy

**Model:** Usage-based tiers with seat multipliers

#### Tier Structure

| Plan | Monthly Price | Targets | Annual Discount |
|---|---|---|---|
| **Starter** | $149/mo | Solo founders, small teams | $1,249/yr (30% off) |
| **Growth** | $399/mo | Growing sales teams | $3,349/yr (30% off) |
| **Scale** | $899/mo | Established teams, small agencies | $7,549/yr (30% off) |
| **Agency** | $1,999/mo | Agencies managing multiple clients | $16,790/yr (30% off) |
| **Enterprise** | Custom | Large organizations | Custom |

#### Feature Breakdown

| Feature | Starter | Growth | Scale | Agency | Enterprise |
|---|---|---|---|---|---|
| Active Prospects Monitored | 500 | 2,000 | 5,000 | 15,000 | Unlimited |
| AI Messages/month | 200 | 1,000 | 3,000 | 10,000 | Unlimited |
| Signal Sources | X only | X + LinkedIn | X + LinkedIn + Email | All | All + Custom |
| Connected Social Accounts | 1 | 3 | 5 | 20 | Unlimited |
| Workspaces | 1 | 1 | 1 | 10 | Unlimited |
| Team Members | 1 | 3 | 5 | 20 | Unlimited |
| CRM Integrations | Webhook only | GHL, HubSpot | All | All + API | All + Custom |
| Calendar Integrations | Google | Google, Calendly | All | All | All |
| Analytics | Basic | Standard | Advanced | Advanced + Export | Custom |
| Pre-Meeting Briefs | ❌ | ✅ | ✅ | ✅ | ✅ |
| White-label | ❌ | ❌ | ❌ | ✅ | ✅ |
| Support | Email | Email + Chat | Priority | Dedicated CSM | Enterprise SLA |

### 8.2 Additional Revenue Streams

#### Done-For-You (DFY) Service

- **Price:** $2,500-$5,000/month
- **Includes:** Full setup, ICP configuration, outreach management, optimization
- **Margin:** 60-70% (leveraging the platform)
- **Target:** Companies that want results without learning the tool
- **Capacity:** 10-20 clients per DFY specialist

#### Setup/Onboarding Fee

- **One-time:** $500-$1,500 depending on plan
- **Includes:** ICP workshop, platform setup, initial campaign configuration
- **Waived:** For annual plans

#### Overage Pricing

- Additional AI messages: $0.10-$0.25 per message (depending on plan)
- Additional prospects monitored: $0.05 per prospect/month
- Additional workspaces (agency): $149/workspace/month

#### Partner/Referral Program

- **Affiliates:** 20% recurring commission for 12 months
- **Agency partners:** 15% revenue share on referred clients
- **Technology partners:** Co-marketing + integration partnerships

### 8.3 Revenue Projections (Conservative)

| Month | Customers | MRR | ARR Run Rate |
|---|---|---|---|
| 3 (end MVP) | 15 | $3,500 | $42K |
| 6 | 60 | $18,000 | $216K |
| 9 | 150 | $52,000 | $624K |
| 12 | 300 | $120,000 | $1.44M |
| 18 | 600 | $280,000 | $3.36M |
| 24 | 1,200 | $600,000 | $7.2M |

**Key Assumptions:**
- Average revenue per customer: ~$350/mo (blended across plans)
- Monthly growth rate: 15-25% (typical for B2B SaaS with product-market fit)
- Churn: 5-8% monthly (improving to 3-5% by month 12)
- DFY service adds ~20% to SaaS revenue

---

## 9. Competitive Landscape

### Direct Competitors

| Competitor | Focus | Pricing | Strengths | Weaknesses |
|---|---|---|---|---|
| **AutoReach.tech** | X/LinkedIn signals + outreach | DFY model (~$2.5K+/mo) | First-mover, content marketing | DFY-heavy, less self-serve |
| **Valley (joinvalley.co)** | LinkedIn intent + AI outreach | $500-$2K/mo | Strong LinkedIn integration | LinkedIn only, no X |
| **Outreachly.ai** | LinkedIn + Email + intent | ~$300-$800/mo | Email + LinkedIn combo | Weaker signal intelligence |
| **Trigify** | Social signal detection | ~$200-$500/mo | Signal detection focus | No outreach automation |

### Adjacent Competitors

| Competitor | Focus | Threat Level |
|---|---|---|
| **Artisan (Ava)** | AI SDR (email-focused) | Medium — different channel focus |
| **11x.ai (Alice)** | AI SDR (email-focused) | Medium — email-centric |
| **Apollo.io** | Full sales platform | High — could add social signals |
| **Instantly.ai** | Cold email at scale | Low — different approach |
| **Lemlist** | Email + LinkedIn sequences | Medium — has LinkedIn, no signals |
| **HubSpot Sales Hub** | All-in-one CRM + sales | Medium — potential feature addition |

### Competitive Moat Strategy

1. **Signal Intelligence Quality:** Invest heavily in signal detection accuracy — the best signals win
2. **X/Twitter First:** Own the X outreach channel where competition is thinnest
3. **Speed to Meeting:** Fastest time from signal detection to booked meeting
4. **Cross-Platform Composite Signals:** LinkedIn + X together is stronger than either alone
5. **Agency-Friendly:** Build for agencies first — they bring volume and referrals
6. **Community & Content:** Build thought leadership around signal-driven outbound

---

## 10. Risk Analysis

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **LinkedIn blocks automation** | High | High | Use compliant approaches, rate limit aggressively, offer manual-assist mode, diversify to X-first |
| **X API pricing increases** | Medium | Medium | Cache aggressively, optimize API calls, build alternative data collection |
| **LLM cost spikes** | Low | Medium | Model fallback chain, response caching, smaller models for simple tasks |
| **Platform ToS violations** | Medium | High | Legal review, compliance-first architecture, user indemnification in ToS |
| **Data breach** | Low | Critical | SOC 2, encryption at rest + transit, minimal data retention, security audits |

### Business Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Low initial adoption** | Medium | High | Start with DFY to prove value, then convert to self-serve |
| **High churn** | Medium | High | Exceptional onboarding, quick time-to-value, proactive CSM |
| **Competitor copies features** | High | Medium | Speed of execution, community moat, data advantage |
| **LinkedIn/X add native features** | Low | High | Stay 10x better at cross-platform, add unique value layers |
| **Regulatory (GDPR, CCPA)** | Medium | Medium | Privacy-by-design, data processing agreements, consent tracking |

### Compliance & Legal

- **GDPR/CCPA:** Personal data processing requires legal basis; use "legitimate interest" for B2B prospecting with easy opt-out
- **CAN-SPAM/PECR:** Applicable if email channel is added; follow all requirements
- **Platform ToS:** LinkedIn explicitly prohibits scraping; X is more permissive via API; document compliance approach for each method
- **AI transparency:** Disclose AI-generated messages where required; some jurisdictions may require this

---

## 11. Success Metrics

### North Star Metric

**Qualified Meetings Booked Per Customer Per Month**

### Leading Indicators

| Metric | Target (MVP) | Target (Scale) |
|---|---|---|
| Signals detected per customer/day | 20+ | 100+ |
| Signal-to-engagement rate | 15%+ | 25%+ |
| Engagement-to-conversation rate | 10%+ | 20%+ |
| Conversation-to-meeting rate | 15%+ | 25%+ |
| Overall signal-to-meeting rate | >2% | >5% |
| Meetings booked per customer/month | 5+ | 20+ |
| Meeting show rate | 70%+ | 80%+ |
| Time from signal to meeting | <7 days | <4 days |

### Business Metrics

| Metric | Target (Month 6) | Target (Month 12) |
|---|---|---|
| MRR | $18K | $120K |
| Paying Customers | 60 | 300 |
| Monthly Churn | <8% | <5% |
| Net Revenue Retention | >100% | >115% |
| CAC Payback | <6 months | <4 months |
| LTV:CAC Ratio | >3:1 | >5:1 |
| NPS | >30 | >50 |

### Technical Metrics

| Metric | Target |
|---|---|
| System uptime | >99.5% |
| Signal processing latency | <30 seconds |
| Message generation latency | <5 seconds |
| API response time (p95) | <500ms |
| Failed job rate | <1% |

---

## Appendix A: User Stories (MVP)

### Signal Detection
- As a user, I can define my ICP with industry, role, company size, and keywords
- As a user, I can add competitor X handles to monitor their followers and engagers
- As a user, I can see a real-time feed of detected signals with scores
- As a user, I can filter signals by type, score, and platform
- As a user, I can dismiss irrelevant signals to improve future accuracy

### Outreach
- As a user, I can configure my outreach tone and messaging guidelines
- As a user, I can review AI-generated messages before they send (optional approval mode)
- As a user, I can set daily outreach limits per platform
- As a user, I can view all active conversations in one place
- As a user, I can take over a conversation from the AI at any point
- As a user, I can pause/resume outreach for any prospect

### Meeting Booking
- As a user, I can connect my Google Calendar for availability
- As a user, I can connect my Calendly for booking links
- As a user, I can set meeting preferences (duration, buffer, hours)
- As a user, I can receive notifications when meetings are booked
- As a user, I can see a pre-meeting brief for each booked meeting

### Analytics
- As a user, I can see how many signals were detected this week/month
- As a user, I can see my outreach pipeline with conversion rates
- As a user, I can see which signal types lead to the most meetings
- As a user, I can export my data

---

## Appendix B: API Design (Key Endpoints)

```
# Auth
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh

# Workspace
GET    /api/workspace
PATCH  /api/workspace
GET    /api/workspace/members

# ICP
GET    /api/icps
POST   /api/icps
PATCH  /api/icps/:id
DELETE /api/icps/:id

# Signals
GET    /api/signals                    # List signals (paginated, filterable)
GET    /api/signals/feed               # Real-time signal feed (SSE/WebSocket)
POST   /api/signals/:id/dismiss
POST   /api/signals/:id/action         # Trigger manual action

# Prospects
GET    /api/prospects                  # List prospects (paginated, filterable)
GET    /api/prospects/:id              # Full prospect detail + signals + conversations
POST   /api/prospects/import           # CSV/manual import
PATCH  /api/prospects/:id              # Update stage, notes
POST   /api/prospects/:id/outreach     # Manually trigger outreach

# Conversations
GET    /api/conversations              # List conversations
GET    /api/conversations/:id          # Full conversation with messages
POST   /api/conversations/:id/takeover # Human takes over from AI
POST   /api/conversations/:id/pause
POST   /api/conversations/:id/resume
POST   /api/conversations/:id/message  # Send manual message

# Meetings
GET    /api/meetings                   # List meetings
GET    /api/meetings/:id               # Meeting detail + brief
PATCH  /api/meetings/:id               # Update status

# Analytics
GET    /api/analytics/overview         # Dashboard metrics
GET    /api/analytics/signals          # Signal analytics
GET    /api/analytics/outreach         # Outreach performance
GET    /api/analytics/meetings         # Meeting analytics

# Integrations
GET    /api/integrations               # List connected integrations
POST   /api/integrations/:type/connect # OAuth flow initiation
DELETE /api/integrations/:type         # Disconnect

# Webhooks (outbound)
GET    /api/webhooks
POST   /api/webhooks
DELETE /api/webhooks/:id
```

---

## Appendix C: Prompt Architecture

### Signal Classification Prompt (Example)

```
You are a B2B buyer intent signal classifier.

Given a social media activity, classify the buyer intent level.

ICP Definition:
{icp_criteria}

Activity:
- Platform: {platform}
- User: {user_name} ({user_title} at {user_company})
- Action: {action_type}
- Content: {content}
- Context: {additional_context}

Classify as:
- HOT: Strong buying signal (actively evaluating, requesting recommendations, expressing pain)
- WARM: Moderate signal (engaging with relevant content, following competitors)
- WATCHING: Weak signal (general industry interest, passive engagement)
- NOISE: Not a buying signal

Respond with JSON:
{
  "classification": "HOT|WARM|WATCHING|NOISE",
  "confidence": 0.0-1.0,
  "reasoning": "brief explanation",
  "suggested_action": "immediate_outreach|warm_up|monitor|ignore"
}
```

### DM Generation Prompt (Example)

```
You are an expert B2B sales development representative.

Write a personalized X/Twitter DM to initiate a conversation.

Context:
- Your company: {company_name} — {company_description}
- Prospect: {prospect_name}, {prospect_title} at {prospect_company}
- Signal that triggered outreach: {signal_description}
- Their recent activity: {recent_posts_summary}
- Conversation goal: {goal}

Rules:
- Keep it under 280 characters if possible (max 500)
- Be conversational, not salesy
- Reference something specific from their activity
- Lead with curiosity or value, not a pitch
- No "I hope this message finds you well"
- No generic compliments
- Sound like a human, not a bot

Generate 3 variants with different approaches.
```

---

*This spec is a living document. Update as product decisions are made and market feedback is incorporated.*
