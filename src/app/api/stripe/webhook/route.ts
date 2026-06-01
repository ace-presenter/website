import { NextResponse } from "next/server";
import { verifyStripeWebhook } from "@/lib/stripe";
import { revokeLicenseAtGateway } from "@/lib/gateway";

/**
 * POST /api/stripe/webhook
 *
 * On `customer.subscription.deleted`, tells the ACE gateway to revoke the
 * licence so it stops being honoured. The licence id rides in the Stripe
 * subscription metadata (`metadata.license_id`, set at checkout) — so no DB
 * lookup is needed here; if it's ever absent, a Supabase
 * customer→license lookup is the fallback seam.
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<Response> {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "webhook_not_configured" }, { status: 503 });

  const raw = await req.text(); // raw body required for signature verification
  const event = await verifyStripeWebhook(raw, req.headers.get("stripe-signature"), secret);
  if (!event) return NextResponse.json({ error: "invalid_signature" }, { status: 400 });

  if (event.type === "customer.subscription.deleted") {
    const obj = (event.data as { object?: Record<string, unknown> })?.object ?? {};
    const metadata = (obj.metadata as Record<string, string> | undefined) ?? {};
    const licenseId = metadata.license_id;
    if (!licenseId) {
      // TODO: fall back to a Supabase customer→license lookup once wired.
      return NextResponse.json({ received: true, revoked: false, detail: "no license_id in subscription metadata" });
    }
    const result = await revokeLicenseAtGateway(licenseId);
    return NextResponse.json({ received: true, revoked: result.ok, license_id: licenseId, gateway: result });
  }

  return NextResponse.json({ received: true, ignored: event.type });
}
