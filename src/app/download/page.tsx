/**
 * /download — landing page for direct downloads.
 *
 * The home-page CTAs already hit /api/download?platform=...
 * (which redirects to the signed DMG on dl.ace-presenter.app), so
 * this page exists primarily for SEO: ranks for "ace download",
 * gives Search Console a stable target, and gives third-party
 * referrers (blog posts, podcast notes, Reddit threads) a
 * canonical URL that won't change.
 *
 * It also doubles as a Windows/Linux/legacy-Mac waitlist surface so
 * users who hit /download from those platforms see something useful
 * instead of a confusing macOS download.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Download ACE — Free during public beta · macOS",
  description:
    "Download ACE for macOS. Apple Silicon and Intel builds available. Apple-signed and notarized. Auto-updating. Free during public beta.",
  keywords: [
    "ace download",
    "ace presenter download",
    "download ace mac",
    "ace dmg",
    "ace presenter dmg",
  ],
  alternates: {
    canonical: "/download",
  },
  openGraph: {
    title: "Download ACE — Free during public beta · macOS",
    description: "Apple Silicon + Intel builds. Apple-signed and notarized. Auto-updating.",
    url: "https://www.ace-presenter.app/download",
    siteName: "ACE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download ACE — Free during public beta · macOS",
    description: "Apple Silicon + Intel builds. Apple-signed and notarized.",
  },
};

async function fetchLatestVersion(): Promise<string | null> {
  try {
    const r = await fetch("https://dl.ace-presenter.app/latest-mac.yml", {
      next: { revalidate: 300 },
    });
    if (!r.ok) return null;
    const text = await r.text();
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^version:\s*['"]?([\d.]+)['"]?/);
      if (m) return m[1];
    }
    return null;
  } catch {
    return null;
  }
}

export const revalidate = 300;

export default async function DownloadPage() {
  const latestVersion = await fetchLatestVersion();
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />
      <Hero latestVersion={latestVersion} />
      <Requirements />
      <OtherPlatforms />
      <Footer />
    </main>
  );
}

/* ───────────── NAV ───────────── */
function Nav() {
  return (
    <nav className="sticky top-0 z-40 px-6 sm:px-10 py-5 flex items-center justify-between bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-[#1A1A1A]">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.png" alt="ACE — Agentic Cue Experience" width={32} height={32} priority className="rounded-md" />
        <div className="flex flex-col leading-none">
          <span className="font-bold tracking-tight text-lg">ACE</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#888] mt-0.5">
            Agentic Cue Experience
          </span>
        </div>
      </Link>
      <div className="hidden sm:flex items-center gap-8 text-sm text-[#C4C4C4]">
        <Link href="/#use-cases" className="hover:text-white transition">Use cases</Link>
        <Link href="/#features" className="hover:text-white transition">Features</Link>
        <Link href="/#pricing" className="hover:text-white transition">Pricing</Link>
        <Link href="/support" className="hover:text-white transition">Support</Link>
      </div>
    </nav>
  );
}

/* ───────────── HERO ───────────── */
function Hero({ latestVersion }: { latestVersion: string | null }) {
  return (
    <section className="relative px-6 sm:px-10 pt-20 sm:pt-32 pb-20 text-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, rgba(200,16,46,0.30) 0%, rgba(200,16,46,0.08) 35%, rgba(200,16,46,0) 70%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[10px] uppercase tracking-[0.25em] text-[#C4C4C4] font-semibold mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
          Public beta · Free
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[0.95] text-white">
          Download{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
            ACE
          </span>
          <span className="text-[#C8102E]">.</span>
        </h1>

        <p className="mt-8 max-w-xl mx-auto text-lg text-[#C4C4C4] leading-relaxed">
          Apple-signed and notarized. Auto-updates from here. Pick the build that matches your Mac.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/api/download?platform=mac-arm64"
            className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition shadow-[0_10px_40px_rgba(255,255,255,0.15)]"
          >
            Mac · Apple Silicon (M1+)
          </a>
          <a
            href="/api/download?platform=mac-x64"
            className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm transition border border-[#2A2A2A]"
          >
            Mac · Intel
          </a>
        </div>

        <p className="mt-5 text-xs text-[#C4C4C4]">
          Free during public beta · macOS 12+
          {latestVersion && (
            <>
              {" · "}
              <span className="text-[#888]">
                Latest: <span className="text-white font-semibold tabular-nums">v{latestVersion}</span>
              </span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}

/* ───────────── REQUIREMENTS ───────────── */
function Requirements() {
  const ROWS = [
    { label: "Operating system", value: "macOS 12 (Monterey) or later" },
    { label: "Architecture", value: "Apple Silicon or Intel" },
    { label: "Disk space", value: "~600 MB initial · ~1 GB after first launch (AI models download on first run)" },
    { label: "Microphone", value: "Built-in, USB, or any Core Audio input" },
    { label: "Network", value: "Required only for first-launch model download · core detection runs offline" },
  ];
  return (
    <section className="px-6 sm:px-10 py-16 border-y border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-8">
          System requirements
        </h2>
        <dl className="space-y-5">
          {ROWS.map((r) => (
            <div key={r.label} className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 pb-5 border-b border-[#1A1A1A] last:border-0">
              <dt className="text-[10px] uppercase tracking-[0.2em] text-[#C4C4C4] font-semibold">
                {r.label}
              </dt>
              <dd className="sm:col-span-2 text-sm text-white leading-relaxed">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ───────────── OTHER PLATFORMS ───────────── */
function OtherPlatforms() {
  return (
    <section className="px-6 sm:px-10 py-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
          Windows? Linux?
        </h2>
        <p className="text-[#C4C4C4] mb-8">
          Not yet. Both are on the roadmap and unlock with v2.0. Add yourself to the waitlist below and we&apos;ll email when builds are ready.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:hello@ace-presenter.app?subject=ACE%20Windows%20waitlist&body=Please%20add%20me%20to%20the%20Windows%20waitlist."
            className="px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm border border-[#2A2A2A] transition text-center"
          >
            Windows waitlist →
          </a>
          <a
            href="mailto:hello@ace-presenter.app?subject=ACE%20Linux%20waitlist&body=Please%20add%20me%20to%20the%20Linux%20waitlist."
            className="px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm border border-[#2A2A2A] transition text-center"
          >
            Linux waitlist →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────── FOOTER ───────────── */
function Footer() {
  return (
    <footer className="px-6 sm:px-10 py-12 border-t border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-[#888]">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="ACE" width={24} height={24} className="rounded" />
          <span>© ACE · ace-presenter.app</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
          <Link href="/support" className="hover:text-white transition">Support</Link>
        </div>
      </div>
    </footer>
  );
}
