# ACE Editors' Notes — User Manual

A complete reference for **ACE Editors' Notes**, the native macOS note-taking app for DaVinci Resolve editors. Its defining idea: **timecodes in your notes are clickable, and clicking one drives Resolve's playhead** to that exact frame. Take notes next to your timeline, import markers straight from Resolve, and hand off a clean brief as PDF or TXT.

> **Status: public beta.** ACE Editors' Notes is shipping as a public beta (current build **1.6.1**). It is a macOS app for **Apple Silicon**. It works fully **standalone and offline**; the live link to DaVinci Resolve is an optional add-on that needs Resolve and a Python install. Where a feature is partial or gated, this manual says so plainly rather than glossing over it.

> **The app was historically called "CutNotes."** You may still see that name in a few places — the on-disk database folder, some file paths, older download names. It is the same product. This manual uses the current name, **ACE Editors' Notes**, throughout.

---

## How to read this manual

**Keyboard shortcuts.** ACE Editors' Notes is macOS-only, so shortcuts use Mac modifier symbols: ⌘ Command, ⌥ Option, ⇧ Shift, ⌃ Control. Menu paths use ▸ (e.g. *AI ▸ Polish Note*).

**Status notes.** Because this is a beta, availability is flagged inline where it matters:

| Badge | Meaning |
|---|---|
| *(ships today)* | Works in the current beta build |
| *(needs Resolve)* | Requires DaVinci Resolve running with the Python bridge connected |
| *(needs macOS 26+)* | On-device AI feature; requires macOS 26 or later with Apple Intelligence |
| *(coded, blocked)* | Implemented in the app but blocked by an external bug — see the note where it appears |

The single most important "coded, blocked" item: **creating Resolve markers *from* your notes.** The code is finished and ready, but a bug in DaVinci Resolve 20.x's scripting API prevents it from working today. The shipping direction is therefore **one-way for markers** — Resolve → Notes (import) — plus click-to-seek. See [Chapter 4](04-markers-from-resolve.md) for the full story.

---

## What ACE Editors' Notes is (and isn't)

**It is** a fast, local, distraction-free notes app that understands timecode and talks to your Resolve timeline. Notes live in a hierarchy of **Projects ▸ Timelines ▸ Notes**, stored in a local SQLite database with no cloud dependency by design — post facilities that firewall the edit bay are fully supported.

**It isn't** an NLE, a media manager, or a collaboration server. It doesn't edit your footage, and (today) it doesn't sync to the cloud or support multiple simultaneous users. It sits *beside* Resolve and makes your notes navigable.

---

## Table of contents

1. [Getting Started](01-getting-started.md) — install, requirements (macOS / Resolve / Python), first launch, connecting to Resolve
2. [Projects, Timelines & Notes](02-projects-timelines-notes.md) — the hierarchy, creating/renaming/deleting, auto-save, the one-note-per-timeline model
3. [Timecodes & Click-to-Seek](03-timecodes-click-to-seek.md) — the core feature: inserting timecodes and driving Resolve's playhead
4. [Markers: Importing from Resolve](04-markers-from-resolve.md) — pulling markers in with metadata, duplicate detection, and the marker-creation situation
5. [Writing, Formatting, Categories & Search](05-writing-categories-search.md) — rich text, the six built-in categories, custom categories, and instant search
6. [On-Device AI: Note Polish & Voice Memo](06-on-device-ai.md) — private, local AI that requires macOS 26+; the optional cloud upgrade
7. [Exporting & Handoff](07-exporting-and-handoff.md) — PDF and TXT export, filtered exports, and passing the cut to the lead editor

**Appendix**

- [Keyboard shortcuts & troubleshooting](08-shortcuts-and-troubleshooting.md) — the full shortcut list, connection problems, and known limits in one place

---

## The main window at a glance

ACE Editors' Notes is a single window with a dark, edit-suite-friendly theme:

- **Project dropdown** (top) — pick or create the project you're working on.
- **Timeline dropdown** — pick or create a timeline within that project; each timeline has its own notes.
- **Search bar** — filter across notes; matches highlight in yellow as you type.
- **The notes editor** — the large central area where you write. Timecodes turn blue and bold automatically and are clickable.
- **Button bar / toolbar** — Insert Timecode, Import Markers, Polish Note, Hold to Record, Export to PDF / TXT, plus the category selector.
- **Resolve connection indicator** — a coloured dot: **green** = connected to Resolve, **red** = standalone/offline.

A short **Welcome tour** spotlights these on first launch and can be replayed from *Help ▸ Welcome Tour*.

---

## A 60-second tour of the workflow

1. Create a **Project** (the job) and a **Timeline** (the cut) — see [Chapter 2](02-projects-timelines-notes.md).
2. Start typing notes. Type a timecode like `01:02:33:18`, or press **⌘T** to stamp Resolve's current playhead position — see [Chapter 3](03-timecodes-click-to-seek.md).
3. With Resolve connected, **click any blue timecode** and Resolve jumps to that frame.
4. **Import Markers** to pull existing Resolve markers in as notes — see [Chapter 4](04-markers-from-resolve.md).
5. Colour-code notes by **category** (VFX, Audio, Color…) and **search** to find anything — see [Chapter 5](05-writing-categories-search.md).
6. **Export to PDF or TXT** and hand the brief to the lead editor or director — see [Chapter 7](07-exporting-and-handoff.md).

Everything above works offline. Steps 2–4's live Resolve behaviour needs the Python bridge connected, covered in [Getting Started](01-getting-started.md).
