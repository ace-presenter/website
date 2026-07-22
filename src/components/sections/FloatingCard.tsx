import type { CSSProperties, ReactNode } from "react";

/**
 * FloatingCard — a glassy UI chip that drifts gently in the hero air.
 *
 * Pure CSS (`.ace-float` keyframes): zero JS, static under reduced-motion.
 * Desync siblings with `delay` / `duration`. Position via `className`
 * (absolute offsets inside HeroShell's `floating` slot).
 */
export default function FloatingCard({
  children,
  className = "",
  delay = 0,
  duration = 7,
}: {
  children: ReactNode;
  className?: string;
  /** animation-delay in seconds (negative starts mid-cycle — best for desync) */
  delay?: number;
  /** seconds per float cycle */
  duration?: number;
}) {
  return (
    <div
      className={`ace-float glass-card absolute rounded-2xl shadow-[0_16px_48px_-16px_rgba(0,0,0,0.7)] ${className}`}
      style={
        {
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
