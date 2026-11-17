"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import PhoneFrame from "./PhoneFrame";
import { useFitScale, usePointerTilt } from "./useFitScale";

/**
 * Opening scene: "the room speaks, the slides follow" acted out in depth.
 * The audience screen, the stage monitor and the phone float at different
 * depths; the scene tilts with the pointer (slow drift on touch). The
 * LISTENING pill "hears" the line word by word, then the slide moves on and
 * a ripple runs across the floor. Built in DOM + CSS 3D so text stays crisp
 * and real; no WebGL needed. Reduced motion: no tilt, no ripple.
 */

// Public-domain hymn (1779). Same song the 1.2 phone screens show.
const SONG = "Amazing Grace";
const LINES = [
  "Amazing grace, how sweet the sound",
  "That saved a wretch like me",
  "I once was lost, but now am found",
  "Was blind, but now I see",
];

const W = 1120; // design width of the scene
const H = 600;

export default function SpatialHero() {
  const reduce = useReducedMotion() ?? false;
  const fitRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const scale = useFitScale(fitRef, W);
  usePointerTilt(tiltRef, !reduce);

  const [line, setLine] = useState(0);
  const [heard, setHeard] = useState(0);
  const [pulse, setPulse] = useState(0);
  const [clock, setClock] = useState(0);

  useEffect(() => {
    const words = LINES[line].split(" ").length;
    const t = setTimeout(
      () => {
        if (heard < words + 2) {
          setHeard((h) => h + 1);
        } else {
          setLine((l) => (l + 1) % LINES.length);
          setHeard(0);
          setPulse((p) => p + 1);
        }
      },
      reduce ? 700 : 320,
    );
    return () => clearTimeout(t);
  }, [heard, line, reduce]);

  useEffect(() => {
    const t = setInterval(() => setClock((c) => c + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const words = LINES[line].split(" ");
  const next = LINES[(line + 1) % LINES.length];
  const mm = String(Math.floor((754 + clock) / 60)).padStart(2, "0");
  const ss = String((754 + clock) % 60).padStart(2, "0");

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-24 sm:pt-28">
      {/* Light from above, like the phone screens */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[90%]"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, rgba(200,16,46,0.38), rgba(120,10,28,0.12) 45%, transparent 75%)",
        }}
      />
      {/* Perspective floor grid */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[46%] [perspective:600px]">
        <div
          className="ace-sp-grid absolute inset-x-[-50%] bottom-[-10%] h-[140%] origin-bottom"
          style={{
            transform: "rotateX(68deg)",
            backgroundImage:
              "linear-gradient(rgba(232,24,58,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(232,24,58,0.16) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "linear-gradient(to top, transparent 2%, black 30%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to top, transparent 2%, black 30%, transparent 85%)",
          }}
        />
      </div>
      <Grain />

      {/* Headline */}
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#FF4D5E]">
          ACE Presenter 3.0 · Mac + Windows
        </span>
        <h1 className="mt-5 text-[clamp(2.5rem,6.4vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-white">
          The room speaks.
          <br />
          The slides <span className="font-serif font-normal italic text-[#FF4D5E]">follow.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#B8B8BE] sm:text-lg">
          ACE listens to the service and moves the lyrics, scripture, slides and captions with it.
          Run it from the booth, the stage, or your phone.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/api/download"
            className="rounded-full bg-gradient-to-b from-[#FF3B4F] to-[#C8102E] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-8px_rgba(232,24,58,0.7)] transition hover:brightness-110"
          >
            Download ACE Presenter
          </Link>
          <a
            href="#spatial"
            className="rounded-full border border-white/12 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/[0.08]"
          >
            Hear what&rsquo;s new in 3.0
          </a>
        </div>
      </div>

      {/* Scene */}
      <div ref={fitRef} className="relative mx-auto mt-10 w-full max-w-[1120px] px-4 sm:mt-12">
        <div style={{ height: H * scale }} className="relative">
          <div
            className="absolute left-1/2 top-0 origin-top"
            style={{ width: W, height: H, transform: `translateX(-50%) scale(${scale})` }}
          >
            <div className="absolute inset-0 [perspective:1800px]">
              <div
                ref={tiltRef}
                className="absolute inset-0 [transform-style:preserve-3d]"
                style={{
                  transform:
                    "rotateX(calc(var(--ty, 0) * -5deg + 4deg)) rotateY(calc(var(--tx, 0) * 9deg))",
                }}
              >
                {/* Audience screen */}
                <div
                  className="absolute left-1/2 top-0 [transform-style:preserve-3d]"
                  style={{ width: 660, height: 371, transform: "translateX(-50%) translateZ(-140px)" }}
                >
                  <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
                    <span className="ace-sp-pulse h-1.5 w-1.5 rounded-full bg-[#FF3B4F]" /> Audience · Program
                  </div>
                  <div
                    className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-black"
                    style={{
                      boxShadow:
                        "0 50px 120px -40px rgba(0,0,0,0.95), 0 0 120px -30px rgba(200,16,46,0.5)",
                      background:
                        "radial-gradient(120% 90% at 50% 120%, rgba(200,16,46,0.28), transparent 60%), #050506",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={line}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(6px)" }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 flex items-center justify-center px-14 text-center text-[40px] font-bold leading-tight tracking-tight text-white"
                        style={{ textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}
                      >
                        {LINES[line]}
                      </motion.p>
                    </AnimatePresence>
                    <div className="absolute bottom-3 right-4 font-mono text-[10px] tracking-[0.2em] text-white/35">
                      {SONG.toUpperCase()} · {line + 1}/{LINES.length}
                    </div>
                  </div>
                </div>

                {/* Stage monitor */}
                <div
                  className="absolute left-0 top-[170px] w-[290px] rounded-xl border border-white/10 bg-[#111114]/85 p-4 backdrop-blur-md"
                  style={{
                    transform: "translateZ(30px) rotateY(24deg)",
                    boxShadow: "0 40px 80px -30px rgba(0,0,0,0.9)",
                  }}
                >
                  <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
                    <span>Stage</span>
                    <span className="text-[#FF4D5E]">
                      {mm}:{ss}
                    </span>
                  </div>
                  <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-[#FF4D5E]">Now</div>
                  <div className="mt-1 text-[17px] font-semibold leading-snug text-white">{LINES[line]}</div>
                  <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">Next</div>
                  <div className="mt-1 text-[14px] leading-snug text-white/45">{next}</div>
                </div>

                {/* Phone */}
                <div
                  className="absolute right-[20px] top-[60px] w-[200px]"
                  style={{ transform: "translateZ(150px) rotateY(-20deg) rotateZ(2deg)" }}
                >
                  <PhoneFrame>
                    <Image
                      src="/remote/v12/01-remote.webp"
                      alt="ACE Remote on iPhone: current cue, lower thirds and Next"
                      width={640}
                      height={1315}
                      priority
                      className="h-full w-full object-cover object-top"
                    />
                  </PhoneFrame>
                </div>

                {/* Floor ripple when the slide moves on */}
                {!reduce && pulse > 0 && (
                  <div
                    key={pulse}
                    aria-hidden
                    className="ace-sp-ring pointer-events-none absolute left-1/2 top-[505px] h-[360px] w-[360px] rounded-full border-2 border-[#FF3B4F]/70"
                    style={{ boxShadow: "0 0 40px rgba(255,59,79,0.45), inset 0 0 40px rgba(255,59,79,0.25)" }}
                  />
                )}

                {/* Listening pill + what it heard */}
                <div
                  className="absolute left-1/2 top-[470px] flex w-[520px] flex-col items-center"
                  style={{ transform: "translateX(-50%) translateZ(80px)" }}
                >
                  <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#121215]/90 px-4 py-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md">
                    <span className="ace-sp-pulse h-2 w-2 rounded-full bg-[#22C55E]" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/80">Listening</span>
                    <Bars active={!reduce} />
                    <span className="text-[12px] text-white/55">Voice clear</span>
                  </div>
                  <div className="mt-3 h-6 text-center font-mono text-[13px] tracking-wide">
                    {words.slice(0, heard).map((w, i) => (
                      <span key={i} className={i === heard - 1 ? "text-white" : "text-white/40"}>
                        {w}{" "}
                      </span>
                    ))}
                    {heard > words.length && <span className="text-[#22C55E]">✓ next slide</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bars({ active }: { active: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    let raf = 0;
    const bars = Array.from(el.children) as HTMLElement[];
    const tick = (t: number) => {
      bars.forEach((b, i) => {
        const v =
          0.25 +
          0.75 *
            Math.abs(Math.sin(t / 170 + i * 0.9) * Math.sin(t / 430 + i * 0.37)) *
            (0.6 + 0.4 * Math.sin(t / 900));
        b.style.transform = `scaleY(${v.toFixed(3)})`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);
  return (
    <span ref={ref} className="flex h-4 items-center gap-[3px]" aria-hidden>
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="block h-full w-[2px] origin-center rounded-full bg-[#FF4D5E]" style={{ transform: "scaleY(0.4)" }} />
      ))}
    </span>
  );
}

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}
