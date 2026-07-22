/**
 * SegmentLanding — shared scaffold for /presenter/{worship, conferences,
 * lectures, theater}. Each segment instantiates the component with its own
 * copy and Schema.org audience override.
 *
 * Featherweight by design: these are SEO landing surfaces, so the hero is
 * HorizonGlow-only (no WebGL ripple) and every section reuses the shared
 * section system. Nav/Footer are the global components.
 */

import Link from "next/link";
import SchemaJsonLd from "./SchemaJsonLd";
import Nav from "./Nav";
import Footer from "./Footer";
import MagneticButton from "./MagneticButton";
import HorizonGlow from "./hero/HorizonGlow";
import { SpotlightCard } from "./motion";
import { AccentItalic, CTABand } from "./sections";

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
  const url = `https://www.ace-presenter.app/presenter/${props.slug}`;
  return (
    <main className="flex-1 flex flex-col font-sans">
      <SchemaJsonLd
        audience={props.audience}
        url={url}
        description={`${props.heroBody} Free during public beta. macOS 12+.`}
      />
      <Nav activeProduct="presenter" />
      <Hero {...props} />
      <Beats beats={props.beats} />
      <CrossLinks current={props.slug} />
      <CTABand
        product="presenter"
        title={props.ctaTitle}
        sub="Free during public beta. macOS 12+. Apple-signed and notarized."
        primary={{ href: "/api/download?platform=mac-arm64", label: "Download for Mac" }}
        secondary={{ href: "/api/download?platform=mac-x64", label: "Mac · Intel" }}
      />
      <Footer />
    </main>
  );
}

/* ───────────── HERO (HorizonGlow only — no WebGL on segment pages) ───────── */
function Hero({
  eyebrow,
  headlineLeft,
  headlineAccent,
  heroBody,
}: SegmentLandingProps) {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-20 sm:px-10 sm:pt-28">
      <HorizonGlow strength={0.8} />
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[#C8102E]" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#888]">
            {eyebrow}
          </span>
        </div>

        <h1 className="text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {headlineLeft}
          <br />
          <AccentItalic>{headlineAccent}</AccentItalic>
          <span className="text-[#C8102E]">.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#C4C4C4] sm:text-xl">
          {heroBody}
        </p>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
          <MagneticButton
            href="/api/download?platform=mac-arm64"
            glowRgb="200,16,46"
            className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition-colors hover:bg-[#E8E8E8]"
          >
            Download for Mac · Apple Silicon
          </MagneticButton>
          <a
            href="/api/download?platform=mac-x64"
            className="rounded-full border border-[#2A2A2A] bg-[#1A1A1A]/70 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#222]"
          >
            Mac · Intel
          </a>
        </div>

        <p className="mt-5 text-xs text-[#C4C4C4]">Free during public beta · macOS 12+</p>
      </div>
    </section>
  );
}

/* ───────────── BEATS (3 pain → solution cards) ───────────── */
function Beats({ beats }: { beats: SegmentLandingProps["beats"] }) {
  return (
    <section className="border-y border-[#1A1A1A] px-6 py-20 sm:px-10">
      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
        {beats.map((b, i) => (
          <SpotlightCard key={i} className="glass-card h-full rounded-2xl">
            <div className="flex h-full flex-col gap-3 p-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-sm leading-relaxed text-[#C4C4C4]">{b.pain}</div>
              <div className="text-base font-semibold leading-snug text-white sm:text-lg">
                {b.solution}
              </div>
            </div>
          </SpotlightCard>
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
    <section className="px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-6 text-center font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#C4C4C4]">
          ACE also runs
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/presenter/${s.slug}`}
              className="glass-card rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#C8102E]/50"
            >
              {s.label} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
