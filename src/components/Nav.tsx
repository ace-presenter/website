import Link from "next/link";
import Image from "next/image";

/**
 * ACE Suite — global navigation bar.
 *
 * Sticky, backdrop-blurred, dark-only. Links cover all three suite products
 * plus utility pages (Guide, Support).
 *
 * The `activeProduct` prop optionally highlights the current product chip —
 * pass "presenter" | "schedule" | "notes" from each product page, or omit
 * on the suite home.
 */

type Product = "presenter" | "schedule" | "notes";

interface NavProps {
  activeProduct?: Product;
}

export default function Nav({ activeProduct }: NavProps) {
  return (
    <nav className="sticky top-0 z-40 px-6 sm:px-10 py-4 flex items-center justify-between bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-[#1A1A1A]">
      {/* Wordmark */}
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="ACE — Agentic Cue Experience"
          width={32}
          height={32}
          priority
          className="rounded-md"
        />
        <div className="flex flex-col leading-none">
          <span className="font-bold tracking-tight text-lg">ACE</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#888] mt-0.5">
            Agentic Cue Experience
          </span>
        </div>
      </Link>

      {/* Product + utility links */}
      <div className="hidden sm:flex items-center gap-6 text-sm text-[#C4C4C4]">
        <Link
          href="/presenter"
          className={`hover:text-white transition ${activeProduct === "presenter" ? "text-white font-semibold" : ""}`}
        >
          Presenter
        </Link>
        <Link
          href="/schedule"
          className={`hover:text-white transition ${activeProduct === "schedule" ? "text-white font-semibold" : ""}`}
        >
          Schedule
        </Link>
        <Link
          href="/editors-notes"
          className={`hover:text-white transition ${activeProduct === "notes" ? "text-white font-semibold" : ""}`}
        >
          Editors&apos; Notes
        </Link>
        <span className="w-px h-4 bg-[#2A2A2A]" aria-hidden />
        <Link href="/guide" className="hover:text-white transition">
          Guide
        </Link>
        <Link href="/support" className="hover:text-white transition">
          Support
        </Link>
      </div>

      {/* Primary CTA */}
      <Link
        href="/api/download?platform=mac-arm64"
        className="px-4 sm:px-5 py-2 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-xs uppercase tracking-wider transition"
      >
        Download
      </Link>
    </nav>
  );
}
