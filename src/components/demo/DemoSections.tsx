import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/motion";
import { SectionHeading, AccentItalic } from "@/components/sections";
import type { ProductKey } from "@/lib/brand";
import LiveDemo from "./LiveDemo";
import ProductTour from "./ProductTour";

/**
 * Page sections around the interactive pieces, shared by the homepage and
 * /presenter. Both anchor-linkable: #try and #tour.
 */

export function TryItSection({ lede }: { lede?: ReactNode }) {
  return (
    <section id="try" className="scroll-mt-24 px-6 pt-24 sm:px-10 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Try it"
            title={
              <>
                Say it. Watch the <AccentItalic>cue</AccentItalic> follow.
              </>
            }
            lede={
              lede ??
              "This is a working slice of ACE Presenter. Type what someone on stage would say — a line of a hymn, a Bible reference, “next slide” — and the right cue goes live, the way it does in the app."
            }
          />
        </ScrollReveal>
        <ScrollReveal className="mt-14">
          <LiveDemo />
        </ScrollReveal>
      </div>
    </section>
  );
}

export function TourSection({
  only,
  title,
  lede,
}: {
  only?: ProductKey[];
  title?: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <section id="tour" className="scroll-mt-24 border-t border-[#1A1A1A] px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Take the tour"
            title={
              title ?? (
                <>
                  Click around the <AccentItalic>real</AccentItalic> thing.
                </>
              )
            }
            lede={
              lede ??
              "Real screens from the apps. Step through each one — and where there's a clip, watch the feature working in a live service."
            }
          />
        </ScrollReveal>
        <ScrollReveal className="mt-12">
          <ProductTour only={only} />
        </ScrollReveal>
      </div>
    </section>
  );
}
