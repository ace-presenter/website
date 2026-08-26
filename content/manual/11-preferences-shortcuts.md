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
| A song or media name | Items in the library / media tray | Opens a preview |
| A service-plan name | Service plans / order-of-service templates | Applies the template (reorders the running order) |
| A theme (or Look) name | Themes, and — on macOS — Looks | Applies the theme / Look |
| A workspace name | Workspaces (Stage, Song, Edit, Bible, Looks, Cue Plan) | Switches workspace |
| A layout-preset name | Saved layout presets | Applies the preset |

**Navigating it:** type to filter, use **↑ / ↓** to move through results, **Enter** to run the highlighted item, **Esc** to dismiss.

**Platform note on what's indexed:** macOS indexes **Looks and themes separately**, so a Look and a theme with similar names both appear. Windows folds Looks into the theme list (Looks authoring is macOS-only — see [Themes, Looks & Overlays](07-themes-looks-overlays.md)) and, in exchange, surfaces **explicit Service-Plan and Layout-preset entries**. Both editions reach cues, library, media, service plans, themes, workspaces, and presets.

---

## Preferences / Settings — ⌘, / Windows Ctrl+,

Open with **⌘,** (macOS: *ACE ▸ Settings…*) or **Ctrl+,** (Windows: *File ▸ Preferences…*). Both editions present a left-hand navigation split into an **operations** group and an **Advanced** group, with the same panes in the same order.

> **Read this before the table.** The Windows Preferences window now *mirrors the macOS pane list exactly* — every pane below appears in the Windows sidebar too. The honest difference is no longer *which panes exist* but *which panes do anything*: several Windows panes are deliberately-visible **roadmap placeholders** whose controls are inert (they are kept on screen so the plan stays visible rather than vanishing). Those are flagged *(Windows: not yet available)* below. This is why you may see, for example, a **ProPresenter** or **Linked Computers** pane on Windows and find its switches do nothing.

### Pane-by-pane comparison

| Pane | macOS | Windows |
|---|---|---|
| **Account** | Full: sign-in, profile, tier, device-seat registration, silent licence refresh, sign-out, and account deletion (via the licence entry view). | **Sign-in only** — a *Sign In* button (opens the same licence dialog as *Help ▸ Sign In…*) plus a GDPR note. No profile, sign-out, seat management, or in-app delete. *(Windows: not yet available)* for everything past sign-in. |
| **General** | Interface language, auto-start detection on launch, telemetry consent, manage-media-automatically, CCLI licence number, display-hold. | Auto-start detection, telemetry consent, manage-media, and **CCLI number** are wired. Language and display-hold are shown but do nothing (English-only build; no display-hold engine) *(Windows: not yet available)* for those two. |
| **Audio** | Audio configuration. | Pointer pane — an *Open Detection Settings…* button; detailed audio lives in [Detection Settings](05-detection-ai.md) and Screen Setup ▸ Audio. *(both, in effect — Windows just centralises it elsewhere)* |
| **Bible** | Translation management. | Tier/upgrade info + *Download translations…*; importing a translation from this pane is *(Windows: not yet available)* — use the Bible workspace's overflow **Import translation (Zefania XML)…** instead (see [Scripture](04-scripture.md)). |
| **ProPresenter** | REST cue-mirroring to a separate ProPresenter machine. | Pane present but **entirely non-functional** — there is no ProPresenter client in the Windows build. *(Windows: not yet available)* |
| **ATEM** | ATEM control lives in Persistence/Settings. | **Functional tab** *(both)*: Enable ATEM, Host (default `192.168.1.100`), Port (default `9910`), and a *Test connection* button. With it on, Edit Cue gains a **VIDEO SWITCHER** input row that cuts the ATEM on go-live. Macro triggering is intentionally omitted on Windows (program-input cut only). See [Streaming & Audio](09-streaming-and-audio.md). |
| **Hotkeys** | Shortcut reference. | Read-only list generated live from the menu bar — it shows exactly what the app currently binds. Not an editor. *(both)* |
| **Detection** | Matcher / VAD knobs (advanced). | Pointer pane — an *Open Detection Settings…* button; the real knobs are in [Detection Settings](05-detection-ai.md). |
| **Network** | Network configuration. | Info + a list of local interface addresses a remote-operator tablet can reach (ACE runs in-process — no separate backend address). |
| **NDI** | Full NDI send configuration + guided runtime install. | Pane present but reduced to an **Install NDI runtime…** button; actual NDI send/receive is configured in Screen Setup ▸ NDI. *(Windows: not yet available)* for the full pane. |
| **Linked Computers** | Leader/follower LAN redundancy (peer list, mesh). | Pane present but **non-functional** — no mesh transport in the Windows build. *(Windows: not yet available)* |
| **Updates** | Current version + *Check for Updates…* (Sparkle). | Current version + *Check for Updates…* (WinSparkle). *(both)* |
| **Integrations** | API keys (Pixabay, online song-ID). | **Pixabay key works** (stock-media search — stored in plain-text Windows settings, also read from `ACE_PIXABAY_KEY`). Anthropic/Genius keys are shown but have no caller. *(Windows: not yet available)* for online song-ID keys. |

**Summary of Windows placeholder panes** *(Windows: not yet available)*: ProPresenter, NDI (full pane), Linked Computers, and the online-song-ID half of Integrations are visible-but-inert roadmap stubs. The **Account** pane is sign-in-only. **ATEM** is a genuinely working Windows Preferences tab. Everything in the operations group that touches the live show — General's wired toggles, CCLI, ATEM — works.

---

## The menu bar

The two editions organise their menus differently, chiefly because macOS carries an application (**ACE**) menu and an automatic **Window** menu, while Windows gathers those responsibilities into **View**, **Editors**, and the **File**/**Help** menus. On macOS, several things that Windows exposes as menu items are reached instead through inspectors, right-click menus, or the **⋯ EDITORS** pill in the tab bar.

Top-level menus:

| macOS | Windows |
|---|---|
| **ACE** (app) · **File** · **Edit** · **Output** · **Workspace** · **Detection** · **Help** (plus an automatic **Window** menu) | **File** · **Edit** · **View** · **Output** · **Workspace** · **Detection** · **Editors** · **Help** |

Key structural differences: Windows has **dedicated View and Editors menus and no Window menu**; macOS places **Settings** and **Check for Updates…** under the **ACE** menu. There is no separate ProPresenter/NDI menu on either — those live in Preferences and Screen Setup.

### macOS menus

| Menu | Contains |
|---|---|
| **ACE** | About, Settings… (⌘,), Check for Updates…, Show Onboarding Tour, standard app items (Hide/Quit). |
| **File** | New Song (⌘N), Import… (⌘I), Export… (⇧⌘E), service/document items. |
| **Edit** | Undo (⌘Z), Redo (⇧⌘Z), Cut/Copy/Paste/Select All. |
| **Output** | Screen Setup… (⇧⌘,), Themes… (⌘T), Stage Layout… (⇧⌘T), Translation Overlay…, Stock Media…, Clear, Toggle Blank (⌘B), Take (⌘⏎). |
| **Workspace** | Workspace switch (⌘1–⌘6), Toggle Media Tray (⌘M), Toggle Audience Screen (⌥⌘A), Toggle Stage Screen (⌥⌘S), Venues (⇧⌘V), Logo/Watermark…, Go On Air / Hold / End (⌃⌘G / H / E). |
| **Detection** | Toggle Listening (⇧⌘L), Detection Settings… (⌥⌘,), target mode Auto/Song/Bible (⌥⌘1 / 2 / 3). |
| **Help** | Keyboard Shortcuts (⌘?), Sign In / Upgrade…, Show Onboarding Tour, What's New. |

### Windows menus

| Menu | Contains |
|---|---|
| **File** | New Service · New Cue… · New Song… (Ctrl+N) · Import ▸ File… (Ctrl+I) · Export ▸ Presentation… · Extras Download… · Preferences… (Ctrl+,) · Quit (Ctrl+Q). |
| **Edit** | Undo (Ctrl+Z) · Redo (Ctrl+Y) · Cut · Copy · Paste · Select All. |
| **View** | Command Palette (Ctrl+K) · Quick Screen… (Ctrl+J). |
| **Output** | Screen Setup… (Ctrl+Shift+,) · Venues… (Ctrl+Shift+V) · Translation Overlay… · Suggest Setlist… · Stock Media… · Preaching Manager… · Reading Plans… · Reference Scanner… · Themes… (Ctrl+T) · Stage Layout… (Ctrl+Shift+T) · Next Slide (→) · Previous Slide (←) · Toggle Blank (B) · Clear · **Stream…**. |
| **Workspace** | Stage (Ctrl+1) · Song (Ctrl+2) · Edit (Ctrl+3) · Bible (Ctrl+4) · Looks (Ctrl+5) · Cue Plan (Ctrl+6) · Toggle Media Tray (Ctrl+M) · Toggle Audience Screen (Ctrl+L) · Toggle Stage Screen (Ctrl+Shift+D) · **Start / Stop Remote Server (Ctrl+R)** · Logo / Watermark… · Go On Air (Ctrl+Meta+G) · Hold / Resume Service (Ctrl+Meta+H) · End Service (Ctrl+Meta+E). |
| **Detection** | Toggle Listening *(no shortcut bound)* · Detection Settings… (Ctrl+Alt+,) · Learned Transcriptions… · Auto (songs + scripture) (Ctrl+Alt+1) · Songs Only (Ctrl+Alt+2) · Bible Only (Ctrl+Alt+3) · Share anonymous usage data · …including song titles. |
| **Editors** | Look Editor · Reflow · Arrangements · Lower Thirds (Ctrl+Shift+L) · Background Inspector · Scripture Study · Past Recordings…. |
| **Help** | Keyboard Shortcuts (Ctrl+?) · Reveal Whisper Model Folder · Check for Updates… · Sign In… · ACE Plans… · What's New · Welcome Tour. |

**Why Windows has an Editors menu.** On macOS these editors open from an inspector, a right-click, or the **⋯ EDITORS** pill. The Windows build has the pill but not the inspectors, so the **Editors** menu is the primary route to the Look Editor, Reflow, Arrangements, Lower Thirds, the Background Inspector, Scripture Study, and Past Recordings.

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
| **Take** (send preview to program) | ⌘⏎ | *(no equivalent)* | Windows has no dedicated Take shortcut — use Next (→) / the PGM tile. |
| **Go On Air / Hold / End** | ⌃⌘G / H / E | Ctrl+Meta+G / H / E | Same letters, platform-native modifiers. |
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
