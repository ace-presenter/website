import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { issueLicense } from "@/lib/license";
import { resolveEntitlements } from "@/lib/entitlements";

/**
 * POST /api/license/issue
 *
 * Mints a short-lived ACE licence JWT for the signed-in user, sent as
 * `Authorization: Bearer <token>` to api.ace-presenter.app.
 *
 * Single-issuer rule: in production the **Supabase `mint-license` edge function**
 * is the ONLY thing that signs licences (it holds the private key; the VW desktop
 * client calls it directly too — see ace-license.ts). This route just proxies to
 * it with the user's session, so the site never holds the signing key and the two
 * issuers can't drift.
 *
 * Dev escape hatch: when LICENSE_DEV_EMAIL is set, mint locally via issueLicense
 * (no Supabase needed) so the site → gateway contract can be tested offline.
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<Response> {
  // ── Dev: local mint (offline contract testing only) ───────────────────────
  if (process.env.LICENSE_DEV_EMAIL) {
    const claim = await resolveEntitlements(req);
    if (!claim) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    try {
      return NextResponse.json(await issueLicense(claim));
    } catch (e) {
      const detail = e instanceof Error ? e.message : "issue_failed";
      return NextResponse.json({ error: "issue_failed", detail }, { status: 503 });
    }
  }

  // ── Production: proxy to the canonical mint-license edge function ──────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anon) {
    return NextResponse.json({ error: "account_not_configured" }, { status: 503 });
  }

  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json(
      { error: "unauthenticated", detail: "Sign in to get your ACE licence key." },
      { status: 401 },
    );
  }

  try {
    const res = await fetch(`${supabaseUrl}/functions/v1/mint-license`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        apikey: anon,
        "Content-Type": "application/json",
      },
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok) {
      return NextResponse.json(
        { error: "issue_failed", detail: data.error ?? `mint-license HTTP ${res.status}` },
        { status: 502 },
      );
    }
    return NextResponse.json(data);
  } catch (e) {
    const detail = e instanceof Error ? e.message : "mint_unreachable";
    return NextResponse.json({ error: "issue_failed", detail }, { status: 502 });
  }
}
