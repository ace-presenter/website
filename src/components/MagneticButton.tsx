"use client";

/**
 * MagneticButton — a link/button that subtly pulls toward the cursor and
 * traces a soft accent glow along its border as the pointer moves across it.
 *
 * Physics is applied via the `translate` CSS property (independent of
 * `transform`), so it never fights a `transform`-based hover on the same node.
 * Disabled entirely under reduced motion and on coarse (touch) pointers.
 */

import { useRef, type ReactNode, type CSSProperties } from "react";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Max pull distance in px (default 10). */
  strength?: number;
  /** Glow colour as "r,g,b" (default white-ish). */
  glowRgb?: string;
  style?: CSSProperties;
}

export default function MagneticButton({
  href,
  children,
  className = "",
  strength = 10,
  glowRgb = "255,255,255",
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const enabled = useRef(true);

  function ensureCapability() {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    enabled.current = !reduce && !coarse;
  }

  function onMove(e: React.PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    ensureCapability();
    const r = el.getBoundingClientRect();
    // Track cursor for the border glow regardless of motion preference.
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    if (!enabled.current) return;
    // Pull toward the cursor, eased toward the centre.
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.translate = `${dx * strength}px ${dy * strength}px`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.translate = "0 0";
  }

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group relative isolate overflow-hidden transition-[translate] duration-300 ease-out ${className}`}
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          "--glow-rgb": glowRgb,
          ...style,
        } as CSSProperties
      }
    >
      {/* Soft accent glow tracing the border under the cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 80% at var(--mx) var(--my), rgba(var(--glow-rgb),0.35) 0%, rgba(var(--glow-rgb),0) 65%)",
        }}
      />
      {children}
    </a>
  );
}
