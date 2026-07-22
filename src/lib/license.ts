import { SignJWT, importPKCS8 } from "jose";

/**
 * ACE licence issuing — the contract between this site and the ACE gateway.
 *
 * The gateway (api.ace-presenter.app) verifies the JWT minted here with the
 * matching RS256 PUBLIC key and enforces: issuer `ace-suite`, a 30-day max age,
 * and the claim shape below. So we MUST set iss + iat + a ≤30-day exp.
 *
 * Keypair: generate once, give the PUBLIC half to the gateway
 * (`wrangler secret put LICENSE_PUBLIC_KEY`) and keep the PRIVATE half here only
 * (`LICENSE_PRIVATE_KEY`, PKCS8 PEM). The private key must never leave the issuer.
 *   openssl genrsa -out license-private.pem 2048
 *   openssl pkcs8 -topk8 -nocrypt -in license-private.pem -out license-pkcs8.pem
 *   openssl rsa -in license-private.pem -pubout -out license-public.pem
 */

export type Tier = "free" | "standard" | "business" | "pro";
export type Product = "presenter" | "world" | "schedule" | "notes" | "manager";

export interface LicenseClaim {
  license_id: string;
  tier: Tier;
  products: Product[];
  user_email: string;
  /**
   * Unix seconds when the subscription period ends.
   * null  = lifetime purchase (no recurring billing).
   * unset = unknown / free tier.
   */
  period_end?: number | null;
}

export interface IssuedLicense {
  token: string;
  /** Unix seconds. */
  expires_at: number;
  products: Product[];
  tier: Tier;
}

const ISSUER = "ace-suite";

/**
 * JWT TTL based on purchase type:
 *   lifetime  → 10 years  (period_end === null)
 *   annual    → period end + 5 day buffer, capped at 366 days
 *   monthly   → period end + 5 day buffer
 *   free/unknown → 35 days
 *
 * The gateway no longer enforces maxTokenAge — it relies on this exp claim
 * plus explicit KV revocation (fires within 60 s of subscription.deleted).
 */
function ttlSeconds(claim: LicenseClaim): number {
  if (claim.period_end === null) {
    return 10 * 365 * 24 * 3600; // lifetime — 10 years
  }
  if (claim.period_end != null) {
    const now = Math.floor(Date.now() / 1000);
    const remaining = claim.period_end - now;
    if (remaining > 0) {
      return Math.min(remaining + 5 * 86400, 366 * 86400);
    }
    return 7 * 86400; // period ended — 7-day grace window for webhook catch-up
  }
  return 35 * 86400; // free tier or unknown
}

/** Mint an RS256 ACE licence JWT for the gateway. Throws if the key isn't set. */
export async function issueLicense(claim: LicenseClaim): Promise<IssuedLicense> {
  const raw = process.env.LICENSE_PRIVATE_KEY;
  if (!raw) throw new Error("LICENSE_PRIVATE_KEY not set");
  // Support both real newlines (Vercel UI paste) and \n literals (local .env)
  const pem = raw.replace(/\\n/g, "\n");

  const key = await importPKCS8(pem, "RS256");
  const now = Math.floor(Date.now() / 1000);
  const exp = now + ttlSeconds(claim);

  const token = await new SignJWT({
    license_id: claim.license_id,
    tier: claim.tier,
    products: claim.products,
    user_email: claim.user_email,
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(ISSUER)
    .setIssuedAt(now)
    .setExpirationTime(exp)
    .sign(key);

  return { token, expires_at: exp, products: claim.products, tier: claim.tier };
}
