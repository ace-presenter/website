import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Per-product plans or a suite bundle. ACE Presenter, Schedule Manager, and Editors' Notes — free to start, fair to grow.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />
      <PricingHero />
      <ProductPricing />
      <SuiteBundle />
      <FAQ />
      <Footer />
    </main>
  );
}

function PricingHero() {
  return (
    <section className="px-6 sm:px-10 pt-20 sm:pt-28 pb-16 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">Pricing</div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-5 text-white">
          Free to start.{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">Fair</span>{" "}
          to grow.
        </h1>
        <p className="text-[#C4C4C4] text-lg max-w-xl mx-auto">
          Per-product plans or a suite bundle. One account covers every product.
        </p>
      </div>
    </section>
  );
}

function ProductPricing() {
  const products = [
    {
      name: "ACE Manager",
      href: "/manager",
      id: "manager",
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/ month",
          primary: true,
          features: ["Up to 50 members", "1 department", "Service planning", "Email communication", "Basic attendance tracking"],
        },
        {
          name: "Church",
          price: "$29",
          period: "/ month",
          features: ["Unlimited members", "Unlimited departments", "AI agent — tasks, follow-ups, reports", "Email + SMS + WhatsApp", "Weekly AI digest", "Volunteer engagement scoring"],
        },
        {
          name: "Network",
          price: "$79",
          period: "/ month",
          features: ["Everything in Church", "Multi-campus / multi-site", "Admin console with role hierarchy", "Priority support + onboarding call", "Custom domain for member portal"],
        },
      ],
    },
    {
      name: "ACE Presenter",
      href: "/presenter",
      tiers: [
        {
          name: "Beta",
          price: "Free",
          period: "until Day 90",
          badge: "Available now",
          primary: true,
          features: ["Full feature access", "All output formats", "Auto-updates", "Grandfathered to Standard for life"],
        },
        {
          name: "Standard",
          price: "$19",
          period: "/ month",
          features: ["Bundled API access (ACR · Whisper · Claude)", "Priority detection updates", "Email support", "Single-seat license"],
        },
        {
          name: "Pro",
          price: "$39",
          period: "/ month",
          features: ["Everything in Standard", "Multi-seat (up to 5)", "Priority support + onboarding call", "Sponsor early-access features"],
        },
      ],
    },
    {
      name: "ACE Schedule Manager",
      href: "/schedule",
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/ month",
          primary: true,
          features: ["Weekly schedule", "Custom categories (10)", "Cloud sync", "Google Calendar"],
        },
        {
          name: "Pro",
          price: "$7.99",
          period: "/ month",
          features: ["Everything in Free", "AI schedule import", "Daily AI guidance", "Unlimited Kanban projects", "Milestones", "Weekly CSV export"],
        },
      ],
    },
    {
      name: "ACE Editors' Notes",
      href: "/editors-notes",
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "forever",
          primary: true,
          features: ["Full note-taking", "DaVinci Resolve integration", "Clickable timecodes", "PDF/print export", "Sparkle auto-update"],
        },
      ],
    },
    {
      name: "ACE Virtual World",
      href: "/world",
      id: "world",
      tiers: [
        {
          name: "Early access",
          price: "Soon",
          period: "in development",
          badge: "In development",
          features: ["Shared 3D venue", "Live stage feed", "Spatial voice", "Desktop + WebXR / VR", "Producer-driven cues"],
        },
      ],
    },
  ] as const;

  return (
    <section className="px-6 sm:px-10 py-16 border-y border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto space-y-16">
        {products.map((product) => (
          <div key={product.name}>
            <div className="flex items-center gap-3 mb-6">
              <Link href={product.href} className="text-xl font-bold text-white hover:text-[#C8102E] transition">
                {product.name}
              </Link>
              <span className="h-px flex-1 bg-[#1F1F1F]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {product.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`p-7 rounded-2xl relative ${
                    "primary" in tier && tier.primary
                      ? "bg-gradient-to-b from-[#C8102E]/15 to-[#1A1A1A] border border-[#C8102E]/40"
                      : "bg-[#141414] border border-[#222]"
                  }`}
                >
                  {"badge" in tier && tier.badge && (
                    <div className="absolute -top-2.5 left-7 px-2.5 py-0.5 rounded-full bg-[#C8102E] text-white text-[10px] uppercase tracking-wider font-bold">
                      {tier.badge}
                    </div>
                  )}
                  <div className="text-sm font-bold uppercase tracking-wider text-[#C4C4C4] mb-3">{tier.name}</div>
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-4xl font-bold text-white tracking-tight">{tier.price}</span>
                    <span className="text-[#C4C4C4] text-sm">{tier.period}</span>
                  </div>
                  <ul className="space-y-2.5 text-sm text-[#D4D4D4]">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-[#C8102E] mt-0.5">✓</span>
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SuiteBundle() {
  return (
    <section className="px-6 sm:px-10 py-20 border-b border-[#1A1A1A]">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">Suite bundle</div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
          The whole suite.{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
            One subscription.
          </span>
        </h2>
        <p className="text-[#C4C4C4] text-lg mb-8 max-w-xl mx-auto">
          The suite bundle is coming soon. Get access to ACE Presenter Pro, Schedule Pro, Editors&apos; Notes, and ACE Manager Church — one account, one bill, one license key.
        </p>
        <a
          href="mailto:hello@ace-presenter.app?subject=ACE%20Suite%20Bundle"
          className="inline-block px-7 py-3.5 rounded-full bg-[#C8102E] hover:bg-[#E8183A] text-white font-bold text-sm transition"
        >
          Register interest →
        </a>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Does one ACE account work across the suite?", a: "Yes. Sign in once at ace-presenter.app. Your license covers the products you have access to — Presenter, Schedule Manager, and Editors' Notes today, with Manager and Virtual World joining as they ship." },
    { q: "What happens to my beta access when Day 90 arrives?", a: "Every beta user of ACE Presenter is grandfathered into the Standard tier for life — no charge, no action required." },
    { q: "Is Editors' Notes really free?", a: "Yes. The app is free to download and use, including the DaVinci Resolve integration. Future Pro features (AI note summarization, team sharing) will be optional paid add-ons." },
    { q: "Do I need an API key to use AI features?", a: "No. On paid tiers, AI calls route through the ACE gateway using pooled API access. You never need to bring your own Anthropic, ACR, or Deepgram key." },
    { q: "Students and nonprofits?", a: "Schedule Manager Pro is 50% off for students and registered nonprofits. Email hello@ace-presenter.app with proof and we'll apply the discount." },
  ];
  return (
    <section className="px-6 sm:px-10 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-8 text-center">FAQ</div>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-[#1F1F1F] pb-6 last:border-0">
              <div className="font-semibold text-white mb-2">{faq.q}</div>
              <div className="text-[#C4C4C4] text-sm leading-relaxed">{faq.a}</div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-[#888]">
          More questions? <Link href="/support" className="text-[#C8102E] hover:text-[#E8183A] transition">Get in touch →</Link>
        </p>
      </div>
    </section>
  );
}
