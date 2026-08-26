# 7 · Exporting & Handoff

Notes are only useful if they travel. ACE Editors' Notes exports to **PDF** and **TXT** in one click, so you can email a brief to the director, hand the cut to the lead editor, or drop a plain-text list into a task tracker.

---

## Export to PDF

For a formatted, presentable document — the usual choice for sending to a director, colorist, or client:

1. Click **Export to PDF**.
2. Choose a save location.
3. A formatted PDF is generated (a progress bar shows during export).

The PDF preserves your **rich-text formatting** (bold, italic, underline) and your **timecodes**, and is headed with the project and timeline names so the recipient knows exactly which cut the notes belong to. It's ready to email or print.

---

## Export to TXT

For a lightweight, universally openable file — good for pasting into email, a task tracker, or a shot list:

1. Click **Export to TXT**.
2. Choose a save location.
3. A plain-text file is written with all the notes for the current timeline.

TXT drops styling (it's plain text) but keeps the content and the timecodes as written.

---

## Export exactly what you need — filtered export

This is the export feature worth remembering: **when a search is active, export includes only the filtered notes** ([Chapter 5](05-writing-categories-search.md)).

So the targeted-handoff pattern is:

1. **Search** for the slice you want — e.g. `VFX`, or a shot name, or a reviewer's initials.
2. Confirm the editor is showing just those matching notes.
3. **Export to PDF or TXT** — the output contains only that slice.

Search `Audio`, export → an audio-only brief for the mixer. Search `VFX`, export → a shot list for the compositor. One document, one department, no manual trimming.

To export the entire timeline instead, clear the search first so the full document is visible.

---

## Print

Because PDF export produces a fully formatted document, printing is simply "export to PDF, then print" — the PDF is print-ready and carries the same project/timeline heading and formatting. This is the intended path for a paper handoff in the edit bay.

---

## The handoff workflow, end to end

A typical assistant-editor-to-lead handoff after a director's review:

1. During the review, take notes — stamp Resolve's playhead with **⌘T** ([Chapter 3](03-timecodes-click-to-seek.md)) and categorize as you go ([Chapter 5](05-writing-categories-search.md)).
2. Optionally **Import Markers** to fold in anything already flagged in Resolve ([Chapter 4](04-markers-from-resolve.md)).
3. Optionally **Polish** the notes into a clean brief ([Chapter 6](06-on-device-ai.md)).
4. **Export to PDF** for the full brief, and/or **search + export** department-specific slices.
5. Send them on. Every timecode in the notes stays meaningful — anyone with the project open in Resolve and ACE Editors' Notes installed can click a timecode and land on the frame.

The result is a brief that *travels with the cut*: stamped, categorized, searchable, and navigable — no transcription lag, no lost sticky notes.

---

## What export is not (today)

- There's **no round-trip back into Resolve** from an export — exports are documents for people, not data for Resolve. (Marker creation, the app-to-Resolve direction, is the separate blocked feature in [Chapter 4](04-markers-from-resolve.md).)
- There's **no cloud share link or multi-user handoff** — sharing today means sending the exported file. Cloud sync and collaboration are longer-term roadmap items, not part of the current beta.

---

Reference material — the full shortcut list and fixes for common problems — is in the [appendix](08-shortcuts-and-troubleshooting.md).
