"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import type { ProductKey } from "@/lib/brand";

/**
 * RippleBackdrop — gate + mount point for the RippleField WebGL environment.
 *
 * Purely additive: it fades in over the always-rendered CSS HorizonGlow, so
 * every failure mode (mobile, coarse pointer, reduced motion, WebGL crash)
 * simply shows the static cosmic backdrop — never a blank void, never CLS.
 *
 * Guards (same philosophy as the retired HeroBackdrop3D):
 *  - Only mounts on desktop (≥1024px), motion allowed, fine pointer.
 *  - The scene chunk (three.js + R3F) is dynamically imported, ssr:false.
 *  - Error boundary catches WebGL/context failures and renders nothing.
 *  - Absolute, pointer-events-none — never blocks headline CTAs.
 *  - Pauses the frameloop when scrolled offscreen or the tab is hidden.
 */

const RippleField = dynamic(() => import("./RippleField"), {
  ssr: false,
  loading: () => null,
});

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    /* swallow — the hero is fine on the CSS backdrop alone */
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function RippleBackdrop({ product = "presenter" }: { product?: ProductKey }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false); // capability gate → mount at all
  const [visible, setVisible] = useState(true); // in-viewport → run frameloop

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setOn(!reduce.matches && desktop.matches && fine.matches);
    update();
    reduce.addEventListener("change", update);
    desktop.addEventListener("change", update);
    fine.addEventListener("change", update);
    return () => {
      reduce.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
      fine.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!on || !hostRef.current) return;
    // run only while the hero intersects the viewport AND the tab is shown
    let inView = true;
    const sync = () => setVisible(inView && !document.hidden);
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(hostRef.current);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [on]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {on && (
        <SceneBoundary>
          <RippleField product={product} hostRef={hostRef} active={visible} />
        </SceneBoundary>
      )}
    </div>
  );
}
