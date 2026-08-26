# Building a Service: Cues & Running Order

This chapter covers the heart of ACE Presenter: assembling your order of service out of **cues**, arranging them into a **running order**, grouping them with **service plans**, and driving them **live** during the service. It also covers **blank/clear**, **per‑cue auto‑advance**, and the **Go On Air** service‑run mode with its scheduled auto‑start and speaker timer.

Song authoring (lyrics, sections, arrangements) is covered in [Songs & Arrangements](03-songs-and-arrangements.md); presenting scripture is in [Scripture](04-scripture.md); the deep slide editor and the Edit workspace slide grid are in [Songs & Arrangements](03-songs-and-arrangements.md) and [Outputs & Screens](08-outputs-and-screens.md). This chapter cross‑links to those where the topics touch.

> **Reading conventions.** Shortcuts are written **macOS ⌘X / Windows Ctrl+X**. Status badges: *(both)*, *(macOS only)*, *(Windows: not yet available)*, *(build‑dependent)*. See the manual [README](README.md#how-to-read-this-manual) and the [Platform Differences appendix](appendix-a-platform-differences.md).

---

## Concepts: cues, slides, and the running order

A **service** in ACE Presenter is an ordered list of **cues**. Each cue is one item in your order of service — a song, a scripture reading, a sermon block, an announcement loop, a video, and so on. A cue holds:

- a **title**,
- a **kind** (which drives its default look and behavior),
- one or more **slides** (the individual screens the cue can send live), and
- optional settings such as auto‑advance, an arrangement, a theme, and — where a switcher is configured — an ATEM video‑switcher trigger.

The **running order** is the top‑to‑bottom sequence of cues, shown in the left‑hand **Cue Plan** sidebar. Going live means selecting a cue and sending one of its slides to your outputs; **Next/Previous** then walk through that cue's slides and across cue boundaries.

**Slides** are the atomic unit of what appears on screen. A cue's slides can be lyrics, scripture verses, an image, a video, or a blank. Slides carry a couple of per‑slide properties (skip/disable and a label color) described under [Slides](#slides) below.

> The Windows edition's document model is a deliberate "pragmatic subset" of the macOS model. Most differences in this chapter trace back to that: fewer cue kinds, no cross‑reference song library link, and a smaller set of per‑slide/per‑cue options. macOS is the reference edition; where the two differ, macOS is authoritative.

---

## Cues and the running order

### The Cue Plan sidebar

**What it does.** Lists every cue in the service, in order, and is where you reorder, edit, and take cues live.

**How to get there.** The **Cue Plan** sidebar is present in the Cue Plan workspace (⌘1 / Ctrl+1) on the left. The workspace header reads **RUN SHEET**; the top of the sidebar carries the service‑run bar (see [Go On Air](#the-go-on-air-service-run-mode)).

**Take a cue live.** Single‑click a cue row to take it live (see [Going live](#going-live-pvw-pgm-and-take)).

### Cue kinds

A cue's **kind** sets its default styling and how ACE treats it (for example, scripture cues resolve against the scripture theme template; announcement cues are typically rolling slides on auto‑advance). You choose the kind in the [New Cue dialog](#the-new-cue-dialog).

**macOS: 10 kinds.** *(macOS only for the full set)*

| Kind | Typical use |
|---|---|
| Song | Worship lyrics (usually backed by a song from the library) |
| Scripture | A Bible passage |
| Sermon | Message / teaching blocks |
| Announcement | Rolling notices (often auto‑advanced) |
| Prayer | Prayer prompts |
| Offering | Giving slides |
| Video | A video clip cue |
| Timer | A countdown/hold slide |
| Lower Third | A lower‑third overlay cue |
| Custom | Anything else |

**Windows: 6 kinds.** The Windows model stores six kinds — **Song, Scripture, Media, Announcement, Sermon, Generic**. The Add/Edit Cue dialog still *offers* nine choices in its **KIND** menu (Announcement, Song, Scripture, Sermon, Prayer, Offering, Video, Timer, Custom), but several fold down on save:

| You pick (Windows) | Stored as |
|---|---|
| Song | Song |
| Scripture | Scripture |
| Sermon | Sermon |
| Announcement | Announcement |
| Video | **Media** |
| Prayer, Offering, Timer, Custom | **Generic** |

The practical effect: on Windows, Prayer/Offering/Timer/Custom cues all behave as **Generic**, and Video behaves as **Media**. *(Windows: reduced cue‑kind set)*

### Reordering cues

**What it does.** Changes the top‑to‑bottom order of the running order.

**How to get there.**
- **Drag and drop** a cue row up or down. *(both)*
- **Right‑click ▸ Move Up / Move Down.** *(Windows only)* — a keyboard/menu alternative to dragging. (Move Up is disabled on the first row; Move Down on the last.)

### Row actions (the cue context menu)

**What it does.** Per‑cue actions available from the row's context menu.

**How to get there.** Right‑click (or use the row's menu control) on a cue in the Cue Plan sidebar.

| Action | Platform | What it does |
|---|---|---|
| Go Live | both | Takes the cue live |
| Edit Cue… | both | Opens the [New/Edit Cue dialog](#the-new-cue-dialog) on this cue |
| Duplicate | both | Copies the cue into the order |
| Note | both | Attaches an operator note to the cue |
| Arrangement ▸ | both | Chooses a song arrangement for the cue (see [Songs & Arrangements](03-songs-and-arrangements.md)) |
| Delete | both | Removes the cue |
| Learn Timing… | Windows only | Tap‑to‑learn slide timing against a recording (see [Detection & Auto‑Follow](05-detection-ai.md)) |
| Assign to Plan ▸ | Windows only | Assigns the cue to a [service plan](#service-plans-templates) |

### Multi‑select and batch delete

**What it does.** Select several cues at once to delete them together.

**How to get there.** **⌘‑click / Ctrl‑click** to add individual cues to the selection, or **⇧‑click** to select a range, then delete. *(both)*

---

## Service plans (templates)

**What they do.** A **service plan** is a named grouping of cues — an order‑of‑service template such as "Sunday Morning" or "Midweek." Plans let you group the running order into collapsible, counted sections; cues not assigned to any plan appear under **"Unassigned" / "All Cues."** Applying a template reorders the running order to match. Service plans are also searchable from the [Command Palette](11-preferences-shortcuts.md#command-palette).

**How to get there.**
- **Create:** use the **"NEW SERVICE PLAN"** row at the top of the plan list. macOS shows an inline name field; Windows opens a name prompt. Creating a plan snapshots the current cue order into it.
- **Rename / Delete:** use the plan section's header menu.
- **Assign a cue to a plan:** drag the cue onto the plan section *(both)*, or on Windows use the cue row's **Assign to Plan ▸** submenu.
- **Apply a plan:** selecting/applying the template reorders the running order to that plan's sequence.

**Options.**
- Plan sections are **collapsible** and show a **cue count**.
- Cues can move between plans and the "Unassigned"/"All Cues" bucket.

> Cue kinds versus plans: a *kind* describes what one cue is; a *plan* describes how a set of cues is grouped and ordered. A single cue can belong to one plan at a time.

---

## Slides

**What they are.** The individual screens inside a cue. Slide **kinds** are **text, scripture, image, video,** and **blank**. A cue can mix slides (for example, a song cue is a sequence of text slides).

**Per‑slide properties.**

| Property | Platform | What it does |
|---|---|---|
| Disabled / skip | both | Marks a slide to be **skipped when going live** while keeping it in the cue for editing. Set from the Edit‑grid right‑click ▸ **Enable/Disable**. |
| Label color | both | A colored tag on the slide (from the Edit‑grid right‑click ▸ **Label color**). Section labels are auto‑colored too — verse = blue, chorus = green, bridge = orange (see [Songs & Arrangements](03-songs-and-arrangements.md)). |
| Media action (background/foreground media binding) | **macOS only** | Binds a slide to a specific background or foreground media asset. *(Windows: not yet available)* |
| Media fit | both (differs) | How media fills the slide. macOS offers **Fit / Fill / Stretch / Scale+Blur** (four modes); the Windows slide‑grid menu offers **Fill / Fit / Stretch** (Blur‑Fill exists in the model but is not exposed in that menu). |

**How slides relate to cues.** Going live sends **one slide** of the current cue to the outputs; **Next/Previous** step through the cue's (enabled) slides and then cross into the next/previous cue. Disabled slides are stepped over during live playback but remain editable.

**Editing slides.**
- **Edit a text slide:** the **"Edit Slide"** dialog (text slides only) edits the slide's section label and its lines.
- **Edit‑grid right‑click menu** offers: Edit, Enable/Disable, Label color, Apply Theme (to the cue), Background Media, Scaling, and Clear background. macOS additionally offers per‑cue **Transition**, **Layer (background/foreground)**, and **slide‑vs‑cue background scoping**. *(those three: macOS only)*
- Deeper slide‑grid work lives in the **Edit workspace** (⌘3 / Ctrl+3), which shows the cue list plus a slide grid and is **non‑destructive** (editing there does not move the live cursor). Its header offers Reflow…, Slide Grid…, and Edit Cue…. On macOS the Slide Grid is an inline grid (1–6 columns) with a run‑sheet PVW/PGM; on Windows it is a modal **Slide Grid** dialog with real 16:9 theme thumbnails in a fixed 3‑column layout where clicking a thumbnail takes it live. Full coverage is in [Songs & Arrangements](03-songs-and-arrangements.md) and [Outputs & Screens](08-outputs-and-screens.md).

---

## Going live: PVW, PGM, and Take

**What it does.** Sends cue content to your outputs. ACE distinguishes **preview** (what you're lining up) from **program** (what the audience sees).

**How to get there.**
- **Single‑click a cue row** in the Cue Plan sidebar to take it live. *(both)*
- **PVW** (preview) and **PGM** (program) tile buttons: **PVW** stages content to preview/stage only; **PGM** sends it to the audience. While a cue is live, the Cue Plan shows a **PREV / NOW / NEXT** confidence strip (the NOW slot carries a red **LIVE** badge), and a **NEXT UP** strip is pinned at the bottom.

**Next / Previous / Take.**

| Action | macOS | Windows |
|---|---|---|
| Next | **→** (no modifier) | **→**; the output window also accepts **Space** / **Page Down** |
| Previous | **←** (no modifier) | **←** |
| Take | **⌘Return** | *(no equivalent)* — use Next |

Next/Previous walk the current cue's enabled slides and then cross cue boundaries into the next/previous cue. On Windows the audience **output window** handles keys directly (arrows, Space, Page Down = next; **B** = blank; **Esc** = close); on macOS the audience window has no key handling of its own. See [Outputs & Screens](08-outputs-and-screens.md) for output‑window behavior.

---

## Blank and clear

Blanking hides output temporarily; clearing stops content on one or more layers. This is where macOS and Windows differ most within this chapter.

### Blank

**What it does.** Toggles a blank (black) output without losing your place in the cue.

**How to get there.**

| | macOS | Windows |
|---|---|---|
| Shortcut | **⌘B** | **B** |
| Menu / control | Output ▸ Clear‑area / **BLACK** button (toggles) | **BLACK** button (toggles); output window also **B** |

### Clear

**What it does.** Stops content. The scope of what "clear" affects differs by platform.

**macOS — per‑layer clear/restore.** *(macOS only)* macOS clears (and restores) individual layers independently: **slide**, **media**, **videoInput**, **props** (lower‑third), and **messages**, plus a distinct "unset cursor." The output control panel exposes:
- **TXT** — clears the slide (`.slide`) layer,
- **MEDIA** — clears media + video input,
- **L3** — clears the lower‑third / props layer,
- **ALL CLR** — clears everything and restores layers.

**Windows — single clear + Blank‑Scope.** Windows has a single `clear()` (stop all content) plus a **Blank‑Scope** selector (**CLEAR TARGETS**) that decides *which outputs* BLACK/CLEAR affect: **All / Audience / Stage**. There is **no per‑layer clear** on Windows; the LAYERS row's TXT simply toggles blank, MEDIA applies scoped per‑output media suppression, and ALL CLR clears everything. *(Windows: no per‑layer clear; per‑layer restore not yet available)*

> The output control panel (CLEAR / BLACK↔SHOW / LIVE / TAKE, CLEAR TARGETS, LAYERS, and the AUD/STG output toggles) is documented in full in [Outputs & Screens](08-outputs-and-screens.md#output-control-panel). This chapter covers only how blank/clear relate to running the service.

---

## Per‑cue auto‑advance

**What it does (macOS).** A cue can be set to **auto‑advance after N seconds** — once it goes live, a timer counts down and then automatically advances to the next slide/cue. On macOS the timer **actually fires** and calls Next; it is suppressed while the output is blank, while a quick‑screen message is showing, or while the service is **held**.

**How to get there.** In the [New/Edit Cue dialog](#the-new-cue-dialog), enable **"Auto‑advance after"** and set the seconds (Windows range: 1–300 s, default 10 s). The Cue Plan's order summary shows a count such as "*N items · M auto‑advance*," and cues with auto‑advance are listed under the **TIMERS** tab.

> **Windows: auto‑advance does not advance yet.** *(Windows: not yet available)* On Windows the countdown is **display‑only**. The stage display and the TIMERS tab show the countdown ticking down, but no timer calls Next — **slides do not actually advance**. The empty‑state text in the TIMERS tab even points you to set per‑cue "Auto Advance" seconds in the cue editor, but be aware that on Windows this only drives the on‑screen countdown, not automatic advancement. Do not rely on auto‑advance to run an unattended announcement loop on Windows; advance manually or via the phone remote.

---

## The Go On Air service‑run mode

**What it does.** A dedicated "run the service" mode that takes the whole order of service live from the top and tracks service state (idle → on air → held → ended). It lives in the **service‑run bar** at the top of the Cue Plan.

**How to get there.** The service‑run bar shows **GO ON AIR** before the service; once on air it shows **HOLD** (which becomes **RESUME** while held) and **END SERVICE**.

| Action | Button | macOS | Windows |
|---|---|---|---|
| Go on air (take from the top) | **GO ON AIR** | **⌃⌘G** | **Ctrl+Meta+G** |
| Hold / resume (suspends auto‑advance) | **HOLD** / **RESUME** | **⌃⌘H** | **Ctrl+Meta+H** |
| End service (clear live, back to pre‑service) | **END SERVICE** | **⌃⌘E** | **Ctrl+Meta+E** |

**Holding** freezes the run and suspends auto‑advance; **resuming** continues. **Ending** clears the live output and returns to the pre‑service state.

### Scheduled auto‑start

**What it does.** Arms an automatic **Go On Air** at a chosen time.

**How to get there.** Use the **Schedule…** control in the service‑run bar. Pick a date/time (Windows dialog: **Schedule On Air** ▸ **Set Auto‑start**). Once armed, the control shows a live **"Auto‑start m:ss"** countdown and fires **GO ON AIR** at zero (only if the service is still idle). Click the armed control again to cancel.

**Options / platform note.** macOS persists the schedule (date **and** plan). Windows keeps it **in memory** (time only) — it does not survive a relaunch and does not tie to a specific plan. *(Windows: schedule is not persisted)*

### Speaker timer

**What it does.** A countdown/count‑up timer for the person speaking, surfaced on the stage display.

**Options / platform note.** macOS provides a full **multi‑timer** engine; Windows provides a **single** speaker timer. *(Windows: single timer)* See [Outputs & Screens](08-outputs-and-screens.md) for how timers appear on the stage layout.

---

## The New Cue dialog

**What it does.** Creates a new cue (or edits an existing one) — title, kind, content, auto‑advance, and, when a switcher is configured, an ATEM video‑switcher trigger.

**How to get there.**
- **macOS:** New Cue is offered from the cue‑plan / Edit rails. The rail's **"Add Cue"** menu includes options such as **"Add Lower Third."**
- **Windows:** **File ▸ New Cue…**, or the rail's **"Add Cue"** button (which appends a blank **Generic** cue directly). Editing an existing cue via **Edit Cue…** opens the same dialog titled **Edit Cue**.

**Fields (Windows dialog).**

| Field | Notes |
|---|---|
| **TITLE** | Free text; defaults to "Untitled." |
| **KIND** | Announcement / Song / Scripture / Sermon / Prayer / Offering / Video / Timer / Custom (folds to 6 stored kinds — see [Cue kinds](#cue-kinds)). |
| **CONTENT TYPE** | **Text** ↔ **Scripture** segmented control; switching to Scripture also implies the Scripture kind. |
| **SLIDES (optional)** | Text mode: one slide per blank‑line‑separated block; lines within a block become slide lines. Empty = the title as a single slide. |
| **REFERENCE / TRANSLATION / VERSES** | Scripture mode: reference (e.g. "John 3:16"), translation (e.g. "KJV"), and verses (one per line, blank‑line‑separated for multiple slides). |
| **Auto‑advance after** | Toggle + seconds (1–300 s, default 10 s). *(On Windows this drives the countdown display only — see [Per‑cue auto‑advance](#per-cue-auto-advance).)* |
| **VIDEO SWITCHER** | Shown only when **ATEM is enabled in Preferences**: "Cut the ATEM to input" + input number; fires when the cue goes live. See [Streaming & Audio](09-streaming-and-audio.md). |

The dialog's footer buttons are **Cancel** and **Add Cue** (or **Save Cue** when editing). Editing preserves the cue's other fields (audio trigger, arrangements, theme, label color, operator note, target lanes, lyrics render mode) rather than rebuilding the cue from scratch.

> **Creating songs** (Title / Artist / Lyrics with auto‑split sections) uses the separate **New Song** dialog (**⌘N / Ctrl+N**), covered in [Songs & Arrangements](03-songs-and-arrangements.md). On macOS that sheet doubles as the song editor; on Windows it is create‑only (edit later via Reflow / the song CRUD).

---

## See also

- [Songs & Arrangements](03-songs-and-arrangements.md) — the song library, sections, arrangements, and lyric editing
- [Scripture](04-scripture.md) — presenting Bible passages and comparison
- [Detection & Auto‑Follow (AI)](05-detection-ai.md) — Learn Timing and automatic song/scripture following
- [Outputs & Screens](08-outputs-and-screens.md) — the output control panel, blank/clear controls, and the stage display
- [Preferences, Shortcuts & Menus](11-preferences-shortcuts.md) — the command palette and the full menu map
- [Platform Differences appendix](appendix-a-platform-differences.md) — the authoritative macOS ↔ Windows list
