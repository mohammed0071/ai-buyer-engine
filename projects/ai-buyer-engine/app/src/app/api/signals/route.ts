import { NextResponse } from 'next/server';
import { mockSignals } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tier = searchParams.get('tier');
  const type = searchParams.get('type');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  let signals = [...mockSignals];

  if (tier && tier !== 'all') {
    signals = signals.filter(s => s.tier === tier);
  }
  if (type && type !== 'all') {
    signals = signals.filter(s => s.signal_type === type);
  }

  // Sort by detected_at descending
  signals.sort((a, b) => new Date(b.detected_at).getTime() - new Date(a.detected_at).getTime());

  const start = (page - 1) * limit;
  const paginated = signals.slice(start, start + limit);

  return NextResponse.json({
    data: paginated,
    meta: {
      total: signals.length,
      page,
      limit,
      total_pages: Math.ceil(signals.length / limit),
    },
  });
}

export async function POST(request: Request) {
  // In production: dismiss or trigger action on a signal
  const body = await request.json();
  return NextResponse.json({ success: true, action: body.action });
}
