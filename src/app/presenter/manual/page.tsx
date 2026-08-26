import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HorizonGlow from "@/components/hero/HorizonGlow";
import ManualNav from "./ManualNav";
import { MANUAL_HTML, MANUAL_NAV } from "./manual.generated";

export const metadata: Metadata = {
  title: "User Manual",
  description:
    "The complete ACE Presenter user manual for macOS and Windows — building services, scripture, auto-follow detection, media, outputs, streaming, and the phone remote.",
  alternates: { canonical: "/presenter/manual" },
};

export default function ManualPage() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />

      {/* Header — horizon band, matching the rest of the site */}
      <section className="relative overflow-hidden border-b border-[#1A1A1A] px-6 pb-14 pt-20 sm:px-10 sm:pt-24">
        <HorizonGlow strength={0.6} />
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#C8102E]" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#888]">
              ACE · Presenter
            </span>
          </div>
          <h1 className="font-serif text-5xl leading-[1.04] sm:text-6xl">User Manual</h1>
          <p className="mt-5 max-w-2xl text-lg text-[#B9B6B4]">
            The complete reference for ACE Presenter on macOS and Windows —
            building services, scripture, auto-follow detection, media, outputs,
            streaming, and the phone remote. 11 chapters and 3 appendices.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/ACE-Presenter-Manual.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-[#C8102E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E8183A]"
            >
              Download PDF
            </a>
            <a
              href="#sec-01-getting-started"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40"
            >
              Start reading →
            </a>
          </div>
        </div>
      </section>

      {/* Manual body — sticky TOC rail + server-rendered chapters */}
      <div className="manual-shell">
        <ManualNav items={MANUAL_NAV} />
        <article className="manual" dangerouslySetInnerHTML={{ __html: MANUAL_HTML }} />
      </div>

      <Footer />
    </main>
  );
}
