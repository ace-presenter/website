import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import HeroMockup from "@/components/HeroMockup";
import HeroRays from "@/components/HeroRays";
import HeroBackdrop3D from "@/components/hero/HeroBackdrop3D";
import {
  Aurora,
  Reveal,
  Stagger,
  Item,
  Marquee,
  Counter,
} from "@/components/motion";
import { products } from "@/lib/brand";
import SuiteIndex from "@/components/SuiteIndex";

export const metadata: Metadata = {
  title: {
    absolute: "ACE — Agentic Cue Experience",
  },
  description:
    "ACE is a suite of agentic tools for live events, post-production, and personal productivity. Presenter listens to the room. Schedule plans the day. Editors' Notes annotates the cut. More coming.",
  alternates: { canonical: "/" },
};

export default function SuiteHome() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />
      <Hero />
      <UseCaseMarquee />
      <SuiteIndex />
      <StatBand />
      <SuiteWhy />
      <PricingTeaser />
      <FinalCTA variant="suite" />
      <Footer />
    </main>
  );
}

/* ───────────── HERO ───────────── */
const ALL_ACCENT_RGB = Object.values(products).map((p) => p.rgb);

function Hero() {
  return (
    <section className="relative px-6 sm:px-10 pt-20 sm:pt-28 pb-24 text-center overflow-hidden">
      {/* Multi-accent aurora — all five product colours drifting */}
      <Aurora colors={ALL_ACCENT_RGB} intensity={0.28} className="opacity-95" />
      {/* Slow-rotating volumetric god rays */}
      <HeroRays />
      {/* Top crimson key glow keeps the anchor brand colour dominant */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, rgba(200,16,46,0.32) 0%, rgba(200,16,46,0.07) 42%, rgba(200,16,46,0) 70%)",
        }}
      />

      {/* Mouse-reactive 3D depth layer — desktop + motion only, null fallback */}
      <HeroBackdrop3D />

      <div className="relative max-w-5xl mx-auto">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[10px] uppercase tracking-[0.25em] text-[#C4C4C4] font-semibold mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            Agentic tools for the room
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-white">
            ACE runs the{" "}
            <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
              cues
            </span>
            ,<br />
            the schedule, the{" "}
            <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
              org
            </span>
            ,<br />
            the{" "}
            <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
              notes
            </span>
            <span className="text-[#C8102E]">.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-[#C4C4C4] leading-relaxed">
            A suite of agentic tools. One account. Built for people who run live
            events, personal workflows, and post-production — with more on the way.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/api/download?platform=mac-arm64"
              className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition shadow-[0_10px_40px_rgba(255,255,255,0.12)] hover:scale-[1.03] active:scale-100"
            >
              Download Presenter
            </a>
            <a
              href="https://app.ace-presenter.app/auth"
              className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm transition border border-[#2A2A2A] hover:scale-[1.03] active:scale-100"
            >
              Open Schedule Manager
            </a>
          </div>
          <p className="mt-5 text-xs text-[#888]">Free to start · macOS 12+ for desktop apps</p>
        </Reveal>

        {/* Hero centerpiece */}
        <div className="mt-16 sm:mt-20">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}

/* ───────────── USE-CASE MARQUEE ───────────── */
const USE_CASES = [
  "Worship",
  "Conferences",
  "Lectures",
  "Theater",
  "Post-production",
  "Organizations",
  "Personal workflows",
];

function UseCaseMarquee() {
  return (
    <section className="py-10 border-y border-[#1A1A1A] bg-[#0A0A0A]">
      <Marquee speed={34}>
        {USE_CASES.map((u) => (
          <span
            key={u}
            className="inline-flex items-center gap-3 text-xl sm:text-2xl font-semibold text-[#555] whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
            {u}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ───────────── STAT BAND ───────────── */
function StatBand() {
  return (
    <section className="px-6 sm:px-10 py-16 border-b border-[#1A1A1A]">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        <Stat value={<Counter to={5} />} label="Products in the suite" />
        <Stat value={<Counter to={30} suffix="+" />} label="Languages detected" />
        <Stat value={<>&lt;1s</>} label="Cue latency" />
        <Stat value={<Counter to={100} suffix="%" />} label="On-device option" />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div>
      <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white tabular-nums">{value}</div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#888] font-semibold">{label}</div>
    </div>
  );
}

/* ───────────── SUITE WHY ───────────── */
function SuiteWhy() {
  const points = [
    {
      label: "One account",
      body: "Sign in once. Your license covers Presenter, Schedule Manager, and Editors' Notes today — with Manager and World joining as they ship. One ACE subscription, the whole suite.",
    },
    {
      label: "Integrated workflow",
      body: "Plan the schedule in Schedule Manager. Fire up Presenter for the room. Mark up the recording in Editors' Notes. The tools are built to hand off cleanly — and more connections are coming.",
    },
    {
      label: "One system, expanding",
      body: "Same dark palette, same Geist type, same ACE mark across every surface. Every tool we add is built to the same standard: confident, technical, and built for people running real rooms.",
    },
  ];

  return (
    <section className="px-6 sm:px-10 py-24 border-b border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">Why ACE</div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-12 text-white max-w-2xl">
            Built to work{" "}
            <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
              together
            </span>
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-8" stagger={0.12}>
          {points.map((p) => (
            <Item key={p.label}>
              <div className="w-8 h-0.5 bg-[#C8102E] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{p.label}</h3>
              <p className="text-[#C4C4C4] text-sm leading-relaxed">{p.body}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ───────────── PRICING TEASER ───────────── */
function PricingTeaser() {
  return (
    <section className="px-6 sm:px-10 py-20 border-b border-[#1A1A1A] bg-[#0A0A0A]">
      <Reveal className="max-w-6xl mx-auto text-center">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">Pricing</div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
          Free to start.{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
            Fair
          </span>{" "}
          to grow.
        </h2>
        <p className="text-[#C4C4C4] text-lg mb-8 max-w-xl mx-auto">
          Per-product plans or a suite bundle. No surprise costs.
        </p>
        <Link
          href="/pricing"
          className="inline-block px-7 py-3.5 rounded-full bg-[#C8102E] hover:bg-[#E8183A] text-white font-bold text-sm transition hover:scale-[1.03] active:scale-100"
        >
          View pricing →
        </Link>
      </Reveal>
    </section>
  );
}
