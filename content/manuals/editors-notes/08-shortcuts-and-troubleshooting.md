# Appendix · Keyboard Shortcuts & Troubleshooting

One place for every shortcut and the fixes for the problems people actually hit. ACE Editors' Notes is macOS-only, so all shortcuts use Mac modifiers: ⌘ Command, ⌥ Option, ⇧ Shift.

---

## Keyboard shortcuts

### Editing

| Action | Shortcut |
|---|---|
| Bold | ⌘B |
| Italic | ⌘I |
| Underline | ⌘U |
| Undo | ⌘Z |
| Redo | ⌘⇧Z |
| Copy / Cut / Paste | ⌘C / ⌘X / ⌘V |
| Select All | ⌘A |

### Timecodes & Resolve

| Action | Shortcut |
|---|---|
| Insert Timecode (stamps Resolve's playhead when connected) | ⌘T |
| Seek Resolve to a timecode | **Click** the blue timecode |

### Search & AI

| Action | Shortcut |
|---|---|
| Search notes | ⌘F |
| Polish Note (AI) | ⌥⌘P |
| Voice Memo (AI) | **Press and hold** the *Hold to Record* button |

> Voice Memo has no key shortcut by design — it's a press-and-hold ("hold-to-talk") control, so you use the toolbar button.

---

## Requirements recap

| Capability | Needs |
|---|---|
| Notes, timecodes, categories, search, export | macOS 12+ (Apple Silicon) |
| Click-to-seek, Insert-from-playhead, marker import | DaVinci Resolve 18–20 running + Python 3 bridge connected |
| Note Polish, Voice Memo | macOS 26+ with Apple Intelligence |
| Cloud AI (optional) | Your own Anthropic API key, opt-in per feature |

Full setup detail is in [Getting Started](01-getting-started.md).

---

## Troubleshooting

### "ACE Editors' Notes is damaged and can't be opened"

A stale or quarantined download (or an early unsigned build) can trip Gatekeeper. In **Terminal**:

```bash
xattr -cr /Applications/ACEEditorsNotes.app
```

Then open the app again. One-time fix. The shipping public beta is Apple-signed and notarized, so a fresh download from the ACE site normally opens without this.

### The Resolve connection dot stays red

Work through these in order:

1. **Resolve is running** with a **project *and* timeline** open.
2. **External scripting is enabled** — *Resolve ▸ Preferences ▸ System ▸ General ▸ External scripting using ▸ Local* (or Network).
3. **Python 3 works** — `python3 --version` returns a version.
4. **Resolve's scripting module is findable** — the `PYTHONPATH` line from [Getting Started](01-getting-started.md) is in `~/.zshrc` and sourced.
5. **Relaunch both apps.** Start Resolve first, then ACE Editors' Notes. Allow 5–10 seconds for the dot to turn green.

### Clicking a timecode does nothing

1. The dot must be **green** — click-to-seek is a live feature.
2. The timecode must be a valid `HH:MM:SS:FF` / `HH:MM:SS` form and appear **blue and bold** (if it isn't highlighted, it isn't recognized).
3. It must be **within the active timeline's range** — note the `01:00:00:00` start-offset case in [Chapter 3](03-timecodes-click-to-seek.md).
4. The timeline in Resolve must be **active and unlocked**.

### Imported markers land at the wrong timecode

Resolve stores markers by frame; the app converts using the timeline's FPS and start timecode.

1. Check **Resolve ▸ Timeline ▸ Timeline Settings ▸ Start Timecode** (broadcast timelines often start at `01:00:00:00`).
2. Confirm the timeline **FPS** matches the project FPS.
3. As a test, a timeline starting at `00:00:00:00` removes the offset from the equation.

### I can't create markers in Resolve from my notes

That's expected right now — it's the **coded-but-blocked** feature. DaVinci Resolve 20.x has a scripting bug (`AddMarker()` fails for all calls) that blocks it. Import (Resolve → Notes) and click-to-seek are unaffected. The capability is expected to work automatically once Blackmagic ships a fix — full explanation in [Chapter 4](04-markers-from-resolve.md). In the meantime, place markers manually with **M** in Resolve.

### The Polish or Voice Memo button is greyed out

Those need **macOS 26+** with Apple Intelligence enabled on supported hardware. On earlier macOS the buttons are disabled with a tooltip. Everything else in the app still works. See [Chapter 6](06-on-device-ai.md).

### Exported PDF is blank

Export captures the current editor content for the selected timeline. Make sure notes are actually written (and, if a search is active, that some notes match — export only includes filtered notes). Clear the search to export the whole timeline.

### My notes "disappeared" after searching

They didn't. Search filters the view; **clearing the search restores everything**, and any unsaved edits are deliberately preserved rather than reloaded away ([Chapter 5](05-writing-categories-search.md)).

### Auto-save

There is no Save button — the app auto-saves every ~2 seconds when the document changes, and shows an **"Auto-saved"** confirmation. Glance for it before quitting after a large edit.

---

## Known limits of the current beta

- **macOS only, Apple Silicon.** No Windows, no Intel build in the shipping beta.
- **Marker creation into Resolve is blocked** by the Resolve 20.x API bug (import + click-to-seek work).
- **AI needs macOS 26+.** Note Polish and Voice Memo are unavailable on earlier macOS.
- **Local-only.** No cloud sync, no multi-user collaboration — sharing is via exported PDF/TXT. Both are longer-term roadmap items, not part of this beta.
- **One note document per timeline** — the model is a continuous document per timeline, not discrete note cards (imported markers being the structured exception).

---

Back to the [manual index](README.md).
