"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Cookie consent + GA4 analytics, coupled so analytics only loads after the
 * visitor explicitly accepts. GDPR-friendly: nothing tracking-related runs
 * until consent === "accepted".
 *
 * The GA4 measurement id is read from NEXT_PUBLIC_GA_ID at build time. If it's
 * unset the analytics scripts simply never render — so this is safe to ship
 * before the id exists; drop the id into the env and redeploy to switch it on.
 *
 * Colours follow ACE-SUITE-BRAND.md: crimson #C8102E is the suite-wide site
 * anchor (Presenter accent); surfaces/borders/text use the shared neutrals.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_KEY = "ace-cookie-consent";

export default function SiteAnalytics() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    setConsent(stored === "accepted" || stored === "declined" ? stored : null);
    setHydrated(true);
  }, []);

  const decide = (value: "accepted" | "declined") => {
    localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };

  const analyticsEnabled = consent === "accepted" && !!GA_ID;

  return (
    <>
      {analyticsEnabled && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {hydrated && !consent && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          className="fixed bottom-4 inset-x-4 sm:left-auto sm:right-4 sm:max-w-md z-[200] rounded-2xl border border-[#2A2A2A] bg-[#141414] p-5 shadow-2xl"
        >
          <p className="text-sm text-[#C4C4C4] leading-relaxed">
            We use essential cookies to run the site. With your consent we also
            use analytics cookies to understand traffic and improve ACE. See our{" "}
            <Link href="/privacy" className="text-white underline hover:text-[#C8102E] transition">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="px-4 py-2 rounded-lg bg-[#C8102E] hover:bg-[#9B0B22] text-white text-xs font-semibold transition-colors"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={() => decide("declined")}
              className="px-4 py-2 rounded-lg bg-[#1F1F1F] hover:bg-[#222222] text-[#C4C4C4] text-xs font-semibold transition-colors"
            >
              Essential only
            </button>
          </div>
        </div>
      )}
    </>
  );
}
