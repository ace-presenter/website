import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PricingTable from "@/components/PricingTable";
import HorizonGlow from "@/components/hero/HorizonGlow";
import { ScrollReveal, ScrollStagger, ScrollItem, SuiteAccent } from "@/components/motion";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "ACE Presenter, Schedule Manager and Editors' Notes — each with its own plans. Free to start, fair to grow. One-time and subscription options.",
  alternates: { canonical: "/pricing" },
};

const SERIF = "font-[family-name:var(--font-instrument-serif)] italic font-normal";

export default function PricingPage() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <SuiteAccent />
      <div className="relative z-10 flex flex-1 flex-col">
        <Nav />
        <PricingHero />
        <PricingTable />
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
      className="relative overflow-hidden px-6 sm:px-10 pt-24 sm:pt-32 pb-16 text-center"
    >
      <HorizonGlow strength={0.5} />
      <ScrollReveal className="relative z-10 max-w-3xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">Pricing</div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 text-white leading-[0.97]">
          Free to start.{" "}
          <span className={`${SERIF} text-[#E8183A]`}>Fair</span>{" "}
          to grow.
        </h1>
        <p className="text-[#C4C4C4] text-lg max-w-xl mx-auto">
          Pay once or subscribe — your call. One account covers every product.
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
      a: "Presenter and Editors' Notes can be bought once as a perpetual license (you own that major version, with a year of updates), or subscribed to for the always-latest version. Schedule Manager is a subscription.",
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
