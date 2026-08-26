import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HorizonGlow from "@/components/hero/HorizonGlow";
import { ProductTheme } from "@/components/motion";
import ManualNav from "@/components/manual/ManualNav";
import { products, type ProductKey } from "@/lib/brand";
import type { ManualNavItem } from "@/components/manual/ManualNav";

/**
 * Shared renderer for a product's in-site manual — hero + sticky TOC rail +
 * server-rendered chapters, coloured by the product's accent. The chapter HTML
 * and nav come from that product's generated module (content/manuals/<key>).
 */
export default function ProductManualPage({
  productKey,
  productLabel,
  kicker,
  lede,
  nav,
  html,
  pdfHref,
  firstSectionId,
}: {
  productKey: ProductKey;
  productLabel: string;
  kicker: string;
  lede: string;
  nav: ManualNavItem[];
  html: string;
  pdfHref?: string;
  firstSectionId?: string;
}) {
  const brand = products[productKey];
  const startId = firstSectionId ?? nav[1]?.id ?? nav[0]?.id;
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />

      <section className="relative overflow-hidden border-b border-[#1A1A1A] px-6 pb-14 pt-20 sm:px-10 sm:pt-24">
        <HorizonGlow strength={0.6} />
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8" style={{ background: brand.accent }} aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#888]">
              {kicker}
            </span>
          </div>
          <h1 className="font-serif text-5xl leading-[1.04] sm:text-6xl">User Manual</h1>
          <p className="mt-5 max-w-2xl text-lg text-[#B9B6B4]">{lede}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {pdfHref ? (
              <a
                href={pdfHref}
                download
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition"
                style={{ background: brand.accent }}
              >
                Download PDF
              </a>
            ) : null}
            {startId ? (
              <a
                href={`#${startId}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40"
              >
                Start reading →
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <ProductTheme product={productKey}>
        <div className="manual-shell">
          <ManualNav items={nav} label={productLabel} />
          <article className="manual" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </ProductTheme>

      <Footer />
    </main>
  );
}
