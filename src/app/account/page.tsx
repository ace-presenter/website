import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LicenseKeyPanel from "@/components/LicenseKeyPanel";

export const metadata: Metadata = {
  title: "Account",
  description: "Your ACE account and licence key.",
  alternates: { canonical: "/account" },
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />
      <section className="px-6 sm:px-10 pt-20 sm:pt-28 pb-24 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">Account</div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5 text-white">
            Your ACE{" "}
            <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
              licence
            </span>
          </h1>
          <p className="text-[#C4C4C4] text-lg mb-10">
            One key unlocks the products on your plan across the suite. It&apos;s how your desktop apps
            talk to ACE&apos;s services without you bringing your own API keys.
          </p>
          <LicenseKeyPanel />
        </div>
      </section>
      <Footer />
    </main>
  );
}
