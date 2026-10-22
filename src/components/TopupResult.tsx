import type { ReactNode } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HorizonGlow from "@/components/hero/HorizonGlow";

/**
 * The page Stripe Checkout returns to after a top-up pack — Ask ACE drafts or
 * cloud-detection minutes (the gateway's /v1/billing/*-topup success_url and
 * cancel_url). The buyer came from the app, so the page only says what
 * happened and sends them back to it.
 */
export default function TopupResult({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />
      <section className="relative flex-1 overflow-hidden px-6 pb-24 pt-20 sm:px-10 sm:pt-28">
        <HorizonGlow strength={0.6} />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C8102E]" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#888]">
              {eyebrow}
            </span>
            <span className="h-px w-8 bg-[#C8102E]" aria-hidden />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
          <div className="mx-auto mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-[#C4C4C4]">
            {children}
          </div>
          <p className="mt-10 text-sm text-[#888]">
            Questions?{" "}
            <Link href="/support" className="font-semibold text-[#E8183A] transition hover:text-white">
              Get help
            </Link>{" "}
            or write to{" "}
            <a
              href="mailto:hello@ace-presenter.app"
              className="font-semibold text-[#E8183A] transition hover:text-white"
            >
              hello@ace-presenter.app
            </a>
            .
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
