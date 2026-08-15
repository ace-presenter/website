/**
 * POST /api/account/delete
 *
 * Service-to-service account erasure (GDPR Art. 17 / Apple App Review 5.1.1).
 * Called by the ACE gateway's `POST /v1/account/delete` AFTER it has
 * authenticated the user's license JWT. This endpoint is authenticated by a
 * shared bearer secret — `ACCOUNT_SERVICE_SECRET`, the same value the gateway
 * is configured with — since it runs with the service role and bypasses RLS.
 *
 * Body: { license_id: string (= the Supabase auth user id), user_email?: string }
 *
 * Erases, via the service-role client:
 *   1. public.entitlements rows for the user (subject_id = uid)
 *   2. public.profiles row (also cascades from the auth-user delete in step 3)
 *   3. the Supabase Auth user itself — removes the email/password identity
 *
 * Idempotent: a user that no longer exists is treated as already-erased (200).
 */

import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // ── Service-to-service auth (shared secret with the gateway) ──────────────
  const secret = process.env.ACCOUNT_SERVICE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "account_delete_not_configured" }, { status: 503 });
  }
  const bearer = req.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!bearer || bearer !== secret) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let body: { license_id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
  const uid = typeof body.license_id === "string" ? body.license_id.trim() : "";
  if (!uid) {
    return NextResponse.json({ error: "missing_license_id" }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  // 1. Entitlements (PII-linked; keyed by subject_id, not covered by the
  //    profiles → auth.users cascade). A user's uuid never matches an org
  //    subject_id, so filtering on subject_id alone is exact.
  const { error: entErr } = await admin.from("entitlements").delete().eq("subject_id", uid);
  if (entErr) {
    return NextResponse.json({ error: "entitlements_delete_failed", detail: entErr.message }, { status: 500 });
  }

  // 2. Profiles row (explicit; also cascades from the auth delete below).
  const { error: profErr } = await admin.from("profiles").delete().eq("id", uid);
  if (profErr) {
    return NextResponse.json({ error: "profile_delete_failed", detail: profErr.message }, { status: 500 });
  }

  // 3. The Supabase Auth user — the email/password identity itself.
  //    Treat "not found" as already-erased so the call is idempotent.
  const { error: authErr } = await admin.auth.admin.deleteUser(uid);
  if (authErr && !/not.*found|user.*does not exist/i.test(authErr.message)) {
    return NextResponse.json({ error: "auth_delete_failed", detail: authErr.message }, { status: 500 });
  }

  return NextResponse.json({ deleted: true });
}
