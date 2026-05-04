import { NextRequest, NextResponse } from "next/server";

/**
 * Download redirect — points the user at the correct GitHub Release asset
 * for their platform. The browser sees a 302 → file download starts; the
 * github.com URL flashes briefly but the user never sees the GitHub UI.
 *
 * Query params:
 *   ?platform=mac-arm64 | mac-x64 | win
 *
 * If `platform` is omitted, sniff User-Agent for a default. Bots and
 * unrecognised platforms get sent to the marketing landing page.
 */

const RELEASE_BASE =
  "https://github.com/ace-presenter/ace-releases/releases/latest/download";

const ASSETS: Record<string, string> = {
  "mac-arm64": "ACE-arm64.dmg",
  "mac-x64": "ACE.dmg",
  "win": "ACE-Setup.exe",
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
