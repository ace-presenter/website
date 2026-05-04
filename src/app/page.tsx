import Link from "next/link";

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

const FEATURES: { title: string; body: string }[] = [
  {
    title: "Listens to live audio",
    body: "Microphone or NDI in. Whisper transcribes locally — your audio never leaves the device by default.",
  },
  {
    title: "Detects what's being said",
    body: "Songs, scripture, conference talks. Vector-search matches transcripts against your library in real time.",
  },
  {
    title: "Outputs anywhere",
    body: "Fullscreen HDMI, NDI to ATEM, ProPresenter passthrough, browser-based stage monitor.",
  },
  {
    title: "Built for live, not for demos",
    body: "Sub-second latency on a M-series Mac. Survives Wi-Fi drops, audio device swaps, and the occasional shouted prayer.",
  },
];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      {/* Top nav */}
      <nav className="px-6 sm:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
            <span className="font-bold text-sm">A</span>
          </div>
          <span className="font-semibold tracking-tight text-lg">ACE</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm text-zinc-400">
          <Link href="#features" className="hover:text-white transition">Features</Link>
          <Link href="#segments" className="hover:text-white transition">Use cases</Link>
          <Link href="/support" className="hover:text-white transition">Support</Link>
          <Link
            href="/api/download?platform=mac-arm64"
            className="px-3 py-1.5 rounded-md bg-blue-500 hover:bg-blue-400 text-white font-medium transition"
          >
            Download
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 pb-20 pt-12 sm:pt-20 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/20 mb-6">
          Live presentation, on autopilot
        </span>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          ACE listens.<br />You present.
        </h1>

        <p className="mt-6 max-w-2xl text-lg sm:text-xl text-zinc-400 leading-relaxed">
          AI-powered live presentation for worship, conferences, lectures, and theater. ACE listens to the room and pushes the right slide — automatically.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
          <DownloadButton platform="mac-arm64" label="Download for Mac (Apple Silicon)" primary />
          <DownloadButton platform="mac-x64" label="Mac (Intel)" />
          <DownloadButton platform="win" label="Windows" />
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Free during public beta · macOS 12+ / Windows 10+ · Auto-updates
        </p>
      </section>

      {/* Segments */}
      <section id="segments" className="px-6 sm:px-10 py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">One app, every live event</h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-2xl">
            Built for any room where someone speaks and slides need to follow them.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {SEGMENTS.map((s) => (
              <div
                key={s.hook}
                className="p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition"
              >
                <div className="text-xs uppercase tracking-wider text-blue-300/80 font-semibold mb-2">
                  {s.hook}
                </div>
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 sm:px-10 py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">What ACE actually does</h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-2xl">
            Local-first, latency-conscious, built for the kind of pressure where mistakes are visible.
          </p>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {FEATURES.map((f) => (
              <div key={f.title}>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Free during the public beta</h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            ACE is free for the first 90 days post-launch. Existing users will be grandfathered into the Standard tier for life as a thank-you for testing.
          </p>
          <DownloadButton platform="mac-arm64" label="Download for Mac" primary />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-10 py-10 border-t border-white/5 text-sm text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 ACE</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-300 transition">Terms</Link>
            <Link href="/support" className="hover:text-zinc-300 transition">Support</Link>
            <a
              href="mailto:hello@ace-presenter.app"
              className="hover:text-zinc-300 transition"
            >
              hello@ace-presenter.app
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function DownloadButton({
  platform,
  label,
  primary,
}: {
  platform: "mac-arm64" | "mac-x64" | "win";
  label: string;
  primary?: boolean;
}) {
  const className = primary
    ? "px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-semibold transition shadow-lg shadow-blue-500/30"
    : "px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 font-medium transition border border-white/10";
  return (
    <a href={`/api/download?platform=${platform}`} className={className}>
      {label}
    </a>
  );
}
