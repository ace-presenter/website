# Appendix C — External Dependencies & Troubleshooting

## External dependencies

Most of ACE Presenter works out of the box. A few features rely on software or hardware you provide.

| Feature | You need | Notes |
|---|---|---|
| Import **PowerPoint / Keynote / ODP** decks | **LibreOffice** (`soffice`) installed | Not bundled (~600 MB). **PDF decks need nothing** (built-in). Without LibreOffice, PPTX import yields 0 pages on Windows; macOS falls back to text-only. See [Media](06-media.md). |
| **Stock media** search/download | A **Pixabay API key** | macOS uses the key built into the app. On Windows, enter a free key in *Preferences ▸ Integrations ▸ Pixabay* (get one at pixabay.com/api/docs). |
| **NDI** (screens as NDI sources, NDI cameras in) | The **NDI runtime** installed | Not bundled. The NDI destination appears in Screen Setup once it's installed. macOS has a guided install step; Windows detects it on disk. See [Streaming & Audio](09-streaming-and-audio.md). |
| **SDI output** *(macOS)* / **DeckLink capture** | **Blackmagic Desktop Video** driver | Plus a DeckLink card. SDI appears as a screen destination only when a card is present. |
| **ATEM** switcher control | An **ATEM** on the same LAN | No vendor SDK needed. ACE cuts the program input when a cue goes live; macro triggering isn't offered. |
| **Speech models** | Nothing — **Base — English** and **Base — Multilingual** come with ACE | **Large v3 Turbo** is an optional download from *File ▸ Extras Download…*. See [Detection & Auto-Follow](05-detection-ai.md). |
| **Cloud transcription (Deepgram)** | A **signed-in account**, or a personal Deepgram key | Pooled cloud needs sign-in; a BYO key works without it. On-device Whisper needs neither. See [Detection & Auto-Follow](05-detection-ai.md). |
| **Online Song ID** | A **signed-in account** (Windows: or your own Anthropic key) | Names a song you don't have; lyrics come only from your SongSelect files. |
| **Licensed / online Bibles** (e.g. ESV) | **Pro** tier + internet | Optionally your church's own API.Bible key. Bundled public-domain Bibles are always free. See [Scripture](04-scripture.md). |
| **Multiple outputs, Looks, image/video playback** | **Pro** tier | See [Getting Started ▸ tiers](01-getting-started.md#accounts--tiers). |

---

## Troubleshooting

### Output / displays

- **Nothing shows on the projector.** Open *Output ▸ Screen Setup…* (⇧⌘, / Ctrl+Shift+,) and confirm your display is assigned to the **audience** output (not "Windowed / no display"). Then toggle the audience screen on (⌥⌘A / Ctrl+L). Use **Identify: Screens** in Screen Setup to confirm which physical display is which.
- **A display went black or moved after unplugging/replugging.** ACE recovers automatically; if a "DISPLAY LOST" banner appears, click **Reassign** (or reopen Screen Setup, ⇧⌘, / Ctrl+Shift+,).
- **On Free tier only the main screen works.** That's expected — the stage/second output needs Pro.
- **(Windows) Borderless vs True Fullscreen look the same.** They currently behave identically on Windows — this is a known limitation, not a misconfiguration.
- **(Windows) The stage monitor's screen-color didn't apply.** Screen color currently applies to the audience output only on Windows.

### Detection / auto-follow

- **Songs aren't recognised while Deepgram is on.** Deepgram hears speech; the songs are heard by the on-device engine beside it, which needs a Whisper model to load (and on Windows, a target mode other than *Bible only*).
- **Detection prints nonsense or won't follow.** Confirm the correct **Audio Input** in *Detection Settings* (⌥⌘, / Ctrl+Alt+,), pick the right **Language**, and note that a language-specific model may be required (the dialog warns you). ACE silently filters common mis-hearings; if nothing appears at all, check the microphone permission and input level.
- **Cloud transcription says "sign in".** Deepgram's pooled relay needs a signed-in account, or enter a personal Deepgram key. On-device Whisper works offline with no account.
- **(Windows) Operator voice commands don't do anything.** They're not implemented on Windows yet — use the keyboard, the on-screen controls, or the phone remote.
- **Songs don't auto-advance even while listening.** Lower the **Min match confidence** slider in *Detection Settings ▸ Advanced*, make sure the target mode isn't set to **Bible only**, and remember that the leader must be audible to the selected input device.

### Media

- **A PowerPoint imported with no pages.** Install **LibreOffice** and re-import (PDF decks don't need it). See the dependency table above.
- **A media tile shows "MISSING".** The source file moved or was deleted. **Click the tile** and find the file (*Locate Missing File*) — other missing files from the same folder reconnect with it. Keep "Manage media automatically" on so future imports are copied into the app. On macOS, *Preferences ▸ General ▸ Relink Missing Media* also searches folders you add.
- **A ProPresenter import is missing media.** The files weren't where the library said. On macOS they arrive as MISSING tiles ready to relink; on Windows the Import Wizard's Summary lists them so you can add them by hand.

### Auto-advance

- **(Windows) A cue's countdown runs but the slide never changes.** Per-cue auto-advance isn't wired on Windows yet — advance manually (→) or use auto-follow detection.

### Streaming

- **The stream keeps dropping.** On Windows the stream auto-reconnects with backoff; check your upload bandwidth and lower the bitrate/resolution in the Stream panel. Verify the server URL and stream key.
- **A network camera (NDI) isn't listed.** Install the NDI runtime, ensure the source is on the same network, and open the camera picker (it defers NDI discovery until first opened to avoid a firewall prompt).

### The phone remote

- **The phone can't find the presenter.** On Windows, start the server first: *Workspace ▸ Start/Stop Remote Server* (Ctrl+R). Ensure the phone and computer are on the **same Wi-Fi**. On macOS, allow the **Local Network** permission prompt. If discovery fails, enter the computer's IP manually (default port **7001**).
- **(Windows) The phone's Screens tab or a verse-version list is empty.** Remote screen configuration and Bible-version listing aren't available over the Windows remote yet.

---

## Where things are stored

- **Bundled Bibles / extra translations:** an app support folder (`…/ACE/Bibles`); downloaded/imported translations live alongside the bundled ones.
- **Managed media** (when "manage media automatically" is on): an app media folder; on Windows, rasterized deck pages and video poster frames are cached under the app data folder.
- **Your ACE files:** *Documents ▸ ACE Presenter* — songs, services and themes you export or back up, plus the **Inbox** (see [Media](06-media.md#ace-files-and-the-ace-presenter-folder)). The live show itself stays in the app support folder.
- **Settings:** standard per-platform preferences storage (macOS defaults / Windows registry). On macOS, venue profiles are saved as `venues.json` in the app support folder.

---

See [Appendix A — Platform Differences](appendix-a-platform-differences.md) for the full list of what's available on each edition, and return to the [manual index](README.md).
