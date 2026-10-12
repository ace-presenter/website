# Appendix A — Platform Differences (macOS ↔ Windows)

ACE Presenter is one product with two native editions, built to the same standard: every feature and fix is meant to land on both, with the same menus, the same file formats (`.acesong`, `.acePlaylist`, `.aceTheme`), the same nine interface languages and the same release numbers. This appendix lists the differences that remain in **version 2.4** — some because a technology exists on only one platform, the rest because Windows hasn't caught up yet. If a chapter and this appendix ever seem to disagree, trust this appendix.

> Everything not listed here behaves the same on both editions. Windows uses **Ctrl** where macOS uses **⌘**, and **Alt** where macOS uses **⌥**.

---

## Platform technologies (by design)

| Feature | macOS | Windows | Where |
|---|---|---|---|
| **Syphon** screen destination (hand a screen to OBS/vMix on the same machine) | ✅ | — Syphon is a Mac technology | [Ch 8](08-outputs-and-screens.md) |
| **Apple Speech** detection backend | ✅ macOS 26 and later | — Apple's framework | [Ch 5](05-detection-ai.md) |
| Song Bank fingerprinting | Apple ShazamKit | ACE's own fingerprinter | [Ch 5](05-detection-ai.md) |
| When **Large v3 Turbo** is used automatically | Apple silicon with 16 GB of memory | Only for languages the base models can't handle (Yoruba, Igbo, Hausa, Swahili, Zulu, Xhosa, Amharic, Tamil, Telugu) | [Ch 5](05-detection-ai.md) |
| Updater | Sparkle (checks each launch) | WinSparkle (one quiet check ~8 s after launch) | [Ch 11](11-preferences-shortcuts.md) |

## Windows: not yet available

| Area | macOS | Windows today | Where |
|---|---|---|---|
| **SDI output** (screen to a Blackmagic card) | ✅ | Not yet — and **Spout** output isn't built yet either | [Ch 8](08-outputs-and-screens.md) |
| **Operator voice commands** (OP MIC) | ✅ | The pill is shown but does nothing yet | [Ch 5](05-detection-ai.md) |
| Per-cue **auto-advance** | Advances the slide | Shows the countdown but doesn't advance | [Ch 2](02-service-and-cues.md) |
| **Scheduled auto-start** (Go On Air at a time) | Kept across relaunches, with its plan | Works, but forgotten when ACE quits; time only | [Ch 2](02-service-and-cues.md) |
| **Speaker timers** | Several | One | [Ch 2](02-service-and-cues.md) |
| Stored **cue kinds** | 10 | Prayer, Offering, Timer and Custom save as Generic; Video as Media | [Ch 2](02-service-and-cues.md) |
| **Audio Zones** (room model, trim/delay, faders) | ✅ | Empty state only | [Ch 9](09-streaming-and-audio.md) |
| **Venue profiles** | Capture and re-apply displays, audio, zones, language | A venue is a name only (add, rename, delete, switch) | [Ch 9](09-streaming-and-audio.md) |
| **Preferences** | Account (sign out, seats, delete), Audio, display hold | Account is sign-in only; Audio pane is a placeholder; no display hold; the NDI pane's install button isn't connected; ProPresenter and Linked Computers panes are shown disabled | [Ch 11](11-preferences-shortcuts.md) |
| **Screen Setup** | Stage Theme picker; Borderless vs True Fullscreen differ; stage screen colour; 4 test patterns; editable slice count; licence-locked screens marked | Stage Theme is a placeholder; the two fullscreen modes are identical; screen colour applies to the audience only; 1 test pattern (3 s); slice count follows the screen list; Identify Outputs labels the main audience/stage only | [Ch 8](08-outputs-and-screens.md) |
| **Stage layouts** | Screen-preview object; undo, snap, rulers; full source list | No screen-preview object; no undo/snap/rulers; no Video Countdown, Chord Chart or Next Scripture Translation sources | [Ch 7](07-themes-looks-overlays.md) |
| **CCLI number and credit line** on themes built from positioned objects | ✅ | Drawn only by the built-in layout | [Ch 7](07-themes-looks-overlays.md) |
| **Quick Screen** sheet | Shows the message | *Push to…* only saves to recents — show it from the Messages tab | [Ch 8](08-outputs-and-screens.md) |
| **Fade to Black / Fade to Clear** at a video's end | Fades | Cuts | [Ch 6](06-media.md) |
| **ProPresenter media/audio bins** on import | Folders, smart playlists and missing-file placeholders kept | Flattened to named playlists; no smart playlists; missing files listed instead of kept | [Ch 6](06-media.md) |
| **Import Wizard** formats | Also ProPresenter 6, ChordPro, plain text, Bible files | Those are skipped (listed in the Summary) | [Ch 6](06-media.md) |
| **Inbox** folder | Also takes SongSelect and ChordPro files | ACE files, ProPresenter files and media | [Ch 6](06-media.md) |
| PPTX without **LibreOffice** | Falls back to slide text | No pages | [Ch 6](06-media.md) |
| **Media bin** extras | Tag-name search; grid/list and zoom remembered; Delete key | Name search only; view resets each launch; delete from the right-click menu | [Ch 6](06-media.md) |
| **Command Palette** | Indexes media and saved Looks | Doesn't index media or saved Looks | [Ch 11](11-preferences-shortcuts.md) |
| **Take** shortcut | ⌘⏎ | None (TAKE button) | [Appendix B](appendix-b-keyboard-shortcuts.md) |
| **Toggle Listening** shortcut | ⇧⌘L | None (click the pill) | [Appendix B](appendix-b-keyboard-shortcuts.md) |
| Drag a song from the Library into the plan | ✅ | Use `+` or right-click ▸ Add to Cue Plan | [Ch 3](03-songs-and-arrangements.md) |
| **Phone remote** | Always on; phone adopts your account; Screens tab and Bible versions; scope-aware search with Bible references | Off until Ctrl+R; phone signs in itself; Screens tab answers "not supported"; flat title search | [Ch 10](10-remote-control.md) |
| **Spatial audio CPU watchdog** | Degrades spatial processing under load | — | [Ch 9](09-streaming-and-audio.md) |

## Windows only

- **Move Up / Move Down** and **Learn Timing…** on a cue's right-click menu (on macOS, drag to reorder; Learn Timing… is on the song's Library row).
- The **Editors** menu (macOS opens the same editors from the **EDITORS** pop-up).
- An **Integrations** pane for your own Pixabay and Anthropic keys.
- Keys handled by the **audience output window** itself when it has focus.
- **Auto-reconnect** for the livestream (macOS reports the drop and stops).

## The same on purpose

The Free-tier watermark, the lower-third designs, the lyric and scripture lower-third themes, Looks, theme templates and tokens, text Scaling and Line Transform, translation-overlay styles, logo/watermark defaults, the 1920×1080 letterbox rendering rule, the media bin's folders, smart playlists and play-through, the ACE file formats and the Documents ▸ ACE Presenter folder, the bundled Bibles and speech models, song identification, SongSelect import, the CCLI credit line and usage report, the phone-remote wire protocol, and the licence tiers are deliberately identical across editions.

---

See [Appendix C — External Dependencies & Troubleshooting](appendix-c-dependencies.md) for what to install, and [Appendix B](appendix-b-keyboard-shortcuts.md) for the shortcut differences.
