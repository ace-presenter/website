import Link from "next/link";
import type { ReactNode } from "react";
import { products, type ProductKey } from "@/lib/brand";

/**
 * ComingSoonCard — dimmed sibling of ProductCard for Manager / World.
 * Links to the product's teaser page; badge instead of arrow.
 */
export default function ComingSoonCard({
  product,
  name,
  tagline,
  href,
}: {
  product: ProductKey;
  name: string;
  tagline: ReactNode;
  href: string;
}) {
  const p = products[product];
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 opacity-75 transition hover:border-white/15 hover:opacity-100"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: p.accent }}
          />
          <h3 className="text-lg font-bold text-white">{name}</h3>
        </div>
        <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#999]">
          Soon
        </span>
      </div>
      <p className="text-sm leading-relaxed text-[#888]">{tagline}</p>
      <span className="mt-auto pt-5 text-sm font-semibold text-[#777] transition group-hover:text-white">
        Preview &amp; waitlist →
      </span>
    </Link>
  );
}
