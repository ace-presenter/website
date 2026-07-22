import type { ReactNode } from "react";
import { ProductTheme } from "@/components/motion";
import type { ProductKey } from "@/lib/brand";
import HorizonGlow from "@/components/hero/HorizonGlow";
import RippleBackdrop from "@/components/hero/RippleBackdrop";

/**
 * HeroShell — the shared hero stage every marketing page opens on.
 *
 * A fixed-height (min 92svh) section over the cosmic backdrop: CSS
 * HorizonGlow always, WebGL RippleBackdrop fading in above it on capable
 * desktops. Content is centered, big type; the optional `floating` slot
 * renders after the main column (absolute-position FloatingCards inside it).
 *
 * Server component — the only client islands inside are RippleBackdrop and
 * whatever interactive children the page passes.
 */
export default function HeroShell({
  product,
  ripple = true,
  children,
  floating,
  className = "",
  fill = true,
}: {
  /** Product accent for backdrop + CSS vars. Omit for suite crimson. */
  product?: ProductKey;
  /** Set false for featherweight heroes (segment pages, coming-soon). */
  ripple?: boolean;
  children: ReactNode;
  /** Floating glass chips layer — absolutely positioned within the hero. */
  floating?: ReactNode;
  className?: string;
  /**
   * When true (default) the hero fills the viewport (min 92svh, centered) —
   * right for text-only heroes. Set false when the hero carries a large
   * visual (e.g. a product screenshot); the section then sizes to its
   * content so tall viewports don't open a void above and below.
   */
  fill?: boolean;
}) {
  const inner = (
    <section
      className={`relative flex flex-col items-center overflow-hidden px-6 sm:px-10 ${
        fill ? "min-h-[92svh] justify-center" : "justify-start"
      } ${className}`}
    >
      <HorizonGlow />
      {ripple && <RippleBackdrop product={product ?? "presenter"} />}
      {floating && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[5] hidden lg:block">
          {floating}
        </div>
      )}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center pb-24 pt-24 text-center">
        {children}
      </div>
    </section>
  );

  return product ? <ProductTheme product={product}>{inner}</ProductTheme> : inner;
}
