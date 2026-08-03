import { LegalPage, Section, P, Bullets } from "@/components/legal";

export const metadata = { title: "Data Processing Agreement — ACE" };

export default function DPA() {
  return (
    <LegalPage
      title="Data Processing Agreement (DPA) Reference Hub"
      updated="Last updated: May 4, 2026 · Finalized Enforcement Edition"
    >
      <P>
        For institutional, corporate, and large-scale church users requiring a
        formal <strong className="text-white">Data Processing Agreement
        (DPA)</strong> under GDPR Article 28, the following architecture lists our
        data sub-processors and security configurations.
      </P>

      <Section title="1. Authorized Sub-Processor Ledger">
        <P>
          To deliver real-time cloud automations and lookup utilities, ACE routes
          encrypted, non-PII metadata through the following corporate endpoints:
        </P>
        <Bullets>
          <li>
            <strong className="text-white">GitHub Inc.</strong> (USA): App
            distribution infrastructure and automated version lookup queries.
          </li>
          <li>
            <strong className="text-white">Anthropic PBC</strong> (USA):
            Contextual analysis, song taxonomy extraction, and semantic lyric
            lookups via API.
          </li>
          <li>
            <strong className="text-white">ACRCloud</strong> (China/Global):
            Mathematical audio fingerprint hashing and identification routines.
          </li>
          <li>
            <strong className="text-white">Google LLC</strong> (USA): OAuth
            processing and two-way data sync paths for ACE Schedule users
            utilizing Google Calendar profiles.
          </li>
          <li>
            <strong className="text-white">Stripe, Inc.</strong> (USA/EU): Cloud
            billing infrastructure, recurring subscription token management, and
            PCI-compliant financial transaction execution.
          </li>
        </Bullets>
      </Section>

      <Section title="2. High-Performance Hardware Isolation Note">
        <P>
          ACE runs its live presentation audio parsing natively via CoreML and
          Apple Silicon frameworks. It does not transfer raw audio over the web.
          This design achieves standard compliance out-of-the-box by avoiding the
          transmission of personal data to external clouds.
        </P>
      </Section>
    </LegalPage>
  );
}
