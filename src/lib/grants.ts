import { createSupabaseAdminClient } from "./supabase-server";

/**
 * Write entitlement changes to Supabase from Stripe webhooks (service role,
 * bypasses RLS). The grant/revoke SQL is the mirror of `ace_resolve_entitlements`
 * — define these two functions on the ACE Account project:
 *
 *   ace_grant_entitlement(p_uid uuid, p_product text, p_tier text, p_status text,
 *                         p_stripe_customer text, p_stripe_subscription text,
 *                         p_period_end timestamptz)
 *     → upsert the user's entitlement row for this product.
 *
 *   ace_revoke_entitlement(p_uid uuid, p_product text)
 *     → mark the user's entitlement for this product inactive.
 *
 * (Org-level plans: the grant function can route p_uid → the org it administers.)
 */

export interface GrantInput {
  userId: string;
  product: string;
  tier: string;
  status: string;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  /** Unix seconds (Stripe current_period_end), or null. */
  periodEnd?: number | null;
}

export async function grantEntitlement(p: GrantInput): Promise<boolean> {
  try {
    const admin = createSupabaseAdminClient();
    const { error } = await admin.rpc("ace_grant_entitlement", {
      p_uid: p.userId,
      p_product: p.product,
      p_tier: p.tier,
      p_status: p.status,
      p_stripe_customer: p.stripeCustomerId ?? null,
      p_stripe_subscription: p.stripeSubscriptionId ?? null,
      p_period_end: p.periodEnd ? new Date(p.periodEnd * 1000).toISOString() : null,
    });
    if (error) { console.error("[grants] ace_grant_entitlement:", error.message); return false; }
    return true;
  } catch (e) {
    console.error("[grants] grantEntitlement:", e instanceof Error ? e.message : e);
    return false;
  }
}

export async function revokeEntitlement(userId: string, product: string): Promise<boolean> {
  try {
    const admin = createSupabaseAdminClient();
    const { error } = await admin.rpc("ace_revoke_entitlement", { p_uid: userId, p_product: product });
    if (error) { console.error("[grants] ace_revoke_entitlement:", error.message); return false; }
    return true;
  } catch (e) {
    console.error("[grants] revokeEntitlement:", e instanceof Error ? e.message : e);
    return false;
  }
}
