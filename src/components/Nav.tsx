"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { products } from "@/lib/brand";
import { lenisStart, lenisStop } from "@/components/SmoothScroll";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

type NavUser = { email?: string; user_metadata?: Record<string, unknown> };

function navInitials(u: NavUser): string {
  const md = u.user_metadata ?? {};
  const name = typeof md.full_name === "string" ? md.full_name : typeof md.name === "string" ? md.name : "";
  const src = (name || u.email || "").trim();
  const parts = src.split(/[\s@._-]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "A";
}

/**
 * ACE Suite — global navigation bar.
 *
 * Sticky, backdrop-blurred, dark-only. Scroll-aware: condenses and deepens its
 * background once the page scrolls.
 *
 * Desktop: Products ▾ dropdown (3 live products + Manager/World "SOON"),
 * Learn, Support, Pricing, Sign in, Get started. The dropdown opens on hover
 * and focus, toggles on click, and closes on Escape (restoring focus to the
 * trigger). Mobile: hamburger → full-screen sheet; scroll is frozen via Lenis
 * stop + body overflow lock while open.
 *
 * Pass `activeProduct` from each product page to highlight the trigger.
 */

type Product = "presenter" | "schedule" | "notes" | "manager" | "world";

interface NavProps {
  activeProduct?: Product;
}

const LIVE_PRODUCTS: {
  key: Product;
  href: string;
  name: string;
  desc: string;
  accent: string;
}[] = [
  {
    key: "presenter",
    href: "/presenter",
    name: "Presenter",
    desc: "Slides that follow the room, live.",
    accent: products.presenter.accent,
  },
  {
    key: "schedule",
    href: "/schedule",
    name: "Schedule",
    desc: "Plan and run your day with AI routines.",
    accent: products.schedule.accent,
  },
  {
    key: "notes",
    href: "/editors-notes",
    name: "Editors' Notes",
    desc: "Timecoded notes inside DaVinci Resolve.",
    accent: products.editorsNotes.accent,
  },
];

const SOON_PRODUCTS: typeof LIVE_PRODUCTS = [
  {
    key: "manager",
    href: "/manager",
    name: "Manager",
    desc: "One dashboard for teams and orgs.",
    accent: products.manager.accent,
  },
  {
    key: "world",
    href: "/world",
    name: "World",
    desc: "A shared space for your audience.",
    accent: products.world.accent,
  },
];

function ProductRow({
  item,
  soon,
  onNavigate,
}: {
  item: (typeof LIVE_PRODUCTS)[number];
  soon?: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={item.href}
      role="menuitem"
      onClick={onNavigate}
      className={`flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/[0.06] ${
        soon ? "opacity-70 hover:opacity-100" : ""
      }`}
    >
      <span
        aria-hidden
        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
        style={{ background: item.accent, boxShadow: `0 0 8px ${item.accent}` }}
      />
      <span className="flex flex-col">
        <span className="flex items-center gap-2 text-sm font-semibold text-white">
          {item.name}
          {soon && (
            <span className="rounded-full border border-white/15 px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.18em] text-[#999]">
              Soon
            </span>
          )}
        </span>
        <span className="text-xs text-[#9A9A9A]">{item.desc}</span>
      </span>
    </Link>
  );
}

export default function Nav({ activeProduct }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // products dropdown
  const [mobileOpen, setMobileOpen] = useState(false);
  // undefined = still resolving (avoid flashing the wrong auth state)
  const [user, setUser] = useState<NavUser | null | undefined>(undefined);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auth state → the nav reflects sign-in without a page reload.
  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON) {
      setUser(null);
      return;
    }
    let mounted = true;
    const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON);
    supabase.auth
      .getUser()
      .then(({ data }) => mounted && setUser(data.user ?? null))
      .catch(() => mounted && setUser(null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (mounted) setUser(session?.user ?? null);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Freeze page scroll under the mobile sheet.
  useEffect(() => {
    if (!mobileOpen) return;
    lenisStop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      lenisStart();
    };
  }, [mobileOpen]);

  // Escape closes whichever layer is open.
  useEffect(() => {
    if (!open && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mobileOpen]);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  const productActive = activeProduct !== undefined;

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

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6 text-sm text-[#C4C4C4]">
        {/* Products dropdown */}
        <div
          className="relative"
          onMouseEnter={() => {
            cancelClose();
            setOpen(true);
          }}
          onMouseLeave={scheduleClose}
        >
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-haspopup="menu"
            onClick={() => setOpen((o) => !o)}
            onFocus={() => setOpen(true)}
            className={`relative flex items-center gap-1.5 hover:text-white transition ${
              productActive ? "text-white font-semibold" : ""
            }`}
          >
            Products
            <svg
              aria-hidden
              width="10"
              height="10"
              viewBox="0 0 10 10"
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            >
              <path d="M1 3.5 5 7l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {productActive && (
              <span
                aria-hidden
                className="absolute -bottom-1.5 left-0 right-3.5 h-0.5 rounded-full"
                style={{
                  background:
                    activeProduct === "notes"
                      ? products.editorsNotes.accent
                      : products[activeProduct as Exclude<Product, "notes">].accent,
                }}
              />
            )}
          </button>

          {open && (
            <div
              ref={menuRef}
              role="menu"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              onBlur={(e) => {
                if (!menuRef.current?.contains(e.relatedTarget as Node)) scheduleClose();
              }}
              // Solid panel, not glass: the nav already runs backdrop-blur, and
              // nested backdrop-filters can't sample the page behind it — a
              // translucent panel here reads as broken over big hero type.
              className="absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#141414] p-2 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)]"
            >
              <div className="flex flex-col">
                {LIVE_PRODUCTS.map((p) => (
                  <ProductRow key={p.key} item={p} onNavigate={() => setOpen(false)} />
                ))}
              </div>
              <div className="mx-3 my-1.5 h-px bg-white/10" aria-hidden />
              <p className="px-3 pt-1 pb-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-[#777]">
                Coming soon
              </p>
              <div className="flex flex-col">
                {SOON_PRODUCTS.map((p) => (
                  <ProductRow key={p.key} item={p} soon onNavigate={() => setOpen(false)} />
                ))}
              </div>
            </div>
          )}
        </div>

        <Link href="/learn" className="hover:text-white transition">
          Learn
        </Link>
        <Link href="/support" className="hover:text-white transition">
          Support
        </Link>
        <Link href="/pricing" className="hover:text-white transition">
          Pricing
        </Link>
      </div>

      {/* Auth + primary CTA + hamburger */}
      <div className="flex items-center gap-3 sm:gap-4">
        {user === undefined ? (
          // resolving — reserve space to avoid a layout shift / wrong-state flash
          <span aria-hidden className="h-9 w-9 rounded-full bg-white/[0.04]" />
        ) : user ? (
          <Link
            href="/account"
            aria-label="Account"
            className="flex items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#151515] py-1 pl-1 pr-1 sm:pr-3.5 transition hover:border-[#3A3A3A]"
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white"
              style={{ background: "linear-gradient(135deg, #C8102E, #FF6B00)" }}
            >
              {navInitials(user)}
            </span>
            <span className="hidden text-sm font-semibold text-white sm:block">Account</span>
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="hidden sm:block text-sm text-[#C4C4C4] hover:text-white transition whitespace-nowrap"
            >
              Sign in
            </Link>
            <Link
              href="/pricing"
              className="px-4 sm:px-5 py-2 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-xs uppercase tracking-wider transition hover:scale-[1.04] active:scale-100"
            >
              Get started
            </Link>
          </>
        )}
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-[#2A2A2A] text-white"
        >
          <svg aria-hidden width="16" height="16" viewBox="0 0 16 16">
            {mobileOpen ? (
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] z-40 overflow-y-auto bg-[#0C0C0C] px-6 py-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#777]">
            Products
          </p>
          <div className="mt-2 flex flex-col gap-1">
            {LIVE_PRODUCTS.map((p) => (
              <ProductRow key={p.key} item={p} onNavigate={() => setMobileOpen(false)} />
            ))}
            {SOON_PRODUCTS.map((p) => (
              <ProductRow key={p.key} item={p} soon onNavigate={() => setMobileOpen(false)} />
            ))}
          </div>
          <div className="my-5 h-px bg-white/10" aria-hidden />
          <div className="flex flex-col gap-4 text-base text-[#C4C4C4]">
            <Link href="/learn" onClick={() => setMobileOpen(false)} className="hover:text-white transition">
              Learn
            </Link>
            <Link href="/support" onClick={() => setMobileOpen(false)} className="hover:text-white transition">
              Support
            </Link>
            <Link href="/pricing" onClick={() => setMobileOpen(false)} className="hover:text-white transition">
              Pricing
            </Link>
            {user ? (
              <Link href="/account" onClick={() => setMobileOpen(false)} className="font-semibold text-white transition hover:text-[#E8183A]">
                Account
              </Link>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)} className="hover:text-white transition">
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
