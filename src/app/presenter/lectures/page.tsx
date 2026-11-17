import type { Metadata } from "next";
import SegmentLanding from "@/components/SegmentLanding";

export const metadata: Metadata = {
  title: "ACE for Lectures — AI presenter for classrooms and lecture halls",
  description:
    "The deck follows you, not a pre-baked cue list. ACE listens to what you're teaching and pushes the right slide — works for any subject, in dozens of languages. Mac and Windows.",
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
    canonical: "/presenter/lectures",
  },
  openGraph: {
    title: "ACE for Lectures — AI presenter for classrooms and lecture halls",
    description:
      "Your tempo, your order. The deck follows you, not a pre-baked cue list.",
    url: "https://www.ace-presenter.app/presenter/lectures",
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
      heroBody="Your tempo, your order. ACE listens to what you're teaching and surfaces the right slide. Works for any subject, in dozens of languages. No clicker required."
      beats={[
        {
          pain: "You're mid-explanation. The next slide is the example you need. You fumble for the clicker and break flow.",
          solution: "ACE recognises the moment from your speech and advances. Eye contact stays on the room.",
        },
        {
          pain: "Some students need captions, and a few are watching from home.",
          solution: "Live captions put what you say on the screen in the room and on the stream.",
        },
        {
          pain: "Recorded lectures need clean cuts at slide changes for editing. Manual clicking is inconsistent.",
          solution: "Record the lecture in ACE and export the captions as SRT or VTT for the edit.",
        },
      ]}
      tools={[
        { name: "Follow slides by voice", body: "Your deck moves as you teach, usually within a second or so.", plan: "Pro" },
        { name: "Voice teleprompter", body: "Your notes scroll as you speak, at your pace.", plan: "Pro" },
        { name: "Live captions", body: "On the room's screens, the stream, or the recording only.", plan: "Pro" },
        { name: "21 languages", body: "The whole app and its Help, from Español to 日本語. Pick yours." },
      ]}
      ctaTitle="Teach without the clicker"
    />
  );
}
