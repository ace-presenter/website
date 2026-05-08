import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "User Guide",
  description:
    "Set up ACE, run a service, master keyboard shortcuts. The complete operator manual for the AI-powered presenter that listens to the room.",
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "ACE — User Guide",
    description:
      "From install to running your first service. The complete operator manual.",
    url: "https://www.ace-presenter.app/guide",
    type: "article",
  },
};

const TOC = [
  { id: "start", label: "Get started" },
  { id: "dashboard", label: "The dashboard" },
  { id: "audio", label: "Audio setup" },
  { id: "service", label: "Run a service" },
  { id: "bible", label: "Bible mode" },
  { id: "imports", label: "Imports" },
  { id: "looks", label: "Looks & themes" },
  { id: "screens", label: "Multiple screens" },
  { id: "service-plan", label: "Service Plan" },
  { id: "stage", label: "Stage layouts" },
  { id: "shortcuts", label: "Keyboard shortcuts" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "files", label: "Where files live" },
  { id: "updates", label: "Updates" },
];

function K({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center px-1.5 py-0.5 rounded border border-[#2A2A2A] bg-[#0F0F0F] text-[11px] font-mono text-white align-baseline mx-0.5">
      {children}
    </kbd>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <code className="inline-block px-1.5 py-0.5 rounded border border-[#2A2A2A] bg-[#0F0F0F] text-[12px] font-mono text-white align-baseline">
      {children}
    </code>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-12 border-t border-[#1A1A1A] first:border-t-0 first:pt-0">
      <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
        {eyebrow}
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-white">
        {title}
      </h2>
      <div className="text-[#C4C4C4] text-base leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}

/* ───────────── NAV ─────────────
   Mirrors the home page Nav so the /guide page has a way back. Kept
   inline (rather than extracted to a shared component) because Nav on
   the home is also inline; the duplication is intentional until either
   page outgrows it. */
function GuideNav() {
  return (
    <nav className="sticky top-0 z-40 px-6 sm:px-10 py-4 flex items-center justify-between bg-[#0F0F0F]/85 backdrop-blur-xl border-b border-[#1A1A1A]">
      <Link href="/" className="flex items-center gap-3">
        <span aria-hidden className="inline-block w-7 h-7 rounded-md bg-[#C8102E]" />
        <div className="flex flex-col leading-none">
          <span className="font-bold tracking-tight text-base">ACE</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#888] mt-0.5">
            Agentic Cue Experience
          </span>
        </div>
      </Link>
      <div className="hidden sm:flex items-center gap-6 text-sm text-[#C4C4C4]">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <Link href="/guide" className="text-white">Guide</Link>
        <Link href="/manual/ACE_User_Manual.pdf" className="hover:text-white transition" prefetch={false}>
          PDF Manual
        </Link>
        <Link href="/support" className="hover:text-white transition">Support</Link>
      </div>
      <Link
        href="/api/download?platform=mac-arm64"
        className="px-4 sm:px-5 py-2 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-xs uppercase tracking-wider transition"
      >
        Download
      </Link>
    </nav>
  );
}

export default function GuidePage() {
  return (
    <article className="min-h-screen">
      <GuideNav />
      {/* HERO */}
      <header className="px-6 sm:px-10 pt-20 pb-12 border-b border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
            Manual
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-5">
            User Guide
          </h1>
          <p className="text-[#C4C4C4] text-lg sm:text-xl max-w-2xl leading-relaxed">
            Everything you need to install ACE, set up your screens, and run a
            full service. Skim it once before your first Sunday — keep it open
            in a tab during.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/manual/ACE_User_Manual.pdf"
              className="px-5 py-2.5 rounded-full bg-[#C8102E] hover:bg-[#E8183A] text-white font-extrabold text-xs uppercase tracking-wider transition shadow-[0_4px_20px_rgba(200,16,46,0.45)]"
              download
            >
              Download Manual (PDF)
            </a>
            <a
              href="/manual/ACE_User_Manual.html"
              className="px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#222] border border-[#2A2A2A] text-white font-bold text-xs uppercase tracking-wider transition"
            >
              Read Manual (HTML)
            </a>
            <Link
              href="/api/download?platform=mac-arm64"
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-xs uppercase tracking-wider transition"
            >
              Download ACE
            </Link>
            <Link
              href="/support"
              className="px-5 py-2.5 rounded-full border border-[#2A2A2A] hover:border-[#444] text-white font-bold text-xs uppercase tracking-wider transition"
            >
              Need help? Contact support
            </Link>
          </div>
        </div>
      </header>

      {/* BODY: TOC + content */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
        {/* TOC */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 text-sm">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#888] font-bold mb-4">
              On this page
            </div>
            <ul className="space-y-2">
              {TOC.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-[#C4C4C4] hover:text-white transition block"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          <Section id="start" eyebrow="01" title="Get started in 60 seconds">
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Download the <strong className="text-white">.dmg</strong> from the home page.
                Drag <strong className="text-white">ACE.app</strong> into Applications.
              </li>
              <li>
                Launch ACE. macOS will ask for microphone access — grant it.
                Without mic access, detection cannot work.
              </li>
              <li>
                The first-run wizard will offer to import your songs and walk
                you through the dashboard. Skip it if you want to explore — the
                in-app tour is always re-runnable from{" "}
                <strong className="text-white">Settings → Help → Reset tour</strong>.
              </li>
              <li>
                Plug in your audience screen via HDMI or use a wireless display.
                Open <strong className="text-white">Screen Configuration</strong> with{" "}
                <K>⌘</K><K>⇧</K><K>S</K> and assign it.
              </li>
              <li>
                Hit <strong className="text-white">Start</strong>. ACE is now listening.
              </li>
            </ol>
            <div className="mt-6 p-5 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#C8102E] font-bold mb-2">
                System requirements
              </div>
              <ul className="text-[#C4C4C4] text-sm space-y-1">
                <li>macOS 13 (Ventura) or later</li>
                <li>Apple Silicon (M1/M2/M3/M4) — Intel build coming in v2</li>
                <li>4 GB free disk · ~600 MB for the app, the rest for your library</li>
                <li>A USB or built-in microphone with a clean line of sight to the room</li>
              </ul>
            </div>
          </Section>

          <Section id="dashboard" eyebrow="02" title="The dashboard at a glance">
            <p>
              ACE's main window is three columns plus a toolbar. You'll spend
              98% of your time here.
            </p>
            <ul className="space-y-3">
              <li>
                <strong className="text-white">Toolbar (top).</strong> Start/Stop,
                detection mode (Auto/Song/Bible), Live/Hold, confidence nudger,
                workflow tabs (Show / Edit / Bible / Theme / Looks / Stage / Service Plan),
                Import, Settings.
              </li>
              <li>
                <strong className="text-white">Library (left).</strong> Songs,
                Bibles, slides, sermons, media. Click an item to load it; ACE
                matches detection against this list.
              </li>
              <li>
                <strong className="text-white">Detection feed (center).</strong>{" "}
                When ACE recognises a song, its sections appear here. Click to
                preview, double-click to send to program.
              </li>
              <li>
                <strong className="text-white">Outputs (right).</strong> Preview
                is what you see, Program is what's live on the audience screen.
                A small chip per active output (NDI / Audience / Stage) shows
                its status.
              </li>
            </ul>
          </Section>

          <Section id="audio" eyebrow="03" title="Audio setup">
            <p>
              Detection accuracy depends entirely on the audio level. Get this
              right once and forget about it.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Open <strong className="text-white">Settings → Audio</strong>.
                Pick your input device (USB interface, built-in mic, audio loopback).
              </li>
              <li>
                Watch the <strong className="text-white">visualizer</strong> in
                the toolbar while the band plays.
              </li>
              <li>
                <span className="text-[#FFA500]">Amber</span> = too quiet (move
                the mic closer or boost gain).{" "}
                <span className="text-[#22C55E]">Green</span> = good level.{" "}
                <span className="text-[#FF6B6B]">Red</span> = peaking (back off
                or pad the input).
              </li>
            </ol>
            <p className="text-sm text-[#888] mt-4">
              Pro tip: a USB lavalier on the worship leader's stand picks up
              singing and speaking equally well. Avoid mounting on a vocal mic
              that gets capped between songs.
            </p>
          </Section>

          <Section id="service" eyebrow="04" title="Run a service">
            <p>
              The standard flow has two modes — Live and Hold — and you'll
              switch between them naturally during a service.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Live mode</h3>
            <p>
              The default. Tap <strong className="text-white">Start</strong>{" "}
              and ACE listens. When it identifies a song, the lyrics jump to
              the audience screen and follow the band line by line. When the
              preacher quotes a verse, the verse appears.
            </p>
            <p>
              Use Live during songs, scripture readings, and any segment where
              you want zero clicks.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Hold mode</h3>
            <p>
              Tap <strong className="text-white">Live</strong> in the toolbar
              to flip it to <strong className="text-white">Hold</strong>.
              Detection still runs in the background, but nothing displays
              automatically — you tap a slide to push it.
            </p>
            <p>
              Use Hold during prayer, transitions, communion, video segments,
              or any moment where the room should stay on the current slide
              regardless of what's being said.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Detection mode</h3>
            <p>
              Three modes in the toolbar:
            </p>
            <ul className="space-y-2">
              <li>
                <strong className="text-white">Auto</strong> — detect songs and
                Bible references at the same time. Default for most services.
              </li>
              <li>
                <strong className="text-white">Song</strong> — only detect
                music. Use during the worship set if you don't want stray verse
                pop-ups.
              </li>
              <li>
                <strong className="text-white">Bible</strong> — only detect
                scripture. Use during the sermon to silence song matches.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Confidence nudger</h3>
            <p>
              The <K>−</K> / <K>+</K> chip in the toolbar adjusts the match
              threshold. Lower it (e.g. 50%) if ACE is being too cautious;
              raise it (e.g. 75%) if it's matching the wrong song. The default
              60% works for most rooms.
            </p>
          </Section>

          <Section id="bible" eyebrow="05" title="Bible mode">
            <p>
              ACE listens for scripture references during preaching. Say{" "}
              <em>&ldquo;turn with me to John three sixteen&rdquo;</em> and the
              verse appears on screen.
            </p>
            <ul className="space-y-2">
              <li>
                Switch to <strong className="text-white">Bible</strong> tab in
                the toolbar to browse passages manually.
              </li>
              <li>
                Set detection mode to <strong className="text-white">Bible</strong>{" "}
                during the sermon to ignore song lyrics.
              </li>
              <li>
                Multiple translations are supported — pick the default in{" "}
                <strong className="text-white">Settings → Bible</strong>.
              </li>
              <li>
                References embedded in <strong className="text-white">imported slides</strong>{" "}
                (titles + speaker notes) are auto-attached, so they trigger
                live during the service even without you typing them.
              </li>
            </ul>
          </Section>

          <Section id="imports" eyebrow="06" title="Imports">
            <p>
              The Import wizard (<K>⌘</K><K>I</K>) handles every format ACE
              supports. Most operators import once at setup and rarely revisit.
            </p>
            <ul className="space-y-2">
              <li>
                <strong className="text-white">Songs</strong> — paste lyrics,
                CSV bulk-load, Genius URL, ChordPro file, or import an entire
                ProPresenter library.
              </li>
              <li>
                <strong className="text-white">Slides</strong> — drag in PPTX,
                Keynote, or PDF. Backgrounds, titles, and speaker notes are
                preserved.
              </li>
              <li>
                <strong className="text-white">Bibles</strong> — pick a
                translation; the full text is pulled and indexed.
              </li>
              <li>
                <strong className="text-white">Sermons</strong> — drop in
                manuscripts or notes. Scripture references in the text are
                detected and linked.
              </li>
            </ul>
            <p className="text-sm text-[#888] mt-4">
              On first launch, ACE seeds your library with a few sample songs
              and translations so you can verify your setup before importing
              your real catalog.
            </p>
          </Section>

          <Section id="looks" eyebrow="07" title="Looks & themes">
            <p>
              <strong className="text-white">Themes</strong> control colours,
              fonts, and backgrounds for slides. Build them in the Theme tab.
            </p>
            <p>
              <strong className="text-white">Looks</strong> (introduced in v1.4)
              bundle a theme together with which layers are on
              (lyrics / scripture / announcements / messages / props), plus
              optional per-screen overrides. Switch the whole presentation
              style with one click.
            </p>
            <p>
              Example workflow: build a Look called{" "}
              <em>&ldquo;Worship&rdquo;</em> with full-bleed background video
              + large lyrics. Build another called{" "}
              <em>&ldquo;Sermon&rdquo;</em> with a clean background and
              scripture in serif. Switch between them as the service moves.
            </p>
            <ul className="space-y-2">
              <li>
                Open the <strong className="text-white">Looks</strong> tab, hover a
                Look card, click <strong className="text-white">▶</strong> to apply.
              </li>
              <li>
                Per-screen overrides let your audience screen run one theme and
                your stage monitor run another simultaneously.
              </li>
              <li>
                Looks are saved per-library, so different teams can ship
                different visual identities without overwriting each other.
              </li>
            </ul>
          </Section>

          <Section id="screens" eyebrow="08" title="Multiple screens">
            <p>
              ACE supports as many displays as your Mac can drive — one
              audience screen, one stage monitor, one operator preview, NDI
              outputs, and any combination thereof.
            </p>
            <ul className="space-y-2">
              <li>
                <strong className="text-white">Quick Screens</strong> (<K>⌘</K><K>J</K>) — the fast toggle.
                Turn each output on/off without opening Settings.
              </li>
              <li>
                <strong className="text-white">Screen Configuration</strong> (<K>⌘</K><K>⇧</K><K>S</K>) —
                the deep editor. Assign which display is Audience vs Stage,
                pick a Look per screen, set NDI streams, configure resolution.
              </li>
              <li>
                Each output gets its own URL with a <P>screen=&lt;id&gt;</P>{" "}
                parameter, so you can stream individual outputs to remote
                campuses or recording rigs.
              </li>
            </ul>
          </Section>

          <Section id="service-plan" eyebrow="09" title="Service Plan">
            <p>
              The Service Plan tab is the running order. Drag in songs,
              scripture, slides, announcements, and timer blocks. Re-order with
              the mouse. ACE walks the plan top-to-bottom but never blocks
              you — detection still works if the band goes off-script.
            </p>
            <p>
              Each item has a one-click <strong className="text-white">Go</strong>{" "}
              button that pushes it to program. Use it as a manual fallback
              during transitions, or for items you don't want detected
              (announcements, video segments).
            </p>
          </Section>

          <Section id="stage" eyebrow="10" title="Stage layouts">
            <p>
              The stage display is what your worship leader, preacher, or band
              sees. Build layouts in the Stage tab — drag tokens (current
              lyric, next lyric, scripture, time, clock, custom message) onto
              the canvas, style each one in the Inspector.
            </p>
            <p>
              Multiple layouts per service: lead vocalist gets lyrics + next
              line, drummer gets just tempo + section name, preacher gets
              scripture + sermon notes. Switch between them in Quick Screens.
            </p>
          </Section>

          <Section id="shortcuts" eyebrow="11" title="Keyboard shortcuts">
            <p>
              Defaults are tuned for ProPresenter parity where possible.
              Per-shortcut customisation is available through{" "}
              <code className="text-zinc-300">localStorage</code> today and
              gets a proper Settings panel in v1.5.4.
            </p>

            <ShortcutTable
              title="Clear layers"
              rows={[
                ["F1", "Clear all layers"],
                ["F2", "Clear lyrics"],
                ["F3", "Clear scripture"],
                ["F4", "Clear announcements"],
                ["F5", "Clear messages"],
                ["F6", "Clear props"],
                ["Esc", "Clear active selection"],
              ]}
            />

            <ShortcutTable
              title="Slide playback"
              rows={[
                ["Space", "Advance to next slide"],
                ["P", "Pause / resume auto-advance"],
                ["G", "Go (push current to program)"],
                ["←  →", "Previous / next slide"],
                ["Tab", "Jump to next section"],
                ["Page Up / Down", "Previous / next song"],
              ]}
            />

            <ShortcutTable
              title="Screen outputs"
              rows={[
                ["⌘ 1", "Toggle Audience screen"],
                ["⌘ 2", "Toggle Stage screen"],
                ["⌘ ⇧ S", "Open Screen Configuration"],
                ["⌘ J", "Open Quick Screens"],
              ]}
            />

            <ShortcutTable
              title="Navigation"
              rows={[
                ["⌘ K", "Command palette"],
                ["⌘ L", "Spotlight search across library"],
                ["⌃ B", "Toggle library sidebar"],
                ["⌘ ,", "Settings"],
                ["⌘ F", "Find in current view"],
                ["⌘ I", "Import wizard"],
              ]}
            />

            <ShortcutTable
              title="Modes"
              rows={[
                ["⌘ E", "Edit tab"],
                ["⌘ T", "Theme tab"],
                ["⌘ ⇧ M", "Toggle media bin"],
              ]}
            />

            <ShortcutTable
              title="Detection"
              rows={[
                ["⌘ ⇧ D", "Cycle detection mode (Auto / Song / Bible)"],
                ["⌘ ⇧ R", "Reset Detection — clear stuck votes / hallucinations (v1.5.3)"],
                ["Page Down", "Bible — next verse, global from anywhere (v1.5.3)"],
                ["Page Up", "Bible — previous verse, global from anywhere (v1.5.3)"],
              ]}
            />

            <p className="text-sm text-zinc-500 mt-4">
              <strong className="text-zinc-300">Customising shortcuts:</strong>{" "}
              the engine supports per-shortcut overrides via{" "}
              <code className="text-zinc-300">localStorage</code> key{" "}
              <code className="text-zinc-300">ws-shortcuts-v1</code>. The in-app
              rebinding UI lands in v1.5.4. Until then, see the{" "}
              <a
                href="https://github.com/ace-presenter/ace/blob/main/USER_GUIDE.md#11-keyboard-shortcuts-full-reference"
                className="underline hover:text-white"
              >
                User Guide
              </a>{" "}
              for the DevTools-console snippet.
            </p>
          </Section>

          <Section id="troubleshooting" eyebrow="12" title="Troubleshooting">
            <FAQ
              q="Detection isn't picking up the song"
              a={
                <>
                  Check the audio visualizer first — if it's amber or grey, the
                  mic isn't hearing the band. Move the mic closer or raise the
                  gain. If audio is good, lower the confidence threshold by 5–10
                  points using the toolbar <K>−</K> button. If the song still
                  doesn't match, it likely isn't in your library — open the
                  Import wizard and add it.
                </>
              }
            />
            <FAQ
              q="ACE matched the wrong song"
              a={
                <>
                  Raise the confidence threshold by 5–10 points using the
                  toolbar <K>+</K> button. If you have similar songs (e.g. two
                  versions of the same hymn), keep only the version your team
                  actually plays.
                </>
              }
            />
            <FAQ
              q="The audience screen is blank"
              a={
                <>
                  Open Quick Screens (<K>⌘</K><K>J</K>) and verify the audience
                  output is enabled. If it's enabled but still blank, open
                  Screen Configuration (<K>⌘</K><K>⇧</K><K>S</K>) and confirm
                  the right physical display is assigned. The display picker
                  shows a colour swatch on each connected screen so you can
                  visually identify them.
                </>
              }
            />
            <FAQ
              q="Slides imported but show as blank placeholders"
              a={
                <>
                  PPTX rendering needs LibreOffice. ACE prompts to install it
                  on first PPTX import — accept the prompt. The download is
                  about 350 MB and only happens once. If you skipped, re-import
                  any deck and the prompt will reappear.
                </>
              }
            />
            <FAQ
              q="Microphone permission denied"
              a={
                <>
                  Open <strong className="text-white">System Settings → Privacy & Security → Microphone</strong>{" "}
                  and toggle ACE on. Restart ACE. macOS sometimes silently
                  drops the permission after an OS update — re-granting fixes it.
                </>
              }
            />
            <FAQ
              q="ACE crashed mid-service"
              a={
                <>
                  Re-launch — your service plan, library, and detection state
                  are saved every few seconds. You'll resume from roughly where
                  you left off. Send the log file from{" "}
                  <P>~/Library/Logs/ACE/</P> to{" "}
                  <a
                    href="mailto:hello@ace-presenter.app"
                    className="text-[#E8183A] hover:text-white transition"
                  >
                    hello@ace-presenter.app
                  </a>{" "}
                  so we can fix the underlying cause.
                </>
              }
            />
          </Section>

          <Section id="files" eyebrow="13" title="Where files live">
            <ul className="space-y-2">
              <li>
                <strong className="text-white">Library, settings, themes, looks:</strong>{" "}
                <P>~/Library/Application Support/ACE/</P>
              </li>
              <li>
                <strong className="text-white">Logs:</strong>{" "}
                <P>~/Library/Logs/ACE/</P>
              </li>
              <li>
                <strong className="text-white">Imported media (videos, images, audio):</strong>{" "}
                <P>~/Library/Application Support/ACE/media/</P>
              </li>
              <li>
                <strong className="text-white">LibreOffice (deferred install):</strong>{" "}
                <P>~/Library/Application Support/ACE/libreoffice/</P>
              </li>
            </ul>
            <p className="text-sm text-[#888] mt-4">
              To back up your entire ACE setup, copy the{" "}
              <P>~/Library/Application Support/ACE/</P> folder to a USB drive
              or cloud sync. To migrate to a new Mac: install ACE there, then
              drop that folder back in before the first launch.
            </p>
          </Section>

          <Section id="updates" eyebrow="14" title="Updates">
            <p>
              ACE checks for updates automatically on launch. When a new
              version is available, you'll see a banner with the changelog —
              click <strong className="text-white">Update</strong> to download
              and restart, or skip to install later from{" "}
              <strong className="text-white">Settings → Updates</strong>.
            </p>
            <p>
              We ship patch releases (1.4.x) regularly with bug fixes and
              minor improvements. Major releases (1.5, 2.0) bring new features
              and migrate your data automatically — no manual export/import.
            </p>
            <p className="text-sm text-[#888] mt-4">
              Want to follow what's coming?{" "}
              <Link
                href="/"
                className="text-[#E8183A] hover:text-white transition"
              >
                The home page
              </Link>{" "}
              shows the current version and the &ldquo;What&rsquo;s new&rdquo;
              modal lists every shipped change.
            </p>
          </Section>

          {/* Closing CTA */}
          <div className="mt-16 p-8 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
              Still stuck?
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Email us. We reply fast.
            </h3>
            <p className="text-[#C4C4C4] mb-5">
              ACE is built and supported by a small team. During the launch
              window we reply within 24 hours, usually faster.
            </p>
            <a
              href="mailto:hello@ace-presenter.app"
              className="inline-block px-5 py-2.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-xs uppercase tracking-wider transition"
            >
              hello@ace-presenter.app
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function ShortcutTable({
  title,
  rows,
}: {
  title: string;
  rows: [string, string][];
}) {
  return (
    <div className="mt-6">
      <div className="text-[10px] uppercase tracking-[0.2em] text-[#888] font-bold mb-3">
        {title}
      </div>
      <div className="rounded-lg border border-[#2A2A2A] overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {rows.map(([keys, desc], i) => (
              <tr
                key={keys}
                className={i > 0 ? "border-t border-[#2A2A2A]" : ""}
              >
                <td className="px-4 py-2.5 align-top w-[40%] sm:w-[30%]">
                  <span className="font-mono text-white text-[12px]">{keys}</span>
                </td>
                <td className="px-4 py-2.5 text-[#C4C4C4]">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <details className="group rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] overflow-hidden mb-3">
      <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between hover:bg-[#1F1F1F] transition">
        <span className="font-semibold text-white">{q}</span>
        <span className="text-[#888] text-xl leading-none transition group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="px-5 pb-5 text-[#C4C4C4] leading-relaxed">{a}</div>
    </details>
  );
}
