"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "motion/react";
import { trackPointer } from "./glass";
import { Grain } from "./SpatialHero";
import { useCalmMotion } from "./useFitScale";

/**
 * What's new in 3.0, as a bento of live mini-demos (2026's most-used
 * layout; each tile shows the feature working rather than describing it).
 *
 * Every claim is from docs/V3_RELEASE_FACTS.md (Mac repo):
 * - streaming: up to 4 destinations on Pro/Venue, Free one; a slow one goes
 *   red ("Can't keep up") and the others are untouched; 60 fps.
 * - 21 interface languages, 12 new; Igbo/Hausa/Swahili beta; machine
 *   translated (so never "professionally translated").
 * - Smarter Bible listening; Ask ACE slide layouts; room zones with tone
 *   (low cut, bass, middle, treble ±12 dB); PowerPoint every plan, Keynote
 *   and PDF on Pro; stays awake while listening (lid open, plugged in).
 * No accuracy numbers here, no platform names beyond the facts.
 * Tiles only animate while on screen.
 */

export default function WhatsNewBento() {
  return (
    <section id="new" className="relative isolate overflow-hidden border-t border-white/[0.06] px-6 py-28 sm:px-10 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(50% 40% at 50% 0%, rgba(200,16,46,0.14), transparent 70%)" }}
      />
      <Grain />
      <div className="mx-auto max-w-6xl">
        <div className="ace-sp-reveal max-w-3xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#FF4D5E]">New in 3.0</span>
          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.9rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
            Built for the <span className="font-serif font-normal italic text-[#FF4D5E]">whole</span> service.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#B8B8BE] sm:text-lg">
            Streaming, scripture, languages, rooms and slides. The parts of Sunday that used to need another person.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="md:col-span-2" eyebrow="Streaming" title="Go live in four places at once." body="One stream, up to four destinations on Pro and Venue. If one can't keep up, it goes red on its own. The others carry on.">
            <StreamDemo />
          </Card>
          <Card eyebrow="Languages" title="21 languages." body="The app and its Help, with 12 new in 3.0. Each one listed in its own name.">
            <LanguageDemo />
          </Card>
          <Card eyebrow="Scripture" title="Say the verse. It's up." body="ACE hears the reference in the sermon and puts the passage on screen.">
            <BibleDemo />
          </Card>
          <Card className="md:col-span-2" eyebrow="Ask ACE" title="Describe the slide. Pick a layout." body="Ask ACE drafts slides from a sentence. Trying another layout doesn't use up a draft.">
            <AskDemo />
          </Card>
          <Card eyebrow="Room zones" title="Every room, its own sound." body="Low cut, bass, middle and treble for each zone, saved with the venue.">
            <ZonesDemo />
          </Card>
          <Card eyebrow="Presentations" title="Bring your own decks." body="PowerPoint on every plan. Keynote and PDF too, on Pro.">
            <DecksDemo />
          </Card>
          <Card eyebrow="Stays awake" title="Nobody at the desk? Still on." body="ACE keeps the computer and screens awake while it's listening. Keep a laptop plugged in, lid open.">
            <AwakeDemo />
          </Card>
        </div>
        <p className="mt-6 text-[11px] text-[#5F5F67]">Some features depend on your plan or your computer. Igbo, Hausa and Swahili are in beta.</p>
      </div>
    </section>
  );
}

function Card({
  eyebrow,
  title,
  body,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article onPointerMove={trackPointer} className={`ace-card ace-sp-reveal flex flex-col p-6 sm:p-7 ${className}`}>
      <div className="relative min-h-[170px] flex-1">{children}</div>
      <div className="mt-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4D5E]">{eyebrow}</span>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.01em] text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#9A9AA2]">{body}</p>
      </div>
    </article>
  );
}

/** A ticking clock that only runs while the tile is on screen. */
function useTick(ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useCalmMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setN((v) => v + 1), reduce ? ms * 2 : ms);
    return () => clearInterval(t);
  }, [inView, ms, reduce]);
  return { ref, n, reduce };
}

/* ─── Streaming: four lanes, one hiccups and recovers alone ─── */
const DESTS = [
  { name: "YouTube", kind: "RTMPS" },
  { name: "Facebook", kind: "RTMPS" },
  { name: "Church website", kind: "RTMP" },
  { name: "Backup", kind: "RTMP" },
];
function StreamDemo() {
  const { ref, n, reduce } = useTick(260);
  const phase = n % 46;
  const bad = phase > 22 && phase < 34; // lane 3 can't keep up for a moment
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-2.5">
      <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B4F] shadow-[0_0_8px_#FF3B4F]" /> Live · 1080p60
        </span>
        <span>4 / 4</span>
      </div>
      {DESTS.map((d, i) => {
        const red = bad && i === 2;
        return (
          <div
            key={d.name}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2 transition-colors duration-300 ${
              red ? "border-[#FF3B4F]/50 bg-[#FF3B4F]/[0.08]" : "border-white/[0.06] bg-white/[0.02]"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${red ? "bg-[#FF3B4F]" : "bg-[#22C55E]"}`} />
            <span className="w-32 truncate text-[13px] text-white/85">{d.name}</span>
            <span className="hidden font-mono text-[10px] text-white/30 sm:inline">{d.kind}</span>
            <span className="flex h-5 flex-1 items-end gap-[2px] overflow-hidden">
              {Array.from({ length: 28 }).map((_, k) => {
                const v = red && k > 18 ? 0.12 : 0.45 + 0.4 * Math.abs(Math.sin((n + k) * 0.7 + i * 1.3));
                return (
                  <span
                    key={k}
                    className={`w-full rounded-sm ${red && k > 18 ? "bg-[#FF3B4F]/70" : "bg-white/25"}`}
                    style={{ height: `${(reduce ? 0.6 : v) * 100}%` }}
                  />
                );
              })}
            </span>
            <span className={`w-28 text-right font-mono text-[10px] ${red ? "text-[#FF6B7A]" : "text-white/40"}`}>
              {red ? "Can't keep up" : "On time"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Languages: native names roll by ─── */
const LANGS = [
  "Yorùbá", "日本語", "Igbo", "Hausa", "Kiswahili", "Bahasa Indonesia", "Filipino", "繁體中文",
  "Română", "Українська", "Italiano", "Nederlands", "Español", "Français", "Deutsch", "Português",
  "한국어", "简体中文", "Русский", "العربية", "English",
];
function LanguageDemo() {
  const { ref, n } = useTick(1100);
  const i = n % LANGS.length;
  return (
    <div ref={ref} className="flex h-full flex-col items-start justify-center">
      <div className="font-mono text-[64px] font-bold leading-none tracking-[-0.04em] text-white">
        21
      </div>
      <div className="mt-4 h-[4.6rem] w-full overflow-hidden" aria-hidden>
        <span key={n} className="ace-sp-word block truncate text-[28px] font-semibold leading-tight text-[#FF4D5E]">
          {LANGS[i]}
        </span>
        <span className="block truncate text-lg leading-tight text-white/20">{LANGS[(i + 1) % LANGS.length]}</span>
      </div>
    </div>
  );
}

/* ─── Scripture: a spoken reference becomes a passage ─── */
const SAID = "…so turn with me to Matthew five, verses three to twelve.";
function BibleDemo() {
  const { ref, n } = useTick(90);
  const len = SAID.length;
  const t = n % (len + 40);
  const typed = SAID.slice(0, Math.min(t, len));
  const found = t > len + 2;
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-4">
      <p className="min-h-[3.2em] font-mono text-[13px] leading-relaxed text-white/55">
        {typed}
        {!found && <span className="ace-sp-caret text-[#FF4D5E]">▍</span>}
      </p>
      <div
        className={`rounded-xl border border-[#FF3B4F]/40 bg-[#FF3B4F]/[0.07] px-4 py-3 transition-all duration-500 ${
          found ? "translate-y-0 opacity-100" : "translate-y-1 opacity-[0.12]"
        }`}
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF8A96]">
          <span>Heard</span>
          <span>On screen</span>
        </div>
        <div className="mt-1 text-lg font-semibold text-white">Matthew 5:3–12</div>
        <div className="text-[12px] text-white/45">Blessed are the poor in spirit…</div>
      </div>
    </div>
  );
}

/* ─── Ask ACE: prompt types, three layouts appear ─── */
const ASK = "A welcome slide for Sunday with the sermon title";
const LAYOUTS = ["Title", "Title + photo", "Split"];
function AskDemo() {
  const { ref, n } = useTick(70);
  const t = n % (ASK.length + 70);
  const typed = ASK.slice(0, Math.min(t, ASK.length));
  const shown = Math.max(0, Math.min(3, Math.floor((t - ASK.length - 4) / 6)));
  const pick = t > ASK.length + 40 ? 1 : -1;
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-4">
      <div className="ace-glass flex items-center gap-3 rounded-2xl px-4 py-3">
        <Sparkle />
        <span className="flex-1 truncate text-[14px] text-white/85">
          {typed}
          {t < ASK.length && <span className="ace-sp-caret text-[#FF4D5E]">▍</span>}
        </span>
        <span className="rounded-lg bg-white/10 px-2 py-1 font-mono text-[10px] text-white/50">↵</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {LAYOUTS.map((l, i) => (
          <div
            key={l}
            className={`transition-all duration-500 ${i < shown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-[0.12]"}`}
          >
            <div
              className={`relative aspect-video overflow-hidden rounded-lg border bg-[#0B0B0E] ${
                pick === i ? "border-[#FF3B4F] shadow-[0_0_24px_-6px_#FF3B4F]" : "border-white/10"
              }`}
            >
              <SlideThumb kind={i} />
            </div>
            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function SlideThumb({ kind }: { kind: number }) {
  if (kind === 0)
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[radial-gradient(80%_80%_at_50%_100%,rgba(200,16,46,0.35),transparent)]">
        <span className="text-[9px] font-bold text-white">WELCOME</span>
        <span className="h-[3px] w-10 rounded bg-white/30" />
      </div>
    );
  if (kind === 1)
    return (
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-gradient-to-br from-[#3a2a1a] to-[#1a1310]" />
        <div className="flex flex-1 flex-col justify-center gap-1 px-2">
          <span className="text-[8px] font-bold text-white">Welcome</span>
          <span className="h-[2px] w-8 rounded bg-white/30" />
          <span className="h-[2px] w-6 rounded bg-white/20" />
        </div>
      </div>
    );
  return (
    <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1.5">
      <div className="flex flex-col justify-end rounded bg-white/[0.06] p-1">
        <span className="text-[7px] font-bold text-white">Sunday</span>
      </div>
      <div className="rounded bg-[#C8102E]/40" />
    </div>
  );
}
function Sparkle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF4D5E" aria-hidden>
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" opacity=".6" />
    </svg>
  );
}

/* ─── Room zones: one tone curve per room ─── */
const ZONES = [
  { name: "Main hall", g: [-2, 3, 0, 2] },
  { name: "Overflow", g: [-8, 6, 2, -3] },
  { name: "Lobby", g: [-12, -4, 5, 4] },
];
function ZonesDemo() {
  const { ref, n } = useTick(1600);
  const z = ZONES[n % ZONES.length];
  // low cut, bass shelf, middle bell, treble shelf → a smooth path
  const pts = [0, 0.18, 0.5, 0.85, 1].map((x, i) => {
    const g = i === 0 ? z.g[0] : z.g[Math.min(3, i - 1)];
    return [x * 280, 60 - g * 3.4];
  });
  const d = `M${pts[0][0]},${pts[0][1]} ` + pts.slice(1).map((p, i) => {
    const prev = pts[i];
    const cx = (prev[0] + p[0]) / 2;
    return `C${cx},${prev[1]} ${cx},${p[1]} ${p[0]},${p[1]}`;
  }).join(" ");
  return (
    <div ref={ref} className="flex h-full flex-col justify-center">
      <div className="flex gap-1.5">
        {ZONES.map((zz) => (
          <span
            key={zz.name}
            className={`rounded-full px-3 py-1 text-[11px] transition ${
              zz === z ? "bg-[#E8183A] text-white" : "bg-white/[0.06] text-white/50"
            }`}
          >
            {zz.name}
          </span>
        ))}
      </div>
      <svg viewBox="0 -10 280 140" className="mt-4 w-full" aria-hidden>
        {[0, 30, 60, 90, 120].map((y) => (
          <line key={y} x1="0" x2="280" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
        ))}
        <line x1="0" x2="280" y1="60" y2="60" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 4" />
        <path d={`${d} L280,130 L0,130 Z`} fill="url(#zfill)" style={{ transition: "d 700ms cubic-bezier(0.16,1,0.3,1)" }} />
        <path d={d} fill="none" stroke="#FF3B4F" strokeWidth="2.5" style={{ transition: "d 700ms cubic-bezier(0.16,1,0.3,1)" }} />
        <defs>
          <linearGradient id="zfill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="rgba(255,59,79,0.35)" />
            <stop offset="1" stopColor="rgba(255,59,79,0)" />
          </linearGradient>
        </defs>
        {["Low", "Bass", "Mid", "Treble"].map((l, i) => (
          <text key={l} x={20 + i * 76} y="128" className="fill-white/30 font-mono" fontSize="9">
            {l}
          </text>
        ))}
      </svg>
    </div>
  );
}

/* ─── Decks: files drop into one deck strip ─── */
const FILES = [
  { ext: "PPTX", color: "#D35230" },
  { ext: "KEY", color: "#2F7CF6" },
  { ext: "PDF", color: "#E5252A" },
];
function DecksDemo() {
  const { ref, n } = useTick(1200);
  const k = n % 4;
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-5">
      <div className="flex justify-center gap-3">
        {FILES.map((f, i) => (
          <div
            key={f.ext}
            className={`flex h-16 w-12 flex-col justify-end rounded-md border border-white/10 bg-white/[0.04] p-1.5 transition-all duration-700 ${
              i < k ? "translate-y-8 scale-75 opacity-0" : ""
            }`}
          >
            <span className="rounded px-1 text-center font-mono text-[8px] font-bold text-white" style={{ background: f.color }}>
              {f.ext}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 rounded-xl border border-white/[0.07] bg-black/30 p-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`aspect-video flex-1 rounded-sm transition-all duration-500 ${
              i < k * 2 ? "bg-gradient-to-br from-white/25 to-white/5" : "bg-white/[0.04]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Stays awake: listening keeps the screen on ─── */
function AwakeDemo() {
  const { ref, n } = useTick(1000);
  const s = 754 + n;
  return (
    <div ref={ref} className="flex h-full items-center justify-center">
      <div className="relative">
        <div className="flex h-28 w-44 flex-col items-center justify-center rounded-xl border border-white/10 bg-[#0B0B0E] shadow-[0_0_60px_-20px_rgba(255,59,79,0.6)]">
          <span className="font-mono text-2xl tabular-nums text-white">
            {String(Math.floor(s / 60)).padStart(2, "0")}:{String(s % 60).padStart(2, "0")}
          </span>
          <span className="mt-2 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-[#22C55E]">
            <span className="ace-sp-pulse h-1.5 w-1.5 rounded-full bg-[#22C55E]" /> Listening
          </span>
        </div>
        <div className="mx-auto h-3 w-20 rounded-b-lg bg-white/[0.06]" />
      </div>
    </div>
  );
}
