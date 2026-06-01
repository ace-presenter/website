/**
 * GET /api/stripe/checkout?product=<id>&plan=<tier>
 *
 * Starts a Stripe subscription checkout for the signed-in user and redirects to
 * Stripe's hosted page. Matches the portal route's conventions: Stripe REST via
 * fetch (no SDK), the customer carries metadata.userId.
 *
 * The subscription metadata carries:
 *   - license_id = the user's id (so the cancel webhook can revoke — see
 *     /api/stripe/webhook and the gateway's /v1/license/revoke)
 *   - product + tier (so the grant-on-payment step knows what to provision)
 *
 * Price ids come from env: STRIPE_PRICE_<PRODUCT>_<PLAN> (e.g.
 * STRIPE_PRICE_PRESENTER_STANDARD, STRIPE_PRICE_MANAGER_CHURCH).
 */

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const STRIPE_API = "https://api.stripe.com/v1";

function priceId(product: string, plan: string): string | undefined {
  const key = `STRIPE_PRICE_${product.toUpperCase()}_${plan.toUpperCase()}`;
  return process.env[key];
}

export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.ace-presenter.app";
  const product = (req.nextUrl.searchParams.get("product") ?? "").toLowerCase();
  const plan = (req.nextUrl.searchParams.get("plan") ?? "").toLowerCase();

  const price = priceId(product, plan);
  if (!price) return NextResponse.redirect(`${appUrl}/pricing?checkout=unavailable`);

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return NextResponse.redirect(`${appUrl}/pricing?checkout=error`);

  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.redirect(new URL("/login", req.url));

    const auth = { Authorization: `Bearer ${secretKey}` };
    const form = { ...auth, "Content-Type": "application/x-www-form-urlencoded" };

    // Find or create the Stripe customer carrying metadata.userId (so /portal
    // can find it later).
    const search = (await fetch(
      `${STRIPE_API}/customers/search?query=metadata["userId"]:"${user.id}"&limit=1`,
      { headers: auth },
    ).then((r) => r.json())) as { data?: Array<{ id: string }> };
    let customerId = search.data?.[0]?.id;
    if (!customerId) {
      const created = (await fetch(`${STRIPE_API}/customers`, {
        method: "POST",
        headers: form,
        body: new URLSearchParams({ email: user.email ?? "", "metadata[userId]": user.id }).toString(),
      }).then((r) => r.json())) as { id?: string };
      customerId = created.id;
    }
    if (!customerId) return NextResponse.redirect(`${appUrl}/pricing?checkout=error`);

    const session = (await fetch(`${STRIPE_API}/checkout/sessions`, {
      method: "POST",
      headers: form,
      body: new URLSearchParams({
        mode: "subscription",
        customer: customerId,
        "line_items[0][price]": price,
        "line_items[0][quantity]": "1",
        success_url: `${appUrl}/account?checkout=success`,
        cancel_url: `${appUrl}/pricing?checkout=cancelled`,
        // Rides on the subscription so the cancel→revoke webhook + the
        // grant-on-payment step have everything they need.
        "subscription_data[metadata][license_id]": user.id,
        "subscription_data[metadata][product]": product,
        "subscription_data[metadata][tier]": plan,
        "metadata[userId]": user.id,
      }).toString(),
    }).then((r) => r.json())) as { url?: string };

    if (!session.url) return NextResponse.redirect(`${appUrl}/pricing?checkout=error`);
    return NextResponse.redirect(session.url);
  } catch (e) {
    console.error("[stripe/checkout]", e);
    return NextResponse.redirect(`${appUrl}/pricing?checkout=error`);
  }
}
