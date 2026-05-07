import type { MetadataRoute } from "next";

/**
 * Next.js App Router sitemap convention.
 *
 * Resolves to https://www.ace-presenter.app/sitemap.xml at build time.
 * Update the SEGMENTS / STATIC_PAGES arrays when new routes ship —
 * the file is intentionally explicit (no filesystem walking) so
 * unfinished pages don't leak into search-engine indexing.
 */

const SITE = "https://www.ace-presenter.app";

export default function sitemap(): MetadataRoute.Sitemap {
  // Priority + change-frequency are advisory hints; modern crawlers
  // mostly ignore them but they still serve as a signal of intent.
  // Home + /download are the conversion targets, so they sit at 1.0.
  const lastModified = new Date();
  return [
    {
      url: `${SITE}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE}/download`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE}/worship`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE}/conferences`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE}/lectures`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/theater`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE}/support`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
