# Appendix A — Platform Differences (macOS ↔ Windows)

ACE Presenter is one product with two native editions. The **macOS** edition is the reference; the **Windows** edition is a native port that matches it closely but has a handful of features still in progress. This appendix is the authoritative "what works where" list — if a chapter and this appendix ever seem to disagree, trust this appendix.

> Everything not listed here behaves the same on both editions.

---

## At-a-glance parity matrix

| Area | macOS | Windows | Where |
|---|---|---|---|
| Per-cue **auto-advance** | Advances the slide | **Shows a countdown but does not advance** | [Ch 2](02-service-and-cues.md) |
| **Operator voice commands** | Full command engine | **Not available** (placeholder) | [Ch 5](05-detection-ai.md) |
| **Audio Zones** (trim/delay editor) | Floorplan editor + live faders | **Not available** (empty state) | [Ch 9](09-streaming-and-audio.md) |
| **Looks** authoring | Full editor | **Not available** (shows upgrade prompt) | [Ch 7](07-themes-looks-overlays.md) |
| Theme **slide templates / comparison** | Multiple per-slide templates + Compare-N | **Single layout per theme** | [Ch 7](07-themes-looks-overlays.md) |
| **Stage Theme** override tab | Working picker | **Placeholder** (no picker) | [Ch 8](08-outputs-and-screens.md) |
| Fullscreen **Borderless vs True** | Genuinely different | **Identical** (both fullscreen) | [Ch 8](08-outputs-and-screens.md) |
| **RTMP streaming** | Always available | **Build-dependent** (may be disabled) | [Ch 9](09-streaming-and-audio.md) |
| **Spatial / HRTF audio** | Always available | **Build-dependent** | [Ch 9](09-streaming-and-audio.md) |
| On-device **Whisper** detection | Always available | **Build-dependent** | [Ch 5](05-detection-ai.md) |
| **Song matching** intelligence | Embeddings + voting + online ID | Simpler threshold match | [Ch 5](05-detection-ai.md) |
| **Remote screen config / Bible versions** | Phone Screens tab works | **Not available** over the remote | [Ch 10](10-remote-control.md) |
| **Remote search** | Scope-aware + Bible references | Basic title/name match | [Ch 10](10-remote-control.md) |
| **Remote operator adoption** | Phone inherits your account | Phone signs in itself | [Ch 10](10-remote-control.md) |
| **Remote server** | Always on | Off by default (Ctrl+R) | [Ch 10](10-remote-control.md) |
| **CCLI number** on object-based themes | Always shown on song slides | **Not drawn** on object themes | [Ch 7](07-themes-looks-overlays.md) |
| **Import Wizard** breadth | Many formats + drag-drop | **Slide decks only** (others pending) | [Ch 6](06-media.md) |
| Deck import **without LibreOffice** | Falls back to PPTX text | **Yields 0 pages** | [Ch 6](06-media.md) |
| Video **transport (local)** | On-clip controls + spacebar | **Remote-driven only** | [Ch 6](06-media.md) |
| Dashboard **video preview** | Live video | Still frame | [Ch 6](06-media.md) |
| Multi-output **slice count/index** | Editable | Derived from screen order | [Ch 8](08-outputs-and-screens.md) |
| **Cue kinds** | 10 | 6 (extras folded to Generic) | [Ch 2](02-service-and-cues.md) |
| Per-layer clear / per-slide media / per-cue transitions | Full | Reduced | [Ch 2](02-service-and-cues.md) |
| **Preferences** panes | All functional | Same panes present; some inert (ProPresenter, Linked Computers), NDI is install-only, Account is sign-in-only | [Ch 11](11-preferences-shortcuts.md) |
| **Auto-update** | Checks each launch | Checks once shortly after launch | [Ch 11](11-preferences-shortcuts.md) |
| **Test patterns** (Identify) | 4 patterns, ~8 s | 1 pattern, ~3 s | [Ch 8](08-outputs-and-screens.md) |
| Media: single-click-to-background, relink, tag search, tray resize | Yes | No | [Ch 6](06-media.md) |

---

## macOS-only features (today)

These exist on macOS and are not yet in the Windows port:

- **Operator voice commands** (spoken "next / blank / show John 3:16", etc.).
- **Audio Zones** — the room-model floorplan editor with per-zone trim, delay, speakers, and live level/mute faders.
- **Looks authoring** — creating per-screen theme assignments (Windows can apply themes but not author Looks).
- **Theme slide templates & multi-translation comparison themes** (Compare 2–4).
- **Local video transport** — the on-clip play/pause/scrub overlay and spacebar; live video in the dashboard preview.
- **Import Wizard** for the full range of formats (ProPresenter, ChordPro, plain text, Bible formats, images/video) and drag-and-drop into it.
- **Native PPTX text fallback** when LibreOffice isn't installed.
- **Media niceties** — single-click-to-background, missing-media relink/clean-up, search that matches tags, a resizable media tray.
- **Richer song auto-follow** — semantic matching, vote/challenger promotion, acoustic verification, and online AI song identification that can auto-import a song.
- **Remote screen configuration & Bible-version listing** from the phone; operator-profile adoption; scope-aware/Bible-reference remote search.
- A **complete Account pane** (profile, sign-out, delete-account, seat management) — on Windows the Account pane is sign-in-only.

## Windows: present but incomplete or behaving differently

- **Auto-advance** shows a countdown on the stage display and timers panel but does **not** actually advance the slide.
- **Fullscreen mode** — "Borderless Fill" and "True Fullscreen" currently behave the same.
- **Stage Theme** sub-tab in Screen Setup is a placeholder (no picker).
- **Screen color** applies to the audience output only (a stage screen-color is saved but not shown).
- **CCLI number** is not drawn on themes built from positioned objects (it shows on the classic text layout).
- **Theme tokens** `{{translation}}` and indexed comparison tokens aren't substituted.
- The **Recents** tab badge in the media tray always reads "0" (the tab still works).
- **Preferences** now shows the same panes as macOS, but some are placeholders: **ProPresenter** and **Linked Computers** are inert, **NDI** is reduced to an install button, and a couple of **Integrations** keys (Anthropic/Genius) are unwired (Pixabay works). **ATEM** is a fully working Windows tab.

## Windows build-dependent features

Some Windows capabilities are compiled in per build. If your build was made without the relevant module, the feature is cleanly unavailable (with an on-screen note) rather than broken:

- **RTMP streaming** (requires the FFmpeg module) — *Go Live* is disabled with a message otherwise.
- **Spatial / binaural HRTF audio** (requires the Qt SpatialAudio module) — the toggle is disabled otherwise.
- **On-device Whisper detection** (requires the Whisper module) — otherwise use the Sample Phrases or Deepgram backends.
- **DeckLink / SDI capture** (requires the Blackmagic SDK at build time).

## Things that are the same on purpose

The Free-tier watermark, lower-third styles, translation-overlay styles, logo/watermark defaults, the 1920×1080 letterbox rendering rule, the phone-remote wire protocol, and the licence tiers are all deliberately identical across editions.

---

See [Appendix C — External Dependencies & Troubleshooting](appendix-c-dependencies.md) for what to install, and [Appendix B](appendix-b-keyboard-shortcuts.md) for the shortcut differences.
