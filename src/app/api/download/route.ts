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

/** Per-product manifest paths on dl.ace-presenter.app */
const MANIFEST_PATHS: Record<string, string> = {
  presenter:       "/latest-mac.yml",
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
  presenter: {
    "mac-arm64": "ACE-1.7.4-arm64.dmg",
    "mac-x64": "ACE-1.7.4.dmg",
  },
  // arm64-only app (Qt/C++ built on Apple Silicon; no Intel build).
  // Serve the same DMG for both platforms.
  "editors-notes": {
    "mac-arm64": "editors-notes/ACE-EditorsNotes-1.2.0.dmg",
    "mac-x64":   "editors-notes/ACE-EditorsNotes-1.2.0.dmg",
  },
  // Universal build — same file served for both arm64 and x64 Mac users.
  // Bump version here in lockstep with each desktop release.
  schedule: {
    "mac-arm64": "schedule/ACE-Schedule-1.0.11-universal.dmg",
    "mac-x64":   "schedule/ACE-Schedule-1.0.11-universal.dmg",
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
    const urls: string[] = [];
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*-\s*url:\s*(.+?)\s*$/);
      if (m) urls.push(m[1].replace(/^['"]|['"]$/g, ""));
    }
    // Build the base URL for relative asset paths in the manifest.
    // e.g. manifest at /editors-notes/latest-mac.yml → base = /editors-notes/
    const manifestDir = manifestPath.substring(0, manifestPath.lastIndexOf("/") + 1);
    const toAbsolute = (rel: string) =>
      rel.startsWith("http") ? rel : `${RELEASE_BASE}${manifestDir}${rel}`;

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
