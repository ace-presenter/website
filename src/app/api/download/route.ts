import { NextRequest, NextResponse } from "next/server";

/**
 * Download redirect — points the user at the correct release asset on our
 * R2-backed CDN (dl.ace-presenter.app). The browser sees a 302 → file
 * download starts immediately.
 *
 * Reads the same `latest-mac.yml` manifest electron-updater uses, so the
 * version this redirect serves is ALWAYS in sync with the auto-updater
 * (and with /api/latest). Future releases only need to re-upload the
 * manifest — no marketing-site redeploy required.
 *
 * Query params:
 *   ?platform=mac-arm64 | mac-x64 | win
 *
 * If `platform` is omitted, sniff User-Agent for a default. Bots and
 * unrecognised platforms get sent to the marketing landing page.
 *
 * Cached at the edge for 5 minutes so the bucket isn't hit on every click.
 */

// Edge-cache for 60 seconds. Was 300 (5 min) but that meant the redirect
// could point at a deleted asset for up to 5 minutes after a release flip,
// which is too long when we clean up old versions. 60 s is comfortable —
// the bucket itself absorbs the load fine.
export const revalidate = 60;

const MANIFEST_URL = "https://dl.ace-presenter.app/latest-mac.yml";
const RELEASE_BASE = "https://dl.ace-presenter.app";

// Fallback assets if the manifest fetch fails. Bump these on every release
// just in case the manifest is unreachable — it's the SAFETY NET for users
// arriving via the website while the bucket is down. Should match the most
// recent successful upload.
const FALLBACK: Record<string, string> = {
  "mac-arm64": "ACE-1.4.0-arm64.dmg",
  "mac-x64": "ACE-1.4.0.dmg",
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

/** Pull the right file URL out of `latest-mac.yml`. Bespoke parser since
 *  the manifest has a fixed shape and we don't want a YAML dep here. */
async function resolveFromManifest(platform: string): Promise<string | null> {
  try {
    const r = await fetch(MANIFEST_URL, { next: { revalidate: 60 } });
    if (!r.ok) return null;
    const text = await r.text();
    const lines = text.split(/\r?\n/);
    const urls: string[] = [];
    for (const line of lines) {
      const m = line.match(/^\s*-\s*url:\s*(.+?)\s*$/);
      if (m) urls.push(m[1].replace(/^['"]|['"]$/g, ""));
    }
    if (platform === "mac-arm64") {
      const u = urls.find((x) => x.endsWith("arm64.dmg"));
      return u ? `${RELEASE_BASE}/${u}` : null;
    }
    if (platform === "mac-x64") {
      const u = urls.find((x) => x.endsWith(".dmg") && !x.endsWith("arm64.dmg"));
      return u ? `${RELEASE_BASE}/${u}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const platform =
    req.nextUrl.searchParams.get("platform") ||
    sniffPlatform(req.headers.get("user-agent") || "");

  if (!platform) {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }

  // Windows isn't shipped yet — bounce back to the landing page.
  if (platform === "win") {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }

  // Try the dynamic manifest first; fall back to the hardcoded asset name
  // ONLY if the manifest is unreachable. The hardcoded fallback should
  // always point at the same version the manifest does — bump them in
  // lockstep on every release.
  const dynamicUrl = await resolveFromManifest(platform);
  if (dynamicUrl) {
    return NextResponse.redirect(dynamicUrl, 302);
  }

  const fallback = FALLBACK[platform];
  if (!fallback) {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }
  return NextResponse.redirect(`${RELEASE_BASE}/${fallback}`, 302);
}
