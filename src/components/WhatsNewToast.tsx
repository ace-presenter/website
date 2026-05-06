"use client";

/**
 * WhatsNewToast — release announcement toast for the marketing site.
 *
 * Pops up on every page load when the visitor hasn't yet acknowledged the
 * current release. localStorage records the last-seen version, so:
 *   • First-time visitor → toast shows for the latest release
 *   • Returning visitor on a new release → toast shows again
 *   • Same visitor, same release → toast stays hidden
 *
 * Dismissed by clicking ✕ or the "See what's new" CTA (which also smooth-
 * scrolls to the on-page #whats-new section so the visitor can read the
 * full list — the toast is only a hook).
 *
 * Why a toast (not a modal): a modal would block the hero on first paint
 * which is the worst time to interrupt comprehension. The toast lets the
 * visitor read the headline + decide whether to engage.
 *
 * Server-side: `version` is passed in from the home page after it
 * resolves the live latest-mac.yml manifest. If the manifest fetch
 * failed (returns null), the toast simply doesn't render.
 */

import { useEffect, useState } from "react";

const STORAGE_KEY = "ace_marketing.last_seen_version";

interface Props {
  version: string | null;
}

export default function WhatsNewToast({ version }: Props) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!version) return;
    if (typeof window === "undefined") return;
    let lastSeen: string | null = null;
    try {
      lastSeen = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // private mode / disabled storage — show the toast every time
    }
    if (lastSeen === version) return;
    // Slight delay so the hero gets first-paint attention before the
    // toast slides in. 600ms feels intentional, not jarring.
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, [version]);

  const dismiss = (markSeen: boolean) => {
    if (markSeen && version) {
      try {
        window.localStorage.setItem(STORAGE_KEY, version);
      } catch {
        /* private mode — silently degrade */
      }
    }
    setExiting(true);
    setTimeout(() => setVisible(false), 220);
  };

  const handleCTA = () => {
    const target = document.getElementById("whats-new");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    dismiss(true);
  };

  if (!version || !visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed z-50 bottom-5 right-5 sm:bottom-6 sm:right-6 max-w-[360px] rounded-2xl shadow-2xl transition-all duration-200 ${
        exiting ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
      }`}
      style={{
        background: "linear-gradient(180deg, #161B26 0%, #0F1218 100%)",
        border: "1px solid rgba(232, 24, 58, 0.35)",
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.55), 0 0 30px rgba(200,16,46,0.18)",
      }}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <span
            className="mt-1.5 w-2 h-2 rounded-full shrink-0 animate-pulse"
            style={{ background: "#E8183A" }}
          />
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#E8183A] font-bold mb-1">
              Just shipped
            </div>
            <div className="text-[14px] font-semibold text-white leading-tight mb-1">
              v{version} is out
            </div>
            <p className="text-[12px] text-[#A3A3A3] leading-relaxed">
              Quick Screens, Slide Import (now with Keynote), one-click Service
              Plan Go, sub-200ms lyric &amp; Bible detection.
            </p>
          </div>
          <button
            type="button"
            onClick={() => dismiss(true)}
            className="text-[#666] hover:text-white transition shrink-0 -mr-1 -mt-1 p-1 leading-none text-[14px]"
            aria-label="Dismiss release announcement"
            title="Dismiss"
          >
            ✕
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleCTA}
            className="flex-1 px-3.5 py-2 rounded-lg text-[12px] font-bold uppercase tracking-wider text-white transition"
            style={{
              background: "linear-gradient(135deg, #C8102E 0%, #E8183A 100%)",
              boxShadow: "0 4px 16px rgba(200,16,46,0.25)",
            }}
          >
            See what&apos;s new
          </button>
          <button
            type="button"
            onClick={() => dismiss(true)}
            className="px-3 py-2 rounded-lg text-[11px] font-semibold text-[#888] hover:text-white transition"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
