"use client";

/**
 * ReviewPrompt — asks actual users for a review, once, quietly.
 *
 * The problem it solves: /reviews exists and is empty, and nobody knows we
 * want reviews. A page nobody is pointed at collects nothing.
 *
 * Three constraints shaped this, and they pull against each other:
 *
 *  1. Only ask people who have plausibly used ACE. Asking every visitor is how
 *     you get reviews written by people who have never run a service, which is
 *     worse than no reviews — it is the same lie as writing them ourselves,
 *     just outsourced. So this is gated on being signed in. Imperfect (an
 *     account is not a Sunday morning) but it is the strongest signal the
 *     marketing site actually has, and it errs toward asking too few people.
 *
 *  2. Do not collide with WhatsNewModal, which takes over the screen centred
 *     on /presenter. This is a corner toast, it waits, and it stays out of the
 *     way. Two popups arguing over one visitor is how both get dismissed.
 *
 *  3. Ask once. "Not now" is respected for two months; "already did" and the
 *     close button are respected permanently. Nagging someone for a favour is
 *     a good way to be told no forever.
 *
 * Never renders on /reviews itself — they are already there.
 *
 * localStorage can throw outright in private modes and embedded webviews, so
 * every read and write is guarded and the failure mode is "do not show",
 * never a crash on someone's marketing page.
 */

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const KEY = "ace.reviewPrompt";
const SNOOZE_DAYS = 60;
/** Long enough that they are reading, not landing. */
const DELAY_MS = 14_000;

type Stored = { until: number | null };

function readState(): Stored | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { until: 0 };
    return JSON.parse(raw) as Stored;
  } catch {
    // Private mode, blocked site data, or malformed JSON — treat as "asked
    // already" so a broken read can never turn into a popup on every load.
    return null;
  }
}

function writeState(state: Stored) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* Nothing to do; worst case they see it again next visit. */
  }
}

export default function ReviewPrompt() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const close = useCallback((until: number | null) => {
    setLeaving(true);
    writeState({ until });
    window.setTimeout(() => setShow(false), 200);
  }, []);

  useEffect(() => {
    if (pathname === "/reviews") return;
    if (!SUPABASE_URL || !SUPABASE_ANON) return;

    const state = readState();
    if (!state) return;                                   // unreadable → stay quiet
    if (state.until === null) return;                     // permanently dismissed
    if (state.until > Date.now()) return;                 // snoozed

    let cancelled = false;
    let timer: number | undefined;

    createBrowserClient(SUPABASE_URL, SUPABASE_ANON)
      .auth.getUser()
      .then(({ data }) => {
        if (cancelled || !data.user) return;
        timer = window.setTimeout(() => !cancelled && setShow(true), DELAY_MS);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(Date.now() + SNOOZE_DAYS * 864e5);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, close]);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Leave a review"
      className={`fixed bottom-5 right-5 z-[60] w-[min(23rem,calc(100vw-2.5rem))] rounded-2xl border border-[#242424] bg-[#0E0E0E] p-5 shadow-2xl shadow-black/60 transition-all duration-200 ${
        leaving ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
      } motion-reduce:transition-none`}
    >
      <button
        onClick={() => close(Date.now() + SNOOZE_DAYS * 864e5)}
        aria-label="Close"
        className="absolute right-3 top-3 text-[#666] transition hover:text-white"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#666]">
        One favour
      </p>
      <h2 className="mb-2 pr-5 text-[17px] font-bold leading-snug tracking-tight text-white">
        Have you run a service with ACE?
      </h2>
      <p className="mb-4 text-[13px] leading-relaxed text-[#A8A8A8]">
        We&apos;d rather hear it from you than write it ourselves. Tell us how it
        went — including if it went badly. It takes a minute, and we publish
        what you write.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <a
          href="/reviews"
          onClick={() => close(null)}
          className="rounded-full bg-[#E8183A] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#FF2649]"
        >
          Leave a review
        </a>
        <button
          onClick={() => close(Date.now() + SNOOZE_DAYS * 864e5)}
          className="rounded-full border border-[#2A2A2A] px-4 py-2 text-[13px] font-medium text-[#C4C4C4] transition hover:bg-[#1A1A1A] hover:text-white"
        >
          Not now
        </button>
        <button
          onClick={() => close(null)}
          className="px-2 py-2 text-[12px] text-[#666] transition hover:text-[#999]"
        >
          Don&apos;t ask again
        </button>
      </div>
    </div>
  );
}
