/**
 * Schema.org JSON-LD for SoftwareApplication.
 *
 * Renders a `<script type="application/ld+json">` block. Used by the
 * home page and (with an `audience` override) by each segment landing
 * page so search engines understand who the product is for. The data
 * here is what unlocks rich-result eligibility on Google's
 * software-app cards.
 *
 * Audience override pattern: `/worship` passes
 * `audience="religious organizations"`; `/conferences` passes
 * `audience="conference organizers"`, etc. Empty/undefined means the
 * generic home-page schema (no audience field at all).
 */

interface Props {
  /** Page-specific audience descriptor — empty for the generic home schema. */
  audience?: string;
  /** Page URL (e.g. https://www.ace-presenter.app/worship). Defaults to root. */
  url?: string;
  /** Override description for segment pages — defaults to the generic copy. */
  description?: string;
}

const DEFAULT_DESCRIPTION =
  "AI-powered live presentation software. Listens to the speaker and advances slides automatically. Built for worship services, conferences, lectures, and live events.";

export default function SchemaJsonLd({
  audience,
  url = "https://www.ace-presenter.app",
  description = DEFAULT_DESCRIPTION,
}: Props) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ACE",
    alternateName: "ACE Presenter",
    applicationCategory: "BusinessApplication",
    operatingSystem: "macOS 12+",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description:
        "Free during public beta. Paid tiers (Standard $19/mo, Pro $39/mo, Church $99/mo) launch with v2.0.",
    },
    description,
    url,
    screenshot: "https://www.ace-presenter.app/screenshots/hero.png",
    publisher: {
      "@type": "Organization",
      name: "ACE",
      url: "https://www.ace-presenter.app",
    },
  };
  if (audience) {
    data.audience = {
      "@type": "Audience",
      audienceType: audience,
    };
  }

  return (
    <script
      type="application/ld+json"
      // Schema.org JSON must be a single inlined string. Using
      // dangerouslySetInnerHTML is the canonical Next.js pattern; the
      // payload is fully under our control so there's no XSS risk.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
