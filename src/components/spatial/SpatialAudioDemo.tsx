"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Grain } from "./SpatialHero";

/**
 * Spatial Audio, heard for real. Four voices play at once (the room in
 * English, three interpreters); each goes through a Web Audio HRTF panner
 * at its direction, so on headphones they come from around your head.
 * "Spatial off" piles them all in front: the before/after is the pitch.
 *
 * Claims kept to what 3.0 does (docs: spatial-audio memory / V3 facts):
 * a headphone mix for translation, each language placed by a slider and
 * checked with Test voice. Mac only in 3.0. Not room/immersive audio.
 */

type Source = {
  id: "en" | "es" | "fr" | "pt";
  code: string;
  name: string;
  role: string;
  color: string;
  az: number; // degrees, 0 = in front, + = right
};

const START: Source[] = [
  { id: "en", code: "EN", name: "English", role: "The room", color: "#FFFFFF", az: 0 },
  { id: "es", code: "ES", name: "Español", role: "Interpreter", color: "#FF3B4F", az: -70 },
  { id: "fr", code: "FR", name: "Français", role: "Interpreter", color: "#FF9A3C", az: 70 },
  { id: "pt", code: "PT", name: "Português", role: "Interpreter", color: "#5EEAD4", az: 180 },
];

const R = 150; // ring radius in the 400×400 SVG space

type Engine = {
  ctx: AudioContext;
  master: GainNode;
  nodes: Record<string, { gain: GainNode; panner: PannerNode; analyser: AnalyserNode; src?: AudioBufferSourceNode }>;
  buffers: Record<string, AudioBuffer>;
};

function setPannerAz(p: PannerNode, az: number, ctx: AudioContext) {
  const rad = (az * Math.PI) / 180;
  const x = Math.sin(rad) * 1.5;
  const z = -Math.cos(rad) * 1.5;
  if (p.positionX) {
    const t = ctx.currentTime;
    p.positionX.setTargetAtTime(x, t, 0.05);
    p.positionY.setTargetAtTime(0, t, 0.05);
    p.positionZ.setTargetAtTime(z, t, 0.05);
  } else {
    (p as unknown as { setPosition(x: number, y: number, z: number): void }).setPosition(x, 0, z);
  }
}

const norm = (a: number) => {
  let v = ((a + 180) % 360 + 360) % 360 - 180;
  if (v === -180) v = 180;
  return v;
};

export default function SpatialAudioDemo() {
  const reduce = useReducedMotion() ?? false;
  const [sources, setSources] = useState(START);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spatial, setSpatial] = useState(true);
  const [muted, setMuted] = useState<Record<string, boolean>>({});
  const engine = useRef<Engine | null>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const haloRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const beamRefs = useRef<Record<string, SVGLineElement | null>>({});
  const meterRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  // Where each source is drawn / heard. Spatial off = everyone in front.
  const shownAz = (s: Source, i: number) => (spatial ? s.az : (i - 1.5) * 7);
  const heardAz = (s: Source) => (spatial ? s.az : 0);

  // Keep the panners in step with the sliders / toggle.
  useEffect(() => {
    const e = engine.current;
    if (!e) return;
    sources.forEach((s) => setPannerAz(e.nodes[s.id].panner, heardAz(s), e.ctx));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sources, spatial]);

  useEffect(() => {
    const e = engine.current;
    if (!e) return;
    sources.forEach((s) => {
      const target = muted[s.id] ? 0 : s.id === "en" ? 0.9 : 0.75;
      e.nodes[s.id].gain.gain.setTargetAtTime(target, e.ctx.currentTime, 0.04);
    });
  }, [muted, sources]);

  // Level → halo, beam and meter (no re-renders).
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const buf = new Float32Array(1024);
    const tick = () => {
      const e = engine.current;
      if (e) {
        for (const s of START) {
          const n = e.nodes[s.id];
          n.analyser.getFloatTimeDomainData(buf);
          let sum = 0;
          for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
          const lvl = Math.min(1, Math.sqrt(sum / buf.length) * 5);
          const halo = haloRefs.current[s.id];
          if (halo && !reduce) {
            halo.style.transform = `translate(-50%,-50%) scale(${(1 + lvl * 1.6).toFixed(3)})`;
            halo.style.opacity = (0.15 + lvl * 0.7).toFixed(3);
          }
          const beam = beamRefs.current[s.id];
          if (beam) beam.style.strokeOpacity = (0.05 + lvl * 0.9).toFixed(3);
          const m = meterRefs.current[s.id];
          if (m) m.style.transform = `scaleX(${lvl.toFixed(3)})`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduce]);

  useEffect(() => () => void engine.current?.ctx.close(), []);

  const start = useCallback(async () => {
    setLoading(true);
    try {
      if (!engine.current) {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new Ctx();
        const master = ctx.createGain();
        master.gain.value = 0.95;
        master.connect(ctx.destination);
        const nodes: Engine["nodes"] = {};
        for (const s of START) {
          const gain = ctx.createGain();
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 1024;
          const panner = ctx.createPanner();
          panner.panningModel = "HRTF";
          panner.distanceModel = "inverse";
          panner.refDistance = 1.5;
          panner.rolloffFactor = 0;
          gain.connect(analyser).connect(panner).connect(master);
          nodes[s.id] = { gain, analyser, panner };
        }
        const buffers: Record<string, AudioBuffer> = {};
        await Promise.all(
          START.map(async (s) => {
            const res = await fetch(`/audio/spatial/${s.id}.mp3`);
            buffers[s.id] = await ctx.decodeAudioData(await res.arrayBuffer());
          }),
        );
        engine.current = { ctx, master, nodes, buffers };
      }
      const e = engine.current;
      await e.ctx.resume();
      const t0 = e.ctx.currentTime + 0.05;
      START.forEach((s, i) => {
        const n = e.nodes[s.id];
        n.gain.gain.value = muted[s.id] ? 0 : s.id === "en" ? 0.9 : 0.75;
        const src = e.ctx.createBufferSource();
        src.buffer = e.buffers[s.id];
        src.loop = true;
        src.connect(n.gain);
        src.start(t0 + i * 0.35);
        n.src = src;
      });
      sources.forEach((s) => setPannerAz(e.nodes[s.id].panner, heardAz(s), e.ctx));
      setPlaying(true);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sources, spatial, muted]);

  const stop = useCallback(() => {
    const e = engine.current;
    if (!e) return;
    for (const s of START) {
      try {
        e.nodes[s.id].src?.stop();
      } catch {}
      e.nodes[s.id].src = undefined;
    }
    setPlaying(false);
  }, []);

  const setAz = (id: string, az: number) =>
    setSources((list) => list.map((s) => (s.id === id ? { ...s, az: norm(az) } : s)));

  const onDrag = (id: string) => (ev: React.PointerEvent<HTMLButtonElement>) => {
    if (!spatial) return;
    const room = roomRef.current;
    if (!room) return;
    const el = ev.currentTarget;
    el.setPointerCapture(ev.pointerId);
    const move = (e: PointerEvent) => {
      const r = room.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const az = (Math.atan2(dx, -dy) * 180) / Math.PI;
      setAz(id, Math.round(az / 5) * 5);
    };
    const up = () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
  };

  return (
    <section id="spatial" className="relative isolate scroll-mt-20 overflow-hidden border-t border-white/[0.06] px-6 py-28 sm:px-10 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 50% at 72% 50%, rgba(200,16,46,0.18), transparent 70%), radial-gradient(30% 40% at 20% 30%, rgba(94,234,212,0.05), transparent 70%)",
        }}
      />
      <Grain />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
        {/* Copy */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#FF4D5E]">Spatial Audio · New in 3.0</span>
            <span className="rounded-full border border-white/12 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
              Mac only in 3.0
            </span>
          </div>
          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.9rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
            Every language
            <br />
            has its <span className="font-serif font-normal italic text-[#FF4D5E]">own place.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#B8B8BE] sm:text-lg">
            In your headphones, ACE puts the room in front of you and each interpreter&rsquo;s language in its own
            direction. Follow one without losing the others.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#8A8A92]">
            In ACE you set each language&rsquo;s direction with a slider and check it with Test voice. Here, drag the
            voices around your head.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={playing ? stop : start}
              disabled={loading}
              className="group flex items-center gap-3 rounded-full bg-gradient-to-b from-[#FF3B4F] to-[#C8102E] py-3 pl-3 pr-6 text-sm font-semibold text-white shadow-[0_10px_40px_-8px_rgba(232,24,58,0.7)] transition hover:brightness-110 disabled:opacity-60"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                {playing ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden><rect x="1" y="1" width="4" height="10" rx="1" /><rect x="7" y="1" width="4" height="10" rx="1" /></svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden><path d="M2.5 1.2v9.6L10.5 6z" /></svg>
                )}
              </span>
              {loading ? "Loading…" : playing ? "Stop" : "Play with headphones"}
            </button>
            <button
              type="button"
              role="switch"
              aria-checked={spatial}
              onClick={() => setSpatial((v) => !v)}
              className="flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white/85 transition hover:bg-white/[0.08]"
            >
              <span className={`relative h-5 w-9 rounded-full transition ${spatial ? "bg-[#E8183A]" : "bg-white/15"}`}>
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${spatial ? "left-[18px]" : "left-0.5"}`} />
              </span>
              Spatial {spatial ? "on" : "off"}
            </button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-[#77777F]">
            <HeadphonesIcon /> Best with headphones. On speakers the directions mostly disappear.
          </p>

          {/* Legend / mixer */}
          <ul className="mt-10 divide-y divide-white/[0.06] rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            {sources.map((s) => (
              <li key={s.id} className="flex items-center gap-4 px-4 py-3">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.color, boxShadow: `0 0 12px ${s.color}` }} />
                <span className="w-28 text-sm text-white">
                  {s.name}
                  <span className="block text-[11px] text-white/40">{s.role}</span>
                </span>
                <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <span
                    ref={(el) => {
                      meterRefs.current[s.id] = el;
                    }}
                    className="absolute inset-0 origin-left rounded-full"
                    style={{ background: s.color, transform: "scaleX(0)", opacity: muted[s.id] ? 0.2 : 0.9 }}
                  />
                </span>
                <span className="w-12 text-right font-mono text-xs tabular-nums text-white/55">
                  {spatial ? `${s.az > 0 ? "+" : ""}${s.az}°` : "0°"}
                </span>
                <button
                  type="button"
                  onClick={() => setMuted((m) => ({ ...m, [s.id]: !m[s.id] }))}
                  aria-pressed={!!muted[s.id]}
                  aria-label={`${muted[s.id] ? "Unmute" : "Mute"} ${s.name}`}
                  className={`rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-widest transition ${
                    muted[s.id] ? "border-[#FF3B4F]/60 text-[#FF3B4F]" : "border-white/10 text-white/45 hover:text-white"
                  }`}
                >
                  M
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] leading-relaxed text-[#5F5F67]">
            Demo voices are computer-generated. Spatial Audio is a headphone mix for translation, not sound for the
            whole room.
          </p>
        </div>

        {/* The room, from above */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <div ref={roomRef} className="relative aspect-square w-full select-none touch-none">
            <svg viewBox="-200 -200 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <radialGradient id="sp-floor">
                  <stop offset="0%" stopColor="rgba(232,24,58,0.16)" />
                  <stop offset="70%" stopColor="rgba(232,24,58,0.03)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
              </defs>
              <circle r="195" fill="url(#sp-floor)" />
              {[50, 100, 150, 190].map((r) => (
                <circle key={r} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeDasharray={r === 150 ? "0" : "2 5"} />
              ))}
              {Array.from({ length: 24 }).map((_, i) => {
                const a = (i * 15 * Math.PI) / 180;
                const major = i % 6 === 0;
                return (
                  <line
                    key={i}
                    x1={Math.sin(a) * (major ? 160 : 165)}
                    y1={-Math.cos(a) * (major ? 160 : 165)}
                    x2={Math.sin(a) * 172}
                    y2={-Math.cos(a) * 172}
                    stroke={major ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)"}
                  />
                );
              })}
              <text y="-180" textAnchor="middle" className="fill-white/40 font-mono" fontSize="8" letterSpacing="2">FRONT</text>
              <text y="187" textAnchor="middle" className="fill-white/25 font-mono" fontSize="8" letterSpacing="2">BEHIND</text>
              <text x="-187" y="3" textAnchor="middle" className="fill-white/25 font-mono" fontSize="8">L</text>
              <text x="187" y="3" textAnchor="middle" className="fill-white/25 font-mono" fontSize="8">R</text>
              {sources.map((s, i) => {
                const a = (shownAz(s, i) * Math.PI) / 180;
                return (
                  <line
                    key={s.id}
                    ref={(el) => {
                      beamRefs.current[s.id] = el;
                    }}
                    x1={0}
                    y1={0}
                    x2={Math.sin(a) * R}
                    y2={-Math.cos(a) * R}
                    stroke={s.color}
                    strokeWidth="1.5"
                    strokeOpacity="0.12"
                    strokeDasharray="3 4"
                    style={{ transition: "all 500ms cubic-bezier(0.16,1,0.3,1)" }}
                  />
                );
              })}
              {/* Listener, seen from above */}
              <g>
                <ellipse cx="-27" cy="0" rx="5" ry="10" fill="#2A2A30" />
                <ellipse cx="27" cy="0" rx="5" ry="10" fill="#2A2A30" />
                <circle r="25" fill="#18181C" stroke="rgba(255,255,255,0.18)" />
                <path d="M-6 -24 L0 -33 L6 -24 Z" fill="#18181C" stroke="rgba(255,255,255,0.18)" />
                <path d="M-30 -6 C -30 -34, 30 -34, 30 -6" fill="none" stroke="#FF3B4F" strokeWidth="3" strokeLinecap="round" />
              </g>
            </svg>

            {sources.map((s, i) => {
              const a = (shownAz(s, i) * Math.PI) / 180;
              const left = 50 + ((Math.sin(a) * R) / 400) * 100;
              const top = 50 + ((-Math.cos(a) * R) / 400) * 100;
              return (
                <div
                  key={s.id}
                  className="absolute"
                  style={{ left: `${left}%`, top: `${top}%`, transition: "left 500ms cubic-bezier(0.16,1,0.3,1), top 500ms cubic-bezier(0.16,1,0.3,1)" }}
                >
                  <span
                    ref={(el) => {
                      haloRefs.current[s.id] = el;
                    }}
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 h-16 w-16 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${s.color}55, transparent 70%)`,
                      transform: "translate(-50%,-50%)",
                      opacity: 0.15,
                    }}
                  />
                  <button
                    type="button"
                    onPointerDown={onDrag(s.id)}
                    onKeyDown={(e) => {
                      if (!spatial) return;
                      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                        e.preventDefault();
                        setAz(s.id, s.az + 15);
                      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                        e.preventDefault();
                        setAz(s.id, s.az - 15);
                      }
                    }}
                    aria-label={`${s.name}, ${s.az} degrees. Arrow keys move it around your head.`}
                    className={`absolute left-0 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-[#101013]/90 font-mono text-xs font-semibold backdrop-blur transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                      spatial ? "cursor-grab active:cursor-grabbing" : "cursor-default"
                    }`}
                    style={{
                      borderColor: `${s.color}99`,
                      color: s.color,
                      boxShadow: `0 0 24px -4px ${s.color}88`,
                      opacity: muted[s.id] ? 0.35 : 1,
                    }}
                  >
                    {s.code}
                  </button>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
            {spatial ? "Drag a voice · arrow keys work too" : "Spatial off · everyone in front"}
          </p>
        </div>
      </div>
    </section>
  );
}

function HeadphonesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z" />
    </svg>
  );
}
