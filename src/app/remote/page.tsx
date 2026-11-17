import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RemoteHero, { StoreButtons } from "@/components/remote/RemoteHero";
import PhoneTour from "@/components/spatial/PhoneTour";
import PhoneFrame from "@/components/spatial/PhoneFrame";

/**
 * ACE Remote — the phone app's own page (operator, 2026-11-17: "something
 * techy and good"). Facts come from the remote repo (README, services/,
 * i18n/locales: 9 languages) and the Presenter plans (phone remote = Pro and
 * Venue). Teleprompter and Meeting notes are "coming soon" until Apple
 * approves 1.2.0. Android is a direct download (not on Google Play); its link
 * goes up with the release, so the button says so.
 */

export const metadata: Metadata = {
  title: "ACE Remote — the phone app for ACE Presenter",
  description:
    "Run the service from your phone. ACE Remote finds your Mac or PC on the Wi-Fi: slides, cues, lower thirds, songs, scripture and every screen, from anywhere in the room. iPhone and Android.",
  alternates: { canonical: "/remote" },
};

const PROTOCOL = [
  "hello",
  "pairing",
  "getState",
  "state",
  "next",
  "prev",
  "go",
  "present",
  "clear",
  "restore",
  "search",
  "searchResults",
  "song",
  "updateSong",
  "lowerThirds",
  "triggerLowerThird",
  "hideLowerThird",
  "screens",
  "resetScreens",
  "preview",
  "mediaLibrary",
  "mediaControl",
  "mediaState",
  "message",
];

export default function RemotePage() {
  return (
    <main className="flex flex-1 flex-col bg-[#09090B] font-sans">
      <Nav activeProduct="remote" />
      <RemoteHero />
      <PhoneTour />
      <UnderTheHood />
      <Studio />
      <GetIt />
      <Footer />
    </main>
  );
}

/* ───────────── UNDER THE HOOD ───────────── */
function UnderTheHood() {
  const cards = [
    {
      k: "discovery",
      title: "Finds the computer by itself",
      body: "Open the app on the same Wi-Fi and your Mac or PC is in the list. No IP addresses, no codes to type.",
      span: "",
    },
    {
      k: "trust",
      title: "You approve every phone",
      body: "A new phone asks; the computer says yes. No password travels over the church Wi-Fi.",
      span: "",
    },
    {
      k: "link",
      title: "Stays connected",
      body: "The app checks the link all the time and reconnects on its own. Lock the phone, come back, and it's still yours.",
      span: "",
    },
    {
      k: "offline",
      title: "Works when the internet doesn't",
      body: "Once you're signed in, the remote keeps working on a Wi-Fi with no internet at all. It only needs the room's network.",
      span: "",
    },
    {
      k: "feel",
      title: "Taps you can feel",
      body: "Every command answers with a tap of haptics, and the screen stays awake while you're linked.",
      span: "",
    },
    {
      k: "lang",
      title: "Nine languages",
      body: "English, Español, Français, Deutsch, Português, Русский, 한국어, 中文 and العربية.",
      span: "",
    },
  ];
  return (
    <section className="relative border-t border-white/[0.06] px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="ace-sp-reveal max-w-3xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF4D5E]">Under the hood</span>
          <h2 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1] tracking-[-0.035em] text-white">
            Built for a room with <span className="font-serif font-normal italic text-[#FF4D5E]">bad</span> Wi-Fi.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#B8B8BE] sm:text-lg">
            The remote talks straight to ACE on your network, not through the cloud. So a busy Sunday
            connection doesn&rsquo;t slow the slide down.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <div key={c.k} className="ace-card ace-sp-reveal rounded-3xl p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{c.body}</p>
            </div>
          ))}

          {/* The protocol, shown */}
          <div className="ace-card ace-sp-reveal rounded-3xl p-6 sm:col-span-2 lg:col-span-3">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">Speaks ACE&rsquo;s own language</h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
                Same messages on Mac and Windows
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
              One small set of messages covers the whole service, from Next to a lower third to the song you
              just fixed on your phone. These are the real names.
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {PROTOCOL.map((m) => (
                <code
                  key={m}
                  className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-white/70"
                >
                  {m}
                </code>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── STUDIO (coming soon) ───────────── */
function Studio() {
  const tools = [
    {
      file: "06-teleprompter",
      tag: "Teleprompter",
      title: "Scripts that scroll as you speak.",
      points: [
        "Follows your voice, line by line, on the phone",
        "Mirror mode for a teleprompter glass",
        "Record yourself with the front camera",
      ],
      alt: "ACE Remote teleprompter following a script",
    },
    {
      file: "05-meeting-notes",
      tag: "Meeting notes",
      title: "Record a meeting. Get the notes.",
      points: [
        "Summary, decisions and who does what",
        "Written in the language the meeting spoke",
        "The recording is deleted once it's been written up",
      ],
      alt: "ACE Remote meeting notes with a summary and action items",
    },
  ];
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] px-6 py-24 sm:px-10 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(50% 50% at 50% 30%, rgba(200,16,46,0.16), transparent 70%)" }}
      />
      <div className="mx-auto max-w-6xl">
        <div className="ace-sp-reveal mx-auto max-w-3xl text-center">
          <span className="ace-glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/75">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" /> Studio · coming soon
          </span>
          <h2 className="mt-6 text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1] tracking-[-0.035em] text-white">
            No computer? <span className="font-serif font-normal italic text-[#FF4D5E]">Still</span> useful.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#B8B8BE] sm:text-lg">
            Two tools that work on the phone alone, for speakers, creators and anyone who runs a meeting.
            They arrive in the next version of the app.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {tools.map((t) => (
            <div key={t.tag} className="ace-card ace-sp-reveal grid grid-cols-[150px_1fr] items-center gap-6 rounded-3xl p-6 sm:grid-cols-[190px_1fr] sm:p-8">
              <PhoneFrame glow={false}>
                <Image src={`/remote/v12/${t.file}.webp`} alt={t.alt} fill sizes="200px" className="object-cover object-top" />
              </PhoneFrame>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF4D5E]">{t.tag}</span>
                  <span className="rounded-full border border-white/15 px-1.5 py-px font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/55">
                    Soon
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-semibold leading-snug text-white sm:text-2xl">{t.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/65">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#FF4D5E]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── GET IT ───────────── */
function GetIt() {
  const faqs = [
    {
      q: "What do I need?",
      a: "ACE Presenter on a Mac or PC, and the phone on the same Wi-Fi. The app is free to download; controlling ACE from your phone is part of the Pro and Venue plans.",
    },
    {
      q: "Does it need the internet?",
      a: "Only to sign in the first time. After that the remote talks straight to the computer over the room's network.",
    },
    {
      q: "Can more than one phone connect?",
      a: "Each phone asks to join and the computer approves it, so the pastor, the worship leader and the booth can each have one.",
    },
    {
      q: "Where's the Android app?",
      a: "Android gets the app straight from this site rather than Google Play. The download link goes up with the release.",
    },
  ];
  return (
    <section className="border-t border-white/[0.06] px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div className="ace-sp-reveal">
          <h2 className="text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1] tracking-[-0.035em] text-white">
            Put the booth
            <br />
            in your <span className="font-serif font-normal italic text-[#FF4D5E]">pocket</span>.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#B8B8BE] sm:text-lg">
            Free on iPhone and Android. Pair it with ACE Presenter on your Mac or PC.
          </p>
          <StoreButtons className="mt-8" />
          <p className="mt-6 text-sm text-white/45">
            Don&rsquo;t have ACE Presenter yet?{" "}
            <Link href="/presenter" className="font-semibold text-white/80 transition hover:text-white">
              Get it free →
            </Link>
          </p>
        </div>
        <div className="flex flex-col">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-white/[0.08] py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white">
                {f.q}
                <span className="font-mono text-white/40 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
