"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createBrowserClient } from "@supabase/ssr";
import LicenseKeyPanel from "@/components/LicenseKeyPanel";
import { COUNTRIES } from "@/lib/countries";

/**
 * AccountDashboard — the signed-in account suite (Blackmagic-style).
 *
 * A left sidebar (profile + section nav) beside a content panel. All server-
 * resolved data (email, entitlement tier, licensed products, profile metadata)
 * is passed in as props so there's no "free-tier flash"; only the profile
 * editor and license copy are interactive. Editing writes to Supabase auth
 * user_metadata via updateUser — it never touches billing or entitlements.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export interface Profile {
  fullName: string;
  organization: string;
  city: string;
  country: string;
  phone: string;
}

type SectionId = "overview" | "products" | "license" | "billing" | "profile";

const PRODUCTS: {
  id: string;
  label: string;
  description: string;
  href: string;
  downloadParam?: string;
  icon: string;
}[] = [
  { id: "presenter", label: "ACE Presenter", description: "Worship presentation & song detection", href: "/presenter", downloadParam: "presenter", icon: "/presenter/icon.png" },
  { id: "manager", label: "ACE Manager", description: "Ministry operations for churches", href: "https://app.ace-presenter.app", icon: "/manager/icon.png" },
  { id: "schedule", label: "ACE Schedule Manager", description: "Daily task & schedule planning", href: "/schedule", downloadParam: "schedule", icon: "/schedule/icon.png" },
  { id: "notes", label: "ACE Editors' Notes", description: "AI-assisted script & review notes", href: "/editors-notes", downloadParam: "editors-notes", icon: "/editors-notes/icon.png" },
  { id: "world", label: "ACE Virtual World", description: "Live virtual campus experience", href: "/world", icon: "/world/icon.png" },
];

const TIER_LABELS: Record<string, string> = {
  free: "Free", standard: "Standard", pro: "Pro", business: "Business", enterprise: "Enterprise",
};
const TIER_COLORS: Record<string, string> = {
  free: "bg-[#1A1A1A] text-[#888] border-[#2A2A2A]",
  standard: "bg-[#0D1A2E] text-[#60A5FA] border-[#1D3C6E]",
  pro: "bg-[#1A0D1A] text-[#C084FC] border-[#3D1D6E]",
  business: "bg-[#1A140A] text-[#E8A33D] border-[#5A3E12]",
  enterprise: "bg-[#0A1A14] text-[#34D399] border-[#12503A]",
};

const NAV: { id: SectionId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <IconGrid /> },
  { id: "products", label: "Products & Services", icon: <IconBox /> },
  { id: "license", label: "License key", icon: <IconKey /> },
  { id: "billing", label: "Billing", icon: <IconCard /> },
  { id: "profile", label: "Profile", icon: <IconUser /> },
];

function initialsOf(name: string, email: string) {
  const src = name.trim() || email;
  const parts = src.split(/[\s@._-]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "A";
}

export default function AccountDashboard({
  email,
  tier,
  products,
  profile: initialProfile,
}: {
  email: string;
  tier: string;
  products: string[];
  profile: Profile;
}) {
  const [section, setSection] = useState<SectionId>("overview");
  const initials = initialsOf(initialProfile.fullName, email);
  const activeCount = PRODUCTS.filter((p) => products.includes(p.id)).length;

  return (
    <section className="px-6 sm:px-10 pt-14 pb-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, #C8102E, #FF6B00)" }}
                aria-hidden
              >
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {initialProfile.fullName || "Your account"}
                </p>
                <p className="truncate text-xs text-[#888]">{email}</p>
              </div>
            </div>
            <div className="mt-3">
              <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${TIER_COLORS[tier] ?? TIER_COLORS.standard}`}>
                {TIER_LABELS[tier] ?? "Member"} plan
              </span>
            </div>
          </div>

          <nav className="mt-3 flex flex-col gap-1">
            {NAV.map((item) => {
              const on = section === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSection(item.id)}
                  aria-current={on ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition ${
                    on
                      ? "bg-white/[0.06] font-semibold text-white"
                      : "text-[#A8A8A8] hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  <span className={on ? "text-[#E8183A]" : "text-[#666]"}>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-3 border-t border-[#1A1A1A] pt-3">
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm text-[#888] transition hover:bg-white/[0.03] hover:text-white"
              >
                <span className="text-[#666]"><IconSignout /></span>
                Sign out
              </button>
            </form>
          </div>
        </aside>

        {/* ── Content ─────────────────────────────────────────────── */}
        <div className="min-w-0">
          {section === "overview" && (
            <Overview
              tier={tier}
              activeCount={activeCount}
              onGo={setSection}
            />
          )}
          {section === "products" && <Products products={products} />}
          {section === "license" && <LicenseSection />}
          {section === "billing" && <Billing tier={tier} />}
          {section === "profile" && <ProfileEditor email={email} initial={initialProfile} />}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Panels ───────────── */

function PanelHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center gap-3">
        <span className="h-px w-6 bg-[#C8102E]" aria-hidden />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#888]">{eyebrow}</span>
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
      {sub && <p className="mt-2 text-sm text-[#888]">{sub}</p>}
    </div>
  );
}

function Overview({
  tier,
  activeCount,
  onGo,
}: {
  tier: string;
  activeCount: number;
  onGo: (s: SectionId) => void;
}) {
  return (
    <div>
      <PanelHeader eyebrow="Account" title="Overview" sub="Your ACE Suite at a glance." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Plan" value={TIER_LABELS[tier] ?? "Member"} />
        <StatCard label="Active products" value={`${activeCount} of ${PRODUCTS.length}`} />
        <StatCard label="One account" value="Every ACE tool" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button onClick={() => onGo("products")} className="glass-card rounded-2xl p-5 text-left transition hover:border-white/20">
          <p className="text-sm font-semibold text-white">Products &amp; downloads →</p>
          <p className="mt-1 text-xs text-[#888]">See what&apos;s active and grab the apps.</p>
        </button>
        <button onClick={() => onGo("license")} className="glass-card rounded-2xl p-5 text-left transition hover:border-white/20">
          <p className="text-sm font-semibold text-white">License key →</p>
          <p className="mt-1 text-xs text-[#888]">Copy your key for the desktop apps.</p>
        </button>
        <button onClick={() => onGo("billing")} className="glass-card rounded-2xl p-5 text-left transition hover:border-white/20">
          <p className="text-sm font-semibold text-white">Billing →</p>
          <p className="mt-1 text-xs text-[#888]">Manage your plan and invoices.</p>
        </button>
        <button onClick={() => onGo("profile")} className="glass-card rounded-2xl p-5 text-left transition hover:border-white/20">
          <p className="text-sm font-semibold text-white">Profile →</p>
          <p className="mt-1 text-xs text-[#888]">Update your name and details.</p>
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#888]">{label}</p>
      <p className="mt-2 text-xl font-bold tracking-tight text-white">{value}</p>
    </div>
  );
}

function Products({ products }: { products: string[] }) {
  return (
    <div>
      <PanelHeader eyebrow="Suite" title="Products & Services" sub="Everything your account can run." />
      <div className="glass-card overflow-hidden rounded-2xl">
        <div className="divide-y divide-[#1A1A1A]">
          {PRODUCTS.map((p) => {
            const licensed = products.includes(p.id);
            return (
              <div key={p.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#1A1A1A]">
                    <Image src={p.icon} alt="" width={30} height={30} className="rounded" />
                  </div>
                  <div className="min-w-0">
                    <p className={`truncate text-sm font-medium ${licensed ? "text-white" : "text-[#666]"}`}>{p.label}</p>
                    <p className="truncate text-[11px] text-[#555]">{p.description}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {licensed ? (
                    <>
                      <span className="text-[11px] font-semibold text-[#22C55E]">✓ Active</span>
                      {p.downloadParam ? (
                        <a href={`/api/download?product=${p.downloadParam}`} className="rounded-full border border-[#2A2A2A] bg-[#1A1A1A] px-3 py-1 text-[11px] text-[#C4C4C4] transition hover:bg-[#222]">
                          Download
                        </a>
                      ) : (
                        <a href={p.href} target={p.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="rounded-full border border-[#2A2A2A] bg-[#1A1A1A] px-3 py-1 text-[11px] text-[#C4C4C4] transition hover:bg-[#222]">
                          Open →
                        </a>
                      )}
                    </>
                  ) : (
                    <Link href="/pricing" className="rounded-full border border-[#C8102E]/40 px-3 py-1 text-[11px] text-[#C8102E] transition hover:bg-[#C8102E]/10">
                      Upgrade
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LicenseSection() {
  return (
    <div>
      <PanelHeader eyebrow="Access" title="License key" sub="Paste into ACE Presenter or ACE Editors' Notes to activate pooled provider keys." />
      <div className="glass-card rounded-2xl p-6">
        <LicenseKeyPanel />
      </div>
    </div>
  );
}

function Billing({ tier }: { tier: string }) {
  const paid = tier !== "free";
  return (
    <div>
      <PanelHeader eyebrow="Plan" title="Billing" sub="Manage your subscription and invoices." />
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#888]">Current plan</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-white">{TIER_LABELS[tier] ?? "Member"}</p>
          </div>
          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${TIER_COLORS[tier] ?? TIER_COLORS.standard}`}>
            {paid ? "Subscribed" : "Free"}
          </span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {paid ? (
            <a href="/api/stripe/portal" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-[#E8E8E8]">
              Manage billing →
            </a>
          ) : (
            <Link href="/pricing" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-[#E8E8E8]">
              Upgrade plan →
            </Link>
          )}
          <Link href="/pricing" className="rounded-full border border-[#2A2A2A] px-6 py-3 text-sm font-semibold text-white transition hover:border-[#444]">
            View plans
          </Link>
        </div>
        <p className="mt-4 text-xs text-[#666]">
          Billing is handled securely by Stripe. Manage payment methods, invoices, and cancellation from the portal.
        </p>
      </div>
    </div>
  );
}

function ProfileEditor({ email, initial }: { email: string; initial: Profile }) {
  const [form, setForm] = useState<Profile>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setStatus("idle");
  };

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("saving");
    try {
      if (!SUPABASE_URL || !SUPABASE_ANON) throw new Error("Saving is temporarily unavailable.");
      const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON);
      const { error: err } = await supabase.auth.updateUser({
        data: {
          full_name: form.fullName || undefined,
          organization: form.organization || undefined,
          city: form.city || undefined,
          country: form.country || undefined,
          phone: form.phone || undefined,
        },
      });
      if (err) throw err;
      setStatus("saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save. Try again.");
      setStatus("idle");
    }
  }

  const dirty = JSON.stringify(form) !== JSON.stringify(initial);

  return (
    <div>
      <PanelHeader eyebrow="You" title="Profile" sub="Edit your profile and contact information." />
      <form onSubmit={save} className="glass-card rounded-2xl p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Full name" value={form.fullName} onChange={set("fullName")} placeholder="Your name" autoComplete="name" />
          <Field label="Company / Organization" value={form.organization} onChange={set("organization")} placeholder="Optional" autoComplete="organization" />
          <Field label="City" value={form.city} onChange={set("city")} placeholder="Optional" autoComplete="address-level2" />
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#888]">Country</label>
            <select
              value={form.country}
              onChange={(e) => { setForm((f) => ({ ...f, country: e.target.value })); setStatus("idle"); }}
              autoComplete="country-name"
              className={`w-full rounded-xl border border-[#2A2A2A] bg-[#161616] px-4 py-3 text-sm outline-none transition focus:border-[#C8102E] ${form.country ? "text-white" : "text-[#555]"}`}
            >
              <option value="">Select a country</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c} className="text-white">{c}</option>
              ))}
            </select>
          </div>
          <Field label="Phone" value={form.phone} onChange={set("phone")} placeholder="Optional" type="tel" autoComplete="tel" />
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#888]">Email</label>
            <div className="w-full rounded-xl border border-[#1F1F1F] bg-[#141414]/60 px-4 py-3 text-sm text-[#888]">
              {email}
            </div>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-[#F59E0B]">{error}</p>}

        <div className="mt-6 flex items-center gap-4">
          <button
            type="submit"
            disabled={!dirty || status === "saving"}
            className="rounded-full bg-[#C8102E] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E8183A] disabled:opacity-40"
          >
            {status === "saving" ? "Saving…" : "Save changes"}
          </button>
          {status === "saved" && !dirty && (
            <span className="text-sm font-medium text-[#22C55E]">✓ Saved</span>
          )}
        </div>
        <p className="mt-4 text-xs text-[#666]">
          To change your email or password,{" "}
          <Link href="/support" className="text-[#C8102E] hover:text-[#E8183A]">contact support</Link>.
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#888]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-[#2A2A2A] bg-[#161616] px-4 py-3 text-sm text-white placeholder-[#555] outline-none transition focus:border-[#C8102E]"
      />
    </div>
  );
}

/* ───────────── Icons (inline, 16px) ───────────── */
function IconGrid() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/></svg>; }
function IconBox() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5 14 5v6l-6 3.5L2 11V5l6-3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M2 5l6 3.5L14 5M8 8.5V14.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>; }
function IconKey() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="5" cy="5" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 7l6 6M11 11l1.5-1.5M13 9l1 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function IconCard() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.4"/></svg>; }
function IconUser() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M3 13c0-2.2 2.2-4 5-4s5 1.8 5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function IconSignout() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 2H3v12h3M10 5l3 3-3 3M13 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
