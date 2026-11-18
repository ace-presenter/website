import { LegalPage, Section, P, Bullets } from "@/components/legal";

export const metadata = { title: "Data Processing Agreement — ACE" };

export default function DPA() {
  return (
    <LegalPage
      title="Data Processing Agreement (DPA) Reference Hub"
      updated="Last updated: December 1, 2026 · Finalized Enforcement Edition"
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
            <strong className="text-white">Cloudflare, Inc.</strong> (USA/Global):
            The ACE service and website, app downloads and update checks, the
            optional Shared Library, and opt-in diagnostics.
          </li>
          <li>
            <strong className="text-white">Supabase, Inc.</strong> (USA): Account
            sign-in and account records.
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
            <strong className="text-white">Deepgram, Inc.</strong> (USA): Optional
            cloud speech-to-text for live detection and meeting-recording
            transcripts. Deepgram is told not to keep the audio or use it to
            train its models.
          </li>
          <li>
            <strong className="text-white">API.Bible (American Bible Society)
            and Crossway</strong> (USA): Bible text; they receive only the
            passage reference.
          </li>
          <li>
            <strong className="text-white">Pixabay GmbH</strong> (Germany): Free
            background pictures; it receives only the search words.
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
          ACE runs its live presentation audio parsing on the operator&rsquo;s own
          computer (on-device Whisper on Mac and Windows). Raw audio does not
          leave the room unless the operator switches on optional cloud
          detection or records a meeting in the ACE Presenter Remote; both are
          described in the Privacy Policy, Section 2.A.
        </P>
      </Section>
    </LegalPage>
  );
}
