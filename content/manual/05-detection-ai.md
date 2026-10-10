# Detection & Auto-Follow (AI)

ACE Presenter can *listen* to your service and follow along automatically — advancing song lyrics as they're sung, jumping to a scripture the moment it's read aloud, and identifying a song by the sound of the band alone. This chapter covers turning detection on, choosing what it listens for, the speech backends and languages behind it, the Song Bank (acoustic fingerprinting of your own recordings), Bible-reference auto-detection, lyric matching, operator voice commands, and the full Detection Settings dialog.

Detection is closely tied to two other workspaces:

- [Scripture](04-scripture.md) — where detected Bible references land and preview.
- [Songs & Arrangements](03-songs-and-arrangements.md) — the lyrics that auto-follow matches against.

> **How honest is "AI" here?** Everything below runs on-device by default and for free, with the speech models ACE ships. The cloud option (Deepgram) is optional and requires sign-in. Song detection works the same way on both editions; where one edition has something the other doesn't (Apple's speech engine on macOS 26, operator voice commands), this chapter says so plainly.

---

## Turning detection on

**What it does.** Starts (or stops) the listening pipeline: the app captures audio from the chosen input, transcribes it, and feeds the transcript to the matchers.

**How to get there.**

- **The LISTENING / IDLE pill** in the top status bar. Click it to toggle. It reads **LISTENING** while active and **IDLE** when off *(both)*.
- **The START / STOP button** beside the pill. It reads **START** when idle and **STOP** while listening *(both)*.
- **Menu:** *Detection ▸ Toggle Listening* — **macOS ⌘⇧L**. On **Windows** this menu item exists but **has no bound keyboard shortcut**; use the pill, the START/STOP button, or the menu.

> **Shortcut collision (be aware).** On Windows, **Ctrl+L** toggles the *audience screen*, not listening. On macOS the same-looking chord **⌘⇧L** toggles *listening*. Don't assume the macOS listening shortcut carries over.

**Options.**

- **Auto-start on launch.** If enabled, detection begins listening a moment after the app opens, so an unattended machine starts following on its own *(both)*.
- **Matcher-confidence pill.** While listening, a small music-note pill (e.g. `♪ 72%`) appears next to LISTENING once the current match confidence rises above a low floor. It reflects how sure the lyric/song matcher currently is *(both)*.
- **No usable transcriber?** If you press START but no backend can actually transcribe (for example, no model installed, or a cloud backend with no sign-in), the app tells you rather than pretending to listen.

---

## Choosing what it listens for: detection target mode

**What it does.** Focuses detection on songs, on scripture, or lets it decide.

**How to get there.** The **AUTO · SONG · BIBLE** segmented pill in the top bar, or the *Detection* menu:

- **AUTO** — **macOS ⌥1 / Windows Ctrl+Alt+1**
- **SONG** — **macOS ⌥2 / Windows Ctrl+Alt+2**
- **BIBLE** — **macOS ⌥3 / Windows Ctrl+Alt+3**

**Options.**

| Mode | Behaviour |
|---|---|
| **AUTO** | Runs both matchers and follows whichever fits what's being heard (the default). |
| **SONG** | Only lyric matching / song recognition — ignores spoken scripture references. |
| **BIBLE** | Only Bible-reference detection — ignores lyric following. |

Pick **SONG** during worship sets and **BIBLE** during the sermon if you want to avoid cross-talk between the two matchers; leave it on **AUTO** for a hands-off service.

---

## Speech backends

**What it does.** Chooses the engine that turns audio into text.

**How to get there.** **Detection Settings ▸ Backend** (radio buttons). Open Detection Settings from *Detection ▸ Detection Settings…* — **macOS ⌥⌘, / Windows Ctrl+Alt+,**.

**Options.**

| Backend | What it is | Platform notes |
|---|---|---|
| **Sample Phrases** | A stub that cycles through fixed example lines — no microphone. Useful for previewing behaviour or when there's no mic. | *(both)* |
| **WhisperKit (on-device)** | The default. Real microphone transcription via the Whisper speech models that come with ACE. Works offline out of the box — free and private. | *(both)* — macOS runs it through Core ML; Windows runs the same models through whisper.cpp (the option keeps the same name). |
| **Apple Speech (on-device)** | Apple's own speech engine — the most accurate we measured for preaching and scripture, free and private. Where this Mac runs Large v3 Turbo, Turbo still listens beside it for the songs; Arabic, Russian and African languages use Whisper instead. | *(macOS only)* — macOS 26 and later, where supported. Older Macs keep Whisper. Apple's framework doesn't exist on Windows. |
| **Deepgram (cloud)** | Cloud streaming through Deepgram's **nova-3** model for preaching and scripture, with the on-device engine listening for the songs beside it (see below). The connection is managed by ACE. | *(both)* — **requires sign-in** (or your own key). See below. |

Changing the backend applies without a full restart; the matchers stay untouched while the transcriber is swapped underneath them.

---

## Language selection

**What it does.** Tells the transcriber which language(s) to expect. Getting this right is the single biggest lever on accuracy.

**How to get there.** **Detection Settings ▸ Language.**

**Options.**

- **Auto (multilingual)** — the transcriber detects the spoken language itself.
- **A specific language** — pick one to lock the transcriber to it.
- **Biased languages (✨)** — a ✨ marks languages that ship with a hand-crafted worship/sermon vocabulary bias (better recognition of hymn and scripture wording). Languages without the sparkle use generic Whisper vocabulary.

macOS offers a broader list (~30 languages, each with bias metadata); **Windows offers English, Auto and 20 further languages**.

**Warnings the dialog raises.**

- **English-only model + a non-English language.** If you've selected an `.en` model but chosen a non-English language, the app warns that the English-only model produces unusable text and suggests switching to **Base — Multilingual** (or a larger multilingual model).
- **Languages that need Large v3 Turbo.** Some languages can't be transcribed usefully by the bundled base models. The dialog flags these and points you to download **Large v3 Turbo** — "slower, but a slow transcript beats a wrong one."

---

## Deepgram cloud transcription

**What it does.** Streams your audio to Deepgram's nova-3 model for low-latency cloud transcription instead of running Whisper on your machine.

**How to get there.** **Detection Settings ▸ Backend ▸ Deepgram (cloud)**, then the **Deepgram Cloud** section shows its ready state.

**Options / requirements.**

- **Managed (pooled) access — requires sign-in.** When you're signed in, ACE authenticates to its relay (`wss://api.ace-presenter.app`) using your licence, and cloud transcription is ready with **no key needed**. If you're *not* signed in, the section tells you to sign in and use WhisperKit (on-device) in the meantime.
- **Bring your own key.** Enter a personal Deepgram token and ACE connects directly to `api.deepgram.com`. A personal key needs **no sign-in**.
- **Deepgram for speech, on-device for songs.** Deepgram hears preaching and scripture well but returns almost nothing on recorded choirs, so with Deepgram on, ACE **also listens on this computer for the songs**: Deepgram keeps the preaching and scripture, and the on-device Whisper engine hears the singing. This needs a Whisper model to load, and on Windows it runs unless the target mode is **Bible only**. *(both)*

---

## Detection model management (WhisperKit backend)

**What it does.** Manages the on-device Whisper models used by the WhisperKit backend.

**How to get there.** **Detection Settings ▸ Detection model** (visible only while the WhisperKit backend is selected).

**The models ACE comes with.** Both editions install two speech models, so detection works the moment ACE opens — no download needed: *(both)*

| Bundled model | Best for |
|---|---|
| **Base — English** | Services that are always in English (English-only; sharper on English). |
| **Base — Multilingual** | Many languages — choose this if any service is not in English. |

**Large v3 Turbo (optional).** The larger, most accurate multilingual model is an optional download: *File ▸ Extras Download…* (the **Extras Download Manager**), or the download control in Detection Settings. It recognised songs far more often on recorded choirs, but it needs a fast computer. When ACE uses it on its own differs by edition:

- **macOS** — once Turbo is downloaded, ACE uses it automatically on a Mac with **Apple silicon and 16 GB of memory**, until you choose a model yourself in Detection Settings.
- **Windows** — ACE uses Turbo automatically only for the languages the base models can't transcribe usefully (**Yoruba, Igbo, Hausa, Swahili, Zulu, Xhosa, Amharic, Tamil, Telugu**). For other languages Detection Settings recommends it for songs, and you can pick the downloaded file with **Choose file…**.

**If Turbo falls behind.** On both editions, if Turbo can't keep up during a service, ACE moves to the faster base model by itself, says so, and remembers for next time (on Windows, except for the languages only Turbo can transcribe). *(both)*

---

## Song Bank — Acoustic ID

**What it does.** Recognizes a song **by its sound**, not its lyrics — you fingerprint your *own* recordings, and the app matches the live band's audio against them. Once a song is acoustically identified it can drive slide changes from its learned timing, even without any usable transcription. This is ideal for instrumental passages, non-lyrical intros, and songs the transcriber struggles with.

> **Your audio stays local.** Fingerprinting and matching happen entirely on your machine; recordings never leave it. Available to all tiers.

**How to get there.** **Detection Settings ▸ Song Bank — Acoustic ID.**

**Options.**

- **macOS** uses Apple **ShazamKit** with a `.shazamcatalog`. You build and reveal the catalog from the dialog (restart detection after building to load it).
- **Windows** uses ACE's **own fingerprinter**, with an **Identify songs by sound** toggle and **Add recordings…**, **Remove** and **Reveal folder** buttons in the dialog.
- **Only with recordings.** Acoustic ID matches the exact recordings in your bank — never a choir singing live — so it runs only when the Song Bank has recordings, and starts the moment you add some. *(both)*
- **Song lock.** When the Song Bank identifies a song, it *owns* the song selection (locks it), and the learned timing advances slides without needing a transcript.

---

## Bible reference auto-detection

**What it does.** Listens for spoken (or typed) scripture references and surfaces them — jumping to a matching cue, previewing in a banner, or (optionally) building and showing the verse on the spot. See [Scripture](04-scripture.md) for how passages are presented.

**How it recognizes references.**

- **Spoken and typed forms** — digit references ("John 3:16"), spoken forms ("John chapter three verse sixteen"), and bare forms are all parsed.
- **Chapter-only → suggestion.** "Let's turn to Romans 8" (no verse) becomes a suggestion rather than an immediate jump.
- **Bare "verse N"** — within a known chapter, "verse nine" is understood in context.
- **Plausibility guards.** The parser checks chapters-per-book and splits run-together numbers so it doesn't invent references.
- **Paraphrase → promotable suggestions.** A loosely quoted verse becomes a suggestion you can promote. macOS resolves these with a semantic embedding model (NLEmbedding); **Windows uses a word-index (VerseSearchIndex)** — lighter, but effective for close wording.

**What happens on a hit.**

- **A reference already in your running order always jumps to that cue** — you put it there, so it's meant to be shown.
- **A reference with no cue** shows in a banner (unless "send to Program" is on — see below). The banner on **macOS shows a confidence % and the translation**; **Windows shows the reference only**.
- **"Mentioned in passing" is vetoed.** A reference dropped casually mid-sentence (rather than announced as the passage) is suppressed so you don't jump on every aside.

**Auto-program spoken scripture (default OFF).**

- **What it does.** Builds a cue and sends a heard verse **straight to Program** even when no cue exists for it.
- **How to get there.** On **Windows** it's **Detection Settings ▸ Spoken Scripture ▸ "Send a heard verse straight to Program"**; on **macOS** it lives in the detection Settings sheet.
- **Why it's off by default.** Most operators want to *see* a verse before the congregation does. A reference already in the order always jumps regardless of this toggle — this setting only governs verses that have no cue.

---

## Lyric matching & song identification

**What it does.** Works out which song is being sung, then matches the live transcript against its lyrics and advances the slide when confidence is high enough.

**How to get there.** Automatic while listening in **AUTO** or **SONG** mode. The threshold is **Detection Settings ▸ Advanced (VAD) ▸ Min match confidence**.

**Options.**

- **Min match confidence.** The floor a match must clear before the app jumps slides (Windows default 50%, adjustable 20–90%). Raise it if it jumps too eagerly; lower it if it hesitates.

- **Songs found by their words.** ACE picks a song by the words that tell it apart — the line only that song has — rather than words every worship song shares, and it keeps listening once a song is found so the slides keep following. Both editions use the same method and were replayed against the same recorded choirs with the same results. *(both)*

**Online Song ID (a song you don't have).** **Detection Settings ▸ Online Song ID ▸ Look up unknown songs online** (needs sign-in, or your own Anthropic key on Windows). When ACE keeps hearing a song that isn't in your plan, it asks an online provider to **name** it from a short transcript — the title and artist only, never the lyrics: *(both)*

- If the song is in your **Library**, ACE adds it to the plan (it doesn't take it live).
- If not, a notice reads *"Sounds like {title}. It isn't in your Library — import it from SongSelect under your CCLI licence."* with a **Find on SongSelect** button.

> **ACE never copies lyrics from the web.** Since 2.3, lyrics enter your Library only from files you import — SongSelect files, ProPresenter, your own typing — never from websites. See [Songs & Arrangements ▸ SongSelect lyrics files](03-songs-and-arrangements.md#songselect-lyrics-files).

---

## Operator voice commands

**What it does.** A *separate* operator microphone that takes spoken commands from the person running the service — "next", "previous", "blank", "clear", "take", "live", "next verse", "show John 3 16", "start timer five minutes", "go to {cue}", and so on. This is distinct from the detection mic that follows the congregation/worship.

**How to get there.** The **OP MIC** pill (a microphone-circle icon) in the toolbar. Related settings: **Detection Settings ▸ Operator Voice Commands ▸ "Show command toast"** (a confirmation toast when a command is recognized).

**Options / status.**

- **macOS** — fully functional (OperatorMicSession + a VoiceCommandEngine). Toggle the operator mic and speak the commands above.
- **Windows — *(Windows: not yet available)*.** The OP MIC pill is shown but has nothing behind it yet — toggling it does nothing. Use the keyboard and the [phone remote](10-remote-control.md) for hands-off control on Windows. (*Spoken Verse Navigation ▸ Let the preacher move the reading*, which lets the preacher's own words step a live reading, works on both.)

---

## Hallucination filtering

**What it does.** Silently drops the junk that Whisper-class models emit on music, silence, and noise, so it never reaches your matchers or the transcript panel.

**What it removes.** Repetition loops, filler, stock YouTube-style artifacts ("thank you for watching", "please subscribe"), sound tags (`[Música]`, `♪`), and near-duplicate lines. The transcript panel shows the *cleaned* text. This is always on and behaves equivalently on both platforms; its sensitivity is governed by the VAD thresholds below.

---

## The Detection Settings dialog (control inventory)

**How to get there.** *Detection ▸ Detection Settings…* — **macOS ⌥⌘, / Windows Ctrl+Alt+,**.

The dialog gathers everything above in one place. On **Windows** it also hosts the **auto-program spoken-scripture** toggle in-dialog; on **macOS** that option lives in the Settings sheet.

| Control / section | What it sets |
|---|---|
| **Backend** | Sample Phrases · WhisperKit (on-device) · Apple Speech (on-device) *(macOS 26+)* · Deepgram (cloud). |
| **Detection model** | (WhisperKit only) Base — English and Base — Multilingual (bundled), Large v3 Turbo (download); Windows also **Choose file…**. |
| **Deepgram Cloud** | Ready state (signed-in relay or BYO key); prompts sign-in when not ready. |
| **Audio Input** | The capture device detection listens on. |
| **Language** | Auto (multilingual) or a specific language; ✨ marks bias-tuned languages; raises `.en`-model and Large-v3-Turbo warnings. |
| **Song Bank — Acoustic ID** | Fingerprint your own recordings; runs only when the bank has recordings. |
| **Online Song ID** | "Look up unknown songs online" — names a song you don't have and offers Find on SongSelect. |
| **Spoken Verse Navigation** | "Let the preacher move the reading" (default off). |
| **Operator Voice Commands** | "Show command toast" *(macOS: functional; Windows: placeholder — not yet available)*. |
| **Spoken Scripture** | "Send a heard verse straight to Program" — auto-program a heard verse with no cue (default **OFF**). |
| **Detection Diagnostics** | Log trace + a reveal button for troubleshooting. |
| **Advanced — VAD thresholds** | A disclosure holding the low-level knobs below. |

**Advanced — VAD thresholds.** Voice-activity detection skips near-silent audio (saving CPU and avoiding hallucinations) and force-transcribes loud chunks. Defaults are tuned; change these only if you see dropouts on quiet voices or hallucinations over instrumentals.

| Knob | Range / default | Effect |
|---|---|---|
| **VAD enabled** | on | Skip chunks of silence to save CPU and avoid hallucinations. |
| **Silence floor** | 0.0–0.05 (0.006) | Below this level, a chunk is treated as silence and skipped. |
| **Bypass ceiling** | 0.0–0.1 (0.04) | Above this level, a chunk is always transcribed regardless of VAD. |
| **Min match confidence** | 20–90% (50%) | The lyric-match score required before song auto-advance jumps a slide. |

---

## Quick reference — detection shortcuts

| Action | macOS | Windows |
|---|---|---|
| Toggle Listening | ⌘⇧L | *(unbound — use pill / START-STOP / menu)* |
| Detection Settings | ⌥⌘, | Ctrl+Alt+, |
| Target mode AUTO | ⌥1 | Ctrl+Alt+1 |
| Target mode SONG | ⌥2 | Ctrl+Alt+2 |
| Target mode BIBLE | ⌥3 | Ctrl+Alt+3 |

See [Preferences, Shortcuts & Menus](11-preferences-shortcuts.md) and [Appendix B — Keyboard Shortcuts](appendix-b-keyboard-shortcuts.md) for the complete map, and [Appendix A — Platform Differences](appendix-a-platform-differences.md) for the authoritative list of what's available on each edition.
