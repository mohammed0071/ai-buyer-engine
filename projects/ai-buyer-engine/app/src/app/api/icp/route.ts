import { NextResponse } from 'next/server';
import { mockICPs } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({ data: mockICPs });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    success: true,
    data: { id: `icp_${Date.now()}`, ...body },
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, data: body });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  return NextResponse.json({ success: true, deleted: id });
}
