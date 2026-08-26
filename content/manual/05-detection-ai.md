# Detection & Auto-Follow (AI)

ACE Presenter can *listen* to your service and follow along automatically — advancing song lyrics as they're sung, jumping to a scripture the moment it's read aloud, and identifying a song by the sound of the band alone. This chapter covers turning detection on, choosing what it listens for, the speech backends and languages behind it, the Song Bank (acoustic fingerprinting of your own recordings), Bible-reference auto-detection, lyric matching, operator voice commands, and the full Detection Settings dialog.

Detection is closely tied to two other workspaces:

- [Scripture](04-scripture.md) — where detected Bible references land and preview.
- [Songs & Arrangements](03-songs-and-arrangements.md) — the lyrics that auto-follow matches against.

> **How honest is "AI" here?** Everything below runs on-device by default and for free. The cloud option (Deepgram) is optional and requires sign-in. Where a capability is far richer on one platform — and song matching is the big one — this chapter says so plainly rather than promising parity.

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
| **WhisperKit (on-device)** | The default. Real microphone transcription via a bundled Whisper model. Works offline out of the box — free and private. | macOS uses Core ML / WhisperKit. **Windows uses whisper.cpp / GGML and is *(build-dependent)*** — on-device Whisper is present only when the app was compiled with `ACE_WITH_WHISPER`. |
| **Deepgram (cloud)** | Cloud streaming through Deepgram's **nova-3** model. Lower latency than on-device; the connection is managed by ACE. | *(both)* — **requires sign-in** (or your own key). See below. |

Changing the backend applies without a full restart; the matchers stay untouched while the transcriber is swapped underneath them.

---

## Language selection

**What it does.** Tells the transcriber which language(s) to expect. Getting this right is the single biggest lever on accuracy.

**How to get there.** **Detection Settings ▸ Language.**

**Options.**

- **Auto (multilingual)** — the transcriber detects the spoken language itself.
- **A specific language** — pick one to lock the transcriber to it.
- **Biased languages (✨)** — a ✨ marks languages that ship with a hand-crafted worship/sermon vocabulary bias (better recognition of hymn and scripture wording). Languages without the sparkle use generic Whisper vocabulary.

macOS offers a broader list (~30 languages, each with bias metadata); **Windows offers a fixed set (~20)**.

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
- **Empty-audio fallback *(macOS only)*.** On macOS, if Deepgram returns empty audio, the app quietly spins up a parallel WhisperKit fallback so you don't lose the transcript. **Windows has no such fallback** — if the cloud stream goes quiet, it stays on Deepgram.

---

## Detection model management (WhisperKit backend)

**What it does.** Manages the on-device Whisper models used by the WhisperKit backend.

**How to get there.** **Detection Settings ▸ Detection model** (visible only while the WhisperKit backend is selected).

**Options.**

- **macOS** downloads a rich catalogue from Hugging Face: `tiny` / `base` / `small` in both `.en` (English) and multilingual variants, plus **large-v3-turbo**.
- **Windows** bundles two base GGML models out of the box, plus a **Download** and **Choose a detection model** (pick a local file) button for larger models:

| Windows bundled model | Best for |
|---|---|
| **Base — English** | Services that are always in English (English-only; sharper on English). |
| **Base — Multilingual** | 99 languages — choose this if any service is not in English. |

Anything larger than base — notably **Large v3 Turbo**, the most accurate multilingual option — is an extra download and needs a fast machine.

---

## Song Bank — Acoustic ID

**What it does.** Recognizes a song **by its sound**, not its lyrics — you fingerprint your *own* recordings, and the app matches the live band's audio against them. Once a song is acoustically identified it can drive slide changes from its learned timing, even without any usable transcription. This is ideal for instrumental passages, non-lyrical intros, and songs the transcriber struggles with.

> **Your audio stays local.** Fingerprinting and matching happen entirely on your machine; recordings never leave it. Available to all tiers.

**How to get there.** **Detection Settings ▸ Song Bank — Acoustic ID.**

**Options.**

- **macOS** uses Apple **ShazamKit** with a `.shazamcatalog`. You build and reveal the catalog from the dialog; the on/off flag lives outside the dialog.
- **Windows** uses ACE's **own fingerprinter**. Everything is in-dialog: an **on/off toggle**, plus **add / remove / list** controls for the recordings in your bank.
- **Song lock.** When the Song Bank identifies a song, it *owns* the song selection (locks it), and the learned timing advances slides without needing a transcript.

If detection reports no Song Bank yet, add a recording in Detection Settings and start again.

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

## Lyric matching & song auto-advance

**What it does.** Matches the live transcript against the lyrics of the current (or a candidate) song and advances the slide when confidence is high enough.

**How to get there.** Automatic while listening in **AUTO** or **SONG** mode. The threshold is **Detection Settings ▸ Advanced (VAD) ▸ Min match confidence**.

**Options.**

- **Min match confidence.** The floor a match must clear before the app jumps slides (Windows default 50%, adjustable 20–90%). Raise it if it jumps too eagerly; lower it if it hesitates.

> **Platform reality — song following differs a lot.**
> - **macOS** is far more sophisticated: semantic **embeddings**, a **vote / challenger state machine** that confirms the song before committing, **silence-hold**, **ACRCloud** acoustic verification, and an **online AI identification fallback** (via Anthropic / Genius) that can even **auto-import** a song it recognizes but you don't have.
> - **Windows** is a **single token-set F1-threshold jump**: it compares word overlap and advances when the score clears *Min match confidence*. There is **no confirmed-song state machine and no online fallback**. It follows well within a song you already have loaded, but won't identify or import an unknown one.

---

## Operator voice commands

**What it does.** A *separate* operator microphone that takes spoken commands from the person running the service — "next", "previous", "blank", "clear", "take", "live", "next verse", "show John 3 16", "start timer five minutes", "go to {cue}", and so on. This is distinct from the detection mic that follows the congregation/worship.

**How to get there.** The **OP MIC** pill (a microphone-circle icon) in the toolbar. Related settings: **Detection Settings ▸ Operator Voice Commands ▸ "Show command toast"** (a confirmation toast when a command is recognized).

**Options / status.**

- **macOS** — fully functional (OperatorMicSession + a VoiceCommandEngine). Toggle the operator mic and speak the commands above.
- **Windows — *(Windows: not yet available)*.** The OP MIC pill is a **placeholder**: it has no handler and there is no voice-command engine behind it. Toggling it does nothing yet. Use the keyboard and the [phone remote](10-remote-control.md) for hands-off control on Windows.

---

## Hallucination filtering

**What it does.** Silently drops the junk that Whisper-class models emit on music, silence, and noise, so it never reaches your matchers or the transcript panel.

**What it removes.** Repetition loops, filler, stock YouTube-style artifacts ("thank you for watching", "please subscribe"), sound tags (`[Música]`, `♪`), and near-duplicate lines. The transcript panel shows the *cleaned* text. This is always on and behaves equivalently on both platforms; its sensitivity is governed by the VAD thresholds below.

---

## The Detection Settings dialog (control inventory)

**How to get there.** *Detection ▸ Detection Settings…* — **macOS ⌥⌘, / Windows Ctrl+Alt+,**.

The dialog gathers everything above in one place. On **Windows** it also hosts the **Song Bank on/off** toggle and the **auto-program spoken-scripture** toggle in-dialog; on **macOS** those two live elsewhere (a Song Bank flag outside the dialog, and the auto-program option in the Settings sheet).

| Control / section | What it sets |
|---|---|
| **Backend** | Sample Phrases · WhisperKit (on-device) · Deepgram (cloud). |
| **Detection model** | (WhisperKit only) pick/download the on-device Whisper model — Windows: Base — English, Base — Multilingual, plus Download / Choose a detection model. |
| **Deepgram Cloud** | Ready state (signed-in relay or BYO key); prompts sign-in when not ready. |
| **Audio Input** | The capture device detection listens on. |
| **Language** | Auto (multilingual) or a specific language; ✨ marks bias-tuned languages; raises `.en`-model and Large-v3-Turbo warnings. |
| **Song Bank — Acoustic ID** | Fingerprint your own recordings; Windows adds an in-dialog on/off toggle and add/remove/list. |
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
