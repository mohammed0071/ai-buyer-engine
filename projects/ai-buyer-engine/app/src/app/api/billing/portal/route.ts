import { NextResponse } from 'next/server';
import { createBillingPortalSession } from '@/lib/services/stripe';
import { isSupabaseConfigured } from '@/lib/supabase/database';

export async function POST() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  if (isSupabaseConfigured()) {
    try {
      const { getCurrentProfile } = await import('@/lib/supabase/database');
      const profile = await getCurrentProfile();
      if (profile?.workspace_id) {
        const { createClient } = await import('@/lib/supabase/server');
        const supabase = await createClient();
        const { data: workspace } = await supabase
          .from('workspaces')
          .select('stripe_customer_id')
          .eq('id', profile.workspace_id)
          .single();

        if (workspace?.stripe_customer_id) {
          const result = await createBillingPortalSession(
            workspace.stripe_customer_id,
            `${appUrl}/dashboard/settings`
          );
          if (result.url) {
            return NextResponse.json({ url: result.url });
          }
        }
      }
    } catch (err) {
      console.error('Portal error:', err);
    }
  }

  return NextResponse.json({
    url: null,
    demo: true,
    message: 'Stripe billing portal not available. Connect Stripe to manage subscriptions.',
  });
}
