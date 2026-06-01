import type { LicenseClaim } from "./license";

/**
 * Resolve the requesting user's licence entitlements (who they are + what they
 * have access to).
 *
 * TODO — wire to Supabase: read the user's session from the request cookies and
 * their row in the `licenses` table ({ tier, products }), then return the claim.
 * This is the single seam the unified ACE account plugs into; the rest of the
 * issuing path (license.ts) is already final.
 *
 * Until Supabase is wired, a dev override (env `LICENSE_DEV_EMAIL`) returns a
 * full Pro entitlement so the site → gateway licence contract can be exercised
 * end-to-end. Returns null when there's no authenticated user.
 */
export async function resolveEntitlements(_req: Request): Promise<LicenseClaim | null> {
  const devEmail = process.env.LICENSE_DEV_EMAIL;
  if (devEmail) {
    return {
      license_id: `dev-${devEmail.split("@")[0]}`,
      tier: "pro",
      products: ["presenter", "world", "schedule", "notes", "manager"],
      user_email: devEmail,
    };
  }
  return null; // unauthenticated — real Supabase session resolution pending
}
