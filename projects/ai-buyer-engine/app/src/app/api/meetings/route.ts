import { NextResponse } from 'next/server';
import { isSupabaseConfigured, getMeetings, createMeeting } from '@/lib/supabase/database';
import { mockMeetings } from '@/lib/mock-data';

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const meetings = await getMeetings();
      return NextResponse.json({ data: meetings });
    } catch (err: any) {
      console.error('DB error fetching meetings:', err.message);
    }
  }

  const meetings = [...mockMeetings].sort(
    (a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
  );
  return NextResponse.json({ data: meetings });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (isSupabaseConfigured()) {
    try {
      const meeting = await createMeeting(body);
      return NextResponse.json({ success: true, data: meeting });
    } catch (err: any) {
      console.error('DB error creating meeting:', err.message);
    }
  }

  return NextResponse.json({ success: true, data: { id: `mt_${Date.now()}`, ...body } });
}
