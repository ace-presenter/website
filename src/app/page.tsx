import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/hero/HeroCarousel";
import WelcomeIntro from "@/components/hero/WelcomeIntro";
import {
  ScrollReveal,
  ScrollStagger,
  ScrollItem,
  SpotlightCard,
  SuiteAccent,
} from "@/components/motion";
import {
  SectionHeading,
  AccentItalic,
  StatsBand,
  LogoMarquee,
  CTABand,
  PinnedShowcase,
} from "@/components/sections";

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
      <SuiteAccent />
      <WelcomeIntro />
      <div className="relative z-10 flex flex-1 flex-col">
      <Nav />
      <HeroCarousel />
      <LogoMarquee
        label="Runs with the gear you already have"
        items={[
          "ProPresenter import",
          "ATEM",
          "OBS",
          "NDI",
          "MIDI",
          "OSC",
          "HDMI",
          "PowerPoint",
          "Keynote",
          "DaVinci Resolve",
        ]}
        className="border-b border-[#1A1A1A]"
      />
      <PinnedShowcase />
      <StatsBand
        stats={[
          { text: "0", label: "Clicks to advance" },
          { num: { to: 12, suffix: "+" }, label: "Languages" },
          { text: "Free", label: "To get started" },
          { text: "Mac + PC", label: "macOS 14+ · Windows 10+" },
        ]}
      />
      <Rooms />
      <SuiteWhy />
      <PricingTeaser />
      <CTABand
        eyebrow="Get started"
        title={
          <>
            Ready when the <AccentItalic>room</AccentItalic> is.
          </>
        }
        sub="You run the room. The cue runs itself. Free tier available; Pro from $29/month."
        primary={{ href: "/api/download", label: "Download ACE Presenter" }}
        secondary={{ href: "/pricing", label: "View pricing" }}
      />
      <Footer />
      </div>
    </main>
  );
}

/* ───────────── ROOMS ───────────── */
function Rooms() {
  const rooms = [
    {
      name: "Conferences",
      body: "The deck advances the instant a speaker reaches a new section — nobody riding the arrow keys from the back.",
      href: "/presenter/conferences",
    },
    {
      name: "Lectures",
      body: "Scripture, citations, and slides push in line as you teach, so the board never trails the lecture.",
      href: "/presenter/lectures",
    },
    {
      name: "Theater & live shows",
      body: "Cue-list driven, with ⌘J quick-screens for whatever the run throws at you mid-show.",
      href: "/presenter/theater",
    },
    {
      name: "Worship",
      body: "Lyrics, scripture, and sermon notes follow the moment — across languages, mid-song.",
      href: "/presenter/worship",
    },
  ];

  return (
    <section className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Where it runs"
            title="The same engine. Four rooms."
          />
        </ScrollReveal>

        <ScrollStagger
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {rooms.map((r) => (
            <ScrollItem key={r.name}>
              <SpotlightCard className="glass-card h-full rounded-2xl">
                <Link href={r.href} className="group flex h-full flex-col p-6">
                  <div className="mb-4 h-px w-8 bg-[#C8102E]" aria-hidden />
                  <h3 className="mb-2.5 text-lg font-bold text-white transition-colors group-hover:text-[#E8183A]">
                    {r.name}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#A8A8A8]">{r.body}</p>
                </Link>
              </SpotlightCard>
            </ScrollItem>
          ))}
        </ScrollStagger>
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
    <section className="border-t border-[#1A1A1A] px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading eyebrow="Why ACE" title="Built to work together" />
        </ScrollReveal>

        <ScrollStagger
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
          stagger={0.12}
        >
          {points.map((p) => (
            <ScrollItem key={p.label}>
              <SpotlightCard className="glass-card h-full rounded-2xl">
                <div className="flex h-full flex-col p-6">
                  <div className="mb-4 h-px w-8 bg-[#C8102E]" aria-hidden />
                  <h3 className="mb-2.5 text-lg font-bold text-white">{p.label}</h3>
                  <p className="text-[15px] leading-relaxed text-[#A8A8A8]">{p.body}</p>
                </div>
              </SpotlightCard>
            </ScrollItem>
          ))}
        </ScrollStagger>

        {/* Measured facts, not hype — carried over from the Proof strip. */}
        <ScrollReveal className="mt-20 max-w-3xl sm:mt-24">
          <div className="mb-7 h-px w-8 bg-[#C8102E]" aria-hidden />
          <blockquote className="text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
            &ldquo;You run the room. The cue runs itself.&rdquo;
          </blockquote>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#666]">
            Under 1 second cue latency · no clicker needed · audio never leaves the room
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ───────────── PRICING TEASER ───────────── */
function PricingTeaser() {
  return (
    <section className="border-t border-[#1A1A1A] px-6 py-28 sm:px-10 sm:py-36">
      <ScrollReveal className="mx-auto max-w-6xl">
        <SectionHeading
          align="left"
          eyebrow="Pricing"
          title="Free to start. Fair to grow."
          lede="Per-product plans or a suite bundle. No surprise costs."
        />
        <Link
          href="/pricing"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#E8183A]"
        >
          View pricing
          <span aria-hidden>→</span>
        </Link>
      </ScrollReveal>
    </section>
  );
}
