# 4 · Markers: Importing from Resolve

Markers are how a lot of feedback already lives in Resolve — a colorist's flags, a director's review pins, your own scene markers. ACE Editors' Notes can pull those markers straight into your notes as structured, clickable entries. This chapter covers importing (which works today) and is honest about marker *creation* (which is coded but blocked).

---

## Import markers from your timeline *(needs Resolve)*

With the connection dot green:

1. Click **Import Markers** in the toolbar.
2. The **Marker Import** dialog opens, listing every marker on Resolve's active timeline in a table.
3. Review the list, choose whether to skip duplicates (see below), and confirm.
4. Each imported marker becomes a note entry in the current timeline's notes.

### What comes across

For every marker, ACE Editors' Notes preserves the full metadata:

| Marker field | Becomes |
|---|---|
| **Timecode** (converted from Resolve's internal frame position) | A clickable blue timecode, offset-corrected for the timeline start |
| **Name** | The note's heading/title text |
| **Note / comment** | The note body |
| **Colour** | Retained and mapped to a category colour (Resolve's marker palette) |

Because the timecode arrives as a normal recognized timecode, every imported marker is immediately **click-to-seek** — click it and Resolve jumps back to that frame ([Chapter 3](03-timecodes-click-to-seek.md)). And because colour is preserved, imported markers slot naturally into the category system ([Chapter 5](05-writing-categories-search.md)).

### Frame-to-timecode conversion and the start offset

Resolve stores marker positions as **frame numbers**, not timecodes. The app converts each frame to a timecode using the timeline's frame rate and **start-timecode offset** — so a marker on an `01:00:00:00`-based broadcast timeline imports at the right hour-based timecode rather than at zero. If imported timecodes look shifted, check the timeline's start timecode and FPS in Resolve (same guidance as [Chapter 3](03-timecodes-click-to-seek.md)).

---

## Duplicate detection

Re-importing after a few new markers were added shouldn't flood your notes with copies. The import dialog handles that:

- A **"Skip duplicates"** checkbox is **on by default**.
- Before import, the app scans your existing notes and flags any marker that already exists **at the same timecode**.
- With the box checked, those are left out and reported as *skipped*; only genuinely new markers are added.

This makes "import again to catch what's new" a safe, repeatable habit throughout a review cycle. Uncheck the box only if you deliberately want every marker brought in regardless.

---

## Creating markers *in* Resolve — coded, but blocked *(coded, blocked)*

Here's the honest status, because it shapes how you should use the app.

**The intended feature:** turn a note into a Resolve timeline marker — write a note at a timecode, push a button, and a matching coloured marker appears on the Resolve timeline (colour driven by the note's category).

**Why it isn't switched on:** DaVinci Resolve **20.x** ships a bug in its scripting API where `Timeline.AddMarker()` returns failure for *every* call — even though manual markers (the **M** key) work fine and every other scripting call the app uses (seeking the playhead, reading markers, reading project/timeline info) works perfectly. It was tested exhaustively across parameter combinations; the method simply refuses under the current API.

**What that means for you today:**

- Markers flow **one way**: **Resolve → Notes** (import) plus **click-to-seek**. That's the shipping direction, and it's the workflow the app is built around.
- The marker-*creation* code is complete and in the app, waiting on Blackmagic. When a fixed Resolve build lands, the capability is expected to light up **without any change on your side** — just update Resolve.
- Until then, if you need a marker to exist *in* Resolve, place it manually with **M** in Resolve. You can still keep the authoritative, navigable record of it in your notes.

> **Why "one-way" is still the productive workflow.** The high-value move for most editors is the reverse of what you'd guess: not scattering markers onto the timeline, but pulling existing feedback *out* of Resolve into a searchable, categorizable, exportable brief — and being able to click any line to jump back. That is exactly what ships today.

---

## Roadmap context

Bidirectional marker sync — including colour driven by category and delete-in-sync — is designed and partially built; it's gated on the Resolve API fix above. Deeper marker features (templates, presets, bulk operations) are longer-term roadmap items and are not part of the current beta. Nothing else in this manual depends on them.

---

Next: making notes readable and findable — [Writing, Formatting, Categories & Search](05-writing-categories-search.md).
