/**
 * Interface languages — what the app itself is written in.
 *
 * Deliberately separate from the "12+ languages" stat elsewhere on the site,
 * which is about what detection can HEAR. They are different capabilities and
 * different numbers, and running them together would be a false claim in one
 * direction or the other: a church that reads Korean cares that the buttons are
 * in Korean, not that Whisper can transcribe a language nobody in the room
 * speaks.
 *
 * Every language here ships in both the macOS and Windows builds as of 1.0.1.
 * Do not add one before BOTH platforms have it — a visitor downloading the
 * other build would get an English app.
 */

const LANGUAGES = [
  { native: "English", english: "English" },
  { native: "Español", english: "Spanish" },
  { native: "Français", english: "French" },
  { native: "Deutsch", english: "German" },
  { native: "Português", english: "Portuguese" },
  { native: "Русский", english: "Russian" },
  { native: "한국어", english: "Korean" },
  { native: "简体中文", english: "Chinese (Simplified)" },
  { native: "العربية", english: "Arabic", rtl: true },
];

export default function Languages() {
  return (
    <section className="border-t border-[#1A1A1A] px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-[#C8102E]" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#888]">
            Nine languages
          </span>
        </div>

        <h2 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
          The whole app, in your language.
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#B4B4B4]">
          Not a translated menu bar with English underneath — every panel,
          setting and message, on Mac and Windows alike. Arabic reads right to
          left, with the entire layout mirrored.
        </p>

        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[#1A1A1A] sm:grid-cols-3">
          {LANGUAGES.map((l) => (
            <li
              key={l.english}
              className="flex flex-col gap-1 bg-[#0B0B0B] px-5 py-5 transition-colors hover:bg-[#111]"
            >
              <span
                className="text-lg font-semibold text-white"
                dir={l.rtl ? "rtl" : undefined}
                lang={l.rtl ? "ar" : undefined}
              >
                {l.native}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#777]">
                {l.english}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-[#777]">
          Choose yours in Settings — it does not have to match your computer&rsquo;s
          language. Detection understands more languages still, including ones the
          interface is not yet translated into.
        </p>
      </div>
    </section>
  );
}
