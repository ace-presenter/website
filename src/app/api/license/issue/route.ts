import { NextResponse } from "next/server";
import { issueLicense } from "@/lib/license";
import { resolveEntitlements } from "@/lib/entitlements";

/**
 * POST /api/license/issue
 *
 * Mints a short-lived ACE licence JWT for the signed-in user, to be sent as
 * `Authorization: Bearer <token>` to api.ace-presenter.app. Desktop apps read it
 * from the account page; the Schedule/Manager web apps forward their own.
 *
 * Per-request (reads env + the session), never cached.
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<Response> {
  const claim = await resolveEntitlements(req);
  if (!claim) {
    return NextResponse.json(
      { error: "unauthenticated", detail: "Sign in to get your ACE licence key." },
      { status: 401 },
    );
  }
  try {
    const issued = await issueLicense(claim);
    return NextResponse.json(issued);
  } catch (e) {
    const detail = e instanceof Error ? e.message : "issue_failed";
    return NextResponse.json({ error: "issue_failed", detail }, { status: 503 });
  }
}
