import { NextResponse } from 'next/server';
import { isSupabaseConfigured, getWorkspaceId } from '@/lib/supabase/database';
import { seedWorkspaceData } from '@/lib/services/signal-engine';

// POST /api/workspace/seed - Seed initial data for workspace
export async function POST() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 400 });
  }

  try {
    const workspaceId = await getWorkspaceId();
    if (!workspaceId) {
      return NextResponse.json({ error: 'No workspace found' }, { status: 401 });
    }

    await seedWorkspaceData(workspaceId);
    return NextResponse.json({ success: true, message: 'Workspace seeded with demo data' });
  } catch (err: any) {
    console.error('Seed error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
