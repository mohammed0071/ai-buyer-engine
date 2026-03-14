import { NextResponse } from 'next/server';
import { isSupabaseConfigured, getICPs, createICP, updateICP, deleteICP } from '@/lib/supabase/database';
import { mockICPs } from '@/lib/mock-data';

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const icps = await getICPs();
      return NextResponse.json({ data: icps });
    } catch (err: any) {
      console.error('DB error fetching ICPs:', err.message);
    }
  }
  return NextResponse.json({ data: mockICPs });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (isSupabaseConfigured()) {
    try {
      const icp = await createICP({
        name: body.name,
        criteria: body.criteria,
        negative_filters: body.negative_filters || [],
      });
      return NextResponse.json({ success: true, data: icp });
    } catch (err: any) {
      console.error('DB error creating ICP:', err.message);
    }
  }

  return NextResponse.json({ success: true, data: { id: `icp_${Date.now()}`, ...body } });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, ...updates } = body;

  if (isSupabaseConfigured() && id) {
    try {
      const icp = await updateICP(id, updates);
      return NextResponse.json({ success: true, data: icp });
    } catch (err: any) {
      console.error('DB error updating ICP:', err.message);
    }
  }

  return NextResponse.json({ success: true, data: body });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (isSupabaseConfigured() && id) {
    try {
      await deleteICP(id);
      return NextResponse.json({ success: true, deleted: id });
    } catch (err: any) {
      console.error('DB error deleting ICP:', err.message);
    }
  }

  return NextResponse.json({ success: true, deleted: id });
}
