import Link from "next/link";
import Image from "next/image";

/**
 * ACE Suite — global footer.
 * Shared across all product pages and the suite home.
 */
export default function Footer() {
  return (
    <footer className="px-6 sm:px-10 py-10 border-t border-[#1A1A1A] text-sm text-[#C4C4C4]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Wordmark + suite tagline */}
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={20} height={20} className="rounded" />
          <div className="flex flex-col leading-tight">
            <span className="text-[12px] text-white">ACE — Agentic Cue Experience</span>
            <span className="text-[10px] text-[#888]">© 2026 Rainbow Kreativ</span>
          </div>
        </div>

        {/* Product links */}
        <div className="flex items-center gap-5 flex-wrap justify-center text-xs">
          <span className="text-[#555] uppercase tracking-wider text-[9px] font-semibold">Products</span>
          <Link href="/presenter" className="hover:text-white transition">Presenter</Link>
          <Link href="/schedule" className="hover:text-white transition">Schedule</Link>
          <Link href="/editors-notes" className="hover:text-white transition">Editors&apos; Notes</Link>
        </div>

        {/* Utility links */}
        <div className="flex items-center gap-5 flex-wrap justify-center text-xs">
          <Link href="/guide" className="hover:text-white transition">Guide</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
          <Link href="/support" className="hover:text-white transition">Support</Link>
          <a href="mailto:hello@ace-presenter.app" className="hover:text-white transition">
            hello@ace-presenter.app
          </a>
        </div>
      </div>
    </footer>
  );
}
