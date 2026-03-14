import { NextResponse } from 'next/server';
import { createCheckoutSession, PRICING_PLANS } from '@/lib/services/stripe';
import { isSupabaseConfigured } from '@/lib/supabase/database';

export async function POST(request: Request) {
  const body = await request.json();
  const { plan, billing_period = 'monthly' } = body;

  if (!plan || !(plan in PRICING_PLANS)) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  }

  // Get workspace info if Supabase is configured
  let workspaceId = 'demo';
  let customerId: string | undefined;

  if (isSupabaseConfigured()) {
    try {
      const { getCurrentProfile } = await import('@/lib/supabase/database');
      const profile = await getCurrentProfile();
      if (profile?.workspace_id) {
        workspaceId = profile.workspace_id;
        // Get stripe customer ID if exists
        const { createClient } = await import('@/lib/supabase/server');
        const supabase = await createClient();
        const { data: workspace } = await supabase
          .from('workspaces')
          .select('stripe_customer_id')
          .eq('id', profile.workspace_id)
          .single();
        customerId = workspace?.stripe_customer_id || undefined;
      }
    } catch (err) {
      console.error('Error getting workspace:', err);
    }
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  try {
    const result = await createCheckoutSession({
      workspaceId,
      plan: plan as keyof typeof PRICING_PLANS,
      billingPeriod: billing_period,
      customerId,
      successUrl: `${appUrl}/dashboard?checkout=success&plan=${plan}`,
      cancelUrl: `${appUrl}/dashboard/settings`,
    });

    if (result.demo) {
      return NextResponse.json({
        success: true,
        checkout_url: '/dashboard/settings?checkout=demo',
        message: result.message,
        demo: true,
      });
    }

    return NextResponse.json({ success: true, checkout_url: result.url });
  } catch (err: any) {
    console.error('Stripe checkout error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
