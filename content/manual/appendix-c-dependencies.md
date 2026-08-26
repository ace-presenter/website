# Appendix C — External Dependencies & Troubleshooting

## External dependencies

Most of ACE Presenter works out of the box. A few features rely on software or hardware you provide.

| Feature | You need | Notes |
|---|---|---|
| Import **PowerPoint / Keynote / ODP** decks | **LibreOffice** (`soffice`) installed | Not bundled (~600 MB). **PDF decks need nothing** (built-in). Without LibreOffice, PPTX import yields 0 pages on Windows; macOS falls back to text-only. See [Media](06-media.md). |
| **Stock media** search/download | A free **Pixabay API key** | Enter it in Preferences (macOS: Integrations; Windows: the stock dialog / `stock/pixabayKey`). Get one at pixabay.com/api/docs. |
| **NDI** send/receive | The **NDI runtime** installed | Not bundled. macOS has a guided install step; Windows detects it on disk. See [Streaming & Audio](09-streaming-and-audio.md). |
| **DeckLink / SDI** capture | **Blackmagic Desktop Video** driver | Plus a DeckLink card. On Windows the SDK must also be present at build time. |
| **ATEM** switcher control | An **ATEM** on the same LAN | No vendor SDK needed. macOS can also trigger macros (in progress); Windows cuts program input only. |
| **Cloud transcription (Deepgram)** | A **signed-in account**, or a personal Deepgram key | Pooled cloud needs sign-in; a BYO key works without it. On-device Whisper needs neither. See [Detection & Auto-Follow](05-detection-ai.md). |
| **Licensed / online Bibles** (e.g. ESV) | **Pro** tier + internet | Optionally your church's own API.Bible key. Bundled public-domain Bibles are always free. See [Scripture](04-scripture.md). |
| **Multiple outputs, Looks, image/video playback** | **Pro** tier | See [Getting Started ▸ tiers](01-getting-started.md#accounts--tiers). |

**Windows build-dependent modules.** RTMP streaming, spatial/HRTF audio, on-device Whisper, and DeckLink are compiled into the Windows build per configuration. If a build lacks one, that feature is cleanly unavailable with an on-screen note — it is not broken. See [Appendix A](appendix-a-platform-differences.md).

---

## Troubleshooting

### Output / displays

- **Nothing shows on the projector.** Open *Output ▸ Screen Setup…* (⇧⌘, / Ctrl+Shift+,) and confirm your display is assigned to the **audience** output (not "Windowed / no display"). Then toggle the audience screen on (⌥⌘A / Ctrl+L). Use **Identify: Screens** in Screen Setup to confirm which physical display is which.
- **A display went black or moved after unplugging/replugging.** ACE recovers automatically; if a "DISPLAY LOST" banner appears, click **Reassign** (or reopen Screen Setup, ⇧⌘, / Ctrl+Shift+,).
- **On Free tier only the main screen works.** That's expected — the stage/second output needs Pro.
- **(Windows) Borderless vs True Fullscreen look the same.** They currently behave identically on Windows — this is a known limitation, not a misconfiguration.
- **(Windows) The stage monitor's screen-color didn't apply.** Screen color currently applies to the audience output only on Windows.

### Detection / auto-follow

- **Detection prints nonsense or won't follow.** Confirm the correct **Audio Input** in *Detection Settings* (⌥⌘, / Ctrl+Alt+,), pick the right **Language**, and note that a language-specific model may be required (the dialog warns you). ACE silently filters common mis-hearings; if nothing appears at all, check the microphone permission and input level.
- **Cloud transcription says "sign in".** Deepgram's pooled relay needs a signed-in account, or enter a personal Deepgram key. On-device Whisper works offline with no account.
- **(Windows) Operator voice commands don't do anything.** They're not implemented on Windows yet — use the keyboard, the on-screen controls, or the phone remote.
- **Songs don't auto-advance even while listening.** Lower the **Min match confidence** slider in *Detection Settings ▸ Advanced*, make sure the target mode isn't set to **Bible only**, and remember that the leader must be audible to the selected input device.

### Media

- **A PowerPoint imported with no pages.** Install **LibreOffice** and re-import (PDF decks don't need it). See the dependency table above.
- **A media tile shows "MISSING".** The source file moved or was deleted. On macOS, use relink/search-paths; on either platform, remove and re-add the file, or turn on "manage media automatically" so future imports are copied into the app.
- **(Windows) No play/pause controls on a live video.** Local video transport isn't in the Windows edition yet — drive play/pause/seek from the phone remote. See [The Phone Remote](10-remote-control.md).

### Auto-advance

- **(Windows) A cue's countdown runs but the slide never changes.** Per-cue auto-advance isn't wired on Windows yet — advance manually (→) or use auto-follow detection.

### Streaming

- **(Windows) "Go Live" is disabled with a note about a streaming encoder.** This build was compiled without the FFmpeg module — use a build that includes streaming.
- **The stream keeps dropping.** On Windows the stream auto-reconnects with backoff; check your upload bandwidth and lower the bitrate/resolution in the Stream panel. Verify the server URL and stream key.
- **A network camera (NDI) isn't listed.** Install the NDI runtime, ensure the source is on the same network, and open the camera picker (it defers NDI discovery until first opened to avoid a firewall prompt).

### The phone remote

- **The phone can't find the presenter.** On Windows, start the server first: *Workspace ▸ Start/Stop Remote Server* (Ctrl+R). Ensure the phone and computer are on the **same Wi-Fi**. On macOS, allow the **Local Network** permission prompt. If discovery fails, enter the computer's IP manually (default port **7001**).
- **(Windows) The phone's Screens tab or a verse-version list is empty.** Remote screen configuration and Bible-version listing aren't available over the Windows remote yet.

---

## Where things are stored

- **Bundled Bibles / extra translations:** an app support folder (`…/ACE/Bibles`); downloaded/imported translations live alongside the bundled ones.
- **Managed media** (when "manage media automatically" is on): an app media folder; on Windows, rasterized deck pages and video poster frames are cached under the app data folder.
- **Settings:** standard per-platform preferences storage (macOS defaults / Windows registry). Venue profiles are saved as `venues.json` in the app support folder.

---

See [Appendix A — Platform Differences](appendix-a-platform-differences.md) for the full list of what's available on each edition, and return to the [manual index](README.md).
