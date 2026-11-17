import type { PointerEvent } from "react";

/**
 * Pointer → CSS variables for the glass sheen (--gx/--gy) and the card
 * border light (--mx/--my). Written straight to the element; no re-render.
 */
export function trackPointer(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%";
  const y = (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%";
  el.style.setProperty("--gx", x);
  el.style.setProperty("--gy", y);
  el.style.setProperty("--mx", x);
  el.style.setProperty("--my", y);
}
