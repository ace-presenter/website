import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import Reveal from "@/components/Reveal";

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
      <FinalCTA variant="notes" />
      <Footer />
    </main>
  );
}

// ─── Demo Video ──────────────────────────────────────────────────────────────

function DemoVideo() {
  return (
    <section className="px-6 sm:px-10 py-16 bg-[#080808]">
      <div className="max-w-4xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#B07C2A] font-bold mb-3 text-center">
          See it in action
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-center mb-8">
          Click a timecode.{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#CFA04D]">
            Resolve jumps.
          </span>
        </h2>
        <div className="rounded-2xl overflow-hidden border border-[#222] bg-[#111] aspect-video">
          <iframe
            src="https://www.youtube.com/embed/DGvWNarQWLc?rel=0&modestbranding=1"
            title="ACE Editors' Notes demo — click-to-seek timecodes for DaVinci Resolve"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <p className="mt-4 text-center text-xs text-[#555]">
          v1.2.0 · macOS · DaVinci Resolve 17+ · Free
        </p>
      </div>
    </section>
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
    <section className="relative px-6 sm:px-10 py-20 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(55% 50% at 50% 35%, rgba(176,124,42,0.12) 0%, rgba(176,124,42,0) 70%)" }}
      />
      <div className="relative max-w-3xl mx-auto">
        <Reveal className="text-center">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#B07C2A] font-bold mb-3">
            Live integration
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Click. Jump.{" "}
            <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#CFA04D]">
              Edit.
            </span>
          </h2>
          <p className="mt-3 text-[#C4C4C4]">
            Every timecode is a live link to your Resolve timeline.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 rounded-2xl border border-[#222] bg-[#0C0C0C] p-6 sm:p-8 font-[family-name:var(--font-geist-mono)] shadow-[0_30px_80px_-30px_rgba(176,124,42,0.3)]">
            {DEMO_LINES.map((l) => (
              <div key={l.tc} className="flex items-baseline gap-3 py-1.5">
                <span className="shrink-0 px-2 py-0.5 rounded text-sm font-medium text-[#CFA04D] bg-[#B07C2A]/15 hover:bg-[#B07C2A]/25 hover:shadow-[0_0_20px_rgba(176,124,42,0.25)] transition cursor-pointer">
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
            <div className="h-5 w-px bg-[#B07C2A] ml-1 mt-1 animate-pulse" />
          </div>
        </Reveal>
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
    <section id="screenshots" className="relative px-6 sm:px-10 py-20 bg-[#060606] border-y border-[#141414] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(176,124,42,0.10) 0%, rgba(176,124,42,0) 70%)" }}
      />
      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#B07C2A] font-bold mb-3">
            Screenshots
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-10">
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

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative px-6 sm:px-10 pt-20 sm:pt-32 pb-24 text-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(70% 50% at 50% 0%, rgba(176,124,42,0.25) 0%, rgba(176,124,42,0.07) 40%, rgba(176,124,42,0) 70%)" }}
      />
      <div className="relative max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[10px] uppercase tracking-[0.25em] text-[#C4C4C4] font-semibold mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B07C2A]" />
          ACE · Editors&apos; Notes
        </div>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-white">
          Notes that talk
          <br />
          to{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#CFA04D]">
            Resolve
          </span>
          <span className="text-[#B07C2A]">.</span>
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-[#C4C4C4] leading-relaxed">
          Every timecode is a click. Every clip is a marker. ACE Editors&apos; Notes lives next to your timeline.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <a
            href="/api/download?product=editors-notes&platform=mac-arm64"
            className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition shadow-[0_10px_40px_rgba(255,255,255,0.12)]"
          >
            Download for Mac
          </a>
        </div>
        <p className="mt-5 text-xs text-[#888]">Free · macOS · Apple Silicon · DaVinci Resolve integration · Part of the ACE Suite</p>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="px-6 sm:px-10 py-24 border-y border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#B07C2A] font-bold mb-3">Capabilities</div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-12 text-white max-w-2xl">
          What Editors&apos; Notes{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#CFA04D]">actually does</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.tag} delay={(i % 3) * 80}>
              <div className="h-full p-6 rounded-2xl bg-[#141414] border border-[#222] hover:border-[#B07C2A]/40 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(176,124,42,0.25)] transition duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B07C2A]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B07C2A] font-bold">{f.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-tight">{f.title}</h3>
                <p className="text-[#C4C4C4] text-sm leading-relaxed">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCase() {
  return (
    <section className="px-6 sm:px-10 py-24 border-b border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#B07C2A] font-bold mb-3">Use case</div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-12 text-white max-w-2xl">
          The assistant editor, in the{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#CFA04D]">review</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#111] border border-[#222]">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#CFA04D] font-bold mb-3">Director review</div>
            <h3 className="text-xl font-bold text-white mb-3">Notes that travel with the cut.</h3>
            <p className="text-[#C4C4C4] text-sm leading-relaxed">
              The director calls out timecodes. The assistant editor types them into ACE Editors&apos; Notes. Every note is stamped, categorized, and clickable. At the end of the session, the lead editor has a full brief — no transcription lag, no lost sticky notes.
            </p>
          </div>
          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#111] border border-[#222]">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#CFA04D] font-bold mb-3">Air-gapped facilities</div>
            <h3 className="text-xl font-bold text-white mb-3">Local-first by design.</h3>
            <p className="text-[#C4C4C4] text-sm leading-relaxed">
              Many post-production facilities restrict internet access on editorial machines. ACE Editors&apos; Notes runs entirely on SQLite with no cloud dependency — it works exactly the same on an air-gapped machine as on a connected one.
            </p>
          </div>
        </div>
        <div className="mt-8 p-5 rounded-xl bg-[#0F0F0F] border border-[#1F1F1F] text-sm text-[#888]">
          <span className="text-white font-semibold">System requirement:</span> macOS 12+ · DaVinci Resolve 17+ for marker import · Resolve does not need to be open for basic note-taking
          {" · "}
          <Link href="/support" className="text-[#B07C2A] hover:text-[#CFA04D] transition">Get support →</Link>
        </div>
      </div>
    </section>
  );
}
