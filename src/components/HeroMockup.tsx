"use client";

import { useEffect, useState } from "react";

/**
 * ACE Presenter UI — the hero's product frame. Shown honestly and flat, like a
 * real screenshot: no 3D tilt, no float, no floor glow, no drop-shadow theatre.
 * One restrained live element (the cue cross-fade + a calm meter) signals that
 * the app is listening, without the glowing-mockup look.
 *
 * Reduced-motion safe — the cue simply rests on the first item.
 */

const CUES = [
  { label: "Way Maker", tag: "VERSE 2" },
  { label: "Goodness of God", tag: "CHORUS" },
  { label: "Build My Life", tag: "BRIDGE" },
  { label: "Great Are You Lord", tag: "VERSE 1" },
  { label: "This Is Amazing Grace", tag: "INTRO" },
];

export default function HeroMockup() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % CUES.length), 2800);
    return () => clearInterval(id);
  }, []);

  const cue = CUES[active];

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D]/90 backdrop-blur-sm shadow-[0_32px_90px_-28px_rgba(200,16,46,0.35)]">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1A1A1A] bg-[#121212]">
        <span className="w-3 h-3 rounded-full bg-[#3A3A3A]" />
        <span className="w-3 h-3 rounded-full bg-[#3A3A3A]" />
        <span className="w-3 h-3 rounded-full bg-[#3A3A3A]" />
        <span className="ml-3 text-xs font-semibold text-[#C4C4C4]">ACE Presenter</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#888]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
          Listening
        </span>
      </div>

      {/* Body */}
      <div className="grid grid-cols-[1.1fr_1.9fr_1.2fr] h-[300px] sm:h-[360px]">
        {/* Setlist */}
        <div className="border-r border-[#1A1A1A] p-3 flex flex-col gap-1 bg-[#0D0D0D]">
          <div className="text-[8px] uppercase tracking-[0.2em] text-[#666] font-bold px-1 mb-1.5">
            Setlist
          </div>
          {CUES.map((c, i) => (
            <div
              key={c.label}
              className="relative px-2.5 py-2 rounded-lg text-[11px] font-medium transition-colors duration-500"
              style={{
                background: i === active ? "rgba(200,16,46,0.12)" : "transparent",
                color: i === active ? "#FFFFFF" : "#777",
              }}
            >
              {i === active && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-[#C8102E]" />
              )}
              <span className="pl-1.5">{c.label}</span>
            </div>
          ))}
        </div>

        {/* Stage preview */}
        <div className="relative flex flex-col items-center justify-center p-4 bg-[#080808]">
          <div className="relative text-center transition-opacity duration-500" key={cue.label}>
            <div className="text-[8px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
              {cue.tag}
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white leading-tight max-w-[16rem]">
              {cue.label}
            </div>
          </div>
          {/* Calm static waveform */}
          <div className="absolute bottom-4 left-0 right-0 flex items-end justify-center gap-[3px] h-7 px-6">
            {Array.from({ length: 28 }).map((_, i) => (
              <span
                key={i}
                className="flex-1 max-w-[4px] rounded-full bg-[#C8102E]/30"
                style={{ height: `${20 + ((i * 37) % 60)}%` }}
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
              <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
              <span className="text-[11px] font-semibold text-[#C4C4C4]">Matched</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] uppercase tracking-[0.15em] text-[#888] font-bold">
                Confidence
              </span>
              <span className="text-[9px] font-mono text-[#C4C4C4]">0.97</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#1A1A1A] overflow-hidden">
              <div className="h-full w-[97%] rounded-full bg-[#C8102E]" />
            </div>
          </div>

          <div className="mt-auto rounded-lg border border-[#1A1A1A] bg-[#0F0F0F] p-2.5">
            <div className="text-[8px] uppercase tracking-[0.18em] text-[#666] font-bold mb-1">
              Now showing
            </div>
            <div className="text-[11px] font-semibold text-white truncate">{cue.label}</div>
            <div className="text-[9px] text-[#888] mt-0.5">{cue.tag} · auto-advanced</div>
          </div>
        </div>
      </div>
    </div>
  );
}
