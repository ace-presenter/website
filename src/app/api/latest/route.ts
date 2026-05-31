import { NextRequest, NextResponse } from "next/server";

/**
 * Multi-product latest-release metadata.
 *
 * Query params:
 *   ?product=presenter | editors-notes | schedule   (default: presenter)
 *
 * Returns version, published date, and direct DMG URLs for each platform.
 * Reads from product-specific YAML manifests on dl.ace-presenter.app —
 * the same files electron-updater / Sparkle use, so the website is always
 * in sync with the auto-updater.
 *
 * Cached 5 min at the edge.
 */

export const revalidate = 300;

const RELEASE_BASE = "https://dl.ace-presenter.app";

const MANIFEST_PATHS: Record<string, string> = {
  presenter: "/latest-mac.yml",
  "editors-notes": "/editors-notes/latest-mac.yml",
  schedule: "/schedule/latest-mac.yml",
};

type ManifestFile = { url: string; sha512: string; size: number };

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

export async function GET(req: NextRequest) {
  const product = req.nextUrl.searchParams.get("product") ?? "presenter";
  const manifestPath = MANIFEST_PATHS[product];

  if (!manifestPath) {
    return NextResponse.json({ error: "unknown product" }, { status: 400 });
  }

  try {
    const r = await fetch(`${RELEASE_BASE}${manifestPath}`, {
      next: { revalidate: 300 },
    });
    if (!r.ok) throw new Error(`Manifest fetch returned ${r.status}`);
    const text = await r.text();
    const m = parseManifest(text);

    const arm64 = m.files.find((f) => f.url.endsWith("arm64.dmg"));
    const x64 = m.files.find((f) => f.url.endsWith(".dmg") && !f.url.endsWith("arm64.dmg"));

    return NextResponse.json({
      product,
      version: m.version,
      published: m.releaseDate || null,
      mac_arm64: arm64
        ? { url: `${RELEASE_BASE}/${arm64.url}`, size: arm64.size, sha512: arm64.sha512 }
        : null,
      mac_x64: x64
        ? { url: `${RELEASE_BASE}/${x64.url}`, size: x64.size, sha512: x64.sha512 }
        : null,
      win: null,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "release lookup failed", detail: String(err) },
      { status: 503 }
    );
  }
}
