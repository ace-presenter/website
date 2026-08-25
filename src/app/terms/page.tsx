import {
  LegalPage,
  Meta,
  Section,
  SubSection,
  P,
  Bullets,
  Mail,
} from "@/components/legal";

export const metadata = { title: "Terms — ACE" };

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" updated="Last updated: May 4, 2026 · Finalized Enforcement Edition">
      <Meta>
        <p>
          <strong className="text-white">Contracting Entity:</strong> Rainbow
          Kreativ (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;)
        </p>
        <p>
          <strong className="text-white">Contact:</strong> <Mail />
        </p>
      </Meta>

      <P>
        By downloading, installing, or interacting with the ACE (Agentic Cue
        Experience) software suite, website, or backend infrastructure, you enter
        into a legally binding agreement governed by these Terms of Service. If
        you do not accept these terms, you are prohibited from installing or
        utilizing our software assets.
      </P>

      <Section title="1. Software Licensing and Scope of Permitted Use">
        <SubSection title="A. License Grant">
          <P>
            ACE is licensed, not sold. Subject to your compliance with these
            terms, we grant you a non-transferable, revocable, non-sublicensable,
            non-exclusive license to execute the binaries on verified compatible
            devices running macOS 14+ (Apple Silicon optimized) or Windows 10+
            (64-bit) solely for
            professional, educational, personal, or commercial presentation
            purposes.
          </P>
        </SubSection>
        <SubSection title="B. Prohibited Engineering and Misuse">
          <P>
            You explicitly agree that you will not, and will not permit any third
            party to:
          </P>
          <Bullets>
            <li>
              Reverse-engineer, decompile, disassemble, or attempt to derive the
              underlying source code of the local presentation engines.
            </li>
            <li>
              Modify, redistribute, rent, lease, or publicly host the software
              binaries as a standalone white-labeled presentation platform.
            </li>
            <li>
              Bypass, disable, or tamper with any digital rights management (DRM)
              checks, license verification mechanisms, or version controls.
            </li>
          </Bullets>
        </SubSection>
      </Section>

      <Section title="2. Intellectual Property, Outputs, and AI Systems">
        <SubSection title="A. Content Ownership Allocation">
          <P>
            We lay no claim to ownership over the assets, lyric files, scriptures,
            presentation decks, video timecodes, or timelines that you import into
            or generate through our platform. You retain sole copyright, control,
            and intellectual property ownership over all user-supplied content.
          </P>
        </SubSection>
        <SubSection title="B. AI System Inputs & Real-Time Operational Risks">
          <P>
            Our suite utilizes advanced algorithmic agents to drive automation
            (such as voice-triggered cue switching). You understand that AI
            automation is inherently probabilistic. You assume all operational
            responsibility for auditing, validating, and monitoring automated
            changes during live environments.
          </P>
        </SubSection>
      </Section>

      <Section title="3. Acceptable Use and Third-Party Rights Compliance">
        <SubSection title="A. Licensing of Presentation Materials">
          <P>
            You are strictly prohibited from using ACE to transcribe, sync,
            broadcast, or display text, media, audio, or musical compositions
            unless you possess explicit copyright ownership or valid public
            performance, sync, and print reproduction licenses from the
            respective rights holders (e.g., proper CCLI coverage for worship
            assemblies, or relevant ASCAP/BMI/SESAC performance clearings).
          </P>
        </SubSection>
        <SubSection title="B. Environmental Compliance">
          <P>
            When running ACE Presenter in public spaces (theaters, corporate
            lecture halls, or conferences), you warrant that you have obtained all
            necessary stakeholder consents regarding the deployment of automated
            software that analyzes local microphone streams.
          </P>
        </SubSection>
      </Section>

      <Section title="4. Licensing Tiers and Beta Grandfathering">
        <SubSection title="A. The Public Beta Window Has Concluded">
          <P>
            The ACE software suite was offered within a public beta framework, during
            which the suite was free to download, evaluate, and use for live production
            work. That window has now closed and commercial subscription pricing applies.
            A free tier remains available, and is limited as described on our pricing page.
          </P>
        </SubSection>
        <SubSection title="B. Lifetime Standard Tier Safeguard">
          <P>
            This commitment survives the end of the beta window and is not withdrawn by
            it. Users who registered accounts during the public beta window are
            grandfathered into our &ldquo;Standard Tier&rdquo; free of charge for life.
            If you registered during that window and your account does not reflect
            Standard Tier access, contact us and we will correct it.
          </P>
        </SubSection>
        <SubSection title="C. Future Limitations">
          <P>
            This grandfathered benefit applies <strong className="text-white">only</strong>{" "}
            to the core features present within the Standard Tier at launch. It
            does not automatically extend to future premium enterprise add-ons, or
            our upcoming <strong className="text-white">ACE Manager</strong> and{" "}
            <strong className="text-white">ACE World</strong> collaboration
            environments.
          </P>
        </SubSection>
      </Section>

      <Section title="5. Third-Party Integrations and System Fallback Obligations">
        <SubSection title="A. Integration Dependencies">
          <P>
            The ACE ecosystem relies on localized API links and external network
            routes to pass data to third-party tools, including Google Calendar
            sync, DaVinci Resolve marker paths, NDI pipelines, OBS Studio setups,
            and hardware ATEM switchers. We cannot guarantee the persistent uptime
            or compatibility of third-party platforms.
          </P>
        </SubSection>
        <SubSection title="B. Absolute Fallback Mandate">
          <P>
            Because ACE is designed to execute in high-pressure live production
            scenarios, you are required to establish, maintain, and verify an
            independent manual backup presentation track (e.g., keeping physical
            clickers or hardwired presentation switchers ready) to keep your event
            running if a network timeout or system delay occurs.
          </P>
        </SubSection>
      </Section>

      <Section title="6. Complete Disclaimer of Warranties and Limitation of Liability">
        <SubSection title='A. "As-Is" Software Provision'>
          <P>
            THE ACE SOFTWARE SUITE, SITE, AND CORE INFRASTRUCTURE ARE PROVIDED ON
            AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS, WITHOUT
            WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL
            WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
            FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </P>
        </SubSection>
        <SubSection title="B. Structural Limitation of Damages">
          <P>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL RAINBOW
            KREATIV, ITS FOUNDERS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY
            CONSEQUENTIAL, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR EXEMPLARY
            DAMAGES. THIS APPLIES DIRECTLY TO LOSS OF PROFITS, DATA LOSS, BLOCKED
            PUBLIC STREAMING FEEDS, DROPPED LYRIC OR SCRIPTURE CUES, OUT-OF-SYNC
            KANBAN BOARDS, DESYNCHRONIZED TIME-TRACKS IN DAVINCI RESOLVE, OR
            REPUTATIONAL DAMAGES STEMMING FROM A DISRUPTED LIVE STAGE RUN.
          </P>
        </SubSection>
        <SubSection title="C. Financial Caps">
          <P>
            OUR AGGREGATE CUMULATIVE LIABILITY FOR ALL CAUSES OF ACTION ARISING
            OUT OF THIS CONTRACT WILL BE ABSOLUTELY RESTRICTED TO THE EXACT
            AMOUNTS FINANCIALLY PAID BY YOU TO US WITHIN THE THREE (3) MONTHS
            PRECEDING THE CLAIM, OR A PERMANENT LIQUIDATED MAXIMUM CAP OF TEN
            EUROS (€10.00) IF THE DISPUTE EMERGED DURING THE PUBLIC BETA
            FRAMEWORK.
          </P>
        </SubSection>
      </Section>

      <Section title="7. Governing Law and Dispute Resolution">
        <P>
          These Terms of Service shall be governed by, evaluated, and enforced
          under the laws of Germany (or the home jurisdiction of Rainbow Kreativ),
          without regard to conflict of law principles. Any legal suit, claim, or
          action emerging directly out of this software framework shall be filed
          exclusively within the commercial courts located in our principal place
          of business.
        </P>
      </Section>

      <Section title="8. Fees, Subscriptions, and Billing Architecture via Stripe">
        <SubSection title="A. Commercial Tier Pricing & Subscriptions">
          <P>
            Following the conclusion of our 90-day public beta window, specific
            packages across the ACE suite will require financial payment. If you
            opt into a paid tier, you authorize our billing processor,{" "}
            <strong className="text-white">Stripe</strong>, to charge your
            specified payment method for the recurring subscription fees,
            associated taxes, and local usage costs.
          </P>
        </SubSection>
        <SubSection title="B. Automated Recurring Billing & Proration">
          <P>
            All paid subscription structures operate on an automated, recurring
            billing cycle (monthly or annual increments depending on your
            selection). Your account will automatically be billed on the
            corresponding calendar date of your cycle. You may cancel your
            subscription at any time within your account dashboard, which will
            pause future renewals at the conclusion of your active billing period.
          </P>
        </SubSection>
        <SubSection title="C. Chargebacks and Payment Disputes">
          <P>
            You agree to reach out directly to our compliance desk at <Mail /> to
            resolve any billing questions or discrepancies before initiating a
            formal chargeback process with your banking institution. Malicious or
            fraudulent chargeback requests will result in an immediate, permanent
            suspension of your unified ACE account registry, your software
            licenses, and access to upcoming modules like ACE Manager and ACE
            World.
          </P>
        </SubSection>
      </Section>

      <Section title="9. Intellectual Property Rights and Brand Protection">
        <SubSection title="A. Ownership of the ACE Ecosystem">
          <P>
            All rights, titles, and interests in and to the ACE software
            ecosystem — including but not limited to the source code, object
            code, UI/UX interface designs, visual layouts, branding assets,
            custom Whisper execution layers, computer vision pipelines, logos,
            and the trademark &ldquo;ACE — Agentic Cue Experience&rdquo; — are and
            shall remain the exclusive intellectual property of Rainbow Kreativ.
          </P>
        </SubSection>
        <SubSection title="B. Protection of Local Software Logic">
          <P>
            Because ACE operates primarily as a local-first application on your
            macOS device, you are strictly prohibited from parsing, monitoring,
            or reading the software&rsquo;s active memory footprints to extract
            our proprietary cue-matching logic or algorithmic weighting models.
            The installation of this software does not grant you any implied
            intellectual property rights or ownership stakes over our development
            work.
          </P>
        </SubSection>
        <SubSection title="C. Trademarks and Public Presentation">
          <P>
            You may not use the Company&rsquo;s trademarks, commercial logos, or
            product names (such as ACE Presenter, ACE Schedule, or ACE
            Editors&rsquo; Notes) in any promotional marketing materials, public
            press releases, or commercial software projects without our explicit,
            prior written authorization.
          </P>
          <P>
            You are, however, fully encouraged to showcase the software running
            live in video clips or production case studies, provided you do not
            falsely imply that your organization or event is officially sponsored,
            endorsed, or operated directly by Rainbow Kreativ.
          </P>
        </SubSection>
      </Section>
    </LegalPage>
  );
}
