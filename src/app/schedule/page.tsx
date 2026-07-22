import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import {
  ScrollReveal as Reveal,
  ScrollStagger as Stagger,
  ScrollItem as Item,
  SpotlightCard,
  ProductTheme,
} from "@/components/motion";
import {
  HeroShell,
  FloatingCard,
  SectionHeading,
  AccentItalic,
  FeatureBento,
  CTABand,
} from "@/components/sections";
import ScheduleFeatureWalk from "@/components/ScheduleFeatureWalk";

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
      <CTABand
        product="schedule"
        eyebrow="Get started"
        title={
          <>
            Build the schedule. <AccentItalic>Run</AccentItalic> the day.
          </>
        }
        sub="Free to start · Web + desktop · Part of the ACE Suite"
        primary={{ href: "https://app.ace-presenter.app/auth", label: "Start using Schedule" }}
        secondary={{ href: "/pricing", label: "View pricing" }}
      />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <HeroShell product="schedule" fill={false} floating={<HeroChips />}>
      <div className="mb-7 flex items-center gap-3">
        <span className="h-px w-8 bg-[#6941C6]" aria-hidden />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#888]">
          ACE · Schedule Manager
        </span>
        <span className="h-px w-8 bg-[#6941C6]" aria-hidden />
      </div>

      <h1 className="text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
        Build the schedule.
        <br />
        <AccentItalic>Run</AccentItalic> the day.
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#C4C4C4] sm:text-xl">
        AI-powered routine and task management. Photograph your plan, schedule
        your week, close the day with intention.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <MagneticButton
          href="https://app.ace-presenter.app/auth"
          glowRgb="105,65,198"
          className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition-colors hover:bg-[#E8E8E8]"
        >
          Start using ACE Schedule
        </MagneticButton>
        <a
          href="/api/download?product=schedule"
          className="rounded-full border border-[#2A2A2A] bg-[#1A1A1A]/70 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#222]"
        >
          Download for Mac
        </a>
        <Link
          href="/pricing"
          className="px-4 py-3.5 text-sm font-semibold text-[#888] transition hover:text-white"
        >
          View pricing
        </Link>
      </div>
      <p className="mt-5 text-xs text-[#888]">
        Free to start · Web + desktop · macOS universal · Part of the ACE Suite
      </p>

      {/* Real UI — the light app pops against the dark cosmic backdrop. */}
      <div className="relative mt-16 w-full max-w-5xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 -top-8 bottom-0 -z-10 rounded-[3rem] blur-3xl"
          style={{
            background:
              "radial-gradient(55% 60% at 50% 40%, rgba(105,65,198,0.32), transparent 78%)",
          }}
        />
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D] shadow-[0_40px_120px_-32px_rgba(0,0,0,0.85)]">
          <Image
            src="/schedule/my-tasks.webp"
            alt="ACE Schedule showing a weekly agenda, task board, and calendar"
            width={1600}
            height={1055}
            priority
            className="w-full"
          />
        </div>
      </div>
    </HeroShell>
  );
}

/* Floating chips — a day taking shape. */
function HeroChips() {
  return (
    <>
      <FloatingCard className="left-[5%] top-[24%] w-56 p-4" delay={-2} duration={8}>
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#888]">
          Today
        </div>
        <div className="mt-2.5 flex items-center gap-2.5 text-xs">
          <span className="font-mono text-[#8B68D6]">09:00</span>
          <span className="text-[#999] line-through">Soundcheck</span>
          <span className="ml-auto text-[#22C55E]">✓</span>
        </div>
        <div className="mt-2 flex items-center gap-2.5 text-xs">
          <span className="font-mono text-[#8B68D6]">10:00</span>
          <span className="font-semibold text-white">Service</span>
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#8B68D6]" />
        </div>
        <div className="mt-2 flex items-center gap-2.5 text-xs">
          <span className="font-mono text-[#8B68D6]">13:00</span>
          <span className="text-[#C4C4C4]">Debrief</span>
        </div>
      </FloatingCard>

      <FloatingCard className="right-[5%] top-[26%] w-52 p-4" delay={-5} duration={7}>
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#888]">
          AI import
        </div>
        <div className="mt-2 text-sm font-semibold text-white">Syllabus.jpg</div>
        <div className="mt-1.5 font-mono text-[10px] text-[#8B68D6]">
          → 14 tasks · 6 deadlines extracted
        </div>
      </FloatingCard>

      <FloatingCard className="bottom-[18%] right-[9%] w-44 p-4" delay={-3.5} duration={9}>
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#888]">
          End of day
        </div>
        <div className="mt-1.5 text-sm font-medium text-white">
          3 of 3 done <span className="text-[#22C55E]">·</span> intention set
        </div>
      </FloatingCard>
    </>
  );
}

function Features() {
  return (
    <ProductTheme product="schedule">
      <section id="features" className="border-y border-[#1A1A1A] px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="What Schedule Manager actually does"
            />
          </Reveal>
          <FeatureBento
            className="mt-14"
            items={FEATURES.map((f) => ({ title: f.title, desc: f.body }))}
          />
        </div>
      </section>
    </ProductTheme>
  );
}

function UseCases() {
  return (
    <ProductTheme product="schedule">
      <section className="border-b border-[#1A1A1A] px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading eyebrow="Use cases" title="For anyone who runs a schedule" />
          </Reveal>
          <Stagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2" stagger={0.12}>
            <Item>
              <SpotlightCard className="glass-card h-full rounded-2xl">
                <div className="h-full p-7">
                  <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B68D6]">
                    Students
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">
                    Photograph the syllabus. Done.
                  </h3>
                  <p className="text-sm leading-relaxed text-[#C4C4C4]">
                    First week of semester: point your camera at every course
                    outline. ACE extracts deadlines, assignments, and exams. The
                    semester is in the schedule before the first class ends.
                  </p>
                </div>
              </SpotlightCard>
            </Item>
            <Item>
              <SpotlightCard className="glass-card h-full rounded-2xl">
                <div className="h-full p-7">
                  <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B68D6]">
                    Event producers
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">
                    The week has a shape. Use it.
                  </h3>
                  <p className="text-sm leading-relaxed text-[#C4C4C4]">
                    Plan the service, conference, or show day-by-day. Milestones
                    on the Kanban board map to execution tasks in the schedule.
                    Nothing falls through the gap between planning and execution.
                  </p>
                </div>
              </SpotlightCard>
            </Item>
          </Stagger>
        </div>
      </section>
    </ProductTheme>
  );
}

function PricingTeaser() {
  return (
    <ProductTheme product="schedule">
      <section className="border-b border-[#1A1A1A] px-6 py-20 sm:px-10">
        <Reveal className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Pricing"
            title="Free to start. AI included on Pro."
          />
          <div className="mb-8 mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#6941C6]/40 bg-gradient-to-b from-[#6941C6]/15 to-[#1A1A1A] p-7">
              <div className="mb-3 text-sm font-bold uppercase tracking-wider text-[#C4C4C4]">Free</div>
              <div className="mb-5 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-sm text-[#C4C4C4]">/ month</span>
              </div>
              <ul className="space-y-2 text-sm text-[#D4D4D4]">
                {["Weekly schedule", "Custom categories (10)", "Cloud sync", "Google Calendar"].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#6941C6]">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-2xl p-7">
              <div className="mb-3 text-sm font-bold uppercase tracking-wider text-[#C4C4C4]">Pro</div>
              <div className="mb-5 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-white">$12</span>
                <span className="text-sm text-[#C4C4C4]">/ month</span>
              </div>
              <ul className="space-y-2 text-sm text-[#D4D4D4]">
                {["Everything in Free", "AI schedule import (included)", "Daily AI guidance (included)", "Unlimited Kanban projects", "Milestones", "Weekly CSV export"].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#6941C6]">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-sm text-[#888]">
            Annual plan: $96/yr (2 months free) · Ministry &amp; education discounts
            available ·{" "}
            <Link href="/pricing" className="text-[#6941C6] transition hover:text-[#8B68D6]">
              Suite pricing →
            </Link>
          </p>
        </Reveal>
      </section>
    </ProductTheme>
  );
}
