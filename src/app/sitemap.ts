import type { MetadataRoute } from "next";

/**
 * Next.js App Router sitemap convention.
 * Resolves to https://www.ace-presenter.app/sitemap.xml at build time.
 *
 * Covers all three ACE suite products + shared utility pages.
 * Update when new routes ship — intentionally explicit so unfinished
 * pages don't leak into search-engine indexing.
 */

const SITE = "https://www.ace-presenter.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    // ── Suite home ───────────────────────────────────────────────────────
    { url: `${SITE}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },

    // ── ACE Presenter ────────────────────────────────────────────────────
    { url: `${SITE}/presenter`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/presenter/worship`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/presenter/conferences`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/presenter/lectures`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/presenter/theater`, lastModified, changeFrequency: "monthly", priority: 0.7 },

    // ── ACE Schedule Manager ─────────────────────────────────────────────
    { url: `${SITE}/schedule`, lastModified, changeFrequency: "weekly", priority: 0.9 },

    // ── ACE Editors' Notes ───────────────────────────────────────────────
    { url: `${SITE}/editors-notes`, lastModified, changeFrequency: "weekly", priority: 0.9 },

    // ── ACE Manager ──────────────────────────────────────────────────────
    { url: `${SITE}/manager`, lastModified, changeFrequency: "weekly", priority: 0.9 },

    // ── Shared ───────────────────────────────────────────────────────────
    { url: `${SITE}/download`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/waitlist`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/learn`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/support`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
