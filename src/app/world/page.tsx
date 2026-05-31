import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Aurora, Reveal, Stagger, Item, SpotlightCard } from "@/components/motion";

// ACE World accent (teal) — mirrors products.world in @/lib/brand.
const ACCENT = "#0884A8";
const ACCENT_VIVID = "#3AAEC8";
const ACCENT_RGB = "8,132,168";
const GLOW = `rgba(${ACCENT_RGB},0.14)`;

export const metadata: Metadata = {
  title: "ACE Virtual World — live events in a shared 3D space",
  description:
    "A 3D virtual venue that replicates a live event: a shared space where the audience watches your live stage feed, with spatial voice and a producer driving the room. Desktop and WebXR. In development.",
  alternates: { canonical: "/world" },
  openGraph: {
    title: "ACE Virtual World — live events in a shared 3D space",
    description:
      "A 3D virtual venue that replicates a live event — shared space, live stage feed, spatial voice, producer-driven. In development.",
    url: "https://www.ace-presenter.app/world",
    siteName: "ACE",
    locale: "en_US",
    type: "website",
  },
};

export default function WorldPage() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav activeProduct="world" />
      <Hero />
      <WhatsComing />
      <SuiteFit />
      <Footer />
    </main>
  );
}

/* ───────────── HERO ───────────── */
function Hero() {
  return (
    <section className="relative px-6 sm:px-10 pt-20 sm:pt-32 pb-24 text-center overflow-hidden">
      <Aurora colors={[ACCENT_RGB]} intensity={0.28} />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(70% 50% at 50% 0%, rgba(${ACCENT_RGB},0.24) 0%, rgba(${ACCENT_RGB},0.07) 40%, rgba(${ACCENT_RGB},0) 70%)`,
        }}
      />
      <div className="relative max-w-3xl mx-auto">
        <Reveal>
          {/* In-development badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] uppercase tracking-[0.2em] font-bold mb-6"
            style={{ borderColor: `rgba(${ACCENT_RGB},0.4)`, color: ACCENT_VIVID }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT_VIVID }} />
            In development · not yet released
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-5 text-white">
            Live audience.{" "}
            <span
              className="font-[family-name:var(--font-instrument-serif)] italic font-normal"
              style={{ color: ACCENT_VIVID }}
            >
              Virtual space.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="text-[#C4C4C4] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            ACE Virtual World is a 3D venue that replicates a live event — not a video on a
            screen, but a shared space your audience enters. They watch your live stage feed
            together, hear each other in spatial voice, and a producer drives the room in real time.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:hello@ace-presenter.app?subject=ACE%20Virtual%20World%20early%20access&body=Please%20add%20me%20to%20the%20ACE%20Virtual%20World%20early-access%20list."
              className="px-7 py-3.5 rounded-full text-white font-bold text-sm transition hover:scale-[1.03] active:scale-100"
              style={{ background: ACCENT }}
            >
              Register interest →
            </a>
            <Link
              href="/"
              className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm transition border border-[#2A2A2A]"
            >
              Explore the suite
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── WHAT'S COMING ───────────── */
function WhatsComing() {
  const features = [
    {
      title: "A shared venue, not a stream",
      body: "Attendees enter a real 3D space together — a stage, a floor, breakout areas — and see each other as avatars, not names in a chat.",
    },
    {
      title: "Your live event, inside",
      body: "Point OBS or a camera at the world and the stage screen plays your event live, sub-second. The same feed every product in the suite already speaks.",
    },
    {
      title: "Spatial voice",
      body: "Voices are positioned in 3D at each person's avatar. Walk toward someone to hear them; the room sounds like a room.",
    },
    {
      title: "Producer-driven",
      body: "A producer fires scenes and cues that change the world for everyone — lighting, camera framing, what's on the screens — the same cueing model as ACE Presenter.",
    },
    {
      title: "Desktop and VR",
      body: "Runs as a desktop app and in the browser via WebXR — join from a laptop or step inside on a Quest headset.",
    },
    {
      title: "Part of the ACE Suite",
      body: "One account, one brand, one cueing language. Plan in Schedule, present with Presenter, gather the room in Virtual World.",
    },
  ];

  return (
    <section className="px-6 sm:px-10 py-24 border-y border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div
            className="text-[10px] uppercase tracking-[0.25em] font-bold mb-3"
            style={{ color: ACCENT_VIVID }}
          >
            What&apos;s coming
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-12 text-white max-w-2xl">
            The room,{" "}
            <span
              className="font-[family-name:var(--font-instrument-serif)] italic font-normal"
              style={{ color: ACCENT_VIVID }}
            >
              rebuilt
            </span>
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.09}>
          {features.map((f) => (
            <Item key={f.title}>
              <SpotlightCard glow={GLOW} className="h-full rounded-2xl">
                <div className="h-full p-7 rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#111] border border-[#222] flex flex-col gap-3">
                  <div className="w-8 h-0.5 mb-1" style={{ background: ACCENT }} />
                  <h3 className="text-base font-bold text-white leading-tight">{f.title}</h3>
                  <p className="text-[#C4C4C4] text-sm leading-relaxed">{f.body}</p>
                </div>
              </SpotlightCard>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ───────────── SUITE FIT ───────────── */
function SuiteFit() {
  return (
    <section className="px-6 sm:px-10 py-24 text-center">
      <Reveal className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
          We&apos;re building this{" "}
          <span
            className="font-[family-name:var(--font-instrument-serif)] italic font-normal"
            style={{ color: ACCENT_VIVID }}
          >
            now
          </span>
        </h2>
        <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
          ACE Virtual World is in active development. Live media, spatial voice, and the
          producer controls already work in early builds. Register your interest and we&apos;ll
          bring you in as it opens up.
        </p>
        <a
          href="mailto:hello@ace-presenter.app?subject=ACE%20Virtual%20World%20early%20access&body=Please%20add%20me%20to%20the%20ACE%20Virtual%20World%20early-access%20list."
          className="inline-block px-7 py-3.5 rounded-full text-white font-bold text-sm transition hover:scale-[1.03] active:scale-100"
          style={{ background: ACCENT }}
        >
          Register interest →
        </a>
      </Reveal>
    </section>
  );
}
