import Link from "next/link";
import Image from "next/image";
import WhatsNewModal from "@/components/WhatsNewModal";
import SchemaJsonLd from "@/components/SchemaJsonLd";

// Re-revalidate the home page every 5 minutes so the version pill picks
// up new releases without a redeploy. Read directly from the
// canonical manifest (dl.ace-presenter.app/latest-mac.yml) — same source
// of truth that /api/latest and /api/download use.
export const revalidate = 300;

async function fetchLatestVersion(): Promise<string | null> {
  try {
    const r = await fetch("https://dl.ace-presenter.app/latest-mac.yml", {
      next: { revalidate: 300 },
    });
    if (!r.ok) return null;
    const text = await r.text();
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^version:\s*['"]?([\d.]+)['"]?/);
      if (m) return m[1];
    }
    return null;
  } catch {
    return null;
  }
}

const SEGMENTS: { hook: string; title: string; body: string }[] = [
  {
    hook: "Worship",
    title: "Stop clicking slides during the service",
    body: "ACE listens to what the team is singing and pushes the right lyrics. Bible mode follows the preacher through scripture references in real time.",
  },
  {
    hook: "Conference",
    title: "Speakers improvise. Slides stay aligned anyway.",
    body: "Drop the deck in. ACE follows the speaker through it — even when they jump around, skip slides, or extend a section.",
  },
  {
    hook: "Education",
    title: "Lectures that don't lose the slide",
    body: "Your tempo, your order. The deck follows you, not a pre-baked cue list. Works for any subject, any language.",
  },
  {
    hook: "Theater & live shows",
    title: "AI handles the cues — one operator runs the show",
    body: "Voice-triggered cue advance + automatic dialog beat detection. The stage manager focuses on the room, not the laptop.",
  },
];

const STATS = [
  { label: "Latency", value: "< 1s" },
  { label: "Languages", value: "12+" },
  { label: "Output formats", value: "HDMI · NDI · OSC" },
  { label: "Cloud dependency", value: "Zero" },
];

const COMPAT = [
  "ProPresenter",
  "ATEM",
  "OBS",
  "NDI",
  "MIDI",
  "OSC",
  "Whisper",
  "Genius",
];

export default async function Home() {
  // Resolve once at the page level so Hero pill + WhatsNewModal share
  // the same source of truth (one fetch, one cache entry).
  const latestVersion = await fetchLatestVersion();
  return (
    <main className="flex-1 flex flex-col font-sans">
      <SchemaJsonLd />
      <Nav />
      <Hero latestVersion={latestVersion} />
      <StatsStrip />
      <Compatibility />
      <Segments />
      <BentoFeatures />
      <WhatsNew />
      <BigStats />
      <PricingTeaser />
      <FinalCTA />
      <Footer />
      <WhatsNewModal version={latestVersion} />
    </main>
  );
}

/* ───────────── NAV ───────────── */
function Nav() {
  return (
    <nav className="sticky top-0 z-40 px-6 sm:px-10 py-5 flex items-center justify-between bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-[#1A1A1A]">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.png" alt="ACE — Agentic Cue Experience" width={32} height={32} priority className="rounded-md" />
        <div className="flex flex-col leading-none">
          <span className="font-bold tracking-tight text-lg">ACE</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#888] mt-0.5">
            Agentic Cue Experience
          </span>
        </div>
      </Link>
      <div className="hidden sm:flex items-center gap-8 text-sm text-[#C4C4C4]">
        <Link href="#use-cases" className="hover:text-white transition">Use cases</Link>
        <Link href="#features" className="hover:text-white transition">Features</Link>
        <Link href="#pricing" className="hover:text-white transition">Pricing</Link>
        <Link href="/guide" className="hover:text-white transition">Guide</Link>
        <Link href="/support" className="hover:text-white transition">Support</Link>
      </div>
      <Link
        href="/api/download?platform=mac-arm64"
        className="px-4 sm:px-5 py-2 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-xs uppercase tracking-wider transition"
      >
        Download
      </Link>
    </nav>
  );
}

/* ───────────── HERO ───────────── */
function Hero({ latestVersion }: { latestVersion: string | null }) {
  return (
    <section className="relative px-6 sm:px-10 pt-20 sm:pt-32 pb-24 text-center overflow-hidden">
      {/* Aurora glow — brand red instead of multi-color */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, rgba(200,16,46,0.35) 0%, rgba(200,16,46,0.10) 35%, rgba(200,16,46,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[60vh] pointer-events-none opacity-60 mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 0%, rgba(232,24,58,0.0) 0deg, rgba(232,24,58,0.18) 90deg, rgba(60,0,10,0.20) 180deg, rgba(232,24,58,0.18) 270deg, rgba(232,24,58,0.0) 360deg)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Tag pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[10px] uppercase tracking-[0.25em] text-[#C4C4C4] font-semibold mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] animate-pulse" />
          Live presentation, on autopilot
        </div>

        {/* Headline — bold sans + italic serif accent (Profico-style tension) */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-white">
          ACE listens.
          <br />
          You{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
            present
          </span>
          <span className="text-[#C8102E]">.</span>
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-[#C4C4C4] leading-relaxed">
          AI-powered live presentation for worship, conferences, lectures, and theater. ACE listens to the room and pushes the right slide — automatically.
        </p>

        {/* Pill CTAs — primary mac/arm64, secondary Intel; Windows in waitlist row below */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/api/download?platform=mac-arm64"
            className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition shadow-[0_10px_40px_rgba(255,255,255,0.15)]"
          >
            Download for Mac · Apple Silicon
          </a>
          <a
            href="/api/download?platform=mac-x64"
            className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm transition border border-[#2A2A2A]"
          >
            Mac · Intel
          </a>
        </div>

        {/* Windows is in build — separate row so it reads as future, not current */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs">
          <span className="text-[#888]">Windows version</span>
          <a
            href="mailto:hello@ace-presenter.app?subject=ACE%20Windows%20waitlist&body=Please%20add%20me%20to%20the%20Windows%20waitlist."
            className="text-[#E8183A] hover:text-white transition font-semibold"
          >
            join the waitlist →
          </a>
        </div>

        <p className="mt-5 text-xs text-[#C4C4C4]">
          Free during public beta · macOS 12+
          {latestVersion && (
            <>
              {" · "}
              <span className="text-[#888]">
                Latest: <span className="text-white font-semibold tabular-nums">v{latestVersion}</span>
              </span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}

/* ───────────── STATS STRIP ───────────── */
function StatsStrip() {
  return (
    <section className="border-y border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-6 grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-6">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col gap-1 ${i > 0 ? "sm:border-l sm:border-[#1F1F1F] sm:pl-6" : ""}`}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C4C4C4] font-semibold">
              {s.label}
            </span>
            <span className="text-base sm:text-lg font-semibold text-white">{s.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────── COMPATIBILITY LOGO WALL ───────────── */
function Compatibility() {
  return (
    <section className="px-6 sm:px-10 py-16 border-b border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-[11px] uppercase tracking-[0.25em] text-[#C4C4C4] font-bold mb-8">
          Plays nicely with the rest of your rig
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {COMPAT.map((name) => (
            <span
              key={name}
              className="text-[#888] hover:text-white transition text-base sm:text-lg font-semibold tracking-tight"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── SEGMENTS (numbered glass cards) ───────────── */
function Segments() {
  return (
    <section id="use-cases" className="px-6 sm:px-10 py-24 relative">
      <div className="max-w-6xl mx-auto relative">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
          Use cases
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3 text-white max-w-2xl">
          One app, every <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">live</span> event
        </h2>
        <p className="text-[#C4C4C4] text-lg mb-12 max-w-2xl">
          Built for any room where someone speaks and slides need to follow them.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SEGMENTS.map((s, i) => (
            <div
              key={s.hook}
              className="group relative p-6 rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#121212] border border-[#222] hover:border-[#C8102E]/50 transition-colors overflow-hidden"
            >
              {/* Card glow on hover */}
              <div
                aria-hidden
                className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-[#C8102E]/0 group-hover:bg-[#C8102E]/15 blur-3xl transition-all duration-500"
              />

              <div className="relative">
                <div className="flex items-baseline justify-between mb-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#E8183A] font-bold">
                    {s.hook}
                  </div>
                  <div className="text-3xl font-bold text-[#2A2A2A] group-hover:text-[#C8102E]/60 transition tabular-nums">
                    0{i + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 text-white leading-tight">{s.title}</h3>
                <p className="text-[#C4C4C4] text-sm leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── BENTO FEATURE GRID ───────────── */
function BentoFeatures() {
  return (
    <section id="features" className="px-6 sm:px-10 py-24 border-y border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
          Capabilities
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3 text-white max-w-2xl">
          What ACE actually <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">does</span>
        </h2>
        <p className="text-[#C4C4C4] text-lg mb-12 max-w-2xl">
          Local-first, latency-conscious, built for the kind of pressure where mistakes are visible.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Big card — listening (spans 2 cols on desktop) */}
          <div className="sm:col-span-2 sm:row-span-2 p-8 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#101010] border border-[#222] relative overflow-hidden min-h-[280px]">
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#C8102E]/15 blur-3xl"
            />
            <div className="relative">
              <div className="w-12 h-1 bg-[#C8102E] rounded-full mb-6" />
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">Listens to live audio</h3>
              <p className="text-[#C4C4C4] leading-relaxed max-w-md">
                Microphone or NDI in. Whisper transcribes locally on your device — your audio never leaves the room by default. Sub-second latency on M-series Macs.
              </p>
            </div>
          </div>

          {/* Detect */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#222]">
            <div className="w-12 h-1 bg-[#C8102E] rounded-full mb-4" />
            <h3 className="text-lg font-bold mb-2 text-white">Detects what&apos;s being said</h3>
            <p className="text-[#C4C4C4] text-sm leading-relaxed">
              Songs, scripture, conference talks. Vector search matches transcripts against your library in real time.
            </p>
          </div>

          {/* Output */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#222]">
            <div className="w-12 h-1 bg-[#C8102E] rounded-full mb-4" />
            <h3 className="text-lg font-bold mb-2 text-white">Outputs anywhere</h3>
            <p className="text-[#C4C4C4] text-sm leading-relaxed">
              Fullscreen HDMI, NDI to ATEM, ProPresenter passthrough, browser-based stage monitor.
            </p>
          </div>

          {/* Three side-by-side cards in second row */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#222]">
            <div className="w-12 h-1 bg-[#C8102E] rounded-full mb-4" />
            <h3 className="text-lg font-bold mb-2 text-white">Built for live</h3>
            <p className="text-[#C4C4C4] text-sm leading-relaxed">
              Survives Wi-Fi drops, audio device swaps, and the occasional shouted prayer.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141414] border border-[#222]">
            <div className="w-12 h-1 bg-[#C8102E] rounded-full mb-4" />
            <h3 className="text-lg font-bold mb-2 text-white">Voice control</h3>
            <p className="text-[#C4C4C4] text-sm leading-relaxed">
              &quot;Next slide&quot;, &quot;clear&quot;, &quot;Bible mode on&quot;. Operator hands stay free.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141414] border border-[#222]">
            <div className="w-12 h-1 bg-[#C8102E] rounded-full mb-4" />
            <h3 className="text-lg font-bold mb-2 text-white">Update prompts</h3>
            <p className="text-[#C4C4C4] text-sm leading-relaxed">
              When a new version ships, ACE shows a download prompt on launch and hands off to your browser — no surprise installs mid-service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── WHAT'S NEW (v1.4 release marker) ───────────── */
function WhatsNew() {
  const HIGHLIGHTS: { tag: string; title: string; body: string }[] = [
    {
      tag: "Unified render",
      title: "Looks drive every output, in real time",
      body: "One toggle in Settings → Screens & Display → Advanced flips ACE into Looks-driven rendering. Per-screen theme overrides, per-screen layer toggles, real-time edits — the audience output reflects every change within one slide tick.",
    },
    {
      tag: "Multi-screen, multi-theme",
      title: "Different theme on each audience display, simultaneously",
      body: "Lobby TV in dark + sanctuary projector in scripture + balcony screen in branded? Each output reads its own theme override directly. No more global flatten that clobbers other screens.",
    },
    {
      tag: "Sermon prep auto-detect",
      title: "Bible references parsed on import",
      body: "Drop a sermon PPTX → ACE scans every slide title and speaker note for scripture, attached inline. Drop any song file → references in the lyrics surface per section. Wizard groups them: 'Slide 3: Romans 8:28', 'Verse 2: John 3:16'.",
    },
    {
      tag: "Detection that actually follows",
      title: "Section-stuck bug is gone",
      body: "v1.3 detection could lock onto verse 1 and refuse to advance to chorus. v1.4's rewrite gives every section equal billing in Whisper's prompt — transcripts and votes flow naturally with the band.",
    },
  ];

  const FIXES = [
    "Song detection getting stuck on verse 1 / chorus — Whisper context-prompt rebalanced; section transitions flow with the band",
    "Live transcript not following the song — same root cause as section-stuck; one fix restores accurate transcript display",
    "Settings → Updates showing wrong version on a fresh install — build pipeline now chains backend:build before electron-builder so v1.4.0 ships with the right baked version everywhere",
    "ThemeDesigner card-click now opens the editor (was: applied to display, requiring a hidden hover-pencil to actually edit)",
    "AudioVisualizer carries the mic-state signal — traffic-light colour replaces the redundant 5-bar meter and 'Low mic' badge",
  ];

  return (
    <section id="whats-new" className="px-6 sm:px-10 py-24 border-b border-[#1A1A1A] scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8183A] font-bold">
            What&apos;s new
          </span>
          <span className="h-px flex-1 bg-[#1F1F1F]" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-12 leading-tight">
          v1.4 — Looks drive
          <br />
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
            every screen
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.tag}
              className="p-6 rounded-2xl bg-[#141414] border border-[#222] hover:border-[#2F2F2F] transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8183A]" />
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#E8183A] font-bold">
                  {h.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 leading-tight">{h.title}</h3>
              <p className="text-[#C4C4C4] text-sm leading-relaxed">{h.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-[#101010] border border-[#1F1F1F] p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#888] font-bold">
              Also fixed
            </span>
            <span className="h-px flex-1 bg-[#1F1F1F]" />
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {FIXES.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-[#A3A3A3] text-sm leading-relaxed">
                <span className="mt-2 w-1 h-1 rounded-full bg-[#444] shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[12px] text-[#666] mt-6">
          Full release notes live in-app under Settings → Updates. Earlier
          releases (v1.0.0–v1.1.0) listed there too.
        </p>
      </div>
    </section>
  );
}

/* ───────────── BIG STAT CALLOUTS ───────────── */
function BigStats() {
  return (
    <section className="px-6 sm:px-10 py-24 border-b border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        <BigStat number="< 1s" label="Detection latency on M-series Macs" />
        <BigStat number="100%" label="On-device transcription by default" />
        <BigStat number="12+" label="Languages with auto-detect" />
      </div>
    </section>
  );
}

function BigStat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center sm:text-left">
      <div className="text-6xl sm:text-7xl font-bold tracking-tight text-white tabular-nums">
        <span className="bg-gradient-to-b from-white to-[#666] bg-clip-text text-transparent">
          {number}
        </span>
      </div>
      <div className="mt-3 text-[#C4C4C4] text-sm leading-relaxed max-w-[280px] mx-auto sm:mx-0">
        {label}
      </div>
    </div>
  );
}

/* ───────────── PRICING TEASER ───────────── */
function PricingTeaser() {
  const tiers: {
    name: string;
    price: string;
    period: string;
    note?: string;
    features: string[];
    primary?: boolean;
  }[] = [
    {
      name: "Beta",
      price: "Free",
      period: "until Day 90",
      note: "Available now",
      features: [
        "Full feature access",
        "All output formats",
        "Auto-updates",
        "Grandfathered to Standard for life",
      ],
      primary: true,
    },
    {
      name: "Standard",
      price: "$19",
      period: "/ month",
      features: [
        "Bundled API access (ACR · Whisper · Claude)",
        "Priority detection updates",
        "Email support",
        "Single-seat license",
      ],
    },
    {
      name: "Pro",
      price: "$39",
      period: "/ month",
      features: [
        "Everything in Standard",
        "Multi-seat (up to 5)",
        "Priority support + onboarding call",
        "Sponsor early-access features",
      ],
    },
  ];

  return (
    <section id="pricing" className="px-6 sm:px-10 py-24 border-b border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3 text-center">
          Pricing
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3 text-white text-center">
          Free now. <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">Fair</span> later.
        </h2>
        <p className="text-[#C4C4C4] text-lg mb-12 max-w-2xl mx-auto text-center">
          Public beta is completely free. Paid tiers begin Day 90 — and every beta user is grandfathered into Standard for life as a thank-you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`p-7 rounded-2xl relative ${
                t.primary
                  ? "bg-gradient-to-b from-[#C8102E]/15 to-[#1A1A1A] border border-[#C8102E]/40"
                  : "bg-[#141414] border border-[#222]"
              }`}
            >
              {t.note && (
                <div className="absolute -top-2.5 left-7 px-2.5 py-0.5 rounded-full bg-[#C8102E] text-white text-[10px] uppercase tracking-wider font-bold">
                  {t.note}
                </div>
              )}
              <div className="text-sm font-bold uppercase tracking-wider text-[#C4C4C4] mb-3">
                {t.name}
              </div>
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-4xl font-bold text-white tracking-tight">{t.price}</span>
                <span className="text-[#C4C4C4] text-sm">{t.period}</span>
              </div>
              <ul className="space-y-2.5 text-sm text-[#D4D4D4]">
                {t.features.map((f) => (
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
    </section>
  );
}

/* ───────────── FINAL CTA ───────────── */
function FinalCTA() {
  return (
    <section className="px-6 sm:px-10 py-28 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 100%, rgba(200,16,46,0.20) 0%, rgba(200,16,46,0) 70%)",
        }}
      />
      <div className="max-w-3xl mx-auto text-center relative">
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-5 text-white">
          Ready to{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
            stop clicking
          </span>
          ?
        </h2>
        <p className="text-[#C4C4C4] text-lg mb-10 max-w-xl mx-auto">
          Free during the public beta. New releases ship every few weeks — ACE prompts you on launch when one&apos;s ready.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/api/download?platform=mac-arm64"
            className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition"
          >
            Download for Mac · Apple Silicon
          </a>
          <a
            href="/api/download?platform=mac-x64"
            className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm transition border border-[#2A2A2A]"
          >
            Mac · Intel
          </a>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs">
          <span className="text-[#888]">Windows version</span>
          <a
            href="mailto:hello@ace-presenter.app?subject=ACE%20Windows%20waitlist&body=Please%20add%20me%20to%20the%20Windows%20waitlist."
            className="text-[#E8183A] hover:text-white transition font-semibold"
          >
            join the waitlist →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────── FOOTER ───────────── */
function Footer() {
  return (
    <footer className="px-6 sm:px-10 py-10 border-t border-[#1A1A1A] text-sm text-[#C4C4C4]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={20} height={20} className="rounded" />
          <div className="flex flex-col leading-tight">
            <span className="text-[12px] text-white">ACE — Agentic Cue Experience</span>
            <span className="text-[10px] text-[#888]">© 2026 ACE</span>
          </div>
        </div>
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <Link href="/guide" className="hover:text-white transition">Guide</Link>
          <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
          <Link href="/support" className="hover:text-white transition">Support</Link>
          <a href="mailto:hello@ace-presenter.app" className="hover:text-white transition">
            hello@ace-presenter.app
          </a>
        </div>
      </div>
    </footer>
  );
}
