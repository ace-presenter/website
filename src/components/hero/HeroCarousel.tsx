"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { products, type ProductKey } from "@/lib/brand";

import presenterShot from "../../../public/presenter/stage.png";
import scheduleShot from "../../../public/schedule/welcome.webp";
import notesShot from "../../../public/editors-notes/screenshot-insert-timecode.png";
import managerShot from "../../../public/og/og-manager.png";
import worldShot from "../../../public/og/og-world.png";

type Slide = {
  key: ProductKey;
  name: string;
  tagline: string;
  blurb: string;
  status: string;
  platform: string;
  href: string;
  manualHref: string;
  visual: StaticImageData;
  visualAlt: string;
};

const SLIDES: Slide[] = [
  {
    key: "presenter",
    name: "Presenter",
    tagline: "The room speaks. The slides follow.",
    blurb:
      "Live worship and event presentation that listens to the service and fires the next lyric or verse in under a second — on-device, no clicker.",
    status: "Shipping",
    platform: "macOS & Windows",
    href: "/presenter",
    manualHref: "/presenter/manual",
    visual: presenterShot,
    visualAlt: "ACE Presenter running a live service",
  },
  {
    key: "schedule",
    name: "Schedule",
    tagline: "Plan and run your day with AI.",
    blurb:
      "Photograph any plan and ACE Schedule reads it into a working week — then walks you through each day from the first task to an end-of-day reflection.",
    status: "Shipping",
    platform: "Web & macOS",
    href: "/schedule",
    manualHref: "/schedule/manual",
    visual: scheduleShot,
    visualAlt: "ACE Schedule welcome screen",
  },
  {
    key: "editorsNotes",
    name: "Editors' Notes",
    tagline: "Notes that seek your timeline.",
    blurb:
      "Every timecode you type becomes a clickable link that jumps DaVinci Resolve's playhead to that exact frame — your notes and your edit, one surface.",
    status: "Public beta",
    platform: "macOS",
    href: "/editors-notes",
    manualHref: "/editors-notes/manual",
    visual: notesShot,
    visualAlt: "ACE Editors' Notes inserting a timecode",
  },
  {
    key: "manager",
    name: "Manager",
    tagline: "One dashboard for the whole organization.",
    blurb:
      "Members, departments, rotas, giving, events, and messaging in one place — with an AI agent handling the routine follow-ups in the background.",
    status: "Early access",
    platform: "Web",
    href: "/manager",
    manualHref: "/manager/manual",
    visual: managerShot,
    visualAlt: "ACE Manager dashboard",
  },
  {
    key: "world",
    name: "World",
    tagline: "A shared 3D space for your audience.",
    blurb:
      "A virtual venue that recreates your event as a place — avatars watch your live feed together, hear each other in spatial voice, and a producer drives the room.",
    status: "In development",
    platform: "Web, Desktop & VR",
    href: "/world",
    manualHref: "/world/manual",
    visual: worldShot,
    visualAlt: "ACE World virtual venue",
  },
];

const ADVANCE_MS = 6000;
const SWIPE_PX = 60;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [drag, setDrag] = useState(0); // live pointer offset in px while dragging
  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState(0); // 0→1 countdown to the next slide
  const [visible, setVisible] = useState(true); // hero in viewport?

  const viewportRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const width = useRef(1);
  const elapsed = useRef(0); // ms spent on the current slide (survives pause)

  const n = SLIDES.length;
  const go = useCallback((i: number) => setIndex(((i % n) + n) % n), [n]);

  // Drive the page-wide ambient accent to the active product (blends via the
  // --ar/--ag/--ab transition in globals.css — this is the "blend into each app").
  // Only while the hero is on screen, so it never fights sections lower down
  // (e.g. the pinned showcase) that own the accent once you've scrolled past.
  useEffect(() => {
    if (!visible) return;
    const rgb = products[SLIDES[index].key].rgb.split(",");
    const root = document.documentElement;
    root.style.setProperty("--ar", rgb[0]);
    root.style.setProperty("--ag", rgb[1]);
    root.style.setProperty("--ab", rgb[2]);
  }, [index, visible]);

  // Pause auto-advance and accent-setting when the hero scrolls out of view.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Respect reduced-motion: no auto-advance, no slide transition.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // Reset the countdown whenever the slide changes (auto or manual).
  useEffect(() => {
    elapsed.current = 0;
    setProgress(0);
  }, [index]);

  // Auto-advance, driven by a rAF countdown so the active dot's progress bar
  // stays perfectly in sync. Pausing (hover / drag) freezes elapsed time and
  // resumes exactly where it left off; reduced-motion disables it entirely.
  useEffect(() => {
    if (paused || reduced || !visible) return;
    let raf = 0;
    let last: number | null = null;
    const tick = (t: number) => {
      if (last === null) last = t;
      elapsed.current += t - last;
      last = t;
      const p = Math.min(1, elapsed.current / ADVANCE_MS);
      setProgress(p);
      if (p >= 1) {
        go(index + 1);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, paused, reduced, visible, go]);

  // Pointer drag / swipe.
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    width.current = viewportRef.current?.clientWidth || 1;
    setPaused(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setDrag(e.clientX - startX.current);
  };
  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const dx = drag;
    setDrag(0);
    if (Math.abs(dx) > SWIPE_PX) go(index + (dx < 0 ? 1 : -1));
    // resume auto-advance shortly after interaction settles
    window.setTimeout(() => setPaused(false), 600);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="ACE Suite products"
      className="relative overflow-hidden px-6 pt-16 sm:px-10 sm:pt-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Suite eyebrow — this is the suite, not one product */}
      <div className="mb-8 flex items-center justify-center gap-3">
        <span
          className="h-px w-8 transition-colors duration-700"
          style={{ background: "rgb(var(--ar) var(--ag) var(--ab))" }}
          aria-hidden
        />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#888]">
          Agentic Cue Experience · Five tools, one suite
        </span>
        <span
          className="h-px w-8 transition-colors duration-700"
          style={{ background: "rgb(var(--ar) var(--ag) var(--ab))" }}
          aria-hidden
        />
      </div>

      {/* Viewport */}
      <div
        ref={viewportRef}
        className="relative mx-auto grid max-w-7xl touch-pan-y select-none items-center lg:min-h-[40rem]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(index + 1);
          if (e.key === "ArrowLeft") go(index - 1);
        }}
        tabIndex={0}
      >
        {SLIDES.map((s, i) => {
            const b = products[s.key];
            const active = i === index;
            return (
              <div
                key={s.key}
                aria-hidden={!active}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}: ${s.name}`}
                className="col-start-1 row-start-1 w-full"
                style={{
                  opacity: active ? 1 : 0,
                  transform: active ? "scale(1)" : "scale(1.06)",
                  filter: active ? "blur(0px)" : "blur(10px)",
                  pointerEvents: active ? "auto" : "none",
                  transition: reduced
                    ? "none"
                    : "opacity 0.85s ease, transform 1s cubic-bezier(0.22,1,0.36,1), filter 0.85s ease",
                  zIndex: active ? 2 : 1,
                }}
              >
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
                  {/* Copy */}
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-2.5">
                        <span
                          aria-hidden
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: b.accent, boxShadow: `0 0 12px ${b.accent}` }}
                        />
                        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#AAA]">
                          {s.name}
                        </span>
                      </span>
                      <span
                        className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]"
                        style={{
                          color: b.accentVivid,
                          borderColor: `rgba(${b.rgb},0.35)`,
                          background: `rgba(${b.rgb},0.10)`,
                        }}
                      >
                        {s.status}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#777]">
                        {s.platform}
                      </span>
                    </div>

                    <h1 className="mt-7 text-[2.9rem] font-bold leading-[1.0] tracking-tight text-white sm:text-7xl lg:text-[5.25rem] lg:leading-[0.94]">
                      {s.tagline}
                    </h1>
                    <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#B8B8B8] sm:text-xl">
                      {s.blurb}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link
                        href={s.href}
                        tabIndex={active ? 0 : -1}
                        className="rounded-full px-8 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5"
                        style={{ background: b.accent, boxShadow: `0 18px 46px -16px rgba(${b.rgb},0.95)` }}
                      >
                        Explore {s.name}
                      </Link>
                      <Link
                        href={s.manualHref}
                        tabIndex={active ? 0 : -1}
                        className="group inline-flex items-center gap-2 text-base font-semibold text-white/85 transition hover:text-white"
                      >
                        Read the manual
                        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="relative">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] blur-3xl"
                      style={{
                        background: `radial-gradient(60% 60% at 50% 45%, rgba(${b.rgb},0.32), transparent 74%)`,
                      }}
                    />
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D] shadow-[0_40px_120px_-32px_rgba(0,0,0,0.85)]">
                      <Image
                        src={s.visual}
                        alt={s.visualAlt}
                        placeholder="blur"
                        priority={i === 0}
                        sizes="(max-width: 1024px) 100vw, 640px"
                        draggable={false}
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Controls: dots + arrows */}
      <div className="mx-auto mt-10 flex max-w-6xl items-center justify-center gap-5">
        <button
          type="button"
          aria-label="Previous product"
          onClick={() => go(index - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
        >
          ←
        </button>

        <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose product">
          {SLIDES.map((s, i) => {
            const b = products[s.key];
            const active = i === index;
            return (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={s.name}
                onClick={() => go(i)}
                className="group relative h-2.5 overflow-hidden rounded-full transition-all duration-500"
                style={{
                  width: active ? 34 : 10,
                  background: active ? `rgba(${b.rgb},0.28)` : "rgba(255,255,255,0.22)",
                  boxShadow: active ? `0 0 12px rgba(${b.rgb},0.6)` : "none",
                }}
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: reduced ? "100%" : `${progress * 100}%`,
                      background: b.accent,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Next product"
          onClick={() => go(index + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
        >
          →
        </button>
      </div>

      {/* Label row under the dots — name of the app in view */}
      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.28em] text-[#777]">
        {SLIDES[index].name}
        <span className="mx-2 text-[#444]">·</span>
        {index + 1}/{n}
      </p>
    </section>
  );
}
