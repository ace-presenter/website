import Link from "next/link";
import type { ReactNode } from "react";
import { ScrollReveal, Parallax, ProductTheme } from "@/components/motion";
import { products, type ProductKey } from "@/lib/brand";
import { AccentItalic } from "./SectionHeading";

/**
 * ProductShowcase — the ProPresenter-style alternating feature row.
 *
 * A large framed product visual on one side, headline + copy + feature list +
 * link on the other; direction alternates per row via `flip`. The visual sits
 * over a per-product accent glow so each row has its own colour temperature —
 * the rhythm that keeps the page from reading as one flat black void.
 */
export default function ProductShowcase({
  product,
  name,
  headline,
  body,
  features,
  href,
  cta = "Explore",
  visual,
  flip = false,
}: {
  product: ProductKey;
  name: string;
  /** Headline node — wrap one word in <AccentItalic> for the signature. */
  headline: ReactNode;
  body: ReactNode;
  features: string[];
  href: string;
  cta?: string;
  /** The framed visual (an <Image>, mockup component, etc). */
  visual: ReactNode;
  /** When true, the visual sits on the right (odd rows). */
  flip?: boolean;
}) {
  const p = products[product];
  return (
    <ProductTheme product={product}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <ScrollReveal className={flip ? "lg:order-2" : ""}>
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: p.accent, boxShadow: `0 0 12px ${p.accent}` }}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#999]">
              {name}
            </span>
          </div>
          <h3 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {headline}
          </h3>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#B4B4B4] sm:text-lg">
            {body}
          </p>
          <ul className="mt-7 grid gap-2.5">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-[#D4D4D4]">
                <span className="mt-0.5 text-[var(--accent-vivid)]">✓</span>
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href={href}
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:gap-3"
            style={{ color: p.accentVivid }}
          >
            {cta} {name}
            <span aria-hidden>→</span>
          </Link>
        </ScrollReveal>

        {/* Visual */}
        <div className={flip ? "lg:order-1" : ""}>
          <Parallax distance={36}>
            <div className="relative">
              {/* Accent glow bloom behind the frame */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] blur-2xl"
                style={{
                  background: `radial-gradient(60% 60% at 50% 45%, rgba(${p.rgb}, 0.28), transparent 75%)`,
                }}
              />
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D] shadow-[0_32px_90px_-28px_rgba(0,0,0,0.8)]">
                {visual}
              </div>
            </div>
          </Parallax>
        </div>
      </div>
    </ProductTheme>
  );
}
