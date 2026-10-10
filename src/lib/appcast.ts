/**
 * Latest published ACE Presenter versions, read from the live update feeds.
 *
 * Mac and Windows each have their own Sparkle/WinSparkle appcast. The two
 * apps carry the same features but are not always on the same version — one
 * can lead the other by a few days — so pages show both numbers rather than
 * implying one version covers both.
 *
 * We take the HIGHEST version in a feed, not the first <item>. Feeds are meant
 * to be newest-first, but a publish script once inserted new releases at the
 * end and the site served the previous build. XML comments are stripped first:
 * the Windows feed carries a commented-out example 0.1.0 item, and position
 * inside a hand-edited file is not something to trust.
 */

export const MAC_APPCAST = "https://dl.ace-presenter.app/presenter/appcast.xml";
export const WINDOWS_APPCAST = "https://dl.ace-presenter.app/presenter-win/appcast.xml";

function compareVersions(a: string, b: string): number {
  const x = a.split(".").map((n) => parseInt(n, 10) || 0);
  const y = b.split(".").map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] ?? 0) - (y[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}

/** The highest version in an appcast body, or null when it lists none. */
export function highestAppcastVersion(xml: string): string | null {
  const body = xml.replace(/<!--[\s\S]*?-->/g, "");
  const items = body.match(/<item[\s\S]*?<\/item>/g) ?? [];
  const versions = items
    .map((item) => {
      const m =
        item.match(/<sparkle:shortVersionString>([^<]+)<\/sparkle:shortVersionString>/) ??
        item.match(/<sparkle:version>([^<]+)<\/sparkle:version>/);
      return m ? m[1].trim() : null;
    })
    .filter((v): v is string => !!v);
  if (!versions.length) return null;
  return versions.sort((a, b) => compareVersions(b, a))[0];
}

async function fetchHighest(url: string): Promise<string | null> {
  try {
    const r = await fetch(url, { next: { revalidate: 300 } });
    if (!r.ok) return null;
    return highestAppcastVersion(await r.text());
  } catch {
    return null;
  }
}

export interface PresenterVersions {
  mac: string | null;
  windows: string | null;
}

/** Both feeds, fetched together so one slow feed doesn't wait on the other. */
export async function fetchPresenterVersions(): Promise<PresenterVersions> {
  const [mac, windows] = await Promise.all([
    fetchHighest(MAC_APPCAST),
    fetchHighest(WINDOWS_APPCAST),
  ]);
  return { mac, windows };
}
