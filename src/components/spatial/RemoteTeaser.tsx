import Image from "next/image";
import Link from "next/link";
import PhoneFrame from "./PhoneFrame";

/**
 * A short stop for the phone app on the home and Presenter pages; the full
 * story is /remote. Three phones fanned in depth (CSS only, no JS).
 * Studio / Meeting notes / Teleprompter stay "coming soon" until Apple
 * approves 1.2.0 (operator, 2026-11-17), so the teaser leads with the
 * remote screens that are live.
 */
export default function RemoteTeaser() {
  const phones = [
    { file: "02-cues", alt: "ACE Remote — the service order, one tap from live", cls: "-translate-x-[42%] -rotate-[9deg] scale-[0.8] opacity-80 sm:-translate-x-[58%] sm:scale-[0.84]" },
    { file: "08-output", alt: "ACE Remote — the slide the room sees, with Next under your thumb", cls: "translate-x-[42%] rotate-[9deg] scale-[0.8] opacity-80 sm:translate-x-[58%] sm:scale-[0.84]" },
    { file: "01-remote", alt: "ACE Remote — run the service from your phone", cls: "z-10" },
  ];
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] px-6 py-24 sm:px-10 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(45% 60% at 70% 55%, rgba(200,16,46,0.2), transparent 70%)" }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="ace-sp-reveal">
          <span className="ace-glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/75">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B4F]" /> ACE Remote 1.2 · iPhone + Android
          </span>
          <h2 className="mt-6 text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1] tracking-[-0.035em] text-white">
            The booth,
            <br />
            in your <span className="font-serif font-normal italic text-[#FF4D5E]">pocket</span>.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#B8B8BE] sm:text-lg">
            Slides, cues, the library and every screen, from anywhere in the room. The phone joins your
            Mac or PC over the venue&rsquo;s Wi-Fi.
          </p>
          <ul className="mt-8 grid max-w-lg grid-cols-2 gap-2 text-sm text-white/75">
            {["Next, back and clear", "The whole cue list", "Search songs and scripture", "Screens on and off"].map((f) => (
              <li key={f} className="ace-glass rounded-xl px-3.5 py-2.5">
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-white/45">
            Coming soon in the same app: a teleprompter that follows your voice, and meeting notes.
          </p>
          <Link
            href="/remote"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
          >
            Explore the phone app <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="relative mx-auto h-[460px] w-full max-w-[460px] sm:h-[540px] [perspective:1400px]">
          {phones.map((p) => (
            <div
              key={p.file}
              className={`absolute left-1/2 top-1/2 w-[200px] -translate-x-1/2 -translate-y-1/2 sm:w-[236px] ${p.file === "01-remote" ? "z-10" : ""}`}
            >
              <div className={p.cls}>
                <PhoneFrame glow={p.file === "01-remote"}>
                  <Image
                    src={`/remote/v12/${p.file}.webp`}
                    alt={p.alt}
                    fill
                    sizes="240px"
                    className="object-cover object-top"
                  />
                </PhoneFrame>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
