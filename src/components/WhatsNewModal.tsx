"use client";

/**
 * WhatsNewModal — release-announcement popup for the marketing site.
 *
 * Pops up centered on EVERY page load. The localStorage "last-seen"
 * dismissal check was removed — the operator/buyer audience is small
 * and the release cadence is fast (multiple ships per week during
 * launch), so seeing the changelog every visit is the desired
 * behaviour. Dismissed for the current session via ✕, "Close",
 * clicking the overlay, or Esc — refresh and it returns.
 *
 * Replaces the v1.2-era bottom-right toast. The modal pattern was
 * requested deliberately — it's the only surface that reliably draws
 * attention to a major release without a banner taking permanent real
 * estate.
 *
 * Server-side: `version` is passed in from the home page after it
 * resolves the live latest-mac.yml manifest. If the manifest fetch
 * failed (returns null), the modal simply doesn't render.
 */

import { useEffect, useState, useCallback } from "react";

interface Highlight {
  icon: React.ReactNode;
  title: string;
  body: string;
}

interface ReleaseContent {
  version: string;
  date: string;          // human-readable, e.g. "May 6, 2026"
  codename?: string;     // optional release code-name
  highlights: Highlight[];
  /** Why this release is more efficient / powerful than the previous
   *  ones — appears as a divider section between the highlights and the
   *  collapsible details. Each item is a short comparison line. */
  whyBetter?: { label: string; body: string }[];
  improvements: string[];
  fixes: string[];
  removed?: string[];
}

// ── Icons (inline SVG so we don't pull in a runtime icon dependency) ─────────

const I = {
  display: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 18v3" />
    </svg>
  ),
  layers: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 22 8.5 12 15 2 8.5 12 2" />
      <polyline points="2 15.5 12 22 22 15.5" />
    </svg>
  ),
  book: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  image: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  sparkle: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2" />
    </svg>
  ),
  bug: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="6" width="8" height="14" rx="4" />
      <path d="M9 9 6 6M15 9l3-3M3 13h3M18 13h3M9 18l-3 3M15 18l3 3" />
    </svg>
  ),
  trash: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    </svg>
  ),
  caret: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  external: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
};

// ── Release content. Update this object on each ship. ──────────────────────
//
// Why hardcoded vs. CMS: the marketing site is intentionally a single
// Next.js project with no CMS dependency. Each release is a deliberate
// edit + deploy, which is also the only place the release codename and
// editorial framing live. Backend's CHANGELOG list is the comprehensive
// record; this object is the headline-curated subset.

const CURRENT: ReleaseContent = {
  version: "1.5.2",
  date: "May 7, 2026",
  highlights: [
    {
      icon: I.layers,
      title: "Onboarding wizard no longer hangs",
      body: "Step 2 'AI services ready' would stall instead of advancing. Fixed the React race that ate the auto-advance.",
    },
    {
      icon: I.sparkle,
      title: "Whisper download is bulletproof",
      body: "If you skip the wizard, the dashboard now shows the model download as a fallback. No more silent Whisper-less installs.",
    },
    {
      icon: I.book,
      title: "Settings → Recovery",
      body: "Re-download speech model + re-run setup wizard buttons for when something goes sideways.",
    },
  ],
  improvements: [
    "Stable parent handler memoisation across the wizard prevents future closure-cancellation races",
    "ModelDownloadBanner self-detects on dashboard mount and auto-fires download if needed",
  ],
  fixes: [
    "Wizard Step 2 hung on 'AI services ready' instead of advancing to Step 3",
    "Wizard skip-via-localStorage left install Whisper-less (no fallback path until v1.5.2)",
  ],
};

// ── Component ───────────────────────────────────────────────────────────────

interface Props {
  version: string | null;
}

export default function WhatsNewModal({ version }: Props) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  // Collapsible sections — Improvements open by default to give visitors
  // a sense of depth without scrolling; Fixes/Removed collapsed because
  // they're more reference than headline.
  const [openImprovements, setOpenImprovements] = useState(true);
  const [openFixes, setOpenFixes] = useState(false);
  const [openRemoved, setOpenRemoved] = useState(false);

  // Show on every page load. Version-match guard stays — without it the
  // visitor would see a stale modal pointing to an older release during
  // the deploy gap between R2 manifest update and Vercel CDN warm-up.
  const shouldShow = useCallback(() => {
    if (!version) return false;
    if (version !== CURRENT.version) return false;
    if (typeof window === "undefined") return false;
    return true;
  }, [version]);

  useEffect(() => {
    if (!shouldShow()) return;
    // Slight delay so the hero gets first-paint attention before the
    // modal fades in. 700ms feels intentional, not jarring.
    const t = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(t);
  }, [shouldShow]);

  // Dismiss for the current session only — no localStorage write.
  // Refreshing the page brings the modal back, by design (per request).
  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => setVisible(false), 200);
  }, []);

  // Esc to close
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  if (!visible) return null;

  const ChevronCaret = ({ open }: { open: boolean }) => (
    <span
      className="transition-transform duration-200 inline-flex items-center"
      style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
    >
      {I.caret}
    </span>
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`What's new in ACE v${CURRENT.version}`}
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 transition-opacity duration-200 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
      onClick={dismiss}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(8, 10, 14, 0.78)", backdropFilter: "blur(8px)" }}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className={`relative w-full max-w-[640px] max-h-[88vh] overflow-y-auto rounded-2xl shadow-2xl transition-transform duration-200 ${
          exiting ? "scale-[0.98]" : "scale-100"
        }`}
        style={{
          background: "linear-gradient(180deg, #161B26 0%, #0D1117 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.6), 0 0 50px rgba(200,16,46,0.10)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close (top-right) */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[#9AA0AC] hover:text-white hover:bg-white/5 transition-colors text-[16px] leading-none"
        >
          ✕
        </button>

        {/* Header */}
        <div className="px-7 pt-7 pb-2">
          {CURRENT.codename && (
            <div className="text-[20px] font-bold text-white tracking-tight mb-1">
              &ldquo;{CURRENT.codename}&rdquo;
            </div>
          )}
          <div className="text-[20px] font-bold text-white tracking-tight">
            v{CURRENT.version} &mdash; what&rsquo;s new
          </div>
          <div className="text-[12px] text-[#888] mt-1">
            ACE changelog for v{CURRENT.version} &middot; released {CURRENT.date}
          </div>
        </div>

        {/* Highlights — top items with leading icons */}
        <div className="px-7 py-4 space-y-5">
          {CURRENT.highlights.map((h, i) => (
            <div key={i} className="flex gap-4">
              <div
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
                style={{
                  background: "rgba(232,24,58,0.10)",
                  color: "#E8183A",
                  border: "1px solid rgba(232,24,58,0.22)",
                }}
                aria-hidden="true"
              >
                {h.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold text-white leading-tight mb-1">
                  {h.title}
                </div>
                <p className="text-[12.5px] text-[#B0B5C0] leading-[1.55]">
                  {h.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Why this release outperforms past releases — appears between
            highlights and the collapsible details. Adds a labelled
            divider with side-by-side "before/after"-shaped comparison
            lines, framing the release as a step-change rather than a
            list of incremental items. */}
        {CURRENT.whyBetter && CURRENT.whyBetter.length > 0 && (
          <>
            <div className="mx-7 mt-5 mb-3 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/[0.08]" />
              <span
                className="text-[10px] font-bold tracking-[0.18em] uppercase"
                style={{ color: "#E8183A" }}
              >
                Why v{CURRENT.version} is more powerful
              </span>
              <span className="h-px flex-1 bg-white/[0.08]" />
            </div>
            <div className="px-7 pb-3 space-y-3">
              {CURRENT.whyBetter.map((w, i) => (
                <div
                  key={i}
                  className="rounded-md p-3"
                  style={{
                    background: "rgba(232,24,58,0.04)",
                    border: "1px solid rgba(232,24,58,0.10)",
                  }}
                >
                  <div
                    className="text-[11.5px] font-bold mb-1"
                    style={{ color: "#E8183A", letterSpacing: "0.02em" }}
                  >
                    {w.label}
                  </div>
                  <p className="text-[12px] text-[#B0B5C0] leading-[1.55]">
                    {w.body}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Vertical separator before collapsibles */}
        <div className="mx-7 my-3 h-px bg-white/[0.06]" />

        {/* Collapsible sections */}
        <div className="px-7 pb-2 space-y-1">
          <CollapsibleSection
            icon={I.sparkle}
            label="Improvements"
            count={CURRENT.improvements.length}
            open={openImprovements}
            onToggle={() => setOpenImprovements((o) => !o)}
            items={CURRENT.improvements}
          />
          <CollapsibleSection
            icon={I.bug}
            label="Bug Fixes"
            count={CURRENT.fixes.length}
            open={openFixes}
            onToggle={() => setOpenFixes((o) => !o)}
            items={CURRENT.fixes}
          />
          {CURRENT.removed && CURRENT.removed.length > 0 && (
            <CollapsibleSection
              icon={I.trash}
              label="Removed"
              count={CURRENT.removed.length}
              open={openRemoved}
              onToggle={() => setOpenRemoved((o) => !o)}
              items={CURRENT.removed}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-white/[0.06] flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={dismiss}
            className="px-4 py-2 rounded-lg text-[12.5px] font-semibold text-[#B0B5C0] hover:text-white hover:bg-white/5 transition-colors"
          >
            Close
          </button>
          <a
            href="#whats-new"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("whats-new");
              if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
              dismiss();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12.5px] font-bold text-white transition-colors"
            style={{ background: "#1E2230", border: "1px solid rgba(255,255,255,0.10)" }}
          >
            View Changelog
            <span aria-hidden="true">{I.external}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Collapsible row primitive ──────────────────────────────────────────────

interface CollapsibleSectionProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  items: string[];
}

function CollapsibleSection({
  icon,
  label,
  count,
  open,
  onToggle,
  items,
}: CollapsibleSectionProps) {
  return (
    <div className="rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/[0.03] transition-colors text-left"
      >
        <span
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.04)",
            color: "#A3A3A3",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className="flex-1 text-[13.5px] font-semibold text-white">
          {label}
        </span>
        <span className="text-[11px] text-[#666] tabular-nums mr-1">{count}</span>
        <span className="text-[#9AA0AC]">
          <span
            className="inline-flex items-center transition-transform duration-200"
            style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </span>
      </button>
      {open && (
        <ul className="px-3 pb-3 pt-1 space-y-2">
          {items.map((it, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-[12.5px] text-[#B0B5C0] leading-[1.55] pl-10 pr-2"
            >
              <span
                className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                style={{ background: "#555" }}
                aria-hidden="true"
              />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
