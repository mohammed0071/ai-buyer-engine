# AI Buyer Engine

**Signal-driven sales automation platform.** Detects in-market buyers via X/Twitter and LinkedIn signals, warms up prospects with intelligent engagement, and books qualified meetings — all on autopilot.

## Architecture

```
Landing Page → Supabase Auth → Dashboard
                                    ├── Signal Detection Engine (simulated + Twitter API)
                                    ├── ICP Configuration (persisted to Supabase)
                                    ├── Prospect Pipeline (Supabase)
                                    ├── Outreach Automation (GHL integration)
                                    ├── Meeting Booking (GHL calendar)
                                    ├── Analytics (aggregated from DB)
                                    └── Billing (Stripe subscriptions)
```

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Database:** Supabase (PostgreSQL + Auth + RLS)
- **Payments:** Stripe (Checkout + Billing Portal + Webhooks)
- **Outreach:** GoHighLevel (GHL) API
- **Signals:** X/Twitter API v2 (with simulated fallback)
- **Hosting:** Vercel

## Getting Started

### 1. Install dependencies

```bash
cd app
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the migration: Copy `supabase/migrations/001_initial_schema.sql` and run it in the Supabase SQL Editor
3. Enable Google OAuth: Supabase Dashboard → Authentication → Providers → Google
4. Copy your API keys to `.env.local`

### 3. Configure environment

```bash
cp .env.example .env.local
# Edit .env.local with your real keys
```

### 4. Run locally

```bash
npm run dev
```

### 5. Deploy to Vercel

```bash
vercel --prod
```

Set all env vars in Vercel Dashboard → Settings → Environment Variables.

## Demo Mode

The app works **without any API keys**. When Supabase isn't configured:
- Auth pages accept any credentials
- Dashboard shows mock data
- Stripe checkout shows demo message
- All features are functional with fake data

## Integrations

### Supabase (Required for production)
- Real user auth (email/password + Google OAuth)
- Database for all entities (signals, prospects, conversations, meetings)
- Row-Level Security for multi-tenant data isolation
- Auto workspace creation on signup

### Stripe (For billing)
- Subscription checkout with pricing tiers
- Billing portal for self-service management
- Webhook handling for subscription lifecycle

### GoHighLevel (For outreach)
- Sync prospects as GHL contacts
- Send messages via GHL conversations
- Book meetings via GHL calendar
- Webhook handling for inbound messages

### X/Twitter API (For signal detection)
- Search tweets for buying signals
- Monitor competitor engagement
- Real-time keyword tracking
- Falls back to simulated signals when not configured

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/signals` | GET | List signals (supports tier/type/page filters) |
| `/api/signals/generate` | POST | Generate simulated signals |
| `/api/prospects` | GET/POST | List/create prospects |
| `/api/outreach` | GET/POST | List conversations, send messages |
| `/api/meetings` | GET/POST | List/create meetings |
| `/api/icp` | GET/POST/PATCH/DELETE | Manage ICP configurations |
| `/api/analytics` | GET | Dashboard analytics overview |
| `/api/profile` | GET/PATCH | User profile & workspace settings |
| `/api/billing/checkout` | POST | Create Stripe checkout session |
| `/api/billing/portal` | POST | Create Stripe billing portal session |
| `/api/billing/webhook` | POST | Handle Stripe webhooks |
| `/api/ghl/webhook` | POST | Handle GHL webhooks |
| `/api/ghl/sync` | GET/POST | GHL integration status & prospect sync |
| `/api/integrations/status` | GET | Check all integration statuses |
| `/api/workspace/seed` | POST | Seed workspace with demo data |

## Database Schema

Key tables:
- `workspaces` - Multi-tenant workspaces with plan/billing info
- `profiles` - User profiles linked to auth.users
- `icp_configs` - Ideal Customer Profile definitions
- `prospects` - Detected buyer prospects
- `signals` - Raw buying signals (Twitter, LinkedIn, etc.)
- `conversations` - Outreach conversation threads
- `outreach_actions` - Individual engagement actions
- `meetings` - Booked meetings with pre-meeting briefs
- `daily_metrics` - Aggregated analytics data
- `ghl_configs` - GoHighLevel integration settings

All tables have Row-Level Security policies scoped to workspace membership.

## Pricing Tiers

| Plan | Monthly | Prospects | AI Messages | Accounts |
|------|---------|-----------|-------------|----------|
| Starter | $99 | 200 | 200 | 1 |
| Growth | $399 | 2,000 | 1,000 | 3 |
| Scale | $899 | 10,000 | 5,000 | 10 |
| Agency | $1,499 | 50,000 | 20,000 | 50 |
