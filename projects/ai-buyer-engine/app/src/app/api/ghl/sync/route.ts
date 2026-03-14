import { NextResponse } from 'next/server';
import { syncProspectToGHL, isGHLConfigured } from '@/lib/services/ghl';
import { isSupabaseConfigured, getWorkspaceId } from '@/lib/supabase/database';

// POST /api/ghl/sync - Sync a prospect to GHL
export async function POST(request: Request) {
  const body = await request.json();
  const { prospect_id } = body;

  if (!isGHLConfigured()) {
    return NextResponse.json({
      success: false,
      demo: true,
      message: 'GHL not configured. Set GHL_API_KEY and GHL_LOCATION_ID environment variables.',
    });
  }

  if (!prospect_id) {
    return NextResponse.json({ error: 'prospect_id required' }, { status: 400 });
  }

  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = await createClient();
      const workspaceId = await getWorkspaceId();

      const { data: prospect } = await supabase
        .from('prospects')
        .select('*')
        .eq('id', prospect_id)
        .eq('workspace_id', workspaceId)
        .single();

      if (!prospect) {
        return NextResponse.json({ error: 'Prospect not found' }, { status: 404 });
      }

      const result = await syncProspectToGHL(prospect);
      return NextResponse.json({ success: true, data: result });
    } catch (err: any) {
      console.error('GHL sync error:', err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: false, message: 'Database not configured' });
}

// GET /api/ghl/sync - Get GHL integration status
export async function GET() {
  return NextResponse.json({
    configured: isGHLConfigured(),
    message: isGHLConfigured()
      ? 'GHL integration active'
      : 'GHL not configured. Set GHL_API_KEY and GHL_LOCATION_ID in environment variables.',
    required_env: ['GHL_API_KEY', 'GHL_LOCATION_ID', 'GHL_CALENDAR_ID (optional)', 'GHL_PIPELINE_ID (optional)'],
  });
}
