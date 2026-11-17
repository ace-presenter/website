"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * "Reduce motion", safe for server rendering: false on the server and on the
 * first client render (so the HTML matches), then the visitor's setting.
 * Motion's own useReducedMotion reads the setting during the first render,
 * so reduced-motion visitors got a hydration mismatch on every animated page.
 */
export function useCalmMotion() {
  const pref = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!pref;
}
