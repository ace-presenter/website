"use client";

import { motion } from "motion/react";

/**
 * Slow-rotating volumetric "god rays" behind the hero headline. Faint crimson
 * light sweeps, radially masked so it fades before the edges. Ambient — always
 * animates (very slow, low-contrast). Pairs with <Aurora> for hero depth.
 */
export default function HeroRays() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-[-50%] h-[140vh] w-[140vh] -translate-x-1/2"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(232,24,58,0.10) 18deg, transparent 38deg, transparent 92deg, rgba(200,16,46,0.08) 112deg, transparent 132deg, transparent 210deg, rgba(232,24,58,0.10) 232deg, transparent 252deg)",
          maskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 62%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 62%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
