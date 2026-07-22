import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PricingTable from "@/components/PricingTable";
import HorizonGlow from "@/components/hero/HorizonGlow";
import { ScrollReveal, ScrollStagger, ScrollItem } from "@/components/motion";
import { SUITE_BUNDLE, checkoutHref } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Per-product plans or one suite subscription. ACE Presenter, Schedule Manager, Editors' Notes, Manager, and World — free to start, fair to grow. One-time and subscription options.",
  alternates: { canonical: "/pricing" },
};

const SERIF = "font-[family-name:var(--font-instrument-serif)] italic font-normal";

export default function PricingPage() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />
      <PricingHero />
      <PricingTable />
      <SuiteBundle />
      <FAQ />
      <Footer />
    </main>
  );
}

function PricingHero() {
  return (
    <section className="relative overflow-hidden px-6 sm:px-10 pt-24 sm:pt-32 pb-16 text-center">
      <HorizonGlow strength={0.5} />
      <ScrollReveal className="relative z-10 max-w-3xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">Pricing</div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 text-white leading-[0.97]">
          Free to start.{" "}
          <span className={`${SERIF} text-[#E8183A]`}>Fair</span>{" "}
          to grow.
        </h1>
        <p className="text-[#C4C4C4] text-lg max-w-xl mx-auto">
          Pay once or subscribe — your call. One account covers every product, and
          beta testers are grandfathered in for life.
        </p>
      </ScrollReveal>
    </section>
  );
}

function SuiteBundle() {
  return (
    <section className="px-6 sm:px-10 py-28 border-b border-[#1A1A1A]">
      <ScrollReveal className="max-w-3xl mx-auto text-center">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">Suite bundle</div>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-5 text-white">
          The whole suite.{" "}
          <span>One subscription.</span>
        </h2>
        <div className="flex items-baseline justify-center gap-2 mb-2">
          <span className="text-5xl font-bold text-white tracking-tight">${SUITE_BUNDLE.monthlyUSD}</span>
          <span className="text-[#C4C4C4]">/ mo</span>
          <span className="text-[#666] mx-2">·</span>
          <span className="text-2xl font-bold text-white tracking-tight">${SUITE_BUNDLE.annualUSD}</span>
          <span className="text-[#C4C4C4]">/ yr</span>
        </div>
        <p className="text-[#888] text-sm mb-8">Everything, always the latest — cheaper than buying the pieces.</p>

        <ScrollStagger className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-10 text-left" stagger={0.06}>
          {SUITE_BUNDLE.features.map((f) => (
            <ScrollItem key={f}>
              <div className="flex items-start gap-2 text-sm text-[#D4D4D4]">
                <span className="text-[#E8183A] mt-0.5">✓</span>
                <span className="leading-relaxed">{f}</span>
              </div>
            </ScrollItem>
          ))}
        </ScrollStagger>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={checkoutHref("suite", "bundle", "year")}
            className="px-7 py-3.5 rounded-full bg-[#C8102E] hover:bg-[#E8183A] text-white font-bold text-sm transition-colors"
          >
            Get the suite — ${SUITE_BUNDLE.annualUSD}/yr
          </a>
          <a
            href={checkoutHref("suite", "bundle", "month")}
            className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm transition border border-[#2A2A2A]"
          >
            Monthly — ${SUITE_BUNDLE.monthlyUSD}/mo
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Does one ACE account work across the suite?",
      a: "Yes. Sign in once at ace-presenter.app. Your license covers the products you own — buy them individually or get everything with the suite bundle.",
    },
    {
      q: "One-time or subscription — what's the difference?",
      a: "Presenter and Editors' Notes can be bought once as a perpetual license (you own that major version, with a year of updates), or subscribed to for the always-latest version. Schedule Manager and the suite bundle are subscriptions.",
    },
    {
      q: "What happens to my beta access?",
      a: "Every beta tester is grandfathered into the paid Standard tier for life — no charge, no action required.",
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
