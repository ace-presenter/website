"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * KineticHeading — a heading that rises up from behind a clip mask when it
 * scrolls into view (the landing-page "type sweeps up" move). Works with any
 * ReactNode heading (including our <AccentItalic> signature) because it masks
 * and lifts the whole line rather than splitting words.
 *
 * Reduced motion → renders a plain heading, no mask, no transform.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

export default function KineticHeading({
  children,
  className = "",
  as = "h2",
  delay = 0,
  duration = 0.9,
}: {
  children: ReactNode;
  className?: string;
  as?: keyof typeof TAGS;
  delay?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = TAGS[as];
  return (
    // pb gives descenders (g, y, p) room so the mask doesn't clip them at rest
    <span className="block overflow-hidden pb-[0.14em]">
      <MotionTag
        className={className}
        initial={{ y: "115%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.6, margin: "0px 0px -6% 0px" }}
        transition={{ duration, ease: EASE, delay }}
      >
        {children}
      </MotionTag>
    </span>
  );
}
