/**
 * SegmentLanding — shared scaffold for /worship, /conferences,
 * /lectures, /theater. Each segment instantiates the component with
 * its own copy and Schema.org audience override; the layout, nav,
 * and CTAs stay consistent across all four so an operator who
 * accidentally lands on the wrong segment can still get to download
 * in one click.
 *
 * Structure mirrors the home page (Nav → Hero → Stats → Segments
 * cross-link → Final CTA → Footer) at roughly 1/3 the line count
 * because segment pages are SEO landing surfaces, not the marketing
 * centerpiece.
 */

import Link from "next/link";
import Image from "next/image";
import SchemaJsonLd from "./SchemaJsonLd";

export interface SegmentLandingProps {
  /** URL slug, e.g. "worship". Used for the canonical URL + JSON-LD. */
  slug: "worship" | "conferences" | "lectures" | "theater";
  /** Schema.org audience descriptor (e.g. "religious organizations"). */
  audience: string;
  /** Hero eyebrow text — short noun phrase like "FOR WORSHIP TEAMS". */
  eyebrow: string;
  /** Hero headline. Two lines; the second line is the italic-serif accent. */
  headlineLeft: string;
  headlineAccent: string;
  /** Hero body — single paragraph, ~30 words. */
  heroBody: string;
  /** 3 pain-point → solution beats. */
  beats: { pain: string; solution: string }[];
  /** Final CTA section title (the one above the download buttons). */
  ctaTitle: string;
}

export default function SegmentLanding(props: SegmentLandingProps) {
  const url = `https://www.ace-presenter.app/${props.slug}`;
  return (
    <main className="flex-1 flex flex-col font-sans">
      <SchemaJsonLd
        audience={props.audience}
        url={url}
        description={`${props.heroBody} Free during public beta. macOS 12+.`}
      />
      <Nav />
      <Hero {...props} />
      <Beats beats={props.beats} />
      <CrossLinks current={props.slug} />
      <FinalCTA title={props.ctaTitle} />
      <Footer />
    </main>
  );
}

/* ───────────── NAV (mirror of home nav, simplified) ───────────── */
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
      <Link
        href="/api/download?platform=mac-arm64"
        className="px-4 sm:px-5 py-2 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-xs uppercase tracking-wider transition"
      >
        Download
      </Link>
    </nav>
  );
}

/* ───────────── HERO ───────────── */
function Hero({
  eyebrow,
  headlineLeft,
  headlineAccent,
  heroBody,
}: SegmentLandingProps) {
  return (
    <section className="relative px-6 sm:px-10 pt-20 sm:pt-32 pb-20 text-center overflow-hidden">
      {/* Aurora glow — same brand-red wash as the home hero */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, rgba(200,16,46,0.30) 0%, rgba(200,16,46,0.08) 35%, rgba(200,16,46,0) 70%)",
        }}
      />
      <div className="relative max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[10px] uppercase tracking-[0.25em] text-[#C4C4C4] font-semibold mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-pulse" />
          {eyebrow}
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] text-white">
          {headlineLeft}
          <br />
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
            {headlineAccent}
          </span>
          <span className="text-[#C8102E]">.</span>
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-[#C4C4C4] leading-relaxed">
          {heroBody}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/api/download?platform=mac-arm64"
            className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition shadow-[0_10px_40px_rgba(255,255,255,0.15)]"
          >
            Download for Mac · Apple Silicon
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
        </p>
      </div>
    </section>
  );
}

/* ───────────── BEATS (3 pain → solution rows) ───────────── */
function Beats({ beats }: { beats: SegmentLandingProps["beats"] }) {
  return (
    <section className="px-6 sm:px-10 py-20 border-y border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto grid gap-8 sm:gap-12 sm:grid-cols-3">
        {beats.map((b, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="text-[#C4C4C4] text-sm leading-relaxed">{b.pain}</div>
            <div className="text-white text-base sm:text-lg font-semibold leading-snug">
              {b.solution}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────── CROSS-LINKS (other segments) ───────────── */
function CrossLinks({ current }: { current: SegmentLandingProps["slug"] }) {
  const ALL: { slug: SegmentLandingProps["slug"]; label: string }[] = [
    { slug: "worship", label: "Worship" },
    { slug: "conferences", label: "Conferences" },
    { slug: "lectures", label: "Lectures" },
    { slug: "theater", label: "Theater & live shows" },
  ];
  const others = ALL.filter((s) => s.slug !== current);
  return (
    <section className="px-6 sm:px-10 py-16">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-[11px] uppercase tracking-[0.25em] text-[#C4C4C4] font-bold mb-6">
          ACE also runs
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm border border-[#2A2A2A] hover:border-[#C8102E]/50 transition"
            >
              {s.label} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── FINAL CTA ───────────── */
function FinalCTA({ title }: { title: string }) {
  return (
    <section className="px-6 sm:px-10 py-24 text-center border-t border-[#1A1A1A]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6 text-white">
          {title}
        </h2>
        <p className="text-[#C4C4C4] text-lg mb-10">
          Free during public beta. macOS 12+. Apple-signed and notarized.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/api/download?platform=mac-arm64"
            className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition shadow-[0_10px_40px_rgba(255,255,255,0.15)]"
          >
            Download for Mac · Apple Silicon
          </a>
          <a
            href="/api/download?platform=mac-x64"
            className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm transition border border-[#2A2A2A]"
          >
            Mac · Intel
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────── FOOTER (mirror of home, simplified) ───────────── */
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
