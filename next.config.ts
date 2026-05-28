import type { NextConfig } from "next";

/**
 * Canonical host: www.ace-presenter.app
 *
 * Redirect map:
 *   1. apex → www  (always)
 *   2. Old Presenter segment pages → /presenter/*
 *   3. Old Taskify domain → /schedule  (DNS-level 301, mirrored here)
 *   4. Old CutNotes domain → /editors-notes  (same)
 */
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // ── ACE Manager app proxy ──────────────────────────────────────────
      // All /manager/app/* traffic is proxied to the ACE Manager Next.js
      // deployment. ACE_MANAGER_APP_URL is set per-environment in Vercel.
      {
        source: "/manager/app/:path*",
        destination: `${process.env.ACE_MANAGER_APP_URL ?? "http://localhost:3001"}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      // ── 1. apex → www ──────────────────────────────────────────────────
      {
        source: "/:path*",
        has: [{ type: "host", value: "ace-presenter.app" }],
        destination: "https://www.ace-presenter.app/:path*",
        permanent: true,
      },

      // ── 2. Presenter segment pages (old top-level → /presenter/*) ──────
      {
        source: "/worship",
        destination: "/presenter/worship",
        permanent: true,
      },
      {
        source: "/conferences",
        destination: "/presenter/conferences",
        permanent: true,
      },
      {
        source: "/lectures",
        destination: "/presenter/lectures",
        permanent: true,
      },
      {
        source: "/theater",
        destination: "/presenter/theater",
        permanent: true,
      },

      // ── 3. Old Taskify domain → /schedule ──────────────────────────────
      // The DNS-level redirect at Vercel handles the domain hop;
      // this catches any path-level links that might arrive via a 307
      // chain from the old domain pointing to www.ace-presenter.app.
      {
        source: "/taskify/:path*",
        destination: "/schedule",
        permanent: true,
      },

      // ── 4. Old CutNotes paths → /editors-notes ─────────────────────────
      {
        source: "/cutnotes/:path*",
        destination: "/editors-notes",
        permanent: true,
      },

      // ── 5. Legacy HiveSync paths → /manager ────────────────────────────
      // Any old link that pointed at the standalone HiveSync deployment
      // (e.g. hivesync.vercel.app or internal links) is caught here.
      {
        source: "/hivesync/:path*",
        destination: "/manager",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
