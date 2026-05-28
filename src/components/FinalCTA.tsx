import Link from "next/link";

/**
 * Final CTA section — appears at the bottom of every product page.
 * The `variant` prop controls which headline + CTAs are shown.
 *
 * - "presenter" (default): Download for Mac CTAs
 * - "schedule":  Sign in / try Schedule CTAs
 * - "notes":     Download Editors' Notes CTA
 * - "suite":     Suite-wide CTA on the home page
 */

type CTAVariant = "presenter" | "schedule" | "notes" | "suite" | "manager";

interface FinalCTAProps {
  variant?: CTAVariant;
}

export default function FinalCTA({ variant = "presenter" }: FinalCTAProps) {
  return (
    <section className="px-6 sm:px-10 py-28 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 100%, rgba(200,16,46,0.20) 0%, rgba(200,16,46,0) 70%)",
        }}
      />
      <div className="max-w-3xl mx-auto text-center relative">
        {variant === "presenter" && <PresenterCTA />}
        {variant === "schedule" && <ScheduleCTA />}
        {variant === "notes" && <NotesCTA />}
        {variant === "suite" && <SuiteCTA />}
        {variant === "manager" && <ManagerCTA />}
      </div>
    </section>
  );
}

function PresenterCTA() {
  return (
    <>
      <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-5 text-white">
        Ready to{" "}
        <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
          stop clicking
        </span>
        ?
      </h2>
      <p className="text-[#C4C4C4] text-lg mb-10 max-w-xl mx-auto">
        Free during the public beta. New releases ship every few weeks — ACE prompts you on launch when one&apos;s ready.
      </p>
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-3">
        <a
          href="/api/download?platform=mac-arm64"
          className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition"
        >
          Download for Mac · Apple Silicon
        </a>
        <div className="flex flex-col items-center gap-2.5">
          <a
            href="/api/download?platform=mac-x64"
            className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm transition border border-[#2A2A2A]"
          >
            Mac · Intel
          </a>
          <Link
            href="/download/intel"
            className="text-[11px] text-[#F59E0B] hover:text-[#FBBF24] transition flex items-center gap-1.5 font-medium"
          >
            <span aria-hidden>⚠</span>
            Important note for Intel Macs
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2 text-xs">
        <span className="text-[#888]">Windows version</span>
        <a
          href="mailto:hello@ace-presenter.app?subject=ACE%20Windows%20waitlist&body=Please%20add%20me%20to%20the%20Windows%20waitlist."
          className="text-[#E8183A] hover:text-white transition font-semibold"
        >
          join the waitlist →
        </a>
      </div>
    </>
  );
}

function ScheduleCTA() {
  return (
    <>
      <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-5 text-white">
        Build the schedule.{" "}
        <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
          Run the day.
        </span>
      </h2>
      <p className="text-[#C4C4C4] text-lg mb-10 max-w-xl mx-auto">
        ACE Schedule Manager is free to start. AI features included on Pro.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="https://app.ace-presenter.app/auth"
          className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition"
        >
          Start using ACE Schedule
        </a>
        <Link
          href="/pricing"
          className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm transition border border-[#2A2A2A]"
        >
          View pricing
        </Link>
      </div>
    </>
  );
}

function NotesCTA() {
  return (
    <>
      <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-5 text-white">
        Notes that talk to{" "}
        <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
          Resolve.
        </span>
      </h2>
      <p className="text-[#C4C4C4] text-lg mb-10 max-w-xl mx-auto">
        Free download for macOS. DaVinci Resolve integration included.
      </p>
      <a
        href="/api/download?product=editors-notes&platform=mac-arm64"
        className="inline-block px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition"
      >
        Download for Mac
      </a>
    </>
  );
}

function SuiteCTA() {
  return (
    <>
      <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-5 text-white">
        ACE runs the{" "}
        <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
          room.
        </span>
      </h2>
      <p className="text-[#C4C4C4] text-lg mb-10 max-w-xl mx-auto">
        Presenter, Schedule, Editors&apos; Notes. One account. Free to start.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="/api/download?platform=mac-arm64"
          className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition"
        >
          Download Presenter
        </a>
        <a
          href="https://app.ace-presenter.app/auth"
          className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm transition border border-[#2A2A2A]"
        >
          Open Schedule Manager
        </a>
      </div>
    </>
  );
}

function ManagerCTA() {
  return (
    <>
      <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-5 text-white">
        Ready to run your{" "}
        <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
          whole ministry
        </span>
        ?
      </h2>
      <p className="text-[#C4C4C4] text-lg mb-10 max-w-xl mx-auto">
        Members, departments, events, communication, and AI-powered reporting
        — coordinated in one system built for the church.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="/manager/app"
          className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition"
        >
          Open ACE Manager
        </a>
        <a
          href="/pricing#manager"
          className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold text-sm transition border border-[#2A2A2A]"
        >
          See pricing
        </a>
      </div>
    </>
  );
}
