/**
 * ACE Suite — pricing catalog (single source of truth).
 *
 * The /pricing page renders from this, the Stripe checkout route resolves
 * (product, plan, cadence) → price id + entitlement tier + checkout mode from
 * this, and .env.example documents the price keys this references. Keeping all
 * three driven by one file is what stops the displayed price, the charged
 * price, and the granted entitlement from drifting apart.
 *
 * Prices are USD. Numbers mirror PRICING_PROPOSAL_v1.md.
 */

import type { ProductKey } from "@/lib/brand";

export type EntTier = "free" | "standard" | "business" | "enterprise";
export type Cadence = "month" | "year";
export type PlanKind = "free" | "subscription" | "oneTime" | "custom";
export type CtaKind = "checkout" | "get-started" | "contact" | "download" | "none";

export type Plan = {
  /** slug used in ?plan= */
  id: string;
  name: string;
  kind: PlanKind;
  /** subscription */
  monthlyUSD?: number;
  annualUSD?: number;
  /** one-time */
  oneTimeUSD?: number;
  /** custom / contact tiers — shown as "from $X" when set */
  fromUSD?: number;
  perSeat?: boolean;
  /**
   * Sold by the seat on the page: the stepper's bounds and where it starts.
   * Above `max` the card stops selling and points at a conversation instead —
   * that size of deal wants a human, and Stripe's quantity is capped to match
   * so the URL can't be hand-edited past it.
   */
  seats?: { min: number; max: number; default: number };
  /** entitlement tier this plan grants */
  tier: EntTier;
  /** Stripe checkout mode (omit for free/custom) */
  mode?: "subscription" | "payment";
  /** Stripe price env keys (omit for free/custom). Resolved server-side only. */
  envMonthly?: string;
  envAnnual?: string;
  envOneTime?: string;
  cta: CtaKind;
  ctaLabel: string;
  /** for non-checkout CTAs */
  ctaHref?: string;
  badge?: string;
  highlight?: boolean;
  note?: string;
  features: string[];
};

export type ProductPricing = {
  key: ProductKey;
  /** entitlement / gateway product id (editorsNotes → "notes") */
  product: string;
  name: string;
  href: string;
  tagline: string;
  plans: Plan[];
};

export const CONTACT_EMAIL = "hello@ace-presenter.app";

export const PRICING: ProductPricing[] = [
  {
    key: "presenter",
    product: "presenter",
    name: "ACE Presenter",
    href: "/presenter",
    tagline: "The room listens. The slides follow.",
    plans: [
      {
        id: "free",
        name: "Free",
        kind: "free",
        tier: "free",
        cta: "get-started",
        ctaLabel: "Download free",
        ctaHref: "/api/download?platform=mac-arm64",
        features: [
          "Unlimited songs, slides, and cues",
          "Automatic song and lyric detection",
          "Smart Bible reference detection",
          "Import your ProPresenter library",
          "1 audience output (projector or screen)",
          "12+ languages",
        ],
      },
      {
        id: "pro",
        name: "Pro",
        kind: "subscription",
        monthlyUSD: 25,
        annualUSD: 240,
        tier: "standard",
        mode: "subscription",
        envMonthly: "STRIPE_PRICE_PRESENTER_MONTHLY",
        envAnnual: "STRIPE_PRICE_PRESENTER_ANNUAL",
        cta: "checkout",
        ctaLabel: "Get Pro",
        highlight: true,
        badge: "Most popular",
        features: [
          "Everything in Free",
          "No watermark on any output",
          "Audience screen + stage monitor",
          "Stage monitor: see what's live and what's next",
          "Looks and themes editor — brand your slides in one click",
          "A large library of licensed Bible versions — compare up to four",
          "Background video and media layers",
          "Priority support",
        ],
      },
      {
        id: "venue",
        name: "Venue",
        kind: "subscription",
        monthlyUSD: 30,
        annualUSD: 288,
        perSeat: true,
        seats: { min: 2, max: 25, default: 3 },
        tier: "business",
        mode: "subscription",
        envMonthly: "STRIPE_PRICE_PRESENTER_VENUE_MONTHLY",
        envAnnual: "STRIPE_PRICE_PRESENTER_VENUE_ANNUAL",
        cta: "checkout",
        ctaLabel: "Buy seats",
        note: "Per seat · flat rate",
        features: [
          "Everything in Pro",
          "Multiple seats — use on more than one computer",
          "Add or drop seats as the team changes",
          "Shared song and media library across your team",
          "Central billing and seat management",
          "Onboarding call included",
          "Priority support for your whole team",
        ],
      },
    ],
  },
  {
    key: "schedule",
    product: "schedule",
    name: "ACE Schedule Manager",
    href: "/schedule",
    tagline: "Build the schedule. Run the day.",
    plans: [
      {
        id: "free",
        name: "Free",
        kind: "free",
        tier: "free",
        cta: "get-started",
        ctaLabel: "Get started",
        ctaHref: "https://app.ace-presenter.app/auth",
        features: [
          "Tasks, projects, Kanban",
          "1 calendar connection",
          "5 AI imports / month",
          "Cloud sync",
        ],
      },
      {
        id: "pro",
        name: "Pro",
        kind: "subscription",
        monthlyUSD: 12,
        annualUSD: 96,
        tier: "business",
        mode: "subscription",
        envMonthly: "STRIPE_PRICE_SCHEDULE_MONTHLY",
        envAnnual: "STRIPE_PRICE_SCHEDULE_ANNUAL",
        cta: "checkout",
        ctaLabel: "Go Pro",
        highlight: true,
        features: [
          "Unlimited AI syllabus import",
          "Daily AI guidance",
          "Google Calendar two-way sync",
          "Reports & analytics",
          "Web + desktop",
        ],
      },
      {
        id: "team",
        name: "Team",
        kind: "custom",
        fromUSD: 10,
        perSeat: true,
        tier: "business",
        cta: "contact",
        ctaLabel: "Talk to us",
        note: "per seat · billed yearly",
        features: ["Shared projects", "Admin controls", "SSO (coming)"],
      },
    ],
  },
  {
    key: "editorsNotes",
    product: "notes",
    name: "ACE Editors' Notes",
    href: "/editors-notes",
    tagline: "Notes that talk to Resolve.",
    plans: [
      {
        id: "trial",
        name: "Trial",
        kind: "free",
        tier: "free",
        cta: "download",
        ctaLabel: "Download free",
        ctaHref: "/api/download?product=editors-notes&platform=mac-arm64",
        note: "14-day full trial",
        features: [
          "Full features for 14 days",
          "DaVinci Resolve integration",
          "Clickable timecodes",
          "PDF / print export",
        ],
      },
      {
        id: "lifetime",
        name: "One-time",
        kind: "oneTime",
        oneTimeUSD: 79,
        tier: "standard",
        mode: "payment",
        envOneTime: "STRIPE_PRICE_NOTES_LIFETIME",
        cta: "checkout",
        ctaLabel: "Buy once",
        badge: "Own it",
        highlight: true,
        note: "Perpetual · 1 Mac · 1 year of updates",
        features: [
          "Everything in the trial, forever",
          "Perpetual license, current major version",
          "One Mac",
          "No subscription",
        ],
      },
      {
        id: "updates",
        name: "Updates",
        kind: "subscription",
        annualUSD: 39,
        tier: "standard",
        mode: "subscription",
        envAnnual: "STRIPE_PRICE_NOTES_UPDATES",
        cta: "checkout",
        ctaLabel: "Add updates",
        note: "optional",
        features: ["Latest major versions", "Priority support"],
      },
      {
        id: "studio",
        name: "Studio",
        kind: "custom",
        tier: "business",
        cta: "contact",
        ctaLabel: "Talk to us",
        note: "5+ seats",
        features: ["Volume licensing", "Centralized seats", "Priority support"],
      },
    ],
  },
  {
    key: "manager",
    product: "manager",
    name: "ACE Manager",
    href: "/manager",
    tagline: "Run the organization.",
    plans: [
      {
        id: "free",
        name: "Free",
        kind: "free",
        tier: "free",
        cta: "get-started",
        ctaLabel: "Get started",
        ctaHref: "/manager",
        features: ["1 organization", "Up to 5 members", "Members & departments"],
      },
      {
        id: "team",
        name: "Team",
        kind: "subscription",
        monthlyUSD: 15,
        annualUSD: 144,
        perSeat: true,
        tier: "business",
        // Manager is in development — present pricing, route interest to us
        // rather than live checkout (entitlement is org-derived).
        cta: "contact",
        ctaLabel: "Join the waitlist",
        highlight: true,
        note: "per seat",
        features: [
          "Unlimited members",
          "Events & campaigns",
          "Roles & permissions",
          "AI agent actions",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        kind: "custom",
        tier: "enterprise",
        cta: "contact",
        ctaLabel: "Talk to us",
        features: ["SSO", "Audit logs", "Multi-org", "Dedicated support & SLA"],
      },
    ],
  },
  {
    key: "world",
    product: "world",
    name: "ACE World",
    href: "/world",
    tagline: "Live audience. Virtual space.",
    plans: [
      {
        id: "beta",
        name: "Beta",
        kind: "free",
        tier: "free",
        cta: "contact",
        ctaLabel: "Request beta access",
        badge: "In beta",
        note: "Free during beta",
        features: [
          "Shared 3D venue",
          "Live stage feed",
          "Desktop + WebXR",
          "Pricing at launch",
        ],
      },
    ],
  },
];

/** The cross-sell bundle (rendered separately, but driven by the same data). */
export const SUITE_BUNDLE = {
  product: "suite",
  monthlyUSD: 49,
  annualUSD: 468,
  tier: "business" as EntTier,
  envMonthly: "STRIPE_PRICE_SUITE_MONTHLY",
  envAnnual: "STRIPE_PRICE_SUITE_ANNUAL",
  features: [
    "Presenter, Schedule, and Editors' Notes",
    "Manager for small teams",
    "World beta access",
    "One account, one bill, always the latest",
  ],
};

/** The plan a (product, plan slug) pair names, if it exists. */
export function findPlan(product: string, planId: string): Plan | undefined {
  return PRICING.find((p) => p.product === product)?.plans.find((pl) => pl.id === planId);
}

/**
 * A seat count this plan will actually sell: inside its range, a whole number,
 * and its default when the input is nonsense. Both the stepper and the checkout
 * route go through this, so a hand-edited ?seats= can't buy outside the range.
 */
export function clampSeats(plan: Plan | undefined, n: number): number {
  const s = plan?.seats;
  if (!s) return 1;
  if (!Number.isFinite(n)) return s.default;
  return Math.min(s.max, Math.max(s.min, Math.round(n)));
}

/** What one seat costs, in this cadence. */
export function seatRate(plan: Plan, cadence: Cadence): number {
  const rate = cadence === "year" ? plan.annualUSD : plan.monthlyUSD;
  return rate ?? plan.annualUSD ?? plan.monthlyUSD ?? 0;
}

/** Build the checkout link for a plan + cadence (+ seats, for per-seat plans). */
export function checkoutHref(
  product: string,
  planId: string,
  cadence?: Cadence,
  seats?: number,
): string {
  const c = cadence ? `&cadence=${cadence}` : "";
  const s = seats && seats > 1 ? `&seats=${seats}` : "";
  return `/api/stripe/checkout?product=${product}&plan=${planId}${c}${s}`;
}

/**
 * Server-side resolver used by the checkout route: given a product + plan +
 * cadence, return the Stripe price env key, the entitlement tier to grant, the
 * checkout mode, and the seat range for per-seat plans (so the route can clamp
 * the quantity and let Stripe adjust it within the same bounds). Returns null
 * if the plan isn't purchasable online.
 */
export function resolveCheckout(
  product: string,
  planId: string,
  cadence: Cadence,
): {
  envKey: string;
  tier: EntTier;
  mode: "subscription" | "payment";
  seats?: { min: number; max: number; default: number };
} | null {
  if (product === "suite") {
    return {
      envKey: cadence === "year" ? SUITE_BUNDLE.envAnnual : SUITE_BUNDLE.envMonthly,
      tier: SUITE_BUNDLE.tier,
      mode: "subscription",
    };
  }
  const prod = PRICING.find((p) => p.product === product);
  const plan = prod?.plans.find((pl) => pl.id === planId);
  if (!plan || plan.cta !== "checkout" || !plan.mode) return null;

  if (plan.mode === "payment") {
    if (!plan.envOneTime) return null;
    return { envKey: plan.envOneTime, tier: plan.tier, mode: "payment" };
  }
  const envKey = cadence === "year" ? plan.envAnnual : plan.envMonthly;
  if (!envKey) return null;
  return { envKey, tier: plan.tier, mode: "subscription", seats: plan.seats };
}
