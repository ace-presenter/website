import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import HorizonGlow from "@/components/hero/HorizonGlow";

export const metadata: Metadata = {
  title: "Product updates",
  description:
    "Presenter is out on Mac and Windows. Get release news, and word on Manager and World when there is something real to show.",
  alternates: { canonical: "/waitlist" },
  openGraph: {
    title: "ACE — product updates",
    description:
      "Presenter is out on Mac and Windows. Release news straight to your inbox.",
    url: "https://www.ace-presenter.app/waitlist",
    siteName: "ACE",
    locale: "en_US",
    type: "website",
  },
};

export default function WaitlistPage() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />
      <section className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-36">
        <HorizonGlow strength={0.6} />
        <div className="relative z-10 mx-auto max-w-xl text-center">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#888]">
            ACE · What&apos;s next
          </p>
          <h1 className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Presenter is{" "}
            <span
              className="font-[family-name:var(--font-instrument-serif)] font-normal italic"
              style={{ color: "#E8183A" }}
            >
              out now
            </span>
            .
          </h1>
          <p className="mx-auto mb-6 max-w-md text-lg text-[#C4C4C4]">
            On Mac and Windows, with a free tier —{" "}
            <a href="/download" className="font-semibold text-white underline decoration-[#E8183A] underline-offset-4 transition hover:text-[#E8183A]">
              download it
            </a>
            . Manager and World are still in development. Tell us what to send
            and we&apos;ll email when there is something real to show.
          </p>
          <WaitlistForm product="suite" source="/waitlist" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
