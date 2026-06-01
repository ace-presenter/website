/**
 * Server-side client for the ACE gateway's admin surface.
 *
 * Currently just licence revocation: when a subscription is cancelled, the site
 * tells the gateway to stop honouring that licence. Authed with the shared
 * ACE_GATEWAY_ADMIN_SECRET (matches the gateway's ADMIN_SECRET).
 */

const GATEWAY_URL = () => process.env.ACE_GATEWAY_URL ?? "https://api.ace-presenter.app";

export interface RevokeResult {
  ok: boolean;
  status: number;
  detail?: string;
}

/** Revoke a licence at the gateway (POST /v1/license/revoke). */
export async function revokeLicenseAtGateway(licenseId: string): Promise<RevokeResult> {
  const secret = process.env.ACE_GATEWAY_ADMIN_SECRET;
  if (!secret) return { ok: false, status: 503, detail: "ACE_GATEWAY_ADMIN_SECRET not set" };

  try {
    const res = await fetch(`${GATEWAY_URL()}/v1/license/revoke`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-ace-admin": secret },
      body: JSON.stringify({ license_id: licenseId }),
    });
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { detail?: string; error?: string };
      return { ok: false, status: res.status, detail: body.detail ?? body.error };
    }
    return { ok: true, status: res.status };
  } catch (e) {
    return { ok: false, status: 502, detail: e instanceof Error ? e.message : "gateway_unreachable" };
  }
}
