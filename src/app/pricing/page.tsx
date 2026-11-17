import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PricingTable from "@/components/PricingTable";
import PresenterPlanComparison from "@/components/PresenterPlanComparison";
import ShaderStage from "@/components/spatial/ShaderStage";
import { ScrollReveal, ScrollStagger, ScrollItem, SuiteAccent } from "@/components/motion";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "ACE Presenter, Schedule Manager and Editors' Notes — each with its own plans. Free to start, fair to grow.",
  alternates: { canonical: "/pricing" },
};

const SERIF = "font-[family-name:var(--font-instrument-serif)] italic font-normal";

export default function PricingPage() {
  return (
    <main className="flex flex-1 flex-col bg-[#09090B] font-sans">
      <SuiteAccent />
      <div className="relative z-10 flex flex-1 flex-col">
        <Nav />
        <PricingHero />
        <PricingTable />
        <PresenterPlanComparison />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}

function PricingHero() {
  return (
    <section
      data-accent-rgb="200,16,46"
      className="relative isolate overflow-hidden px-6 sm:px-10 pt-24 sm:pt-32 pb-20 text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full"
        style={{ background: "radial-gradient(60% 70% at 50% 0%, rgba(200,16,46,0.3), transparent 75%)" }}
      />
      <ShaderStage pulse={0} horizon={0.22} />
      <ScrollReveal className="relative z-10 max-w-3xl mx-auto">
        <span className="ace-glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B4F]" /> Pricing · 3.0
        </span>
        <h1 className="mt-6 text-5xl sm:text-7xl font-bold tracking-[-0.04em] text-white leading-[0.97]">
          Free to start.{" "}
          <span className={`${SERIF} text-[#FF4D5E]`}>Fair</span>{" "}
          to grow.
        </h1>
        <p className="mt-6 text-[#B8B8BE] text-lg max-w-xl mx-auto">
          One account covers every product. Each product has its own plans, with no surprise costs.
        </p>
      </ScrollReveal>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Does one ACE account work across the products?",
      a: "Yes. Sign in once at ace-presenter.app. Your license covers the products you own, and each product has its own plan.",
    },
    {
      q: "One-time or subscription — what's the difference?",
      a: "Editors' Notes can be bought once as a perpetual license (you own that version, with a year of updates). ACE Presenter and Schedule Manager have a free plan and subscriptions, monthly or yearly.",
    },
    {
      q: "Do I need an API key for AI features?",
      a: "No. On paid tiers, AI calls route through the ACE gateway using pooled access — you never bring your own Anthropic, ACR, or Deepgram key.",
    },
    {
      q: "Discounts for students, ministries, and nonprofits?",
      a: "Yes — ministry and education discounts are available. Email hello@ace-presenter.app with proof and we'll apply it.",
    },
  ];
  return (
    <section className="px-6 sm:px-10 py-24">
      {/* FAQPage structured data — eligible for Google's FAQ rich result. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-10 text-center">FAQ</div>
        </ScrollReveal>
        <ScrollStagger className="space-y-6" stagger={0.07}>
          {faqs.map((faq) => (
            <ScrollItem key={faq.q}>
              <div className="border-b border-[#1F1F1F] pb-6">
                <div className="font-semibold text-white mb-2">{faq.q}</div>
                <div className="text-[#C4C4C4] text-sm leading-relaxed">{faq.a}</div>
              </div>
            </ScrollItem>
          ))}
        </ScrollStagger>
        <p className="mt-10 text-center text-sm text-[#888]">
          More questions?{" "}
          <Link href="/support" className="text-[#C8102E] hover:text-[#E8183A] transition">
            Get in touch →
          </Link>
        </p>
      </div>
    </section>
  );
}
