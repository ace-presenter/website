import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import WhatsNewModal from "@/components/WhatsNewModal";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ManualBanner from "@/components/ManualBanner";
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
  StatsBand,
  LogoMarquee,
  FeatureBento,
  CTABand,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "ACE Presenter",
  description:
    "Live presentation software for worship, conferences, lectures, and theater. ACE follows the room and pushes the right slide — no clicking required.",
  alternates: { canonical: "/presenter" },
};

export const revalidate = 300;

async function fetchLatestVersion(): Promise<string | null> {
  try {
    // Presenter ships a Sparkle appcast (native app), not electron's yml.
    const r = await fetch("https://dl.ace-presenter.app/presenter/appcast.xml", {
      next: { revalidate: 300 },
    });
    if (!r.ok) return null;
    const text = await r.text();
    // Newest <item> is first; read its Sparkle version string.
    const m =
      text.match(/<sparkle:shortVersionString>([^<]+)<\/sparkle:shortVersionString>/) ??
      text.match(/<sparkle:version>([^<]+)<\/sparkle:version>/);
    return m ? m[1].trim() : null;
  } catch {
    return null;
  }
}

/**
 * The newest published Windows build, or null when there is not one yet.
 *
 * Windows has its own appcast beside the macOS one. Reading it rather than
 * hardcoding a state means the download button turns itself on the moment the
 * first build is published and needs no site deploy to do it — and, just as
 * importantly, cannot show a download that 404s in the window between the two.
 * An empty feed is a valid "nothing yet", not an error.
 */
async function fetchWindowsRelease(): Promise<{ version: string } | null> {
  try {
    const r = await fetch("https://dl.ace-presenter.app/presenter-win/appcast.xml", {
      next: { revalidate: 300 },
    });
    if (!r.ok) return null;
    const text = await r.text();
    // Ignore the commented-out example in the empty feed: only match a version
    // that sits inside a real <item>.
    const items = text.replace(/<!--[\s\S]*?-->/g, "").match(/<item[\s\S]*?<\/item>/g);
    if (!items || items.length === 0) return null;
    const m =
      items[0].match(/<sparkle:shortVersionString>([^<]+)<\/sparkle:shortVersionString>/) ??
      items[0].match(/<sparkle:version>([^<]+)<\/sparkle:version>/);
    return m ? { version: m[1].trim() } : null;
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

const COMPAT = [
  "ProPresenter import",
  "ATEM",
  "OBS Studio",
  "HDMI out",
  "NDI",
  "MIDI",
  "OSC",
  "PowerPoint",
  "Keynote",
  "iPhone remote",
  "Android remote",
];

export default async function PresenterPage() {
  // Fetched together so one slow feed does not serialise behind the other.
  const [latestVersion, windowsRelease] = await Promise.all([
    fetchLatestVersion(),
    fetchWindowsRelease(),
  ]);
  const windowsVersion = windowsRelease?.version ?? null;
  return (
    <main className="flex-1 flex flex-col font-sans">
      <SchemaJsonLd />
      <Nav activeProduct="presenter" />
      <ManualBanner />
      <Hero latestVersion={latestVersion} windowsVersion={windowsVersion} />
      <LogoMarquee
        label="Plays nicely with the rest of your rig"
        items={COMPAT}
        className="border-b border-[#1A1A1A]"
      />
      <ProductTheme product="presenter">
        <StatsBand
          stats={[
            { text: "0", label: "Clicks to advance" },
            { num: { to: 12, suffix: "+" }, label: "Languages" },
            { text: "Free", label: "To get started" },
            { text: "macOS 14+", label: "Apple Silicon" },
          ]}
        />
      </ProductTheme>
      <PropresenterMigration />
      <Capabilities />
      <SeeItRun />
      <Segments />
      <WhatYouGet />
      <RemoteApp />
      <PricingTeaser />
      <CTABand
        product="presenter"
        eyebrow="Get started"
        title={
          <>
            ACE listens. You <AccentItalic>present</AccentItalic>.
          </>
        }
        sub="Free tier available · Pro from $29/month"
        primary={{ href: "/api/download?platform=mac-arm64", label: "Download for Mac" }}
        secondary={{ href: "/pricing", label: "View pricing" }}
      />
      <Footer />
      <WhatsNewModal version={latestVersion} />
    </main>
  );
}

/* ───────────── HERO ───────────── */
function Hero({
  latestVersion,
  windowsVersion,
}: {
  latestVersion: string | null;
  windowsVersion: string | null;
}) {
  return (
    <HeroShell product="presenter" fill={false} floating={<HeroChips />}>
      <div className="mb-7 flex items-center gap-3">
        <span className="h-px w-8 bg-[#C8102E]" aria-hidden />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#888]">
          Live presentation, on autopilot
        </span>
        <span className="h-px w-8 bg-[#C8102E]" aria-hidden />
      </div>

      <h1 className="text-[2.6rem] font-bold leading-[1.0] tracking-tight text-white sm:text-7xl sm:leading-[0.95] lg:text-8xl">
        ACE listens.{" "}
        <br className="hidden sm:block" />
        You <AccentItalic>present</AccentItalic>
        <span className="text-[#C8102E]">.</span>
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#C4C4C4] sm:text-xl">
        AI-powered live presentation for worship, conferences, lectures, and
        theater. ACE listens to the room and pushes the right slide —
        automatically.
      </p>

      <div className="mt-10 flex justify-center">
        <MagneticButton
          href="/api/download?platform=mac-arm64"
          glowRgb="200,16,46"
          className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-colors hover:bg-[#E8E8E8]"
        >
          Download for Mac · Apple Silicon
        </MagneticButton>
      </div>

      {windowsVersion ? (
        <div className="mt-4 flex justify-center">
          <Link
            href="/api/download?product=presenter&platform=win"
            className="rounded-full border border-[#3A3A3A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-black"
          >
            Download for Windows
          </Link>
        </div>
      ) : (
        <div className="mt-4 flex justify-center text-xs">
          <span className="text-[#888]">
            Windows version{" "}
            <Link href="/waitlist" className="font-semibold text-[#E8183A] transition hover:text-white">
              join the waitlist →
            </Link>
          </span>
        </div>
      )}

      <p className="mt-5 text-xs text-[#C4C4C4]">
        Free tier available · macOS 14+{windowsVersion ? " · Windows 10+" : ""}
        {latestVersion && (
          <>
            {" · "}
            <span className="text-[#888]">
              Latest:{" "}
              <span className="font-semibold tabular-nums text-white">v{latestVersion}</span>
            </span>
          </>
        )}
      </p>

      {/* Real flagship UI — framed and glowing under the hero copy. */}
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

/* ───────────── SEE IT RUN (real UI, alternating) ───────────── */
function Shot({
  eyebrow,
  headline,
  body,
  src,
  alt,
  flip = false,
}: {
  eyebrow: string;
  headline: React.ReactNode;
  body: string;
  src: string;
  alt: string;
  flip?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={flip ? "lg:order-2" : ""}>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#E8183A]">
          {eyebrow}
        </span>
        <h3 className="mt-4 text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl">
          {headline}
        </h3>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-[#B4B4B4] sm:text-lg">
          {body}
        </p>
      </Reveal>
      <div className={flip ? "lg:order-1" : ""}>
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] blur-2xl"
            style={{
              background: "radial-gradient(60% 60% at 50% 45%, rgba(200,16,46,0.24), transparent 75%)",
            }}
          />
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D] shadow-[0_32px_90px_-28px_rgba(0,0,0,0.8)]">
            <Image src={src} alt={alt} width={2200} height={1384} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SeeItRun() {
  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="See it run"
            title={
              <>
                The whole service, <AccentItalic>in one window</AccentItalic>.
              </>
            }
            lede="Library, stage output, themes, and program — everything an operator touches during a live service, built native for macOS."
          />
        </Reveal>
        <div className="mt-20 flex flex-col gap-24 sm:gap-28">
          <Shot
            eyebrow="Stage output"
            headline={
              <>
                Follows the song, <AccentItalic>line by line</AccentItalic>.
              </>
            }
            body="ACE hears the band and pushes the current lyric to the audience screen the moment it lands — with the next line staged and a live confidence read, so you always know what it's about to do."
            src="/presenter/stage-display.png"
            alt="ACE Presenter stage display showing live lyrics and the next line"
          />
          <Shot
            flip
            eyebrow="Looks & themes"
            headline={
              <>
                Every look, <AccentItalic>one click</AccentItalic>.
              </>
            }
            body="Build a Worship look and a Sermon look, then switch the whole presentation style — background, fonts, which layers are on — with a single click, per screen."
            src="/presenter/looks.png"
            alt="ACE Presenter Looks and Themes grid"
          />
          <Shot
            eyebrow="Theme editor"
            headline={
              <>
                Design it exactly <AccentItalic>your way</AccentItalic>.
              </>
            }
            body="Full control over type, color, and background media per slide object — edit lyrics, scripture, and announcements live while the service runs."
            src="/presenter/theme-editor.png"
            alt="ACE Presenter theme editor with lyrics on a red background"
          />
        </div>
      </div>
    </section>
  );
}

/* Floating chips — live artifacts of the listening engine. */
function HeroChips() {
  return (
    <>
      <FloatingCard className="left-[5%] top-[24%] w-52 p-4" delay={-2} duration={7.5}>
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#888]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
          Listening
        </div>
        <div className="mt-3 flex h-6 items-end gap-[3px]">
          {[0.8, 0.45, 1, 0.6, 0.85, 0.35, 0.7, 0.5, 0.9, 0.4].map((h, i) => (
            <span
              key={i}
              className="ace-wave-bar w-[3px] rounded-full bg-[#E8183A]/70"
              style={{ height: `${h * 100}%`, animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>
      </FloatingCard>

      <FloatingCard className="right-[5%] top-[22%] w-56 p-4" delay={-5} duration={8.5}>
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#888]">
          Detected
        </div>
        <div className="mt-2 text-sm font-semibold text-white">
          &ldquo;…turn with me to John 3:16&rdquo;
        </div>
        <div className="mt-1.5 font-mono text-[10px] text-[#E8183A]">
          → John 3:16 · on screen
        </div>
      </FloatingCard>

      <FloatingCard className="bottom-[18%] right-[9%] w-44 p-4" delay={-3.5} duration={6.5}>
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#888]">
          Cue latency
        </div>
        <div className="mt-1.5 text-2xl font-bold tabular-nums text-white">
          0.4<span className="text-sm text-[#888]">s</span>
        </div>
      </FloatingCard>
    </>
  );
}

/* ───────────── PROPRESENTER MIGRATION ───────────── */
function PropresenterMigration() {
  const chips = ["Songs", "Sections", "Media", "Playlists"];
  return (
    <section className="border-b border-[#1A1A1A] px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#1A1A1A] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
          <span aria-hidden>★</span>
          Already using ProPresenter?
        </div>

        <div className="mb-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="glass-card rounded-xl px-5 py-3">
              <span className="text-xl font-bold tracking-tight text-[#C4C4C4] sm:text-2xl">
                Pro<span className="text-white">Presenter</span>
              </span>
            </div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#666]">From</span>
          </div>

          <div className="flex flex-col items-center gap-2.5">
            <div className="flex max-w-[280px] flex-wrap items-center justify-center gap-1.5">
              {chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-[#C8102E]/30 bg-[#1A1A1A] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white"
                >
                  {c}
                </span>
              ))}
            </div>
            <svg className="h-4 w-20 rotate-90 sm:rotate-0" viewBox="0 0 80 16" fill="none" aria-hidden>
              <path d="M0 8 L72 8 M64 2 L72 8 L64 14" stroke="#C8102E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2.5 rounded-xl border border-[#C8102E]/40 bg-[#0F0F0F] px-5 py-3">
              <Image src="/logo.png" alt="ACE" width={28} height={28} className="rounded" />
              <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">ACE</span>
            </div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#C8102E]">To</span>
          </div>
        </div>

        <h2 className="mx-auto mb-4 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
          Migrating from ProPresenter, made easy<span className="text-[#C8102E]">.</span>
        </h2>

        <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-[#C4C4C4] sm:text-lg">
          Five-stage wizard finds your local ProPresenter library, previews
          exactly what&apos;s coming across, then imports songs, sections, media, and
          playlists in one click.
        </p>

        <MagneticButton
          href="/api/download?platform=mac-arm64"
          glowRgb="200,16,46"
          className="inline-block rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition hover:bg-[#E8E8E8]"
        >
          Try the migrator →
        </MagneticButton>

        <p className="mx-auto mt-6 max-w-md text-[11px] text-[#666]">
          ProPresenter is a trademark of Renewed Vision. ACE is independent
          software and is not affiliated with or endorsed by Renewed Vision.
        </p>
      </div>
    </section>
  );
}

/* ───────────── CAPABILITIES (bento) ───────────── */
function Capabilities() {
  return (
    <ProductTheme product="presenter">
      <section id="features" className="px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="What ACE actually does"
              lede="Local-first, latency-conscious, built for the kind of pressure where mistakes are visible."
            />
          </Reveal>
          <FeatureBento
            className="mt-14"
            items={[
              {
                title: "Hears the room",
                desc: "Point a microphone at the stage and ACE starts listening. No configuration — it picks up what's being sung or spoken and keeps the right content on screen.",
                span: "wide",
                visual: (
                  <div className="flex h-8 items-end gap-[3px]">
                    {[0.7, 0.4, 0.95, 0.55, 0.8, 0.3, 0.65, 0.5, 0.9, 0.45, 0.75, 0.35].map((h, i) => (
                      <span
                        key={i}
                        className="ace-wave-bar w-1 rounded-full bg-[var(--accent-vivid)]/60"
                        style={{ height: `${h * 100}%`, animationDelay: `${i * 0.08}s` }}
                      />
                    ))}
                  </div>
                ),
              },
              {
                title: "Finds the right slide",
                desc: "Songs, scripture, conference talks — matched against your library the moment they happen. No clicking to advance.",
              },
              {
                title: "Drives your screens",
                desc: "Audience projector, stage monitor for the team, and a live operator preview — all controlled from one window on your Mac.",
              },
              {
                title: "Stays live all service",
                desc: "Designed to run for hours without a restart. Handles the unpredictable moments — speaker goes off-script, song order changes last minute, a slide gets skipped.",
              },
              {
                title: "Voice commands",
                desc: (
                  <>
                    &ldquo;Next slide&rdquo;, &ldquo;clear screen&rdquo;, &ldquo;Bible mode&rdquo;.
                    Speak the command, keep your hands on other things.
                    <span className="ace-caret ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 bg-[var(--accent-vivid)]/80" aria-hidden />
                  </>
                ),
              },
              {
                title: "Control from your phone",
                desc: "The ACE Remote app connects to your Mac over Wi-Fi. Advance slides, blank the screen, or jump to any slide from anywhere in the room — no clicker required.",
              },
              {
                title: "Always up to date",
                desc: "New versions install in the background and are ready next time you launch — nothing interrupts a live service.",
              },
            ]}
          />
        </div>
      </section>
    </ProductTheme>
  );
}

/* ───────────── SEGMENTS ───────────── */
function Segments() {
  return (
    <ProductTheme product="presenter">
      <section id="use-cases" className="relative border-t border-[#1A1A1A] px-6 py-24 sm:px-10">
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Use cases"
              title="One app, every live event"
              lede="Built for any room where someone speaks and slides need to follow them."
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {SEGMENTS.map((s, i) => (
              <Item key={s.hook}>
                <SpotlightCard className="glass-card h-full rounded-2xl">
                  <Link
                    href={`/presenter/${s.hook.toLowerCase().split(" ")[0]}`}
                    className="group block h-full p-6"
                  >
                    <div className="mb-6 flex items-baseline justify-between">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8183A]">
                        {s.hook}
                      </div>
                      <div className="text-3xl font-bold tabular-nums text-[#2A2A2A] transition group-hover:text-[#C8102E]/60">
                        0{i + 1}
                      </div>
                    </div>
                    <h3 className="mb-3 text-lg font-bold leading-tight text-white">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-[#C4C4C4]">{s.body}</p>
                  </Link>
                </SpotlightCard>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
    </ProductTheme>
  );
}

/* ───────────── WHAT YOU GET ───────────── */
function WhatYouGet() {
  const MOMENTS = [
    {
      tag: "Songs",
      title: "The lyrics advance on their own",
      body: "ACE listens to the music and follows along verse by verse. The right lyrics reach the audience screen the moment the team sings them — no operator needed to click forward.",
    },
    {
      tag: "Scripture",
      title: "Bible references appear as they're spoken",
      body: "When a preacher says \"turn to John 3:16\", ACE recognises the reference and brings up the passage. The operator never has to type anything.",
    },
    {
      tag: "Service plan",
      title: "Build the order of service. Run it live.",
      body: "Drag songs, scripture, announcements, and media into a plan. Activate it, hit Go, and ACE follows your sequence — ready to jump ahead or hold back whenever the service changes.",
    },
    {
      tag: "Stage monitor",
      title: "The team sees what's coming next",
      body: "A dedicated stage output shows the current slide, the next cue, and a live read on what ACE is listening to. The team knows what's on the audience screen without needing to look.",
    },
  ];
  return (
    <section className="scroll-mt-24 border-t border-[#1A1A1A] px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="What you get"
            title={<>The whole service, <AccentItalic>covered</AccentItalic>.</>}
            lede="From the first song to the closing word — ACE keeps the right content on screen without the team having to manage slides."
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {MOMENTS.map((h) => (
            <div key={h.tag} className="glass-card rounded-2xl p-6 transition-colors hover:border-white/20">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8183A]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8183A]">
                  {h.tag}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold leading-tight text-white">{h.title}</h3>
              <p className="text-sm leading-relaxed text-[#C4C4C4]">{h.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── ACE REMOTE APP ───────────── */
function RemoteApp() {
  const features = [
    "Next, previous, and blank from your pocket",
    "See the current cue and what's coming next",
    "Search your song and Bible library on-the-fly",
    "Toggle audience and stage screens remotely",
  ];
  return (
    <section className="border-t border-[#1A1A1A] px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Copy */}
          <Reveal>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#E8183A]">
              ACE Remote
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Control from anywhere<br className="hidden sm:block" /> in the room.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#B4B4B4] sm:text-lg">
              The ACE Remote app connects to your Mac over Wi-Fi. No setup beyond your local network — open the app, connect, and you have full control from your phone.
            </p>
            <ul className="mt-8 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-[#C4C4C4]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8183A]" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-[#666]">
              Available for iPhone and Android · connects over local Wi-Fi
            </p>
          </Reveal>

          {/* Phone screenshots — 6-phone fanned arrangement */}
          <div className="relative mx-auto flex h-[540px] w-full max-w-[620px] items-center justify-center lg:h-[600px]">
            {/* Glow behind phones */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 rounded-[3rem] blur-3xl"
              style={{
                background:
                  "radial-gradient(55% 55% at 50% 55%, rgba(200,16,46,0.18), transparent 80%)",
              }}
            />
            {/* Far left: sign in */}
            <div className="absolute left-0 top-14 w-[114px] -rotate-[14deg] overflow-hidden rounded-[1.8rem] border border-white/7 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.75)]">
              <Image
                src="/remote/remote_login.png"
                alt="ACE Remote — sign in"
                width={310}
                height={672}
                className="w-full"
              />
            </div>
            {/* Left: library search */}
            <div className="absolute left-[9%] top-7 w-[130px] -rotate-[7deg] overflow-hidden rounded-[2rem] border border-white/8 shadow-[0_20px_44px_-12px_rgba(0,0,0,0.75)]">
              <Image
                src="/remote/remote_library.png"
                alt="ACE Remote — library search"
                width={310}
                height={672}
                className="w-full"
              />
            </div>
            {/* Centre-left: account / plan */}
            <div className="absolute left-[21%] top-2 z-[1] w-[148px] -rotate-[2deg] overflow-hidden rounded-[2.1rem] border border-white/12 shadow-[0_24px_52px_-12px_rgba(0,0,0,0.75)]">
              <Image
                src="/remote/remote_account.png"
                alt="ACE Remote — account and plan"
                width={310}
                height={672}
                className="w-full"
              />
            </div>
            {/* Centre: remote control (hero phone) */}
            <div className="relative z-10 w-[172px] overflow-hidden rounded-[2.4rem] border border-white/20 shadow-[0_40px_80px_-16px_rgba(200,16,46,0.28),0_40px_80px_-16px_rgba(0,0,0,0.85)]">
              <Image
                src="/remote/remote_control.png"
                alt="ACE Remote — slide control"
                width={310}
                height={672}
                className="w-full"
              />
            </div>
            {/* Centre-right: screens */}
            <div className="absolute right-[21%] top-2 z-[1] w-[148px] rotate-[2deg] overflow-hidden rounded-[2.1rem] border border-white/12 shadow-[0_24px_52px_-12px_rgba(0,0,0,0.75)]">
              <Image
                src="/remote/remote_screens.png"
                alt="ACE Remote — screens overview"
                width={310}
                height={672}
                className="w-full"
              />
            </div>
            {/* Right: language */}
            <div className="absolute right-[9%] top-7 w-[130px] rotate-[7deg] overflow-hidden rounded-[2rem] border border-white/8 shadow-[0_20px_44px_-12px_rgba(0,0,0,0.75)]">
              <Image
                src="/remote/remote_language.png"
                alt="ACE Remote — language settings"
                width={310}
                height={672}
                className="w-full"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ───────────── PRICING TEASER ───────────── */
function PricingTeaser() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Unlimited songs, slides, and cues",
        "Automatic song and Bible detection",
        "Import from ProPresenter",
        "1 audience output",
        "12+ languages",
      ],
    },
    {
      name: "Pro",
      price: "$29",
      period: "/ month",
      note: "Most popular",
      highlight: true,
      features: [
        "Everything in Free",
        "No watermark on any output",
        "Audience screen + stage monitor",
        "Looks and themes editor",
        "Licensed Bible translations",
        "Background video and media layers",
        "Priority support",
        "Or $279 / year",
      ],
    },
    {
      name: "Venue",
      price: "Custom",
      period: "per seat",
      features: [
        "Everything in Pro",
        "Multiple seats — use across your team",
        "Shared song and media library",
        "Central billing",
        "Onboarding call included",
      ],
    },
  ] as const;
  return (
    <section id="pricing" className="border-t border-[#1A1A1A] px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title={<>Free to start. <AccentItalic>Built to grow.</AccentItalic></>}
            lede="Start free with no limits on your content. Upgrade when you need more outputs, no watermark, or seats for your whole team."
          />
        </Reveal>
        <p className="mb-12 mt-4 text-center">
          <Link href="/pricing" className="text-sm font-semibold text-[#C8102E] transition hover:text-[#E8183A]">
            Full pricing details →
          </Link>
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl p-7 ${"highlight" in t && t.highlight
                ? "border border-[#C8102E]/40 bg-gradient-to-b from-[#C8102E]/15 to-[#1A1A1A]"
                : "glass-card"
              }`}
            >
              {"note" in t && t.note && (
                <div className="absolute -top-2.5 left-7 rounded-full bg-[#C8102E] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  {t.note}
                </div>
              )}
              <div className="mb-3 text-sm font-bold uppercase tracking-wider text-[#C4C4C4]">{t.name}</div>
              <div className="mb-6 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold tracking-tight text-white">{t.price}</span>
                <span className="text-sm text-[#C4C4C4]">{t.period}</span>
              </div>
              <ul className="space-y-2.5 text-sm text-[#D4D4D4]">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#C8102E]">✓</span>
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
