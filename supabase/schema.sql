-- ============================================================
-- AI Buyer Engine - Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- WORKSPACES
-- ============================================================
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'growth', 'scale', 'agency', 'enterprise')),
  settings JSONB NOT NULL DEFAULT '{
    "daily_outreach_limit": 25,
    "auto_outreach": true,
    "approval_mode": false,
    "timezone": "America/New_York",
    "outreach_hours": {"start": 9, "end": 17},
    "connected_accounts": []
  }'::jsonb,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- USERS (extends Supabase auth.users)
-- ============================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES workspaces(id) ON DELETE SET NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'owner' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ICP (Ideal Customer Profiles)
-- ============================================================
CREATE TABLE icps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  criteria JSONB NOT NULL DEFAULT '{
    "industries": [],
    "company_sizes": [],
    "roles": [],
    "seniority_levels": [],
    "keywords": [],
    "locations": [],
    "tech_stack": []
  }'::jsonb,
  negative_filters JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_icps_workspace ON icps(workspace_id);

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
  icp_match_score INTEGER NOT NULL DEFAULT 0 CHECK (icp_match_score >= 0 AND icp_match_score <= 100),
  signal_score INTEGER NOT NULL DEFAULT 0 CHECK (signal_score >= 0 AND signal_score <= 100),
  stage TEXT NOT NULL DEFAULT 'detected' CHECK (stage IN ('detected', 'warming', 'engaged', 'booking', 'booked', 'converted', 'lost')),
  first_signal_at TIMESTAMPTZ,
  last_signal_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_prospects_workspace ON prospects(workspace_id);
CREATE INDEX idx_prospects_stage ON prospects(workspace_id, stage);
CREATE INDEX idx_prospects_twitter ON prospects(twitter_handle);
CREATE INDEX idx_prospects_scores ON prospects(workspace_id, signal_score DESC, icp_match_score DESC);

-- ============================================================
-- SIGNALS
-- ============================================================
CREATE TABLE signals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('twitter', 'linkedin', 'composite')),
  signal_type TEXT NOT NULL CHECK (signal_type IN (
    'keyword_mention', 'competitor_engagement', 'competitor_follow',
    'pain_point', 'buying_language', 'job_change', 'post_engagement',
    'hashtag_match', 'thread_participation'
  )),
  raw_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  score INTEGER NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  tier TEXT NOT NULL CHECK (tier IN ('hot', 'warm', 'watching', 'noise')),
  content_preview TEXT,
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
CREATE INDEX idx_signals_type ON signals(workspace_id, signal_type);

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
CREATE INDEX idx_outreach_scheduled ON outreach_actions(scheduled_at) WHERE status = 'scheduled';

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
CREATE INDEX idx_meetings_status ON meetings(workspace_id, status);

-- ============================================================
-- DAILY METRICS
-- ============================================================
CREATE TABLE daily_metrics (
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  signals_detected INTEGER NOT NULL DEFAULT 0,
  outreach_sent INTEGER NOT NULL DEFAULT 0,
  responses_received INTEGER NOT NULL DEFAULT 0,
  meetings_booked INTEGER NOT NULL DEFAULT 0,
  meetings_completed INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (workspace_id, date)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE icps ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Workspace members can access workspace data
CREATE POLICY "Workspace members can view workspace" ON workspaces
  FOR SELECT USING (id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Workspace members can view ICPs" ON icps
  FOR SELECT USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Workspace members can manage ICPs" ON icps
  FOR ALL USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Workspace members can view prospects" ON prospects
  FOR SELECT USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Workspace members can manage prospects" ON prospects
  FOR ALL USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Workspace members can view signals" ON signals
  FOR SELECT USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Workspace members can view conversations" ON conversations
  FOR SELECT USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Workspace members can manage conversations" ON conversations
  FOR ALL USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Workspace members can view outreach" ON outreach_actions
  FOR SELECT USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Workspace members can view meetings" ON meetings
  FOR SELECT USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Workspace members can manage meetings" ON meetings
  FOR ALL USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Workspace members can view metrics" ON daily_metrics
  FOR SELECT USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_workspaces_updated_at BEFORE UPDATE ON workspaces
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_icps_updated_at BEFORE UPDATE ON icps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_prospects_updated_at BEFORE UPDATE ON prospects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create workspace and profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_workspace_id UUID;
BEGIN
  -- Create a workspace
  INSERT INTO workspaces (name)
  VALUES (COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)) || '''s Workspace')
  RETURNING id INTO new_workspace_id;

  -- Create a profile
  INSERT INTO profiles (id, workspace_id, full_name, avatar_url)
  VALUES (
    NEW.id,
    new_workspace_id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- REALTIME
-- ============================================================
-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE signals;
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE meetings;
