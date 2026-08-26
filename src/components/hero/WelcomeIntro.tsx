"use client";

import { useEffect, useState } from "react";

/**
 * A one-time opening title card. On first load of a session it fills the
 * viewport with "Welcome to ACE — Agentic Cue Experience", then dissolves as
 * the visitor scrolls down into the product hero (and, if they don't scroll,
 * fades on its own after a short hold). It never intercepts pointer or scroll
 * events, shows once per session, and is skipped entirely under reduced-motion.
 */
export default function WelcomeIntro() {
  const [show, setShow] = useState(false);
  const [entered, setEntered] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setShow(true);
    const raf = requestAnimationFrame(() => setEntered(true));

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setOpacity(0);
      window.setTimeout(() => setShow(false), 750);
      window.removeEventListener("scroll", onScroll);
    };

    const onScroll = () => {
      const threshold = Math.max(320, window.innerHeight * 0.6);
      const o = Math.max(0, 1 - window.scrollY / threshold);
      setOpacity(o);
      if (o <= 0.02) finish();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const hold = window.setTimeout(finish, 5000); // auto-dismiss if they don't scroll

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(hold);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!show) return null;

  // Per-letter stop-motion bounce. Letters share one running index so the
  // stagger flows across "Welcome to" (sans) into "ACE" (serif italic red).
  const HEAD_START = 0.18; // s, before the first glyph pops
  const STEP = 0.05; // s between glyphs
  const head: { c: string; serif: boolean }[] = [
    ...[..."Welcome to"].map((c) => ({ c, serif: false })),
    { c: " ", serif: false },
    ...[..."ACE"].map((c) => ({ c, serif: true })),
  ];
  const lastLetter = head.filter((h) => h.c !== " ").length - 1;
  const headEnd = HEAD_START + lastLetter * STEP + 0.62; // when the last glyph settles

  let li = -1;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center px-6 text-center"
      style={{
        opacity,
        pointerEvents: "none",
        transition: "opacity 0.7s ease",
        background: "radial-gradient(120% 100% at 50% 0%, #180608 0%, #0F0F0F 58%)",
      }}
    >
      <div>
        <div
          className="mb-7 flex items-center justify-center gap-3"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="h-px w-10 bg-[#C8102E]" />
          <span className="font-mono text-[12px] uppercase tracking-[0.4em] text-[#9A9A9A]">
            Agentic Cue Experience
          </span>
          <span className="h-px w-10 bg-[#C8102E]" />
        </div>

        <h1
          aria-label="Welcome to ACE"
          className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-[7rem] lg:leading-[0.92]"
        >
          {head.map((L, i) => {
            if (L.c === " ") return <span key={i} className="inline-block w-[0.28em]" />;
            li += 1;
            return (
              <span
                key={i}
                className={`ace-letter${
                  L.serif
                    ? " font-[family-name:var(--font-instrument-serif)] font-normal italic text-[#E8183A]"
                    : ""
                }`}
                style={{ animationDelay: `${HEAD_START + li * STEP}s` }}
              >
                {L.c}
              </span>
            );
          })}
        </h1>

        <p
          className="mx-auto mt-7 max-w-md text-lg text-[#B4B4B4]"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.7s ease ${headEnd - 0.2}s, transform 0.7s ease ${headEnd - 0.2}s`,
          }}
        >
          One suite for the whole event — five tools that listen, plan, and run the room.
        </p>
      </div>

      <div
        className="absolute bottom-10 flex flex-col items-center gap-2 text-[#777]"
        style={{ opacity: entered ? 1 : 0, transition: "opacity 1s ease 0.4s" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
        <span className="animate-bounce text-lg">↓</span>
      </div>
    </div>
  );
}
