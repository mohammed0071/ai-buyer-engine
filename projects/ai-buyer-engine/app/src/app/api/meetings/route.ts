import { NextResponse } from 'next/server';
import { mockMeetings } from '@/lib/mock-data';

export async function GET() {
  const meetings = [...mockMeetings].sort(
    (a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
  );
  return NextResponse.json({ data: meetings });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    success: true,
    data: { id: `mt_${Date.now()}`, ...body },
  });
}
