import { NextResponse } from 'next/server';
import { handleWebhookEvent } from '@/lib/services/stripe';

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  try {
    const body = await request.text();
    const event = await handleWebhookEvent(body, signature);

    switch (event.type) {
      case 'checkout_completed': {
        // Update workspace with Stripe IDs
        if (event.workspaceId) {
          try {
            const { createAdminClient } = await import('@/lib/supabase/admin');
            const supabase = createAdminClient();
            await supabase
              .from('workspaces')
              .update({
                stripe_customer_id: event.customerId,
                stripe_subscription_id: event.subscriptionId,
                plan: event.plan || 'growth',
                subscription_status: 'active',
              })
              .eq('id', event.workspaceId);
          } catch (err) {
            console.error('Error updating workspace after checkout:', err);
          }
        }
        break;
      }
      case 'subscription_updated': {
        try {
          const { createAdminClient } = await import('@/lib/supabase/admin');
          const supabase = createAdminClient();
          await supabase
            .from('workspaces')
            .update({ subscription_status: event.status })
            .eq('stripe_customer_id', event.customerId);
        } catch (err) {
          console.error('Error updating subscription:', err);
        }
        break;
      }
      case 'subscription_deleted': {
        try {
          const { createAdminClient } = await import('@/lib/supabase/admin');
          const supabase = createAdminClient();
          await supabase
            .from('workspaces')
            .update({
              subscription_status: 'canceled',
              plan: 'starter',
              stripe_subscription_id: null,
            })
            .eq('stripe_customer_id', event.customerId);
        } catch (err) {
          console.error('Error canceling subscription:', err);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
