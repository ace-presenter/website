/**
 * ACE Suite — brand token single source of truth.
 *
 * All hex values mirror ACE Presenter V2/BRAND.md exactly.
 * Import from here instead of hardcoding colour strings across pages —
 * one change here propagates to every product surface.
 */

export const brand = {
  // Primary brand red
  DEFAULT: "#C8102E",
  light: "#E8183A",
  dark: "#9B0B22",
} as const;

export const accent = {
  DEFAULT: "#FF6B00",
  light: "#FF8C2A",
} as const;

export const surface = {
  deepest: "#080808",
  DEFAULT: "#0F0F0F",
  toolbar: "#141414",
  panel: "#1A1A1A",
  hover: "#1F1F1F",
  selected: "#222222",
} as const;

export const border = {
  DEFAULT: "#2A2A2A",
} as const;

export const text = {
  primary: "#FFFFFF",
  secondary: "#C4C4C4",
  muted: "#888888",
} as const;

export const status = {
  live: "#22C55E",
  warn: "#F59E0B",
  error: "#EF4444",
} as const;

/** Convenience re-export — import { ACE_BRAND } from "@/lib/brand" */
export const ACE_BRAND = {
  brand,
  accent,
  surface,
  border,
  text,
  status,
} as const;

export default ACE_BRAND;
