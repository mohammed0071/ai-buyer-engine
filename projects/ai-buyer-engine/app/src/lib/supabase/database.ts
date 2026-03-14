// ============================================================
// Database service layer - Server-side Supabase operations
// ============================================================

import { createClient } from './server';
import type { ICP, Signal, Prospect, Conversation, Meeting, OutreachAction, DailyMetrics, AnalyticsOverview } from '@/types';

// Helper: check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(url && key && !url.includes('placeholder') && url !== 'your-supabase-url');
}

// ---- Profile & Workspace ----

export async function getCurrentProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, workspaces(*)')
    .eq('id', user.id)
    .single();

  return profile;
}

export async function getWorkspaceId(): Promise<string | null> {
  const profile = await getCurrentProfile();
  return profile?.workspace_id || null;
}

export async function updateProfile(updates: { full_name?: string; avatar_url?: string }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateWorkspaceSettings(settings: Record<string, unknown>) {
  const workspaceId = await getWorkspaceId();
  if (!workspaceId) throw new Error('No workspace');

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('workspaces')
    .update({ settings })
    .eq('id', workspaceId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ---- ICP ----

export async function getICPs(): Promise<ICP[]> {
  const workspaceId = await getWorkspaceId();
  if (!workspaceId) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('icp_configs')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(row => ({
    id: row.id,
    workspace_id: row.workspace_id,
    name: row.name,
    criteria: row.criteria as ICP['criteria'],
    negative_filters: row.negative_filters as ICP['negative_filters'],
    is_active: row.is_active,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));
}

export async function createICP(icp: { name: string; criteria: ICP['criteria']; negative_filters: ICP['negative_filters'] }) {
  const workspaceId = await getWorkspaceId();
  if (!workspaceId) throw new Error('No workspace');

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('icp_configs')
    .insert({ ...icp, workspace_id: workspaceId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateICP(id: string, updates: Partial<ICP>) {
  const workspaceId = await getWorkspaceId();
  if (!workspaceId) throw new Error('No workspace');

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('icp_configs')
    .update(updates)
    .eq('id', id)
    .eq('workspace_id', workspaceId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteICP(id: string) {
  const workspaceId = await getWorkspaceId();
  if (!workspaceId) throw new Error('No workspace');

  const supabase = await createClient();
  const { error } = await supabase
    .from('icp_configs')
    .delete()
    .eq('id', id)
    .eq('workspace_id', workspaceId);

  if (error) throw error;
}

// ---- Signals ----

export async function getSignals(params: { tier?: string; type?: string; page?: number; limit?: number }) {
  const workspaceId = await getWorkspaceId();
  if (!workspaceId) return { data: [], meta: { total: 0, page: 1, limit: 20, total_pages: 0 } };

  const page = params.page || 1;
  const limit = params.limit || 20;
  const start = (page - 1) * limit;

  const supabase = await createClient();
  let query = supabase
    .from('signals')
    .select('*, prospects(*)', { count: 'exact' })
    .eq('workspace_id', workspaceId)
    .order('detected_at', { ascending: false })
    .range(start, start + limit - 1);

  if (params.tier && params.tier !== 'all') {
    query = query.eq('tier', params.tier);
  }
  if (params.type && params.type !== 'all') {
    query = query.eq('signal_type', params.type);
  }

  const { data, error, count } = await query;
  if (error) throw error;

  const signals = (data || []).map(row => ({
    ...row,
    prospect: row.prospects || undefined,
    prospects: undefined,
  }));

  return {
    data: signals,
    meta: {
      total: count || 0,
      page,
      limit,
      total_pages: Math.ceil((count || 0) / limit),
    },
  };
}

// ---- Prospects ----

export async function getProspects(params: { stage?: string; search?: string }) {
  const workspaceId = await getWorkspaceId();
  if (!workspaceId) return [];

  const supabase = await createClient();
  let query = supabase
    .from('prospects')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('signal_score', { ascending: false });

  if (params.stage && params.stage !== 'all') {
    query = query.eq('stage', params.stage);
  }
  if (params.search) {
    query = query.or(`name.ilike.%${params.search}%,company.ilike.%${params.search}%,twitter_handle.ilike.%${params.search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createProspect(prospect: Partial<Prospect>) {
  const workspaceId = await getWorkspaceId();
  if (!workspaceId) throw new Error('No workspace');

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('prospects')
    .insert({ ...prospect, workspace_id: workspaceId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ---- Conversations ----

export async function getConversations() {
  const workspaceId = await getWorkspaceId();
  if (!workspaceId) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('conversations')
    .select('*, prospects(*)')
    .eq('workspace_id', workspaceId)
    .order('last_message_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(row => ({
    ...row,
    prospect: row.prospects || undefined,
    prospects: undefined,
  }));
}

// ---- Meetings ----

export async function getMeetings() {
  const workspaceId = await getWorkspaceId();
  if (!workspaceId) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('meetings')
    .select('*, prospects(*)')
    .eq('workspace_id', workspaceId)
    .order('scheduled_at', { ascending: true });

  if (error) throw error;
  return (data || []).map(row => ({
    ...row,
    prospect: row.prospects || undefined,
    prospects: undefined,
  }));
}

export async function createMeeting(meeting: Partial<Meeting>) {
  const workspaceId = await getWorkspaceId();
  if (!workspaceId) throw new Error('No workspace');

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('meetings')
    .insert({ ...meeting, workspace_id: workspaceId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ---- Analytics ----

export async function getAnalytics(): Promise<AnalyticsOverview> {
  const workspaceId = await getWorkspaceId();
  if (!workspaceId) {
    return {
      total_signals: 0, total_prospects: 0, active_conversations: 0,
      meetings_booked: 0, meetings_completed: 0, signal_to_meeting_rate: 0,
      pipeline_stages: { detected: 0, warming: 0, engaged: 0, booking: 0, booked: 0, converted: 0, lost: 0 },
      daily_metrics: [],
    };
  }

  const supabase = await createClient();

  // Parallel queries
  const [signalsRes, prospectsRes, convsRes, meetingsRes, metricsRes] = await Promise.all([
    supabase.from('signals').select('id', { count: 'exact', head: true }).eq('workspace_id', workspaceId),
    supabase.from('prospects').select('id, stage').eq('workspace_id', workspaceId),
    supabase.from('conversations').select('id', { count: 'exact', head: true }).eq('workspace_id', workspaceId).in('status', ['active', 'warming']),
    supabase.from('meetings').select('id, status').eq('workspace_id', workspaceId),
    supabase.from('daily_metrics').select('*').eq('workspace_id', workspaceId).order('date', { ascending: true }).limit(30),
  ]);

  const prospects = prospectsRes.data || [];
  const meetings = meetingsRes.data || [];

  const pipeline_stages: Record<string, number> = { detected: 0, warming: 0, engaged: 0, booking: 0, booked: 0, converted: 0, lost: 0 };
  prospects.forEach(p => {
    if (p.stage in pipeline_stages) pipeline_stages[p.stage]++;
  });

  const meetings_booked = meetings.filter(m => ['scheduled', 'confirmed'].includes(m.status)).length;
  const meetings_completed = meetings.filter(m => m.status === 'completed').length;
  const total_signals = signalsRes.count || 0;

  return {
    total_signals,
    total_prospects: prospects.length,
    active_conversations: convsRes.count || 0,
    meetings_booked,
    meetings_completed,
    signal_to_meeting_rate: total_signals > 0 ? parseFloat(((meetings_booked / total_signals) * 100).toFixed(1)) : 0,
    pipeline_stages: pipeline_stages as AnalyticsOverview['pipeline_stages'],
    daily_metrics: (metricsRes.data || []).map(m => ({
      workspace_id: m.workspace_id,
      date: m.date,
      signals_detected: m.signals_detected,
      outreach_sent: m.outreach_sent,
      responses_received: m.responses_received,
      meetings_booked: m.meetings_booked,
      meetings_completed: m.meetings_completed,
    })),
  };
}

// ---- Outreach Actions ----

export async function getOutreachActions() {
  const workspaceId = await getWorkspaceId();
  if (!workspaceId) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('outreach_actions')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) throw error;
  return data || [];
}
