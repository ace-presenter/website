/**
 * /admin — internal profiles view (ministry/org tracking).
 *
 * Admin-only (ACE_ADMIN_EMAILS allowlist). Lists every profile with a CSV
 * export. Not indexed; non-admins are bounced to /account.
 */

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAdminUser, fetchAllProfiles } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Admin — Profiles",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function fmtDate(iso: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return "—";
  }
}

export default async function AdminProfilesPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/account");

  const rows = await fetchAllProfiles();
  const orgs = new Set(rows.map((r) => r.organization.trim().toLowerCase()).filter(Boolean)).size;
  const countries = new Set(rows.map((r) => r.country.trim().toLowerCase()).filter(Boolean)).size;

  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />
      <section className="px-6 sm:px-10 pt-14 pb-24">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="h-px w-6 bg-[#C8102E]" aria-hidden />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#888]">Admin</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Profiles</h1>
              <p className="mt-2 text-sm text-[#888]">Everyone who has created an ACE account.</p>
            </div>
            <a
              href="/api/admin/profiles/export"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[#E8E8E8]"
            >
              Download CSV
            </a>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <Stat label="People" value={String(rows.length)} />
            <Stat label="Organizations" value={String(orgs)} />
            <Stat label="Countries" value={String(countries)} />
          </div>

          {/* Table */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#1A1A1A]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#1A1A1A] bg-[#0D0D0D]">
                    {["Name", "Email", "Organization", "City", "Country", "Phone", "Joined"].map((h) => (
                      <th key={h} className="whitespace-nowrap px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[#888]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#161616]">
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-sm text-[#666]">
                        No profiles yet. (If you expected rows, confirm the profiles table is applied.)
                      </td>
                    </tr>
                  ) : (
                    rows.map((r) => (
                      <tr key={r.id} className="hover:bg-white/[0.02]">
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-white">{r.full_name || "—"}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-[#C4C4C4]">{r.email || "—"}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-[#C4C4C4]">{r.organization || "—"}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-[#C4C4C4]">{r.city || "—"}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-[#C4C4C4]">{r.country || "—"}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-[#C4C4C4]">{r.phone || "—"}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-[#888]">{fmtDate(r.created_at)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#888]">{label}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-white">{value}</p>
    </div>
  );
}
