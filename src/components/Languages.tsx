/**
 * Interface languages — what the app itself is written in.
 *
 * Deliberately separate from the "dozens of languages" line elsewhere on the site,
 * which is about what detection can hear. Facts: docs/V3_RELEASE_FACTS.md
 * "Languages": 21 on Mac and Windows, 12 new in 3.0, machine translated (never
 * "professionally translated"), Igbo / Hausa / Swahili in beta, voice commands
 * still English only.
 */

type Lang = { native: string; english: string; code: string; isNew?: boolean; beta?: boolean; rtl?: boolean };

const LANGUAGES: Lang[] = [
  { native: "English", english: "English", code: "en" },
  { native: "Español", english: "Spanish", code: "es" },
  { native: "Français", english: "French", code: "fr" },
  { native: "Deutsch", english: "German", code: "de" },
  { native: "Português", english: "Portuguese", code: "pt" },
  { native: "Italiano", english: "Italian", code: "it", isNew: true },
  { native: "Nederlands", english: "Dutch", code: "nl", isNew: true },
  { native: "Română", english: "Romanian", code: "ro", isNew: true },
  { native: "Русский", english: "Russian", code: "ru" },
  { native: "Українська", english: "Ukrainian", code: "uk", isNew: true },
  { native: "Yorùbá", english: "Yoruba", code: "yo", isNew: true },
  { native: "Asụsụ Igbo", english: "Igbo", code: "ig", isNew: true, beta: true },
  { native: "Hausa", english: "Hausa", code: "ha", isNew: true, beta: true },
  { native: "Kiswahili", english: "Swahili", code: "sw", isNew: true, beta: true },
  { native: "العربية", english: "Arabic", code: "ar", rtl: true },
  { native: "Bahasa Indonesia", english: "Indonesian", code: "id", isNew: true },
  { native: "Filipino", english: "Filipino", code: "fil", isNew: true },
  { native: "한국어", english: "Korean", code: "ko" },
  { native: "日本語", english: "Japanese", code: "ja", isNew: true },
  { native: "简体中文", english: "Chinese, Simplified", code: "zh-Hans" },
  { native: "繁體中文", english: "Chinese, Traditional", code: "zh-Hant", isNew: true },
];

export default function Languages() {
  return (
    <section id="languages" className="relative border-t border-white/[0.06] px-6 py-24 sm:px-10 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60%]"
        style={{ background: "radial-gradient(50% 60% at 50% 0%, rgba(200,16,46,0.14), transparent 70%)" }}
      />
      <div className="mx-auto max-w-6xl">
        <div className="ace-sp-reveal grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div>
            <span className="ace-glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/75">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B4F]" /> 21 languages · 12 new in 3.0
            </span>
            <h2 className="mt-6 text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1] tracking-[-0.035em] text-white">
              The whole app,
              <br />
              in <span className="font-serif font-normal italic text-[#FF4D5E]">your</span> language.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-[#B8B8BE] sm:text-lg">
            Every panel, setting, message and Help page, on Mac and Windows alike. The language list
            shows each language in its own name, and Arabic mirrors the whole layout right to left.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-7">
          {LANGUAGES.map((l) => (
            <li
              key={l.code}
              className="ace-card ace-sp-reveal relative flex min-h-[92px] flex-col justify-between rounded-2xl px-4 py-3.5"
            >
              <span
                className="text-[17px] font-semibold leading-tight text-white"
                dir={l.rtl ? "rtl" : undefined}
                lang={l.code}
              >
                {l.native}
              </span>
              <span className="mt-2 flex items-end justify-between gap-2">
                <span className="font-mono text-[9.5px] uppercase leading-snug tracking-[0.14em] text-white/40">
                  {l.english}
                </span>
                {(l.beta || l.isNew) && (
                  <span
                    className={`shrink-0 rounded-full px-1.5 py-px font-mono text-[8.5px] uppercase tracking-[0.14em] ${
                      l.beta ? "border border-white/15 text-white/55" : "bg-[#C8102E]/20 text-[#FF6B7A]"
                    }`}
                  >
                    {l.beta ? "Beta" : "New"}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/45">
          Choose yours in Settings; it doesn&rsquo;t have to match your computer&rsquo;s language. The new
          languages are machine translated, and Igbo, Hausa and Swahili are in beta, so tell us what reads
          wrong. Spoken voice commands are in English. Listening for songs and scripture understands more
          languages still.
        </p>
      </div>
    </section>
  );
}
