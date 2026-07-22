import { NextRequest, NextResponse } from "next/server";

/**
 * Multi-product download redirect.
 *
 * Query params:
 *   ?product=presenter | editors-notes | schedule   (default: presenter)
 *   ?platform=mac-arm64 | mac-x64 | win
 *
 * Resolves the correct DMG from the product-specific manifest on
 * dl.ace-presenter.app, then 302s the browser directly to the file.
 *
 * Default product=presenter preserves backward-compat with existing
 * inbound links and the Presenter app's own update-check path.
 *
 * Cached at the edge for 60 s so bucket traffic stays low while keeping
 * the redirect fresh after a release flip.
 */

export const revalidate = 60;

const RELEASE_BASE = "https://dl.ace-presenter.app";

/**
 * Per-product update manifests on dl.ace-presenter.app.
 *
 * Two formats are supported (see resolveFromManifest):
 *   - electron-builder `latest-mac.yml`  → schedule, editors-notes
 *   - Sparkle `appcast.xml` (.xml)       → presenter (native Qt/C++, arm64-only)
 *
 * All releases live under a per-product subfolder in the ace-releases bucket.
 */
const MANIFEST_PATHS: Record<string, string> = {
  presenter:       "/presenter/appcast.xml",
  "editors-notes": "/editors-notes/latest-mac.yml",
  schedule:        "/schedule/latest-mac.yml",
  // world: not shipped yet; placeholder for ACE World desktop release
  world:           "/world/latest-mac.yml",
};

/**
 * Hardcoded fallback assets — bump these in lockstep with each release.
 * Structure: product → platform → filename
 */
const FALLBACK: Record<string, Record<string, string>> = {
  // arm64-only (native app built for Apple Silicon; no Intel build). Only an
  // arm64 key — mac-x64 requests fall through to the /presenter page.
  // Bump this in lockstep with the appcast if the appcast ever can't be read.
  presenter: {
    "mac-arm64": "presenter/ACE-0.2.9-arm64.dmg",
  },
  // arm64-only app (Qt/C++ built on Apple Silicon; no Intel build).
  // Serve the same DMG for both platforms. Uses the stable alias that
  // r2-upload.js repoints to the newest DMG each release, so this never
  // needs a per-release version bump (the versioned artifact on R2 is
  // ACE-EditorsNotes-<v>-arm64.dmg; the alias always points at the latest).
  "editors-notes": {
    "mac-arm64": "editors-notes/ACE-EditorsNotes-mac.dmg",
    "mac-x64":   "editors-notes/ACE-EditorsNotes-mac.dmg",
  },
  // Universal build. Uses the stable `ACE-Schedule-mac.dmg` alias that the
  // release script repoints to the newest DMG each release, so this never
  // needs a per-release version bump (primary path is the manifest anyway).
  schedule: {
    "mac-arm64": "schedule/ACE-Schedule-mac.dmg",
    "mac-x64":   "schedule/ACE-Schedule-mac.dmg",
  },
};

function sniffPlatform(ua: string): string | null {
  const u = ua.toLowerCase();
  if (u.includes("mac os") || u.includes("macintosh")) return "mac-arm64";
  if (u.includes("windows")) return "win";
  return null;
}

async function resolveFromManifest(
  product: string,
  platform: string
): Promise<string | null> {
  const manifestPath = MANIFEST_PATHS[product];
  if (!manifestPath) return null;

  try {
    const r = await fetch(`${RELEASE_BASE}${manifestPath}`, {
      next: { revalidate: 60 },
    });
    if (!r.ok) return null;
    const text = await r.text();

    // Build the base URL for relative asset paths in the manifest.
    // e.g. manifest at /editors-notes/latest-mac.yml → base = /editors-notes/
    const manifestDir = manifestPath.substring(0, manifestPath.lastIndexOf("/") + 1);
    const toAbsolute = (rel: string) =>
      rel.startsWith("http") ? rel : `${RELEASE_BASE}${manifestDir}${rel}`;

    // Sparkle appcast (.xml): <item>s are newest-first, each with a DMG
    // <enclosure url="…">. These feeds are arm64-only native apps, so Intel
    // requests get no build (they fall through to the product page).
    if (manifestPath.endsWith(".xml")) {
      if (platform !== "mac-arm64") return null;
      const dmgs: string[] = [];
      const re = /<enclosure\b[^>]*\burl="([^"]+\.dmg)"/g;
      let mm: RegExpExecArray | null;
      while ((mm = re.exec(text)) !== null) dmgs.push(mm[1]);
      const u = dmgs.find((x) => x.endsWith("arm64.dmg")) ?? dmgs[0];
      return u ? toAbsolute(u) : null;
    }

    // electron-builder latest-mac.yml (.yml): `- url:` lines.
    const urls: string[] = [];
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*-\s*url:\s*(.+?)\s*$/);
      if (m) urls.push(m[1].replace(/^['"]|['"]$/g, ""));
    }

    if (platform === "mac-arm64") {
      // Prefer an arm64-specific DMG; fall back to any DMG (universal or arm64-only with no suffix)
      const u =
        urls.find((x) => x.endsWith("arm64.dmg")) ??
        urls.find((x) => x.endsWith(".dmg"));
      return u ? toAbsolute(u) : null;
    }
    if (platform === "mac-x64") {
      const u = urls.find((x) => x.endsWith(".dmg") && !x.endsWith("arm64.dmg"));
      return u ? toAbsolute(u) : null;
    }
    return null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const product = sp.get("product") ?? "presenter";
  const platform =
    sp.get("platform") || sniffPlatform(req.headers.get("user-agent") || "");

  if (!platform) {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }
  if (platform === "win") {
    // Windows not shipped for any product yet
    return NextResponse.redirect(new URL("/", req.url), 302);
  }
  // Not-yet-shipped products — send to their marketing page
  if (product === "world") {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }

  // Try dynamic manifest first (live R2 path)
  const dynamicUrl = await resolveFromManifest(product, platform);
  if (dynamicUrl) return NextResponse.redirect(dynamicUrl, 302);

  // Fallback to hardcoded asset path — verify the file exists before
  // redirecting so we don't send users to a 404 on the R2 bucket.
  const fallback = FALLBACK[product]?.[platform];
  const productPageMap: Record<string, string> = {
    "editors-notes": "/editors-notes",
    "schedule": "/schedule",
    "presenter": "/presenter",
  };
  const productPage = productPageMap[product] ?? "/";

  if (!fallback) {
    // No known asset for this product/platform — send to product page
    return NextResponse.redirect(new URL(productPage, req.url), 302);
  }

  // HEAD-check the R2 asset before committing the redirect
  try {
    const check = await fetch(`${RELEASE_BASE}/${fallback}`, { method: "HEAD" });
    if (!check.ok) {
      return NextResponse.redirect(new URL(productPage, req.url), 302);
    }
  } catch {
    return NextResponse.redirect(new URL(productPage, req.url), 302);
  }

  return NextResponse.redirect(`${RELEASE_BASE}/${fallback}`, 302);
}
