import { NextResponse } from 'next/server';
import { isSupabaseConfigured } from '@/lib/supabase/database';
import { isStripeConfigured } from '@/lib/services/stripe';
import { isGHLConfigured } from '@/lib/services/ghl';
import { getTwitterStatus } from '@/lib/services/twitter';

export async function GET() {
  return NextResponse.json({
    supabase: {
      configured: isSupabaseConfigured(),
      message: isSupabaseConfigured() ? 'Connected' : 'Not configured - using mock data',
    },
    stripe: {
      configured: isStripeConfigured(),
      message: isStripeConfigured() ? 'Connected' : 'Not configured - billing in demo mode',
    },
    ghl: {
      configured: isGHLConfigured(),
      message: isGHLConfigured() ? 'Connected' : 'Not configured',
    },
    twitter: getTwitterStatus(),
  });
}
