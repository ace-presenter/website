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
}

export interface IssuedLicense {
  token: string;
  /** Unix seconds. */
  expires_at: number;
  products: Product[];
  tier: Tier;
}

const ISSUER = "ace-suite";
// Must stay ≤ the gateway's maxTokenAge (30 days) — shorter exp bounds the
// worst-case window before a revoked/changed licence stops working.
const TTL_SECONDS = 30 * 24 * 60 * 60;

/** Mint an RS256 ACE licence JWT for the gateway. Throws if the key isn't set. */
export async function issueLicense(claim: LicenseClaim): Promise<IssuedLicense> {
  const raw = process.env.LICENSE_PRIVATE_KEY;
  if (!raw) throw new Error("LICENSE_PRIVATE_KEY not set");
  // Support both real newlines (Vercel UI paste) and \n literals (local .env)
  const pem = raw.replace(/\\n/g, "\n");

  const key = await importPKCS8(pem, "RS256");
  const now = Math.floor(Date.now() / 1000);
  const exp = now + TTL_SECONDS;

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
