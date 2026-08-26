"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { products, type ProductKey } from "@/lib/brand";

import presenterShot from "../../../public/presenter/stage.png";
import scheduleShot from "../../../public/schedule/my-tasks.webp";
import notesShot from "../../../public/editors-notes/screenshot-insert-timecode.png";
import managerShot from "../../../public/og/og-manager.png";
import worldShot from "../../../public/og/og-world.png";

type Panel = {
  key: ProductKey;
  name: string;
  status: string;
  platform: string;
  headline: string;
  body: string;
  features: string[];
  href: string;
  visual: StaticImageData;
  visualAlt: string;
};

const PANELS: Panel[] = [
  {
    key: "presenter",
    name: "Presenter",
    status: "Shipping",
    platform: "macOS & Windows",
    headline: "Slides that follow the room.",
    body: "ACE listens to the service and fires the next cue in under a second — lyrics, scripture, and decks that keep up with the band and the preacher. No clicker, no cloud.",
    features: [
      "Live lyric + scripture detection, 12+ languages",
      "HDMI · NDI · ATEM · OBS · OSC output",
      "One-click ProPresenter library import",
    ],
    href: "/presenter",
    visual: presenterShot,
    visualAlt: "ACE Presenter running a live service",
  },
  {
    key: "schedule",
    name: "Schedule",
    status: "Shipping",
    platform: "Web & macOS",
    headline: "Build the day. Run it.",
    body: "Photograph a syllabus and ACE turns it into a plan. Routines, Kanban projects, daily AI guidance, and two-way calendar sync — for the people behind the event.",
    features: [
      "AI import from a photo of any plan",
      "Kanban projects, milestones, weekly view",
      "Google Calendar sync + cloud everywhere",
    ],
    href: "/schedule",
    visual: scheduleShot,
    visualAlt: "ACE Schedule weekly agenda and task board",
  },
  {
    key: "editorsNotes",
    name: "Editors' Notes",
    status: "Public beta",
    platform: "macOS",
    headline: "Notes that talk to Resolve.",
    body: "Every timecode is a click — tap it and DaVinci Resolve's playhead jumps to that frame. Import markers, colour-code by department, export to PDF. Local-first, works air-gapped.",
    features: [
      "Click-to-seek timecodes into Resolve",
      "Import timeline markers with colours",
      "Rich text, per-project, PDF export",
    ],
    href: "/editors-notes",
    visual: notesShot,
    visualAlt: "ACE Editors' Notes inserting a clickable timecode",
  },
  {
    key: "manager",
    name: "Manager",
    status: "Early access",
    platform: "Web",
    headline: "One dashboard for the organization.",
    body: "Members, departments, rotas, giving, events, and messaging in one place — with an AI agent handling the routine follow-ups in the background.",
    features: [
      "Member + team directory with engagement",
      "Rotas, events, giving, and check-in",
      "WhatsApp · SMS · email · an autonomous agent",
    ],
    href: "/manager",
    visual: managerShot,
    visualAlt: "ACE Manager dashboard",
  },
  {
    key: "world",
    name: "World",
    status: "In development",
    platform: "Web, Desktop & VR",
    headline: "A shared 3D space for your audience.",
    body: "A virtual venue that recreates your event as a place — avatars watch your live feed together, hear each other in spatial voice, and a producer drives the room.",
    features: [
      "Your live feed on an in-world stage, sub-second",
      "Spatial voice panned to each avatar",
      "Join by link in any browser, or on Quest",
    ],
    href: "/world",
    visual: worldShot,
    visualAlt: "ACE World virtual venue",
  },
];

const N = PANELS.length;

function PanelCopy({ p, active }: { p: Panel; active: boolean }) {
  const b = products[p.key];
  return (
    <div
      className="transition-all duration-700"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(14px)",
      }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: b.accent, boxShadow: `0 0 12px ${b.accent}` }}
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#AAA]">
            {p.name}
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
          {p.status}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#777]">
          {p.platform}
        </span>
      </div>
      <h3 className="mt-5 text-[2.1rem] font-bold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
        {p.headline}
      </h3>
      <p className="mt-5 max-w-lg text-base leading-relaxed text-[#B4B4B4] sm:text-lg">
        {p.body}
      </p>
      <ul className="mt-6 grid gap-2.5">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-[#D4D4D4]">
            <span className="mt-0.5" style={{ color: b.accentVivid }} aria-hidden>
              ✓
            </span>
            <span className="leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href={p.href}
        tabIndex={active ? 0 : -1}
        className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3"
        style={{ color: b.accentVivid }}
      >
        Explore {p.name} <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

function PanelVisual({ p, active }: { p: Panel; active: boolean }) {
  const b = products[p.key];
  return (
    <div
      className="relative transition-all duration-700"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "scale(1)" : "scale(1.05)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] blur-3xl"
        style={{
          background: `radial-gradient(60% 60% at 50% 45%, rgba(${b.rgb},0.30), transparent 74%)`,
        }}
      />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D] shadow-[0_40px_120px_-32px_rgba(0,0,0,0.85)]">
        <Image
          src={p.visual}
          alt={p.visualAlt}
          placeholder="blur"
          sizes="(max-width: 1024px) 100vw, 640px"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

/** Non-pinned fallback for reduced-motion and pre-hydration / no-JS. */
function StackedFallback() {
  return (
    <section className="px-6 py-20 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-24">
        {PANELS.map((p, i) => (
          <div
            key={p.key}
            className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <div className={i % 2 ? "lg:order-2" : ""}>
              <PanelCopy p={p} active />
            </div>
            <div className={i % 2 ? "lg:order-1" : ""}>
              <PanelVisual p={p} active />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * PinnedShowcase — a scroll-scrubbed tour of the whole suite. The section is
 * tall (N × 100vh); an inner sticky viewport stays put while scrolling advances
 * through the five products, crossfading each panel and shifting the page-wide
 * accent to match. A left rail tracks progress and lets you jump.
 */
export default function PinnedShowcase() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const lastIdx = useRef(-1);

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.floor(v * N + 0.0001)));
    if (idx === lastIdx.current) return;
    lastIdx.current = idx;
    setI(idx);
    const rgb = products[PANELS[idx].key].rgb.split(",");
    const root = document.documentElement;
    root.style.setProperty("--ar", rgb[0].trim());
    root.style.setProperty("--ag", rgb[1].trim());
    root.style.setProperty("--ab", rgb[2].trim());
  });

  const jump = (idx: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.offsetTop + idx * window.innerHeight + 4;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (reduce || !mounted) return <StackedFallback />;

  return (
    <section ref={ref} id="suite" style={{ height: `${N * 100}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Left progress rail (lg+) */}
        <div className="absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 items-stretch gap-4 lg:flex xl:left-8">
          <div className="relative h-64 w-px bg-white/15">
            <motion.div
              aria-hidden
              className="absolute left-0 top-0 w-px"
              style={{ height: fillHeight, background: products[PANELS[i].key].accent }}
            />
          </div>
          <div className="flex h-64 flex-col justify-between py-0.5">
            {PANELS.map((p, idx) => {
              const active = idx === i;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => jump(idx)}
                  className="text-left font-mono text-[10px] uppercase tracking-[0.16em] transition-colors"
                  style={{ color: active ? products[p.key].accentVivid : "rgba(255,255,255,0.4)" }}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stacked, crossfading panels */}
        <div className="mx-auto grid w-full max-w-6xl items-center px-6 sm:px-10 lg:pl-28 xl:pl-32">
          {PANELS.map((p, idx) => {
            const active = idx === i;
            return (
              <div
                key={p.key}
                aria-hidden={!active}
                className="col-start-1 row-start-1"
                style={{
                  opacity: active ? 1 : 0,
                  pointerEvents: active ? "auto" : "none",
                  transition: "opacity 0.6s ease",
                  zIndex: active ? 2 : 1,
                }}
              >
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
                  <PanelCopy p={p} active={active} />
                  <PanelVisual p={p} active={active} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile dot indicator */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 lg:hidden">
          {PANELS.map((p, idx) => (
            <span
              key={p.key}
              aria-hidden
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: idx === i ? 22 : 6,
                background: idx === i ? products[p.key].accent : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
