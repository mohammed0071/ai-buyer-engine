// ============================================================
// AI Buyer Engine - Core Types
// ============================================================

// ---- Auth & User ----
export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  workspace_id: string | null;
  role: 'owner' | 'admin' | 'member';
  created_at: string;
  updated_at: string;
}

export interface Workspace {
  id: string;
  name: string;
  plan: 'starter' | 'growth' | 'scale' | 'agency' | 'enterprise';
  settings: WorkspaceSettings;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceSettings {
  daily_outreach_limit: number;
  auto_outreach: boolean;
  approval_mode: boolean;
  timezone: string;
  outreach_hours: { start: number; end: number };
  connected_accounts: ConnectedAccount[];
}

export interface ConnectedAccount {
  platform: 'twitter' | 'linkedin' | 'google_calendar' | 'calendly';
  username?: string;
  connected_at: string;
  status: 'active' | 'expired' | 'error';
}

// ---- ICP ----
export interface ICP {
  id: string;
  workspace_id: string;
  name: string;
  criteria: ICPCriteria;
  negative_filters: NegativeFilter[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ICPCriteria {
  industries: string[];
  company_sizes: string[];
  roles: string[];
  seniority_levels: string[];
  keywords: string[];
  locations: string[];
  tech_stack: string[];
}

export interface NegativeFilter {
  type: 'company' | 'domain' | 'keyword' | 'handle';
  value: string;
}

// ---- Signals ----
export type SignalTier = 'hot' | 'warm' | 'watching' | 'noise';
export type SignalPlatform = 'twitter' | 'linkedin' | 'composite';
export type SignalType =
  | 'keyword_mention'
  | 'competitor_engagement'
  | 'competitor_follow'
  | 'pain_point'
  | 'buying_language'
  | 'job_change'
  | 'post_engagement'
  | 'hashtag_match'
  | 'thread_participation'
  // LinkedIn-specific signals
  | 'profile_view'
  | 'linkedin_engagement'
  | 'company_growth'
  | 'competitor_follower';

export interface Signal {
  id: string;
  prospect_id: string | null;
  workspace_id: string;
  platform: SignalPlatform;
  signal_type: SignalType;
  raw_data: Record<string, unknown>;
  score: number;
  tier: SignalTier;
  content_preview: string;
  source_url: string | null;
  triggered_action: string | null;
  is_dismissed: boolean;
  detected_at: string;
  created_at: string;
  prospect?: Prospect;
}

// ---- Prospects ----
export type ProspectStage = 'detected' | 'warming' | 'engaged' | 'booking' | 'booked' | 'converted' | 'lost';

export interface Prospect {
  id: string;
  workspace_id: string;
  twitter_handle: string | null;
  linkedin_url: string | null;
  email: string | null;
  name: string;
  title: string | null;
  company: string | null;
  industry: string | null;
  location: string | null;
  bio: string | null;
  avatar_url: string | null;
  enrichment_data: Record<string, unknown>;
  icp_match_score: number;
  signal_score: number;
  stage: ProspectStage;
  first_signal_at: string | null;
  last_signal_at: string | null;
  created_at: string;
  updated_at: string;
  signals?: Signal[];
  conversations?: Conversation[];
}

// ---- Conversations ----
export type ConversationStatus = 'warming' | 'active' | 'booked' | 'stalled' | 'dead' | 'paused';

export interface Conversation {
  id: string;
  prospect_id: string;
  workspace_id: string;
  platform: 'twitter' | 'linkedin' | 'email';
  status: ConversationStatus;
  messages: ConversationMessage[];
  context: Record<string, unknown>;
  is_ai_managed: boolean;
  started_at: string;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
  prospect?: Prospect;
}

export interface ConversationMessage {
  id: string;
  role: 'ai' | 'prospect' | 'human';
  content: string;
  sent_at: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  metadata?: Record<string, unknown>;
}

// ---- Outreach Actions ----
export type ActionType = 'like' | 'comment' | 'view' | 'dm' | 'follow' | 'connect' | 'reply';

export interface OutreachAction {
  id: string;
  conversation_id: string | null;
  prospect_id: string;
  workspace_id: string;
  action_type: ActionType;
  platform: 'twitter' | 'linkedin';
  content: string | null;
  status: 'pending' | 'scheduled' | 'executed' | 'failed' | 'cancelled';
  scheduled_at: string | null;
  executed_at: string | null;
  error_message: string | null;
  created_at: string;
}

// ---- Meetings ----
export type MeetingStatus = 'scheduled' | 'confirmed' | 'completed' | 'no_show' | 'cancelled';

export interface Meeting {
  id: string;
  prospect_id: string;
  workspace_id: string;
  calendar_event_id: string | null;
  meeting_type: 'discovery' | 'demo' | 'follow_up';
  title: string;
  scheduled_at: string;
  duration_min: number;
  status: MeetingStatus;
  meeting_link: string | null;
  pre_meeting_brief: PreMeetingBrief | null;
  booked_at: string;
  created_at: string;
  prospect?: Prospect;
}

export interface PreMeetingBrief {
  prospect_summary: string;
  recent_activity: string[];
  signal_history: string[];
  talking_points: string[];
  mutual_connections: string[];
}

// ---- Analytics ----
export interface DailyMetrics {
  workspace_id: string;
  date: string;
  signals_detected: number;
  outreach_sent: number;
  responses_received: number;
  meetings_booked: number;
  meetings_completed: number;
}

export interface AnalyticsOverview {
  total_signals: number;
  total_prospects: number;
  active_conversations: number;
  meetings_booked: number;
  meetings_completed: number;
  signal_to_meeting_rate: number;
  pipeline_stages: Record<ProspectStage, number>;
  daily_metrics: DailyMetrics[];
}

// ---- Billing ----
export interface PricingPlan {
  id: string;
  name: string;
  price_monthly: number;
  price_yearly: number;
  features: PlanFeatures;
  stripe_price_id_monthly: string;
  stripe_price_id_yearly: string;
}

export interface PlanFeatures {
  active_prospects: number;
  ai_messages_per_month: number;
  connected_accounts: number;
  team_members: number;
  crm_integrations: boolean;
  advanced_analytics: boolean;
}
