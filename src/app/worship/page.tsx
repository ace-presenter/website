import type { Metadata } from "next";
import SegmentLanding from "@/components/SegmentLanding";

export const metadata: Metadata = {
  title: "ACE for Worship — AI presenter for Sunday services",
  description:
    "Stop clicking slides during the service. ACE listens to the worship band and pushes the right lyrics. Bible mode follows the preacher through scripture references in real time. Free during public beta.",
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
    canonical: "/worship",
  },
  openGraph: {
    title: "ACE for Worship — AI presenter for Sunday services",
    description:
      "Stop clicking slides. ACE listens to the band, pushes the right lyrics, and follows the preacher through scripture.",
    url: "https://www.ace-presenter.app/worship",
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
          pain: "Volunteers turn over. Each new one needs hours of ProPresenter training before they can run a Sunday.",
          solution: "ACE replaces the operator. Drop the set in, hit Live, and the slides follow the band.",
        },
        {
          pain: "Bands change keys, repeat the bridge, drop a chorus. The slide volunteer panics.",
          solution: "ACE detects song + section in real time. When the band loops back, ACE loops back. No clicks.",
        },
        {
          pain: "ProPresenter is $499 + $99/year. EasyWorship is $399. The license eats your AV budget.",
          solution: "Free during public beta. Existing users keep Standard tier for life when paid plans launch.",
        },
      ]}
      ctaTitle="Try it on this Sunday's service"
    />
  );
}
