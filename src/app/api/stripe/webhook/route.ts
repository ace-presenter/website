import { NextResponse } from "next/server";
import { verifyStripeWebhook } from "@/lib/stripe";
import { revokeLicenseAtGateway } from "@/lib/gateway";
import { grantEntitlement, revokeEntitlement } from "@/lib/grants";

/**
 * POST /api/stripe/webhook
 *
 * Drives entitlements off Stripe's subscription lifecycle. The licence id +
 * product + tier ride in the subscription metadata (set at checkout), so no DB
 * lookup is needed here:
 *
 *   subscription.created / .updated  → grant (upsert) the entitlement in Supabase
 *   subscription.deleted             → revoke at the gateway + mark inactive
 */
export const dynamic = "force-dynamic";

interface StripeSub {
  id?: string;
  status?: string;
  customer?: string;
  current_period_end?: number;
  metadata?: Record<string, string>;
}

export async function POST(req: Request): Promise<Response> {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "webhook_not_configured" }, { status: 503 });

  const raw = await req.text(); // raw body required for signature verification
  const event = await verifyStripeWebhook(raw, req.headers.get("stripe-signature"), secret);
  if (!event) return NextResponse.json({ error: "invalid_signature" }, { status: 400 });

  const sub = ((event.data as { object?: StripeSub })?.object ?? {}) as StripeSub;
  const md = sub.metadata ?? {};
  const userId = md.license_id;   // = the Supabase user id (set at checkout)
  const product = md.product;
  const tier = md.tier ?? "free";

  // Grant / update on subscribe + plan changes.
  if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
    if (!userId || !product) {
      return NextResponse.json({ received: true, granted: false, detail: "missing license_id/product in subscription metadata" });
    }
    const active = sub.status === "active" || sub.status === "trialing";
    const granted = await grantEntitlement({
      userId, product, tier,
      status: active ? "active" : (sub.status ?? "inactive"),
      stripeCustomerId: sub.customer ?? null,
      stripeSubscriptionId: sub.id ?? null,
      periodEnd: sub.current_period_end ?? null,
    });
    return NextResponse.json({ received: true, granted, product, tier, active });
  }

  // Cancel: revoke the licence at the gateway AND mark the entitlement inactive.
  if (event.type === "customer.subscription.deleted") {
    if (!userId) {
      return NextResponse.json({ received: true, revoked: false, detail: "no license_id in subscription metadata" });
    }
    const gateway = await revokeLicenseAtGateway(userId);
    if (product) await revokeEntitlement(userId, product);
    return NextResponse.json({ received: true, revoked: gateway.ok, license_id: userId, product, gateway });
  }

  return NextResponse.json({ received: true, ignored: event.type });
}
