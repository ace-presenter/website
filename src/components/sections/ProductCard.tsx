import Link from "next/link";
import type { ReactNode } from "react";
import { SpotlightCard } from "@/components/motion";
import { products, type ProductKey } from "@/lib/brand";

/**
 * ProductCard — a live product on the Home suite grid. Accent-tinted glass,
 * cursor spotlight in the product's own colour, arrow link.
 */
export default function ProductCard({
  product,
  name,
  tagline,
  href,
  visual,
}: {
  product: ProductKey;
  name: string;
  tagline: ReactNode;
  href: string;
  visual?: ReactNode;
}) {
  const p = products[product];
  return (
    <SpotlightCard glow={`rgba(${p.rgb}, 0.14)`} className="h-full rounded-2xl">
      <Link
        href={href}
        className="group flex h-full flex-col rounded-2xl border border-white/10 p-6 transition hover:border-white/20"
        style={{
          background: `linear-gradient(155deg, ${p.accentTint} 0%, rgba(255,255,255,0.03) 55%)`,
        }}
      >
        <div className="mb-4 flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: p.accent, boxShadow: `0 0 10px ${p.accent}` }}
          />
          <h3 className="text-lg font-bold text-white">{name}</h3>
        </div>
        {visual && <div className="mb-4">{visual}</div>}
        <p className="text-sm leading-relaxed text-[#A8A8A8]">{tagline}</p>
        <span
          className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold transition group-hover:gap-2.5"
          style={{ color: p.accentVivid }}
        >
          Explore {name}
          <span aria-hidden>→</span>
        </span>
      </Link>
    </SpotlightCard>
  );
}
