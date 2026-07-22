import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";
import MagneticButton from "@/components/MagneticButton";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import Reveal from "@/components/Reveal";
import {
  ScrollReveal,
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

export const metadata: Metadata = {
  title: "ACE Editors' Notes — Click-to-Seek Notes for DaVinci Resolve (Free, Mac)",
  description:
    "The notes app for DaVinci Resolve editors. Click any timecode in your notes — Resolve's playhead jumps to that frame. Free, Apple-signed, auto-updating. macOS.",
  alternates: { canonical: "/editors-notes" },
  keywords: [
    "davinci resolve notes",
    "resolve timecode app",
    "video editor notes",
    "davinci resolve markers",
    "resolve notes app",
    "click to seek timecode",
  ],
  openGraph: {
    title: "ACE Editors' Notes — Click-to-Seek Notes for DaVinci Resolve",
    description:
      "Stop alt-tabbing between Notes.app and Resolve. Click a timecode, the playhead jumps. Free for Mac.",
    images: [{ url: "/editors-notes/screenshot-insert-timecode.png", width: 1823, height: 926 }],
    url: "/editors-notes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE Editors' Notes for DaVinci Resolve",
    description: "Click any timecode in your notes — Resolve seeks to that frame. Free, Mac.",
    images: ["/editors-notes/screenshot-insert-timecode.png"],
  },
};

const FEATURES = [
  {
    tag: "Timecodes",
    title: "Every timecode is a click.",
    body: "Type a timecode in your notes — it's immediately clickable. Click it and Resolve jumps to that frame. No copy-paste, no hunting.",
  },
  {
    tag: "Resolve integration",
    title: "Import markers from Resolve.",
    body: "Pull Resolve markers directly into your notes as structured entries. Each marker becomes a note with timecode, color, and comment.",
  },
  {
    tag: "Rich text",
    title: "Notes per project.",
    body: "Full rich-text editor. Organize notes by project. Color-code by category. Find anything fast.",
  },
  {
    tag: "Export",
    title: "Print or PDF — one click.",
    body: "Export your notes as a formatted PDF or send directly to the printer. Useful for handoff between the assistant editor and lead.",
  },
  {
    tag: "Auto-update",
    title: "Sparkle auto-update.",
    body: "New versions install in the background. ACE Editors' Notes is always current without interrupting your edit session.",
  },
  {
    tag: "Local-first",
    title: "Works air-gapped.",
    body: "SQLite database, no cloud dependency by design. Post-production facilities that restrict network access are fully supported.",
  },
];

export default function EditorsNotesPage() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav activeProduct="notes" />
      <Hero />
      <TimecodeDemo />
      <DemoVideo />
      <Screenshots />
      <Features />
      <UseCase />
      <CTABand
        product="editorsNotes"
        eyebrow="Get started"
        title={
          <>
            Notes that talk to <AccentItalic>Resolve</AccentItalic>.
          </>
        }
        sub="Free · macOS · DaVinci Resolve integration · Part of the ACE Suite"
        primary={{
          href: "/api/download?product=editors-notes&platform=mac-arm64",
          label: "Download for Mac",
        }}
        secondary={{ href: "/pricing", label: "View pricing" }}
      />
      <Footer />
    </main>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <HeroShell product="editorsNotes" fill={false} floating={<HeroChips />}>
      <div className="mb-7 flex items-center gap-3">
        <span className="h-px w-8 bg-[#B07C2A]" aria-hidden />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#888]">
          ACE · Editors&apos; Notes
        </span>
        <span className="h-px w-8 bg-[#B07C2A]" aria-hidden />
      </div>

      <h1 className="text-[2.6rem] font-bold leading-[1.0] tracking-tight text-white sm:text-7xl sm:leading-[0.95] lg:text-8xl">
        Notes that talk{" "}
        <br className="hidden sm:block" />
        to <AccentItalic>Resolve</AccentItalic>
        <span className="text-[#B07C2A]">.</span>
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#C4C4C4] sm:text-xl">
        Every timecode is a click. Every clip is a marker. ACE Editors&apos; Notes
        lives next to your timeline.
      </p>

      <div className="mt-10 flex items-center">
        <MagneticButton
          href="/api/download?product=editors-notes&platform=mac-arm64"
          glowRgb="176,124,42"
          className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition-colors hover:bg-[#E8E8E8]"
        >
          Download for Mac
        </MagneticButton>
      </div>
      <p className="mt-5 text-xs text-[#888]">
        Free · macOS · Apple Silicon · DaVinci Resolve integration · Part of the
        ACE Suite
      </p>

      {/* Real UI — timecoded notes, framed with the amber accent glow. */}
      <div className="relative mt-16 w-full max-w-5xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 -top-8 bottom-0 -z-10 rounded-[3rem] blur-3xl"
          style={{
            background:
              "radial-gradient(55% 60% at 50% 40%, rgba(176,124,42,0.30), transparent 78%)",
          }}
        />
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D] shadow-[0_40px_120px_-32px_rgba(0,0,0,0.85)]">
          <Image
            src="/editors-notes/screenshot-category.png"
            alt="ACE Editors' Notes showing timecoded notes color-coded by category"
            width={1823}
            height={1080}
            priority
            className="w-full"
          />
        </div>
      </div>
    </HeroShell>
  );
}

/* Floating chips — the edit session in motion. */
function HeroChips() {
  return (
    <>
      <FloatingCard className="left-[5%] top-[25%] w-60 p-4" delay={-2} duration={7.5}>
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#888]">
          Note
        </div>
        <div className="mt-2 flex items-baseline gap-2 font-mono text-xs">
          <span className="rounded bg-[#B07C2A]/15 px-1.5 py-0.5 text-[#CFA04D]">
            01:12:04:18
          </span>
          <span className="text-[#C4C4C4]">tighten this cut</span>
        </div>
      </FloatingCard>

      <FloatingCard className="right-[5%] top-[22%] w-56 p-4" delay={-4.5} duration={8.5}>
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#888]">
          Resolve
        </div>
        <div className="mt-2 text-sm font-semibold text-white">Playhead → 01:12:04:18</div>
        <div className="mt-1.5 font-mono text-[10px] text-[#CFA04D]">seeked · 0 ms lag</div>
      </FloatingCard>

      <FloatingCard className="bottom-[20%] right-[9%] w-48 p-4" delay={-3} duration={6.5}>
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#888]">
          Markers imported
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
          <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
          <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
          <span className="text-sm font-semibold text-white">24 notes</span>
        </div>
      </FloatingCard>
    </>
  );
}

// ─── Timecode demo (animated mock) ────────────────────────────────────────────

const DEMO_LINES = [
  { tc: "01:00:15:10", note: "Opening scene — director wants a wider lens" },
  { tc: "01:02:33:18", note: "Interview segment — great natural light" },
  { tc: "01:05:42:05", em: "VFX:", note: "VFX: remove boom-mic shadow (frames 2735–2890)" },
  { tc: "01:08:10:22", note: "Pacing slow — trim 8–10 frames between cuts" },
];

function TimecodeDemo() {
  return (
    <ProductTheme product="editorsNotes">
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <SectionHeading
              eyebrow="Live integration"
              title="Click. Jump. Edit."
              lede="Every timecode is a live link to your Resolve timeline."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="glass-card mt-10 rounded-2xl p-6 font-[family-name:var(--font-geist-mono)] sm:p-8">
              {DEMO_LINES.map((l) => (
                <div key={l.tc} className="flex items-baseline gap-3 py-1.5">
                  <span className="shrink-0 cursor-pointer rounded bg-[#B07C2A]/15 px-2 py-0.5 text-sm font-medium text-[#CFA04D] transition-colors hover:bg-[#B07C2A]/25">
                    {l.tc}
                  </span>
                  <span className="text-sm text-[#C4C4C4]">
                    {l.em ? (
                      <>
                        <b className="text-white">{l.em}</b>
                        {l.note.slice(l.em.length)}
                      </>
                    ) : (
                      l.note
                    )}
                  </span>
                </div>
              ))}
              <div className="ace-caret ml-1 mt-1 h-5 w-px bg-[#B07C2A]" aria-hidden />
            </div>
          </Reveal>
        </div>
      </section>
    </ProductTheme>
  );
}

// ─── Demo Video ──────────────────────────────────────────────────────────────

function DemoVideo() {
  return (
    <section className="border-y border-[#141414] bg-[#080808] px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-[#B07C2A]">
          See it in action
        </div>
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Click a timecode. Resolve jumps.
        </h2>
        <div className="aspect-video overflow-hidden rounded-2xl border border-[#222] bg-[#111]">
          <iframe
            src="https://www.youtube.com/embed/DGvWNarQWLc?rel=0&modestbranding=1"
            title="ACE Editors' Notes demo — click-to-seek timecodes for DaVinci Resolve"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
        <p className="mt-4 text-center text-xs text-[#555]">
          v1.2.0 · macOS · DaVinci Resolve 17+ · Free
        </p>
      </div>
    </section>
  );
}

// ─── Screenshots ──────────────────────────────────────────────────────────────

const SCREENSHOTS = [
  {
    src: "/editors-notes/screenshot-insert-timecode.png",
    alt: "Insert Timecode — type a timecode and it becomes clickable, seeking Resolve to that frame",
    caption: "Insert Timecode",
    description: "Type any timecode — it's immediately clickable. Click and Resolve seeks.",
    width: 1823,
    height: 926,
  },
  {
    src: "/editors-notes/screenshot-import-markers.png",
    alt: "Import Markers — pull Resolve timeline markers into your notes with colors and comments",
    caption: "Import Markers",
    description: "Pull markers from your Resolve timeline — colors, timecodes, and comments preserved.",
    width: 1823,
    height: 926,
  },
  {
    src: "/editors-notes/screenshot-category.png",
    alt: "Category view — organize notes by department: VFX, Audio, Color, Edit, Review",
    caption: "Categories",
    description: "Color-code notes by department. Filter to exactly what you need.",
    width: 1823,
    height: 1080,
  },
  {
    src: "/editors-notes/screenshot-rename-project.png",
    alt: "Rename Project — manage multiple projects, each with its own isolated notes",
    caption: "Project Management",
    description: "One project per job. Notes stay organized across multiple timelines.",
    width: 1823,
    height: 926,
  },
];

function Screenshots() {
  return (
    <section id="screenshots" className="bg-[#060606] px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#B07C2A]">
            Screenshots
          </div>
          <h2 className="mb-10 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Built for the edit suite
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <ScreenshotCarousel slides={SCREENSHOTS} />
        </Reveal>
      </div>
    </section>
  );
}

function Features() {
  return (
    <ProductTheme product="editorsNotes">
      <section id="features" className="border-y border-[#1A1A1A] px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="What Editors' Notes actually does"
            />
          </ScrollReveal>
          <FeatureBento
            className="mt-14"
            items={FEATURES.map((f) => ({ title: f.title, desc: f.body }))}
          />
        </div>
      </section>
    </ProductTheme>
  );
}

function UseCase() {
  return (
    <ProductTheme product="editorsNotes">
      <section className="border-b border-[#1A1A1A] px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Use case"
              title="The assistant editor, in the review"
            />
          </ScrollReveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <SpotlightCard className="glass-card h-full rounded-2xl">
              <div className="h-full p-7">
                <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#CFA04D]">
                  Director review
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">
                  Notes that travel with the cut.
                </h3>
                <p className="text-sm leading-relaxed text-[#C4C4C4]">
                  The director calls out timecodes. The assistant editor types
                  them into ACE Editors&apos; Notes. Every note is stamped,
                  categorized, and clickable. At the end of the session, the lead
                  editor has a full brief — no transcription lag, no lost sticky
                  notes.
                </p>
              </div>
            </SpotlightCard>
            <SpotlightCard className="glass-card h-full rounded-2xl">
              <div className="h-full p-7">
                <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#CFA04D]">
                  Air-gapped facilities
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">
                  Local-first by design.
                </h3>
                <p className="text-sm leading-relaxed text-[#C4C4C4]">
                  Many post-production facilities restrict internet access on
                  editorial machines. ACE Editors&apos; Notes runs entirely on
                  SQLite with no cloud dependency — it works exactly the same on
                  an air-gapped machine as on a connected one.
                </p>
              </div>
            </SpotlightCard>
          </div>
          <div className="mt-8 rounded-xl border border-[#1F1F1F] bg-[#0F0F0F] p-5 text-sm text-[#888]">
            <span className="font-semibold text-white">System requirement:</span>{" "}
            macOS 26+ · DaVinci Resolve 17+ for marker import · Resolve does not
            need to be open for basic note-taking{" · "}
            <Link href="/support" className="text-[#B07C2A] transition hover:text-[#CFA04D]">
              Get support →
            </Link>
          </div>
        </div>
      </section>
    </ProductTheme>
  );
}
