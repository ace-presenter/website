"use client";

import { useEffect, useState, type RefObject } from "react";

/** Scale factor that fits a fixed-size design (designWidth px) into the element's width. */
export function useFitScale(ref: RefObject<HTMLElement | null>, designWidth: number) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / designWidth));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, designWidth]);
  return scale;
}

/**
 * Smoothed pointer tilt written straight to CSS variables (--tx, --ty in -1..1)
 * on `target`, no React re-renders. Touch / coarse pointers get a slow drift
 * instead. Off entirely when `enabled` is false (reduced motion).
 */
export function usePointerTilt(target: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const el = target.current;
    if (!el || !enabled) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const tick = (t: number) => {
      if (coarse) {
        tx = Math.sin(t / 4200) * 0.6;
        ty = Math.cos(t / 5300) * 0.35;
      }
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--tx", cx.toFixed(4));
      el.style.setProperty("--ty", cy.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    if (!coarse) window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [target, enabled]);
}
