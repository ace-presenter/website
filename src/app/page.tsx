import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";
import {
  ScrollReveal,
  ScrollStagger,
  ScrollItem,
  SpotlightCard,
} from "@/components/motion";
import {
  HeroShell,
  FloatingCard,
  SectionHeading,
  AccentItalic,
  StatsBand,
  LogoMarquee,
  CTABand,
  ComingSoonCard,
  ProductShowcase,
} from "@/components/sections";

export const metadata: Metadata = {
  title: {
    absolute: "ACE — Agentic Cue Experience",
  },
  description:
    "ACE is a suite of agentic tools for live events, post-production, and personal productivity. Presenter listens to the room. Schedule plans the day. Editors' Notes annotates the cut. More coming.",
  alternates: { canonical: "/" },
};

export default function SuiteHome() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />
      <Hero />
      <LogoMarquee
        label="Runs with the gear you already have"
        items={[
          "ProPresenter import",
          "ATEM",
          "OBS",
          "NDI",
          "MIDI",
          "OSC",
          "HDMI",
          "PowerPoint",
          "Keynote",
          "DaVinci Resolve",
        ]}
        className="border-b border-[#1A1A1A]"
      />
      <Showcase />
      <StatsBand
        stats={[
          { text: "<1s", label: "Cue latency" },
          { text: "0", label: "Clicks to advance" },
          { num: { to: 12, suffix: "+" }, label: "Languages" },
          { text: "100%", label: "On-device" },
        ]}
      />
      <ComingSoon />
      <Rooms />
      <SuiteWhy />
      <PricingTeaser />
      <CTABand
        eyebrow="Get started"
        title={
          <>
            Ready when the <AccentItalic>room</AccentItalic> is.
          </>
        }
        sub="You run the room. The cue runs itself. Free during the public beta."
        primary={{ href: "/api/download?platform=mac-arm64", label: "Download for Mac" }}
        secondary={{ href: "/pricing", label: "View pricing" }}
      />
      <Footer />
    </main>
  );
}

/* ───────────── HERO ───────────── */
function Hero() {
  return (
    <HeroShell fill={false} floating={<HeroChips />}>
      <div className="mb-7 flex items-center gap-3">
        <span className="h-px w-8 bg-[#C8102E]" aria-hidden />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#888]">
          Agentic Cue Experience
        </span>
        <span className="h-px w-8 bg-[#C8102E]" aria-hidden />
      </div>

      <h1 className="text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-8xl">
        The room speaks.
        <br />
        The slides <AccentItalic>follow</AccentItalic>.
      </h1>

      <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#B4B4B4]">
        ACE Presenter listens to your service and fires the next slide in under
        a second — on-device, no clicker, no cloud. Built for worship,
        conferences, lectures, and theater.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
        <MagneticButton
          href="/api/download?platform=mac-arm64"
          glowRgb="200,16,46"
          className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-colors hover:bg-[#E8E8E8]"
        >
          Download for Mac
        </MagneticButton>
        <Link
          href="/presenter"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#E8183A]"
        >
          See how Presenter works
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      <p className="mt-5 text-xs text-[#777]">
        Free during the public beta · macOS 12+ · Apple Silicon &amp; Intel
      </p>

      {/* Real flagship UI — framed, glowing, the product front and centre. */}
      <div className="relative mt-16 w-full max-w-5xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 -top-8 bottom-0 -z-10 rounded-[3rem] blur-3xl"
          style={{
            background:
              "radial-gradient(55% 60% at 50% 40%, rgba(200,16,46,0.30), rgba(255,107,0,0.10) 55%, transparent 78%)",
          }}
        />
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D] shadow-[0_40px_120px_-32px_rgba(0,0,0,0.85)]">
          <Image
            src="/presenter/stage.png"
            alt="ACE Presenter running a live service — library, stage preview, and program output"
            width={2200}
            height={1384}
            priority
            className="w-full"
          />
        </div>
      </div>
    </HeroShell>
  );
}

/* Floating glass chips — one small live artifact per product, orbiting the
   hero copy on lg+. Decorative (aria-hidden via HeroShell's floating layer). */
function HeroChips() {
  return (
    <>
      {/* Presenter — live lyric match */}
      <FloatingCard className="left-[5%] top-[26%] w-52 p-4" delay={-2} duration={7.5}>
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#888]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
          Live · Presenter
        </div>
        <div className="mt-2 text-sm font-semibold text-white">Way Maker — Chorus</div>
        <div className="mt-3 flex h-5 items-end gap-[3px]">
          {[0.9, 0.5, 0.75, 0.35, 1, 0.6, 0.8, 0.45, 0.7].map((h, i) => (
            <span
              key={i}
              className="ace-wave-bar w-[3px] rounded-full bg-[#E8183A]/70"
              style={{ height: `${h * 100}%`, animationDelay: `${i * 0.09}s` }}
            />
          ))}
        </div>
      </FloatingCard>

      {/* Schedule — running order */}
      <FloatingCard className="right-[5%] top-[22%] w-52 p-4" delay={-5} duration={8.5}>
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#888]">
          Schedule
        </div>
        <div className="mt-2.5 flex items-center gap-2.5 text-xs">
          <span className="font-mono text-[#6941C6]">09:00</span>
          <span className="text-[#999] line-through">Soundcheck</span>
          <span className="ml-auto text-[#22C55E]">✓</span>
        </div>
        <div className="mt-2 flex items-center gap-2.5 text-xs">
          <span className="font-mono text-[#8B68D6]">10:00</span>
          <span className="font-semibold text-white">Service</span>
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#8B68D6]" />
        </div>
      </FloatingCard>

      {/* Editors' Notes — timecoded note */}
      <FloatingCard className="bottom-[20%] right-[8%] w-52 p-4" delay={-3.5} duration={6.5}>
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#888]">
          Editors&apos; Notes
        </div>
        <div className="mt-2 font-mono text-xs text-[#CFA04D]">01:12:04</div>
        <div className="mt-1 text-sm font-medium text-white">
          &ldquo;Tighten this cut&rdquo;
        </div>
      </FloatingCard>
    </>
  );
}

/* ───────────── SHOWCASE (alternating product rows) ───────────── */
function Showcase() {
  return (
    <section id="suite" className="scroll-mt-24 px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="The suite"
            title={
              <>
                One account. <AccentItalic>Five</AccentItalic> tools.
              </>
            }
            lede="Three shipping today, two on the way — all built to the same bar: native where it counts, on-device by default, made for people running real rooms."
          />
        </ScrollReveal>

        <div className="mt-20 flex flex-col gap-24 sm:gap-32">
          <ProductShowcase
            product="presenter"
            name="Presenter"
            href="/presenter"
            headline={
              <>
                Slides that <AccentItalic>follow</AccentItalic> the room.
              </>
            }
            body="ACE listens to the service and fires the next cue in under a second — lyrics, scripture, and decks that keep up with the band and the preacher. No clicker, no cloud, all on-device."
            features={[
              "Live lyric + scripture detection, 12+ languages",
              "HDMI · NDI · ATEM · OBS · OSC output",
              "One-click ProPresenter library import",
            ]}
            visual={
              <Image
                src="/presenter/stage-display.png"
                alt="ACE Presenter stage display showing live lyrics"
                width={2200}
                height={1384}
                className="w-full"
              />
            }
          />

          <ProductShowcase
            product="schedule"
            name="Schedule"
            href="/schedule"
            flip
            headline={
              <>
                Build the day. <AccentItalic>Run</AccentItalic> it.
              </>
            }
            body="Photograph a syllabus and ACE turns it into a plan. Routines, Kanban projects, daily AI guidance, and two-way calendar sync — for the people behind the event."
            features={[
              "AI import from a photo of any plan",
              "Kanban projects, milestones, weekly view",
              "Google Calendar sync + cloud everywhere",
            ]}
            visual={
              <Image
                src="/schedule/my-tasks.webp"
                alt="ACE Schedule showing a weekly agenda and task board"
                width={1600}
                height={1055}
                className="w-full"
              />
            }
          />

          <ProductShowcase
            product="editorsNotes"
            name="Editors' Notes"
            href="/editors-notes"
            headline={
              <>
                Notes that talk to <AccentItalic>Resolve</AccentItalic>.
              </>
            }
            body="Every timecode is a click — tap it and DaVinci Resolve's playhead jumps to that frame. Import markers, color-code by department, export to PDF. Local-first, works air-gapped."
            features={[
              "Click-to-seek timecodes into Resolve",
              "Import timeline markers with colors",
              "Rich text, per-project, PDF export",
            ]}
            visual={
              <Image
                src="/editors-notes/screenshot-insert-timecode.png"
                alt="ACE Editors' Notes inserting a clickable timecode"
                width={1823}
                height={926}
                className="w-full"
              />
            }
          />
        </div>
      </div>
    </section>
  );
}

/* ───────────── COMING SOON (Manager + World) ───────────── */
function ComingSoon() {
  return (
    <section className="px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="On the way"
            title="Two more, joining the suite"
          />
        </ScrollReveal>
        <ScrollStagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.1}>
          <ScrollItem>
            <ComingSoonCard
              product="manager"
              name="Manager"
              href="/manager"
              tagline="One dashboard for teams and organizations — people, licenses, and rooms in one place."
            />
          </ScrollItem>
          <ScrollItem>
            <ComingSoonCard
              product="world"
              name="World"
              href="/world"
              tagline="A shared 3D space for your audience — beyond the room, after the event."
            />
          </ScrollItem>
        </ScrollStagger>
      </div>
    </section>
  );
}

/* ───────────── ROOMS ───────────── */
function Rooms() {
  const rooms = [
    {
      name: "Conferences",
      body: "The deck advances the instant a speaker reaches a new section — nobody riding the arrow keys from the back.",
      href: "/presenter/conferences",
    },
    {
      name: "Lectures",
      body: "Scripture, citations, and slides push in line as you teach, so the board never trails the lecture.",
      href: "/presenter/lectures",
    },
    {
      name: "Theater & live shows",
      body: "Cue-list driven, with ⌘J quick-screens for whatever the run throws at you mid-show.",
      href: "/presenter/theater",
    },
    {
      name: "Worship",
      body: "Lyrics, scripture, and sermon notes follow the moment — across languages, mid-song.",
      href: "/presenter/worship",
    },
  ];

  return (
    <section className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Where it runs"
            title="The same engine. Four rooms."
          />
        </ScrollReveal>

        <ScrollStagger
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {rooms.map((r) => (
            <ScrollItem key={r.name}>
              <SpotlightCard className="glass-card h-full rounded-2xl">
                <Link href={r.href} className="group flex h-full flex-col p-6">
                  <div className="mb-4 h-px w-8 bg-[#C8102E]" aria-hidden />
                  <h3 className="mb-2.5 text-lg font-bold text-white transition-colors group-hover:text-[#E8183A]">
                    {r.name}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#A8A8A8]">{r.body}</p>
                </Link>
              </SpotlightCard>
            </ScrollItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}

/* ───────────── SUITE WHY ───────────── */
function SuiteWhy() {
  const points = [
    {
      label: "One account",
      body: "Sign in once. Your license covers Presenter, Schedule, and Editors' Notes today — with Manager and World joining as they ship.",
    },
    {
      label: "Tools that hand off",
      body: "Plan in Schedule, run the room with Presenter, mark up the recording in Editors' Notes. Built to pass work between them cleanly.",
    },
    {
      label: "One standard",
      body: "Every tool we add is built to the same bar: native where it counts, on-device by default, and made for people running real rooms.",
    },
  ];

  return (
    <section className="border-t border-[#1A1A1A] px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading eyebrow="Why ACE" title="Built to work together" />
        </ScrollReveal>

        <ScrollStagger
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
          stagger={0.12}
        >
          {points.map((p) => (
            <ScrollItem key={p.label}>
              <SpotlightCard className="glass-card h-full rounded-2xl">
                <div className="flex h-full flex-col p-6">
                  <div className="mb-4 h-px w-8 bg-[#C8102E]" aria-hidden />
                  <h3 className="mb-2.5 text-lg font-bold text-white">{p.label}</h3>
                  <p className="text-[15px] leading-relaxed text-[#A8A8A8]">{p.body}</p>
                </div>
              </SpotlightCard>
            </ScrollItem>
          ))}
        </ScrollStagger>

        {/* Measured facts, not hype — carried over from the Proof strip. */}
        <ScrollReveal className="mt-20 max-w-3xl sm:mt-24">
          <div className="mb-7 h-px w-8 bg-[#C8102E]" aria-hidden />
          <blockquote className="text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
            &ldquo;You run the room. The cue runs itself.&rdquo;
          </blockquote>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#666]">
            ~200 ms on-device transcription · whisper.cpp on your Mac · audio never leaves the room
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ───────────── PRICING TEASER ───────────── */
function PricingTeaser() {
  return (
    <section className="border-t border-[#1A1A1A] px-6 py-28 sm:px-10 sm:py-36">
      <ScrollReveal className="mx-auto max-w-6xl">
        <SectionHeading
          align="left"
          eyebrow="Pricing"
          title="Free to start. Fair to grow."
          lede="Per-product plans or a suite bundle. No surprise costs."
        />
        <Link
          href="/pricing"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#E8183A]"
        >
          View pricing
          <span aria-hidden>→</span>
        </Link>
      </ScrollReveal>
    </section>
  );
}
