import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";

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
      <ProductTriptych />
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
    <section className="relative px-6 sm:px-10 pt-20 sm:pt-32 pb-24 text-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, rgba(200,16,46,0.30) 0%, rgba(200,16,46,0.08) 40%, rgba(200,16,46,0) 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[10px] uppercase tracking-[0.25em] text-[#C4C4C4] font-semibold mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          Agentic tools for the room
        </div>

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

        <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-[#C4C4C4] leading-relaxed">
          A suite of agentic tools. One account. Built for people who run live events, personal workflows, and post-production — with more on the way.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/api/download?platform=mac-arm64"
            className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition shadow-[0_10px_40px_rgba(255,255,255,0.12)]"
          >
            Download Presenter
          </a>
          <a
            href="https://app.ace-presenter.app/auth"
            className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm transition border border-[#2A2A2A]"
          >
            Open Schedule Manager
          </a>
        </div>

        <p className="mt-5 text-xs text-[#888]">Free to start · macOS 12+ for desktop apps</p>
      </div>
    </section>
  );
}

/* ───────────── PRODUCT TRIPTYCH ───────────── */
const PRODUCTS = [
  {
    chip: "ACE · Presenter",
    href: "/presenter",
    headline: "The room listens. The slides follow.",
    body: "Native macOS app. Audio in, slide out. Sub-second detection for worship, conferences, lectures, and theater. Zero cloud dependency by default.",
    cta: "Download for Mac",
    ctaHref: "/api/download?platform=mac-arm64",
    stat: "< 1s latency",
  },
  {
    chip: "ACE · Schedule",
    href: "/schedule",
    headline: "Build the schedule. Run the day.",
    body: "AI-powered routine and task manager. Photograph a syllabus, extract tasks in one step. Daily AI guidance. Cloud-synced via Supabase.",
    cta: "Open Schedule Manager",
    ctaHref: "https://app.ace-presenter.app/auth",
    stat: "Web + desktop",
  },
  {
    chip: "ACE · Editors' Notes",
    href: "/editors-notes",
    headline: "Notes that talk to Resolve.",
    body: "Qt6 macOS app, DaVinci Resolve integration. Every timecode in your notes is a click that jumps Resolve to that frame.",
    cta: "Download for Mac",
    ctaHref: "/api/download?product=editors-notes&platform=mac-arm64",
    stat: "DaVinci Resolve",
  },
] as const;

const COMING_SOON = [
  {
    chip: "ACE · Manager",
    headline: "Run the organization.",
    body: "Church and team management for members, departments, events, tasks, and campaigns. Multi-tenant. Role-based. AI agent actions built in.",
    stat: "Churches & ministries",
  },
  {
    chip: "ACE · World",
    headline: "Live audience. Virtual space.",
    body: "3D audience environment for live events. Babylon.js on desktop and WebXR on the web. Attendees enter a shared space tied to your stage feed.",
    stat: "Electron + WebXR",
  },
] as const;

function ProductTriptych() {
  return (
    <section className="px-6 sm:px-10 py-24 border-y border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">Available now</div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-12 text-white max-w-2xl">
          Three tools,{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
            one account
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {PRODUCTS.map((p) => (
            <div
              key={p.chip}
              className="group p-7 rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#111] border border-[#222] hover:border-[#C8102E]/40 transition-colors flex flex-col gap-5 relative overflow-hidden"
            >
              <div aria-hidden className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-[#C8102E]/0 group-hover:bg-[#C8102E]/10 blur-3xl transition-all duration-500" />

              <div className="relative">
                {/* Chip */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0F0F0F] border border-[#2A2A2A] text-[9px] uppercase tracking-[0.2em] text-[#C8102E] font-bold mb-4">
                  <span className="w-1 h-1 rounded-full bg-[#C8102E]" />
                  {p.chip}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 leading-tight">{p.headline}</h3>
                <p className="text-[#C4C4C4] text-sm leading-relaxed mb-4">{p.body}</p>

                {/* Stat */}
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#888] font-semibold mb-5">{p.stat}</div>

                {/* CTAs */}
                <div className="flex flex-col gap-2">
                  <a
                    href={p.ctaHref}
                    className="px-5 py-2.5 rounded-full bg-[#C8102E] hover:bg-[#E8183A] text-white font-bold text-xs transition text-center"
                  >
                    {p.cta}
                  </a>
                  <Link
                    href={p.href}
                    className="px-5 py-2.5 rounded-full bg-[#141414] hover:bg-[#1F1F1F] text-[#C4C4C4] font-semibold text-xs transition border border-[#2A2A2A] text-center"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon strip */}
        <div className="border-t border-[#1A1A1A] pt-10">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#555] font-bold mb-6">In development</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COMING_SOON.map((p) => (
              <div
                key={p.chip}
                className="p-6 rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] flex flex-col gap-3 opacity-70"
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0F0F0F] border border-[#222] text-[9px] uppercase tracking-[0.2em] text-[#555] font-bold w-fit">
                  <span className="w-1 h-1 rounded-full bg-[#555]" />
                  {p.chip}
                </div>
                <h3 className="text-base font-bold text-[#888] leading-tight">{p.headline}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{p.body}</p>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#444] font-semibold">{p.stat}</div>
              </div>
            ))}
          </div>
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
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">Why ACE</div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-12 text-white max-w-2xl">
          Built to work{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
            together
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {points.map((p) => (
            <div key={p.label}>
              <div className="w-8 h-0.5 bg-[#C8102E] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{p.label}</h3>
              <p className="text-[#C4C4C4] text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── PRICING TEASER ───────────── */
function PricingTeaser() {
  return (
    <section className="px-6 sm:px-10 py-20 border-b border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto text-center">
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
          className="inline-block px-7 py-3.5 rounded-full bg-[#C8102E] hover:bg-[#E8183A] text-white font-bold text-sm transition"
        >
          View pricing →
        </Link>
      </div>
    </section>
  );
}
