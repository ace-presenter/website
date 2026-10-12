# Preferences, Shortcuts & Menus

This chapter is the reference for everything that sits *around* the presentation: the **Command Palette** (the fastest way to jump anywhere), the **Preferences/Settings** window (every pane, on both editions), and the **menu-bar map**. Keyboard shortcuts are summarised here and listed in full in [Appendix B — Keyboard Shortcuts](appendix-b-keyboard-shortcuts.md); this chapter keeps its shortcut coverage light and cross-links there.

Conventions used below (see [How to read this manual](README.md#how-to-read-this-manual)): shortcuts are given as **macOS ⌘X / Windows Ctrl+X**; status badges are *(both)*, *(macOS only)*, and *(Windows: not yet available)*.

---

## The Command Palette — ⌘K / Windows Ctrl+K

The Command Palette is a fuzzy, type-to-find launcher. Press **⌘K** (macOS) or **Ctrl+K** (Windows), start typing, and the results narrow as you go. On Windows it also lives on the menu bar at **View ▸ Command Palette**; on macOS it is keyboard-only.

**What it searches** *(both)*:

| You type… | It finds… | Enter does… |
|---|---|---|
| A cue title | Cues in the running order | Jumps to that cue |
| A song or media name | Songs in the library (and, on macOS, media in the bin) | Opens a preview |
| A service-plan name | Service plans / order-of-service templates | Applies the template (reorders the running order) |
| A theme (or Look) name | Themes, and — on macOS — Looks | Applies the theme / Look |
| A workspace name | Workspaces (Stage, Song, Edit, Bible, Looks, Cue Plan) | Switches workspace |
| A layout-preset name | Saved layout presets | Applies the preset |

**Navigating it:** type to filter, use **↑ / ↓** to move through results, **Enter** to run the highlighted item, **Esc** to dismiss.

**Platform note on what's indexed:** macOS indexes **Looks and themes separately**, so a Look and a theme with similar names both appear. The Windows palette (*"Search cues, library, looks, scenes…"*) lists themes but not saved Looks, and doesn't index media *(Windows: not yet available)*; it surfaces **explicit Service-Plan and Layout-preset entries** (General, Sermon, Conference, Stream, Custom). Both editions reach cues, songs, service plans, themes, workspaces, and presets.

---

## Preferences / Settings — ⌘, / Windows Ctrl+,

Open with **⌘,** (macOS: *ACE ▸ Settings…*) or **Ctrl+,** (Windows: *File ▸ Preferences…*).

- **macOS** shows **Account**, **General**, **Audio**, **Bible**, **ATEM** and **Hotkeys**; turning on **Show advanced** adds **Detection**, **Network**, **NDI** and **Updates** under an *ADVANCED* divider.
- **Windows** lists every pane in the table below, including three that macOS doesn't show at all (**ProPresenter**, **Linked Computers**, **Integrations**). On Windows, ProPresenter and Linked Computers are visible but switched off — their controls are disabled with a *"Not built on Windows yet"* note.

### Pane-by-pane comparison

| Pane | macOS | Windows |
|---|---|---|
| **Account** | Sign in; *This Device* / active seat; **Sign Out**; **Delete Account**. | **Sign-in only** — a *Sign In* button (the same dialog as *Help ▸ Sign In…*). No profile, sign-out, seat management, or in-app delete yet. *(Windows: not yet available)* for everything past sign-in. |
| **General** | **Language** (System default or one of 9 languages; offers **Relaunch ACE Now**), auto-start detection on launch, usage-data consent, **Manage media automatically**, **Relink Missing Media** / **Add folder…**, **CCLI license number** and **Export song usage (CSV)…**, display-hold. | **Language** (System default or one of 9 languages; applies after a restart), auto-start detection, usage-data consent, **Manage media automatically**, **CCLI license number** and **Export song usage (CSV)…**. Display-hold isn't built yet *(Windows: not yet available)*. |
| **Audio** | Audio configuration. | Placeholder for now — use [Detection Settings](05-detection-ai.md) (Ctrl+Alt+,) and *Screen Setup ▸ Audio*. *(Windows: not yet available)* |
| **Bible** | Translation management. | *Download translations…*; notes that custom translation files can't be sideloaded (see [Scripture](04-scripture.md)). |
| **ProPresenter** | Not shown. | Shown, but every control is disabled ("Not built on Windows yet"). |
| **ATEM** | **Functional** *(both)*: Enable ATEM, Host (default `192.168.1.100`), Port (default `9910`), test the connection. With it on, cues gain a **VIDEO SWITCHER** input that cuts the ATEM on go-live. Macro triggering is intentionally not offered. See [Streaming & Audio](09-streaming-and-audio.md). | Same. |
| **Hotkeys** | Shortcut reference. | Read-only list generated live from the menu bar — it shows exactly what the app currently binds. Not an editor. |
| **Detection** *(macOS: advanced)* | Matcher / VAD knobs. | A button that opens [Detection Settings](05-detection-ai.md). |
| **Network** *(macOS: advanced)* | Network configuration. | Info only. |
| **NDI** *(macOS: advanced)* | NDI runtime install and status. NDI *sending* is a screen destination in [Screen Setup](08-outputs-and-screens.md#screens-and-destinations). | An **Install NDI runtime…** button (not yet connected — install the runtime yourself; see [Appendix C](appendix-c-dependencies.md)) with outdated text; NDI sending is set per screen in Screen Setup. |
| **Linked Computers** | Not shown. | Shown, but disabled ("Not built on Windows yet"). |
| **Updates** *(macOS: advanced)* | Current version + *Check for Updates…* (Sparkle). | Current version + *Check for Updates…* (WinSparkle). |
| **Integrations** | Not shown (stock media uses the key built into the app). | **Pixabay** key for stock media (stored in plain-text Windows settings; also read from `ACE_PIXABAY_KEY`) and an **Anthropic** key that [Online Song ID](05-detection-ai.md#lyric-matching--song-identification) can use instead of signing in. |

---

## The menu bar

The two editions share the same menus — **File**, **Edit**, **View**, **Output**, **Workspace**, **Detection** and **Help** — with the same items in the same places. macOS adds the application (**ACE**) menu and an automatic **Window** menu; Windows adds an **Editors** menu for the editors macOS opens from the **EDITORS** pop-up in the tab bar.

| macOS | Windows |
|---|---|
| **ACE** (app) · **File** · **Edit** · **View** · **Output** · **Workspace** · **Detection** · **Help** (plus an automatic **Window** menu) | **File** · **Edit** · **View** · **Output** · **Workspace** · **Detection** · **Editors** · **Help** |

### macOS menus

| Menu | Contains |
|---|---|
| **ACE** | Settings… (⌘,), Check for Updates…, standard app items (Hide/Quit). |
| **File** | Open Presentation… (⌘O) · New Song… (⌘N) · **Import ▸** File… (⌘I), Planning Center…, Public-Domain Hymns · **Export ▸** Presentation… (⇧⌘E), Captions…, Current Service as ACE Playlist…, Back Up Library to Documents, Show ACE Presenter Folder · Extras Download…. |
| **Edit** | Undo (⌘Z), Redo (⇧⌘Z), Cut/Copy/Paste/Select All. |
| **View** | Command Palette (⌘K) · Quick Screen… (⌘J). |
| **Output** | Screen Setup… (⇧⌘,) · Venues… (⇧⌘V) · Translation Overlay… · Suggest Setlist… · Stock Media (Pixabay)… · Preaching Manager… · Reading Plans… · Reference Scanner… · Themes… (⌘T) · Stage Layout… (⇧⌘T) · Next Slide · Previous Slide · Take (⌘⏎) · Toggle Blank (⌘B) · Clear Quick Screen (Esc) · Undo Scene (⌥⌘Z). |
| **Workspace** | Stage (⌘1) · Song (⌘2) · Edit (⌘3) · Bible (⌘4) · Looks (⌘5) · Cue Plan (⌘6) · Toggle Media Tray (⌘M) · Toggle Audience Screen (⌥⌘A) · Toggle Stage Screen (⌥⌘S) · All Songs → Slide Cuts · All Songs → Scrolling Lyrics · Logo / Watermark… · Go On Air (⌃⌘G) · Hold / Resume Service (⌃⌘H) · End Service (⌃⌘E). |
| **Detection** | Toggle Listening (⇧⌘L) · Detection Settings… (⌥⌘,) · Learned Transcriptions… · Auto (⌥⌘1) · Songs Only (⌥⌘2) · Bible Only (⌥⌘3). |
| **Help** | Keyboard Shortcuts (⌘?) · Reveal Whisper Model Folder in Finder · Upgrade ACE Presenter… · Pricing & Plans… · links to the other ACE apps. |

The **EDITORS** pop-up in the tab bar opens the Lower Thirds editor, Theme Editor (⌘T), Stage Layout (⇧⌘T), Logo / Watermark, Translation Overlay, Reading Plans, Reference Scanner and Stock Media.

### Windows menus

| Menu | Contains |
|---|---|
| **File** | New Service · New Cue… · New Song… (Ctrl+N) · **Import ▸** File… (Ctrl+I), Planning Center…, Public-Domain Hymns · **Export ▸** Presentation… (Ctrl+Shift+E), Current Service as ACE Playlist…, Back Up Library to Documents, Show ACE Presenter Folder · Extras Download… · Preferences… (Ctrl+,) · Quit. |
| **Edit** | Undo · Redo · Cut · Copy · Paste · Select All (standard Windows keys). |
| **View** | Command Palette (Ctrl+K) · Quick Screen… (Ctrl+J). |
| **Output** | Screen Setup… (Ctrl+Shift+,) · Venues… (Ctrl+Shift+V) · Translation Overlay… · Suggest Setlist… · Stock Media… · Preaching Manager… · Reading Plans… · Reference Scanner… · Themes… (Ctrl+T) · Stage Layout… (Ctrl+Shift+T) · Next Slide · Previous Slide · Toggle Blank · Clear · **Stream…**. |
| **Workspace** | Stage (Ctrl+1) · Song (Ctrl+2) · Edit (Ctrl+3) · Bible (Ctrl+4) · Looks (Ctrl+5) · Cue Plan (Ctrl+6) · Toggle Media Tray (Ctrl+M) · Toggle Audience Screen (Ctrl+L) · Toggle Stage Screen (Ctrl+Shift+D) · **Start / Stop Remote Server (Ctrl+R)** · Logo / Watermark… · Go On Air (Ctrl+Win+G) · Hold / Resume Service (Ctrl+Win+H) · End Service (Ctrl+Win+E). |
| **Detection** | Toggle Listening *(no shortcut bound)* · Detection Settings… (Ctrl+Alt+,) · Learned Transcriptions… · Auto (songs + scripture) (Ctrl+Alt+1) · Songs Only (Ctrl+Alt+2) · Bible Only (Ctrl+Alt+3) · Share anonymous usage data · …including song titles. |
| **Editors** | Look Editor · Reflow · Arrangements · Lower Thirds (Ctrl+Shift+L) · Background Inspector · Scripture Study · Past Recordings…. |
| **Help** | Keyboard Shortcuts (Ctrl+?) · Reveal Whisper Model Folder · Check for Updates… · Sign In… · ACE Plans… · What's New · Welcome Tour. |

The bare keys — → / ← / Page Down / Page Up, ↓ / ↑, Space, B and Delete — work from anywhere in the main window rather than through menu shortcuts, so the *Next Slide*, *Previous Slide* and *Toggle Blank* items show no shortcut on Windows.

**Stream and Remote Server placement.** Windows exposes **Stream…** on the **Output** menu (usable from any layout) and **Start / Stop Remote Server** (Ctrl+R) on **Workspace** — the remote server is **off by default on Windows** and must be started here, whereas on macOS it is always on at launch. See [The Phone Remote](10-remote-control.md).

---

## Keyboard shortcuts — where to find the full list

This chapter shows only the shortcuts attached to the panes and menus above. The **complete, side-by-side keyboard reference for both editions** is [Appendix B — Keyboard Shortcuts](appendix-b-keyboard-shortcuts.md). In the app, open the live cheat-sheet from *Help ▸ Keyboard Shortcuts* (**⌘? / Ctrl+?**); on Windows the **Hotkeys** Preferences pane shows the same list, generated from whatever the app currently binds.

### Shortcut collisions & platform differences

A few bindings differ enough between editions to catch out an operator moving between them:

| Action | macOS | Windows | Watch out |
|---|---|---|---|
| **Toggle Audience Screen** | ⌥⌘A | **Ctrl+L** | On Windows **Ctrl+L shows/hides the audience output.** |
| **Toggle Listening** (detection) | **⇧⌘L** | *(unbound)* | On macOS ⇧⌘L starts/stops listening. **On Windows Toggle Listening has no shortcut** — use the *Detection* menu or the LISTENING pill. So ⌘/Ctrl+**L** means two different things: Listening on macOS, Audience on Windows. |
| **Toggle Stage Screen** | ⌥⌘S | Ctrl+Shift+D | Different modifier/key entirely. |
| **Toggle Blank** | ⌘B | **B** (plain) | Windows uses an unmodified **B**. |
| **Take** (send preview to program) | ⌘⏎ | *(no equivalent)* | Windows has no dedicated Take shortcut — use Next (→) / the TAKE button. |
| **Go On Air / Hold / End** | ⌃⌘G / H / E | Ctrl+Win+G / H / E | Same letters, platform-native modifiers. |
| **Detection target mode** | ⌥⌘1 / 2 / 3 | Ctrl+Alt+1 / 2 / 3 | Same idea, platform-native modifiers. |
| **Remote Server toggle** | *(always on)* | **Ctrl+R** | macOS has nothing to toggle. |

For the exhaustive list — including workspace switching, media tray, import/export, detection modes, and the service-run controls — see [Appendix B](appendix-b-keyboard-shortcuts.md).

---

## Auto-update behaviour

Both editions ship a background updater, with a deliberate difference in cadence:

- **macOS (Sparkle 2):** checks for a new release **in the background on every launch**, plus a manual *ACE ▸ Check for Updates…*.
- **Windows (WinSparkle):** a single **quiet check ~8 seconds after launch** (never mid-service), plus a manual *Help ▸ Check for Updates…*. The feed is the appcast at `https://dl.ace-presenter.app/presenter-win/appcast.xml`.

Neither edition prompts for an update while a service is live.

---

## See also

- [Getting Started](01-getting-started.md) — install, first run, sign-in, and tiers.
- [Appendix A — Platform Differences](appendix-a-platform-differences.md) — the authoritative list of what each edition does and doesn't do today.
- [Appendix B — Keyboard Shortcuts](appendix-b-keyboard-shortcuts.md) — the full keyboard reference.
- [The Phone Remote](10-remote-control.md) — enabling the remote server (Windows: Ctrl+R) and pairing.
