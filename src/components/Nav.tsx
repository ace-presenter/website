"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { products } from "@/lib/brand";

/**
 * ACE Suite — global navigation bar.
 *
 * Sticky, backdrop-blurred, dark-only. Scroll-aware: condenses and deepens its
 * background once the page scrolls. The active product link carries a small
 * underline in that product's accent.
 *
 * Pass `activeProduct` from each product page to highlight its link.
 */

type Product = "presenter" | "schedule" | "notes" | "manager" | "world";

const ACCENT: Record<Product, string> = {
  presenter: products.presenter.accent,
  schedule: products.schedule.accent,
  notes: products.editorsNotes.accent,
  manager: products.manager.accent,
  world: products.world.accent,
};

interface NavProps {
  activeProduct?: Product;
}

function NavLink({
  href,
  label,
  active,
  accent,
}: {
  href: string;
  label: string;
  active: boolean;
  accent?: string;
}) {
  return (
    <Link
      href={href}
      className={`relative hover:text-white transition ${active ? "text-white font-semibold" : ""}`}
    >
      {label}
      {active && (
        <span
          aria-hidden
          className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full"
          style={{ background: accent }}
        />
      )}
    </Link>
  );
}

export default function Nav({ activeProduct }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 px-6 sm:px-10 flex items-center justify-between backdrop-blur-xl border-b transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#0F0F0F]/95 border-[#222] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
          : "py-4 bg-[#0F0F0F]/80 border-[#1A1A1A]"
      }`}
    >
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
        <NavLink href="/presenter" label="Presenter" active={activeProduct === "presenter"} accent={ACCENT.presenter} />
        <NavLink href="/schedule" label="Schedule" active={activeProduct === "schedule"} accent={ACCENT.schedule} />
        <NavLink href="/editors-notes" label="Editors' Notes" active={activeProduct === "notes"} accent={ACCENT.notes} />
        <span className="w-px h-4 bg-[#2A2A2A]" aria-hidden />
        <Link href="/guide" className="hover:text-white transition">
          Guide
        </Link>
        <Link href="/support" className="hover:text-white transition">
          Support
        </Link>
      </div>

      {/* Auth + primary CTA */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/login"
          className="text-sm text-[#C4C4C4] hover:text-white transition whitespace-nowrap"
        >
          Sign in
        </Link>
        <Link
          href="/api/download?platform=mac-arm64"
          className="px-4 sm:px-5 py-2 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-xs uppercase tracking-wider transition hover:scale-[1.04] active:scale-100"
        >
          Download
        </Link>
      </div>
    </nav>
  );
}
