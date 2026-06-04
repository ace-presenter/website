"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * ScrollReveal — fades + lifts content in when it scrolls into view.
 *
 * This is the scroll-triggered counterpart to the on-mount `Reveal` (which
 * fires once at page load via the pure-CSS `.ace-reveal` keyframe). Use
 * ScrollReveal for content below the fold so it animates as the reader
 * arrives at it, the way the reference site does.
 *
 * Safety / accessibility:
 *  - Honours `prefers-reduced-motion`: when set, children render immediately
 *    with no transform (we short-circuit to a plain wrapper).
 *  - The hidden initial state is class-driven (`sr-item`). A <noscript> rule
 *    in the document head force-shows `.sr-item`, so if JS never runs the
 *    content is visible rather than stuck at opacity:0.
 *  - `viewport once` so it animates a single time and never re-hides on scroll.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ScrollReveal({
  children,
  className = "",
  y = 24,
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  /** Vertical lift distance in px. */
  y?: number;
  /** Seconds. */
  delay?: number;
  /** Seconds. */
  duration?: number;
  once?: boolean;
  /** Fraction of the element that must be visible to trigger (0–1). */
  amount?: number;
}) {
  const reduce = useReducedMotion();

  // Reduced motion → no animation, no hidden state. Just render.
  if (reduce) return <div className={className}>{children}</div>;

  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration, ease: EASE, delay } },
  };

  return (
    <motion.div
      className={`sr-item ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollStagger — wraps a list so children reveal in sequence as the group
 * scrolls into view. Children should be <ScrollItem>. Same safety model.
 */
export function ScrollStagger({
  children,
  className = "",
  stagger = 0.1,
  delayChildren = 0,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollItem({
  children,
  className = "",
  y = 24,
  duration = 0.7,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={`sr-item ${className}`}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
