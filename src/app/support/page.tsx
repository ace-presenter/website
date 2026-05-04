export const metadata = { title: "Support — ACE" };

export default function Support() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Support</h1>
      <p className="text-zinc-400 text-lg mb-12">
        ACE is built and supported by a small team. The fastest way to get help:
      </p>

      <div className="space-y-6">
        <section className="p-6 rounded-xl bg-white/[0.03] border border-white/5">
          <h2 className="text-xl font-semibold mb-2">Email</h2>
          <p className="text-zinc-400 mb-3">
            For bugs, feature requests, or anything technical:
          </p>
          <a
            href="mailto:hello@ace-presenter.app"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            hello@ace-presenter.app
          </a>
        </section>

        <section className="p-6 rounded-xl bg-white/[0.03] border border-white/5">
          <h2 className="text-xl font-semibold mb-2">Common issues</h2>
          <ul className="text-zinc-400 space-y-2 list-disc list-inside">
            <li>
              <strong className="text-zinc-200">Audio device not detected:</strong>{" "}
              quit ACE, unplug + replug the interface, relaunch.
            </li>
            <li>
              <strong className="text-zinc-200">Detection seems stuck:</strong>{" "}
              click the Re-Identify button in the toolbar to reset.
            </li>
            <li>
              <strong className="text-zinc-200">Wrong song matched:</strong>{" "}
              add it to your library first via Genius import or paste lyrics.
            </li>
          </ul>
        </section>

        <section className="p-6 rounded-xl bg-white/[0.03] border border-white/5">
          <h2 className="text-xl font-semibold mb-2">Beta feedback</h2>
          <p className="text-zinc-400">
            ACE is in public beta. We read every email and reply within 24 hours
            during launch. If you found a bug, screenshots and the log file from{" "}
            <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">
              ~/Library/Logs/ACE/
            </code>{" "}
            help us fix it fast.
          </p>
        </section>
      </div>
    </article>
  );
}
