"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useMotionTemplate, useReducedMotion, useSpring } from "motion/react";
import { products, type ProductKey } from "@/lib/brand";

import presenterShot from "../../../public/presenter/stage.png";
import scheduleShot from "../../../public/schedule/my-tasks.webp";
import notesShot from "../../../public/editors-notes/screenshot-insert-timecode.png";

/**
 * ProductTour — real app screenshots with numbered hotspots. Each stop gets a
 * callout; Presenter stops that have a narrated feature short attached open
 * it in a player, so "what does this do?" is answered by the real app.
 *
 * Hotspot x/y are percentages of the screenshot, measured off the images in
 * /public — re-measure if a screenshot is swapped.
 */

type Clip = { slug: string; label: string; length: string };
type Stop = { x: number; y: number; title: string; body: string; clip?: Clip };
type Tour = {
  key: ProductKey;
  name: string;
  href: string;
  shot: StaticImageData;
  alt: string;
  stops: Stop[];
};

const TOURS: Tour[] = [
  {
    key: "presenter",
    name: "Presenter",
    href: "/presenter",
    shot: presenterShot,
    alt: "The ACE Presenter console during a Sunday service",
    stops: [
      {
        x: 3.5,
        y: 8.8,
        title: "Start listening",
        body: "One button. ACE listens to the room through your mic — on-device by default — and the live transcript starts on the right. Detection Settings decide who's in control, including voice commands for the speaker.",
        clip: { slug: "detection-settings", label: "Detection settings", length: "0:50" },
      },
      {
        x: 12.4,
        y: 8.8,
        title: "Choose what it listens for",
        body: "AUTO catches songs and scripture alike. Lock it to SONG for the worship set or BIBLE for the sermon, and nothing else will trigger.",
        clip: { slug: "detection-modes", label: "Detection modes", length: "0:30" },
      },
      {
        x: 8,
        y: 23.9,
        title: "Your library, ready to detect",
        body: "Import from ProPresenter, ChordPro or CCLI — or paste lyrics and ACE splits verse, chorus and bridge. Load an arrangement and ACE knows the song when the band starts it.",
        clip: { slug: "song-detection", label: "Song detection", length: "0:35" },
      },
      {
        x: 8.3,
        y: 44.8,
        title: "The service, in order",
        body: "Build the cue plan the day before. The live cue is marked LIVE, and announcement cues can auto-advance on a timer so one person can run the whole room.",
        clip: { slug: "auto-advance", label: "Auto-advance", length: "0:37" },
      },
      {
        x: 42.3,
        y: 38.4,
        title: "What's live, front and centre",
        body: "The stage view shows the current slide large, with the NEXT line and every slide of the cue underneath. Click any slide to take over manually.",
      },
      {
        x: 82.7,
        y: 36.2,
        title: "Exactly what the room sees",
        body: "The program monitor mirrors the audience screen. CLEAR, BLACK and TAKE are always one click away, and lower thirds layer over whatever's live.",
        clip: { slug: "lower-thirds", label: "Lower thirds", length: "0:31" },
      },
      {
        x: 77.4,
        y: 4.8,
        title: "Out to every screen",
        body: "HDMI outputs for the room and the stage, and NDI straight into your switcher — the status bar shows every output at a glance.",
        clip: { slug: "ndi", label: "NDI", length: "0:32" },
      },
      {
        x: 70.7,
        y: 53.7,
        title: "One timer, every screen",
        body: "Start a speaker timer and route it to the stage display, the audience screen, or both.",
        clip: { slug: "timers", label: "Timers", length: "0:29" },
      },
      {
        x: 75.6,
        y: 53.7,
        title: "A quiet word to the stage",
        body: "Send a message to the confidence monitor — “wrap up”, “one more chorus” — without the room ever seeing it.",
        clip: { slug: "stage-messages", label: "Stage messages", length: "0:34" },
      },
      {
        x: 77.7,
        y: 85.2,
        title: "Sermon notes beside the transcript",
        body: "Keep the preacher's notes next to the live transcript, so the operator always knows what's coming.",
        clip: { slug: "sermon-notes", label: "Sermon notes", length: "0:36" },
      },
    ],
  },
  {
    key: "schedule",
    name: "Schedule",
    href: "/schedule",
    shot: scheduleShot,
    alt: "ACE Schedule showing a weekly agenda and task list",
    stops: [
      {
        x: 11.7,
        y: 19.1,
        title: "Everything in one sidebar",
        body: "Home, My Tasks and Track for every account; Projects and Reports join on Pro.",
      },
      {
        x: 29.9,
        y: 28.1,
        title: "Today, at a glance",
        body: "The day's agenda opens first, with one tap into the full schedule.",
      },
      {
        x: 40.3,
        y: 50.6,
        title: "Your week, day by day",
        body: "Flip between days to see what's planned, and how much of it is done.",
      },
      {
        x: 40.6,
        y: 66.9,
        title: "Filter by what matters",
        body: "Spiritual, work, personal, exercise — categories you set, filters you can flip on and off.",
      },
      {
        x: 65,
        y: 73.9,
        title: "Check it off",
        body: "Each task carries its own notes and subtasks. Complete it and the day's progress moves.",
      },
      {
        x: 84.2,
        y: 28.4,
        title: "Synced with your calendar",
        body: "Two-way Google Calendar sync, so events and tasks live in one place.",
      },
      {
        x: 84.2,
        y: 91.5,
        title: "See the day's progress",
        body: "A running count of what's done today — the same numbers Reports turn into weekly summaries.",
      },
    ],
  },
  {
    key: "editorsNotes",
    name: "Editors' Notes",
    href: "/editors-notes",
    shot: notesShot,
    alt: "ACE Editors' Notes inserting a clickable timecode",
    stops: [
      {
        x: 8.8,
        y: 6.8,
        title: "Per project, per timeline",
        body: "Notes are organised by project and Resolve timeline, and follow you as you switch.",
      },
      {
        x: 3.1,
        y: 24.5,
        title: "Every timecode is a link",
        body: "Click a timecode and DaVinci Resolve's playhead jumps to that exact frame.",
      },
      {
        x: 49.4,
        y: 45.4,
        title: "Drop in a timecode",
        body: "Insert one by hand, or grab the playhead's current position in a keystroke.",
      },
      {
        x: 49.4,
        y: 10.5,
        title: "Find any note",
        body: "Search across every note in the project, and filter by timeline.",
      },
      {
        x: 24.1,
        y: 96.8,
        title: "Pull in Resolve markers",
        body: "Import a timeline's markers with their colours intact, then colour-code notes by department.",
      },
      {
        x: 49.9,
        y: 96.8,
        title: "Hand it off",
        body: "Export to PDF or TXT for the producer, the client or the colourist.",
      },
      {
        x: 4.9,
        y: 96.8,
        title: "Talks to Resolve",
        body: "Local-first, with a live connection to Resolve — it works air-gapped, too.",
      },
    ],
  },
];

export default function ProductTour() {
  const reduce = useReducedMotion();
  const [tourIdx, setTourIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [clip, setClip] = useState<Clip | null>(null);

  const tour = TOURS[tourIdx];
  const stop = tour.stops[step];
  const p = products[tour.key];

  // Spotlight follows the active stop.
  const sx = useSpring(stop.x, { stiffness: 140, damping: 22 });
  const sy = useSpring(stop.y, { stiffness: 140, damping: 22 });
  useEffect(() => {
    if (reduce) {
      sx.jump(stop.x);
      sy.jump(stop.y);
    } else {
      sx.set(stop.x);
      sy.set(stop.y);
    }
  }, [stop.x, stop.y, reduce, sx, sy]);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${sx}% ${sy}%, transparent 0, transparent 7%, rgba(0,0,0,0.45) 17%)`;

  const go = useCallback(
    (i: number) => setStep((i + tour.stops.length) % tour.stops.length),
    [tour.stops.length],
  );

  const pickTour = (i: number) => {
    setTourIdx(i);
    setStep(0);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(step + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(step - 1);
    }
  };

  return (
    <div onKeyDown={onKey}>
      {/* product switcher */}
      <div className="mb-6 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Choose a product to tour">
        {TOURS.map((t, i) => {
          const on = i === tourIdx;
          const tp = products[t.key];
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => pickTour(i)}
              className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${
                on ? "border-white/25 bg-white/[0.08] text-white" : "border-white/10 text-[#999] hover:text-white"
              }`}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: tp.accent, boxShadow: on ? `0 0 10px ${tp.accent}` : undefined }}
                aria-hidden
              />
              {t.name}
            </button>
          );
        })}
      </div>

      {/* screenshot + hotspots */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-y-8 inset-x-0 -z-10 rounded-[2rem] blur-3xl transition-colors duration-700 sm:-inset-x-8"
          style={{ background: `radial-gradient(60% 60% at 50% 45%, rgba(${p.rgb}, 0.22), transparent 75%)` }}
        />
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D] shadow-[0_32px_90px_-28px_rgba(0,0,0,0.8)]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={tour.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35 }}
              className="relative"
            >
              <Image
                src={tour.shot}
                alt={tour.alt}
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="block h-auto w-full"
                placeholder="blur"
              />
              <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

              {tour.stops.map((s, i) => {
                const on = i === step;
                return (
                  <button
                    key={`${tour.key}-${i}`}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Stop ${i + 1}: ${s.title}`}
                    aria-current={on ? "step" : undefined}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 p-1.5"
                    style={{ left: `${s.x}%`, top: `${s.y}%` }}
                  >
                    {on && !reduce && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-1.5 rounded-full"
                        style={{ boxShadow: `0 0 0 2px ${p.accentVivid}` }}
                        initial={{ scale: 1, opacity: 0.9 }}
                        animate={{ scale: 2.1, opacity: 0 }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    {/* On phones only the active stop carries its number; the rest shrink to dots. */}
                    <span
                      className={`relative grid place-items-center rounded-full font-mono font-bold transition-all sm:h-6 sm:w-6 sm:text-[11px] ${
                        on
                          ? "h-5 w-5 scale-110 text-[10px] text-white"
                          : "h-2.5 w-2.5 border border-white/60 bg-black/60 text-[0px] text-white/80 backdrop-blur group-hover:scale-110 group-hover:text-white sm:border-white/40"
                      }`}
                      style={on ? { background: p.accent, boxShadow: `0 0 18px rgba(${p.rgb},0.8)` } : undefined}
                    >
                      {i + 1}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* callout */}
      <div className="glass-card mt-5 grid gap-5 rounded-2xl p-5 sm:p-6 md:grid-cols-[1fr_auto] md:items-center" aria-live="polite">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm tabular-nums text-[#666]">
              {String(step + 1).padStart(2, "0")} <span className="text-[#333]">/ {String(tour.stops.length).padStart(2, "0")}</span>
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: p.accentVivid }}>
              {tour.name}
            </span>
          </div>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">{stop.title}</h3>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#B4B4B4]">{stop.body}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          {stop.clip && (
            <button
              type="button"
              onClick={() => setClip(stop.clip!)}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-1.5 pr-4 text-left transition hover:border-white/25"
            >
              <span className="relative block h-12 w-[86px] overflow-hidden rounded-lg">
                <Image src={`/presenter/clips/${stop.clip.slug}.jpg`} alt="" fill sizes="86px" className="object-cover" />
                <span className="absolute inset-0 grid place-items-center bg-black/30 text-white transition group-hover:bg-black/10">
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
                    <path d="M5 3.5v9l7.5-4.5z" />
                  </svg>
                </span>
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">Watch it in the app</span>
                <span className="block font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#888]">
                  {stop.clip.label} · {stop.clip.length}
                </span>
              </span>
            </button>
          )}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(step - 1)}
              aria-label="Previous stop"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white transition hover:border-white/30"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(step + 1)}
              aria-label="Next stop"
              className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:brightness-110"
              style={{ background: p.accent }}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#666]">
          Click a number, or use ← → to step through
        </p>
        <Link href={tour.href} className="text-sm font-semibold transition hover:opacity-80" style={{ color: p.accentVivid }}>
          More on {tour.name} →
        </Link>
      </div>

      <ClipPlayer clip={clip} onClose={() => setClip(null)} />
    </div>
  );
}

/** Native <dialog> player — Esc, focus trapping and the backdrop come for free. */
function ClipPlayer({ clip, onClose }: { clip: Clip | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (clip && !d.open) d.showModal();
    if (!clip && d.open) d.close();
  }, [clip]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto w-[min(1100px,calc(100vw-32px))] overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      aria-label={clip ? `${clip.label} — ACE Presenter feature video` : undefined}
    >
      {clip && (
        <div className="relative">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#aaa]">
              ACE Presenter · {clip.label}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/60 text-white transition hover:border-white/40"
              aria-label="Close video"
            >
              ✕
            </button>
          </div>
          <video
            key={clip.slug}
            src={`/presenter/clips/${clip.slug}.mp4`}
            poster={`/presenter/clips/${clip.slug}.jpg`}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="aspect-video w-full rounded-xl bg-black shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
          />
        </div>
      )}
    </dialog>
  );
}
