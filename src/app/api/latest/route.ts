import { NextResponse } from "next/server";

/**
 * Latest-release metadata for the marketing site's download buttons —
 * version label, asset sizes, and direct URLs. Used by the homepage to
 * render "ACE 1.0.0 · 2.5 GB · macOS 12+" beneath the download button
 * without hardcoding the version in JSX.
 *
 * Cached for 5 minutes at the edge so we don't hammer GitHub on every
 * page load. Auto-revalidates on the next request after expiry.
 */

export const revalidate = 300;

type Asset = {
  name: string;
  browser_download_url: string;
  size: number;
};

type ReleaseResponse = {
  tag_name: string;
  name: string;
  published_at: string;
  assets: Asset[];
};

export async function GET() {
  try {
    const r = await fetch(
      "https://api.github.com/repos/ace-presenter/ace-releases/releases/latest",
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 300 },
      }
    );
    if (!r.ok) throw new Error(`GitHub returned ${r.status}`);
    const release: ReleaseResponse = await r.json();

    const findAsset = (suffix: string) =>
      release.assets.find((a) => a.name.endsWith(suffix));

    return NextResponse.json({
      version: release.tag_name.replace(/^v/, ""),
      published: release.published_at,
      mac_arm64: findAsset("arm64.dmg") || null,
      mac_x64: findAsset(".dmg") || null,
      win: findAsset(".exe") || null,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "release lookup failed", detail: String(err) },
      { status: 503 }
    );
  }
}
