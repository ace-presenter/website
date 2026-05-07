import type { MetadataRoute } from "next";

/**
 * Next.js App Router robots convention.
 *
 * Resolves to https://www.ace-presenter.app/robots.txt at build time.
 * We allow everything — there's no admin / staging surface on this
 * site that needs hiding from crawlers. The /api/* paths are dynamic
 * (download redirect, latest-version proxy) but indexing them does
 * no harm; we don't disallow them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.ace-presenter.app/sitemap.xml",
    host: "https://www.ace-presenter.app",
  };
}
