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
 * Windows shipped alongside Mac, so the only platform still unserved
 * here is Linux.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { fetchPresenterVersions, type PresenterVersions } from "@/lib/appcast";

export const metadata: Metadata = {
  title: "Download ACE — Mac and Windows",
  description:
    "Download ACE for macOS (Apple Silicon) or Windows. Apple-signed and notarized on Mac. Auto-updating. Free tier available.",
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
    title: "Download ACE — Mac and Windows",
    description: "Mac and Windows builds. Apple-signed and notarized on Mac. Auto-updating.",
    url: "https://www.ace-presenter.app/download",
    siteName: "ACE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download ACE — Mac and Windows",
    description: "Mac and Windows builds. Apple-signed and notarized on Mac.",
  },
};

export const revalidate = 300;

export default async function DownloadPage() {
  const versions = await fetchPresenterVersions();
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />
      <Hero versions={versions} />
      <Requirements />
      <OtherPlatforms />
      <Footer />
    </main>
  );
}

/* ───────────── HERO ───────────── */
function Hero({ versions }: { versions: PresenterVersions }) {
  return (
    <section className="px-6 sm:px-10 pt-20 sm:pt-32 pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px w-8 bg-[#C8102E]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#888]">
            Free tier · Pro from $25/mo
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[0.95] text-white">
          Download{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
            ACE
          </span>
          <span className="text-[#C8102E]">.</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg text-[#C4C4C4] leading-relaxed">
          Signed and notarized on Mac. Auto-updates from here. Same features on
          Mac and Windows — a new version can reach one a few days before the
          other.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          {/* Primary — DMG (individual users) */}
          <div className="flex items-center gap-4">
            <a
              href="/api/download?platform=mac-arm64"
              className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition-colors"
            >
              Download for Mac · Apple Silicon (M1+)
            </a>
            <span className="text-xs text-[#666]">.dmg · drag to install</span>
          </div>

          {/* Primary — Windows. The API has supported platform=win since the
              Windows build shipped; this page simply never grew the button, so
              every Windows visitor was reading "Mac and Windows" above a page
              that only offered Mac. */}
          <div className="flex items-center gap-4">
            <a
              href="/api/download?platform=win"
              className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition-colors"
            >
              Download for Windows · 10+
            </a>
            <span className="text-xs text-[#666]">.exe · 64-bit installer</span>
          </div>

          {/* Secondary — PKG (IT / managed) */}
          <div className="flex items-center gap-4">
            <a
              href="/api/download?platform=mac-arm64&format=pkg"
              className="px-7 py-3.5 rounded-full bg-transparent hover:bg-[#1A1A1A] text-white font-semibold text-sm border border-[#333] transition-colors"
            >
              Installer Package · Apple Silicon
            </a>
            <span className="text-xs text-[#666]">.pkg · MDM / Jamf / silent install</span>
          </div>
        </div>

        <p className="mt-5 text-xs text-[#C4C4C4]">
          Free tier available · macOS 14 (Sonoma) or later · Windows 10+
          {(versions.mac || versions.windows) && (
            <>
              {" · "}
              <span className="text-[#888]">
                Latest:{" "}
                {versions.mac && (
                  <>
                    Mac <span className="text-white font-semibold tabular-nums">v{versions.mac}</span>
                  </>
                )}
                {versions.mac && versions.windows && " · "}
                {versions.windows && (
                  <>
                    Windows <span className="text-white font-semibold tabular-nums">v{versions.windows}</span>
                  </>
                )}
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
    { label: "Operating system", value: "macOS 14 (Sonoma) or later · Windows 10 or later" },
    { label: "Architecture", value: "Apple Silicon (M1 or later) · Windows 64-bit" },
    { label: "Disk space", value: "≈320 MB download on Mac, ≈340 MB on Windows · speech models included · Large v3 Turbo is an optional extra download from Extras" },
    { label: "Microphone", value: "Built-in, USB, or any audio interface your Mac or PC can see" },
    { label: "Network", value: "Not needed for detection, which runs offline from first launch · used only for the optional Large v3 Turbo model, online Bibles, cloud detection (off unless you switch it on), sign-in and updates" },
  ];
  return (
    <section className="px-6 sm:px-10 py-16 border-y border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-8">
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
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
          Linux?
        </h2>
        <p className="text-[#C4C4C4] mb-8">
          Not yet — Linux is the one platform still unserved. Mac and Windows are both
          available above, with the same features. Tell us if you need Linux
          and we&apos;ll email when there is a build.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
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

