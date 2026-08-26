# Songs & Arrangements

Songs are the heart of most worship services, and ACE Presenter treats them as **reusable, structured documents** rather than one-off slide decks. A song is a title, an optional artist, and a set of **sections** (Verse 1, Chorus, Bridge…), each holding a few lines of lyrics. Because a song is structured this way, ACE can auto-colour its sections, let you re-order them into named **arrangements**, and drop the same song into any number of services without retyping it.

This chapter covers the **song library**, creating and editing songs, how sections work, building and applying **arrangements**, the **Reflow** lyric editor, and the **Edit workspace / Slide Grid** as they apply to song cues.

Related reading:
- [Building a Service: Cues & Running Order](02-service-and-cues.md) — how a song becomes a cue in the running order, going live, blank/clear, auto-advance.
- [Themes, Looks & Overlays](07-themes-looks-overlays.md) — how song lyrics are styled, and the CCLI licence number on song slides.

---

## The song library vs. the running order

Two lists sit in the left sidebar, and it's worth being clear on the difference:

| | **Song library** | **Running order (Cue Plan)** |
|---|---|---|
| What it is | A reusable catalogue of songs you've created | The actual order of service for *today* |
| Contains | Every song, whether or not it's in today's plan | The cues you've added, top to bottom |
| Lives | Left sidebar **Library** list (searchable) | Left sidebar **Cue Plan** list |
| Reused across services | Yes | No — it's this service's order |

**What it does.** The library is your permanent stock of songs. The running order is a *selection* from that stock (plus scripture, media, and announcements) arranged for one service. Adding a song to the plan does **not** remove it from the library — the same song can appear in many services over time.

> **Platform difference — how a plan cue links back to the library.**
> - **macOS:** the library is a generic collection on the presentation document, and each cue carries a **`libraryRef`** back to its source song. Editing the library song **propagates** the change to every plan cue that references it. *(macOS only)*
> - **Windows:** songs live in a dedicated **Song library** with **revision-based (rev/CAS) concurrency** to keep edits safe when the phone remote and the desktop edit at once. A plan cue created from a song does **not** keep a live back-reference — edits made through Reflow or the library are applied to the cue you're editing. *(Windows)*

### Adding a song to the plan

**How to get there:**
- **Per-row `+`** — every song in the Library list has a **`+`** button; click it to append that song to the running order. *(both)*
- **Drag** the song from the Library list into the Cue Plan. *(macOS; Windows adds via `+` and right-click)*
- **From the New Song dialog** — tick **"Also add to current service"** so the song lands in the plan the moment you create it (see below). *(both)*

### Taking a song slide live

**What it does.** With a song selected, its slides appear in the preview area. Clicking a slide in the preview takes it **live** and, if the song wasn't already in the running order, **auto-adds** it to the plan at the same time — so you can go live straight from the library without a separate "add" step. *(both)*

Preview shows a hint until you pick a song: *"Click a song in the left sidebar to preview its slides here, then Add to Plan."* The **Add to Plan** button is available on the preview pane. *(Windows)*

For prev/next, PVW vs PGM, and blank/clear once a song is live, see [Building a Service](02-service-and-cues.md#going-live).

### Searching the library

The Library list has a search box that filters by song title (and artist/name).

> **Platform difference.** macOS search is **scope-aware** (it can narrow to songs, scripture, etc.). The phone remote's library search on Windows is a **flat title/name substring** match. *(see [The Phone Remote](10-remote-control.md))*

---

## Creating a song

**What it does.** The **New Song** dialog turns pasted lyrics into a fully structured, sectioned song. You give it a title (and optionally an artist), paste the lyrics with a blank line between each section, and ACE splits them into Verse / Chorus / Bridge automatically. A live **section preview** on the right updates as you type.

**How to get there:**

| | macOS | Windows |
|---|---|---|
| Shortcut | **⌘N** | **Ctrl+N** |
| Menu | *File ▸ New Song…* | *File ▸ New Song…* |

### The dialog

| Field / control | What it does |
|---|---|
| **Song title** | The song's name (shown in the library and cue list). |
| **Artist / author** *(optional)* | Attribution; safe to leave blank. |
| **Lyrics** | Paste the words here. **Leave a blank line between sections.** A line that reads like a label — *"Chorus"*, *"Verse 2"*, *"Bridge"*, *"Intro"*, *"Pre-Chorus"*, *"Tag"*, *"Refrain"* — is detected as that section's heading. |
| **Sections preview** | A live, read-only breakdown on the right: *"SECTIONS (n)"* with each section's label and first line. Updates on every keystroke. |
| **Also add to current service** | When ticked, the new song is appended to the running order as well as saved to the library. |
| **Add Song** *(Windows)* / **Save** *(macOS)* | Creates the song. |
| **Cancel** | Discards it. |

### How auto-split works

- Blank lines separate **sections**. Each block of lines becomes one section.
- If a block's **first line is a recognised label** (Verse / Chorus / Bridge, etc.), that line becomes the section's **label** and is removed from the sung lines.
- Blocks without a label are numbered automatically — **Verse 1, Verse 2, …** — and a repeated block is treated as a **Chorus**.

So pasting plain lyrics with sensible blank lines is usually enough; you rarely need to type the labels yourself. On Windows the header reads *"Lyrics — blank line between sections; "Chorus" / "Verse 2" lines are detected,"* and the dialog notes the song is *"Saved to Library."*

---

## Editing an existing song

Here the two editions diverge in an important way.

> **Platform difference — the New Song dialog and editing.**
> - **macOS:** the New Song sheet **doubles as the song editor**. Right-click a song in the Library and choose **Edit Song…** (pencil) to reopen the same sheet in edit mode — change the title, artist, or lyrics, and (because of `libraryRef`) the edit propagates to plan cues built from that song. *(macOS only)*
> - **Windows:** the New Song dialog is **create-only**. To change an existing song's words you edit it in place with the **Reflow** editor, or through the library's create/edit/delete (CRUD) operations, which use rev-based concurrency. There is no "reopen the New Song dialog to edit" path. *(Windows: New Song is create-only)*

The **Reflow editor** (below) is the reliable, cross-platform way to fix a typo or re-line lyrics on a song that's already in your plan.

---

## Song sections & auto-colouring

Every slide in a song carries a **section label** (Verse 1, Chorus, Bridge…). ACE colours slides by section so the operator can see the shape of a song at a glance:

| Section | Colour |
|---|---|
| Verse | Blue |
| Chorus | Green |
| Bridge | Orange |

*(both — the colour comes from the section label automatically; you don't set it per slide for songs.)*

These labels are what make **arrangements** possible: an arrangement is simply an ordering of these named sections.

---

## Arrangements

**What they are.** An **arrangement** is a **named ordering of a song's sections** — for example a "Short Version" that plays Verse 1 → Chorus → Verse 2 → Chorus, or a "Full" version that adds the bridge and a final chorus. One song can hold several arrangements; **repeats are allowed** (you can play the chorus as many times as the band does). Applying an arrangement re-orders the song's slides without changing the underlying lyrics.

### The Arrangement Editor

**What it does.** A two-column editor: on the left, a palette of **all the song's sections**; on the right, the **draft order** you're building. Tap sections to append them, drag to re-order, name the result, and save it.

**How to get there:**
- **Cue-row menu ▸ Arrangement** submenu — pick an existing arrangement to apply it, or choose **Manage Arrangements…** (or **New Arrangement…** if none exist yet) to open the editor. *(both)*
- **Windows also:** *Editors ▸ Arrangements* opens the editor for the selected song cue.

**Using it:**

| Area | What it does |
|---|---|
| **SECTIONS (TAP TO ADD)** *(left)* | Every section of the song, each with its colour dot, label, and a lyric preview. **Tap a section (the `+`) to append it** to the order. Tap the same section again to repeat it. |
| **ORDER (n)** *(right)* | The draft sequence you're building. **Drag rows to re-order.** The count updates as you add. When empty it prompts: *"Tap sections on the left to build the order. Repeats are allowed."* |
| **Arrangement name** | A name for this arrangement, e.g. *"Short Version."* Required before you can save. |
| **Save Arrangement** | Saves the named arrangement onto the song. *(macOS shows **Update** when you're editing an existing one.)* |
| **Clear** | Empties the draft order to start over. |
| **SAVED ARRANGEMENTS** | Chips for each saved arrangement — click a chip's name to load it for editing, or its **×** to delete it. |

### Applying an arrangement (and natural order)

**How to get there.** From the **cue-row ▸ Arrangement** submenu, choose the arrangement you want. To return to the song's original section order, choose **Default** *(Windows)* — the built-in "natural order" that plays sections as they were authored. Selecting Default clears the active arrangement (internally, applying an **empty** arrangement id = natural order). *(both — macOS labels the natural-order choice as the un-set/none option in the same submenu.)*

> **Platform note — how order is stored.** macOS stores an arrangement as a list of **slide IDs**; Windows stores it as a list of **slide indices**. The result is identical to you as a user — the same sections in the same order.

---

## The Reflow editor

**What it does.** **Reflow** is an in-place lyric editor for a **song cue**. Use it to fix a typo, re-line a verse, or adjust how lyrics are split across slides **without** rebuilding the song from scratch. It's the practical way to edit a song that's already in your running order — and on Windows it's the main path for editing song lyrics after creation.

**How to get there:**
- **Edit workspace header ▸ Reflow…** (see below). *(both)*
- Available on **song cues only** — cues that aren't songs don't have lyric reflow.

Changes you make in Reflow apply to the song cue you're editing.

---

## The Edit workspace & Slide Grid

**What it does.** The **Edit workspace** is a **non-destructive** editing view: a cue list beside a slide grid, where you can rework slides **without moving the live cursor**. Nothing you do here changes what's currently on the audience screen — it's a safe place to prepare and tidy songs mid-service.

**How to get there:**

| | macOS | Windows |
|---|---|---|
| Shortcut | **⌘3** | **Ctrl+3** |

The workspace header offers three actions for the selected cue: **Reflow…**, **Slide Grid…**, and **Edit Cue…**.

### The Slide Grid

**What it does.** A grid of a song's slides, rendered as thumbnails, for reviewing the whole song at once and jumping to any slide.

> **Platform difference — Slide Grid.**
> - **macOS:** an **inline grid** inside the Edit workspace with an adjustable **1–6 columns** (via the column-count control) and **placeholder** thumbnails, plus run-sheet PVW/PGM tiles. *(macOS)*
> - **Windows:** a **modal Slide Grid dialog** (*Slide Grid…*) that renders **real 16:9 theme thumbnails** — actual previews styled with the cue's theme — in a **fixed 3-column** layout. **Click a thumbnail to take that slide live.** *(Windows)*

Because the Windows grid paints true themed thumbnails, it's a faithful preview of what each slide will look like on the audience screen; the fixed three columns are not adjustable.

### Editing individual song slides

For song lyrics, prefer **Reflow** (above) — it understands sections and re-lining. The generic per-slide controls (enable/disable a slide, label colour, apply theme, background media, scaling) are shared with all cue kinds and are documented under [Building a Service ▸ Slides](02-service-and-cues.md#slides), including the macOS-only per-slide options (per-cue transitions, background layer scoping, per-slide media binding).

---

## Quick reference

| Task | macOS | Windows |
|---|---|---|
| New song | ⌘N — *File ▸ New Song…* | Ctrl+N — *File ▸ New Song…* |
| Edit a song's words | New Song sheet in edit mode (*Edit Song…*) or Reflow | Reflow / library CRUD *(New Song is create-only)* |
| Add a section to a plan | Library `+` / drag | Library `+` / right-click |
| Build an arrangement | Cue-row ▸ Arrangement ▸ Manage Arrangements… | Cue-row ▸ Arrangement ▸ Manage Arrangements…, or *Editors ▸ Arrangements* |
| Return to natural order | Arrangement ▸ (none/Default) | Arrangement ▸ **Default** |
| Reflow lyrics | Edit workspace ▸ Reflow… | Edit workspace ▸ Reflow… |
| Edit workspace | ⌘3 | Ctrl+3 |
| Slide Grid | Inline, 1–6 columns, placeholders | Modal dialog, real thumbnails, fixed 3 columns |
