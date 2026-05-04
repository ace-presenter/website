import Link from "next/link";
import Image from "next/image";

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
      <nav className="px-6 sm:px-10 py-5 flex items-center justify-between border-b border-[#1A1A1A]">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="ACE logo"
            width={36}
            height={36}
            priority
            className="rounded-md"
          />
          <span className="font-bold tracking-tight text-xl">ACE</span>
        </Link>
        <div className="hidden sm:flex items-center gap-8 text-sm text-[#A3A3A3]">
          <Link href="#features" className="hover:text-white transition">Features</Link>
          <Link href="#segments" className="hover:text-white transition">Use cases</Link>
          <Link href="/support" className="hover:text-white transition">Support</Link>
          <Link
            href="/api/download?platform=mac-arm64"
            className="px-4 py-2 rounded-md bg-[#C8102E] hover:bg-[#E8183A] text-white font-bold uppercase tracking-wider text-xs transition"
          >
            Download
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 pb-20 pt-16 sm:pt-24 text-center relative overflow-hidden">
        {/* Subtle radial brand glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(200,16,46,0.12) 0%, rgba(200,16,46,0) 70%)",
          }}
        />

        <Image
          src="/logo-large.png"
          alt="ACE"
          width={96}
          height={96}
          priority
          className="rounded-2xl mb-8 shadow-[0_20px_60px_rgba(200,16,46,0.25)]"
        />

        <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#E8183A] bg-[#C8102E]/10 border border-[#C8102E]/30 mb-6 font-semibold">
          Live presentation, on autopilot
        </span>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-white">
          ACE listens.<br />
          <span className="text-[#C8102E]">You present.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg sm:text-xl text-[#A3A3A3] leading-relaxed">
          AI-powered live presentation for worship, conferences, lectures, and theater. ACE listens to the room and pushes the right slide — automatically.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
          <DownloadButton platform="mac-arm64" label="Download for Mac (Apple Silicon)" primary />
          <DownloadButton platform="mac-x64" label="Mac (Intel)" />
          <DownloadButton platform="win" label="Windows" />
        </div>

        <p className="mt-4 text-xs text-[#A3A3A3]">
          Free during public beta · macOS 12+ / Windows 10+ · Auto-updates
        </p>
      </section>

      {/* Segments */}
      <section id="segments" className="px-6 sm:px-10 py-24 border-t border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
            Use cases
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">One app, every live event</h2>
          <p className="text-[#A3A3A3] text-lg mb-12 max-w-2xl">
            Built for any room where someone speaks and slides need to follow them.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {SEGMENTS.map((s) => (
              <div
                key={s.hook}
                className="p-6 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#C8102E]/40 transition"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#E8183A] font-bold mb-3">
                  {s.hook}
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-[#A3A3A3] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 sm:px-10 py-24 border-t border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
            Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">What ACE actually does</h2>
          <p className="text-[#A3A3A3] text-lg mb-12 max-w-2xl">
            Local-first, latency-conscious, built for the kind of pressure where mistakes are visible.
          </p>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {FEATURES.map((f) => (
              <div key={f.title}>
                <div className="w-10 h-1 bg-[#C8102E] rounded-full mb-4" />
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-[#A3A3A3] leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 py-24 border-t border-[#1A1A1A] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(50% 80% at 50% 100%, rgba(200,16,46,0.10) 0%, rgba(200,16,46,0) 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Free during the public beta</h2>
          <p className="text-[#A3A3A3] text-lg mb-8 max-w-2xl mx-auto">
            ACE is free for the first 90 days post-launch. Existing users will be grandfathered into the Standard tier for life as a thank-you for testing.
          </p>
          <DownloadButton platform="mac-arm64" label="Download for Mac" primary />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-10 py-10 border-t border-[#1A1A1A] text-sm text-[#A3A3A3]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={20} height={20} className="rounded" />
            <span>© 2026 ACE</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/support" className="hover:text-white transition">Support</Link>
            <a
              href="mailto:hello@ace-presenter.app"
              className="hover:text-white transition"
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
    ? "px-6 py-3 rounded-md bg-[#C8102E] hover:bg-[#E8183A] text-white font-bold uppercase tracking-wider text-xs transition shadow-[0_8px_30px_rgba(200,16,46,0.35)]"
    : "px-5 py-3 rounded-md bg-[#1A1A1A] hover:bg-[#222222] text-white font-bold uppercase tracking-wider text-xs transition border border-[#2A2A2A]";
  return (
    <a href={`/api/download?platform=${platform}`} className={className}>
      {label}
    </a>
  );
}
