/**
 * GET /api/geo/cities?q=<query>
 *
 * City type-ahead for the signup + account profile forms. Proxies Komoot's
 * Photon geocoder (OpenStreetMap-based, no API key) so the browser avoids CORS
 * and we return a clean, de-duplicated list. Fails soft: any error → empty
 * list, so the city field always keeps working as free text.
 */

import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600;

interface City {
  name: string;
  label: string; // "City, Region, Country" for disambiguation
  country: string;
}

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
  if (q.length < 2) return NextResponse.json({ cities: [] as City[] });

  const url =
    `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}` +
    `&limit=8&lang=en&osm_tag=place:city&osm_tag=place:town&osm_tag=place:village`;

  try {
    const r = await fetch(url, {
      headers: { "User-Agent": "ACE-Suite/1.0 (+https://www.ace-presenter.app)" },
      next: { revalidate: 3600 },
    });
    if (!r.ok) return NextResponse.json({ cities: [] as City[] });

    const data = (await r.json()) as {
      features?: { properties?: Record<string, string> }[];
    };

    const seen = new Set<string>();
    const cities: City[] = [];
    for (const f of data.features ?? []) {
      const p = f.properties ?? {};
      const name = p.name;
      if (!name) continue;
      const label = [name, p.state, p.country].filter(Boolean).join(", ");
      const key = label.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      cities.push({ name, label, country: p.country ?? "" });
      if (cities.length >= 8) break;
    }
    return NextResponse.json({ cities });
  } catch {
    return NextResponse.json({ cities: [] as City[] });
  }
}
