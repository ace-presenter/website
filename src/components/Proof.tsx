import { ScrollReveal, ScrollStagger, ScrollItem } from "@/components/motion";

/**
 * Proof — measured facts, not hype. A calm figures strip drawn straight from
 * what the product actually does (the same claims the hero makes), plus one
 * editorial pull-quote. Hairline-divided, one accent, no animated counters.
 *
 * NOTE: the figures below are documented product facts, not social proof —
 * latency, locality, and the no-button design (see ACE Presenter V2/marketing).
 * When a real, attributable customer testimonial exists, drop it into the
 * QUOTE block (see the comment there) — until then it holds the product's own
 * positioning line, not a fabricated endorsement.
 */

type Figure = { value: string; label: string };

const FIGURES: Figure[] = [
  { value: "~200 ms", label: "on-device transcription latency on Apple Silicon" },
  { value: "0", label: "clicks to advance — there is no next-slide button" },
  { value: "Local", label: "whisper.cpp on your Mac; audio never leaves the room" },
];

export default function Proof() {
  return (
    <section className="px-6 sm:px-10 py-28 sm:py-36 border-t border-[#1A1A1A]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#888] mb-5">
            Measured, not hyped
          </p>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-2xl">
            The numbers that matter on stage
          </h2>
        </ScrollReveal>

        {/* Figures strip */}
        <ScrollStagger
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 border-t border-[#1A1A1A]"
          stagger={0.12}
        >
          {FIGURES.map((f) => (
            <ScrollItem key={f.value}>
              <div className="border-b border-[#1A1A1A] sm:border-b-0 sm:border-r last:border-r-0 sm:border-r-[#1A1A1A] py-9 sm:py-10 sm:pr-8 sm:[&:not(:first-child)]:pl-8">
                <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white tabular-nums">
                  {f.value}
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-[#A8A8A8] max-w-[16rem]">
                  {f.label}
                </p>
              </div>
            </ScrollItem>
          ))}
        </ScrollStagger>

        {/* QUOTE — replace with a real, attributable customer quote when available.
            Until then this is an unattributed design principle, not an endorsement. */}
        <ScrollReveal className="mt-20 sm:mt-24 max-w-3xl">
          <div className="w-8 h-px bg-[#C8102E] mb-7" />
          <blockquote className="text-2xl sm:text-3xl font-semibold tracking-tight leading-snug text-white">
            “You run the room. The cue runs itself.”
          </blockquote>
          <p className="mt-6 text-[11px] font-mono uppercase tracking-[0.22em] text-[#666]">
            The whole idea, in one line
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
