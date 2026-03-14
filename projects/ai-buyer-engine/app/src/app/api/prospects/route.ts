import { NextResponse } from 'next/server';
import { mockProspects } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stage = searchParams.get('stage');
  const search = searchParams.get('search');

  let prospects = [...mockProspects];

  if (stage && stage !== 'all') {
    prospects = prospects.filter(p => p.stage === stage);
  }
  if (search) {
    const q = search.toLowerCase();
    prospects = prospects.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.company?.toLowerCase().includes(q) ||
      p.twitter_handle?.toLowerCase().includes(q)
    );
  }

  prospects.sort((a, b) => b.signal_score - a.signal_score);

  return NextResponse.json({ data: prospects });
}

export async function POST(request: Request) {
  const body = await request.json();
  // In production: create prospect in database
  return NextResponse.json({
    success: true,
    data: { id: `p_${Date.now()}`, ...body },
  });
}
