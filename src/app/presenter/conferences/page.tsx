import type { Metadata } from "next";
import SegmentLanding from "@/components/SegmentLanding";

export const metadata: Metadata = {
  title: "ACE for Conferences — AI slide control for live events",
  description:
    "Speakers improvise. Slides stay aligned anyway. Drop the deck in and ACE follows the speaker through it — even when they jump around or extend a section. Mac and Windows.",
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
    canonical: "/presenter/conferences",
  },
  openGraph: {
    title: "ACE for Conferences — AI slide control for live events",
    description:
      "Speakers improvise. Slides stay aligned anyway. ACE follows the speaker through any deck.",
    url: "https://www.ace-presenter.app/presenter/conferences",
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
      heroBody="Drop the deck in. ACE listens to the speaker and moves the slides with them, usually within a second or so of the words. PowerPoint on every plan; Keynote and PDF on Pro."
      beats={[
        {
          pain: "AV ops run 50+ talks a day. Every speaker has a different deck and a different rhythm.",
          solution: "ACE adapts to whatever's on stage. No per-talk reprogramming. Drop deck → hit live → done.",
        },
        {
          pain: "Speaker jumps to slide 17, asks 'where are we?' Slide tech scrambles in front of 800 people.",
          solution: "ACE follows what the speaker says through the deck, not a timer. Your clicker and the arrow keys still work whenever you want them.",
        },
        {
          pain: "Cloud-based slide tools fail when conference Wi-Fi craters at 9 AM Tuesday.",
          solution: "ACE listens on-device by default, on Mac and Windows, and detection works offline. Cloud detection is there only if you switch it on.",
        },
      ]}
      tools={[
        { name: "Follow slides by voice", body: "The deck keeps up with the speaker, usually within a second or so.", plan: "Pro" },
        { name: "Live captions", body: "What the speaker says, on the room's screens and on the stream.", plan: "Pro" },
        { name: "Name lower thirds", body: "Twelve animated designs for each speaker's name and title.", plan: "Pro" },
        { name: "Stays awake", body: "While ACE is listening, the computer and its screens don't go to sleep. Keep a laptop plugged in with the lid open." },
      ]}
      ctaTitle="Run your next conference on autopilot"
    />
  );
}
