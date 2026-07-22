/**
 * POST /api/auth/signout
 *
 * Signs the user out of their ACE Account session and redirects to /login.
 */

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.signOut();
  // 303 See Other so the browser follows with a GET. The default 307 preserves
  // the POST method, which would re-POST to /login (GET-only) → HTTP 405.
  return NextResponse.redirect(new URL("/login", req.url), 303);
}
