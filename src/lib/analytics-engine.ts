/**
 * Cloudflare Analytics Engine — read side of the ACE telemetry pipeline.
 *
 * The desktop apps post anonymous diagnostics to the gateway
 * (`ace-gateway/src/telemetry.ts`), which writes one data point per event into
 * the `ace_telemetry` dataset. This module reads it back for /admin/metrics.
 *
 * The blob/double slots are positional and their meaning is fixed by
 * `docs/TELEMETRY_SPEC.md` §5 in the ACE Presenter Mac repo. Read that before
 * changing a column number here — the numbers are the schema.
 *
 * Two deliberate constraints on the SQL below:
 *
 *   1. **Only the plainly-supported subset** — SELECT / WHERE / GROUP BY /
 *      ORDER BY / LIMIT with `sum`, `avg`, `max`, `count`. No `if()`, no
 *      `uniq()`, no `quantileWeighted()`. Anything resembling a pivot or a
 *      distinct-count is done in TypeScript over the grouped rows instead.
 *      Result sets at this scale are tiny, and this way a dashboard tile can
 *      never break because an account lacks a function.
 *   2. **Sampling is honoured.** Analytics Engine samples under load and hands
 *      back `_sample_interval` as the weight of each row, so every count is
 *      `sum(_sample_interval)`, never `count()`.
 */

import "server-only";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID ?? "";
const API_TOKEN = process.env.CLOUDFLARE_ANALYTICS_TOKEN ?? "";
const DATASET = "ace_telemetry";

/** False when the Cloudflare credentials aren't configured — the page says so rather than erroring. */
export function analyticsConfigured(): boolean {
  return Boolean(ACCOUNT_ID && API_TOKEN);
}

interface SqlResponse<T> {
  data?: T[];
  rows?: number;
  error?: string;
}

/** Run one SQL statement. Throws with the API's own message so tiles can report it. */
async function sql<T>(statement: string): Promise<T[]> {
  if (!analyticsConfigured()) throw new Error("Analytics Engine is not configured");

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/analytics_engine/sql`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${API_TOKEN}`, "Content-Type": "text/plain" },
      body: statement,
      cache: "no-store",
    },
  );

  const text = await res.text();
  if (!res.ok) throw new Error(`Analytics Engine ${res.status}: ${text.slice(0, 300)}`);

  let parsed: SqlResponse<T>;
  try {
    parsed = JSON.parse(text) as SqlResponse<T>;
  } catch {
    throw new Error(`Analytics Engine returned non-JSON: ${text.slice(0, 200)}`);
  }
  if (parsed.error) throw new Error(parsed.error);
  return parsed.data ?? [];
}

/** Days is the only interpolated value anywhere in this file — keep it an integer. */
function windowDays(days: number): number {
  return Math.max(1, Math.min(365, Math.floor(days) || 30));
}

function n(v: unknown): number {
  const num = typeof v === "number" ? v : Number(v);
  return Number.isFinite(num) ? num : 0;
}

function s(v: unknown): string {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

// ── Detection quality ─────────────────────────────────────────────────────────

export interface AcceptanceRow {
  engine: string;
  model: string;
  hw: string;
  accepted: number;
  corrected: number;
  /** Undefined when the sample is too small to mean anything. */
  acceptance?: number;
}

/**
 * The headline number: of the cues detection fired, how many survived the
 * operator's correction window untouched.
 *
 * `minVolume` exists because acceptance is a ratio — three matches and one
 * correction is not "75% accurate", it's noise. Rows below the threshold are
 * returned with `acceptance: undefined` so the UI can show the counts without
 * implying a rate.
 */
export async function acceptanceByEngine(days = 30, minVolume = 25): Promise<AcceptanceRow[]> {
  const d = windowDays(days);
  const rows = await sql<Record<string, unknown>>(`
    SELECT blob6 AS engine, blob7 AS model, blob12 AS hw, blob1 AS event,
           sum(_sample_interval) AS n
    FROM ${DATASET}
    WHERE blob1 IN ('detect_accept', 'detect_correct')
      AND timestamp > NOW() - INTERVAL '${d}' DAY
    GROUP BY engine, model, hw, event
    LIMIT 5000
  `);

  // Pivot accept/correct into one row per engine+model+hw. Done here rather
  // than with sum(if(...)) so the query stays inside the guaranteed subset.
  const byKey = new Map<string, AcceptanceRow>();
  for (const r of rows) {
    const key = `${s(r.engine)}|${s(r.model)}|${s(r.hw)}`;
    const row = byKey.get(key) ?? {
      engine: s(r.engine) || "unknown",
      model: s(r.model) || "—",
      hw: s(r.hw) || "—",
      accepted: 0,
      corrected: 0,
    };
    if (s(r.event) === "detect_accept") row.accepted += n(r.n);
    else row.corrected += n(r.n);
    byKey.set(key, row);
  }

  return [...byKey.values()]
    .map((r) => {
      const total = r.accepted + r.corrected;
      return { ...r, acceptance: total >= minVolume ? r.accepted / total : undefined };
    })
    .sort((a, b) => b.accepted + b.corrected - (a.accepted + a.corrected));
}

export interface EngineRow {
  engine: string;
  matches: number;
  avgLatencyMs: number;
  maxLatencyMs: number;
  avgConfidence: number;
}

/**
 * Whisper vs Deepgram, head to head.
 *
 * Averages rather than percentiles: `quantileWeighted` is not in the subset
 * this file restricts itself to, and a p95 is the obvious upgrade once the
 * account's function support is confirmed against real data.
 */
export async function latencyByEngine(days = 30): Promise<EngineRow[]> {
  const d = windowDays(days);
  const rows = await sql<Record<string, unknown>>(`
    SELECT blob6 AS engine,
           sum(_sample_interval) AS matches,
           avg(double2) AS avg_latency,
           max(double2) AS max_latency,
           avg(double1) AS avg_conf
    FROM ${DATASET}
    WHERE blob1 = 'detect_match' AND timestamp > NOW() - INTERVAL '${d}' DAY
    GROUP BY engine
    ORDER BY matches DESC
    LIMIT 50
  `);
  return rows.map((r) => ({
    engine: s(r.engine) || "unknown",
    matches: n(r.matches),
    avgLatencyMs: n(r.avg_latency),
    maxLatencyMs: n(r.max_latency),
    avgConfidence: n(r.avg_conf),
  }));
}

// ── Reach ─────────────────────────────────────────────────────────────────────

export interface CountryRow {
  country: string;
  installs: number;
  licences: number;
  platforms: string[];
}

/**
 * Where ACE is running. Country is derived at the Cloudflare edge, never sent
 * by the client, so this is the only geography we hold.
 *
 * Grouping by (country, install, licence) and counting the groups in TS gives
 * an exact distinct count without needing `uniq()`.
 */
export async function reachByCountry(days = 30): Promise<CountryRow[]> {
  const d = windowDays(days);
  const rows = await sql<Record<string, unknown>>(`
    SELECT blob4 AS country, blob8 AS install, index1 AS licence, blob2 AS platform,
           sum(_sample_interval) AS n
    FROM ${DATASET}
    WHERE timestamp > NOW() - INTERVAL '${d}' DAY AND blob4 != ''
    GROUP BY country, install, licence, platform
    LIMIT 20000
  `);

  const acc = new Map<string, { installs: Set<string>; licences: Set<string>; platforms: Set<string> }>();
  for (const r of rows) {
    const country = s(r.country) || "??";
    const bucket = acc.get(country) ?? { installs: new Set(), licences: new Set(), platforms: new Set() };
    if (s(r.install)) bucket.installs.add(s(r.install));
    // "anon" is every unlicensed install lumped together — never a real licence.
    if (s(r.licence) && s(r.licence) !== "anon") bucket.licences.add(s(r.licence));
    if (s(r.platform)) bucket.platforms.add(s(r.platform));
    acc.set(country, bucket);
  }

  return [...acc.entries()]
    .map(([country, b]) => ({
      country,
      installs: b.installs.size,
      licences: b.licences.size,
      platforms: [...b.platforms].sort(),
    }))
    .sort((a, b) => b.installs - a.installs);
}

export interface VersionRow {
  version: string;
  platform: string;
  installs: number;
}

/** Which builds are actually out there — the "who is stranded on an old release" view. */
export async function versionSpread(days = 14): Promise<VersionRow[]> {
  const d = windowDays(days);
  const rows = await sql<Record<string, unknown>>(`
    SELECT blob3 AS version, blob2 AS platform, blob8 AS install
    FROM ${DATASET}
    WHERE timestamp > NOW() - INTERVAL '${d}' DAY AND blob3 != ''
    GROUP BY version, platform, install
    LIMIT 20000
  `);
  const acc = new Map<string, VersionRow>();
  for (const r of rows) {
    const key = `${s(r.version)}|${s(r.platform)}`;
    const row = acc.get(key) ?? { version: s(r.version), platform: s(r.platform) || "—", installs: 0 };
    row.installs += 1;
    acc.set(key, row);
  }
  return [...acc.values()].sort((a, b) => b.installs - a.installs);
}

// ── Support signal ────────────────────────────────────────────────────────────

export interface DeadAirRow {
  licence: string;
  engine: string;
  listenSeconds: number;
  silentSeconds: number;
  deadRatio: number;
}

/**
 * Churches whose detection is quietly doing nothing — long listening sessions
 * with large gaps and no matches. This is the support list: people paying for
 * auto-follow that isn't following, who mostly never file a ticket about it.
 */
export async function deadAir(days = 30, minListenSeconds = 1800): Promise<DeadAirRow[]> {
  const d = windowDays(days);
  const rows = await sql<Record<string, unknown>>(`
    SELECT index1 AS licence, blob6 AS engine,
           sum(double3) AS listen_s, sum(double5) AS silent_s
    FROM ${DATASET}
    WHERE blob1 = 'detect_stop' AND timestamp > NOW() - INTERVAL '${d}' DAY
    GROUP BY licence, engine
    LIMIT 5000
  `);
  return rows
    .map((r) => {
      const listen = n(r.listen_s);
      const silent = n(r.silent_s);
      return {
        licence: s(r.licence),
        engine: s(r.engine) || "unknown",
        listenSeconds: listen,
        silentSeconds: silent,
        deadRatio: listen > 0 ? silent / listen : 0,
      };
    })
    .filter((r) => r.listenSeconds >= minListenSeconds)
    .sort((a, b) => b.deadRatio - a.deadRatio);
}

export interface ActivityRow {
  licence: string;
  sessions: number;
  listenSeconds: number;
}

/** Per-licence activity, so the dashboard can name the churches behind the numbers. */
export async function activityByLicence(days = 30): Promise<ActivityRow[]> {
  const d = windowDays(days);
  const rows = await sql<Record<string, unknown>>(`
    SELECT index1 AS licence,
           sum(_sample_interval) AS sessions,
           sum(double3) AS listen_s
    FROM ${DATASET}
    WHERE blob1 = 'detect_stop' AND timestamp > NOW() - INTERVAL '${d}' DAY
    GROUP BY licence
    ORDER BY listen_s DESC
    LIMIT 500
  `);
  return rows.map((r) => ({
    licence: s(r.licence),
    sessions: n(r.sessions),
    listenSeconds: n(r.listen_s),
  }));
}

/** Wraps a tile's query so one failure reports itself instead of blanking the page. */
export async function tile<T>(fn: () => Promise<T>): Promise<{ data?: T; error?: string }> {
  try {
    return { data: await fn() };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Query failed" };
  }
}
