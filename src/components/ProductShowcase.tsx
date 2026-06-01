"use client";

import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useScroll, useMotionValueEvent, useTransform, motion } from "motion/react";
import { products, type ProductKey } from "@/lib/brand";

/* Run layout effects on the client, plain effects on the server (no SSR warning). */
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SERIF = "font-[family-name:var(--font-instrument-serif)] italic font-normal";

type Slide = {
  key: ProductKey;
  index: string;
  short: string;
  status: "Available now" | "In development";
  chip: string;
  href: string;
  title: ReactNode;
  body: string;
  stat: string;
  cta?: { label: string; href: string };
};

const SLIDES: Slide[] = [
  {
    key: "presenter",
    index: "01",
    short: "Presenter",
    status: "Available now",
    chip: "ACE · Presenter",
    href: "/presenter",
    title: (
      <>
        The room listens.
        <br />
        The slides{" "}
        <span className={SERIF} style={{ color: products.presenter.accentVivid }}>
          follow
        </span>
        .
      </>
    ),
    body: "Native macOS app. Audio in, slide out. Sub-second detection for worship, conferences, lectures, and theater. Zero cloud dependency by default.",
    stat: "< 1s latency",
    cta: { label: "Download for Mac", href: "/api/download?platform=mac-arm64" },
  },
  {
    key: "schedule",
    index: "02",
    short: "Schedule",
    status: "Available now",
    chip: "ACE · Schedule",
    href: "/schedule",
    title: (
      <>
        Build the schedule.
        <br />
        Run the{" "}
        <span className={SERIF} style={{ color: products.schedule.accentVivid }}>
          day
        </span>
        .
      </>
    ),
    body: "AI-powered routine and task manager. Photograph a syllabus, extract tasks in one step. Daily AI guidance. Cloud-synced via Supabase.",
    stat: "Web + desktop",
    cta: { label: "Open Schedule Manager", href: "https://app.ace-presenter.app/auth" },
  },
  {
    key: "editorsNotes",
    index: "03",
    short: "Editors' Notes",
    status: "Available now",
    chip: "ACE · Editors' Notes",
    href: "/editors-notes",
    title: (
      <>
        Notes that talk
        <br />
        to{" "}
        <span className={SERIF} style={{ color: products.editorsNotes.accentVivid }}>
          Resolve
        </span>
        .
      </>
    ),
    body: "Qt6 macOS app with DaVinci Resolve integration. Every timecode in your notes is a click that jumps Resolve to that exact frame.",
    stat: "DaVinci Resolve",
    cta: {
      label: "Download for Mac",
      href: "/api/download?product=editors-notes&platform=mac-arm64",
    },
  },
  {
    key: "manager",
    index: "04",
    short: "Manager",
    status: "In development",
    chip: "ACE · Manager",
    href: "/manager",
    title: (
      <>
        Run the{" "}
        <span className={SERIF} style={{ color: products.manager.accentVivid }}>
          organization
        </span>
        .
      </>
    ),
    body: "Church and team management for members, departments, events, tasks, and campaigns. Multi-tenant, role-based, with AI agent actions built in.",
    stat: "Churches & ministries",
  },
  {
    key: "world",
    index: "05",
    short: "World",
    status: "In development",
    chip: "ACE · World",
    href: "/world",
    title: (
      <>
        Live audience.
        <br />
        <span className={SERIF} style={{ color: products.world.accentVivid }}>
          Virtual
        </span>{" "}
        space.
      </>
    ),
    body: "A 3D audience environment for live events. Babylon.js on desktop, WebXR on the web. Attendees enter a shared space tied to your stage feed.",
    stat: "Electron + WebXR",
  },
];

const N = SLIDES.length;

export default function ProductShowcase() {
  const [enhanced, setEnhanced] = useState(false);

  // Decide desktop-with-motion *before paint* so there's no flash / layout shift.
  useIso(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnhanced(!reduce.matches && desktop.matches);
    update();
    reduce.addEventListener("change", update);
    desktop.addEventListener("change", update);
    return () => {
      reduce.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
    };
  }, []);

  return enhanced ? <PinnedShowcase /> : <StackedShowcase />;
}

/* ───────────── ENHANCED: pinned scroll-scrub (desktop + motion) ───────────── */

function PinnedShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.floor(v * N)));
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
    }
  });

  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const acc = products[SLIDES[active].key];

  return (
    <section
      ref={wrapRef}
      aria-label="The ACE suite"
      className="relative border-y border-[#1A1A1A] bg-[#080808]"
      style={{ height: `${N * 92}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Accent flood — one layer per product, cross-fading on the active one */}
        {SLIDES.map((s, i) => (
          <div
            key={s.key}
            aria-hidden
            className="absolute inset-0 transition-opacity duration-1000 ease-out"
            style={{
              opacity: i === active ? 1 : 0,
              background: `radial-gradient(80% 60% at 22% 38%, rgba(${products[s.key].rgb},0.30) 0%, rgba(${products[s.key].rgb},0.07) 40%, rgba(${products[s.key].rgb},0) 72%)`,
            }}
          />
        ))}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 120%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 55%)",
          }}
        />

        <div className="relative h-full max-w-6xl mx-auto px-6 sm:px-10 flex items-center">
          <div className="grid lg:grid-cols-2 gap-10 items-center w-full">
            {/* Left: text panels stacked, active one shown */}
            <div className="relative min-h-[60vh] flex">
              {SLIDES.map((s, i) => (
                <div
                  key={s.key}
                  className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out ${
                    i === active
                      ? "opacity-100 translate-y-0 blur-0"
                      : "opacity-0 translate-y-6 blur-[2px] pointer-events-none"
                  }`}
                  aria-hidden={i !== active}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-sm font-mono text-[#666] tabular-nums">
                      {s.index} <span className="text-[#3A3A3A]">/ 0{N}</span>
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0F0F0F] border border-[#2A2A2A] text-[9px] uppercase tracking-[0.2em] font-bold"
                      style={{ color: products[s.key].accentVivid }}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${s.status === "Available now" ? "" : "opacity-60"}`}
                        style={{ backgroundColor: products[s.key].accent }}
                      />
                      {s.status}
                    </span>
                  </div>

                  <div
                    className="text-[10px] uppercase tracking-[0.25em] font-bold mb-4"
                    style={{ color: products[s.key].accent }}
                  >
                    {s.chip}
                  </div>

                  <h3 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.02] text-white">
                    {s.title}
                  </h3>

                  <p className="mt-6 max-w-md text-[#C4C4C4] text-base leading-relaxed">
                    {s.body}
                  </p>

                  <div className="mt-5 text-[10px] uppercase tracking-[0.2em] text-[#888] font-semibold">
                    {s.stat}
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                    {s.cta && (
                      <a
                        href={s.cta.href}
                        className="px-6 py-3 rounded-full text-white font-bold text-sm transition hover:scale-[1.03] active:scale-100"
                        style={{ backgroundColor: products[s.key].accent }}
                      >
                        {s.cta.label}
                      </a>
                    )}
                    <Link
                      href={s.href}
                      className="px-5 py-3 rounded-full bg-[#141414] hover:bg-[#1F1F1F] text-[#C4C4C4] font-semibold text-sm transition border border-[#2A2A2A]"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: accent-tinted device frame, re-fades when active changes */}
            <div className="hidden lg:flex justify-center">
              <div
                key={active}
                className="ace-reveal w-full max-w-md aspect-[4/3] rounded-2xl border border-[#222] overflow-hidden"
                style={{
                  background: `linear-gradient(160deg, rgba(${acc.rgb},0.16), rgba(20,20,20,0.6))`,
                  boxShadow: `0 30px 80px -30px rgba(${acc.rgb},0.45)`,
                }}
              >
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="ml-3 text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
                    {SLIDES[active].chip}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <div
                    className="text-3xl font-bold tracking-tight"
                    style={{ color: acc.accentVivid }}
                  >
                    {SLIDES[active].short}
                  </div>
                  <div className="h-2 rounded-full bg-white/10 w-3/4" />
                  <div className="h-2 rounded-full bg-white/10 w-1/2" />
                  <div className="mt-3 flex gap-1.5 items-end h-16">
                    {Array.from({ length: 11 }).map((_, b) => (
                      <span
                        key={b}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${30 + Math.abs(Math.sin(b * 1.3 + active)) * 60}%`,
                          backgroundColor: `rgba(${acc.rgb},${0.35 + (b % 3) * 0.2})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical index rail */}
          <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-4">
            {SLIDES.map((s, i) => (
              <div key={s.key} className="flex items-center gap-3 justify-end">
                <span
                  className={`text-[11px] font-semibold tracking-wide transition-colors duration-300 ${
                    i === active ? "text-white" : "text-[#555]"
                  }`}
                >
                  {s.short}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === active ? products[s.key].accent : "#333",
                    transform: i === active ? "scale(1.6)" : "scale(1)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint + progress bar */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-[#666] font-semibold"
        >
          Scroll to explore ↓
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
          <motion.div
            className="h-full origin-left"
            style={{ scaleX: scrollYProgress, backgroundColor: acc.accent }}
          />
        </div>
      </div>
    </section>
  );
}

/* ───────────── FALLBACK: static stacked cards (mobile / reduced-motion / no-JS) ───────────── */

function StackedShowcase() {
  return (
    <section className="px-6 sm:px-10 py-24 border-b border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
          The ACE Suite
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-12 text-white max-w-2xl">
          Five tools,{" "}
          <span className={`${SERIF} text-[#E8183A]`}>one account</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SLIDES.map((s) => {
            const p = products[s.key];
            return (
              <div
                key={s.key}
                className="group h-full p-7 rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#111] border border-[#222] transition-colors duration-300 flex flex-col gap-5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0F0F0F] border border-[#2A2A2A] text-[9px] uppercase tracking-[0.2em] font-bold"
                    style={{ color: p.accentVivid }}
                  >
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: p.accent }}
                    />
                    {s.chip}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#666] font-semibold">
                    {s.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-[#C4C4C4] text-sm leading-relaxed mb-4">
                    {s.body}
                  </p>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#888] font-semibold">
                    {s.stat}
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  {s.cta && (
                    <a
                      href={s.cta.href}
                      className="px-5 py-2.5 rounded-full text-white font-bold text-xs transition text-center"
                      style={{ backgroundColor: p.accent }}
                    >
                      {s.cta.label}
                    </a>
                  )}
                  <Link
                    href={s.href}
                    className="px-5 py-2.5 rounded-full bg-[#141414] hover:bg-[#1F1F1F] text-[#C4C4C4] font-semibold text-xs transition border border-[#2A2A2A] text-center"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
