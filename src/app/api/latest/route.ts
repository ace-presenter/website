import { NextRequest, NextResponse } from "next/server";

/**
 * Multi-product latest-release metadata.
 *
 * Query params:
 *   ?product=presenter | editors-notes | schedule   (default: presenter)
 *
 * Returns version, published date, and direct download URLs per platform,
 * read from the SAME feeds the auto-updaters read — so the website cannot
 * drift from what churches are actually offered.
 *
 * Two feed formats, because the products genuinely differ:
 *
 *   • ACE Presenter ships native apps and uses Sparkle / WinSparkle
 *     **appcast XML** — one feed per platform.
 *   • The Electron products use electron-builder **latest-mac.yml**.
 *
 * This route only knew the YAML shape, and had `presenter` pointed at
 * `/latest-mac.yml`, a file the presenter has never published. So the
 * presenter — the flagship — answered every request with
 * `{"error":"release lookup failed"}` while both its feeds were live and
 * correct. It also hardcoded `win: null`, so Windows was invisible here even
 * after it started shipping on the same day as macOS.
 *
 * Cached 5 min at the edge.
 */

export const revalidate = 300;

const RELEASE_BASE = "https://dl.ace-presenter.app";

/** Products whose releases are described by Sparkle appcast XML, per platform. */
const APPCAST_FEEDS: Record<string, { mac?: string; win?: string }> = {
  presenter: {
    mac: "/presenter/appcast.xml",
    win: "/presenter-win/appcast.xml",
  },
};

/**
 * Products whose releases are described by an electron-builder YAML manifest,
 * one feed per platform — electron writes Windows to latest.yml and macOS to
 * latest-mac.yml, side by side in the same folder.
 */
const MANIFEST_FEEDS: Record<string, { mac?: string; win?: string }> = {
  "editors-notes": { mac: "/editors-notes/latest-mac.yml" },
  schedule: { mac: "/schedule/latest-mac.yml", win: "/schedule/latest.yml" },
};

type ManifestFile = { url: string; sha512: string; size: number };
type Release = { version: string; published: string | null; url: string; size: number | null };

// --- Sparkle appcast ---------------------------------------------------------

/**
 * First real <item> in an appcast.
 *
 * Comments are stripped BEFORE anything is matched, and that is not defensive
 * tidying — both presenter feeds carry a commented-out example item showing the
 * shape a new release should take ("ACE Presenter 0.1.0"). Matching the raw
 * text reports 0.1.0 as the current version, which is worse than the 503 this
 * replaces: a wrong answer that looks right.
 *
 * Items are newest-first by convention, so the first surviving one wins.
 */
function parseAppcast(xml: string): Release | null {
  const live = xml.replace(/<!--[\s\S]*?-->/g, "");
  const item = live.match(/<item>([\s\S]*?)<\/item>/);
  if (!item) return null;
  const body = item[1];

  const version =
    body.match(/<sparkle:shortVersionString>([^<]+)<\/sparkle:shortVersionString>/)?.[1] ??
    body.match(/<sparkle:version>([^<]+)<\/sparkle:version>/)?.[1];
  const enclosure = body.match(/<enclosure\b[\s\S]*?>/)?.[0];
  const url = enclosure?.match(/\burl="([^"]+)"/)?.[1];
  if (!version || !url) return null;

  const lengthAttr = enclosure?.match(/\blength="(\d+)"/)?.[1];
  return {
    version: version.trim(),
    published: body.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1]?.trim() ?? null,
    // Appcast enclosures carry absolute URLs; do not prefix RELEASE_BASE.
    url: url.startsWith("http") ? url : `${RELEASE_BASE}/${url.replace(/^\//, "")}`,
    size: lengthAttr ? parseInt(lengthAttr, 10) : null,
  };
}

// --- electron-builder YAML ---------------------------------------------------

function parseManifest(text: string): {
  version: string;
  releaseDate?: string;
  files: ManifestFile[];
} {
  const lines = text.split(/\r?\n/);
  const result = { version: "", releaseDate: undefined as string | undefined, files: [] as ManifestFile[] };
  let cur: Partial<ManifestFile> | null = null;
  for (const line of lines) {
    // Tolerate YAML list-item dashes ("  - url: …") so the files[] array
    // populates — without this, mac_arm64/mac_x64 always came back null.
    const m = line.match(/^(\s*)(?:-\s+)?([\w-]+):\s*(.*)$/);
    if (!m) continue;
    const [, indent, key, rawVal] = m;
    const val = rawVal.replace(/^['"]|['"]$/g, "").trim();
    if (indent === "" && key === "version") result.version = val;
    else if (indent === "" && key === "releaseDate") result.releaseDate = val;
    if (line.match(/^\s*-\s+url:/)) {
      if (cur && cur.url) result.files.push(cur as ManifestFile);
      cur = { url: val };
    } else if (cur && key === "sha512" && indent.length >= 4) {
      cur.sha512 = val;
    } else if (cur && key === "size" && indent.length >= 4) {
      cur.size = parseInt(val, 10);
    }
  }
  if (cur && cur.url) result.files.push(cur as ManifestFile);
  return result;
}

type Manifest = {
  version: string;
  releaseDate?: string;
  files: ManifestFile[];
  /**
   * Absolute prefix for this manifest's relative `url` entries.
   *
   * Manifest urls are bare filenames, and every release lives in a per-product
   * folder. Joining them straight onto the origin produced
   * dl.ace-presenter.app/ACE-Schedule-1.0.16-universal.dmg — a 404, served as
   * the download URL for the whole product, because the /schedule/ the file
   * actually sits under came from the manifest path and was dropped.
   */
  base: string;
};

async function fetchManifest(path: string): Promise<Manifest | null> {
  try {
    const r = await fetch(`${RELEASE_BASE}${path}`, { next: { revalidate: 300 } });
    if (!r.ok) return null;
    const m = parseManifest(await r.text());
    if (!m.version && m.files.length === 0) return null;
    return { ...m, base: `${RELEASE_BASE}${path.substring(0, path.lastIndexOf("/") + 1)}` };
  } catch {
    return null;
  }
}

async function fetchAppcast(path: string): Promise<Release | null> {
  try {
    const r = await fetch(`${RELEASE_BASE}${path}`, { next: { revalidate: 300 } });
    if (!r.ok) return null;
    return parseAppcast(await r.text());
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const product = req.nextUrl.searchParams.get("product") ?? "presenter";

  // --- Appcast products (ACE Presenter) ---
  const feeds = APPCAST_FEEDS[product];
  if (feeds) {
    // Both platforms in parallel, and independently: a hiccup on one feed
    // must not blank out the other. The platforms release on the same day but
    // they are separate uploads, and a half-answer beats no answer.
    const [mac, win] = await Promise.all([
      feeds.mac ? fetchAppcast(feeds.mac) : Promise.resolve(null),
      feeds.win ? fetchAppcast(feeds.win) : Promise.resolve(null),
    ]);

    if (!mac && !win) {
      return NextResponse.json(
        { error: "release lookup failed", detail: "no readable appcast for " + product },
        { status: 503 }
      );
    }

    return NextResponse.json({
      product,
      // Top-level version is macOS, the reference platform. Each platform also
      // reports its own, because they can legitimately differ for a few hours
      // on release day.
      version: mac?.version ?? win?.version ?? null,
      published: mac?.published ?? win?.published ?? null,
      // ACE Presenter for macOS is Apple-Silicon only; there is no Intel build,
      // so mac_x64 is null by fact rather than by omission.
      mac_arm64: mac ? { url: mac.url, size: mac.size, version: mac.version } : null,
      mac_x64: null,
      win: win ? { url: win.url, size: win.size, version: win.version } : null,
    });
  }

  // --- YAML manifest products (Electron apps) ---
  const manifests = MANIFEST_FEEDS[product];
  if (!manifests) {
    return NextResponse.json({ error: "unknown product" }, { status: 400 });
  }

  // Independently, like the appcast branch above: Windows and macOS are
  // separate uploads, and one unreadable feed must not blank out the other.
  const [mac, win] = await Promise.all([
    manifests.mac ? fetchManifest(manifests.mac) : Promise.resolve(null),
    manifests.win ? fetchManifest(manifests.win) : Promise.resolve(null),
  ]);

  if (!mac && !win) {
    return NextResponse.json(
      { error: "release lookup failed", detail: "no readable manifest for " + product },
      { status: 503 }
    );
  }

  // A universal DMG runs natively on both architectures, so it answers for
  // both. Reporting it only as mac_x64 — which is what matching "any .dmg that
  // isn't arm64.dmg" did — told Apple Silicon visitors there was no build for
  // them while the one they wanted sat in the same manifest.
  const dmgs = mac?.files.filter((f) => f.url.endsWith(".dmg")) ?? [];
  const universal = dmgs.find((f) => /universal/i.test(f.url));
  const arm64 = universal ?? dmgs.find((f) => f.url.endsWith("arm64.dmg"));
  const x64 = universal ?? dmgs.find((f) => !f.url.endsWith("arm64.dmg"));
  // The blockmap sits beside the installer; match only the executable.
  const exe = win?.files.find((f) => /\.(exe|msi)$/i.test(f.url));

  const asset = (f: ManifestFile | undefined, m: Manifest | null) =>
    f && m ? { url: m.base + f.url, size: f.size, sha512: f.sha512, version: m.version } : null;

  return NextResponse.json({
    product,
    // macOS is the reference platform; each platform also reports its own
    // version, because Windows can legitimately trail by a release.
    version: mac?.version ?? win?.version ?? null,
    published: mac?.releaseDate ?? win?.releaseDate ?? null,
    mac_arm64: asset(arm64, mac),
    mac_x64: asset(x64, mac),
    win: asset(exe, win),
  });
}
