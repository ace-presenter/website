import type { LicenseClaim, Tier, Product } from "./license";
import { createSupabaseServerClient, createSupabaseAdminClient } from "./supabase-server";

/**
 * Resolve the requesting user's ACE Suite entitlements.
 *
 * Reads the user's session from cookies (Supabase SSR), then calls
 * `ace_resolve_entitlements(uid)` via the service-role client to get their
 * products + tier without hitting RLS. Maps ACE Manager plan labels to
 * Gateway tier vocabulary:
 *
 *   ACE Manager plan → Gateway tier
 *   ─────────────────────────────────
 *   free             → free
 *   pro              → standard  (Church)
 *   business         → pro       (Network)
 *   enterprise       → pro       (same ceiling)
 *   standard         → standard  (consumer products that store gateway tier)
 *
 * Returns null when the user is not authenticated.
 *
 * Dev override: set LICENSE_DEV_EMAIL to skip Supabase and get a full
 * Pro entitlement (useful for testing the site → gateway contract).
 */

type EntitlementRow = {
  product: string;
  tier: string;
  status: string;
  expires_at: string | null;
};

function toGatewayTier(label: string): Tier {
  switch ((label ?? "free").toLowerCase()) {
    case "free":       return "free";
    case "standard":   return "standard";
    case "pro":        return "standard";  // ACE Manager "Pro/Church" → standard
    case "business":   return "business";  // Schedule Pro, Suite bundle → business
    case "enterprise": return "pro";       // ACE Manager "Network" → pro
    default:           return "free";
  }
}

const TIER_RANK: Record<Tier, number> = { free: 0, standard: 1, business: 2, pro: 3 };

const KNOWN_PRODUCTS: Product[] = [
  "presenter", "world", "schedule", "notes", "manager",
];

function isProduct(s: string): s is Product {
  return KNOWN_PRODUCTS.includes(s as Product);
}

export async function resolveEntitlements(req: Request): Promise<LicenseClaim | null> {
  // ── Dev override ──────────────────────────────────────────────────────────
  const devEmail = process.env.LICENSE_DEV_EMAIL;
  if (devEmail) {
    return {
      license_id: `dev-${devEmail.split("@")[0]}`,
      tier: "pro",
      products: ["presenter", "world", "schedule", "notes", "manager"],
      user_email: devEmail,
    };
  }

  // ── Auth: Bearer token (native apps) OR cookie session (web SSR) ───────────
  // Native ACE apps (Presenter, Editors' Notes) can't carry the browser
  // cookie, so they sign in via the Supabase password grant and send the
  // resulting access token as `Authorization: Bearer <token>`. We validate
  // it with the admin client. Web requests keep using the SSR cookie path.
  let user: { id: string; email?: string } | null = null;

  const authHeader = req.headers.get("authorization") ?? req.headers.get("Authorization");
  const bearer = authHeader?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (bearer) {
    try {
      const admin = createSupabaseAdminClient();
      const { data, error } = await admin.auth.getUser(bearer);
      if (error || !data.user) return null;
      user = data.user;
    } catch {
      return null;
    }
  } else {
    try {
      const supabase = await createSupabaseServerClient();
      const { data: { user: u } } = await supabase.auth.getUser();
      user = u;
    } catch {
      // Supabase not configured yet — fall through and return null
      return null;
    }
  }
  if (!user) return null;

  // ── Resolve entitlements via service role ─────────────────────────────────
  let rows: EntitlementRow[] = [];
  try {
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin.rpc("ace_resolve_entitlements", {
      p_uid: user.id,
    });
    if (error) {
      console.error("[entitlements] ace_resolve_entitlements error:", error.message);
      return null;
    }
    rows = (data ?? []) as EntitlementRow[];
  } catch {
    return null;
  }

  if (!rows.length) {
    // Authenticated but no entitlements — return a free-tier claim so they
    // can at least sign in and see their account page.
    return {
      license_id: user.id,
      tier: "free",
      products: [],
      user_email: user.email ?? "",
    };
  }

  // ── Map rows to license claim ─────────────────────────────────────────────
  const products: Product[] = [];
  let tier: Tier = "free";
  // Track the period_end of the highest-tier entitlement.
  // null = lifetime (no expires_at in the row), undefined = not yet resolved.
  let period_end: number | null | undefined = undefined;

  for (const row of rows) {
    if (isProduct(row.product) && !products.includes(row.product)) {
      products.push(row.product);
    }
    const t = toGatewayTier(row.tier);
    if (TIER_RANK[t] > TIER_RANK[tier]) {
      tier = t;
      // null expires_at = lifetime; ISO string = subscription end
      period_end = row.expires_at
        ? Math.floor(new Date(row.expires_at).getTime() / 1000)
        : null;
    }
  }

  return {
    license_id: user.id,
    tier,
    products,
    user_email: user.email ?? "",
    period_end,
  };
}
