"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import PhoneFrame from "./PhoneFrame";
import { Grain } from "./SpatialHero";

/**
 * ACE Remote 1.2, as a pinned scroll tour. One phone in the middle turns as
 * you scroll and steps through the eight screens; a HUD list on the left
 * tracks where you are. Wording is the App Store captions
 * (ACE-Presenter-Remote-Mac/scripts/store-screenshots.py), so the site and
 * the store say the same thing.
 *
 * Studio, Meeting notes and Teleprompter carry "Coming soon" until Apple
 * approves 1.2.0 (operator, 2026-11-17).
 */

type Screen = { file: string; tag: string; title: [string, string]; sub: string; soon?: boolean };

const SCREENS: Screen[] = [
  { file: "01-remote", tag: "Remote", title: ["Run the service", "from your pocket"], sub: "Slides, lower thirds and Next under your thumb." },
  { file: "02-cues", tag: "Cues", title: ["Every cue,", "one tap from live"], sub: "The whole service order on your phone." },
  { file: "03-library", tag: "Library", title: ["Songs, scripture", "and media"], sub: "Search and put anything on screen." },
  { file: "04-studio", tag: "Studio", title: ["Teleprompter and", "meeting notes"], sub: "They work on their own, no computer needed.", soon: true },
  { file: "05-meeting-notes", tag: "Meeting notes", title: ["Record a meeting.", "Get the notes."], sub: "Summary, decisions and who does what.", soon: true },
  { file: "06-teleprompter", tag: "Teleprompter", title: ["Scripts that scroll", "as you speak"], sub: "Follow my voice, mirror mode, record yourself.", soon: true },
  { file: "07-screens", tag: "Screens", title: ["Every screen,", "under control"], sub: "Turn outputs on and off from anywhere." },
  { file: "08-output", tag: "Output", title: ["See exactly what", "the room sees"], sub: "The live slide, large, with Next under your thumb." },
];

const N = SCREENS.length;

export default function PhoneTour() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIdx(Math.min(N - 1, Math.max(0, Math.floor(v * N))));
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.4 });
  const rotY = useTransform(smooth, [0, 0.5, 1], [-18, 0, 18]);
  const rotX = useTransform(smooth, [0, 0.5, 1], [8, 2, 8]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const s = SCREENS[idx];

  return (
    <section ref={ref} id="remote" className="relative border-t border-white/[0.06]" style={{ height: `${N * 70 + 30}vh` }}>
      <div className="sticky top-0 isolate flex h-[100svh] flex-col overflow-hidden">
        {/* Backdrop: grid, glow, giant index */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(70% 70% at 50% 50%, black, transparent)",
            WebkitMaskImage: "radial-gradient(70% 70% at 50% 50%, black, transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "radial-gradient(40% 50% at 50% 55%, rgba(200,16,46,0.22), transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-4vw] left-[2%] -z-10 hidden font-mono text-[20vw] font-bold leading-none text-white/[0.03] lg:block"
        >
          {String(idx + 1).padStart(2, "0")}
        </div>
        <Grain />

        {/* Header bar */}
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-24 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 sm:px-10">
          <span>
            <span className="text-[#FF4D5E]">ACE Remote 1.2</span> · iPhone + Android
          </span>
          <span className="tabular-nums">
            Screen {String(idx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
        </div>
        <div className="mx-auto mt-3 h-px w-full max-w-6xl bg-white/[0.07] px-6 sm:px-10">
          <motion.div className="h-px bg-[#FF3B4F]" style={{ width: bar }} />
        </div>

        <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-6 px-6 pb-8 sm:px-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-14">
          {/* HUD list */}
          <ol className="hidden flex-col gap-1 lg:flex">
            {SCREENS.map((sc, i) => (
              <li
                key={sc.file}
                className={`flex items-center gap-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                  i === idx ? "text-white" : "text-white/25"
                }`}
              >
                <span className={i === idx ? "text-[#FF3B4F]" : ""}>{String(i + 1).padStart(2, "0")}</span>
                <span className={`h-px transition-all duration-500 ${i === idx ? "w-10 bg-[#FF3B4F]" : "w-4 bg-white/15"}`} />
                {sc.tag}
                {sc.soon && <span className="text-[9px] tracking-[0.15em] text-white/30">· soon</span>}
              </li>
            ))}
          </ol>

          {/* Phone */}
          <div className="relative mx-auto [perspective:1400px]">
            <motion.div
              style={reduce ? undefined : { rotateY: rotY, rotateX: rotX }}
              className="relative aspect-[1284/2778] h-[min(62svh,600px)] [transform-style:preserve-3d] lg:h-[min(72svh,690px)]"
            >
              <Brackets />
              <PhoneFrame className="h-full w-full">
                {SCREENS.map((sc, i) => (
                  <Image
                    key={sc.file}
                    src={`/remote/v12/${sc.file}.webp`}
                    alt={`ACE Remote: ${sc.tag}`}
                    width={640}
                    height={1315}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ opacity: i === idx ? 1 : 0, transform: i === idx ? "scale(1)" : "scale(0.97)" }}
                  />
                ))}
                {!reduce && (
                  <div
                    key={idx}
                    aria-hidden
                    className="ace-sp-scan pointer-events-none absolute inset-x-0 top-0 h-full"
                    style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(255,59,79,0.0) 70%, rgba(255,59,79,0.35) 98%, rgba(255,255,255,0.6) 100%)" }}
                  />
                )}
              </PhoneFrame>
            </motion.div>
          </div>

          {/* Copy */}
          <div className="text-center lg:text-left" aria-live="polite">
            <motion.div
              key={idx}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#FF4D5E]">{s.tag}</span>
                {s.soon && (
                  <span className="rounded-full border border-[#FF3B4F]/40 bg-[#FF3B4F]/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#FF8A96]">
                    Coming soon
                  </span>
                )}
              </div>
              <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white">
                {s.title[0]}
                <br />
                {s.title[1]}
              </h2>
              <p className="mt-4 text-base text-[#A8A8B0] lg:max-w-xs">{s.sub}</p>
            </motion.div>
            <div className="mt-6 flex justify-center gap-1.5 lg:hidden" aria-hidden>
              {SCREENS.map((sc, i) => (
                <span key={sc.file} className={`h-1 rounded-full transition-all ${i === idx ? "w-6 bg-[#FF3B4F]" : "w-1.5 bg-white/20"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Brackets() {
  const c = "absolute h-6 w-6 border-[#FF3B4F]/70";
  return (
    <div aria-hidden className="pointer-events-none absolute -inset-5" style={{ transform: "translateZ(-20px)" }}>
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}
