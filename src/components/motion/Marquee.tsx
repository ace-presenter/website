"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Continuous horizontal ticker (RenewedVision-style logo/feature carousel).
 * Children are duplicated so the loop is seamless.
 *
 * Ambient/decorative motion — plays regardless of prefers-reduced-motion. The
 * scroll never jumps and isn't interaction-triggered, so it keeps the page
 * alive without the large positional movement reduced-motion targets.
 */
export default function Marquee({
  children,
  speed = 32,
  className = "",
  gapClassName = "gap-10",
}: {
  children: ReactNode;
  /** Seconds for one full loop. Lower = faster. */
  speed?: number;
  className?: string;
  gapClassName?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <motion.div
        className={`flex w-max items-center ${gapClassName}`}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        <div className={`flex items-center ${gapClassName}`}>{children}</div>
        <div className={`flex items-center ${gapClassName}`} aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
