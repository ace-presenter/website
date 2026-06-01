/**
 * GET /api/stripe/portal
 *
 * Creates a Stripe Customer Portal session for the signed-in user and
 * immediately redirects them there. Looks up the Stripe customer by
 * metadata.userId on the customer record (set at consumer checkout).
 * On failure, redirects to /account.
 */

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const STRIPE_API = "https://api.stripe.com/v1";

export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://ace-presenter.app";

  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.redirect(new URL("/login", req.url));

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) return NextResponse.redirect(`${appUrl}/account?billing=error`);

    // Find the Stripe customer for this user
    const searchRes = await fetch(
      `${STRIPE_API}/customers/search?query=metadata["userId"]:"${user.id}"&limit=1`,
      { headers: { Authorization: `Bearer ${secretKey}` } }
    );
    const searchData = await searchRes.json() as { data?: Array<{ id: string }> };
    const customerId = searchData.data?.[0]?.id;
    if (!customerId) return NextResponse.redirect(`${appUrl}/pricing`);

    // Create a portal session
    const portalRes = await fetch(`${STRIPE_API}/billing_portal/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        customer: customerId,
        return_url: `${appUrl}/account`,
      }).toString(),
    });
    const portal = await portalRes.json() as { url?: string };
    if (!portal.url) return NextResponse.redirect(`${appUrl}/account?billing=error`);

    return NextResponse.redirect(portal.url);
  } catch (e) {
    console.error("[stripe/portal]", e);
    return NextResponse.redirect(`${appUrl}/account?billing=error`);
  }
}
