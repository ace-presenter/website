"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Stylized ACE Presenter UI — the hero centerpiece. A faux app window that
 * gently floats and self-animates: a cycling cue list, a live "listening"
 * pulse, and a confidence bar. Built entirely in CSS/SVG (no screenshot), so
 * it ships immediately and stays crisp at any size.
 *
 * Reduced-motion safe — float, pulse and cycling all freeze; the window
 * renders in a representative resting state.
 */

const CUES = [
  { label: "Way Maker", tag: "VERSE 2" },
  { label: "Goodness of God", tag: "CHORUS" },
  { label: "Build My Life", tag: "BRIDGE" },
  { label: "Great Are You Lord", tag: "VERSE 1" },
  { label: "This Is Amazing Grace", tag: "INTRO" },
];

export default function HeroMockup() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % CUES.length), 2600);
    return () => clearInterval(id);
  }, []);

  const cue = CUES[active];

  return (
    <motion.div
      className="relative w-full max-w-3xl mx-auto"
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
      animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-2xl border border-[#2A2A2A] bg-[#0F0F0F] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1A1A1A] bg-[#141414]">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-xs font-semibold text-[#C4C4C4]">ACE Presenter</span>
          <span className="ml-auto inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[9px] uppercase tracking-[0.18em] font-bold text-[#22C55E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            Live
          </span>
        </div>

        {/* Body */}
        <div className="grid grid-cols-[1.1fr_1.9fr_1.2fr] h-[300px] sm:h-[340px]">
          {/* Cue list */}
          <div className="border-r border-[#1A1A1A] p-3 flex flex-col gap-1.5 bg-[#0D0D0D]">
            <div className="text-[8px] uppercase tracking-[0.2em] text-[#666] font-bold px-1 mb-1">
              Setlist
            </div>
            {CUES.map((c, i) => (
              <div
                key={c.label}
                className="relative px-2.5 py-2 rounded-lg text-[11px] font-medium transition-colors"
                style={{
                  background: i === active ? "rgba(200,16,46,0.14)" : "transparent",
                  color: i === active ? "#FFFFFF" : "#888888",
                }}
              >
                {i === active && (
                  <motion.span
                    layoutId="cue-active-bar"
                    className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-[#C8102E]"
                  />
                )}
                <span className="pl-1.5">{c.label}</span>
              </div>
            ))}
          </div>

          {/* Stage preview */}
          <div className="relative flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#0A0A0A] to-[#050505] overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(60% 50% at 50% 40%, rgba(200,16,46,0.18), transparent 70%)",
              }}
            />
            <div className="relative text-center">
              <div className="text-[8px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
                {cue.tag}
              </div>
              <motion.div
                key={cue.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-lg sm:text-2xl font-bold text-white leading-tight max-w-[16rem]"
              >
                {cue.label}
              </motion.div>
            </div>
            {/* Waveform */}
            <div className="absolute bottom-4 left-0 right-0 flex items-end justify-center gap-[3px] h-8 px-6">
              {Array.from({ length: 28 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="flex-1 max-w-[4px] rounded-full bg-[#C8102E]/50"
                  animate={{ height: ["20%", `${30 + ((i * 37) % 70)}%`, "20%"] }}
                  transition={{
                    duration: 1.1 + (i % 5) * 0.18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 7) * 0.06,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Detection panel */}
          <div className="border-l border-[#1A1A1A] p-3.5 flex flex-col gap-4 bg-[#0D0D0D]">
            <div>
              <div className="text-[8px] uppercase tracking-[0.2em] text-[#666] font-bold mb-2">
                Detection
              </div>
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-7 w-7 items-center justify-center">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#22C55E]/30"
                    animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
                </span>
                <span className="text-[11px] font-semibold text-[#C4C4C4]">Listening…</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#888] font-bold">
                  Match
                </span>
                <span className="text-[9px] font-mono text-[#22C55E]">0.97</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#1A1A1A] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#C8102E] to-[#E8183A]"
                  animate={{ width: ["10%", "97%"] }}
                  transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
              </div>
            </div>

            <div className="mt-auto rounded-lg border border-[#1A1A1A] bg-[#0F0F0F] p-2.5">
              <div className="text-[8px] uppercase tracking-[0.18em] text-[#666] font-bold mb-1">
                Now matched
              </div>
              <div className="text-[11px] font-semibold text-white truncate">{cue.label}</div>
              <div className="text-[9px] text-[#888] mt-0.5">{cue.tag} · auto-advanced</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floor glow */}
      <div
        aria-hidden
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 rounded-full blur-3xl bg-[#C8102E]/20"
      />
    </motion.div>
  );
}
