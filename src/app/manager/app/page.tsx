import { redirect } from "next/navigation";
import { cookies } from "next/headers";

/**
 * Phase 4 — /manager/app
 *
 * Suite shell entry point. Checks for an active ACE session cookie.
 * - Authenticated + has manager entitlement → rewrite/proxy to the
 *   ACE Manager Next.js app (HiveSync repo) via internal rewrite.
 * - Not authenticated → redirect to /login with ?next=/manager/app
 *
 * The actual proxying is handled by next.config.ts rewrites:
 *   source: '/manager/app/:path*'
 *   destination: process.env.ACE_MANAGER_APP_URL + '/:path*'
 *
 * This page only handles the cold-start auth gate before the rewrite fires.
 * In production the middleware will catch this first; this is the fallback
 * for static / edge environments.
 */
export default async function ManagerAppGateway() {
  const cookieStore = await cookies();
  const session = cookieStore.get("ace_session");

  if (!session?.value) {
    redirect("/login?next=/manager/app");
  }

  // Session exists — Next.js rewrite in next.config.ts takes over from here.
  // This component should never actually render in production.
  redirect("/manager/app");
}
