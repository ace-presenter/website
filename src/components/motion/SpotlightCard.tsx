"use client";

import { useRef, type ReactNode } from "react";

/**
 * Cursor-follow spotlight. A soft radial highlight tracks the pointer across
 * the card on hover. Pure CSS-var driven (no layout thrash); the glow colour
 * defaults to the active product accent, so inside a <ProductTheme> each card
 * glows in its own colour.
 *
 * Not motion-sickness inducing, so it stays on under reduced-motion.
 */
export default function SpotlightCard({
  children,
  glow = "rgba(var(--accent-rgb, 200,16,46), 0.12)",
  className = "",
}: {
  children: ReactNode;
  glow?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group/spot relative ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(300px circle at var(--mx, 50%) var(--my, 0%), ${glow}, transparent 72%)`,
        }}
      />
      {children}
    </div>
  );
}
