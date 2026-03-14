import { NextResponse } from 'next/server';
import { isSupabaseConfigured, getConversations } from '@/lib/supabase/database';
import { mockConversations } from '@/lib/mock-data';

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const conversations = await getConversations();
      return NextResponse.json({ data: conversations });
    } catch (err: any) {
      console.error('DB error fetching conversations:', err.message);
    }
  }

  return NextResponse.json({ data: mockConversations });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = await createClient();

      if (body.action === 'send_message' && body.conversation_id) {
        // Add message to conversation
        const { data: conv } = await supabase
          .from('conversations')
          .select('messages')
          .eq('id', body.conversation_id)
          .single();

        if (conv) {
          const messages = [...(conv.messages as any[]), {
            id: `m_${Date.now()}`,
            role: 'human',
            content: body.message,
            sent_at: new Date().toISOString(),
            status: 'sent',
          }];

          await supabase
            .from('conversations')
            .update({ messages, last_message_at: new Date().toISOString() })
            .eq('id', body.conversation_id);
        }
      } else if (body.action === 'takeover' && body.conversation_id) {
        await supabase
          .from('conversations')
          .update({ is_ai_managed: false })
          .eq('id', body.conversation_id);
      }

      return NextResponse.json({ success: true, action: body.action });
    } catch (err: any) {
      console.error('DB error:', err.message);
    }
  }

  return NextResponse.json({
    success: true,
    action: body.action,
    conversation_id: body.conversation_id,
  });
}
