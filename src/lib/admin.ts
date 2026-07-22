/**
 * Admin gating + profile data access for the internal /admin view.
 *
 * Access is limited to the emails in ACE_ADMIN_EMAILS (comma-separated). If the
 * env var is unset, nobody is an admin (safe default). Data is read with the
 * service-role client so it can see every profile row (RLS is per-user).
 */

import "server-only";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase-server";

export function adminEmails(): string[] {
  return (process.env.ACE_ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/** Returns the signed-in user iff they're on the admin allowlist, else null. */
export async function getAdminUser(): Promise<{ id: string; email: string } | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const email = user?.email?.toLowerCase();
    if (!email) return null;
    const allow = adminEmails();
    if (allow.length === 0 || !allow.includes(email)) return null;
    return { id: user!.id, email };
  } catch {
    return null;
  }
}

export interface ProfileRow {
  id: string;
  email: string;
  full_name: string;
  organization: string;
  city: string;
  country: string;
  phone: string;
  created_at: string;
}

/** All profiles, newest first, joined to their auth email. Service-role only. */
export async function fetchAllProfiles(): Promise<ProfileRow[]> {
  const admin = createSupabaseAdminClient();

  const { data: profiles } = await admin
    .from("profiles")
    .select("id, full_name, organization, city, country, phone, created_at")
    .order("created_at", { ascending: false });

  // Map auth emails onto the rows (auth.users isn't exposed to PostgREST).
  const emailById = new Map<string, string>();
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error || !data?.users?.length) break;
    for (const u of data.users) emailById.set(u.id, u.email ?? "");
    if (data.users.length < 1000) break;
  }

  return (profiles ?? []).map((p) => ({
    id: p.id as string,
    email: emailById.get(p.id as string) ?? "",
    full_name: (p.full_name as string) ?? "",
    organization: (p.organization as string) ?? "",
    city: (p.city as string) ?? "",
    country: (p.country as string) ?? "",
    phone: (p.phone as string) ?? "",
    created_at: (p.created_at as string) ?? "",
  }));
}
