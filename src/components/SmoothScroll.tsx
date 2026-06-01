"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * App-wide smooth (inertia) scroll via Lenis. This is the "buttery weight"
 * the scroll-driven sections ride on.
 *
 * Fail-safe by design:
 *  - Pure pass-through: it renders {children} directly, so if anything here
 *    throws or never runs, the page is completely unaffected (native scroll).
 *  - Honours `prefers-reduced-motion`: when set, Lenis is never initialised and
 *    the browser's normal scrolling is used untouched.
 *  - Touch scrolling is left native (smoothTouch off) — feels better on phones
 *    and avoids hijacking momentum scroll.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.1, // inertia: lower = smoother/heavier
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
