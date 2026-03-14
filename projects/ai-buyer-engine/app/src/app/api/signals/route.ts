import { NextResponse } from 'next/server';
import { isSupabaseConfigured, getSignals } from '@/lib/supabase/database';
import { mockSignals } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tier = searchParams.get('tier');
  const type = searchParams.get('type');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  // Use real DB if configured
  if (isSupabaseConfigured()) {
    try {
      const result = await getSignals({ tier: tier || undefined, type: type || undefined, page, limit });
      return NextResponse.json(result);
    } catch (err: any) {
      console.error('DB error fetching signals:', err.message);
      // Fall through to mock
    }
  }

  // Mock fallback
  let signals = [...mockSignals];
  if (tier && tier !== 'all') signals = signals.filter(s => s.tier === tier);
  if (type && type !== 'all') signals = signals.filter(s => s.signal_type === type);
  signals.sort((a, b) => new Date(b.detected_at).getTime() - new Date(a.detected_at).getTime());
  const start = (page - 1) * limit;
  const paginated = signals.slice(start, start + limit);

  return NextResponse.json({
    data: paginated,
    meta: { total: signals.length, page, limit, total_pages: Math.ceil(signals.length / limit) },
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (isSupabaseConfigured() && body.action === 'dismiss') {
    try {
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = await createClient();
      await supabase.from('signals').update({ is_dismissed: true }).eq('id', body.signal_id);
      return NextResponse.json({ success: true });
    } catch (err: any) {
      console.error('DB error:', err.message);
    }
  }

  return NextResponse.json({ success: true, action: body.action });
}
