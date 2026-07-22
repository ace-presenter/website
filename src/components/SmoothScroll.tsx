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
 *
 * `lenisStop()` / `lenisStart()` let overlays (the mobile nav sheet) freeze
 * inertia scroll while open. Both are no-ops when Lenis never initialised
 * (reduced motion), so callers pair them with a body overflow lock.
 */

let activeLenis: Lenis | null = null;

export function lenisStop() {
  activeLenis?.stop();
}

export function lenisStart() {
  activeLenis?.start();
}

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
    activeLenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      if (activeLenis === lenis) activeLenis = null;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
