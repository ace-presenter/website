import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your ACE account.",
  alternates: { canonical: "/login" },
  robots: { index: false },
};

// Scaffold. The unified ACE account (Supabase magic-link) plugs in here — this
// page becomes the email form, and resolveEntitlements() reads the session.
export default function LoginPage() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />
      <section className="px-6 sm:px-10 pt-20 sm:pt-32 pb-28 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">Sign in</div>
          <h1 className="text-4xl font-bold tracking-tight mb-5 text-white">One account, the whole suite.</h1>
          <p className="text-[#C4C4C4] text-lg mb-10">
            ACE accounts are coming. One sign-in will cover Presenter, Schedule Manager, Manager,
            Editors&apos; Notes, and Virtual World.
          </p>
          <Link
            href="/account"
            className="inline-block px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm transition border border-[#2A2A2A]"
          >
            View account
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
