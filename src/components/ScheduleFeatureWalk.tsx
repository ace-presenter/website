"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useScroll, useMotionValueEvent, motion } from "motion/react";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const SERIF = "font-[family-name:var(--font-instrument-serif)] italic font-normal";

const ACCENT = "#6941C6";
const ACCENT_VIVID = "#8B68D6";
const ACCENT_RGB = "105,65,198";

type Frame = {
  src: string;
  w: number;
  h: number;
  index: string;
  eyebrow: string;
  title: ReactNode;
  body: string;
};

const FRAMES: Frame[] = [
  {
    src: "/schedule/welcome.webp",
    w: 1600,
    h: 1002,
    index: "01",
    eyebrow: "Daily guidance",
    title: (
      <>
        The day opens with a{" "}
        <span className={SERIF} style={{ color: ACCENT_VIVID }}>
          plan
        </span>
        .
      </>
    ),
    body: "Motivational prompts, reflections, and a clear first move — so the morning starts with focus instead of a blank screen.",
  },
  {
    src: "/schedule/my-tasks.webp",
    w: 1600,
    h: 1055,
    index: "02",
    eyebrow: "My Tasks",
    title: <>Everything due, in one place.</>,
    body: "A single prioritized list that stays in sync across the web app and the desktop shell. Nothing slips.",
  },
  {
    src: "/schedule/projects.webp",
    w: 1600,
    h: 1028,
    index: "03",
    eyebrow: "Projects",
    title: (
      <>
        Boards that{" "}
        <span className={SERIF} style={{ color: ACCENT_VIVID }}>
          move
        </span>{" "}
        with you.
      </>
    ),
    body: "Full Kanban projects with milestones and custom categories, wired straight into your week view.",
  },
  {
    src: "/schedule/tracker.webp",
    w: 1600,
    h: 1073,
    index: "04",
    eyebrow: "Tracker",
    title: <>See the momentum.</>,
    body: "What's moving, what's stalled, what needs attention — progress made visible over time.",
  },
  {
    src: "/schedule/reports.webp",
    w: 1600,
    h: 1033,
    index: "05",
    eyebrow: "Reports",
    title: (
      <>
        Close the{" "}
        <span className={SERIF} style={{ color: ACCENT_VIVID }}>
          loop
        </span>
        .
      </>
    ),
    body: "Weekly summaries and exportable analytics that turn a finished week into something you can actually read.",
  },
  {
    src: "/schedule/settings.webp",
    w: 1600,
    h: 1079,
    index: "06",
    eyebrow: "Settings & sync",
    title: <>Tuned to you. Connected to your calendar.</>,
    body: "Configure guidance, categories, and two-way Google Calendar sync. One source of truth, everywhere you work.",
  },
];

const N = FRAMES.length;

export default function ScheduleFeatureWalk() {
  const [enhanced, setEnhanced] = useState(false);

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

  return enhanced ? <PinnedWalk /> : <StackedWalk />;
}

/* ───────────── ENHANCED: pinned, cross-dissolving feature walk ───────────── */

function PinnedWalk() {
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

  return (
    <section
      ref={wrapRef}
      aria-label="A look inside ACE Schedule Manager"
      className="relative"
      style={{ height: `${N * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* accent flood */}
        <div
          aria-hidden
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(70% 60% at 70% 40%, rgba(${ACCENT_RGB},0.18), rgba(${ACCENT_RGB},0) 70%)`,
          }}
        />

        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
          {/* Left: swapping copy */}
          <div className="relative min-h-[40vh] flex items-center">
            {FRAMES.map((f, i) => (
              <div
                key={f.index}
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out ${
                  i === active
                    ? "opacity-100 translate-y-0 blur-0"
                    : "opacity-0 translate-y-6 blur-[2px] pointer-events-none"
                }`}
                aria-hidden={i !== active}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-sm font-mono tabular-nums text-[#666]">
                    {f.index} <span className="text-[#333]">/ 0{N}</span>
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-[0.25em] font-bold"
                    style={{ color: ACCENT }}
                  >
                    {f.eyebrow}
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight leading-[1.05] text-white max-w-md">
                  {f.title}
                </h3>
                <p className="mt-5 max-w-sm text-[#C4C4C4] text-base leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>

          {/* Right: stacked screenshots, cross-dissolving, tilted + glowing */}
          <div
            className="relative w-full"
            style={{ aspectRatio: "16 / 10", perspective: "1600px" }}
          >
            {FRAMES.map((f, i) => {
              const delta = i - active;
              const isActive = i === active;
              return (
                <div
                  key={f.index}
                  className="absolute inset-0 transition-all duration-[900ms] ease-out will-change-transform"
                  aria-hidden={!isActive}
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: `translateY(${delta * 26}px) translateX(${delta * 14}px) scale(${isActive ? 1 : 0.94}) rotateX(8deg) rotateY(-12deg)`,
                    zIndex: isActive ? 20 : 10 - Math.abs(delta),
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div
                    className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10"
                    style={{
                      boxShadow: `0 40px 120px -30px rgba(${ACCENT_RGB},0.6), 0 10px 40px -20px rgba(0,0,0,0.8)`,
                    }}
                  >
                    <Image
                      src={f.src}
                      alt={`${f.eyebrow} — ACE Schedule Manager`}
                      width={f.w}
                      height={f.h}
                      priority={i === 0}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
          <motion.div
            className="h-full origin-left"
            style={{ scaleX: scrollYProgress, backgroundColor: ACCENT }}
          />
        </div>
      </div>
    </section>
  );
}

/* ───────────── FALLBACK: stacked feature rows (mobile / reduced-motion / no-JS) ───────────── */

function StackedWalk() {
  return (
    <section
      aria-label="A look inside ACE Schedule Manager"
      className="px-6 sm:px-10 py-20 border-b border-[#1A1A1A]"
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-20">
        {FRAMES.map((f) => (
          <div key={f.index} className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono tabular-nums text-[#666]">
                {f.index} <span className="text-[#333]">/ 0{N}</span>
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.25em] font-bold"
                style={{ color: ACCENT }}
              >
                {f.eyebrow}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-white">
              {f.title}
            </h3>
            <p className="text-[#C4C4C4] text-base leading-relaxed">{f.body}</p>
            <div
              className="relative w-full rounded-2xl overflow-hidden border border-white/10"
              style={{
                aspectRatio: `${f.w} / ${f.h}`,
                boxShadow: `0 30px 80px -30px rgba(${ACCENT_RGB},0.45)`,
              }}
            >
              <Image
                src={f.src}
                alt={`${f.eyebrow} — ACE Schedule Manager`}
                width={f.w}
                height={f.h}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
