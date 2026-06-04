/**
 * /account — ACE Suite account hub.
 *
 * Shows the signed-in user's:
 *   • License tier badge + licensed products
 *   • Per-product download buttons (→ /api/download)
 *   • License key panel (copy JWT for desktop apps)
 *   • Manage Billing button (→ Stripe Customer Portal)
 *   • Sign-out link
 *
 * Server Component — resolves entitlements at request time, no flash of
 * "free" tier while a client hook loads.
 */

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LicenseKeyPanel from "@/components/LicenseKeyPanel";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { resolveEntitlements } from "@/lib/entitlements";
import type { Product } from "@/lib/license";

export const metadata: Metadata = {
  title: "Account — ACE Suite",
  description: "Manage your ACE Suite license, download apps, and manage billing.",
  alternates: { canonical: "/account" },
  robots: { index: false },
};

export const dynamic = "force-dynamic";

// ── Product definitions ────────────────────────────────────────────────────────

const PRODUCTS: {
  id: Product;
  label: string;
  description: string;
  href: string;
  downloadParam?: string;
  icon: string;
}[] = [
  {
    id: "presenter",
    label: "ACE Presenter",
    description: "Worship presentation & song detection",
    href: "/presenter",
    downloadParam: "presenter",
    icon: "/presenter/icon.png",
  },
  {
    id: "manager",
    label: "ACE Manager",
    description: "Ministry operations for churches",
    href: "https://app.ace-presenter.app",
    icon: "/manager/icon.png",
  },
  {
    id: "schedule",
    label: "ACE Schedule Manager",
    description: "Daily task & schedule planning",
    href: "/schedule",
    downloadParam: "schedule",
    icon: "/schedule/icon.png",
  },
  {
    id: "notes",
    label: "ACE Editors' Notes",
    description: "AI-assisted script & review notes",
    href: "/editors-notes",
    downloadParam: "editors-notes",
    icon: "/editors-notes/icon.png",
  },
  {
    id: "world",
    label: "ACE Virtual World",
    description: "Live virtual campus experience",
    href: "/world",
    icon: "/world/icon.png",
  },
];

// ── Tier display ──────────────────────────────────────────────────────────────

const TIER_LABELS: Record<string, string> = {
  free: "Free",
  standard: "Standard",
  pro: "Pro",
  business: "Business",
  enterprise: "Enterprise",
};

const TIER_COLORS: Record<string, string> = {
  free: "bg-[#1A1A1A] text-[#888] border-[#2A2A2A]",
  standard: "bg-[#0D1A2E] text-[#60A5FA] border-[#1D3C6E]",
  pro: "bg-[#1A0D1A] text-[#C084FC] border-[#3D1D6E]",
  business: "bg-[#1A140A] text-[#E8A33D] border-[#5A3E12]",
  enterprise: "bg-[#0A1A14] text-[#34D399] border-[#12503A]",
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AccountPage() {
  // Resolve session. If the Supabase client can't be constructed (e.g. a
  // misconfigured deploy missing NEXT_PUBLIC_SUPABASE_* env) or auth errors,
  // treat the visitor as logged out and bounce to /login instead of 500-ing.
  let user: { id: string; email?: string } | null = null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    user = null;
  }
  if (!user) redirect("/login");

  // Resolve entitlements
  const claim = await resolveEntitlements(new Request("http://localhost/account"));
  const tier: string = claim?.tier ?? "free";
  const products: Product[] = claim?.products ?? [];

  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />

      <section className="px-6 sm:px-10 pt-20 sm:pt-28 pb-24">
        <div className="max-w-2xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-2">
                Account
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                Your ACE{" "}
                <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
                  Suite
                </span>
              </h1>
              <p className="text-[#888] text-sm mt-2">{user.email}</p>
            </div>
            <span className={`mt-1 text-xs font-bold px-3 py-1 rounded-full border ${TIER_COLORS[tier] ?? TIER_COLORS.standard}`}>
              {TIER_LABELS[tier] ?? "Member"}
            </span>
          </div>

          {/* Products grid */}
          <div className="rounded-2xl bg-[#0D0D0D] border border-[#1A1A1A] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#1A1A1A]">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#888] font-semibold">
                Your products
              </span>
            </div>
            <div className="divide-y divide-[#1A1A1A]">
              {PRODUCTS.map((p) => {
                const licensed = products.includes(p.id);
                return (
                  <div key={p.id} className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
                        <Image
                          src={p.icon}
                          alt={p.label}
                          width={28}
                          height={28}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${licensed ? "text-white" : "text-[#555]"}`}>
                          {p.label}
                        </p>
                        <p className="text-[11px] text-[#555]">{p.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      {licensed ? (
                        <>
                          <span className="text-[11px] font-semibold text-[#22C55E]">✓ Active</span>
                          {p.downloadParam && (
                            <a
                              href={`/api/download?product=${p.downloadParam}`}
                              className="text-[11px] px-3 py-1 rounded-full bg-[#1A1A1A] hover:bg-[#222] border border-[#2A2A2A] text-[#C4C4C4] transition"
                            >
                              Download
                            </a>
                          )}
                          {!p.downloadParam && (
                            <a
                              href={p.href}
                              target={p.href.startsWith("http") ? "_blank" : undefined}
                              rel="noreferrer"
                              className="text-[11px] px-3 py-1 rounded-full bg-[#1A1A1A] hover:bg-[#222] border border-[#2A2A2A] text-[#C4C4C4] transition"
                            >
                              Open →
                            </a>
                          )}
                        </>
                      ) : (
                        <Link
                          href="/pricing"
                          className="text-[11px] px-3 py-1 rounded-full border border-[#C8102E]/40 text-[#C8102E] hover:bg-[#C8102E]/10 transition"
                        >
                          Upgrade
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* License key panel */}
          <div className="rounded-2xl bg-[#0D0D0D] border border-[#1A1A1A] p-6">
            <div className="mb-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#888] font-semibold mb-1">
                License key
              </p>
              <p className="text-sm text-[#555]">
                Paste into ACE Presenter or ACE Editors&apos; Notes to activate pooled provider keys.
              </p>
            </div>
            <LicenseKeyPanel />
          </div>

          {/* Billing + sign-out */}
          <div className="flex items-center justify-between pt-2">
            {tier !== "free" ? (
              <a
                href="/api/stripe/portal"
                className="text-sm font-semibold text-[#C8102E] hover:text-[#E8183A] transition"
              >
                Manage billing →
              </a>
            ) : (
              <Link
                href="/pricing"
                className="text-sm font-semibold text-[#C8102E] hover:text-[#E8183A] transition"
              >
                Upgrade plan →
              </Link>
            )}

            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="text-sm text-[#555] hover:text-[#888] transition"
              >
                Sign out
              </button>
            </form>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
