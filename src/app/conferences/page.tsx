import type { Metadata } from "next";
import SegmentLanding from "@/components/SegmentLanding";

export const metadata: Metadata = {
  title: "ACE for Conferences — AI slide control for live events",
  description:
    "Speakers improvise. Slides stay aligned anyway. Drop the deck in and ACE follows the speaker through it — even when they jump around or extend a section. Free during public beta. macOS.",
  keywords: [
    "conference slide automation",
    "av slide control",
    "automatic slide advance",
    "conference presentation software",
    "live event slides",
    "ai slide advance",
    "speaker tracking software",
    "presentation automation",
    "conference av tools",
    "keynote automation",
  ],
  alternates: {
    canonical: "/conferences",
  },
  openGraph: {
    title: "ACE for Conferences — AI slide control for live events",
    description:
      "Speakers improvise. Slides stay aligned anyway. ACE follows the speaker through any deck.",
    url: "https://www.ace-presenter.app/conferences",
    siteName: "ACE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE for Conferences — AI slide control for live events",
    description: "Speakers improvise. Slides stay aligned anyway.",
  },
};

export default function ConferencesPage() {
  return (
    <SegmentLanding
      slug="conferences"
      audience="conference organizers and AV professionals"
      eyebrow="For conference AV"
      headlineLeft="Speakers improvise."
      headlineAccent="Slides keep up"
      heroBody="Drop the deck in. ACE listens to what the speaker is saying and finds the right slide — even when they skip ahead, loop back, or extend a section beyond the cue list."
      beats={[
        {
          pain: "AV ops run 50+ talks a day. Every speaker has a different deck and a different rhythm.",
          solution: "ACE adapts to whatever's on stage. No per-talk reprogramming. Drop deck → hit live → done.",
        },
        {
          pain: "Speaker jumps to slide 17, asks 'where are we?' Slide tech scrambles in front of 800 people.",
          solution: "ACE follows the spoken content, not a pre-baked cue list. Jumps don't break it.",
        },
        {
          pain: "Cloud-based slide tools fail when conference Wi-Fi craters at 9 AM Tuesday.",
          solution: "ACE runs on-device on Apple Silicon. The audio path never leaves the laptop. Works offline.",
        },
      ]}
      ctaTitle="Run your next conference on autopilot"
    />
  );
}
