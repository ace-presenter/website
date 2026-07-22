/**
 * POST /api/account/profile
 *
 * Saves the signed-in user's editable profile (full name, organization, city,
 * country, phone) into public.profiles — the queryable store used for
 * ministry/org tracking. Uses the service-role client to upsert so it works
 * even if the auto-create trigger hasn't run for this user yet (no user-level
 * INSERT policy needed). Also mirrors the values into auth user_metadata so
 * the nav avatar / name stay in sync.
 *
 * Requires supabase/profiles-table.sql to have been applied.
 */

import { NextResponse } from "next/server";
import {
  createSupabaseServerClient,
  createSupabaseAdminClient,
} from "@/lib/supabase-server";

export const runtime = "nodejs";

const str = (v: unknown, max: number) =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Authenticate the caller.
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "You're signed out. Please sign in again." }, { status: 401 });
  }

  const row = {
    id: user.id,
    full_name: str(body.fullName, 120),
    organization: str(body.organization, 160),
    city: str(body.city, 120),
    country: str(body.country, 120),
    phone: str(body.phone, 40),
  };

  try {
    // Upsert into the profiles table (service role → bypasses RLS; the id is
    // pinned to the authed user, so there's no escalation).
    const admin = createSupabaseAdminClient();
    const { error } = await admin.from("profiles").upsert(row, { onConflict: "id" });
    if (error) throw error;

    // Best-effort: mirror into auth metadata so the nav avatar/name stay in
    // sync. A failure here must not fail the save (the table is the source of
    // truth).
    try {
      await supabase.auth.updateUser({
        data: {
          full_name: row.full_name ?? undefined,
          organization: row.organization ?? undefined,
          city: row.city ?? undefined,
          country: row.country ?? undefined,
          phone: row.phone ?? undefined,
        },
      });
    } catch {
      /* non-fatal */
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    // Most likely cause in a fresh project: profiles table not created yet
    // (run supabase/profiles-table.sql). Log detail, return a generic message.
    console.error("[account/profile] save failed:", e instanceof Error ? e.message : e);
    return NextResponse.json(
      { error: "Couldn't save right now — please try again in a moment." },
      { status: 500 }
    );
  }
}
