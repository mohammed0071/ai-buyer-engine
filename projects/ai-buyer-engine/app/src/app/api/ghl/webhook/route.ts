import { NextResponse } from 'next/server';
import { parseWebhook, isGHLConfigured } from '@/lib/services/ghl';

export async function POST(request: Request) {
  if (!isGHLConfigured()) {
    return NextResponse.json({ received: true, demo: true });
  }

  try {
    const body = await request.json();
    const payload = parseWebhook(body);

    console.log(`GHL Webhook: ${payload.type}`, {
      contactId: payload.contactId,
      conversationId: payload.conversationId,
    });

    switch (payload.type) {
      case 'InboundMessage': {
        // Handle incoming message from GHL
        // TODO: Match to prospect and update conversation in DB
        console.log('Inbound message from GHL:', payload.message);
        break;
      }
      case 'AppointmentCreate': {
        // Handle appointment creation
        console.log('Appointment created in GHL:', payload.appointmentId);
        break;
      }
      case 'ContactCreate': {
        // Handle contact creation (e.g., from form submission)
        console.log('Contact created in GHL:', payload.contactId);
        break;
      }
      default:
        console.log('Unhandled GHL webhook type:', payload.type);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('GHL webhook error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
