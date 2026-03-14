import { NextResponse } from 'next/server';
import { isSupabaseConfigured, getCurrentProfile, updateProfile, updateWorkspaceSettings } from '@/lib/supabase/database';

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const profile = await getCurrentProfile();
      if (!profile) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
      }
      return NextResponse.json({ data: profile });
    } catch (err: any) {
      console.error('Profile error:', err.message);
    }
  }

  // Demo mode
  return NextResponse.json({
    data: {
      id: 'demo',
      email: 'demo@buyerengine.ai',
      full_name: 'Demo User',
      workspace_id: 'demo',
      role: 'owner',
      workspaces: {
        id: 'demo',
        name: 'Demo Workspace',
        plan: 'growth',
        settings: {
          daily_outreach_limit: 25,
          auto_outreach: true,
          approval_mode: false,
          timezone: 'America/New_York',
          outreach_hours: { start: 9, end: 17 },
          connected_accounts: [],
        },
      },
    },
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();

  if (isSupabaseConfigured()) {
    try {
      if (body.type === 'profile') {
        const result = await updateProfile(body.data);
        return NextResponse.json({ success: true, data: result });
      }
      if (body.type === 'workspace_settings') {
        const result = await updateWorkspaceSettings(body.data);
        return NextResponse.json({ success: true, data: result });
      }
    } catch (err: any) {
      console.error('Update error:', err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true, demo: true });
}
