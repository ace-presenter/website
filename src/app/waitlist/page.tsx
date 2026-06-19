import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description:
    "Be first to know when ACE ships — launch updates, the Windows version, and beta invitations. One account works across every ACE product.",
  alternates: { canonical: "/waitlist" },
  openGraph: {
    title: "Join the ACE waitlist",
    description:
      "Launch updates, the Windows version, and beta invitations — straight to your inbox.",
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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 70% at 50% 0%, rgba(200,16,46,0.16) 0%, rgba(200,16,46,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-xl text-center">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#888]">
            ACE · Coming soon
          </p>
          <h1 className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Be first when{" "}
            <span
              className="font-[family-name:var(--font-instrument-serif)] font-normal italic"
              style={{ color: "#E8183A" }}
            >
              ACE ships
            </span>
            .
          </h1>
          <p className="mx-auto mb-10 max-w-md text-lg text-[#C4C4C4]">
            Launch updates, the Windows version, and beta invitations — no noise,
            just the moments that matter.
          </p>
          <WaitlistForm product="presenter" source="/waitlist" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
