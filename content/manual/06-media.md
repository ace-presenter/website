# Media

Everything you show that isn't a song or a scripture passage — background photos, motion loops, video clips, worship-bed audio, and imported slide decks (PowerPoint, Keynote, PDF) — lives in the **media bin** along the bottom of the window. This chapter covers finding and organizing media in folders, playlists and smart playlists, sending it live as foreground or background, playing video and audio, importing decks and whole ProPresenter libraries, pulling in free stock imagery, ACE's own file formats, and the **Documents ▸ ACE Presenter** folder.

For styling what sits *on top of* media (lower thirds, logos, translation bands), see [Themes, Looks & Overlays](07-themes-looks-overlays.md). For choosing *which screen* media lands on, see [Outputs & Screens](08-outputs-and-screens.md). To drive video playback from your phone, see [The Phone Remote](10-remote-control.md).

> **Tier note.** Image and video playback are **Pro** features. On the Free tier you can build and organize a library, but sending image/video content to the audience output is gated. See [Getting Started ▸ Accounts & Tiers](01-getting-started.md#accounts--tiers).

---

## The media bin

**What it does.** The media bin is the persistent home of all imported media. It filters by kind, searches, marks favorites, tags with colors, and is where you click to send media live.

**How to get there.** The bin sits along the bottom of the main window. Toggle it with **⌘M / Ctrl+M** (*Workspace ▸ Toggle Media Tray*), or click the chevron to collapse it to its header.

- **Collapse / expand** *(both)* — the chevron.
- **Drag to resize** *(both)* — drag the bin's top edge; it can be 140 to 280 points (pixels on Windows) tall, and the height is remembered.

### Kind tabs

Across the top of the bin are five kind tabs that filter the library and show a live count: **PHOTO**, **VIDEO**, **MOTION**, **AUDIO**, **SLIDES**. *(both)* Clicking a tab only filters — it no longer folds the bin away.

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

- Click **+ ADD FILES** in the bin, or **drop files and folders** onto it from Finder / File Explorer. *(both)*
- **macOS:** also **⇧⌘I** (Add Files).
- **Windows:** there is no add-files shortcut; **Ctrl+I** opens the [Import Wizard](#the-import-wizard) instead.

**Supported formats.**

| Kind | macOS | Windows |
|---|---|---|
| **Images** | jpg, png, heic, tiff, gif, bmp, webp | jpg, png, heic, tiff, gif, bmp, webp |
| **Video** | mp4, mov, m4v | mp4, mov, m4v, avi, mkv, webm, wmv |
| **Audio** | mp3, wav, m4a, flac, aac | mp3, wav, m4a, flac, aac |
| **Decks** | pptx, ppt, key, pdf | pptx, ppt, ppsx, pps, pdf, odp, otp |

### Search

**What it does.** The search box narrows the current view by name.

- **macOS** matches both the file **name and its color-tag names**.
- **Windows** matches the **name only** — tag search is *(macOS only)*.

### Favorites and Recents

Hover an item and click the star overlay to favorite it; the **Favorites** row in the playlist sidebar lists them. **Recents** lists the media you presented most recently, newest first — macOS keeps the last **20**, Windows the last **30**. *(both)*

### Color tags

**What it does.** Assign one of six colors as a corner dot to group assets visually (e.g. all pre-service loops in blue).

**Options.** None / Red / Yellow / Green / Blue / Purple, set from the item's right-click menu. *(both)* On macOS, tag names are also searchable (see [Search](#search)).

### Scaling

**What it does.** Controls how an asset fills the frame when it goes live.

**Options.** Right-click ▸ **Scaling**: **Scale to Fit**, **Scale to Fill**, **Stretch to Fill**, **Scale + Blur**. Defaults: **video → Fill**, **photo and deck → Fit**. *(both)*

### Grid / list view and zoom

**What it does.** Toggle between a thumbnail grid and a compact list, and adjust thumbnail size with the zoom slider. *(both)* macOS remembers your grid/list choice and zoom level; Windows resets them at each launch.

### Missing files and relinking

**What it does.** If a source file has moved, been deleted, or lives on an unplugged drive, its tile shows a red **MISSING** badge. **Click the missing tile** to open **Locate Missing File** and point ACE at it — other missing files from the same folder are reconnected at the same time (*"Reconnected N files"*). *(both)*

- **macOS** also offers *Preferences ▸ General ▸ Relink Missing Media* and **Add folder…** (search paths ACE looks through for moved files).

### Deleting media

Select media and press **Delete**: ACE asks *"Delete “…” from the media bin?"* — **Return** confirms, **Esc** cancels. *(macOS only — on Windows use the item's right-click menu.)*

---

## Media playlists, folders and smart playlists

**What it does.** Organise media the way you would in ProPresenter. The **PLAYLISTS** sidebar beside the bin holds three built-in views — **All**, **Favorites** and **Recents** — plus your own: *(both)*

| Kind | What it is |
|---|---|
| **Playlist** | A named, ordered group of media — a "Pre-Service" set, a "Communion" set. |
| **Playlist folder** | Groups playlists, e.g. one folder per series. |
| **Smart playlist** | Shows whatever is in a folder on your computer (subfolders included) and keeps itself up to date — add a file to that folder and it appears within a few seconds. |

**How to get there.** The **+** at the top of the sidebar offers **New Playlist**, **New Playlist Folder** and **New Smart Playlist…** (which asks for the folder to watch). Right-click a smart playlist for **Smart Playlist Behavior**, **Open File Location**, **Change Folder…**, **Rename** and **Delete**.

**Adding to a playlist.** **Drag** an asset onto a playlist (dragging from *All* copies it; dragging within a playlist reorders it). *(both)* Windows also has right-click ▸ **Add to Playlist** / **Remove from Playlist**.

### Foreground or Background

Each picture or video in a playlist goes live on one of two layers: *(both)*

- **Background** — sits behind the slide text (lyrics over a motion loop).
- **Foreground** — fills the screen in front of the slide.

Choose per item with right-click ▸ **Layer** ▸ **Background** / **Foreground**, or for a whole smart playlist with **Smart Playlist Behavior**. Media sent from outside a playlist goes to the background. What's on screen is marked on its tile: **LIVE**, **BG** (playing as the background) or **PLAYING**.

### When a video ends

Right-click a video ▸ **When Video Ends**: **Loop**, **Hold Last Frame**, **Black After Last Frame**, **Clear After Last Frame**, **Fade to Black**, **Fade to Clear**. A separate **Loop** choice (**Loop** / **Play once** / **Default**) sets whether it repeats. *(both)*

> **Windows:** *Fade to Black* and *Fade to Clear* cut rather than fade for now *(Windows: fade not yet available)*.

### Play-through (walk-in loops)

Right-click a playlist ▸ **Play Through** to let it run on its own: **Off — wait for me**, **In Order** or **Shuffle**. With play-through on, the same menu offers **Start Again After the Last**, **Show Each Picture For** ▸ *N seconds*, and **Start Playing** / **Stop Playing**. A playlist that plays through shows the tooltip *"Plays through on its own."* *(both)*

### Starting a playlist from a slide

Right-click a slide ▸ **Start Media Playlist** ▸ a playlist (or **None**): when that slide goes live, the playlist starts — handy for a welcome slide that kicks off the walk-in loop. *(both — on Windows, from the Cue Plan's slide grid)*

---

## Presenting media

**What it does.** Sends the selected media to your outputs.

**How to get there / options.**

- **Single-click** a picture or video to send it live on its layer — the background, or the foreground if its playlist says so. Clicking a deck page takes it live. *(both)*
- **Double-click** sends a picture or video to the program screen as a cue. *(both)*
- **Audio** — clicking an audio file **plays it** on its own player; clicking it again stops it. *(both)* On macOS the track is also listed in the running order, like a video sent live.
- ⌘-click / Ctrl-click and ⇧-click select several items. *(macOS)*
- Windows' right-click menu also offers **Send to Background**, **Send Live** and **Clear Background**.

---

## Video playback and transport

**What it does.** One shared player drives every output, so the audience screen, the stage and the network feeds stay in sync. *(both)*

- **Transport** — while a video is live, play/pause, a scrub bar, elapsed/remaining time, loop and mute controls appear for the operator (macOS: on the clip; Windows: under the **PROGRAM** monitor). *(both)*
- **Space** toggles play/pause of the live video. *(both)*
- The **PROGRAM** monitor shows the moving video. *(both)*
- From your phone, the remote can also play, pause, stop and restart the clip — see [The Phone Remote](10-remote-control.md).

### Audio player

When an audio file from the bin is playing, an **audio transport bar** appears under the program monitor — play/pause, a scrub bar with elapsed and remaining time, and **Stop**. *(both)* Audio attached to a cue plays too.

---

## Video thumbnails and poster frames

**What it does.** ACE grabs a frame (around the 1-second mark) to represent each video in the bin, plus a duration chip and an audio badge. *(both)*

- **macOS** generates thumbnails in memory and does not persist them.
- **Windows** generates a 640-px-wide poster frame and **saves it** (under the app's `thumbs` folder) along with the clip's **duration**, so both survive a restart.

---

## Slide-deck import (PPTX / PDF / Keynote → pages)

**What it does.** Imports a presentation deck and turns it into a series of presentable page images, shown as a single entry on the **Slides** tab with a **page-count chip**.

**How to get there.** Add a deck like any other file (**+ ADD FILES** / [Import Wizard](#the-import-wizard)).

**Requirements and behavior.**

| | macOS | Windows |
|---|---|---|
| **PDF** | Rendered natively — no external tool | Rendered natively — no external tool |
| **PPTX / PPT / Keynote / ODP** | Uses **LibreOffice** (`soffice`) to convert to pages | Uses **LibreOffice** (`soffice`) to convert to pages |
| **PPTX without LibreOffice** | Falls back to a **native PowerPoint text importer** (extracts slide text) | **No pages** — ACE says to install LibreOffice *(Windows: no fallback yet)* |
| **When pages are built** | On demand at present-time | At import-time, cached under the app's `decks` folder |

> **LibreOffice is required for non-PDF decks on both editions** and is **not bundled** (~600 MB). Install it first if you present PowerPoint or Keynote files. See [Appendix C — External Dependencies](appendix-c-dependencies.md).

---

## The Import Wizard

**What it does.** A guided, four-stage importer — **Source → Preview → Import → Summary** — for songs, services, themes, slides and media, including whole ProPresenter libraries.

**How to get there.** *File ▸ Import ▸ File…* (**⌘I / Ctrl+I**). Add files with **Add files…**, or **drop files or whole folders** onto the window — a plain folder is opened up into the files inside it. *(both)* Windows also has an **Add ProPresenter folder…** button.

**What it takes.**

| Format | macOS | Windows |
|---|---|---|
| ACE files (`.acesong`, `.acePlaylist`, `.aceTheme`) and an ACE Presenter folder | ✅ | ✅ |
| ProPresenter 7 (`.pro`), playlists (`.proPlaylist`), themes, a ProPresenter home folder | ✅ | ✅ |
| ProPresenter 6 and earlier (`.pro6`, `.pro5`, `.pro4`) | ✅ | *(Windows: not yet available)* |
| SongSelect lyrics files (`.txt` with the CCLI footer) | ✅ | ✅ |
| ChordPro (`.chordpro`, `.cho`) and plain-text lyrics | ✅ | *(Windows: not yet available)* |
| Decks (PowerPoint, Keynote, PDF) | ✅ | ✅ |
| Images and video (into the media bin) | ✅ | ✅ |
| Bible files (MyBible, OSIS, Zefania) | ✅ | — (not sideloaded on Windows; see [Scripture](04-scripture.md#translations)) |

Anything Windows doesn't take yet is listed in the Summary as skipped, rather than half-imported.

### Bringing a ProPresenter library across

Point the wizard at your ProPresenter home folder, or drop in a `.proPlaylist`. ACE brings in themes, songs (library-only songs go to the Library) and services: **each ProPresenter playlist becomes its own service template**, named after it and keeping its order, and running the import again doesn't create duplicates. *(both)*

**Media and Audio bins.**

- **macOS** keeps the bins' shape: playlist folders, playlists in order, and smart playlists still watching the same folders, for the Media bin and the Audio bin (under an *Audio Bin* folder). A file that can't be found stays in its place, marked **MISSING**, ready to [relink](#missing-files-and-relinking).
- **Windows** brings bin media across, but flattens folders into names such as *"Folder / Playlist"*, doesn't recreate smart playlists, and lists missing files in the Summary instead of keeping placeholders *(Windows: full bin structure not yet available)*.

---

## Stock media (Pixabay)

**What it does.** Searches the Pixabay stock library (**Images** and **Videos**) and downloads straight into your media bin. *(both)*

**How to get there.** *Output ▸ Stock Media (Pixabay)…* (macOS) / *Output ▸ Stock Media…* (Windows), also in the **EDITORS** pop-up on macOS.

**Requirements.** A **Pixabay API key**.
- **macOS:** uses the key built into the app.
- **Windows:** enter it in **Preferences ▸ Integrations ▸ Pixabay** (or set the `ACE_PIXABAY_KEY` environment variable). The key is stored in your user settings, not a credential vault.

**Options.** Windows offers four search presets — **Backgrounds**, **Worship**, **Nature**, **Abstract**.

---

## ACE files and the ACE Presenter folder

### ACE's own files

ACE saves to three file types of its own, with the ACE icon, identical on macOS and Windows: *(both)*

| File | Holds |
|---|---|
| **`.acesong`** | One song — lyrics, sections, arrangements, credits |
| **`.acePlaylist`** | A service (running order), with the songs and media it uses packed inside |
| **`.aceTheme`** | A theme, with its pictures packed inside |

**Double-click** an ACE file to bring it into ACE, or drop it on the Import Wizard. Licensed Bible text is always left out of these files.

### Documents ▸ ACE Presenter

ACE keeps a folder in your Documents — **ACE Presenter** — for files you can see and copy: *(both)*

| Folder | Contents |
|---|---|
| **Libraries/Default** | Songs (`.acesong`) |
| **Playlists** | Services (`.acePlaylist`) |
| **Themes** | Themes (`.aceTheme`) |
| **Media/Assets** | Media unpacked from ACE packages |
| **Stage**, **Configuration** | Stage layouts and settings exports |
| **Inbox** | Drop files here to have ACE import them (below) |

Your live show itself stays in ACE's application-support folder; this folder is for exports, backups and the Inbox. *File ▸ Export ▸ Show ACE Presenter Folder* opens it.

### The Inbox

Drop files into **Documents ▸ ACE Presenter ▸ Inbox** and ACE takes them in by itself while it runs — no import step. It waits until a file has finished copying, skips files that haven't changed, and picks up anything dropped while ACE was closed at the next launch. **Saving the same file again updates what it brought in instead of adding a duplicate**; deleting a file from the Inbox leaves what it brought in alone. *(both)*

- **macOS:** takes songs (including SongSelect and ChordPro files), services, themes, media and ProPresenter files.
- **Windows:** takes ACE files, ProPresenter files and media.

### Exporting and backing up

*File ▸ Export*:

| Item | What it does |
|---|---|
| **Presentation…** (⇧⌘E / Ctrl+Shift+E) | Saves the whole show as one file (licensed scripture text removed). |
| **Current Service as ACE Playlist…** | Saves the running order as an `.acePlaylist`, songs and media inside, into *Playlists*. |
| **Back Up Library to Documents** | Writes every song, theme and service template, plus the current running order, into *Documents ▸ ACE Presenter*. |
| **Show ACE Presenter Folder** | Opens the folder. |
| **Captions…** | *(macOS only)* Exports captions. |

---

## How media is stored

**What it does.** The **Manage media automatically** setting (default **ON**, *Preferences ▸ General*) copies every import into ACE's own media folder, so a show doesn't break when the original file is moved, deleted, or on a drive that gets unplugged. With it **off**, ACE references the original file paths in place.

- **macOS** copies into `~/Library/Application Support/ACE/Media` with a UUID filename prefix.
- **Windows** copies into the app's `media` folder under AppData, keeping the original filename.
