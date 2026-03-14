// Admin Supabase client - uses service role key, bypasses RLS
// ONLY use in server-side API routes, never expose to client

import { createClient } from '@supabase/supabase-js';

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || url.includes('placeholder') || url === 'your-supabase-url') {
    throw new Error('Supabase admin client not configured');
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
