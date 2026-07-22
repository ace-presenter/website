/**
 * GET /api/admin/profiles/export — CSV of all profiles (admin only).
 */

import { NextResponse } from "next/server";
import { getAdminUser, fetchAllProfiles } from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const rows = await fetchAllProfiles();
  const header = ["Email", "Full name", "Organization", "City", "Country", "Phone", "Joined"];
  const esc = (v: string) => `"${(v ?? "").replace(/"/g, '""')}"`;
  const body = rows.map((r) =>
    [r.email, r.full_name, r.organization, r.city, r.country, r.phone, r.created_at]
      .map(esc)
      .join(",")
  );
  const csv = [header.join(","), ...body].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="ace-profiles-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}
