import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = { title: "Privacy — ACE" };

export default function Privacy() {
  return (
    <>
      <Nav />

      <article className="max-w-3xl mx-auto px-6 py-16 text-white">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
          Legal
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-[#C4C4C4] mb-12">Last updated: 2026-05-04 · Placeholder</p>

        <Section title="Audio data">
          ACE transcribes microphone or line-input audio locally on your device using
          Whisper. Audio buffers are processed in memory and discarded after each
          detection cycle. No audio is uploaded to any server by default.
        </Section>

        <Section title="Online lookups (optional)">
          When configured, ACE may call third-party APIs (ACRCloud for audio
          fingerprinting, Anthropic Claude for song identification, Genius for lyric
          import). Only the relevant query data — a short audio fingerprint or a
          text query — is sent. No personally identifying information is attached.
        </Section>

        <Section title="Crash reports">
          ACE does not currently transmit crash reports or telemetry. If we ever
          add this in a future version, it will be opt-in.
        </Section>

        <Section title="Auto-update">
          ACE checks <code className="text-white bg-[#0F0F0F] px-1.5 py-0.5 rounded border border-[#2A2A2A] text-sm">github.com/ace-presenter/ace-releases</code> on launch
          and every six hours for new releases. The check sends only your app
          version and operating system version.
        </Section>

        <Section title="Contact">
          Questions about privacy:{" "}
          <a href="mailto:hello@ace-presenter.app" className="text-[#E8183A] hover:text-white transition font-semibold">
            hello@ace-presenter.app
          </a>.
        </Section>
      </article>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-3 text-white">{title}</h2>
      <p className="text-[#D4D4D4] leading-relaxed">{children}</p>
    </section>
  );
}
