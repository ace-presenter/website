"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CUES,
  SAMPLE_SCRIPT,
  SERVICE_NAME,
  SUGGESTIONS,
  detect,
  type Cue,
  type CueKind,
  type Position,
} from "@/lib/demo-service";

/**
 * LiveDemo — a working slice of the ACE Presenter console.
 *
 * Visitors "speak" by typing (or tapping a suggestion, or running the sample
 * service); the line lands in the live transcript, the matcher in
 * lib/demo-service stands in for the on-device listener, and the cue goes
 * live exactly the way the app does it — stage canvas, NEXT bar, verse chips
 * and the program monitor all cut together.
 *
 * Colours are the app's own (deeper crimson than the marketing brand red), so
 * it reads as the product, not as a site module.
 */

const APP = {
  red: "#c4002f",
  redDeep: "#b2002a",
  redText: "#e0324f",
  liveRow: "#2a0c13",
  green: "#3ddc84",
  greenBg: "#0f2a18",
  greenLine: "#1f7a3a",
  blue: "#5b7cfa",
};

type Mode = "AUTO" | "SONG" | "BIBLE";
type Tone = "hit" | "miss" | "cmd";
type Line = { id: number; text: string; full: string; result?: string; tone?: Tone };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function sectionName(label: string) {
  return label.charAt(0) + label.slice(1).toLowerCase();
}

function chipColor(label: string) {
  if (label.startsWith("CHORUS")) return "#4ade80";
  const n = Number(label.match(/VERSE (\d+)/)?.[1]);
  if (n && n % 2 === 0) return APP.blue;
  return APP.redText;
}

export default function LiveDemo() {
  const reduce = useReducedMotion();
  const [listening, setListening] = useState(false);
  const [mode, setMode] = useState<Mode>("AUTO");
  const [live, setLive] = useState<Position>({ cue: 0, slide: 0 });
  const [black, setBlack] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [playing, setPlaying] = useState(false);
  const [draft, setDraft] = useState("");
  const [flash, setFlash] = useState<{ key: number; said: string; to: string } | null>(null);

  const liveRef = useRef(live);
  const modeRef = useRef(mode);
  const runRef = useRef(0); // bumping this cancels whatever is typing
  const idRef = useRef(0);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => void (liveRef.current = live), [live]);
  useEffect(() => void (modeRef.current = mode), [mode]);

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 2600);
    return () => clearTimeout(t);
  }, [flash]);

  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const goLive = useCallback((to: Position) => {
    liveRef.current = to;
    setLive(to);
    setBlack(false);
  }, []);

  /** Run one utterance through the "listener": transcribe, detect, cut. */
  const hear = useCallback(
    async (text: string, run: number, pace: number) => {
      setListening(true);
      const id = ++idRef.current;
      setLines((ls) => [...ls.slice(-7), { id, text: "", full: text }]);

      if (!reduce) {
        const step = Math.max(1, Math.ceil(text.length / 40));
        for (let i = step; i < text.length; i += step) {
          if (runRef.current !== run) return;
          setLines((ls) => ls.map((l) => (l.id === id ? { ...l, text: text.slice(0, i) } : l)));
          await sleep(pace);
        }
      }
      if (runRef.current !== run) return;

      const d = detect(text, liveRef.current);
      const m = modeRef.current;
      let result: string;
      let tone: Tone = "hit";

      if (d.type === "song" || d.type === "scripture") {
        if ((m === "SONG" && d.type === "scripture") || (m === "BIBLE" && d.type === "song")) {
          result = `${m} mode — ${d.type === "song" ? "lyrics" : "scripture"} ignored`;
          tone = "miss";
        } else {
          const cue = CUES[d.to.cue];
          const slide = cue.slides[d.to.slide];
          const where = cue.kind === "book" ? slide.label.replace(/^[A-Z]+/, (b) => sectionName(b)) : `${cue.title} · ${sectionName(slide.label)}`;
          result = `→ ${where}`;
          goLive(d.to);
          setFlash({ key: id, said: text, to: where });
        }
      } else if (d.type === "command") {
        tone = "cmd";
        const cur = liveRef.current;
        if (d.command === "blank") {
          setBlack((b) => !b);
          result = "Operator command · blank";
        } else {
          const dir = d.command === "next" ? 1 : -1;
          const cue = CUES[cur.cue];
          let to: Position = { cue: cur.cue, slide: cur.slide + dir };
          if (to.slide >= cue.slides.length) to = { cue: Math.min(CUES.length - 1, cur.cue + 1), slide: 0 };
          if (to.slide < 0) {
            const pc = Math.max(0, cur.cue - 1);
            to = { cue: pc, slide: cur.cue === 0 ? 0 : CUES[pc].slides.length - 1 };
          }
          goLive(to);
          result = `Operator command · ${d.command}`;
        }
      } else if (d.type === "missing-scripture") {
        tone = "miss";
        result = `${d.ref} — the app pulls this from your Bible; this demo only carries a few passages`;
      } else {
        tone = "miss";
        result = "No cue — still listening";
      }

      setLines((ls) => ls.map((l) => (l.id === id ? { ...l, text, result, tone } : l)));
    },
    [goLive, reduce],
  );

  const say = useCallback(
    (text: string) => {
      const t = text.trim();
      if (!t) return;
      const run = ++runRef.current;
      setPlaying(false);
      void hear(t, run, 14);
    },
    [hear],
  );

  const playSample = useCallback(async () => {
    const run = ++runRef.current;
    setPlaying(true);
    setLines([]);
    goLive({ cue: 0, slide: 0 });
    for (const line of SAMPLE_SCRIPT) {
      if (runRef.current !== run) return;
      await hear(line, run, 34);
      await sleep(reduce ? 1400 : 1700);
    }
    if (runRef.current === run) setPlaying(false);
  }, [goLive, hear, reduce]);

  const stop = useCallback(() => {
    runRef.current++;
    setPlaying(false);
    setListening(false);
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    say(draft);
    setDraft("");
  };

  const cue = CUES[live.cue];
  const slide = cue.slides[live.slide];
  const nextSlide =
    cue.slides[live.slide + 1] ?? (CUES[live.cue + 1] ? CUES[live.cue + 1].slides[0] : undefined);
  const nextCueTitle = cue.slides[live.slide + 1] ? cue.title : CUES[live.cue + 1]?.title;
  const slideKey = `${live.cue}-${live.slide}`;

  return (
    <div>
      {/* ── Console ── */}
      <div
        className="relative overflow-hidden rounded-[14px] bg-[#080808] text-[#f2f2f2] shadow-[0_0_0_1px_#2c2c2c,0_40px_120px_-30px_rgba(0,0,0,0.8)]"
        aria-label="Interactive ACE Presenter demo"
        role="region"
      >
        {/* title bar */}
        <div className="flex h-8 items-center gap-2 bg-[#1b1b1b] px-3">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="h-3 w-3 rounded-full" style={{ background: c }} aria-hidden />
          ))}
          <span className="ml-3 text-sm font-semibold text-[#e8e8e8]">ACE</span>
        </div>

        {/* status header */}
        <div className="flex h-9 items-center gap-2 border-b border-[#4a1520] bg-[#080708] px-3">
          <span className="h-2 w-2 rounded-full" style={{ background: APP.red }} aria-hidden />
          <span className="text-[15px] font-bold tracking-tight text-white">ace</span>
          <span className="rounded-full bg-[#34c759] px-1.5 font-mono text-[9px] font-bold leading-[15px] tracking-[0.18em] text-[#062b12]">
            VENUE
          </span>
          <span className="hidden flex-1 text-center font-mono text-[12px] text-[#d0d0d0] sm:block">
            {SERVICE_NAME}
          </span>
          <span className="flex-1 sm:hidden" />
          <span className="hidden rounded-full border border-[#222] px-1.5 font-mono text-[8.5px] leading-4 tracking-[0.1em] text-[#5a5a5a] md:inline">
            ● NDI
          </span>
          <span
            className="rounded-full border px-1.5 font-mono text-[8.5px] leading-4 tracking-[0.1em] transition-colors"
            style={
              listening
                ? { borderColor: APP.greenLine, color: APP.green }
                : { borderColor: "#222", color: "#5a5a5a" }
            }
          >
            {listening ? (
              <span className="inline-flex items-center gap-1">
                <Bars on={!reduce} /> LISTENING
              </span>
            ) : (
              "⋈ IDLE"
            )}
          </span>
        </div>

        {/* mode bar */}
        <div className="flex h-11 items-center gap-3 overflow-x-auto border-b border-[#1f1f1f] bg-[#0b0b0b] px-3 [scrollbar-width:none]">
          <button
            type="button"
            onClick={() => (listening ? stop() : setListening(true))}
            className="h-[26px] shrink-0 rounded px-3 font-mono text-[11px] font-bold tracking-[0.16em] text-white transition hover:brightness-125"
            style={{ background: APP.red }}
            aria-pressed={listening}
          >
            {listening ? "■ STOP" : "START"}
          </button>
          <div className="flex shrink-0 rounded-[5px] border border-[#2a2a2a] bg-[#171717] p-px" role="radiogroup" aria-label="Detection mode">
            {(["AUTO", "SONG", "BIBLE"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mode === m}
                onClick={() => setMode(m)}
                className="h-6 w-14 rounded font-mono text-[11px] tracking-[0.18em] transition-colors"
                style={mode === m ? { background: APP.redDeep, color: "#fff" } : { color: "#6a6a6a" }}
              >
                {m}
              </button>
            ))}
          </div>
          <span
            className="hidden h-7 shrink-0 items-center rounded-[5px] border px-3 font-mono text-[11px] tracking-[0.18em] sm:inline-flex"
            style={
              listening
                ? { borderColor: APP.greenLine, color: APP.green }
                : { borderColor: "#2a2a2a", color: "#5a5a5a" }
            }
          >
            ● LIVE
          </span>
          <span className="hidden h-6 w-px shrink-0 bg-[#2c2c2c] lg:block" aria-hidden />
          <div className="hidden shrink-0 rounded-[5px] border border-[#2a2a2a] bg-[#171717] lg:flex" aria-hidden>
            {["STAGE", "SONG", "EDIT", "BIBLE", "LOOKS", "CUE PLAN"].map((t) => (
              <span
                key={t}
                className="relative px-3 font-mono text-[11px] leading-7 tracking-[0.18em]"
                style={{ color: t === "STAGE" ? "#fff" : "#6a6a6a" }}
              >
                {t}
                {t === "STAGE" && (
                  <span className="absolute inset-x-3 bottom-0 h-0.5" style={{ background: APP.red }} />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* body */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[230px_1fr_300px]">
          {/* cue rail */}
          <div className="hidden border-r border-[#1f1f1f] lg:block">
            <div className="flex items-center justify-between border-b border-[#1f1f1f] px-3.5 py-2.5">
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#d6d6d6]">⌄ ALL CUES</span>
              <span className="font-mono text-[10px] text-[#5f5f5f]">{CUES.length}</span>
            </div>
            <ul className="py-1">
              {CUES.map((c, i) => {
                const isLive = i === live.cue;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => goLive({ cue: i, slide: 0 })}
                      className="relative flex h-8 w-full items-center gap-2 pl-4 pr-2.5 text-left transition-colors hover:bg-[#121212]"
                      style={isLive ? { background: APP.liveRow } : undefined}
                      aria-current={isLive ? "true" : undefined}
                    >
                      {isLive && <span className="absolute inset-y-0 left-0 w-[3px]" style={{ background: APP.red }} />}
                      <span className="font-mono text-[10px] text-[#4d4d4d]">{String(i + 1).padStart(2, "0")}</span>
                      <CueIcon kind={c.kind} />
                      <span className="flex-1 truncate text-[13px] text-[#eee]">{c.title}</span>
                      {isLive ? (
                        <span className="rounded-[3px] px-1 font-mono text-[8.5px] font-bold leading-[15px] tracking-[0.1em] text-white" style={{ background: APP.red }}>
                          LIVE
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-[#5f5f5f]">{c.slides.length}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* stage */}
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-2 border-b border-[#1f1f1f] px-3.5 py-2.5">
              <CueIcon kind={cue.kind} />
              <span className="truncate font-mono text-[12px] font-semibold tracking-[0.18em] text-white">
                {cue.title.toUpperCase()}
                {slide.label !== cue.title.toUpperCase() && (
                  <span className="font-normal text-[#8a8a8a]"> · {slide.label}</span>
                )}
              </span>
              <span className="ml-auto shrink-0 font-mono text-[11px] tracking-[0.1em] text-[#9a9a9a]">
                {live.slide + 1} / {cue.slides.length}
              </span>
            </div>

            <div className="relative aspect-video overflow-hidden bg-black">
              <AnimatePresence initial={false}>
                <motion.div
                  key={slideKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.18, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center px-[7%] text-center"
                >
                  <div className="mb-2 font-mono text-[10px] tracking-[0.32em] sm:text-xs" style={{ color: APP.redText }}>
                    {slide.label}
                  </div>
                  <StageText cue={cue} lines={slide.lines} />
                </motion.div>
              </AnimatePresence>

              {/* detection toast — the "DETECTED" card from the site hero, made real */}
              <AnimatePresence>
                {flash && (
                  <motion.div
                    key={flash.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute bottom-3 left-3 hidden max-w-[85%] rounded-xl sm:block border border-[#2a2a2a] bg-[#141213]/95 px-3 py-2 text-left backdrop-blur"
                  >
                    <div className="font-mono text-[9px] tracking-[0.2em] text-[#8a8a8a]">DETECTED</div>
                    <div className="truncate text-[13px] font-semibold text-white">&ldquo;{flash.said}&rdquo;</div>
                    <div className="font-mono text-[10.5px]" style={{ color: APP.redText }}>
                      → {flash.to} · on screen
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 border-y border-[#1f1f1f] px-3 py-2">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#6a6a6a]">NEXT</span>
              <span className="min-w-0 flex-1 truncate text-[13px] text-[#e0e0e0]">
                {nextSlide ? nextSlide.lines.join(" ") : "End of service"}
              </span>
              {nextCueTitle && (
                <span className="hidden shrink-0 font-mono text-[10px] tracking-[0.18em] sm:inline" style={{ color: APP.redText }}>
                  {nextCueTitle.toUpperCase()}
                </span>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto p-2.5 [scrollbar-width:thin]">
              {cue.slides.map((s, i) => {
                const col = cue.kind === "book" ? APP.redText : chipColor(s.label);
                const on = i === live.slide;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goLive({ cue: live.cue, slide: i })}
                    className="h-[72px] w-[140px] shrink-0 rounded border-l-[3px] p-2 text-left transition-colors hover:bg-[#1b1b1b]"
                    style={{
                      borderLeftColor: col,
                      background: on ? "#1c0a0e" : "#151515",
                      boxShadow: on ? "inset 0 0 0 1px #5a1420" : undefined,
                    }}
                    aria-label={`Go live: ${cue.title}, ${s.label}`}
                  >
                    <div className="font-mono text-[9px] tracking-[0.2em]" style={{ color: col }}>
                      {s.label}
                    </div>
                    <div className="mt-1 line-clamp-2 text-[11.5px] leading-tight text-[#e8e8e8]">{s.lines.join(" ")}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* right: program + transcript */}
          <div className="flex min-w-0 flex-col border-t border-[#1f1f1f] md:border-l md:border-t-0">
            <div className="hidden items-center gap-1.5 border-b border-[#1f1f1f] px-3 py-2 md:flex">
              <span className="mr-auto font-mono text-[11px] tracking-[0.2em] text-[#8a8a8a]">OUTPUT</span>
              <button
                type="button"
                onClick={() => setBlack((b) => !b)}
                className="h-6 rounded-[5px] border px-2.5 font-mono text-[10.5px] font-semibold tracking-[0.18em] transition-colors"
                style={black ? { borderColor: "#fff", color: "#fff", background: "#222" } : { borderColor: "#2a2a2a", color: "#f2f2f2", background: "#0c0c0c" }}
                aria-pressed={black}
              >
                BLACK
              </button>
              <span className="h-6 rounded-[5px] border px-2.5 font-mono text-[10.5px] font-semibold leading-[22px] tracking-[0.18em]" style={{ borderColor: APP.greenLine, color: APP.green, background: APP.greenBg }}>
                LIVE
              </span>
            </div>

            <div className="hidden px-3 pt-3 md:block">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#cfcfcf]">PROGRAM</span>
                <span className="font-mono text-[10px] tracking-[0.16em]" style={{ color: APP.redText }}>
                  ● LIVE
                </span>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-[3px] border border-[#5a0f1c] bg-black">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={black ? "black" : slideKey}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.18, delay: reduce ? 0 : 0.08 }}
                    className="absolute inset-0"
                  >
                    {!black && <ProgramFrame cue={cue} lines={slide.lines} label={slide.label} />}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-1.5 truncate font-mono text-[9.5px] text-[#8a8a8a]">
                {black ? "Black" : cue.title}
              </div>
            </div>

            <div className="mt-2 flex items-center gap-4 border-b border-[#1f1f1f] px-3 md:mt-3">
              <span className="relative py-2 font-mono text-[10.5px] font-semibold tracking-[0.14em] text-white">
                TRANSCRIPT
                <span className="absolute inset-x-0 bottom-0 h-0.5" style={{ background: APP.red }} />
              </span>
              <span className="py-2 font-mono text-[10.5px] tracking-[0.14em] text-[#7a7a7a]">NOTES</span>
            </div>
            <div className="px-3 pt-2.5 font-mono text-[10.5px] tracking-[0.16em]" style={{ color: listening ? "#bdbdbd" : "#7a7a7a" }}>
              {listening ? (
                <>
                  <span style={{ color: APP.green }}>●</span> LIVE TRANSCRIPT
                </>
              ) : (
                "● TRANSCRIPT IDLE"
              )}
            </div>
            <div
              ref={transcriptRef}
              className="h-44 overflow-y-auto px-3 pb-3 pt-2 md:h-auto md:min-h-40 md:flex-1 md:basis-0"
              aria-live="polite"
            >
              {lines.length === 0 ? (
                <p className="text-[13px] text-[#4f4f4f]">
                  {listening ? "Listening… say something below." : "Start detection to see live transcription"}
                </p>
              ) : (
                <ul className="space-y-2.5">
                  {lines.map((l) => (
                    <li key={l.id}>
                      <p className="text-[13px] leading-snug text-[#dcdcdc]">
                        {l.text}
                        {l.text.length < l.full.length && <span className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 animate-pulse bg-[#9a9a9a]" />}
                      </p>
                      {l.result && (
                        <p
                          className="mt-0.5 font-mono text-[10px] leading-snug tracking-[0.04em]"
                          style={{ color: l.tone === "hit" ? APP.redText : l.tone === "cmd" ? APP.blue : "#6a6a6a" }}
                        >
                          {l.result}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* "the room" — the input */}
        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-[#1f1f1f] bg-[#0b0b0b] p-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[#2a2a2a]" style={{ color: listening ? APP.green : "#6a6a6a" }} aria-hidden>
            <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="5.5" y="1.5" width="5" height="8" rx="2.5" />
              <path d="M3 8a5 5 0 0 0 10 0M8 13v2" />
            </svg>
          </span>
          <label htmlFor="demo-say" className="sr-only">
            Say something to the room
          </label>
          <input
            id="demo-say"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Say something to the room — a lyric, a verse, “next slide”…"
            autoComplete="off"
            className="h-9 min-w-0 flex-1 rounded-md border border-[#2a2a2a] bg-[#181818] px-3 text-[14px] text-white placeholder:text-[#5f5f5f] focus:border-[#5a1420] focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-[#c4002f]"
          />
          <button
            type="submit"
            className="h-9 shrink-0 rounded-md px-4 font-mono text-[11px] font-bold tracking-[0.16em] text-white transition hover:brightness-125 disabled:opacity-40"
            style={{ background: APP.red }}
            disabled={!draft.trim()}
          >
            SAY
          </button>
        </form>
      </div>

      {/* ── Prompts ── */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => (playing ? stop() : void playSample())}
          className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-black transition hover:bg-[#e8e8e8]"
        >
          {playing ? "■ Stop sample" : "▶ Play a sample service"}
        </button>
        <span className="mx-1 hidden h-5 w-px bg-white/10 sm:block" aria-hidden />
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => say(s)}
            className="h-9 rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-[13px] text-[#C4C4C4] transition hover:border-white/25 hover:text-white"
          >
            &ldquo;{s}&rdquo;
          </button>
        ))}
      </div>
      <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#666]">
        This demo reads text in your browser · the app hears the room, on-device by default, in dozens of languages
      </p>
    </div>
  );
}

/* ───────────── pieces ───────────── */

function StageText({ cue, lines }: { cue: Cue; lines: string[] }) {
  const text = lines.join(" ");
  const scripture = cue.kind === "book";
  const size = scripture
    ? text.length > 110
      ? "text-[13px] sm:text-lg lg:text-xl"
      : "text-sm sm:text-xl lg:text-2xl"
    : "text-lg sm:text-[26px] lg:text-[30px]";
  return (
    <div className={`font-bold leading-[1.2] tracking-[-0.01em] text-white ${size}`}>
      {lines.map((l) => (
        <div key={l}>{l}</div>
      ))}
    </div>
  );
}

/** The audience output: songs on Default Dark, scripture on Bold Red, left-aligned with the reference. */
function ProgramFrame({ cue, lines, label }: { cue: Cue; lines: string[]; label: string }) {
  if (cue.kind === "book") {
    const ref = label.replace(/^[A-Z]+/, (b) => sectionName(b));
    return (
      <div className="flex h-full flex-col justify-center px-[7%]" style={{ background: APP.redDeep }}>
        <div className="text-[11px] font-medium text-[#ffd0d8]">{ref}</div>
        <div className={`mt-1 font-semibold leading-snug text-white ${lines.join(" ").length > 110 ? "text-[10.5px]" : "text-[12.5px]"}`}>
          {lines.join(" ")}
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col items-center justify-center px-[6%] text-center text-[13px] leading-snug text-white">
      {lines.map((l) => (
        <div key={l}>{l}</div>
      ))}
    </div>
  );
}

function CueIcon({ kind }: { kind: CueKind }) {
  const paths: Record<CueKind, ReactNode> = {
    note: (
      <>
        <path d="M6 12V3l7-1.5v9" />
        <circle cx="4.3" cy="12" r="1.8" />
        <circle cx="11.3" cy="10.5" r="1.8" />
      </>
    ),
    book: (
      <>
        <rect x="3" y="2" width="10" height="12" rx="1" />
        <path d="M6 2v12" />
      </>
    ),
    horn: <path d="M2 6h3l6-3v10l-6-3H2z" />,
  };
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke={APP.red} strokeWidth="1.5" className="shrink-0" aria-hidden>
      {paths[kind]}
    </svg>
  );
}

/** Tiny animated level meter for the LISTENING chip. */
function Bars({ on }: { on: boolean }) {
  return (
    <span className="inline-flex h-2 items-end gap-[1.5px]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-[1px] bg-current"
          initial={{ height: 3 }}
          animate={on ? { height: [3, 8, 4, 7, 3] } : { height: 5 }}
          transition={on ? { duration: 0.9, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" } : undefined}
        />
      ))}
    </span>
  );
}
