// ============================================================
// Stripe Integration Service
// ============================================================

import Stripe from 'stripe';

// Pricing plans configuration
export const PRICING_PLANS = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price_monthly: 99,
    price_yearly: 79,
    features: {
      active_prospects: 200,
      ai_messages_per_month: 200,
      connected_accounts: 1,
      team_members: 1,
      crm_integrations: false,
      advanced_analytics: false,
    },
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    price_monthly: 399,
    price_yearly: 319,
    features: {
      active_prospects: 2000,
      ai_messages_per_month: 1000,
      connected_accounts: 3,
      team_members: 3,
      crm_integrations: true,
      advanced_analytics: true,
    },
  },
  scale: {
    id: 'scale',
    name: 'Scale',
    price_monthly: 899,
    price_yearly: 719,
    features: {
      active_prospects: 10000,
      ai_messages_per_month: 5000,
      connected_accounts: 10,
      team_members: 10,
      crm_integrations: true,
      advanced_analytics: true,
    },
  },
  agency: {
    id: 'agency',
    name: 'Agency',
    price_monthly: 1499,
    price_yearly: 1199,
    features: {
      active_prospects: 50000,
      ai_messages_per_month: 20000,
      connected_accounts: 50,
      team_members: 25,
      crm_integrations: true,
      advanced_analytics: true,
    },
  },
} as const;

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes('placeholder') || key === 'sk_test_placeholder') {
    return null;
  }
  return new Stripe(key, { apiVersion: '2025-04-30.basil' as Stripe.LatestApiVersion });
}

export function isStripeConfigured(): boolean {
  return getStripe() !== null;
}

export async function createCheckoutSession(params: {
  workspaceId: string;
  plan: keyof typeof PRICING_PLANS;
  billingPeriod: 'monthly' | 'yearly';
  customerId?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const stripe = getStripe();
  if (!stripe) {
    return { url: null, demo: true, message: 'Stripe not configured. Set STRIPE_SECRET_KEY to enable billing.' };
  }

  const plan = PRICING_PLANS[params.plan];
  if (!plan) throw new Error(`Invalid plan: ${params.plan}`);

  const unitAmount = params.billingPeriod === 'yearly' ? plan.price_yearly * 100 : plan.price_monthly * 100;

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `AI Buyer Engine - ${plan.name}`,
            description: `${plan.features.active_prospects.toLocaleString()} prospects, ${plan.features.ai_messages_per_month.toLocaleString()} AI messages/mo`,
          },
          unit_amount: unitAmount,
          recurring: {
            interval: params.billingPeriod === 'yearly' ? 'year' : 'month',
          },
        },
        quantity: 1,
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: {
      workspace_id: params.workspaceId,
      plan: params.plan,
    },
  };

  if (params.customerId) {
    sessionParams.customer = params.customerId;
  } else {
    sessionParams.customer_creation = 'always';
  }

  const session = await stripe.checkout.sessions.create(sessionParams);
  return { url: session.url, demo: false };
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  const stripe = getStripe();
  if (!stripe) return { url: null, demo: true };

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return { url: session.url, demo: false };
}

export async function handleWebhookEvent(body: string, signature: string) {
  const stripe = getStripe();
  if (!stripe) throw new Error('Stripe not configured');

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || webhookSecret.includes('placeholder')) {
    throw new Error('Stripe webhook secret not configured');
  }

  const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      return {
        type: 'checkout_completed',
        workspaceId: session.metadata?.workspace_id,
        customerId: session.customer as string,
        subscriptionId: session.subscription as string,
        plan: session.metadata?.plan,
      };
    }
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription;
      return {
        type: 'subscription_updated',
        customerId: sub.customer as string,
        subscriptionId: sub.id,
        status: sub.status,
      };
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      return {
        type: 'subscription_deleted',
        customerId: sub.customer as string,
        subscriptionId: sub.id,
      };
    }
    default:
      return { type: 'unhandled', eventType: event.type };
  }
}
