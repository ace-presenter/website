import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import HeroMockup from "@/components/HeroMockup";
import { ScrollReveal, ScrollStagger, ScrollItem } from "@/components/motion";
import Products from "@/components/Products";
import Proof from "@/components/Proof";
import MagneticButton from "@/components/MagneticButton";

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
      <Products />
      <Proof />
      <SuiteWhy />
      <PricingTeaser />
      <FinalCTA variant="suite" />
      <Footer />
    </main>
  );
}

/* ───────────── HERO ───────────── */
function Hero() {
  return (
    <section className="px-6 sm:px-10 pt-24 sm:pt-32 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-8 bg-[#C8102E]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#888]">
              Live production · reimagined
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[0.98] text-white">
            The room speaks.
            <br />
            The slides{" "}
            <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
              follow
            </span>
            .
          </h1>

          <p className="mt-7 max-w-xl text-lg text-[#B4B4B4] leading-relaxed">
            ACE Presenter is a native macOS app that listens to your service and
            fires the next slide in under a second — on-device, no clicker, no
            cloud. Built for worship, conferences, lectures, and theater.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <MagneticButton
              href="/api/download?platform=mac-arm64"
              className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition-colors"
            >
              Download for Mac
            </MagneticButton>
            <Link
              href="/presenter"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#E8183A]"
            >
              See how Presenter works
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          <p className="mt-5 text-xs text-[#777]">
            Free during the public beta · macOS 12+ · Apple Silicon &amp; Intel
          </p>
        </div>

        {/* Honest product frame */}
        <div className="mt-16 sm:mt-20 max-w-4xl">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}

/* ───────────── SUITE WHY ───────────── */
function SuiteWhy() {
  const points = [
    {
      label: "One account",
      body: "Sign in once. Your license covers Presenter, Schedule, and Editors' Notes today — with Manager and World joining as they ship.",
    },
    {
      label: "Tools that hand off",
      body: "Plan in Schedule, run the room with Presenter, mark up the recording in Editors' Notes. Built to pass work between them cleanly.",
    },
    {
      label: "One standard",
      body: "Every tool we add is built to the same bar: native where it counts, on-device by default, and made for people running real rooms.",
    },
  ];

  return (
    <section className="px-6 sm:px-10 py-28 sm:py-36 border-t border-[#1A1A1A]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#888] mb-5">
            Why ACE
          </p>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-16 text-white max-w-2xl">
            Built to work together
          </h2>
        </ScrollReveal>

        <ScrollStagger className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12" stagger={0.12}>
          {points.map((p) => (
            <ScrollItem key={p.label}>
              <div className="w-8 h-px bg-[#C8102E] mb-5" />
              <h3 className="text-lg font-bold text-white mb-2.5">{p.label}</h3>
              <p className="text-[#A8A8A8] text-[15px] leading-relaxed">{p.body}</p>
            </ScrollItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}

/* ───────────── PRICING TEASER ───────────── */
function PricingTeaser() {
  return (
    <section className="px-6 sm:px-10 py-28 sm:py-36 border-t border-[#1A1A1A]">
      <ScrollReveal className="max-w-5xl mx-auto">
        <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#888] mb-5">
          Pricing
        </p>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-5 text-white max-w-2xl">
          Free to start. Fair to grow.
        </h2>
        <p className="text-[#A8A8A8] text-lg mb-9 max-w-xl leading-relaxed">
          Per-product plans or a suite bundle. No surprise costs.
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#E8183A]"
        >
          View pricing
          <span aria-hidden>→</span>
        </Link>
      </ScrollReveal>
    </section>
  );
}
