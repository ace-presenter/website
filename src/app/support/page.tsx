import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HorizonGlow from "@/components/hero/HorizonGlow";
import { SpotlightCard, ScrollStagger, ScrollItem } from "@/components/motion";
import { AccentItalic, CTABand } from "@/components/sections";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with ACE — the user guide, email support, common issues, and beta feedback. Built and supported by a small team that replies fast.",
  alternates: { canonical: "/support" },
};

export default function Support() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />

      {/* Header — slim horizon band */}
      <section className="relative overflow-hidden border-b border-[#1A1A1A] px-6 pb-16 pt-20 sm:px-10 sm:pt-24">
        <HorizonGlow strength={0.6} />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C8102E]" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#888]">
              Help
            </span>
            <span className="h-px w-8 bg-[#C8102E]" aria-hidden />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            How can we <AccentItalic>help</AccentItalic>?
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#C4C4C4]">
            ACE is built and supported by a small team. We read every email and
            reply within 24 hours during launch — usually faster.
          </p>
        </div>
      </section>

      {/* Help cards */}
      <section className="px-6 py-20 sm:px-10">
        <ScrollStagger className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.1}>
          <ScrollItem>
            <SpotlightCard className="glass-card h-full rounded-2xl">
              <Link href="/learn" className="group flex h-full flex-col p-7">
                <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
                  Start here
                </div>
                <h2 className="mb-2 text-xl font-bold text-white">The user guide</h2>
                <p className="text-sm leading-relaxed text-[#C4C4C4]">
                  Most setup and operation questions are answered in Learn — from
                  install to running your first service. Skim it once before your
                  first Sunday.
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[#E8183A] transition group-hover:gap-2.5">
                  Open Learn <span aria-hidden>→</span>
                </span>
              </Link>
            </SpotlightCard>
          </ScrollItem>

          <ScrollItem>
            <SpotlightCard className="glass-card h-full rounded-2xl">
              <div className="flex h-full flex-col p-7">
                <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
                  Email
                </div>
                <h2 className="mb-2 text-xl font-bold text-white">Talk to a human</h2>
                <p className="text-sm leading-relaxed text-[#C4C4C4]">
                  For bugs, feature requests, or anything technical:
                </p>
                <a
                  href="mailto:hello@ace-presenter.app"
                  className="mt-auto inline-block pt-5 text-sm font-semibold text-[#E8183A] transition hover:text-white"
                >
                  hello@ace-presenter.app
                </a>
              </div>
            </SpotlightCard>
          </ScrollItem>

          <ScrollItem>
            <SpotlightCard className="glass-card h-full rounded-2xl">
              <div className="flex h-full flex-col p-7">
                <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
                  Common issues
                </div>
                <h2 className="mb-3 text-xl font-bold text-white">Quick fixes</h2>
                <ul className="space-y-2.5 text-sm leading-relaxed text-[#C4C4C4]">
                  <li>
                    <strong className="text-white">Audio device not detected:</strong>{" "}
                    quit ACE, unplug + replug the interface, relaunch.
                  </li>
                  <li>
                    <strong className="text-white">Detection seems stuck:</strong>{" "}
                    click the Re-Identify button in the toolbar to reset.
                  </li>
                  <li>
                    <strong className="text-white">Wrong song matched:</strong>{" "}
                    add it to your library first via Genius import or paste lyrics.
                  </li>
                </ul>
              </div>
            </SpotlightCard>
          </ScrollItem>

          <ScrollItem>
            <SpotlightCard className="glass-card h-full rounded-2xl">
              <div className="flex h-full flex-col p-7">
                <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
                  Beta feedback
                </div>
                <h2 className="mb-2 text-xl font-bold text-white">Found a bug?</h2>
                <p className="text-sm leading-relaxed text-[#C4C4C4]">
                  ACE is in public beta. Screenshots and the log file from{" "}
                  <code className="rounded border border-[#2A2A2A] bg-[#0F0F0F] px-1.5 py-0.5 text-white">
                    ~/Library/Logs/ACE/
                  </code>{" "}
                  help us fix it fast.
                </p>
              </div>
            </SpotlightCard>
          </ScrollItem>
        </ScrollStagger>
      </section>

      <CTABand
        eyebrow="Still stuck?"
        title="Email us. We reply fast."
        primary={{ href: "mailto:hello@ace-presenter.app", label: "hello@ace-presenter.app" }}
        secondary={{ href: "/learn", label: "Read the guide" }}
      />
      <Footer />
    </main>
  );
}
