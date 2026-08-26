"use client";

import { useEffect } from "react";

/**
 * Drives a page-wide accent that follows the product section in view. Reads the
 * `data-accent-rgb` that every <ProductTheme> wrapper carries, and writes the
 * winning section's colour to the animatable --ar/--ag/--ab channels on <html>
 * (see globals.css). Renders the ambient glow layer itself. Place once per page
 * that stacks product sections (home, /learn).
 */
export default function SuiteAccent() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-accent-rgb]"));
    if (els.length === 0) return;

    const root = document.documentElement;
    const ratios = new Map<Element, number>();
    let current = "";

    const apply = (rgb: string) => {
      const p = rgb.split(",").map((s) => s.trim());
      if (p.length !== 3) return;
      root.style.setProperty("--ar", p[0]);
      root.style.setProperty("--ag", p[1]);
      root.style.setProperty("--ab", p[2]);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          ratios.set(e.target, e.isIntersecting ? e.intersectionRatio : 0);
        }
        let bestRgb: string | undefined;
        let max = 0;
        ratios.forEach((r, el) => {
          if (r > max) {
            max = r;
            bestRgb = (el as HTMLElement).dataset.accentRgb;
          }
        });
        if (bestRgb && bestRgb !== current) {
          current = bestRgb;
          apply(bestRgb);
        }
      },
      { threshold: [0.15, 0.35, 0.55, 0.75] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return <div className="suite-aura" aria-hidden />;
}
