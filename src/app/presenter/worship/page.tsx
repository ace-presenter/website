import type { Metadata } from "next";
import SegmentLanding from "@/components/SegmentLanding";

export const metadata: Metadata = {
  title: "ACE for Worship — AI presenter for Sunday services",
  description:
    "Stop clicking slides during the service. ACE listens to the worship band and pushes the right lyrics. Bible mode follows the preacher through scripture references in real time. Mac and Windows.",
  keywords: [
    "propresenter alternative",
    "worship presentation software",
    "church presentation app",
    "worship slides software",
    "sunday service presentation",
    "automatic worship slides",
    "lyric detection worship",
    "bible verse detection",
    "ai worship slides",
    "church av software",
  ],
  alternates: {
    canonical: "/presenter/worship",
  },
  openGraph: {
    title: "ACE for Worship — AI presenter for Sunday services",
    description:
      "Stop clicking slides. ACE listens to the band, pushes the right lyrics, and follows the preacher through scripture.",
    url: "https://www.ace-presenter.app/presenter/worship",
    siteName: "ACE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE for Worship — AI presenter for Sunday services",
    description: "Stop clicking slides during the service. ACE listens to the band and pushes the right lyrics.",
  },
};

export default function WorshipPage() {
  return (
    <SegmentLanding
      slug="worship"
      audience="religious organizations"
      eyebrow="For worship teams"
      headlineLeft="Run the service."
      headlineAccent="Without clicking slides"
      heroBody="ACE listens to what the team is singing and pushes the right lyrics. Bible mode follows the preacher through scripture references in real time. No volunteer chained to the slide laptop."
      beats={[
        {
          pain: "Volunteers turn over, and each new one needs hours of training before they can run a Sunday.",
          solution: "ACE works with whoever is on the desk, so a new volunteer can keep up. Drop the set in, hit Live, and the slides follow the band.",
        },
        {
          pain: "Bands change keys, repeat the bridge, drop a chorus. The slide volunteer panics.",
          solution: "ACE follows the song and moves the lyric with it. Load the day's songs into the service and it picks the right song more reliably. One key takes over whenever you want.",
        },
        {
          pain: "Presentation software can run hundreds up front plus yearly renewals — the license eats your AV budget.",
          solution: "Free runs your audience screen, with listening one service day a week. Pro takes the mark off and adds the stage screen.",
        },
      ]}
      tools={[
        { name: "Say the verse. It's up.", body: "\"Matthew five, verses three to twelve\" goes on screen as the preacher says it. One click shows a verse." },
        { name: "Stream to four places", body: "YouTube, Facebook, your website and a backup at once. A slow one goes red on its own; the others carry on.", plan: "Pro" },
        { name: "Lyrics as lower thirds", body: "Lyrics and verses along the bottom of the stream, in a design you make.", plan: "Venue" },
        { name: "Planning Center", body: "Bring the service plan in, songs and all, on Mac and Windows.", plan: "Venue" },
      ]}
      ctaTitle="Try it on this Sunday's service"
    />
  );
}
