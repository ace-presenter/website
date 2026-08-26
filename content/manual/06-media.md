# Media

Everything you show that isn't a song or a scripture passage — background photos, motion loops, video clips, worship-bed audio, and imported slide decks (PowerPoint, Keynote, PDF) — lives in the **media library** and is reached through the **media tray** along the bottom of the window. This chapter covers finding and organizing media, grouping it into playlists, sending it live, playing video, importing decks and other files, pulling in free stock imagery, and how ACE stores your media on disk.

For styling what sits *on top of* media (lower-thirds, logos, translation bands), see [Themes, Looks & Overlays](07-themes-looks-overlays.md). For choosing *which display* media lands on, see [Outputs & Screens](08-outputs-and-screens.md). To drive video playback from your phone, see [The Phone Remote](10-remote-control.md).

> **Tier note.** Image and video playback are **Pro** features. On the Free tier you can build and organize a library, but sending image/video content to the audience output is gated. See [Getting Started ▸ Accounts & Tiers](01-getting-started.md#accounts--tiers).

---

## The media tray

**What it does.** The media tray is the persistent bin of all imported media. It filters by kind, searches, marks favorites, tags with colors, and is where you double-click to go live.

**How to get there.** The tray sits along the bottom of the main window. Toggle it with **⌘M / Ctrl+M**, or click the chevron / the **MEDIA** header to collapse and expand it.

- **Collapse / expand** *(both)* — chevron or the **MEDIA** title bar.
- **Drag to resize** *(macOS only)* — drag the tray's top edge between 140 and 280 pt; the height is remembered. On Windows the tray is a **fixed 140 px** and cannot be resized.

### Kind tabs

Across the top of the tray are five kind tabs that filter the library and show a live count. The default tab is **Photo**.

| Tab | Shows |
|---|---|
| **Photo** | Still images |
| **Video** | Video clips |
| **Motion** | Looping motion backgrounds |
| **Audio** | Music / sound beds |
| **Slides** | Imported decks (PPTX / PDF / Keynote), one entry per deck |

> **Motion is never auto-assigned** *(both).* Importing a video file lands it under **Video**, not **Motion**. The **Motion** tab only lists assets that were authored/tagged as motion loops externally — it will look empty if you have only imported ordinary clips.

### Adding files

**How to get there.**

- Click **+ ADD FILES** in the tray *(both)*.
- **macOS:** also **⇧⌘I** (Add Files).
- **Windows:** there is no add-files shortcut; **Ctrl+I** opens the [Import Wizard](#the-import-wizard) instead.

**Supported formats.**

| Kind | macOS | Windows |
|---|---|---|
| **Images** | jpg, png, heic, tiff, gif, bmp, webp, mpg, mpeg | jpg, png, heic, tiff, gif, bmp, webp |
| **Video** | mp4, mov, m4v | mp4, mov, m4v, avi, mkv, webm, wmv |
| **Audio** | mp3, wav, m4a, flac, aac | mp3, wav, m4a, flac, aac |
| **Decks** | pptx, ppt, key, pdf | pptx, ppt, ppsx, pps, pdf, odp, otp |

### Search

**What it does.** The search box narrows the current view by name.

- **macOS** matches both the file **name and its color-tag names**.
- **Windows** matches the **name only** — tag search is *(macOS only)*.

### Favorites

**What it does.** Star an asset to pin it and filter to just your go-tos.

**How to get there.** Hover an item and click the star overlay to favorite it. Use the **Show favorites only** star toggle in the tray header to filter, or the **Favorites** row in the rail. *(both)*

### Recents

**What it does.** A rolling list of the media you presented most recently, newest first, reachable from the **Recents** rail row.

- macOS keeps the last **20**; Windows keeps the last **30**.
- **Windows quirk:** the Recents rail badge is currently hardcoded to show **0** even when items are present — the list itself is correct; only the badge count is wrong.

### Color tags

**What it does.** Assign one of six colors as a corner dot to group assets visually (e.g. all pre-service loops in blue).

**Options.** None / Red / Yellow / Green / Blue / Purple, set from the item's right-click menu. *(both)* On macOS, tag names are also searchable (see [Search](#search)).

### Scaling / fit

**What it does.** Controls how an asset fills the frame when it goes live.

**Options.** Fit / Fill / Stretch / Scale + Blur. Defaults: **video → Fill**, **photo and deck → Fit**.

- **macOS** re-applies a scaling change to the **live** asset instantly.
- **Windows** applies the change on the **next** time the asset is promoted.

### Grid / list view and zoom

**What it does.** Toggle between a thumbnail grid and a compact list, and adjust thumbnail size with the zoom slider. *(both)*

- **macOS** remembers your grid/list choice and zoom level.
- **Windows** does not persist these between sessions.

### Missing-file handling

**What it does.** If a source file has moved, been deleted, or lives on an unplugged drive, its thumbnail shows a red **MISSING** badge. *(both)*

- **macOS only:** relink via configured search paths, and a **clean-up-unlinked-media** action to purge entries whose files are gone. On Windows there is no relink or clean-up tool — use **Reveal** to locate the file, then re-add it.

---

## Media playlists

**What it does.** Playlists are named, ordered groups of media — a "Pre-Service" set, a "Communion" set — alongside three built-in virtual lists: **All**, **Favorites**, and **Recents**.

**How to get there.** The playlist rail runs down the side of the tray. Create, rename, and delete playlists from the rail; the virtual lists are always present.

**Options / adding to a playlist.**

- **macOS:** **drag** an asset onto a playlist to add it; drag between playlists to move it. Each playlist item can also carry **per-item overrides** — a **Layer** choice (background / foreground) and a **Fit** override — that apply only within that playlist.
- **Windows:** right-click an asset and choose **Add to Playlist**. There is **no drag-to-add**, and **no per-item Layer/Fit overrides** — those are *(macOS only)*.

---

## Presenting media

**What it does.** Sends the selected media to your outputs.

**How to get there / options.**

- **Double-click = go live** *(both):*
  - Photo or deck page → an **image cue**.
  - Video or motion → a **video cue** (motion loops and plays muted).
  - Audio → plays with **no visual** change.
- **Single-click = set as a persistent background layer** *(macOS only).* On Windows a single click only **selects** the item — there is no single-click-to-background equivalent.
- **Delete an asset:** **⌫** or **⌘⌫** (macOS) / **Delete** (Windows).

---

## Video playback and transport

This is the largest single difference between the two editions — read the badges carefully.

**macOS** *(both playback and operator transport):*
- One shared player drives **all** outputs at once, so audience, stage, and preview stay in sync.
- An **on-clip transport overlay** gives play/pause, a scrub bar, an audio meter, and mute directly on the clip.
- **Spacebar toggles play/pause** app-wide.
- Live, moving video appears in the **dashboard preview**.

**Windows** *(playback only — see caveats):*
- Video plays in the **live output window** (audio is on the output window too).
- **No local operator transport UI.** Play/pause/scrub/seek is **remote-driven only** — you control transport from [the phone remote](10-remote-control.md), not from the desktop app. *(Windows: not yet available on the desktop.)*
- The **dashboard preview shows a still frame** (a poster image or a "▶ VIDEO" placeholder), not live decoded video. Live in-app preview is a later phase. *(Windows: not yet available.)*

> **In short:** on Windows, once a video is live you steer it from your phone; the desktop shows a still poster where macOS shows the moving clip.

---

## Video thumbnails and poster frames

**What it does.** ACE grabs a frame (around the 1-second mark) to represent each video in the tray, plus a duration chip and an audio badge. *(both)*

- **macOS** generates thumbnails in memory and does not persist them.
- **Windows** generates a 640-px-wide poster frame, **saves it** (under the app's `thumbs` folder) along with the clip's **duration**, so both survive a restart.

---

## Slide-deck import (PPTX / PDF / Keynote → pages)

**What it does.** Imports a presentation deck and turns it into a series of presentable page images, shown as a single entry on the **Slides** tab with a **page-count chip**.

**How to get there.** Add a deck like any other file (**+ ADD FILES** / [Import Wizard](#the-import-wizard)).

**Requirements and behavior.**

| | macOS | Windows |
|---|---|---|
| **PDF** | Rendered natively (PDFKit) — no external tool | Rendered natively (QPdfDocument) — no external tool |
| **PPTX / PPT / Keynote / ODP** | Uses **LibreOffice** (`soffice`) to convert to pages | Uses **LibreOffice** (`soffice`) to convert to pages |
| **PPTX without LibreOffice** | Falls back to a **native PowerPoint text importer** (extracts slide text) | **Yields 0 pages** — no fallback |
| **When pages are built** | On demand at present-time (async, temp dir) | At import-time, cached under the app's `decks` folder |

> **LibreOffice is required for non-PDF decks on both editions** and is **not bundled** (~600 MB). Install it first if you present PowerPoint or Keynote files. On Windows, importing a PPTX without LibreOffice installed produces an empty deck (0 pages); on macOS you still get the slide text via the native fallback. See [Appendix C — External Dependencies](appendix-c-dependencies.md).

---

## The Import Wizard

**What it does.** A guided, four-stage importer — **Source → Preview → Import → Summary**.

**How to get there.** **⌘I / Ctrl+I**.

- **macOS:** auto-detects and dispatches **many** file kinds — ProPresenter 6/7, ChordPro, plain text, PPTX, PDF, Keynote, Bible formats (OSIS, Zefania, MyBible, OpenSong), images, and video — and supports working **drag-and-drop** into the wizard.
- **Windows:** the wizard **completes decks only** (plus nominal ChordPro / presentation handling). Other kinds are listed as **"support pending"**, and the drop zone ("Drop files here, or use Add files…") is **static — drag-and-drop is not functional yet**. *(Windows: not yet available)* for non-deck formats. To bring in ordinary images, video, and audio on Windows, use **+ ADD FILES** in the tray instead.

---

## Stock media (Pixabay)

**What it does.** Searches the Pixabay stock library and downloads images (and, on macOS, video/motion) straight into your media library.

**How to get there.** **Output ▸ Stock Media…**

**Requirements.** A **Pixabay API key** is required.
- **macOS:** enter it under **Preferences ▸ Integrations**.
- **Windows:** set it in settings (`stock/pixabayKey`) or via the `ACE_PIXABAY_KEY` environment variable.

**Options.** Search images or video, then download to the library. macOS offers **7 presets** (including motion/video); Windows offers **4 image presets**.

> Pixabay keys on Windows are stored in your user settings in plain text (not a credential vault). See [Appendix C — External Dependencies](appendix-c-dependencies.md).

---

## How media is stored

**What it does.** The **Manage media automatically** setting (default **ON**) copies every import into ACE's own media folder, so a show doesn't break when the original file is moved, deleted, or on a drive that gets unplugged. With it **off**, ACE references the original file paths in place.

**How to get there.** **Preferences / Settings** (see [Preferences](11-preferences-shortcuts.md)).

- **macOS** copies into `~/Library/Application Support/ACE/Media` with a UUID filename prefix.
- **Windows** copies into the app's `media` folder under AppData, keeping the original filename.
