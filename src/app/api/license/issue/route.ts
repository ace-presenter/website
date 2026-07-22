import { NextResponse } from "next/server";
import { issueLicense } from "@/lib/license";
import { resolveEntitlements } from "@/lib/entitlements";

/**
 * POST /api/license/issue
 *
 * Mints an RS256 ACE license JWT for the authenticated user.
 * The JWT is sent as `Authorization: Bearer <token>` to api.ace-presenter.app.
 *
 * Auth: accepts either a Supabase Bearer access token (native apps — they
 * sign in via the Supabase password grant and send the resulting token) or
 * a cookie session (web SSR from the /account page).
 *
 * TTL is tier-aware (set in lib/license.ts):
 *   lifetime purchase (period_end === null) → 10 years
 *   active subscription                     → period_end + 5-day buffer
 *   free tier / unknown                     → 35 days
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<Response> {
  const claim = await resolveEntitlements(req);

  if (!claim) {
    return NextResponse.json(
      { error: "unauthenticated", detail: "Sign in to get your ACE license key." },
      { status: 401 },
    );
  }

  try {
    return NextResponse.json(await issueLicense(claim));
  } catch (e) {
    const detail = e instanceof Error ? e.message : "issue_failed";
    return NextResponse.json({ error: "issue_failed", detail }, { status: 503 });
  }
}
