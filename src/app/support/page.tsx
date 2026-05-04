export const metadata = { title: "Support — ACE" };

export default function Support() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
        Help
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">Support</h1>
      <p className="text-[#A3A3A3] text-lg mb-12">
        ACE is built and supported by a small team. The fastest way to get help:
      </p>

      <div className="space-y-4">
        <section className="p-6 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
          <h2 className="text-xl font-bold mb-2">Email</h2>
          <p className="text-[#A3A3A3] mb-3">
            For bugs, feature requests, or anything technical:
          </p>
          <a
            href="mailto:hello@ace-presenter.app"
            className="text-[#E8183A] hover:text-white transition font-semibold"
          >
            hello@ace-presenter.app
          </a>
        </section>

        <section className="p-6 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
          <h2 className="text-xl font-bold mb-2">Common issues</h2>
          <ul className="text-[#A3A3A3] space-y-2 list-disc list-inside">
            <li>
              <strong className="text-white">Audio device not detected:</strong>{" "}
              quit ACE, unplug + replug the interface, relaunch.
            </li>
            <li>
              <strong className="text-white">Detection seems stuck:</strong>{" "}
              click the Re-Identify button in the toolbar to reset.
            </li>
            <li>
              <strong className="text-white">Wrong song matched:</strong>{" "}
              add it to your library first via Genius import or paste lyrics.
            </li>
          </ul>
        </section>

        <section className="p-6 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
          <h2 className="text-xl font-bold mb-2">Beta feedback</h2>
          <p className="text-[#A3A3A3]">
            ACE is in public beta. We read every email and reply within 24 hours
            during launch. If you found a bug, screenshots and the log file from{" "}
            <code className="text-white bg-[#0F0F0F] px-1.5 py-0.5 rounded border border-[#2A2A2A]">
              ~/Library/Logs/ACE/
            </code>{" "}
            help us fix it fast.
          </p>
        </section>
      </div>
    </article>
  );
}
