/**
 * HorizonGlow — the zero-JS cosmic backdrop every hero stands on.
 *
 * Three layers, all pure CSS: a procedural starfield (.ace-stars), a soft
 * accent bloom rising from below the fold, and the "planet" horizon arc — a
 * huge circle whose top rim just crests the bottom edge, lit in the product
 * accent. Colours come from `--accent-rgb` / `--accent-vivid` (set by
 * ProductTheme) with Presenter-crimson fallbacks, so the same component
 * recolours per product with no props.
 *
 * Server component, always rendered. On capable desktops the RippleField
 * WebGL layer fades in over it; on mobile / reduced-motion / WebGL failure
 * this IS the hero backdrop — never a blank void, never CLS.
 */

const FALLBACK_RGB = "200,16,46"; // Presenter crimson
const FALLBACK_ORANGE = "255,107,0"; // ACE orange — warms the arc's core

export default function HorizonGlow({
  /** 0–1 multiplier on the glow strength (CTA bands want it quieter). */
  strength = 1,
  /** Hide the starfield for slim page headers that only want the arc. */
  stars = true,
  className = "",
}: {
  strength?: number;
  stars?: boolean;
  className?: string;
}) {
  const s = Math.max(0, Math.min(1, strength));
  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
    >
      {stars && (
        <div
          className="ace-stars absolute inset-0"
          style={{
            opacity: 0.9,
            maskImage: "linear-gradient(to bottom, black 55%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 95%)",
          }}
        />
      )}

      {/* Atmosphere bloom — wide accent wash rising from the horizon. */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[170%] h-[62%]"
        style={{
          background: `radial-gradient(ellipse 55% 85% at 50% 100%,
            rgba(${FALLBACK_ORANGE}, ${0.10 * s}),
            rgba(var(--accent-rgb, ${FALLBACK_RGB}), ${0.16 * s}) 38%,
            rgba(var(--accent-rgb, ${FALLBACK_RGB}), ${0.05 * s}) 62%,
            transparent 82%)`,
        }}
      />

      {/* Planet body — the dark disc; only its upper arc is in frame. */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[86%] w-[180%] aspect-square rounded-full"
        style={{
          background: `radial-gradient(circle at 50% 0%,
            #1A0407 0%, #0C0304 18%, #080808 40%)`,
          boxShadow: `0 -2px 24px rgba(var(--accent-rgb, ${FALLBACK_RGB}), ${0.55 * s}),
            0 -18px 80px rgba(var(--accent-rgb, ${FALLBACK_RGB}), ${0.3 * s}),
            0 -60px 220px rgba(${FALLBACK_ORANGE}, ${0.12 * s})`,
        }}
      />

      {/* Horizon rim — the bright accent edge of the arc. */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[86%] w-[180%] aspect-square rounded-full"
        style={{
          border: `1px solid rgba(var(--accent-rgb, ${FALLBACK_RGB}), ${0.7 * s})`,
          maskImage: "linear-gradient(to bottom, black 0%, transparent 6%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 6%)",
          filter: `drop-shadow(0 0 6px rgba(var(--accent-rgb, ${FALLBACK_RGB}), ${0.8 * s}))`,
        }}
      />
    </div>
  );
}
