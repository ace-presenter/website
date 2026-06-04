/**
 * GET /api/stripe/checkout?product=<id>&plan=<slug>&cadence=<month|year>
 *
 * Starts a Stripe checkout for the signed-in user and redirects to Stripe's
 * hosted page. Stripe REST via fetch (no SDK); the customer carries
 * metadata.userId.
 *
 * What gets purchased + granted is resolved from the shared pricing catalog
 * (src/lib/pricing.ts) via resolveCheckout(), so the displayed plan, the
 * charged price, and the granted entitlement tier stay in lockstep:
 *   - mode   = "subscription" | "payment" (one-time perpetual licenses)
 *   - tier   = the entitlement tier to grant (standard / business / …),
 *              NOT the plan slug — this is what the webhook provisions.
 *   - price  = process.env[<the plan's price env key>]
 *
 * Metadata (license_id, product, tier) rides on the subscription for subs and
 * on the session + payment intent for one-time buys, so the grant-on-payment
 * webhook has what it needs in both cases.
 */

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { resolveCheckout, type Cadence } from "@/lib/pricing";

const STRIPE_API = "https://api.stripe.com/v1";

export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.ace-presenter.app";
  const product = (req.nextUrl.searchParams.get("product") ?? "").toLowerCase();
  const plan = (req.nextUrl.searchParams.get("plan") ?? "").toLowerCase();
  const cadence = ((req.nextUrl.searchParams.get("cadence") ?? "month").toLowerCase() === "year"
    ? "year"
    : "month") as Cadence;

  const resolved = resolveCheckout(product, plan, cadence);
  if (!resolved) return NextResponse.redirect(`${appUrl}/pricing?checkout=unavailable`);

  const price = process.env[resolved.envKey];
  if (!price) return NextResponse.redirect(`${appUrl}/pricing?checkout=unavailable`);

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return NextResponse.redirect(`${appUrl}/pricing?checkout=error`);

  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.redirect(new URL("/login", req.url));

    const auth = { Authorization: `Bearer ${secretKey}` };
    const form = { ...auth, "Content-Type": "application/x-www-form-urlencoded" };

    // Find or create the Stripe customer carrying metadata.userId.
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

    const fields: Record<string, string> = {
      mode: resolved.mode,
      customer: customerId,
      "line_items[0][price]": price,
      "line_items[0][quantity]": "1",
      success_url: `${appUrl}/account?checkout=success`,
      cancel_url: `${appUrl}/pricing?checkout=cancelled`,
      // Session-level metadata is present for both subscription and one-time.
      "metadata[userId]": user.id,
      "metadata[license_id]": user.id,
      "metadata[product]": product,
      "metadata[tier]": resolved.tier,
    };

    if (resolved.mode === "subscription") {
      // Rides on the subscription so the cancel→revoke webhook + the
      // grant-on-payment step have everything they need.
      fields["subscription_data[metadata][license_id]"] = user.id;
      fields["subscription_data[metadata][product]"] = product;
      fields["subscription_data[metadata][tier]"] = resolved.tier;
    } else {
      // One-time: carry the same on the payment intent for the
      // checkout.session.completed grant path.
      fields["payment_intent_data[metadata][license_id]"] = user.id;
      fields["payment_intent_data[metadata][product]"] = product;
      fields["payment_intent_data[metadata][tier]"] = resolved.tier;
    }

    const session = (await fetch(`${STRIPE_API}/checkout/sessions`, {
      method: "POST",
      headers: form,
      body: new URLSearchParams(fields).toString(),
    }).then((r) => r.json())) as { url?: string };

    if (!session.url) return NextResponse.redirect(`${appUrl}/pricing?checkout=error`);
    return NextResponse.redirect(session.url);
  } catch (e) {
    console.error("[stripe/checkout]", e);
    return NextResponse.redirect(`${appUrl}/pricing?checkout=error`);
  }
}
