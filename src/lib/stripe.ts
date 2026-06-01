/**
 * Stripe webhook signature verification — done manually with Web Crypto (no SDK,
 * so it runs on any runtime). Mirrors Stripe's scheme:
 *   signed_payload = `${timestamp}.${rawBody}`
 *   expected       = hex(HMAC-SHA256(signed_payload, webhook_secret))
 *   compare expected against the `v1` value(s) in the Stripe-Signature header.
 */

async function hmacSha256Hex(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Constant-time-ish string compare (avoids early-exit timing leaks). */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * Verify a Stripe webhook. Returns the parsed event on success, or null if the
 * signature is missing/invalid or outside the tolerance window (5 min).
 *
 * @param rawBody  the exact request body string (do not re-serialize)
 * @param sigHeader the `Stripe-Signature` header
 * @param secret   STRIPE_WEBHOOK_SECRET
 * @param nowSec   current time (unix seconds) — injectable for testing
 */
export async function verifyStripeWebhook(
  rawBody: string,
  sigHeader: string | null,
  secret: string,
  nowSec: number = Math.floor(Date.now() / 1000),
): Promise<Record<string, unknown> | null> {
  if (!sigHeader) return null;

  const parts = Object.fromEntries(
    sigHeader.split(",").map((kv) => kv.split("=").map((s) => s.trim()) as [string, string]),
  );
  const t = parts["t"];
  const v1 = parts["v1"];
  if (!t || !v1) return null;

  // Reject stale signatures (replay protection) — 5-minute tolerance.
  const ts = parseInt(t, 10);
  if (!Number.isFinite(ts) || Math.abs(nowSec - ts) > 300) return null;

  const expected = await hmacSha256Hex(`${t}.${rawBody}`, secret);
  if (!safeEqual(expected, v1)) return null;

  try {
    return JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return null;
  }
}
