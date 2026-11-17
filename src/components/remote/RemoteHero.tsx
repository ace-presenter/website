"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PhoneFrame from "@/components/spatial/PhoneFrame";
import { trackPointer } from "@/components/spatial/glass";
import { useCalmMotion } from "@/components/spatial/useFitScale";
import { Grain } from "@/components/spatial/SpatialHero";

/**
 * /remote opening: a phone you can press, a computer that answers, and the
 * wire between them. Tap NEXT / PREV / the eye / a lower third on the drawn
 * phone (styled after the real 1.2 Remote screen); a packet carries the
 * message to the computer, the slide changes, and `state` comes back. The log
 * uses the real message names from services/presenter.ts in the remote repo
 * (next, prev, triggerLowerThird, hideLowerThird, state, hello, pairing) and
 * clear{layer} from the Mac's RemoteControlServer.
 *
 * Plays itself while the visitor hasn't touched it. Reduced motion: no
 * packets, no autoplay; the buttons still work.
 */

const SONG = "Amazing Grace";
// Public domain (1779), four verses → four slides.
const SLIDES = [
  { label: "Verse 1", text: ["Amazing grace, how sweet the sound", "That saved a wretch like me"] },
  { label: "Verse 2", text: ["’Twas grace that taught my heart to fear", "And grace my fears relieved"] },
  { label: "Verse 3", text: ["Through many dangers, toils and snares", "I have already come"] },
  { label: "Verse 4", text: ["The Lord has promised good to me", "His word my hope secures"] },
];
const N = SLIDES.length;

type Packet = { id: number; dir: "out" | "in"; label: string };
type LogLine = { id: number; t: string; dir: "→" | "←" | "·"; msg: string; arg?: string };

const IOS_URL = "https://apps.apple.com/app/id6795585584";

export default function RemoteHero() {
  const reduce = useCalmMotion();
  const ref = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const [cleared, setCleared] = useState(false);
  const [lower, setLower] = useState(false);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [log, setLog] = useState<LogLine[]>([
    { id: -3, t: "00:00.012", dir: "→", msg: "hello", arg: "ACE Remote 1.2 · iPhone" },
    { id: -2, t: "00:00.041", dir: "←", msg: "pairing", arg: "approved on the computer" },
    { id: -1, t: "00:00.058", dir: "←", msg: "state", arg: `slide 1/${N} · live` },
  ]);
  const seq = useRef(0);
  const t0 = useRef(0);
  const touched = useRef(0);
  const inView = useRef(false);

  // The log's clock starts when the page does (the three hand-shake lines sit before it).
  useEffect(() => {
    t0.current = performance.now() - 60;
  }, []);

  const stamp = () => {
    if (!t0.current) t0.current = performance.now() - 60;
    const ms = performance.now() - t0.current;
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(Math.floor(ms % 1000)).padStart(3, "0")}`;
  };

  const push = useCallback((dir: LogLine["dir"], msg: string, arg?: string) => {
    const id = ++seq.current;
    setLog((l) => [...l.slice(-6), { id, t: stamp(), dir, msg, arg }]);
    if (!reduce && dir !== "·") setPackets((p) => [...p, { id, dir: dir === "→" ? "out" : "in", label: msg }]);
  }, [reduce]);

  // Current values for the handlers (state updaters must stay pure).
  const now = useRef({ slide: 0, cleared: false, lower: false });
  now.current = { slide, cleared, lower };

  const send = useCallback(
    (msg: "next" | "prev" | "clear" | "lower", byUser = false) => {
      if (byUser) touched.current = performance.now();
      const travel = reduce ? 0 : 420;
      const reply = (arg: string) => window.setTimeout(() => push("←", "state", arg), travel + (reduce ? 0 : 160));
      const { slide: s, cleared: c, lower: lo } = now.current;
      if (msg === "next" || msg === "prev") {
        // The demo loops the song on Next from the last slide.
        const n = msg === "next" ? (s === N - 1 ? 0 : s + 1) : Math.max(0, s - 1);
        push("→", msg);
        window.setTimeout(() => {
          setCleared(false);
          setSlide(n);
        }, travel);
        reply(`slide ${n + 1}/${N} · live`);
      } else if (msg === "clear") {
        push("→", c ? "restore" : "clear", c ? undefined : '{ layer: "slide" }');
        window.setTimeout(() => setCleared(!c), travel);
        reply(c ? "slide restored" : "slide cleared");
      } else {
        push("→", lo ? "hideLowerThird" : "triggerLowerThird", lo ? undefined : "Pastor James Carter");
        window.setTimeout(() => setLower(!lo), travel);
        reply(lo ? "lower third off" : "lower third on");
      }
    },
    [push, reduce],
  );

  // Autoplay while nobody's touching it and it's on screen.
  useEffect(() => {
    if (reduce) return;
    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    let k = 0;
    const id = window.setInterval(() => {
      if (!inView.current || document.hidden) return;
      if (performance.now() - touched.current < 12000) return;
      k++;
      send(k % 5 === 0 ? "lower" : "next");
    }, 2800);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, [reduce, send]);

  const cur = SLIDES[slide];

  return (
    <section ref={ref} className="relative isolate overflow-hidden px-5 pb-20 pt-16 sm:px-10 sm:pb-28 sm:pt-24">
      {/* Backdrop: a dot floor in perspective, a red glow, grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 [perspective:900px]">
        <div
          className="absolute -inset-x-1/2 bottom-[-30%] h-[90%] origin-bottom"
          style={{
            transform: "rotateX(62deg)",
            backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1.4px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(60% 70% at 50% 100%, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(60% 70% at 50% 100%, black, transparent 75%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(55% 45% at 50% 0%, rgba(200,16,46,0.34), transparent 70%), radial-gradient(40% 40% at 72% 70%, rgba(200,16,46,0.16), transparent 70%)" }}
        />
      </div>
      <Grain />

      <div className="mx-auto max-w-4xl text-center">
        <span className="ace-glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/80 sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] shadow-[0_0_10px_#22C55E]" />
          ACE Remote 1.2 · iPhone + Android
        </span>
        <h1 className="mt-6 text-[clamp(2.6rem,6.6vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.045em] text-white">
          <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">Your phone</span>
          <br />
          <span className="font-serif font-normal italic tracking-[-0.02em] text-[#FF4D5E]">runs</span> the room.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#B8B8BE] sm:text-lg">
          ACE Remote finds your Mac or PC on the venue&rsquo;s Wi-Fi. Every tap lands on the screen: slides,
          cues, lower thirds, songs and scripture, from anywhere in the room.
        </p>
        <StoreButtons className="mt-9 justify-center" />
      </div>

      {/* The link: computer ⟷ wire ⟷ phone */}
      <div className="relative mx-auto mt-16 grid max-w-[1100px] items-center gap-8 lg:grid-cols-[1fr_120px_270px] lg:gap-0">
        {/* Computer */}
        <div className="order-2 lg:order-1">
          <div className="ace-glass overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">ACE Presenter · Program</span>
              <span className="flex items-center gap-1.5 rounded-full bg-[#C8102E]/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#FF6B7A]">
                <span className="ace-sp-pulse h-1.5 w-1.5 rounded-full bg-[#FF3B4F]" /> Live
              </span>
            </div>
            <div className="p-4">
              <div
                className="relative aspect-video overflow-hidden rounded-xl border border-white/[0.07]"
                style={{ background: "radial-gradient(120% 90% at 50% 120%, rgba(200,16,46,0.28), transparent 60%), #050506" }}
              >
                <AnimatePresence mode="wait">
                  {!cleared && (
                    <motion.div
                      key={slide}
                      initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(6px)" }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-[clamp(1rem,2.3vw,1.6rem)] font-semibold leading-snug text-white"
                    >
                      {cur.text.map((l) => (
                        <span key={l}>{l}</span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {lower && (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.35 }}
                      className="absolute bottom-[9%] left-[5%] flex items-stretch overflow-hidden rounded-md shadow-lg"
                    >
                      <span className="w-1.5 bg-[#E8183A]" />
                      <span className="bg-black/80 px-3 py-1.5 text-left backdrop-blur">
                        <span className="block text-[13px] font-bold text-white">Pastor James Carter</span>
                        <span className="block text-[11px] text-white/65">Lead Pastor</span>
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                <span>
                  {SONG} · {cur.label} · {slide + 1}/{N}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" /> Remote · iPhone · approved
                </span>
              </div>
            </div>
          </div>

          {/* Wire log */}
          <div className="ace-glass mt-3 rounded-2xl px-4 py-3 font-mono text-[11px] leading-[1.75]" aria-live="off">
            <div className="mb-1 flex items-center justify-between text-[9.5px] uppercase tracking-[0.25em] text-white/35">
              <span>Wire log · local Wi-Fi</span>
              <span>found on the network · no IP to type</span>
            </div>
            <div className="h-[132px] overflow-hidden">
              {log.slice(-7).map((l) => (
                <div key={l.id} className="flex gap-3 whitespace-nowrap">
                  <span className="text-white/30">{l.t}</span>
                  <span className={l.dir === "→" ? "text-[#FF6B7A]" : "text-[#4ADE80]"}>{l.dir}</span>
                  <span className="text-white">{l.msg}</span>
                  {l.arg && <span className="truncate text-white/45">{l.arg}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wire */}
        <div aria-hidden className="relative order-1 hidden h-full lg:order-2 lg:block">
          <div className="absolute inset-x-0 top-[38%] h-px bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.25)_0_6px,transparent_6px_12px)]" />
          <span className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-[170%] font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">
            Wi-Fi
          </span>
          {packets.map((p) => (
            <motion.span
              key={p.id}
              initial={{ left: p.dir === "out" ? "100%" : "0%", opacity: 0 }}
              animate={{ left: p.dir === "out" ? "0%" : "100%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              onAnimationComplete={() => setPackets((ps) => ps.filter((x) => x.id !== p.id))}
              className={`absolute top-[38%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold ${
                p.dir === "out"
                  ? "bg-[#E8183A] text-white shadow-[0_0_18px_rgba(232,24,58,0.8)]"
                  : "bg-[#16A34A] text-white shadow-[0_0_18px_rgba(34,197,94,0.6)]"
              }`}
            >
              {p.label}
            </motion.span>
          ))}
        </div>

        {/* Phone */}
        <div className="order-1 mx-auto w-[250px] sm:w-[270px] lg:order-3">
          <PhoneFrame>
            <RemoteScreen
              slide={slide}
              cleared={cleared}
              lower={lower}
              onSend={(m) => send(m, true)}
            />
          </PhoneFrame>
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            Go on, press Next
          </p>
        </div>
      </div>
    </section>
  );
}

/** The 1.2 Remote screen, drawn so it can be pressed. */
function RemoteScreen({
  slide,
  cleared,
  lower,
  onSend,
}: {
  slide: number;
  cleared: boolean;
  lower: boolean;
  onSend: (m: "next" | "prev" | "clear" | "lower") => void;
}) {
  return (
    <div className="flex h-full flex-col bg-[#0B0B0D] px-[7%] pb-[6%] pt-[9%] text-white">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#FF4D3A]">Presenter</div>
          <div className="mt-0.5 text-[22px] font-bold leading-tight tracking-tight">Remote</div>
          <div className="mt-1 flex items-center gap-1.5 font-mono text-[8px] tracking-[0.15em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" /> ACE Presenter (Mac)
          </div>
        </div>
        <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-[11px] text-white/60">⏻</span>
      </div>

      <div className="mt-3 rounded-2xl border border-white/[0.08] bg-[#17171B] p-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[7.5px] uppercase tracking-[0.25em] text-white/40">Current cue</span>
          <span className={`flex items-center gap-1 rounded-full px-1.5 py-px font-mono text-[7px] uppercase tracking-[0.2em] ${cleared ? "bg-white/10 text-white/50" : "bg-[#FF3B30] text-white"}`}>
            <span className="h-1 w-1 rounded-full bg-white" /> {cleared ? "Clear" : "Live"}
          </span>
        </div>
        <div className="mt-1.5 text-[15px] font-bold">{SONG}</div>
        <div className="text-[10px] text-white/55">
          Slide {slide + 1} of {N}
        </div>
        <div className="mt-2 h-[3px] rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[#FF3B30] transition-all duration-300" style={{ width: `${((slide + 1) / N) * 100}%` }} />
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-4 gap-1.5">
        {SLIDES.map((s, i) => (
          <div
            key={s.label}
            className={`rounded-xl border px-1.5 py-1.5 ${i === slide ? "border-[#E8183A] bg-[#1C1C21]" : "border-white/[0.08]"}`}
          >
            <div className={`text-[7px] ${i === slide ? "text-[#FF4D3A]" : "text-white/40"}`}>{i + 1}</div>
            <div className={`truncate text-[8.5px] font-semibold ${i === slide ? "text-white" : "text-white/55"}`}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-2.5 rounded-2xl border border-white/[0.08] bg-[#121215] p-2">
        <div className="mb-1.5 flex items-center gap-1.5 px-1 text-[10px] font-semibold">
          <span className="text-[#FF4D3A]">=</span> Lower thirds
        </div>
        <button
          type="button"
          onClick={() => onSend("lower")}
          className={`flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-left transition ${lower ? "bg-[#C8102E]/25 ring-1 ring-[#E8183A]/60" : "bg-[#1C1C21] hover:bg-[#232329]"}`}
        >
          <span>
            <span className="block text-[10px] font-semibold">Pastor James Carter</span>
            <span className="block text-[8.5px] text-white/50">Lead Pastor</span>
          </span>
          <span className="text-[10px] text-white/50">{lower ? "■" : "▶"}</span>
        </button>
      </div>

      <div className="mt-auto flex gap-1.5 rounded-[18px] border border-white/[0.08] bg-[#121215] p-1.5">
        <button
          type="button"
          onClick={() => onSend("prev")}
          className="flex flex-1 flex-col items-center rounded-2xl bg-[#1C1C21] py-2 transition hover:bg-[#26262C] active:scale-95"
        >
          <span className="text-[13px]">◀◀</span>
          <span className="font-mono text-[7px] tracking-[0.25em] text-white/55">PREV</span>
        </button>
        <button
          type="button"
          aria-label={cleared ? "Show the slide again" : "Clear the slide"}
          onClick={() => onSend("clear")}
          className={`flex w-[22%] items-center justify-center rounded-2xl text-[12px] transition active:scale-95 ${cleared ? "bg-white/15 text-white" : "bg-[#1C1C21] text-white/55 hover:bg-[#26262C]"}`}
        >
          ⊘
        </button>
        <button
          type="button"
          onClick={() => onSend("next")}
          className="flex flex-[1.6] flex-col items-center rounded-2xl bg-gradient-to-b from-[#FF4D3A] to-[#C8102E] py-2 shadow-[0_8px_24px_-6px_rgba(232,24,58,0.8)] transition hover:brightness-110 active:scale-95"
        >
          <span className="text-[13px]">▶▶</span>
          <span className="font-mono text-[7px] tracking-[0.25em]">NEXT</span>
        </button>
      </div>
    </div>
  );
}

export function StoreButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={IOS_URL}
        target="_blank"
        rel="noopener"
        className="flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-black transition hover:bg-white/85"
      >
        <AppleMark />
        <span className="text-left leading-none">
          <span className="block text-[9px] font-medium uppercase tracking-[0.12em] text-black/60">Download on the</span>
          <span className="block text-[15px] font-semibold">App Store</span>
        </span>
      </a>
      <span
        onPointerMove={trackPointer}
        className="ace-glass flex items-center gap-2.5 rounded-full px-6 py-3 text-white/80"
        title="The Android app is a direct download from this site. The link goes up with the release."
      >
        <AndroidMark />
        <span className="text-left leading-none">
          <span className="block text-[9px] font-medium uppercase tracking-[0.12em] text-white/50">Android</span>
          <span className="block text-[15px] font-semibold">Download soon</span>
        </span>
      </span>
      <Link href="#remote" className="px-3 py-3 text-sm font-semibold text-white/70 transition hover:text-white">
        See every screen ↓
      </Link>
    </div>
  );
}

function AppleMark() {
  return (
    <svg width="18" height="20" viewBox="0 0 17 20" aria-hidden fill="currentColor">
      <path d="M14.1 10.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.9-3-.8C4.6 5.4 3.2 6.3 2.4 7.7.8 10.5 2 14.6 3.5 16.8c.8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.4-.9-2.4-3.6ZM11.9 3.9c.6-.8 1.1-1.8 1-2.9-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2.1-.5 2.7-1.3Z" />
    </svg>
  );
}

function AndroidMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M17.6 9.48 19.44 6.3a.38.38 0 0 0-.66-.38l-1.86 3.22a11.5 11.5 0 0 0-9.84 0L5.22 5.92a.38.38 0 0 0-.66.38L6.4 9.48A10.8 10.8 0 0 0 1 18h22a10.8 10.8 0 0 0-5.4-8.52ZM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
    </svg>
  );
}
