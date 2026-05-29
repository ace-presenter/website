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

/**
 * Per-product accent colours — one accent per product, shared neutrals.
 *
 *  accent      — base accent: buttons, dots, labels, active states
 *  accentVivid — hover / italic headline variant (lighter)
 *  accentTint  — subtle backgrounds, hover borders, pricing card gradient
 *  rgb         — RGB triplet for radial gradient rgba() strings
 */
export const products = {
  presenter: {
    accent:      "#C8102E",
    accentVivid: "#E8183A",
    accentTint:  "#1F0509",
    rgb:         "200,16,46",
  },
  schedule: {
    accent:      "#6941C6",
    accentVivid: "#8B68D6",
    accentTint:  "#120B24",
    rgb:         "105,65,198",
  },
  editorsNotes: {
    accent:      "#B07C2A",
    accentVivid: "#CFA04D",
    accentTint:  "#1E1408",
    rgb:         "176,124,42",
  },
  manager: {
    accent:      "#0A7B52",
    accentVivid: "#3DAA80",
    accentTint:  "#041510",
    rgb:         "10,123,82",
  },
  world: {
    accent:      "#0884A8",
    accentVivid: "#3AAEC8",
    accentTint:  "#041519",
    rgb:         "8,132,168",
  },
} as const;

export type ProductKey = keyof typeof products;

/** Convenience re-export — import { ACE_BRAND } from "@/lib/brand" */
export const ACE_BRAND = {
  brand,
  accent,
  surface,
  border,
  text,
  status,
  products,
} as const;

export default ACE_BRAND;
