import type { CSSProperties, ReactNode } from "react";
import { products, type ProductKey } from "@/lib/brand";

/**
 * Per-product accent theming. Sets CSS custom properties on a wrapper so any
 * descendant can reference the active product's accent in Tailwind arbitrary
 * values and inline styles:
 *
 *   --accent        base accent          (e.g. #6941C6)
 *   --accent-vivid  hover / headline     (e.g. #8B68D6)
 *   --accent-tint   deep tint background (e.g. #120B24)
 *   --accent-rgb    "r,g,b" triplet      → rgba(var(--accent-rgb), 0.3)
 *
 * Server component — no client JS. One line per product page:
 *   <ProductTheme product="schedule"> … </ProductTheme>
 */
export default function ProductTheme({
  product,
  className = "",
  children,
}: {
  product: ProductKey;
  className?: string;
  children: ReactNode;
}) {
  const p = products[product];
  return (
    <div
      className={className}
      style={
        {
          "--accent": p.accent,
          "--accent-vivid": p.accentVivid,
          "--accent-tint": p.accentTint,
          "--accent-rgb": p.rgb,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
