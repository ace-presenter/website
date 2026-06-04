import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import { Aurora, ScrollReveal as Reveal, ScrollStagger as Stagger, ScrollItem as Item, SpotlightCard } from "@/components/motion";
import ScheduleFeatureWalk from "@/components/ScheduleFeatureWalk";

const GLOW = "rgba(105,65,198,0.14)";

export const metadata: Metadata = {
  title: "ACE Schedule Manager",
  description:
    "AI-powered schedule and routine management. Photograph a syllabus, extract tasks in one step. Daily AI guidance. Cloud-synced. Part of the ACE Suite.",
  alternates: { canonical: "/schedule" },
};

const FEATURES = [
  {
    tag: "AI import",
    title: "Photograph a syllabus. Get a schedule.",
    body: "Point your camera at a whiteboard, printed syllabus, or handwritten plan. ACE extracts tasks, deadlines, and categories — no manual entry.",
  },
  {
    tag: "Daily guidance",
    title: "The day starts with a plan.",
    body: "AI-generated daily guidance: motivational prompts, scripture reflections, and brain exercises. Configurable per user.",
  },
  {
    tag: "Kanban projects",
    title: "Projects and milestones.",
    body: "Full Kanban board with milestones and custom categories. Pro tier. Syncs to your week view automatically.",
  },
  {
    tag: "End-of-day",
    title: "The ceremony at the end of the day.",
    body: "Reflection prompts and tomorrow's intention. Keeps the loop closed so the next day starts with focus, not noise.",
  },
  {
    tag: "Cloud sync",
    title: "Everything, everywhere.",
    body: "Supabase-backed sync. Email and Google auth. Access from the web app or the desktop shell — your data follows you.",
  },
  {
    tag: "Google Calendar",
    title: "Connected to your calendar.",
    body: "Two-way Google Calendar sync. Tasks become events. Events appear in your schedule view. One source of truth.",
  },
];

export default function SchedulePage() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav activeProduct="schedule" />
      <Hero />
      <ScheduleFeatureWalk />
      <Features />
      <UseCases />
      <PricingTeaser />
      <FinalCTA variant="schedule" />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative px-6 sm:px-10 pt-20 sm:pt-32 pb-24 text-center overflow-hidden">
      <Aurora colors={["105,65,198"]} intensity={0.26} />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(70% 50% at 50% 0%, rgba(105,65,198,0.22) 0%, rgba(105,65,198,0.06) 40%, rgba(105,65,198,0) 70%)" }}
      />
      <div className="relative max-w-5xl mx-auto">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[10px] uppercase tracking-[0.25em] text-[#C4C4C4] font-semibold mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6941C6]" />
            ACE · Schedule Manager
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-white">
            Build the schedule.
            <br />
            <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#8B68D6]">Run</span>{" "}
            the day.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-[#C4C4C4] leading-relaxed">
            AI-powered routine and task management. Photograph your plan, schedule your week, close the day with intention.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://app.ace-presenter.app/auth"
              className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition shadow-[0_10px_40px_rgba(255,255,255,0.12)] hover:scale-[1.03] active:scale-100"
            >
              Start using ACE Schedule
            </a>
            <a
              href="/api/download?product=schedule"
              className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm transition border border-[#2A2A2A] hover:scale-[1.03] active:scale-100"
            >
              Download for Mac
            </a>
            <Link
              href="/pricing"
              className="px-6 py-3.5 rounded-full text-[#888] hover:text-white font-semibold text-sm transition"
            >
              View pricing
            </Link>
          </div>
          <p className="mt-5 text-xs text-[#888]">Free to start · Web + desktop · macOS universal · Part of the ACE Suite</p>
        </Reveal>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="px-6 sm:px-10 py-24 border-y border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#6941C6] font-bold mb-3">Capabilities</div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-12 text-white max-w-2xl">
            What Schedule Manager{" "}
            <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#8B68D6]">actually does</span>
          </h2>
        </Reveal>
        <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-4" stagger={0.09}>
          {FEATURES.map((f) => (
            <Item key={f.tag}>
              <SpotlightCard glow={GLOW} className="h-full rounded-2xl">
                <div className="h-full p-6 rounded-2xl bg-[#141414] border border-[#222] hover:border-[#6941C6]/50 transition-colors">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6941C6]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#6941C6] font-bold">{f.tag}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">{f.title}</h3>
                  <p className="text-[#C4C4C4] text-sm leading-relaxed">{f.body}</p>
                </div>
              </SpotlightCard>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="px-6 sm:px-10 py-24 border-b border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#6941C6] font-bold mb-3">Use cases</div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-12 text-white max-w-2xl">
            For anyone who runs a{" "}
            <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#8B68D6]">schedule</span>
          </h2>
        </Reveal>
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-6" stagger={0.12}>
          <Item>
            <div className="h-full p-7 rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#111] border border-[#222]">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#8B68D6] font-bold mb-3">Students</div>
              <h3 className="text-xl font-bold text-white mb-3">Photograph the syllabus. Done.</h3>
              <p className="text-[#C4C4C4] text-sm leading-relaxed">First week of semester: point your camera at every course outline. ACE extracts deadlines, assignments, and exams. The semester is in the schedule before the first class ends.</p>
            </div>
          </Item>
          <Item>
            <div className="h-full p-7 rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#111] border border-[#222]">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#8B68D6] font-bold mb-3">Event producers</div>
              <h3 className="text-xl font-bold text-white mb-3">The week has a shape. Use it.</h3>
              <p className="text-[#C4C4C4] text-sm leading-relaxed">Plan the service, conference, or show day-by-day. Milestones on the Kanban board map to execution tasks in the schedule. Nothing falls through the gap between planning and execution.</p>
            </div>
          </Item>
        </Stagger>
      </div>
    </section>
  );
}

function PricingTeaser() {
  return (
    <section className="px-6 sm:px-10 py-20 border-b border-[#1A1A1A] bg-[#0A0A0A]">
      <Reveal className="max-w-4xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#6941C6] font-bold mb-3 text-center">Pricing</div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 text-white text-center">
          Free to start. AI included on{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#8B68D6]">Pro</span>.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#6941C6]/15 to-[#1A1A1A] border border-[#6941C6]/40">
            <div className="text-sm font-bold uppercase tracking-wider text-[#C4C4C4] mb-3">Free</div>
            <div className="flex items-baseline gap-1.5 mb-5"><span className="text-4xl font-bold text-white">$0</span><span className="text-[#C4C4C4] text-sm">/ month</span></div>
            <ul className="space-y-2 text-sm text-[#D4D4D4]">
              {["Weekly schedule", "Custom categories (10)", "Cloud sync", "Google Calendar"].map((f) => (
                <li key={f} className="flex items-start gap-2"><span className="text-[#6941C6] mt-0.5">✓</span><span>{f}</span></li>
              ))}
            </ul>
          </div>
          <div className="p-7 rounded-2xl bg-[#141414] border border-[#222]">
            <div className="text-sm font-bold uppercase tracking-wider text-[#C4C4C4] mb-3">Pro</div>
            <div className="flex items-baseline gap-1.5 mb-5"><span className="text-4xl font-bold text-white">$12</span><span className="text-[#C4C4C4] text-sm">/ month</span></div>
            <ul className="space-y-2 text-sm text-[#D4D4D4]">
              {["Everything in Free", "AI schedule import (included)", "Daily AI guidance (included)", "Unlimited Kanban projects", "Milestones", "Weekly CSV export"].map((f) => (
                <li key={f} className="flex items-start gap-2"><span className="text-[#6941C6] mt-0.5">✓</span><span>{f}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-center text-sm text-[#888]">Annual plan: $96/yr (2 months free) · Ministry &amp; education discounts available · <Link href="/pricing" className="text-[#6941C6] hover:text-[#8B68D6] transition">Suite pricing →</Link></p>
      </Reveal>
    </section>
  );
}
