/**
 * /account — ACE Suite account suite.
 *
 * Server Component: resolves the session, profile metadata, and entitlements
 * at request time (no "free-tier flash"), then hands off to the client
 * AccountDashboard (sidebar + section panels + editable profile). All billing
 * and entitlement logic stays server-side / on the existing API routes.
 */

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HorizonGlow from "@/components/hero/HorizonGlow";
import AccountDashboard, { type Profile } from "@/components/account/AccountDashboard";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { resolveEntitlements } from "@/lib/entitlements";
import { adminEmails } from "@/lib/admin";
import type { Product } from "@/lib/license";

export const metadata: Metadata = {
  title: "Account — ACE Suite",
  description: "Manage your ACE Suite license, download apps, and manage billing.",
  alternates: { canonical: "/account" },
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  // Resolve session. If the Supabase client can't be constructed (e.g. a
  // misconfigured deploy) or auth errors, treat the visitor as logged out.
  let user: { id: string; email?: string; user_metadata?: Record<string, unknown> } | null = null;
  let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>> | null = null;
  try {
    supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    user = null;
  }
  if (!user) redirect("/login");

  // Entitlements
  const claim = await resolveEntitlements(new Request("http://localhost/account"));
  const tier: string = claim?.tier ?? "free";
  const products: Product[] = claim?.products ?? [];

  // Profile — prefer the queryable profiles table; fall back to auth metadata
  // (e.g. before the table is applied, or for users without a row yet).
  const md = user.user_metadata ?? {};
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const profile: Profile = {
    fullName: str(md.full_name) || str(md.name),
    organization: str(md.organization),
    city: str(md.city),
    country: str(md.country),
    phone: str(md.phone),
  };
  try {
    const { data: row } = await supabase!
      .from("profiles")
      .select("full_name, organization, city, country, phone")
      .eq("id", user.id)
      .maybeSingle();
    if (row) {
      profile.fullName = str(row.full_name) || profile.fullName;
      profile.organization = str(row.organization) || profile.organization;
      profile.city = str(row.city) || profile.city;
      profile.country = str(row.country) || profile.country;
      profile.phone = str(row.phone) || profile.phone;
    }
  } catch {
    /* table not applied yet — metadata fallback already set */
  }

  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />
      <div className="relative">
        <HorizonGlow strength={0.4} stars={false} />
        <div className="relative z-10">
          <AccountDashboard
            email={user.email ?? ""}
            tier={tier}
            products={products}
            profile={profile}
            isAdmin={!!user.email && adminEmails().includes(user.email.toLowerCase())}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
