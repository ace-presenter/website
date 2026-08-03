import {
  LegalPage,
  Meta,
  Section,
  SubSection,
  P,
  Bullets,
  Ordered,
  Mail,
} from "@/components/legal";

export const metadata = { title: "Privacy — ACE" };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="Last updated: May 4, 2026 · Finalized Enforcement Edition">
      <Meta>
        <p>
          <strong className="text-white">Data Controller:</strong> Rainbow Kreativ
          (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
        </p>
        <p>
          <strong className="text-white">Contact:</strong> <Mail />
        </p>
      </Meta>

      <P>
        At ACE (Agentic Cue Experience), we design tools built for real-world
        rooms — worship spaces, conferences, lectures, and theaters. Our guiding
        engineering philosophy is &ldquo;native where it counts, on-device by
        default.&rdquo; This Privacy Policy outlines how we collect, process,
        isolate, and safeguard your data across our entire ecosystem, including
        our website (www.ace-presenter.app), applications (Presenter, Schedule,
        Editors&rsquo; Notes), and upcoming platforms (Manager, World).
      </P>

      <Section title="1. Important General Disclosures & Compliance Declarations">
        <SubSection title="A. EU Artificial Intelligence (AI) Act Compliance (Regulation (EU) 2024/1689)">
          <P>
            In compliance with Article 50 transparency obligations under the EU
            AI Act, we explicitly notify users that the ACE ecosystem relies on
            automated algorithmic models and Artificial Intelligence systems to
            perform its core functions.
          </P>
          <Bullets>
            <li>
              <strong className="text-white">ACE Presenter:</strong> Utilizes an
              on-device deployment of the OpenAI Whisper model to execute
              real-time speech-to-text processing for automated lyric and
              scripture matching.
            </li>
            <li>
              <strong className="text-white">ACE Schedule:</strong> Leverages
              machine learning models and computer vision pipelines to analyze
              text structures from uploaded images and parse them into
              interactive project formats.
            </li>
            <li>
              <strong className="text-white">Third-Party Models:</strong> Employs
              external foundational Large Language Models (LLMs), specifically
              via the Anthropic Claude API, to execute contextual lookups and
              song identifications.
            </li>
          </Bullets>
          <P>
            Our AI systems are classified as local automation assistants. We do
            not employ any prohibited AI practices, automated biometric
            categorization, emotional recognition profiling, or behavioral
            manipulation algorithms.
          </P>
        </SubSection>

        <SubSection title="B. GDPR & UK GDPR Compliance Framework">
          <P>
            For individuals located within the European Economic Area (EEA) and
            the United Kingdom, our processing of your personal data strictly
            adheres to the General Data Protection Regulation (GDPR) (Regulation
            (EU) 2016/679). Rainbow Kreativ serves as the Data Controller for
            account data, while acting as a Data Processor for any cloud-hosted
            data managed by organizational accounts.
          </P>
        </SubSection>

        <SubSection title="C. California Consumer Privacy Act (CCPA/CPRA)">
          <P>
            This policy aligns with California privacy frameworks. We explicitly
            state that <strong className="text-white">we do not sell your
            personal information, nor do we share it</strong> with third parties
            for cross-context behavioral advertising. We do not collect or
            process sensitive personal information to profile users.
          </P>
        </SubSection>
      </Section>

      <Section title="2. Information We Collect and How We Process It">
        <P>
          Because our suite is local-first, the data we collect is minimal,
          heavily siloed, and bound by strict processing limitations.
        </P>

        <SubSection title="A. Audio Data (ACE Presenter)">
          <Bullets>
            <li>
              <strong className="text-white">Collection Scope:</strong> When ACE
              Presenter is active, the app accesses your device&rsquo;s physical
              microphone or line-input audio streams.
            </li>
            <li>
              <strong className="text-white">Processing Mechanic:</strong> Audio
              is transcribed <strong className="text-white">entirely
              locally</strong> on your macOS device using an embedded Whisper
              engine. Audio buffers are processed purely in volatile system
              memory (RAM).
            </li>
            <li>
              <strong className="text-white">Retention:</strong> Audio segments
              are automatically overwritten and permanently discarded after each
              sub-second detection cycle. <strong className="text-white">No
              audio data or voice prints leave your room, land on our servers, or
              enter any AI training sets.</strong>
            </li>
          </Bullets>
        </SubSection>

        <SubSection title="B. Document and Image Data (ACE Schedule)">
          <Bullets>
            <li>
              <strong className="text-white">Collection Scope:</strong> When you
              photograph or upload a physical syllabus, agenda, timeline, or
              itinerary.
            </li>
            <li>
              <strong className="text-white">Processing Mechanic:</strong> Text
              fields, event dates, milestones, and task descriptions are parsed
              using a mix of local OCR frameworks and a secure cloud-based AI
              structural parsing engine.
            </li>
            <li>
              <strong className="text-white">Retention:</strong> Once the
              extracted scheduling data is structured and written to your local
              Kanban grid or calendar, the raw source image file is instantly
              deleted from our temporary processing buffer. We do not permanently
              store or host your raw imagery.
            </li>
          </Bullets>
        </SubSection>

        <SubSection title="C. Online Lookups (Optional Cloud Integrations)">
          <P>
            When you actively configure and trigger advanced features, ACE calls
            targeted third-party APIs:
          </P>
          <Ordered>
            <li>
              <strong className="text-white">Anthropic Claude:</strong> For
              semantic song queries and contextual metadata matching.
            </li>
            <li>
              <strong className="text-white">ACRCloud:</strong> For matching
              acoustic audio fingerprints against commercial music registries.
            </li>
            <li>
              <strong className="text-white">Genius:</strong> For retrieving
              matching lyric text strings.
            </li>
          </Ordered>
          <P>
            <strong className="text-white">Privacy Guardrails:</strong> Only
            anonymized metadata strings or mathematical audio hashes are sent to
            these endpoints. <strong className="text-white">No personally
            identifying information (PII) is attached to these queries.</strong>{" "}
            Our contracts ensure these sub-processors are legally restricted from
            using our users&rsquo; query payloads to train their own commercial
            models.
          </P>
        </SubSection>

        <SubSection title="D. Account Registry and Licensing Telemetry">
          <Bullets>
            <li>
              <strong className="text-white">Data Collected:</strong> Email
              address, account login credentials, public beta verification
              statuses, and basic hardware parameters (App version, operating
              system version).
            </li>
            <li>
              <strong className="text-white">Auto-Update Queries:</strong> Every
              six hours, the app queries github.com to check for stable binaries.
              This check transmits only your current app version and OS version
              to ensure software integrity.
            </li>
            <li>
              <strong className="text-white">Crash Reports:</strong> ACE does not
              transmit crash telemetry or usage statistics. Any future
              introduction of debugging tracking will be strictly opt-in.
            </li>
          </Bullets>
        </SubSection>

        <SubSection title="E. Payment Processing & Financial Transaction Data">
          <P>
            When you upgrade from our public beta framework to a paid commercial
            subscription tier, your payment transaction is facilitated directly
            via our billing integration partner,{" "}
            <strong className="text-white">Stripe, Inc.</strong> (and its global
            affiliates).
          </P>
          <Bullets>
            <li>
              <strong className="text-white">Scope of Data Collection:</strong>{" "}
              To complete a purchase, modify a subscription, or process an
              invoice, Stripe collects billing details directly from you. This
              includes your legal name, billing address, email address,
              transaction currency, purchase amount, and payment card parameters
              (credit/debit card numbers, expiration dates, and security codes).
            </li>
            <li>
              <strong className="text-white">The Tokenization Shield (Our
              No-Card Architecture):</strong> To maintain the highest level of
              security, <strong className="text-white">ACE does not store, see,
              or process your raw payment card data on our servers</strong>. All
              financial inputs are typed into secure fields hosted directly by
              Stripe. The raw card metrics are tokenized instantly within your
              browser, ensuring that our team can only access a secure payment
              token and non-sensitive metadata (such as the card&rsquo;s brand,
              country of origin, and expiration year).
            </li>
            <li>
              <strong className="text-white">Regulatory Compliance &
              Security:</strong> Stripe acts as an independent Data Controller
              for the financial execution of transactions. Stripe maintains
              strict compliance with{" "}
              <strong className="text-white">PCI-DSS Service Provider Level
              1</strong> standards — the most rigorous security certification
              available in the global payments sector. To learn more about how
              they manage your financial privacy, you can review the{" "}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8183A] hover:text-white transition font-semibold"
              >
                Stripe Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong className="text-white">Legal Basis for Processing:</strong>{" "}
              We coordinate with Stripe under the legal basis of{" "}
              <strong className="text-white">Performance of a Contract</strong>,
              as this processing is required to deliver your premium
              multi-product software licenses and manage automated subscription
              tiers.
            </li>
          </Bullets>
        </SubSection>
      </Section>

      <Section title="3. Legal Bases for Processing (EEA/UK Users)">
        <P>
          We process your personal information under the following robust legal
          parameters:
        </P>
        <Bullets>
          <li>
            <strong className="text-white">Contractual Necessity:</strong> To
            maintain your single unified account, validate software licensing,
            deliver stable binary updates, and execute requested cloud/calendar
            sync workflows.
          </li>
          <li>
            <strong className="text-white">Legitimate Interests:</strong> To
            deliver technical customer support via <Mail /> and defend our
            application infrastructure against fraud or security breaches.
          </li>
          <li>
            <strong className="text-white">Explicit Consent:</strong> When you
            opt into cloud-lookup services, third-party syncing integrations, or
            sign up for product waitlists.
          </li>
        </Bullets>
      </Section>

      <Section title="4. Web Tracking, Cookies, and LocalStorage">
        <P>
          Our marketing website (www.ace-presenter.app) and web console use
          browser storage mechanisms to maintain session integrity.
        </P>
        <Bullets>
          <li>
            <strong className="text-white">Essential LocalStorage:</strong> We
            store secure, encrypted authentication web tokens locally in your
            browser. This enables our single sign-on (SSO) engine, letting you
            transition between Presenter, Schedule, and Editors&rsquo; Notes
            without logging in repeatedly.
          </li>
          <li>
            <strong className="text-white">Cookie Controls:</strong> We do not
            run third-party marketing, tracking, or retargeting pixels. You can
            sweep your cookies or disable LocalStorage via your browser settings,
            though doing so will break web-console access.
          </li>
        </Bullets>
      </Section>

      <Section title="5. Your Global Privacy Rights">
        <P>
          Regardless of your geographic location, we recognize your right to
          manage your identity. You may exercise these rights at any time by
          emailing <Mail />:
        </P>
        <Bullets>
          <li>
            <strong className="text-white">Right to Access & Portability:</strong>{" "}
            Request a full digital export of all profile data, billing logs, and
            support communications linked to your account.
          </li>
          <li>
            <strong className="text-white">Right to Rectification:</strong>{" "}
            Correct any inaccurate or incomplete database fields under our
            control.
          </li>
          <li>
            <strong className="text-white">Right to Erasure (&ldquo;Right to be
            Forgotten&rdquo;):</strong> Terminate your account and request
            complete erasure of your cloud record. Note: Erasing your cloud
            account does not alter, delete, or affect offline local asset files
            or project timelines saved locally on your physical Mac.
          </li>
          <li>
            <strong className="text-white">Right to Restrict or Object:</strong>{" "}
            Halt any automated notification pipelines or object to processing
            activities driven by legitimate interests.
          </li>
        </Bullets>
      </Section>

      <Section title="6. International Data Transfers">
        <P>
          Our technical infrastructure routes and stores primary account indices
          on secure cloud nodes located globally, including within the United
          States. To bridge cross-border restrictions safely, all non-EEA data
          transfers are protected under the European Commission&rsquo;s approved{" "}
          <strong className="text-white">Standard Contractual Clauses
          (SCCs)</strong>, ensuring that an identical standard of digital rights
          and structural encryption protects your identity everywhere.
        </P>
      </Section>

      <Section title="7. Security Architecture">
        <P>
          We apply comprehensive operational safeguards to protect your
          ecosystem data:
        </P>
        <Bullets>
          <li>
            All web network traffic and endpoint requests utilize Transport Layer
            Security (TLS/SSL) encryption.
          </li>
          <li>
            Our on-device application execution isolates audio and video streams
            within volatile RAM blocks.
          </li>
          <li>
            We adhere to strict data minimization concepts, ensuring data is
            never duplicated onto secondary cloud layers.
          </li>
        </Bullets>
      </Section>
    </LegalPage>
  );
}
