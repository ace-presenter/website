/**
 * Schema.org JSON-LD for a SoftwareApplication.
 *
 * Renders a `<script type="application/ld+json">` block. Used by the home page,
 * the Presenter page, each product page, and (with an `audience` override) each
 * segment landing page, so search engines understand the product and it becomes
 * eligible for Google's software-app rich result.
 *
 * Backward-compatible: called with no props it renders the ACE Presenter schema.
 * Product pages pass name / operatingSystem / url / image / offer overrides.
 */

interface Props {
  /** App name, e.g. "ACE Presenter", "ACE Schedule". */
  name?: string;
  /** Longer alternate name for disambiguation. */
  alternateName?: string;
  /** schema.org applicationCategory. */
  applicationCategory?: string;
  /** OS string, e.g. "macOS 14+, Windows 10+". */
  operatingSystem?: string;
  /** Offer price as a string ("0" for free-to-start). Omit to hide the offer. */
  offerPrice?: string | null;
  /** Human offer description. */
  offerDescription?: string;
  /** Page-specific audience descriptor — empty for the generic schema. */
  audience?: string;
  /** Canonical URL of the page. */
  url?: string;
  /** Description override. */
  description?: string;
  /** Absolute or root-relative image (a real, existing asset). */
  image?: string;
}

const SITE = "https://www.ace-presenter.app";

const DEFAULT_DESCRIPTION =
  "AI-powered live presentation software. Listens to the speaker and advances slides automatically. Built for worship services, conferences, lectures, and live events.";

export default function SchemaJsonLd({
  name = "ACE Presenter",
  alternateName = "ACE",
  applicationCategory = "BusinessApplication",
  operatingSystem = "macOS 14+, Windows 10+",
  offerPrice = "0",
  offerDescription = "Free to start. Presenter Pro $29/mo or $279/yr; the full ACE suite is $49/mo.",
  audience,
  url = SITE,
  description = DEFAULT_DESCRIPTION,
  image = `${SITE}/og/og-presenter.png`,
}: Props = {}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    alternateName,
    applicationCategory,
    operatingSystem,
    description,
    url,
    image: image.startsWith("http") ? image : `${SITE}${image}`,
    publisher: {
      "@type": "Organization",
      name: "ACE",
      url: SITE,
    },
  };
  if (offerPrice != null) {
    data.offers = {
      "@type": "Offer",
      price: offerPrice,
      priceCurrency: "USD",
      description: offerDescription,
    };
  }
  if (audience) {
    data.audience = { "@type": "Audience", audienceType: audience };
  }

  return (
    <script
      type="application/ld+json"
      // Schema.org JSON must be a single inlined string. dangerouslySetInnerHTML
      // is the canonical Next.js pattern; the payload is fully under our control.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
