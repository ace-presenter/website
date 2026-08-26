# ACE Presenter — User Manual

A comprehensive reference for **ACE Presenter**, the worship/church presentation system. This manual covers both the **macOS** and **Windows** editions in one place, with a platform-differences appendix and honest status notes wherever a feature exists on one platform but not (yet) the other.

> **Which app is which.** ACE Presenter ships as two native desktop apps that share one design and one underlying document model, plus a companion phone remote:
> - **macOS** — the reference edition.
> - **Windows** — a native port of the macOS app; a small number of features are still in progress (each is marked below).
> - **ACE Presenter Remote** — a phone app (iOS + Android) that controls either edition over your local network.

---

## How to read this manual

**Platform conventions.** Where a keyboard shortcut differs, both are given as **macOS ⌘ / Windows Ctrl**. Menu paths use ▸ (e.g. *Output ▸ Screen Setup…*). Modifier symbols: ⌘ Command, ⌥ Option/Alt, ⇧ Shift, ⌃ Control.

**Status notes.** Feature availability is flagged inline:

| Badge | Meaning |
|---|---|
| *(both)* | Works the same on macOS and Windows |
| *(macOS only)* | Present on macOS; not available on Windows |
| *(Windows: not yet available)* | Exists on macOS; the Windows port has not implemented it yet |
| *(build-dependent)* | On Windows, present only if the app was compiled with the relevant module |

When in doubt, the [Platform Differences appendix](appendix-a-platform-differences.md) is the authoritative list of what is and isn't available on each edition today.

---

## Table of contents

1. [Getting Started](01-getting-started.md) — install, first run, sign-in, tiers, the main window
2. [Building a Service: Cues & Running Order](02-service-and-cues.md) — cues, service plans, going live, blank/clear, auto-advance, Go On Air
3. [Songs & Arrangements](03-songs-and-arrangements.md) — the song library, sections, arrangements, editing lyrics
4. [Scripture](04-scripture.md) — the Bible workspace, translations, presenting passages, comparison, study
5. [Detection & Auto-Follow (AI)](05-detection-ai.md) — live transcription, song matching, Bible detection, Song Bank, voice commands
6. [Media](06-media.md) — the media library, playlists, video, slide decks (PPTX/PDF), stock media
7. [Themes, Looks & Overlays](07-themes-looks-overlays.md) — the theme editor, looks, lower-thirds, logo, translation overlay, CCLI
8. [Outputs & Screens](08-outputs-and-screens.md) — audience & stage displays, Screen Setup, multi-output, clear/blank, quick screen
9. [Streaming & Audio](09-streaming-and-audio.md) — RTMP streaming, NDI, capture cards, ATEM, audio routing, spatial audio, venues & zones
10. [The Phone Remote](10-remote-control.md) — enabling, pairing, and everything the phone can control
11. [Preferences, Shortcuts & Menus](11-preferences-shortcuts.md) — every settings pane, the command palette, the full menu map

**Appendices**

- [A — Platform Differences (macOS ↔ Windows)](appendix-a-platform-differences.md)
- [B — Keyboard Shortcuts](appendix-b-keyboard-shortcuts.md)
- [C — External Dependencies & Troubleshooting](appendix-c-dependencies.md)

---

## The main window at a glance

ACE Presenter is organized around **workspaces** you switch between (⌘1–⌘6 / Ctrl+1–Ctrl+6), a persistent **media tray** along the bottom, and an **output control panel** for taking content live.

- **Cue Plan** — your service order (the running order of cues) and the song/media library.
- **Stage / Program** — the live presentation view with preview (PVW) and program (PGM) controls.
- **Edit** — a non-destructive slide editor.
- **Bible** — the scripture workspace.
- **Theme / Looks** — visual styling.
- **Top status bar** — the LISTENING pill (detection), stream/NDI status, and venue badge.
- **Output control panel** — CLEAR / BLACK / LIVE / TAKE, per-layer clears, and audience/stage toggles.

Each of these is documented in its chapter above.

---

## Editions & tiers

ACE Presenter has three licence tiers. Sign in from *Help ▸ Sign In…* (Windows) or *Settings ▸ Account* (macOS).

| Tier | Highlights |
|---|---|
| **Free** | Full presentation, one **audience** output only, bundled (public-domain) Bibles, on-device detection. A diagonal "ACE FREE" watermark appears on output. |
| **Pro** | Multiple outputs, Looks (per-screen themes), image & video playback, licensed/online Bible translations. |
| **Venue** | Everything in Pro plus the 8-layer compositor, edge-blending, and network redundancy. |

See [Getting Started ▸ Accounts & Tiers](01-getting-started.md#accounts--tiers) for details and [Preferences](11-preferences-shortcuts.md) for where each gated feature lives.
