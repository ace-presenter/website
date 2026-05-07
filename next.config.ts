import type { NextConfig } from "next";

/**
 * Canonical host: www.ace-presenter.app
 *
 * The apex (ace-presenter.app) 301-redirects to the www subdomain so
 * search engines, bookmarks, and links converge on a single URL —
 * without this, Google indexes both as duplicate-content copies and
 * dilutes ranking signals across the pair.
 *
 * Vercel needs both apex AND www added as project domains for this to
 * fire — the redirect runs against whatever request actually reaches
 * Next.js. If Vercel only serves www, requests to apex never get here
 * and the apex domain just fails to resolve. Confirm both are in
 * Project → Settings → Domains.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ace-presenter.app" }],
        destination: "https://www.ace-presenter.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
