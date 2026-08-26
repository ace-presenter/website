# 2 · Projects, Timelines & Notes

Everything in ACE Editors' Notes lives in a simple three-level hierarchy. Understanding it takes about a minute and explains how your notes stay organized across many jobs and many cuts.

---

## The hierarchy: Projects ▸ Timelines ▸ Notes

```
Project  (a job — "Nike Spring Spot", "Documentary Ep. 3")
  └─ Timeline  (a cut — "Rough Cut", "Director's Review", "Final")
       └─ Notes  (your writing for that timeline)
```

- A **Project** is the job. Create one per client, film, episode, or campaign.
- A **Timeline** is a cut or pass within that project. Each timeline keeps its **own independent notes**, so your rough-cut scribbles don't bleed into your final-review brief.
- **Notes** are the text you write for the selected timeline.

You choose the active project and timeline from the two dropdowns at the top of the window. Whatever project and timeline are selected is what the editor shows and what export/search act on.

> **How this maps to Resolve.** When the Resolve bridge is connected, the app auto-detects Resolve's current project and timeline and keeps the names in sync. You can also work entirely on your own project/timeline names offline — the hierarchy is yours to organize however suits the job.

---

## Working with Projects

**Create a project**

1. Click **New Project**.
2. Enter a name — for example *"Client Video Edit — Jan 2026"*.
3. The project appears in the dropdown, and a first timeline is created for you automatically.

**Rename a project**

- Use the **Rename** control next to the project dropdown, enter the new name, and it updates immediately.

**Delete a project**

- Use the **Delete** control and confirm. **This is permanent** and removes every timeline and note inside the project (deletion cascades). There is no undo for a deleted project, so export anything you want to keep first — see [Chapter 7](07-exporting-and-handoff.md).

---

## Working with Timelines

**Create a timeline**

- With a project selected, create a new timeline and name it for the pass it represents: *"Rough Cut"*, *"VFX Review"*, *"Color Pass"*, *"Final"*.

**Rename / delete a timeline**

- The **Rename** and **Delete** controls sit next to the timeline dropdown, mirroring the project controls. Deleting a timeline permanently removes its notes.

**Find a timeline fast**

- On projects with many timelines, use the **timeline filter** box — type a few letters (e.g. *"rough"*) and the list narrows to matches. The filter is debounced so it stays responsive even with a long list.

**Suggested convention**

- One timeline per editing phase is the sweet spot. It keeps each brief focused and makes exports clean — you can hand off just the "Director's Review" notes without the noise of your working scratchpad.

---

## The notes editor and the one-note-per-timeline model

The large central area is a **rich-text editor**. There is an important design choice to understand here:

**Each timeline has one continuous note document.** ACE Editors' Notes doesn't ask you to create discrete note "cards." You just write — line after line, timecode after timecode — into the single document for the selected timeline. Switching timelines swaps the document; your text for the previous timeline is preserved.

A typical timeline's document looks like this:

```
01:00:15:10 – Opening scene, director wants a wider lens
01:02:33:18 – Interview segment — great natural light
01:05:42:05 – VFX: remove boom-mic shadow (frames 2735–2890)
01:08:10:22 – Pacing slow, trim 8–10 frames between cuts
```

Each line is just text you typed; the timecodes at the start of each line are automatically recognized, highlighted, and made clickable (see [Chapter 3](03-timecodes-click-to-seek.md)).

> **Marker import is the exception.** When you pull markers in from Resolve, each marker arrives as its own structured note entry with a timecode, category colour, and comment — see [Chapter 4](04-markers-from-resolve.md). Everything you type by hand, though, flows into the one document per timeline.

---

## Auto-save — there is no Save button

You never manually save. ACE Editors' Notes **auto-saves every 2 seconds** whenever the document has changed, writing to the local SQLite database with smart update logic (it updates the timeline's existing note rather than piling up duplicates). A brief **"Auto-saved"** message in the status area confirms your text is persisted.

Two practical habits:

- After a big edit, glance for the **"Auto-saved"** confirmation before quitting — it appears within a couple of seconds of you stopping typing.
- Because saving is automatic and local, closing the app mid-session is safe; your work for each timeline is already on disk.

---

## Where your data lives

All projects, timelines, notes, and categories are stored in a single local **SQLite** database under *~/Library/Application Support/* (the folder keeps the legacy *CutNotes* name). This is a deliberate **local-first** design: no account is required to take notes, nothing is uploaded, and the app works in air-gapped edit bays. Back it up like any other project file, or use export ([Chapter 7](07-exporting-and-handoff.md)) for portable copies.

---

Next: the feature the whole app is built around — [Timecodes & Click-to-Seek](03-timecodes-click-to-seek.md).
