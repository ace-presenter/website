"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-linked vertical parallax. Children drift from +distance to -distance
 * as the element travels through the viewport. Reduced-motion safe (no drift).
 */
export default function Parallax({
  children,
  distance = 60,
  className = "",
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
