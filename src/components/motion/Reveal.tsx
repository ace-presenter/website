"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Shared easing — the slow, confident ease the site already used. */
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

/**
 * Scroll-reveal: fades + lifts children into view once. Reduced-motion safe
 * (renders immediately, no transform).
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container — animates its <Item> children in sequence as the group
 * scrolls into view. Pair with <Item>.
 */
export function Stagger({
  children,
  stagger = 0.1,
  delayChildren = 0,
  className = "",
}: {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** A single staggered child. Must be rendered inside <Stagger>. */
export function Item({
  children,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
