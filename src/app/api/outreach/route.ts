import { NextResponse } from 'next/server';
import { mockConversations } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({ data: mockConversations });
}

export async function POST(request: Request) {
  const body = await request.json();
  // In production: send message or take over conversation
  return NextResponse.json({
    success: true,
    action: body.action,
    conversation_id: body.conversation_id,
  });
}
