import type { Metadata } from "next";
import SegmentLanding from "@/components/SegmentLanding";

export const metadata: Metadata = {
  title: "ACE for Lectures — AI presenter for classrooms and lecture halls",
  description:
    "The deck follows you, not a pre-baked cue list. ACE listens to what you're teaching and pushes the right slide — works for any subject, any language. Free during public beta. macOS.",
  keywords: [
    "lecture slide software",
    "classroom presentation auto-advance",
    "ai lecture presenter",
    "university presentation software",
    "professor slide automation",
    "teaching software",
    "online lecture tools",
    "academic presentation",
    "lecture capture software",
    "automatic slide advance lecture",
  ],
  alternates: {
    canonical: "/lectures",
  },
  openGraph: {
    title: "ACE for Lectures — AI presenter for classrooms and lecture halls",
    description:
      "Your tempo, your order. The deck follows you, not a pre-baked cue list.",
    url: "https://www.ace-presenter.app/lectures",
    siteName: "ACE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE for Lectures — AI presenter for classrooms and lecture halls",
    description: "Your tempo, your order. The deck follows you.",
  },
};

export default function LecturesPage() {
  return (
    <SegmentLanding
      slug="lectures"
      audience="educators and academic institutions"
      eyebrow="For educators"
      headlineLeft="Lecture without losing"
      headlineAccent="The slide"
      heroBody="Your tempo, your order. ACE listens to what you're teaching and surfaces the right slide. Works for any subject, any language. No clicker required."
      beats={[
        {
          pain: "You're mid-explanation. The next slide is the example you need. You fumble for the clicker and break flow.",
          solution: "ACE recognises the moment from your speech and advances. Eye contact stays on the room.",
        },
        {
          pain: "Students ask a question that pulls you back to slide 3. Now you're navigating in front of a hundred people.",
          solution: "Say the topic. ACE finds the slide. Continue.",
        },
        {
          pain: "Recorded lectures need clean cuts at slide changes for editing. Manual clicking is inconsistent.",
          solution: "ACE timestamps every transition. Editor gets a frame-accurate cue list with the recording.",
        },
      ]}
      ctaTitle="Teach without the clicker"
    />
  );
}
