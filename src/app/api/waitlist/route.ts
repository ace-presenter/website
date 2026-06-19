/**
 * POST /api/waitlist — join the ACE launch waitlist.
 *
 * Body: { email, name?, product?, interests?: string[], source? }
 * Writes through the service-role client (RLS-bypassing) into public.waitlist;
 * emails are never exposed to the browser. Re-submitting the same email for the
 * same product updates the interests + timestamp (upsert on the unique key).
 *
 * Requires the table from supabase/waitlist-table.sql.
 */

import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRODUCTS = new Set([
  "presenter",
  "windows",
  "world",
  "schedule",
  "manager",
  "notes",
  "suite",
]);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const name = body.name ? String(body.name).trim().slice(0, 120) : null;
  const product = PRODUCTS.has(String(body.product)) ? String(body.product) : "presenter";
  const interests = Array.isArray(body.interests)
    ? body.interests.filter((x): x is string => typeof x === "string").slice(0, 12)
    : [];
  const source = body.source ? String(body.source).slice(0, 200) : null;

  try {
    const admin = createSupabaseAdminClient();
    const { error } = await admin.from("waitlist").upsert(
      {
        email,
        name,
        product,
        interests,
        source,
        user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
      },
      { onConflict: "email,product" }
    );
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    // Most likely cause in a fresh env: the table hasn't been created yet
    // (run supabase/waitlist-table.sql). Log the detail, return a generic msg.
    console.error("[waitlist] insert failed:", e instanceof Error ? e.message : e);
    return NextResponse.json(
      { error: "Couldn't add you right now — please try again in a moment." },
      { status: 500 }
    );
  }
}
