/**
 * ACE Site — Supabase server client.
 *
 * Cookie-based SSR client for Server Components and Route Handlers.
 * Points to the ACE Account project (bbphvwgwmqffzdbtivmg) — the shared
 * identity store for all ACE Suite products.
 *
 * ENV (add to .env.local):
 *   NEXT_PUBLIC_SUPABASE_URL        = https://bbphvwgwmqffzdbtivmg.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY   = <anon key>
 *   SUPABASE_SERVICE_ROLE_KEY       = <service role key>  (server-only)
 */

import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const SUPABASE_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/**
 * Cookie-aware server client — reads and refreshes the user's session.
 * Use in Server Components and Route Handlers that need `auth.getUser()`.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — cookies are read-only.
          // The middleware handles session refresh in this case.
        }
      },
    },
  });
}

/**
 * Service-role client — bypasses RLS.
 * Use only server-side for trusted operations (e.g., calling
 * `ace_resolve_entitlements` which needs to see all rows).
 */
export function createSupabaseAdminClient() {
  if (!SUPABASE_SERVICE) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE, {
    auth: { persistSession: false },
  });
}
