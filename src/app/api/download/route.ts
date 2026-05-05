import { NextRequest, NextResponse } from "next/server";

/**
 * Download redirect — points the user at the correct release asset on our
 * R2-backed CDN (dl.ace-presenter.app). The browser sees a 302 → file
 * download starts immediately. The user never sees an intermediate page
 * because the CDN serves with `Content-Disposition: attachment`-equivalent
 * headers (or a recognisable file MIME like application/x-apple-diskimage).
 *
 * Query params:
 *   ?platform=mac-arm64 | mac-x64 | win
 *
 * If `platform` is omitted, sniff User-Agent for a default. Bots and
 * unrecognised platforms get sent to the marketing landing page.
 *
 * R2 was chosen over GitHub Releases because GitHub caps individual assets
 * at 2 GB and our DMGs (with bundled Whisper medium model) are ~2.5 GB.
 * R2 also has zero egress fees so download volume scales for free.
 */

const RELEASE_BASE = "https://dl.ace-presenter.app";

// Map platform → filename at the bucket root. Naming matches what
// electron-builder produces. Bump these on every release; once we have
// time we can replace this with a dynamic lookup from /api/latest so
// versioning isn't hardcoded.
const ASSETS: Record<string, string> = {
  "mac-arm64": "ACE-1.0.4-arm64.dmg",
  "mac-x64": "ACE-1.0.4.dmg",
  "win": "ACE-Setup-1.0.4.exe",
};

function sniffPlatform(ua: string): string | null {
  const u = ua.toLowerCase();
  if (u.includes("mac os") || u.includes("macintosh")) {
    // Apple Silicon detection from UA is unreliable — default to arm64
    // since 95%+ of Macs sold since 2020 are Apple Silicon. Intel users
    // can still pick the explicit Intel button on the landing page.
    return "mac-arm64";
  }
  if (u.includes("windows")) return "win";
  return null;
}

export async function GET(req: NextRequest) {
  const platform =
    req.nextUrl.searchParams.get("platform") ||
    sniffPlatform(req.headers.get("user-agent") || "");

  if (!platform || !ASSETS[platform]) {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }

  const url = `${RELEASE_BASE}/${ASSETS[platform]}`;
  return NextResponse.redirect(url, 302);
}
