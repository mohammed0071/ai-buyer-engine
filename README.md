# AI Buyer Engine

A B2B SaaS platform that detects in-market buyers via X/Twitter signals, automates personalized outreach, and books qualified meetings — all on autopilot.

## Features

- **Signal Detection** - Monitor X/Twitter for real-time buyer intent signals (pain points, competitor engagement, buying language)
- **ICP Configuration** - Build and manage ideal customer profiles with form-based tools
- **AI Outreach** - Automated warm-up, personalized DMs, and multi-turn conversation management
- **Meeting Booking** - Google Calendar and Calendly integration for automated booking
- **Dashboard** - Real-time signal feed, pipeline view, and analytics
- **Stripe Billing** - Subscription management ready

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Database**: Supabase (PostgreSQL + Auth + Realtime)
- **Payments**: Stripe
- **UI Components**: Radix UI + custom components

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (for billing)

### Installation

```bash
# Clone the repository
cd app

# Install dependencies
npm install

# Set up environment variables
cp .env.local .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# X/Twitter API (placeholder)
X_API_KEY=placeholder

# OpenAI
OPENAI_API_KEY=sk-...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup

1. Create a new Supabase project
2. Run the SQL from `supabase/schema.sql` in the Supabase SQL Editor
3. Update your environment variables with Supabase credentials

## Project Structure

```
app/
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── auth/          # Auth pages (login, signup)
│   │   ├── dashboard/     # Main dashboard pages
│   │   └── api/           # API routes
│   ├── components/        # React components
│   │   └── ui/            # Reusable UI components
│   ├── lib/               # Utilities and mock data
│   └── types/             # TypeScript types
├── supabase/
│   └── schema.sql         # Database schema
└── public/                # Static assets
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

### Build for Production

```bash
npm run build
npm start
```

## License

MIT
