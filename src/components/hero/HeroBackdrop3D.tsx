"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";

/**
 * Mouse-reactive 3D depth layer that sits *behind* the hero content. Purely
 * additive: it never carries product information, so if it fails to load the
 * hero is simply unchanged (aurora + rays + mockup) — never a blank void.
 *
 * Guards:
 *  - Only mounts on desktop (≥1024px), with motion allowed, and a fine pointer
 *    (skips phones/tablets and reduced-motion users).
 *  - The scene chunk (three.js + R3F) is dynamically imported with ssr:false,
 *    so none of it ships in the initial bundle or blocks first paint.
 *  - An error boundary catches WebGL/context failures and renders nothing.
 *  - Absolute, pointer-events-none → never blocks the headline CTAs.
 */

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    /* swallow — the hero is fine without the 3D layer */
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroBackdrop3D() {
  const [on, setOn] = useState(false);

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

  if (!on) return null;

  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <SceneBoundary>
        <HeroScene />
      </SceneBoundary>
    </div>
  );
}
