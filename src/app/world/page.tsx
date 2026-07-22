import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ScrollReveal as Reveal, ScrollStagger as Stagger, ScrollItem as Item, SpotlightCard } from "@/components/motion";
import { HeroShell, AccentItalic, CTABand } from "@/components/sections";

// ACE World accent (teal) — mirrors products.world in @/lib/brand.
const ACCENT = "#0884A8";
const ACCENT_VIVID = "#3AAEC8";
const ACCENT_RGB = "8,132,168";

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
    <HeroShell product="world" ripple={false} className="min-h-[70svh]">
      <div
        className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ borderColor: `rgba(${ACCENT_RGB},0.4)`, color: ACCENT_VIVID }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT_VIVID }} />
        In development · not yet released
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        Live audience. <AccentItalic>Virtual space</AccentItalic>.
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#C4C4C4]">
        ACE Virtual World is a 3D venue that replicates a live event — not a
        video on a screen, but a shared space your audience enters. They watch
        your live stage feed together, hear each other in spatial voice, and a
        producer drives the room in real time.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <a
          href="mailto:hello@ace-presenter.app?subject=ACE%20Virtual%20World%20early%20access&body=Please%20add%20me%20to%20the%20ACE%20Virtual%20World%20early-access%20list."
          className="rounded-full px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: ACCENT }}
        >
          Register interest →
        </a>
        <Link
          href="/"
          className="rounded-full border border-[#2A2A2A] bg-[#1A1A1A]/70 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#222]"
        >
          Explore the suite
        </Link>
      </div>
    </HeroShell>
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
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-12 text-white max-w-2xl">
            The room,{" "}
            rebuilt
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.09}>
          {features.map((f) => (
            <Item key={f.title}>
              <SpotlightCard glow={`rgba(${ACCENT_RGB}, 0.12)`} className="glass-card h-full rounded-2xl">
                <div className="flex h-full flex-col gap-3 p-7">
                  <div className="mb-1 h-0.5 w-8" style={{ background: ACCENT }} />
                  <h3 className="text-base font-bold leading-tight text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-[#C4C4C4]">{f.body}</p>
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
    <CTABand
      product="world"
      eyebrow="In active development"
      title={
        <>
          We&apos;re building this <AccentItalic>now</AccentItalic>.
        </>
      }
      sub="Live media, spatial voice, and the producer controls already work in early builds. Register your interest and we'll bring you in as it opens up."
      primary={{
        href: "mailto:hello@ace-presenter.app?subject=ACE%20Virtual%20World%20early%20access&body=Please%20add%20me%20to%20the%20ACE%20Virtual%20World%20early-access%20list.",
        label: "Register interest →",
      }}
      secondary={{ href: "/", label: "Explore the suite" }}
    />
  );
}
