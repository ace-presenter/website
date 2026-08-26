"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/**
 * ClipReveal — wipes content into view with a clip-path mask (plus a small
 * scale settle) as it scrolls in, instead of a plain fade. Good for framed
 * product visuals so the image "unrolls" rather than popping.
 *
 * Reduced motion → renders children directly.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ClipReveal({
  children,
  className = "",
  style,
  duration = 1,
  delay = 0,
  /** Wipe direction. */
  from = "bottom",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  duration?: number;
  delay?: number;
  from?: "bottom" | "top" | "left" | "right";
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} style={style}>{children}</div>;

  const hiddenClip = {
    bottom: "inset(0 0 100% 0)",
    top: "inset(100% 0 0 0)",
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
  }[from];

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ clipPath: hiddenClip, opacity: 0.4, scale: 1.04 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -6% 0px" }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
