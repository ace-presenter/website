# 5 · Writing, Formatting, Categories & Search

The day-to-day craft of using ACE Editors' Notes: rich text, colour-coding by department, and finding any note instantly.

---

## Rich-text formatting

The editor supports the formatting you already know, applied to selected text or to what you type next:

| Action | Shortcut |
|---|---|
| **Bold** | ⌘B |
| *Italic* | ⌘I |
| <u>Underline</u> | ⌘U |
| Undo | ⌘Z |
| Redo | ⌘⇧Z |

Standard macOS text editing (Copy ⌘C, Cut ⌘X, Paste ⌘V, Select All ⌘A) works throughout. A light convention that keeps briefs scannable: **bold for must-fix items, italic for open questions.**

Formatting is preserved when you export to PDF ([Chapter 7](07-exporting-and-handoff.md)). Timecodes are styled automatically (blue and bold) by the app and are separate from your own bold/italic/underline — you don't need to format them yourself.

---

## Categories — colour-coding by department

Categories let you tag notes by the department or purpose they belong to, so a mixed review splits cleanly into VFX, Audio, Color, and so on. You assign a category with the **category selector** in the toolbar — a button showing the current category's icon and coloured dot; click it to pick another.

### The six built-in categories

Every database ships with six built-ins:

| Category | Icon | Colour |
|---|---|---|
| **VFX** | 🎬 | Red |
| **Audio** | 🔊 | Yellow |
| **Color** | 🎨 | Cyan |
| **Edit** | ✂️ | Green |
| **Review** | 👁 | Blue |
| **Note** | 📝 | Pink |

**Note** is the default safety-net category — any note without an explicit category falls back to it, and it can't be deleted.

### Custom categories

You can add your own from the **category manager** (reached from the selector's menu). There you add, rename, recolour, and delete categories.

One deliberate constraint: **category colours are limited to Resolve's marker palette** (Red, Yellow, Green, Cyan, Blue, Purple, Pink). This isn't arbitrary — it means a category maps cleanly onto a Resolve marker colour, so that when marker *creation* is unblocked ([Chapter 4](04-markers-from-resolve.md)) your categories translate to Resolve markers with no colour guesswork. It's also why imported markers, which carry Resolve colours, drop straight into the category scheme.

> **Colour continuity, both directions.** A marker imported from Resolve keeps its colour as a category; a category you create is a colour Resolve understands. The palette is the shared language.

---

## Search — find anything, instantly

The **search bar** at the top of the window filters your notes as you type:

- Results update in **real time** — no enter key needed.
- Matching text is **highlighted in yellow** so you can spot it at a glance.
- The status area reports how many matches were found (or "No results").
- Search is **case-insensitive**.

Clear the search (delete the text, or the clear control) to return to the full document.

### Search protects unsaved edits

Search is careful with work in progress. If you have **unsaved changes** in the editor, clearing a search won't blow them away by reloading from the database — your visible text is preserved. It only reloads from disk when your content is already saved. In practice you can search and clear freely without fear of losing a half-typed thought.

### Search + export = a targeted brief

Search doubles as an export filter. When a search is active, **export operates only on the filtered (visible) notes** — so searching `VFX` and exporting gives you a VFX-only PDF for the compositor. This is one of the most useful handoff tricks in the app; see [Chapter 7](07-exporting-and-handoff.md).

---

## About AI-assisted categorization and search

Two AI conveniences relate to this chapter but live in [Chapter 6](06-on-device-ai.md) because they require macOS 26+:

- **Smart Categorization** (roadmap) — suggests a category from the note's content.
- **Semantic Search** (roadmap) — finds notes by meaning, so "audio problems" matches "boom shadow" and "wind noise" without those exact words.

The keyword search and manual categories described in *this* chapter work on **every supported macOS** and need no AI. The AI versions are enhancements layered on top, not replacements.

---

Next: the on-device AI features and what they require — [On-Device AI](06-on-device-ai.md).
