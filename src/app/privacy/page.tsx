export const metadata = { title: "Privacy — ACE" };

export default function Privacy() {
  return (
    <article className="prose prose-invert max-w-3xl mx-auto px-6 py-20">
      <h1>Privacy Policy</h1>
      <p className="text-zinc-400">Last updated: 2026-05-04 · Placeholder</p>

      <h2>Audio data</h2>
      <p>
        ACE transcribes microphone or line-input audio locally on your device using
        Whisper. Audio buffers are processed in memory and discarded after each
        detection cycle. No audio is uploaded to any server by default.
      </p>

      <h2>Online lookups (optional)</h2>
      <p>
        When configured, ACE may call third-party APIs (ACRCloud for audio
        fingerprinting, Anthropic Claude for song identification, Genius for lyric
        import). Only the relevant query data — a short audio fingerprint or a
        text query — is sent. No personally identifying information is attached.
      </p>

      <h2>Crash reports</h2>
      <p>
        ACE does not currently transmit crash reports or telemetry. If we ever
        add this in a future version, it will be opt-in.
      </p>

      <h2>Auto-update</h2>
      <p>
        ACE checks <code>github.com/ace-presenter/ace-releases</code> on launch
        and every six hours for new releases. The check sends only your app
        version and operating system version.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy: <a href="mailto:hello@ace-presenter.app">hello@ace-presenter.app</a>.
      </p>
    </article>
  );
}
