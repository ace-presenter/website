/**
 * SegmentLanding — shared scaffold for /presenter/{worship, conferences,
 * lectures, theater}. Each segment instantiates the component with its own
 * copy and Schema.org audience override.
 *
 * 3.0 look: the same GPU stage as the home page behind the headline (one
 * fragment shader, paused off screen, still frame for reduced motion; the
 * CSS glow under it is the no-WebGL fallback), glass controls, pointer-lit
 * cards. Still light: no 3D scene, no demo. Claims follow
 * docs/V3_RELEASE_FACTS.md; plan words come from the pricing file.
 */

import Link from "next/link";
import SchemaJsonLd from "./SchemaJsonLd";
import Nav from "./Nav";
import Footer from "./Footer";
import ShaderStage from "./spatial/ShaderStage";
import { Grain } from "./spatial/SpatialHero";
import { CTABand } from "./sections";
import { proMonthly } from "@/lib/pricing";

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
  /** What 3.0 brings to this room: short, true, from the release facts. */
  tools?: { name: string; body: string; plan?: string }[];
  /** Final CTA section title (the one above the download buttons). */
  ctaTitle: string;
}

export default function SegmentLanding(props: SegmentLandingProps) {
  const url = `https://www.ace-presenter.app/presenter/${props.slug}`;
  return (
    <main className="flex flex-1 flex-col bg-[#09090B] font-sans">
      <SchemaJsonLd
        audience={props.audience}
        url={url}
        description={`${props.heroBody} Mac and Windows. Free tier available.`}
      />
      <Nav activeProduct="presenter" />
      <Hero {...props} />
      <Beats beats={props.beats} />
      {props.tools && <Tools tools={props.tools} />}
      <CrossLinks current={props.slug} />
      <CTABand
        product="presenter"
        title={props.ctaTitle}
        sub={`Mac and Windows. Free to start; Pro from $${proMonthly()} a month.`}
        primary={{ href: "/api/download?platform=mac-arm64", label: "Download for Mac" }}
        secondary={{ href: "/pricing", label: "View pricing" }}
      />
      <Footer />
    </main>
  );
}

/* ───────────── HERO ───────────── */
function Hero({ eyebrow, headlineLeft, headlineAccent, heroBody }: SegmentLandingProps) {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-24 pt-20 sm:px-10 sm:pb-32 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(200,16,46,0.34), rgba(120,10,28,0.1) 45%, transparent 75%)",
        }}
      />
      <ShaderStage pulse={0} horizon={0.26} />
      <Grain />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="ace-glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/80 sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B4F] shadow-[0_0_10px_#FF3B4F]" />
          {eyebrow}
          <span className="hidden sm:inline">· ACE Presenter 3.0</span>
        </span>

        <h1 className="mt-6 text-[clamp(2.5rem,6.2vw,5rem)] font-bold leading-[0.96] tracking-[-0.04em] text-white">
          <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">{headlineLeft}</span>
          <br />
          <span className="font-serif font-normal italic tracking-[-0.02em] text-[#FF4D5E]">{headlineAccent}.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[#B8B8BE] sm:text-lg">{heroBody}</p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/api/download?platform=mac-arm64"
            className="rounded-full bg-gradient-to-b from-[#FF3B4F] to-[#C8102E] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-8px_rgba(232,24,58,0.7),inset_0_1px_0_rgba(255,255,255,0.3)] transition hover:brightness-110"
          >
            Download for Mac
          </Link>
          <Link
            href="/api/download?product=presenter&platform=win"
            className="ace-glass rounded-full px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
          >
            Download for Windows
          </Link>
          <Link href="/presenter" className="px-4 py-3.5 text-sm font-semibold text-white/75 transition hover:text-white">
            See ACE Presenter →
          </Link>
        </div>

        <p className="mt-5 text-xs text-white/50">Free to start · macOS 14+ · Windows 10+</p>
      </div>
    </section>
  );
}

/* ───────────── BEATS (3 pain → solution cards) ───────────── */
function Beats({ beats }: { beats: SegmentLandingProps["beats"] }) {
  return (
    <section className="border-t border-white/[0.06] px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-3">
        {beats.map((b, i) => (
          <div key={i} className="ace-card ace-sp-reveal flex h-full flex-col gap-4 rounded-3xl p-6 sm:p-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="text-sm leading-relaxed text-white/55">{b.pain}</div>
            <div className="mt-auto border-t border-white/[0.07] pt-4 text-base font-semibold leading-snug text-white sm:text-[17px]">
              {b.solution}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────── TOOLS (what 3.0 brings to this room) ───────────── */
function Tools({ tools }: { tools: NonNullable<SegmentLandingProps["tools"]> }) {
  return (
    <section className="relative border-t border-white/[0.06] px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="ace-sp-reveal flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[clamp(1.9rem,4vw,2.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
            Made for <span className="font-serif font-normal italic text-[#FF4D5E]">this</span> room.
          </h2>
          <Link href="/presenter#new" className="text-sm font-semibold text-white/60 transition hover:text-white">
            Everything new in 3.0 →
          </Link>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((t) => (
            <div key={t.name} className="ace-glass ace-sp-reveal rounded-2xl p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[15px] font-semibold text-white">{t.name}</h3>
                {t.plan && (
                  <span className="shrink-0 rounded-full border border-white/15 px-1.5 py-px font-mono text-[8.5px] uppercase tracking-[0.14em] text-white/55">
                    {t.plan}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{t.body}</p>
            </div>
          ))}
        </div>
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
    <section className="border-t border-white/[0.06] px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-white/45">
          ACE also runs
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/presenter/${s.slug}`}
              className="ace-glass rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
            >
              {s.label} →
            </Link>
          ))}
          <Link
            href="/remote"
            className="ace-glass rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
          >
            The phone app →
          </Link>
        </div>
      </div>
    </section>
  );
}
