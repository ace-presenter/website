/**
 * Site-wide Schema.org JSON-LD: Organization + WebSite.
 *
 * Rendered once in the root layout so every page carries the brand entity.
 * Organization ties the name, logo, and contact to a single knowledge-graph
 * node; WebSite names the site. No `sameAs` — we have no public social profiles
 * to point at yet, and inventing them would be wrong. No SearchAction — there is
 * no on-site search endpoint to declare.
 */

const SITE = "https://www.ace-presenter.app";

export default function SiteJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "ACE",
        alternateName: "Agentic Cue Experience",
        url: SITE,
        logo: {
          "@type": "ImageObject",
          url: `${SITE}/logo-large.png`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: "hello@ace-presenter.app",
          contactType: "customer support",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        name: "ACE",
        url: SITE,
        publisher: { "@id": `${SITE}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
