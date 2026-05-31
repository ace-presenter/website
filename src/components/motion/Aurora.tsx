"use client";

import { motion } from "motion/react";

/**
 * Animated aurora background — slow-drifting blurred colour blobs. Cinematic,
 * on-brand, asset-free. Pass `colors` as "r,g,b" triplets; one blob per colour
 * (up to 5). Defaults to the active product accent (`--accent-rgb`), so inside
 * a <ProductTheme> it recolours automatically.
 *
 * Ambient/decorative motion — intentionally plays regardless of
 * prefers-reduced-motion. It's slow, low-contrast, and never tied to scroll or
 * interaction, so it keeps the page feeling alive without triggering the
 * large positional movement that reduced-motion is meant to suppress (the
 * scroll-reveal entrances handle that by honouring the setting).
 */
const SEEDS = [
  { top: "-12%", left: "8%", size: 600, drift: { x: [0, 50, -30, 0], y: [0, -40, 25, 0] } },
  { top: "18%", left: "62%", size: 660, drift: { x: [0, -45, 35, 0], y: [0, 35, -25, 0] } },
  { top: "52%", left: "22%", size: 560, drift: { x: [0, 40, -25, 0], y: [0, -25, 35, 0] } },
  { top: "2%", left: "82%", size: 500, drift: { x: [0, -35, 25, 0], y: [0, 30, -20, 0] } },
  { top: "60%", left: "72%", size: 580, drift: { x: [0, 30, -40, 0], y: [0, -30, 20, 0] } },
] as const;

export default function Aurora({
  colors = ["var(--accent-rgb)"],
  intensity = 0.32,
  className = "",
}: {
  colors?: string[];
  intensity?: number;
  className?: string;
}) {
  const blobs = colors.slice(0, SEEDS.length);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {blobs.map((rgb, i) => {
        const seed = SEEDS[i];
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: seed.top,
              left: seed.left,
              width: seed.size,
              height: seed.size,
              background: `radial-gradient(circle, rgba(${rgb}, ${intensity}) 0%, rgba(${rgb}, 0) 70%)`,
              filter: "blur(40px)",
            }}
            animate={{ x: [...seed.drift.x], y: [...seed.drift.y], scale: [1, 1.12, 0.94, 1] }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
