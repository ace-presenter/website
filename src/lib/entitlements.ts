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

/**
 * Terms §4B: "Users who registered accounts during the public beta window are
 * grandfathered into our Standard Tier free of charge for life. This commitment
 * survives the end of the beta window and is not withdrawn by it."
 *
 * That promise is published and binding, and until this code existed nothing
 * honoured it. Enforcement went live while the exemption did not, so a beta
 * registrant with no purchase resolved to `free` — watermarked output, one
 * screen — which is the opposite of what they were told, on a page they can
 * still read.
 *
 * The window's end date: the beta was declared closed on 2026-08-25, when the
 * Terms were rewritten to say so. The Terms describe a "90-day public beta
 * window" but never state its dates, so "registered during the beta" had no
 * defined meaning. Anyone who registered before the day we said it ended
 * registered during it. Where the wording is ambiguous the reading that favours
 * the user is the only safe one — we wrote the ambiguity, they did not.
 *
 * Deliberately a floor, never a ceiling: a beta registrant who later bought
 * business or pro keeps what they paid for.
 */
const BETA_WINDOW_CLOSED_MS = Date.parse("2026-08-25T00:00:00Z");

/** The tier §4B promises. Pricing sells this as "Pro, $29/mo". */
const GRANDFATHERED_TIER: Tier = "standard";

/**
 * Scope: Presenter only. The Terms say "the ACE software suite" was in beta but
 * name a single "Standard Tier", and Presenter is the only suite product that
 * has shipped — nobody ran a beta of something that does not exist. Widening
 * this is one edit here if that reading is wrong.
 */
const GRANDFATHERED_PRODUCTS: Product[] = ["presenter"];

function registeredDuringBeta(user: { created_at?: string }): boolean {
  // Supabase always sets created_at; if it is somehow absent we cannot claim
  // someone registered in the window, so we do not silently hand out a tier.
  if (!user.created_at) return false;
  const registered = Date.parse(user.created_at);
  return Number.isFinite(registered) && registered < BETA_WINDOW_CLOSED_MS;
}

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
  let user: { id: string; email?: string; created_at?: string } | null = null;

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
    // Authenticated but no entitlements. Beta registrants are owed Standard for
    // life under §4B and have no row to prove it, so this is the path that was
    // silently breaching the Terms.
    const grandfathered = registeredDuringBeta(user);
    return {
      license_id: user.id,
      tier: grandfathered ? GRANDFATHERED_TIER : "free",
      products: grandfathered ? [...GRANDFATHERED_PRODUCTS] : [],
      user_email: user.email ?? "",
      // null = lifetime, and "for life" is the actual wording.
      period_end: grandfathered ? null : undefined,
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

  // §4B floor. Someone can hold a row that resolves below Standard (a lapsed
  // subscription, a free-tier row) and still be owed Standard for life.
  if (registeredDuringBeta(user) && TIER_RANK[tier] < TIER_RANK[GRANDFATHERED_TIER]) {
    tier = GRANDFATHERED_TIER;
    period_end = null;
    for (const p of GRANDFATHERED_PRODUCTS) {
      if (!products.includes(p)) products.push(p);
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
