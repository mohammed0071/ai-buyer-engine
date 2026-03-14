import { NextResponse } from 'next/server';
import { isSupabaseConfigured, getWorkspaceId } from '@/lib/supabase/database';
import { generateSignals } from '@/lib/services/signal-engine';

// POST /api/signals/generate - Generate simulated signals
export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      success: false,
      message: 'Supabase not configured. Cannot generate signals without database.',
    });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const count = Math.min(body.count || 5, 20); // Max 20 at a time

    const workspaceId = await getWorkspaceId();
    if (!workspaceId) {
      return NextResponse.json({ error: 'No workspace found' }, { status: 401 });
    }

    const results = await generateSignals(workspaceId, count);
    return NextResponse.json({
      success: true,
      ...results,
      message: `Generated ${results.signals} signals and ${results.prospects} new prospects`,
    });
  } catch (err: any) {
    console.error('Signal generation error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
