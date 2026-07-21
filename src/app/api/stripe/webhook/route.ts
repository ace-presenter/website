import { NextResponse } from "next/server";
import { verifyStripeWebhook } from "@/lib/stripe";
import { revokeLicenseAtGateway } from "@/lib/gateway";
import { grantEntitlement, revokeEntitlement } from "@/lib/grants";

/**
 * POST /api/stripe/webhook
 *
 * Drives entitlements off Stripe's event lifecycle. The licence_id + product +
 * tier ride in metadata (set at checkout), so no DB lookup is needed here.
 *
 *   checkout.session.completed       → grant one-time purchases (mode=payment)
 *   customer.subscription.created    → grant subscription entitlement
 *   customer.subscription.updated    → update (plan change, renewal, reactivation)
 *   customer.subscription.deleted    → revoke at gateway + mark inactive
 *
 * Subscriptions carry metadata on the subscription object itself.
 * One-time payments carry metadata on the payment_intent (set via
 * payment_intent_data[metadata] at checkout creation).
 */
export const dynamic = "force-dynamic";

interface StripeSub {
  id?: string;
  status?: string;
  customer?: string;
  current_period_end?: number;
  metadata?: Record<string, string>;
}

interface StripeSession {
  mode?: string;
  customer?: string;
  payment_intent?: string | { metadata?: Record<string, string> };
  metadata?: Record<string, string>;
}

export async function POST(req: Request): Promise<Response> {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "webhook_not_configured" }, { status: 503 });

  const raw = await req.text();
  const event = await verifyStripeWebhook(raw, req.headers.get("stripe-signature"), secret);
  if (!event) return NextResponse.json({ error: "invalid_signature" }, { status: 400 });

  // ── One-time purchases (Presenter $399, Notes $79) ──────────────────────────
  // These complete as checkout.session.completed with mode=payment. The
  // entitlement metadata rides on the payment_intent (set via
  // payment_intent_data[metadata] in the checkout route). We grant a perpetual
  // entitlement with no subscription id and no period_end.
  if (event.type === "checkout.session.completed") {
    const session = ((event.data as { object?: StripeSession })?.object ?? {}) as StripeSession;
    if (session.mode !== "payment") {
      // Subscription checkouts also fire this event — let subscription.created handle them.
      return NextResponse.json({ received: true, ignored: "checkout.session.completed (subscription mode)" });
    }

    // Metadata is on the session itself (set via metadata[...] at checkout creation).
    const md = session.metadata ?? {};
    const userId = md.license_id;
    const product = md.product;
    const tier = md.tier ?? "standard";

    if (!userId || !product) {
      return NextResponse.json({
        received: true, granted: false,
        detail: "missing license_id/product in session metadata",
      });
    }

    const granted = await grantEntitlement({
      userId, product, tier,
      status: "active",
      stripeCustomerId: typeof session.customer === "string" ? session.customer : null,
      stripeSubscriptionId: null,  // perpetual — no subscription
      periodEnd: null,             // never expires
    });
    return NextResponse.json({ received: true, granted, product, tier, mode: "one_time" });
  }

  // ── Subscription lifecycle ──────────────────────────────────────────────────
  const sub = ((event.data as { object?: StripeSub })?.object ?? {}) as StripeSub;
  const md = sub.metadata ?? {};
  const userId = md.license_id;
  const product = md.product;
  const tier = md.tier ?? "free";

  if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
    if (!userId || !product) {
      return NextResponse.json({
        received: true, granted: false,
        detail: "missing license_id/product in subscription metadata",
      });
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

  if (event.type === "customer.subscription.deleted") {
    if (!userId) {
      return NextResponse.json({
        received: true, revoked: false,
        detail: "no license_id in subscription metadata",
      });
    }
    const gateway = await revokeLicenseAtGateway(userId);
    if (product) await revokeEntitlement(userId, product);
    return NextResponse.json({ received: true, revoked: gateway.ok, license_id: userId, product, gateway });
  }

  return NextResponse.json({ received: true, ignored: event.type });
}
