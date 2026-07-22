import Link from "next/link";
import type { ReactNode } from "react";
import MagneticButton from "@/components/MagneticButton";
import HorizonGlow from "@/components/hero/HorizonGlow";
import { ProductTheme, ScrollReveal } from "@/components/motion";
import { products, type ProductKey } from "@/lib/brand";

/**
 * CTABand — the closing section of every marketing page. Giant centered
 * headline over a quiet horizon arc (starless), magnetic primary CTA.
 * Replaces FinalCTA.
 */
export default function CTABand({
  product,
  eyebrow,
  title,
  sub,
  primary,
  secondary,
}: {
  product?: ProductKey;
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  const rgb = product ? products[product].rgb : products.presenter.rgb;
  const inner = (
    <section className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-36">
      <HorizonGlow stars={false} strength={0.7} />
      <ScrollReveal className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        {eyebrow && (
          <span className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-[#888]">
            {eyebrow}
          </span>
        )}
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {title}
        </h2>
        {sub && (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#B4B4B4] sm:text-lg">
            {sub}
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          <MagneticButton
            href={primary.href}
            glowRgb={rgb}
            className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-colors hover:bg-[#E8E8E8]"
          >
            {primary.label}
          </MagneticButton>
          {secondary && (
            <Link
              href={secondary.href}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[var(--accent-vivid,#E8183A)]"
            >
              {secondary.label}
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          )}
        </div>
      </ScrollReveal>
    </section>
  );

  return product ? <ProductTheme product={product}>{inner}</ProductTheme> : inner;
}
