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
    try {
      if (sessionStorage.getItem("ace-welcomed")) return;
    } catch {
      /* private mode — just show it */
    }

    setShow(true);
    const raf = requestAnimationFrame(() => setEntered(true));

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      try {
        sessionStorage.setItem("ace-welcomed", "1");
      } catch {
        /* ignore */
      }
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
    const hold = window.setTimeout(finish, 3400); // auto-dismiss if they don't scroll

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(hold);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!show) return null;

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
      <div
        style={{
          opacity: entered ? 1 : 0,
          transform: entered ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
          transition: "opacity 1s ease, transform 1.1s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="mb-7 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#C8102E]" />
          <span className="font-mono text-[12px] uppercase tracking-[0.4em] text-[#9A9A9A]">
            Agentic Cue Experience
          </span>
          <span className="h-px w-10 bg-[#C8102E]" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-[7rem] lg:leading-[0.92]">
          Welcome to{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] font-normal italic text-[#E8183A]">
            ACE
          </span>
        </h1>
        <p className="mx-auto mt-7 max-w-md text-lg text-[#B4B4B4]">
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
