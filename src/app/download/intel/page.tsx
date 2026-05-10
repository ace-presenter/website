/**
 * /download/intel — note for Intel Mac users about the v1.0–v1.5.7
 * packaging issue that shipped the wrong helper on Intel installs.
 *
 * Linked from the badge under the Intel CTA on /download. Plain language
 * by design — no jargon. Source of truth is content/intel-notice.md;
 * keep this page's wording in sync with that file when either changes.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "A note for Intel Mac users — ACE",
  description:
    "If your Intel Mac install of ACE showed a blank window or never finished setup, here's what went wrong and how we fixed it.",
  alternates: { canonical: "/download/intel" },
  openGraph: {
    title: "A note for Intel Mac users — ACE",
    description:
      "What Intel Mac users may have seen, what was wrong, and what we changed.",
    url: "https://www.ace-presenter.app/download/intel",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function IntelNoticePage() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />
      <Hero />
      <Article />
      <CTA />
      <Footer />
    </main>
  );
}

/* ───────────── NAV ───────────── */
function Nav() {
  return (
    <nav className="sticky top-0 z-40 px-6 sm:px-10 py-5 flex items-center justify-between bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-[#1A1A1A]">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.png" alt="ACE — Agentic Cue Experience" width={32} height={32} priority className="rounded-md" />
        <div className="flex flex-col leading-none">
          <span className="font-bold tracking-tight text-lg">ACE</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#888] mt-0.5">
            Agentic Cue Experience
          </span>
        </div>
      </Link>
      <div className="hidden sm:flex items-center gap-8 text-sm text-[#C4C4C4]">
        <Link href="/download" className="hover:text-white transition">Download</Link>
        <Link href="/guide" className="hover:text-white transition">Guide</Link>
        <Link href="/support" className="hover:text-white transition">Support</Link>
      </div>
    </nav>
  );
}

/* ───────────── HERO ───────────── */
function Hero() {
  return (
    <section className="relative px-6 sm:px-10 pt-20 sm:pt-28 pb-12 text-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, rgba(245,158,11,0.16) 0%, rgba(245,158,11,0.04) 35%, rgba(245,158,11,0) 70%)",
        }}
      />
      <div className="relative max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[10px] uppercase tracking-[0.25em] text-[#F59E0B] font-semibold mb-8">
          <span aria-hidden>⚠</span>
          For Intel Mac users
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-white">
          A note for{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal">
            Intel
          </span>{" "}
          Mac users<span className="text-[#C8102E]">.</span>
        </h1>

        <p className="mt-6 max-w-xl mx-auto text-base sm:text-lg text-[#C4C4C4] leading-relaxed">
          If your earlier Intel install of ACE looked broken, it wasn&apos;t your Mac.
          Here&apos;s what went wrong and what we changed.
        </p>
      </div>
    </section>
  );
}

/* ───────────── ARTICLE ───────────── */
function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-10 border-t border-[#1A1A1A] first:border-t-0 first:pt-0">
      {eyebrow && (
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
          {eyebrow}
        </div>
      )}
      {title && (
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-5 text-white">
          {title}
        </h2>
      )}
      <div className="text-[#C4C4C4] text-base leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}

function Article() {
  return (
    <article className="px-6 sm:px-10 py-8">
      <div className="max-w-2xl mx-auto">
        <Section>
          <p>
            If you&apos;ve tried ACE on an Intel Mac before this version, you may have
            run into one of these:
          </p>
          <ul className="space-y-2 pl-5 list-disc marker:text-[#C8102E]">
            <li>The app opened to a blank white window</li>
            <li>The setup wizard never appeared</li>
            <li>The app icon bounced in the dock and nothing happened</li>
            <li>Setup got stuck and never finished downloading the AI model</li>
          </ul>
          <p>
            That wasn&apos;t your Mac. It was a packaging mistake on our end that
            affected every Intel install we shipped, from the very first release
            through v1.5.7.
          </p>
        </Section>

        <Section eyebrow="What was wrong" title="The wrong helper went out with the Intel build">
          <p>
            ACE is built from two pieces that have to work together: the app you
            see on screen, and a small helper underneath that handles the heavy
            lifting — listening to the microphone, transcribing speech, finding
            the right slide. Both pieces have to be built specifically for the
            kind of Mac they&apos;ll run on.
          </p>
          <p>
            For every release up to v1.5.7, we accidentally shipped Intel Macs the
            helper meant for Apple Silicon Macs. The visible app launched, but the
            helper couldn&apos;t run, so nothing the app needed was actually
            happening underneath. From the outside it looked like a blank or
            broken app.
          </p>
          <p className="text-[#888]">
            Apple Silicon Macs (M1, M2, M3, M4) were never affected — they always
            got the right helper.
          </p>
        </Section>

        <Section eyebrow="What we fixed" title="The Intel build now ships the right helper">
          <p>
            Starting with this release, the Intel build ships with the right
            helper for Intel Macs. Both versions are tested on real hardware
            before each release going forward, so you can install with
            confidence.
          </p>
        </Section>

        <Section eyebrow="If you gave up before" title="Please give it another go">
          <p>
            Grab a fresh copy from the download button. The first launch will
            walk you through a short setup — microphone permissions, a one-time
            AI model download — about five minutes total.
          </p>
          <p>
            If anything still doesn&apos;t work, email{" "}
            <a
              href="mailto:hello@ace-presenter.app?subject=Intel%20install%20issue"
              className="text-white underline decoration-[#C8102E] decoration-2 underline-offset-4 hover:text-[#E8183A] transition"
            >
              hello@ace-presenter.app
            </a>{" "}
            and we&apos;ll respond personally. Tell us what you see on screen and
            which version of macOS you&apos;re on.
          </p>
        </Section>

        <Section eyebrow="Quick check" title="How to know which Mac you have">
          <p>
            Click the Apple menu in the top-left corner of your screen, then
            choose <strong className="text-white font-semibold">About This Mac</strong>.
          </p>
          <ul className="space-y-2 pl-5 list-disc marker:text-[#C8102E]">
            <li>
              If it says <strong className="text-white font-semibold">Apple M1</strong>,{" "}
              <strong className="text-white font-semibold">M2</strong>,{" "}
              <strong className="text-white font-semibold">M3</strong>, or{" "}
              <strong className="text-white font-semibold">M4</strong> — grab the{" "}
              <strong className="text-white font-semibold">Apple Silicon</strong> build
            </li>
            <li>
              If it says <strong className="text-white font-semibold">Intel</strong> — grab the{" "}
              <strong className="text-white font-semibold">Intel</strong> build
            </li>
          </ul>
          <p className="text-[#888] text-sm">
            If you grab the wrong one it just won&apos;t open — nothing breaks,
            but you&apos;ll waste the download. The app is about 600 MB.
          </p>
        </Section>

        <Section eyebrow="Thank you" title="A small thank you">
          <p>
            If you tried ACE on Intel before and we let you down, thank you for
            giving us another shot. We&apos;re a small team and we read every
            email.
          </p>
        </Section>
      </div>
    </article>
  );
}

/* ───────────── CTA ───────────── */
function CTA() {
  return (
    <section className="px-6 sm:px-10 py-16 border-t border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-4">
          Ready to try again?
        </h3>
        <p className="text-[#C4C4C4] mb-8">
          The Intel build on the download page is the fixed one.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/download"
            className="px-6 py-3 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-semibold text-sm transition"
          >
            Back to download →
          </Link>
          <a
            href="mailto:hello@ace-presenter.app?subject=Intel%20install%20issue"
            className="px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm border border-[#2A2A2A] transition"
          >
            Email us instead
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────── FOOTER ───────────── */
function Footer() {
  return (
    <footer className="px-6 sm:px-10 py-12 border-t border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-[#888]">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="ACE" width={24} height={24} className="rounded" />
          <span>© ACE · ace-presenter.app</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
          <Link href="/support" className="hover:text-white transition">Support</Link>
        </div>
      </div>
    </footer>
  );
}
