/**
 * /admin/metrics — detection quality and reach.
 *
 * Reads the anonymous diagnostics the desktop apps opt in to sending (see the
 * ACE Presenter Mac repo, `docs/TELEMETRY_SPEC.md`) out of Cloudflare Analytics
 * Engine, and joins them to Supabase profiles for the church names — the licence
 * id in a telemetry row *is* the Supabase user id, so the join is exact.
 *
 * Admin-only, same ACE_ADMIN_EMAILS allowlist as /admin.
 *
 * Every tile fetches independently and renders its own failure. A dashboard
 * that blanks entirely because one query hit an unsupported function is worse
 * than one that says which query broke.
 */

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAdminUser, fetchAllProfiles, type ProfileRow } from "@/lib/admin";
import {
  analyticsConfigured,
  acceptanceByEngine,
  latencyByEngine,
  reachByCountry,
  versionSpread,
  deadAir,
  activityByLicence,
  tile,
} from "@/lib/analytics-engine";

export const metadata: Metadata = {
  title: "Admin — Metrics",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const RANGES = [7, 30, 90] as const;

export default async function AdminMetricsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const admin = await getAdminUser();
  if (!admin) redirect("/account");

  const params = await searchParams;
  const raw = Array.isArray(params.days) ? params.days[0] : params.days;
  const days = RANGES.includes(Number(raw) as (typeof RANGES)[number]) ? Number(raw) : 30;

  if (!analyticsConfigured()) return <NotConfigured />;

  const [acceptance, engines, countries, versions, dead, activity, profiles] = await Promise.all([
    tile(() => acceptanceByEngine(days)),
    tile(() => latencyByEngine(days)),
    tile(() => reachByCountry(days)),
    tile(() => versionSpread(Math.min(days, 30))),
    tile(() => deadAir(days)),
    tile(() => activityByLicence(days)),
    fetchAllProfiles().catch((): ProfileRow[] => []),
  ]);

  const byId = new Map(profiles.map((p) => [p.id, p]));
  const churchOf = (licence: string) => {
    const p = byId.get(licence);
    if (!p) return { name: licence === "anon" ? "Unlicensed installs" : shortId(licence), sub: "" };
    return {
      name: p.organization || p.full_name || p.email || shortId(licence),
      sub: [p.city, p.country].filter(Boolean).join(", "),
    };
  };

  const rows = acceptance.data ?? [];
  const accepted = rows.reduce((a, r) => a + r.accepted, 0);
  const corrected = rows.reduce((a, r) => a + r.corrected, 0);
  const verdicts = accepted + corrected;
  const totalMatches = (engines.data ?? []).reduce((a, r) => a + r.matches, 0);
  const totalInstalls = (countries.data ?? []).reduce((a, r) => a + r.installs, 0);

  const noDataYet = verdicts === 0 && totalMatches === 0 && totalInstalls === 0
    && !acceptance.error && !engines.error && !countries.error;

  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />
      <section className="px-6 sm:px-10 pt-14 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="h-px w-6 bg-[#C8102E]" aria-hidden />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#888]">Admin</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Metrics</h1>
              <p className="mt-2 text-sm text-[#888]">
                Detection quality and reach, from opt-in diagnostics. No audio, transcripts, or service
                content is ever collected.
              </p>
            </div>
            <div className="flex gap-2">
              {RANGES.map((r) => (
                <a
                  key={r}
                  href={`/admin/metrics?days=${r}`}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    r === days ? "bg-white text-black" : "border border-[#2A2A2A] text-[#C4C4C4] hover:border-[#444]"
                  }`}
                >
                  {r}d
                </a>
              ))}
            </div>
          </div>

          {noDataYet ? (
            <NoData />
          ) : (
            <>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Stat
                  label="Auto-advance accepted"
                  value={verdicts >= 25 ? pct(accepted / verdicts) : "—"}
                  hint={verdicts >= 25 ? `${fmt(verdicts)} verdicts` : `${fmt(verdicts)} verdicts — too few to rate`}
                />
                <Stat label="Cues matched" value={fmt(totalMatches)} hint={`last ${days} days`} />
                <Stat label="Installs reporting" value={fmt(totalInstalls)} hint="opt-in only" />
                <Stat label="Countries" value={fmt((countries.data ?? []).length)} hint="edge-derived" />
              </div>

              {/* Detection quality — the reason this page exists. */}
              <Card
                title="Detection quality"
                sub="A match is accepted when the operator doesn't correct it within 8 seconds. Rows under 25 verdicts show counts only — a ratio off four events is noise, not a measurement."
                error={acceptance.error}
              >
                <Table head={["Engine", "Model", "Hardware", "Accepted", "Corrected", "Acceptance"]}>
                  {rows.map((r) => (
                    <tr key={`${r.engine}|${r.model}|${r.hw}`} className="hover:bg-white/[0.02]">
                      <Td strong>{r.engine}</Td>
                      <Td>{r.model}</Td>
                      <Td mono>{r.hw}</Td>
                      <Td>{fmt(r.accepted)}</Td>
                      <Td>{fmt(r.corrected)}</Td>
                      <td className="px-4 py-3">
                        {r.acceptance === undefined ? (
                          <span className="text-[#666]">—</span>
                        ) : (
                          <Bar value={r.acceptance} />
                        )}
                      </td>
                    </tr>
                  ))}
                </Table>
              </Card>

              <Card
                title="Whisper vs Deepgram"
                sub="Averages, not percentiles — see the note in src/lib/analytics-engine.ts. Latency is transcript-settled to cue-live."
                error={engines.error}
              >
                <Table head={["Engine", "Matches", "Avg latency", "Slowest", "Avg confidence"]}>
                  {(engines.data ?? []).map((r) => (
                    <tr key={r.engine} className="hover:bg-white/[0.02]">
                      <Td strong>{r.engine}</Td>
                      <Td>{fmt(r.matches)}</Td>
                      <Td>{r.avgLatencyMs ? `${Math.round(r.avgLatencyMs)} ms` : "—"}</Td>
                      <Td>{r.maxLatencyMs ? `${Math.round(r.maxLatencyMs)} ms` : "—"}</Td>
                      <Td>{r.avgConfidence ? r.avgConfidence.toFixed(2) : "—"}</Td>
                    </tr>
                  ))}
                </Table>
              </Card>

              <Card
                title="Where ACE is running"
                sub="Country comes from the Cloudflare edge, never from the app. Licences counts signed-in installs; unlicensed ones are counted but not attributed."
                error={countries.error}
              >
                <Table head={["Country", "Installs", "Licences", "Platforms"]}>
                  {(countries.data ?? []).map((r) => (
                    <tr key={r.country} className="hover:bg-white/[0.02]">
                      <Td strong>{countryName(r.country)}</Td>
                      <Td>{fmt(r.installs)}</Td>
                      <Td>{fmt(r.licences)}</Td>
                      <Td mono>{r.platforms.join(", ") || "—"}</Td>
                    </tr>
                  ))}
                </Table>
              </Card>

              <Card
                title="Needs attention"
                sub="Churches whose detection listened for a long time and mostly did nothing — dead air over total listening time. These are people paying for auto-follow that isn't following, who usually never file a ticket."
                error={dead.error}
              >
                <Table head={["Church", "Engine", "Listening", "Dead air"]}>
                  {(dead.data ?? []).slice(0, 25).map((r) => {
                    const c = churchOf(r.licence);
                    return (
                      <tr key={`${r.licence}|${r.engine}`} className="hover:bg-white/[0.02]">
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">{c.name}</div>
                          {c.sub ? <div className="text-xs text-[#888]">{c.sub}</div> : null}
                        </td>
                        <Td>{r.engine}</Td>
                        <Td>{hours(r.listenSeconds)}</Td>
                        <td className="px-4 py-3">
                          <Bar value={r.deadRatio} tone="warn" />
                        </td>
                      </tr>
                    );
                  })}
                </Table>
              </Card>

              <Card
                title="Most active"
                sub="Listening time per licence — who is actually leaning on auto-follow."
                error={activity.error}
              >
                <Table head={["Church", "Sessions", "Listening"]}>
                  {(activity.data ?? []).slice(0, 25).map((r) => {
                    const c = churchOf(r.licence);
                    return (
                      <tr key={r.licence} className="hover:bg-white/[0.02]">
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">{c.name}</div>
                          {c.sub ? <div className="text-xs text-[#888]">{c.sub}</div> : null}
                        </td>
                        <Td>{fmt(r.sessions)}</Td>
                        <Td>{hours(r.listenSeconds)}</Td>
                      </tr>
                    );
                  })}
                </Table>
              </Card>

              <Card
                title="Version spread"
                sub="Who is stranded on an old build. Only counts installs that opted into diagnostics, so treat it as a sample, not a census."
                error={versions.error}
              >
                <Table head={["Version", "Platform", "Installs"]}>
                  {(versions.data ?? []).map((r) => (
                    <tr key={`${r.version}|${r.platform}`} className="hover:bg-white/[0.02]">
                      <Td strong mono>{r.version}</Td>
                      <Td>{r.platform}</Td>
                      <Td>{fmt(r.installs)}</Td>
                    </tr>
                  ))}
                </Table>
              </Card>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

// ── Pieces ────────────────────────────────────────────────────────────────────

function NotConfigured() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />
      <section className="px-6 sm:px-10 pt-14 pb-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white">Metrics</h1>
          <div className="glass-card mt-6 rounded-2xl p-6 text-sm leading-relaxed text-[#C4C4C4]">
            <p className="font-medium text-white">Not connected yet.</p>
            <p className="mt-3">
              This page reads the <code className="text-[#C8102E]">ace_telemetry</code> dataset from
              Cloudflare Analytics Engine. Two environment variables are needed:
            </p>
            <ul className="mt-3 space-y-1 font-mono text-xs">
              <li>CLOUDFLARE_ACCOUNT_ID</li>
              <li>CLOUDFLARE_ANALYTICS_TOKEN</li>
            </ul>
            <p className="mt-3">
              The token needs <em>Account Analytics · Read</em>. The dataset itself is created on the
              first write, so the gateway has to be deployed with the{" "}
              <code>ACE_TELEMETRY</code> binding and at least one app must have opted in before there
              is anything to see.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function NoData() {
  return (
    <div className="glass-card mt-8 rounded-2xl p-6 text-sm leading-relaxed text-[#C4C4C4]">
      <p className="font-medium text-white">Connected, but nothing reported yet.</p>
      <p className="mt-3">
        Expected until a build carrying diagnostics is in churches&rsquo; hands and someone has opted
        in. Reporting is off by default and requires an explicit choice, so the first rows arrive
        after a release, not after a deploy — and acceptance rate only means something once a few
        services have run.
      </p>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#888]">{label}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-white">{value}</p>
      {hint ? <p className="mt-1 text-xs text-[#666]">{hint}</p> : null}
    </div>
  );
}

function Card({
  title,
  sub,
  error,
  children,
}: {
  title: string;
  sub: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold tracking-tight text-white">{title}</h2>
      <p className="mt-1 max-w-3xl text-xs leading-relaxed text-[#888]">{sub}</p>
      {error ? (
        <div className="mt-4 rounded-2xl border border-[#3A1F22] bg-[#1A0E10] p-4 text-xs text-[#E5A0A8]">
          <span className="font-mono uppercase tracking-[0.15em]">Query failed</span>
          <p className="mt-1 font-mono text-[11px] leading-relaxed text-[#C48892]">{error}</p>
        </div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-2xl border border-[#1A1A1A]">
          <div className="overflow-x-auto">{children}</div>
        </div>
      )}
    </div>
  );
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  const empty = !children || (Array.isArray(children) && children.length === 0);
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-[#1A1A1A] bg-[#0D0D0D]">
          {head.map((h) => (
            <th
              key={h}
              className="whitespace-nowrap px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[#888]"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-[#161616]">
        {empty ? (
          <tr>
            <td colSpan={head.length} className="px-4 py-10 text-center text-sm text-[#666]">
              Nothing in this window.
            </td>
          </tr>
        ) : (
          children
        )}
      </tbody>
    </table>
  );
}

function Td({
  children,
  strong,
  mono,
}: {
  children: React.ReactNode;
  strong?: boolean;
  mono?: boolean;
}) {
  return (
    <td
      className={`whitespace-nowrap px-4 py-3 ${strong ? "font-medium text-white" : "text-[#C4C4C4]"} ${
        mono ? "font-mono text-xs" : ""
      }`}
    >
      {children}
    </td>
  );
}

function Bar({ value, tone = "good" }: { value: number; tone?: "good" | "warn" }) {
  const p = Math.max(0, Math.min(1, value));
  const colour = tone === "warn" ? "#C8102E" : p >= 0.85 ? "#3FB950" : p >= 0.65 ? "#D29922" : "#C8102E";
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#1A1A1A]">
        <div className="h-full rounded-full" style={{ width: `${p * 100}%`, background: colour }} />
      </div>
      <span className="font-mono text-xs text-[#C4C4C4]">{pct(p)}</span>
    </div>
  );
}

// ── Formatting ────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return Math.round(n).toLocaleString("en-GB");
}

function pct(v: number): string {
  return `${Math.round(v * 100)}%`;
}

function hours(seconds: number): string {
  if (seconds < 3600) return `${Math.round(seconds / 60)} min`;
  return `${(seconds / 3600).toFixed(1)} h`;
}

function shortId(id: string): string {
  return id.length > 12 ? `${id.slice(0, 8)}…` : id || "—";
}

function countryName(code: string): string {
  if (!code || code === "??") return "Unknown";
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}
