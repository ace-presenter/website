import { NextResponse } from "next/server";

/**
 * Latest-release metadata for the marketing site's download buttons —
 * version label, asset sizes, and direct URLs. Reads the same
 * `latest-mac.yml` manifest that electron-updater uses, so the website
 * always shows whatever version the auto-updater would deliver.
 *
 * Cached for 5 minutes at the edge so the bucket isn't hit on every
 * page load. Auto-revalidates on the next request after expiry.
 */

export const revalidate = 300;

const MANIFEST_URL = "https://dl.ace-presenter.app/latest-mac.yml";
const RELEASE_BASE = "https://dl.ace-presenter.app";

type ManifestFile = {
  url: string;
  sha512: string;
  size: number;
};

/** Tiny bespoke YAML parser — `latest-mac.yml` has a fixed shape so a
 *  full YAML library is overkill. Parses just the fields we need. */
function parseManifest(text: string): {
  version: string;
  releaseDate?: string;
  files: ManifestFile[];
} {
  const lines = text.split(/\r?\n/);
  const result = {
    version: "",
    releaseDate: undefined as string | undefined,
    files: [] as ManifestFile[],
  };
  let cur: Partial<ManifestFile> | null = null;
  for (const line of lines) {
    const m = line.match(/^(\s*)([\w-]+):\s*(.*)$/);
    if (!m) continue;
    const [, indent, key, rawVal] = m;
    const val = rawVal.replace(/^['"]|['"]$/g, "").trim();
    if (indent === "" && key === "version") result.version = val;
    else if (indent === "" && key === "releaseDate") result.releaseDate = val;
    else if (indent === "  -" || (indent === "  " && key === "url")) {
      // ignore — handled below
    }
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

export async function GET() {
  try {
    const r = await fetch(MANIFEST_URL, {
      next: { revalidate: 300 },
    });
    if (!r.ok) throw new Error(`Manifest fetch returned ${r.status}`);
    const text = await r.text();
    const m = parseManifest(text);

    const findFile = (suffix: string) =>
      m.files.find((f) => f.url.endsWith(suffix));

    const arm64 = findFile("arm64.dmg");
    const x64 = m.files.find((f) => f.url.endsWith(".dmg") && !f.url.endsWith("arm64.dmg"));

    return NextResponse.json({
      version: m.version,
      published: m.releaseDate || null,
      mac_arm64: arm64
        ? { url: `${RELEASE_BASE}/${arm64.url}`, size: arm64.size, sha512: arm64.sha512 }
        : null,
      mac_x64: x64
        ? { url: `${RELEASE_BASE}/${x64.url}`, size: x64.size, sha512: x64.sha512 }
        : null,
      // Windows manifest will live at /latest.yml when the Win build ships.
      win: null,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "release lookup failed", detail: String(err) },
      { status: 503 }
    );
  }
}
