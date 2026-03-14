import { NextResponse } from 'next/server';
import { isSupabaseConfigured, getAnalytics } from '@/lib/supabase/database';
import { mockAnalytics } from '@/lib/mock-data';

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const analytics = await getAnalytics();
      return NextResponse.json({ data: analytics });
    } catch (err: any) {
      console.error('DB error fetching analytics:', err.message);
    }
  }

  return NextResponse.json({ data: mockAnalytics });
}
