import Link from "next/link";
import {
  LegalPage,
  Meta,
  Section,
  SubSection,
  P,
  Bullets,
} from "@/components/legal";

export const metadata = { title: "EULA — ACE" };

export default function Eula() {
  return (
    <LegalPage
      title="End-User License Agreement (EULA)"
      updated="Last updated: August 4, 2026"
    >
      <Meta>
        <p>
          <strong className="text-white">Software Suite:</strong> ACE — Agentic
          Cue Experience (Presenter, Schedule, Editors&rsquo; Notes)
        </p>
        <p>
          <strong className="text-white">Licensor:</strong> Rainbow Kreativ
          (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;)
        </p>
        <p>
          <strong className="text-white">Contact:</strong>{" "}
          <a
            href="mailto:hello@ace-presenter.app"
            className="text-[#E8183A] hover:text-white transition font-semibold"
          >
            hello@ace-presenter.app
          </a>
        </p>
      </Meta>

      <P>
        IMPORTANT: PLEASE READ THIS END-USER LICENSE AGREEMENT CAREFULLY BEFORE
        DOWNLOADING, INSTALLING, OR USING THE ACE SOFTWARE APPLICATION SUITE.
      </P>
      <P>
        BY DOWNLOADING, INSTALLING, OR RUNNING THE SOFTWARE ON YOUR DEVICE, YOU
        ARE AGREEING TO BE BOUND BY THE TERMS OF THIS EULA. IF YOU DO NOT AGREE TO
        THESE TERMS, DO NOT DOWNLOAD, INSTALL, OR EXECUTE THE ACE SOFTWARE.
      </P>

      <Section title="1. License Grant and Permitted Use">
        <SubSection title="A. Limited Scope License">
          <P>
            Subject to your strict compliance with the terms of this Agreement,
            Licensor grants you a limited, non-exclusive, revocable,
            non-transferable, non-sublicensable license to download, install, and
            execute the object code versions of the ACE software applications on
            compatible hardware running Apple macOS (Apple Silicon optimized
            architectures) or Microsoft Windows (64-bit).
          </P>
        </SubSection>
        <SubSection title="B. Device Limitations & Unified Accounts">
          <P>
            This license is bound directly to your unified ACE account registry.
            You are permitted to activate and execute your licensed software
            configuration on a reasonable number of production devices
            concurrently, provided all active endpoints are owned, leased, or
            strictly managed by you or your immediate organizational branch.
          </P>
        </SubSection>
      </Section>

      <Section title="2. Technical and Behavioral Restrictions">
        <P>
          You explicitly covenant and agree that you will not, under any
          circumstances, attempt or permit others to:
        </P>
        <Bullets>
          <li>
            <strong className="text-white">Reverse Engineering:</strong>{" "}
            Decompile, disassemble, reverse-engineer, decrypt, parse, or attempt
            to derive the underlying human-readable source code of the local
            application binaries.
          </li>
          <li>
            <strong className="text-white">Memory Sniffing:</strong> Use active
            debuggers, packet sniffers, or memory hooks to read the app&rsquo;s
            volatile RAM execution blocks to isolate our custom Whisper
            optimization layers or computer vision parameters.
          </li>
          <li>
            <strong className="text-white">Commercial Distribution:</strong>{" "}
            Rent, lease, lend, sell, redistribute, sublicense, or publicly host
            the binaries as a white-labeled, standalone presentation or scheduling
            SaaS platform.
          </li>
          <li>
            <strong className="text-white">DRM Modification:</strong> Tamper with,
            bypass, or disable our automated license authentication keys, public
            beta version check requests, or automated security constraints.
          </li>
        </Bullets>
      </Section>

      <Section title="3. Intellectual Property Rights & Ownership">
        <SubSection title="A. Retained Title">
          <P>
            This Agreement grants you a license to use the software; it does not
            sell the software to you. Licensor retains all right, title, and
            interest in and to the ACE software suite, including all source code,
            graphic UI layouts, local processing pipelines, documentation,
            trademarks, and copyright assets.
          </P>
        </SubSection>
        <SubSection title="B. User-Supplied Content">
          <P>
            Licensor claims no intellectual property ownership over the local text
            assets, song scripts, scriptures, timecode frameworks, or structural
            documents you import or generate via the applications. You maintain
            exclusive responsibility and ownership for all uploaded assets.
          </P>
        </SubSection>
      </Section>

      <Section title="4. Operational Risk & Live Environment Fallbacks">
        <SubSection title="A. Agentic Performance Acknowledgement">
          <P>
            You explicitly acknowledge that the ACE ecosystem relies on
            algorithmic machine learning agents (such as live speech-to-text
            models and acoustic fingerprint hashes) to execute its automated
            cueing behaviors. Due to the probabilistic nature of AI tools, the
            software is inherently subject to execution delays, mismatched text
            strings, or temporary performance anomalies caused by ambient room
            noise or varying acoustics.
          </P>
        </SubSection>
        <SubSection title="B. The Fallback Obligation">
          <P>
            ACE is designed exclusively as an operational aid, not an autonomous
            human operator replacement. When deploying ACE within live,
            high-pressure environments (including religious worship services, live
            theater runs, corporate lectures, and broadcast streaming events),{" "}
            <strong className="text-white">you assume the absolute legal and
            operational duty to establish, verify, and maintain an active, manual
            fallback presentation option</strong> (such as standard hardware slide
            triggers or secondary display switches).
          </P>
        </SubSection>
      </Section>

      <Section title="5. Privacy and Data Minimization Alignment">
        <P>
          The application binaries are designed to prioritize local-first
          computation:
        </P>
        <Bullets>
          <li>
            <strong className="text-white">Local Audio Execution (default):</strong>{" "}
            By default, ACE Presenter processes microphone audio on-device using
            an embedded on-device Whisper model &mdash; the audio is processed in
            volatile device memory (RAM) and no audio logs or speech captures
            leave your Mac.
          </li>
          <li>
            <strong className="text-white">Optional Cloud Transcription:</strong>{" "}
            If you opt into the optional Deepgram cloud detection backend, live
            microphone audio is streamed to our transcription sub-processor
            (Deepgram) for the duration of that session in order to produce the
            transcript. On-device detection remains available and is the default;
            the cloud backend is used only when you explicitly select it.
          </li>
          <li>
            <strong className="text-white">Lookup Architecture:</strong> Cloud
            requests (such as optional Anthropic Claude lookups or ACRCloud
            matches) are strictly restricted to non-identifiable, tokenized text
            or mathematical hashes.
          </li>
          <li>
            <strong className="text-white">Full Integration Framework:</strong>{" "}
            For a comprehensive view of how account registries, beta registration
            metadata, and Stripe billing information are safeguarded, please review
            our complete{" "}
            <Link
              href="/privacy"
              className="text-[#E8183A] hover:text-white transition font-semibold"
            >
              Privacy Policy
            </Link>
            .
          </li>
        </Bullets>
      </Section>

      <Section title="6. Disclaimer of Warranties">
        <P>
          THE ACE SOFTWARE APPLICATIONS AND DOCUMENTATION ARE PROVIDED TO YOU
          &ldquo;AS IS&rdquo; AND WITH ALL FAULTS AND DEFECTS WITHOUT WARRANTY OF
          ANY KIND. TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, LICENSOR
          EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY,
          OR OTHERWISE, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. LICENSOR
          MAKES NO WARRANTY THAT THE SOFTWARE WILL MEET YOUR PRODUCTION
          REQUIREMENTS, RUN WITHOUT SERVICE INTERRUPTION, MEET ANY PERFORMANCE
          STANDARDS, OR BE TOTALLY ERROR-FREE.
        </P>
      </Section>

      <Section title="7. Absolute Limitation of Liability">
        <P>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
          LICENSOR, ITS AFFILIATES, DEVELOPERS, OR INBOUND SUB-PROCESSORS BE HELD
          LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
          EXEMPLARY DAMAGES WHATSOEVER.
        </P>
        <P>
          THIS COMPREHENSIVE LIMITATION DIRECTLY COVERS DAMAGES FOR LOSS OF
          ORGANIZATIONAL PROFITS, DISRUPTED WORSHIP BROADCASTS, DROPPED
          PRESENTATION CUES, STALLED STAGE SCHEDULING BLUEPRINTS, CORRUPTED TIME
          CODE MARKERS, OR REPUTATIONAL HARM STEMMING FROM ANY INSTABILITY,
          RUNTIME ERROR, OR SOFTWARE LATENCY ENCOUNTERED DURING A LIVE EVENT.
        </P>
        <P>
          OUR AGGREGATE CUMULATIVE LIABILITY UNDER ANY PROVISION OF THIS EULA
          SHALL BE STRICTLY LIMITED TO THE EXACT AMOUNT FINANCIALLY PAID BY YOU TO
          US WITHIN THE THREE (3) MONTHS PRECEDING THE CLAIM, OR A PERMANENT
          CAPS-LOCK MAXIMUM OF TEN EUROS (€10.00) IF THE DISPUTE EMERGED DURING
          THE PUBLIC BETA TIMELINE.
        </P>
      </Section>

      <Section title="8. Termination">
        <P>
          This EULA remains effective until terminated by either you or us. Your
          rights under this license will terminate automatically and immediately
          without notice if you fail to comply with any of its restrictive terms.
          Upon termination, you must cease all utilization of the applications and
          permanently delete all copies of the software binaries from your macOS
          hardware.
        </P>
      </Section>

      <Section title="9. Governing Law and Severability">
        <P>
          This Agreement shall be governed, construed, and enforced in accordance
          with the laws of Germany (or the principal jurisdiction of Rainbow
          Kreativ), without regard to its conflicts of laws provisions. If any
          provision of this EULA is held to be unenforceable or invalid, that
          provision will be changed and interpreted to accomplish its objectives
          to the greatest extent possible under applicable law, and the remaining
          provisions will continue in full force and effect.
        </P>
      </Section>
    </LegalPage>
  );
}
