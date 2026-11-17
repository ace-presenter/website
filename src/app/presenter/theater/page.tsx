import type { Metadata } from "next";
import SegmentLanding from "@/components/SegmentLanding";

export const metadata: Metadata = {
  title: "ACE for Theater & Live Shows — AI cue automation",
  description:
    "ACE listens for the spoken line and advances the cue, with voice commands for the rest. The stage manager focuses on the room, not the laptop. Mac and Windows.",
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
    canonical: "/presenter/theater",
  },
  openGraph: {
    title: "ACE for Theater & Live Shows — AI cue automation",
    description:
      "ACE listens for the spoken line and advances the cue. One operator runs the show.",
    url: "https://www.ace-presenter.app/presenter/theater",
    siteName: "ACE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE for Theater & Live Shows — AI cue automation",
    description: "ACE listens for the spoken line and advances the cue.",
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
      heroBody="ACE listens for the spoken line and moves the cue, with surtitles and cue markers for the rest. The stage manager runs the room. ACE keeps the cue list moving."
      beats={[
        {
          pain: "Cue calling demands eyes on the script + finger on the GO button. You miss what's happening on stage.",
          solution: "ACE listens for the line cue and advances. You watch the actor, not the page.",
        },
        {
          pain: "Improvised lines or skipped sections derail a manual cue list. The whole booth scrambles.",
          solution: "ACE follows the script by the words actually spoken, not a timer, so a pause or a slow scene doesn't throw it.",
        },
        {
          pain: "Touring shows reset the cue list every venue. Different booth, different op, different problems.",
          solution: "Cue list lives with the show file. Open ACE on the road, the cues come with you.",
        },
      ]}
      tools={[
        { name: "Surtitles", body: "The line on the screen as it's spoken, from your script.", plan: "Venue" },
        { name: "Cue markers", body: "Lower thirds, scenes and ATEM cuts fired from notes in the script. Put a marker a short phrase before the moment.", plan: "Venue" },
        { name: "Operator voice commands", body: "\"Next slide\", \"clear screen\": hands stay on the board. In English.", plan: "Venue" },
        { name: "Stream to four places", body: "One encode to up to four destinations; a slow one never holds up the rest.", plan: "Pro" },
      ]}
      ctaTitle="Run the show, not the laptop"
    />
  );
}
