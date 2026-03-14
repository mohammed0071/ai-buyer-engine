-- ============================================================
-- AI Buyer Engine - Initial Database Schema
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS & WORKSPACES
-- ============================================================

CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT 'My Workspace',
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'growth', 'scale', 'agency', 'enterprise')),
  settings JSONB NOT NULL DEFAULT '{
    "daily_outreach_limit": 10,
    "auto_outreach": false,
    "approval_mode": true,
    "timezone": "America/New_York",
    "outreach_hours": {"start": 9, "end": 17},
    "connected_accounts": []
  }'::jsonb,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_price_id TEXT,
  subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'trialing', 'past_due', 'canceled', 'inactive')),
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES workspaces(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'owner' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ICP CONFIGURATIONS
-- ============================================================

CREATE TABLE icp_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  criteria JSONB NOT NULL DEFAULT '{}'::jsonb,
  negative_filters JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_icp_configs_workspace ON icp_configs(workspace_id);

-- ============================================================
-- PROSPECTS
-- ============================================================

CREATE TABLE prospects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  twitter_handle TEXT,
  linkedin_url TEXT,
  email TEXT,
  name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  industry TEXT,
  location TEXT,
  bio TEXT,
  avatar_url TEXT,
  enrichment_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  icp_match_score INTEGER NOT NULL DEFAULT 0,
  signal_score INTEGER NOT NULL DEFAULT 0,
  stage TEXT NOT NULL DEFAULT 'detected' CHECK (stage IN ('detected', 'warming', 'engaged', 'booking', 'booked', 'converted', 'lost')),
  first_signal_at TIMESTAMPTZ,
  last_signal_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_prospects_workspace ON prospects(workspace_id);
CREATE INDEX idx_prospects_stage ON prospects(workspace_id, stage);
CREATE INDEX idx_prospects_twitter ON prospects(twitter_handle);
CREATE INDEX idx_prospects_signal_score ON prospects(workspace_id, signal_score DESC);

-- ============================================================
-- SIGNALS
-- ============================================================

CREATE TABLE signals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('twitter', 'linkedin', 'composite')),
  signal_type TEXT NOT NULL,
  raw_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  score INTEGER NOT NULL DEFAULT 0,
  tier TEXT NOT NULL CHECK (tier IN ('hot', 'warm', 'watching', 'noise')),
  content_preview TEXT NOT NULL,
  source_url TEXT,
  triggered_action TEXT,
  is_dismissed BOOLEAN NOT NULL DEFAULT false,
  detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_signals_workspace ON signals(workspace_id);
CREATE INDEX idx_signals_prospect ON signals(prospect_id);
CREATE INDEX idx_signals_tier ON signals(workspace_id, tier);
CREATE INDEX idx_signals_detected ON signals(workspace_id, detected_at DESC);

-- ============================================================
-- CONVERSATIONS
-- ============================================================

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id UUID NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('twitter', 'linkedin', 'email')),
  status TEXT NOT NULL DEFAULT 'warming' CHECK (status IN ('warming', 'active', 'booked', 'stalled', 'dead', 'paused')),
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  context JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_ai_managed BOOLEAN NOT NULL DEFAULT true,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_conversations_workspace ON conversations(workspace_id);
CREATE INDEX idx_conversations_prospect ON conversations(prospect_id);
CREATE INDEX idx_conversations_status ON conversations(workspace_id, status);

-- ============================================================
-- OUTREACH ACTIONS
-- ============================================================

CREATE TABLE outreach_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  prospect_id UUID NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL CHECK (action_type IN ('like', 'comment', 'view', 'dm', 'follow', 'connect', 'reply')),
  platform TEXT NOT NULL CHECK (platform IN ('twitter', 'linkedin')),
  content TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'executed', 'failed', 'cancelled')),
  scheduled_at TIMESTAMPTZ,
  executed_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_outreach_workspace ON outreach_actions(workspace_id);
CREATE INDEX idx_outreach_status ON outreach_actions(workspace_id, status);

-- ============================================================
-- MEETINGS
-- ============================================================

CREATE TABLE meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id UUID NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  calendar_event_id TEXT,
  meeting_type TEXT NOT NULL DEFAULT 'discovery' CHECK (meeting_type IN ('discovery', 'demo', 'follow_up')),
  title TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_min INTEGER NOT NULL DEFAULT 30,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'no_show', 'cancelled')),
  meeting_link TEXT,
  pre_meeting_brief JSONB,
  booked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_meetings_workspace ON meetings(workspace_id);
CREATE INDEX idx_meetings_scheduled ON meetings(workspace_id, scheduled_at);

-- ============================================================
-- DAILY METRICS (for analytics)
-- ============================================================

CREATE TABLE daily_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  signals_detected INTEGER NOT NULL DEFAULT 0,
  outreach_sent INTEGER NOT NULL DEFAULT 0,
  responses_received INTEGER NOT NULL DEFAULT 0,
  meetings_booked INTEGER NOT NULL DEFAULT 0,
  meetings_completed INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(workspace_id, date)
);

CREATE INDEX idx_daily_metrics_workspace_date ON daily_metrics(workspace_id, date DESC);

-- ============================================================
-- GHL INTEGRATION CONFIG
-- ============================================================

CREATE TABLE ghl_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE UNIQUE,
  location_id TEXT,
  api_key TEXT,
  webhook_secret TEXT,
  calendar_id TEXT,
  pipeline_id TEXT,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE icp_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ghl_configs ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Workspaces: members can view their workspace
CREATE POLICY "Members can view workspace" ON workspaces FOR SELECT
  USING (id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Owners can update workspace" ON workspaces FOR UPDATE
  USING (id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid() AND role = 'owner'));

-- Workspace-scoped tables: members can CRUD within their workspace
CREATE POLICY "Workspace members can view" ON icp_configs FOR SELECT
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can insert" ON icp_configs FOR INSERT
  WITH CHECK (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can update" ON icp_configs FOR UPDATE
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can delete" ON icp_configs FOR DELETE
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

-- Same pattern for prospects
CREATE POLICY "Workspace members can view prospects" ON prospects FOR SELECT
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can insert prospects" ON prospects FOR INSERT
  WITH CHECK (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can update prospects" ON prospects FOR UPDATE
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can delete prospects" ON prospects FOR DELETE
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

-- Signals
CREATE POLICY "Workspace members can view signals" ON signals FOR SELECT
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can insert signals" ON signals FOR INSERT
  WITH CHECK (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can update signals" ON signals FOR UPDATE
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

-- Conversations
CREATE POLICY "Workspace members can view conversations" ON conversations FOR SELECT
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can insert conversations" ON conversations FOR INSERT
  WITH CHECK (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can update conversations" ON conversations FOR UPDATE
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

-- Outreach Actions
CREATE POLICY "Workspace members can view outreach" ON outreach_actions FOR SELECT
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can insert outreach" ON outreach_actions FOR INSERT
  WITH CHECK (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can update outreach" ON outreach_actions FOR UPDATE
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

-- Meetings
CREATE POLICY "Workspace members can view meetings" ON meetings FOR SELECT
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can insert meetings" ON meetings FOR INSERT
  WITH CHECK (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can update meetings" ON meetings FOR UPDATE
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

-- Daily Metrics
CREATE POLICY "Workspace members can view metrics" ON daily_metrics FOR SELECT
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can insert metrics" ON daily_metrics FOR INSERT
  WITH CHECK (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace members can update metrics" ON daily_metrics FOR UPDATE
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

-- GHL Config
CREATE POLICY "Workspace members can view ghl config" ON ghl_configs FOR SELECT
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Workspace owners can manage ghl config" ON ghl_configs FOR ALL
  USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid() AND role = 'owner'));

-- ============================================================
-- TRIGGER: Auto-create profile & workspace on signup
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_workspace_id UUID;
BEGIN
  -- Create workspace
  INSERT INTO public.workspaces (name)
  VALUES (COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)) || '''s Workspace')
  RETURNING id INTO new_workspace_id;

  -- Create profile
  INSERT INTO public.profiles (id, workspace_id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    new_workspace_id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NULL),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL)
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- TRIGGER: Auto-update updated_at timestamps
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_workspaces_updated_at BEFORE UPDATE ON workspaces FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_icp_configs_updated_at BEFORE UPDATE ON icp_configs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_prospects_updated_at BEFORE UPDATE ON prospects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_ghl_configs_updated_at BEFORE UPDATE ON ghl_configs FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SERVICE ROLE POLICIES (for API routes using service key)
-- ============================================================

-- Allow service role to bypass RLS (it already does by default in Supabase)
-- These policies ensure server-side API routes can operate on data

-- Allow inserting signals via service role (for signal detection engine)
CREATE POLICY "Service role can manage signals" ON signals FOR ALL
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage prospects" ON prospects FOR ALL  
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage metrics" ON daily_metrics FOR ALL
  USING (true) WITH CHECK (true);
