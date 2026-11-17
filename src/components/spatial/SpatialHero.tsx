"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";
import PhoneFrame from "./PhoneFrame";
import ShaderStage from "./ShaderStage";
import { trackPointer } from "./glass";
import { useCalmMotion, useFitScale, usePointerTilt } from "./useFitScale";
import { useVoiceFollow } from "./useVoiceFollow";

/**
 * Opening scene: "the room speaks, the slides follow", acted out — and
 * then handed to the visitor. The stage is a GPU shader (beams, haze, a
 * floor that ripples each time the slide moves on). The audience screen,
 * stage monitor and phone float at different depths in CSS 3D so the text
 * stays real and crisp; the scene tilts with the pointer.
 *
 * "Read it out loud" (2026's try-the-product hero): the visitor reads the
 * lyric and the slide follows them, via the browser's own speech
 * recognition. Without it (Firefox) the button isn't shown and the scene
 * plays itself.
 *
 * Phones get their own layout (screen, pill, button) instead of a shrunken
 * scene. Reduced motion: no tilt, a still stage, plain fades.
 */

// Public-domain hymn (1779). Same song the 1.2 phone screens show.
const SONG = "Amazing Grace";
const LINES = [
  "Amazing grace, how sweet the sound",
  "That saved a wretch like me",
  "I once was lost, but now am found",
  "Was blind, but now I see",
];

const W = 1120; // design size of the desktop scene
const H = 600;

export default function SpatialHero() {
  const reduce = useCalmMotion();
  const fitRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const levelRef = useRef(0);
  const scale = useFitScale(fitRef, W);
  usePointerTilt(tiltRef, !reduce);

  const [line, setLine] = useState(0);
  const [heard, setHeard] = useState(0);
  const [heardText, setHeardText] = useState("");
  const [pulse, setPulse] = useState(0);
  const [flash, setFlash] = useState(false);
  const [clock, setClock] = useState(0);

  const advance = useCallback(() => {
    setLine((l) => (l + 1) % LINES.length);
    setHeard(0);
    setHeardText("");
    setPulse((p) => p + 1);
    setFlash(true);
  }, []);

  const voice = useVoiceFollow({
    line: LINES[line],
    onLineDone: advance,
    onHeard: useCallback((n: number, text: string) => {
      setHeard(n);
      setHeardText(text);
    }, []),
    levelRef,
  });
  const live = voice.state === "on" || voice.state === "starting";

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(false), 1300);
    return () => clearTimeout(t);
  }, [flash]);

  // Self-playing demo while the visitor isn't reading.
  useEffect(() => {
    if (live) return;
    const words = LINES[line].split(" ").length;
    const t = setTimeout(
      () => {
        if (heard < words) {
          setHeard((h) => h + 1);
          levelRef.current = 0.55 + Math.random() * 0.4;
        } else {
          levelRef.current = 0.1;
          advance();
        }
      },
      heard === 0 ? (reduce ? 1400 : 900) : reduce ? 700 : 330,
    );
    return () => clearTimeout(t);
  }, [heard, line, reduce, live, advance]);

  useEffect(() => {
    const t = setInterval(() => setClock((c) => c + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const words = LINES[line].split(" ");
  const next = LINES[(line + 1) % LINES.length];
  const mm = String(Math.floor((754 + clock) / 60)).padStart(2, "0");
  const ss = String((754 + clock) % 60).padStart(2, "0");

  // What the pill shows it heard: the scripted words, or the visitor's own.
  const ticker = live
    ? heardText.split(" ").filter(Boolean).slice(-7)
    : words.slice(0, heard);

  const lyric = (size: string) => (
    <AnimatePresence mode="wait">
      <motion.p
        key={line}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(6px)" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute inset-0 flex items-center justify-center text-center font-bold leading-tight tracking-tight text-white ${size}`}
        style={{ textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}
      >
        {LINES[line]}
      </motion.p>
    </AnimatePresence>
  );

  const pill = (
    <div className="ace-glass flex items-center gap-3 rounded-full px-4 py-2">
      <span className={`ace-sp-pulse h-2 w-2 rounded-full ${live ? "bg-[#FF3B4F]" : "bg-[#22C55E]"}`} />
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/85">
        {live ? "Listening to you" : "Listening"}
      </span>
      <Bars active={!reduce} levelRef={levelRef} live={live} />
      <span className="hidden text-[12px] text-white/55 min-[400px]:inline">Voice clear</span>
    </div>
  );

  const tickerRow = (
    <div className="mt-3 flex h-6 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap font-mono text-[13px] tracking-wide">
      {flash ? (
        <span className="ace-sp-word text-[#22C55E]">✓ next slide</span>
      ) : ticker.length ? (
        ticker.map((w, i) => (
          <span key={`${line}-${i}-${w}`} className={`ace-sp-word ${i === ticker.length - 1 ? "text-white" : "text-white/40"}`}>
            {w}
          </span>
        ))
      ) : (
        <span className="text-white/30">{live ? "Read the line on the screen…" : "…"}</span>
      )}
    </div>
  );

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-24 sm:pt-28">
      {/* Fallback light for no-WebGL; the shader paints over it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[90%]"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, rgba(200,16,46,0.38), rgba(120,10,28,0.12) 45%, transparent 75%)",
        }}
      />
      <ShaderStage pulse={pulse} levelRef={levelRef} horizon={0.34} />
      <Grain />

      {/* Headline */}
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="ace-glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/80 sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B4F] shadow-[0_0_10px_#FF3B4F]" />
          ACE Presenter 3.0 · Mac + Windows
        </span>
        <h1 className="mt-6 text-[clamp(2.6rem,6.4vw,5.2rem)] font-bold leading-[0.96] tracking-[-0.04em] text-white">
          <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">The room speaks.</span>
          <br />
          The slides <span className="font-serif font-normal italic tracking-[-0.02em] text-[#FF4D5E]">follow.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#B8B8BE] sm:text-lg">
          ACE listens to the service and moves the lyrics, scripture, slides and captions with it.
          Run it from the booth, the stage, or your phone.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/api/download"
            className="rounded-full bg-gradient-to-b from-[#FF3B4F] to-[#C8102E] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-8px_rgba(232,24,58,0.7),inset_0_1px_0_rgba(255,255,255,0.3)] transition hover:brightness-110"
          >
            Download ACE Presenter
          </Link>
          <a
            href="#spatial"
            onPointerMove={trackPointer}
            className="ace-glass rounded-full px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
          >
            Hear what&rsquo;s new in 3.0
          </a>
        </div>
      </div>

      {/* Phones: a layout of their own, not a shrunken stage */}
      <div className="relative mx-auto mt-12 max-w-md px-5 sm:hidden">
        <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-white/45">
          <span className="flex items-center gap-2">
            <span className="ace-sp-pulse h-1.5 w-1.5 rounded-full bg-[#FF3B4F]" /> Audience
          </span>
          <span>
            {SONG} · {line + 1}/{LINES.length}
          </span>
        </div>
        <div
          className="relative aspect-video overflow-hidden rounded-2xl border border-white/10"
          style={{
            background: "radial-gradient(120% 90% at 50% 120%, rgba(200,16,46,0.3), transparent 60%), #050506",
            boxShadow: "0 30px 80px -30px rgba(0,0,0,0.95), 0 0 80px -30px rgba(200,16,46,0.6)",
          }}
        >
          {lyric("px-6 text-[clamp(1.2rem,5.6vw,1.6rem)]")}
        </div>
        <div className="ace-glass mt-3 flex items-baseline gap-3 rounded-xl px-4 py-2.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">Next</span>
          <span className="truncate text-[13px] text-white/60">{next}</span>
        </div>
        <div className="mt-7 flex flex-col items-center">
          {pill}
          {tickerRow}
        </div>
        <VoiceButton voice={voice} />
      </div>

      {/* Tablets and up: the stage in depth */}
      <div ref={fitRef} className="relative mx-auto mt-12 hidden w-full max-w-[1120px] px-4 sm:block">
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
                  transform: "rotateX(calc(var(--ty, 0) * -5deg + 4deg)) rotateY(calc(var(--tx, 0) * 9deg))",
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
                    className="relative h-full overflow-hidden rounded-xl border border-white/10"
                    style={{
                      boxShadow: "0 50px 120px -40px rgba(0,0,0,0.95), 0 0 140px -30px rgba(200,16,46,0.55)",
                      background: "radial-gradient(120% 90% at 50% 120%, rgba(200,16,46,0.28), transparent 60%), #050506",
                    }}
                  >
                    {lyric("px-14 text-[40px]")}
                    <div className="absolute bottom-3 right-4 font-mono text-[10px] tracking-[0.2em] text-white/35">
                      {SONG.toUpperCase()} · {line + 1}/{LINES.length}
                    </div>
                    {/* glass reflection across the screen */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.05) 42%, transparent 52%)",
                        transform: "translateX(calc(var(--tx, 0) * 12%))",
                      }}
                    />
                  </div>
                </div>

                {/* Stage monitor */}
                <div
                  className="ace-glass absolute left-0 top-[170px] w-[290px] rounded-2xl p-4"
                  style={{ transform: "translateZ(30px) rotateY(24deg)" }}
                >
                  <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-white/45">
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
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: "linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.10) 48%, transparent 60%)",
                        transform: "translateX(calc(var(--tx, 0) * -30%))",
                      }}
                    />
                  </PhoneFrame>
                </div>

                {/* Listening pill + what it heard */}
                <div
                  className="absolute left-1/2 top-[470px] flex w-[560px] flex-col items-center"
                  style={{ transform: "translateX(-50%) translateZ(80px)" }}
                >
                  {pill}
                  {tickerRow}
                </div>
              </div>
            </div>
          </div>
        </div>
        <VoiceButton voice={voice} />
      </div>
    </section>
  );
}

function VoiceButton({ voice }: { voice: ReturnType<typeof useVoiceFollow> }) {
  if (!voice.supported) return null;
  const live = voice.state === "on" || voice.state === "starting";
  return (
    <div className="relative mt-8 flex flex-col items-center gap-2 text-center">
      <button
        type="button"
        onClick={live ? voice.stop : voice.start}
        onPointerMove={trackPointer}
        aria-pressed={live}
        className={`ace-glass group flex items-center gap-3 rounded-full py-2.5 pl-2.5 pr-5 text-sm font-semibold text-white transition hover:bg-white/[0.08] ${
          live ? "ring-1 ring-[#FF3B4F]/60" : ""
        }`}
      >
        <span
          className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
            live ? "bg-[#E8183A]" : "bg-white/10 group-hover:bg-white/15"
          }`}
        >
          {live && <span className="absolute inset-0 animate-ping rounded-full bg-[#E8183A]/50 motion-reduce:hidden" />}
          <MicIcon />
        </span>
        {live ? "Stop listening" : "Read it out loud — the slide follows you"}
      </button>
      <p className="max-w-sm text-[11px] leading-relaxed text-white/40">
        {voice.state === "denied"
          ? "The microphone is blocked. Allow it in your browser's address bar to try."
          : voice.state === "error"
            ? "Your browser's speech service didn't answer. Try again in a moment."
            : live
              ? "Read the line on the screen, in English. The slide moves when you finish it."
              : "Your browser does the listening for this demo. Nothing is sent to ACE."}
      </p>
    </div>
  );
}

function MicIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="relative" aria-hidden>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

function Bars({ active, levelRef, live }: { active: boolean; levelRef: RefObject<number>; live: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    let raf = 0;
    const bars = Array.from(el.children) as HTMLElement[];
    const tick = (t: number) => {
      const lvl = live ? levelRef.current ?? 0 : 0.6 + 0.4 * Math.sin(t / 900);
      bars.forEach((b, i) => {
        const v = 0.18 + 0.82 * Math.abs(Math.sin(t / 170 + i * 0.9) * Math.sin(t / 430 + i * 0.37)) * Math.min(1, lvl * 1.2);
        b.style.transform = `scaleY(${v.toFixed(3)})`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, levelRef, live]);
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
