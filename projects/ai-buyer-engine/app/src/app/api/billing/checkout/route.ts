import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { plan, billing_period } = body;

  // In production: create Stripe Checkout session
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const session = await stripe.checkout.sessions.create({
  //   mode: 'subscription',
  //   line_items: [{ price: priceId, quantity: 1 }],
  //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
  //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
  // });

  return NextResponse.json({
    success: true,
    checkout_url: '/dashboard/settings?checkout=demo',
    message: 'Stripe checkout is in demo mode. Connect your Stripe account to enable billing.',
  });
}
