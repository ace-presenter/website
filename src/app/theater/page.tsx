import type { Metadata } from "next";
import SegmentLanding from "@/components/SegmentLanding";

export const metadata: Metadata = {
  title: "ACE for Theater & Live Shows — AI cue automation",
  description:
    "Voice-triggered cue advance and automatic dialog beat detection. The stage manager focuses on the room, not the laptop. Free during public beta. macOS.",
  keywords: [
    "theater cue software",
    "stage cue automation",
    "ai stage manager",
    "live show cue control",
    "theatrical presentation software",
    "stage automation",
    "voice triggered cues",
    "live performance software",
    "broadway cue control",
    "stage manager tools",
  ],
  alternates: {
    canonical: "/theater",
  },
  openGraph: {
    title: "ACE for Theater & Live Shows — AI cue automation",
    description:
      "Voice-triggered cue advance + automatic dialog beat detection. One operator runs the show.",
    url: "https://www.ace-presenter.app/theater",
    siteName: "ACE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE for Theater & Live Shows — AI cue automation",
    description: "Voice-triggered cue advance + dialog beat detection.",
  },
};

export default function TheaterPage() {
  return (
    <SegmentLanding
      slug="theater"
      audience="theater companies and live event producers"
      eyebrow="For stage managers"
      headlineLeft="One operator,"
      headlineAccent="A whole show"
      heroBody="Voice-triggered cue advance and automatic dialog beat detection. The stage manager runs the room. ACE handles the cue list."
      beats={[
        {
          pain: "Cue calling demands eyes on the script + finger on the GO button. You miss what's happening on stage.",
          solution: "ACE listens for the line cue and advances. You watch the actor, not the page.",
        },
        {
          pain: "Improvised lines or skipped sections derail a manual cue list. The whole booth scrambles.",
          solution: "ACE matches dialog content, not line numbers. When the actor jumps, ACE jumps with them.",
        },
        {
          pain: "Touring shows reset the cue list every venue. Different booth, different op, different problems.",
          solution: "Cue list lives with the show file. Open ACE on the road, the cues come with you.",
        },
      ]}
      ctaTitle="Run the show, not the laptop"
    />
  );
}
