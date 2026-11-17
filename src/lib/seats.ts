/**
 * How many seats an account's Venue subscription has — read from Stripe, which
 * already holds it (the subscription's quantity).
 *
 * The seat count used to be stored nowhere: checkout sells 2–25 Venue seats,
 * but the gateway gave every Venue account 3 computers whatever was bought. The
 * sign-in token now carries `seats: { presenter: N }` and the gateway enforces
 * that. Reading Stripe here means no new database column, and a seat change in
 * the Customer Portal shows up at the next sign-in or renewal with no webhook
 * work.
 *
 * Returns null when it can't tell (no key, Stripe unreachable, no active
 * subscription found). The gateway then keeps its old default, so a hiccup here
 * never locks a church out.
 */

const STRIPE_API = "https://api.stripe.com/v1";

type StripeSubscription = {
  status?: string;
  metadata?: Record<string, string>;
  items?: { data?: Array<{ quantity?: number }> };
};

/** The highest quantity among this user's live subscriptions for `product`. */
export async function subscriptionSeats(userId: string, product: string): Promise<number | null> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !userId) return null;
  // Subscription search by the metadata checkout sets (license_id + product).
  // Quotes inside the values are impossible: userId is a uuid, product a slug.
  const query = `metadata["license_id"]:"${userId}" AND metadata["product"]:"${product}"`;
  try {
    const res = await fetch(
      `${STRIPE_API}/subscriptions/search?query=${encodeURIComponent(query)}&limit=10`,
      { headers: { Authorization: `Bearer ${key}` } },
    );
    if (!res.ok) return null;
    const body = (await res.json()) as { data?: StripeSubscription[] };
    let best: number | null = null;
    for (const sub of body.data ?? []) {
      if (sub.status !== "active" && sub.status !== "trialing" && sub.status !== "past_due") continue;
      const qty = (sub.items?.data ?? []).reduce((n, it) => n + (it.quantity ?? 0), 0);
      if (qty > 0 && (best === null || qty > best)) best = qty;
    }
    return best;
  } catch {
    return null;
  }
}
