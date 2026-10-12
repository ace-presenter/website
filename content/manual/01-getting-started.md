# Getting Started

This chapter gets you from installation to your first live slide, and explains the ideas the rest of the manual builds on.

---

## Installing ACE Presenter

### macOS

1. Open the ACE Presenter `.dmg` and drag **ACE Presenter** to your Applications folder.
2. Launch it from Applications. On first launch macOS may ask you to confirm opening an app downloaded from the internet.
3. When you first enable the phone remote or streaming, macOS will prompt for **Local Network** and (for detection) **Microphone** permission — allow these so those features can work.

### Windows

1. Run the ACE Presenter installer (`.exe`) and follow the prompts.
2. Launch **ACE Presenter** from the Start menu.
3. Windows Firewall may prompt the first time the phone remote or a network camera (NDI) is used — allow access on your local network.

ACE also creates a **Documents ▸ ACE Presenter** folder for its own files — exported songs, services and themes, library backups, and an **Inbox** that imports whatever you drop into it. See [Media ▸ ACE files and the ACE Presenter folder](06-media.md#ace-files-and-the-ace-presenter-folder).

Updates are delivered in-app; see [Preferences ▸ Updates](11-preferences-shortcuts.md) and [Appendix C](appendix-c-dependencies.md).

---

## First run

The first time you launch, a short **Welcome tour** appears a couple of seconds after the window opens, introducing the library, going live, auto-follow detection, scripture, themes, outputs, and streaming. You can dismiss it and re-open it later:

- **macOS:** *Help ▸ Show Onboarding Tour*
- **Windows:** *Help ▸ Welcome Tour* (and *Help ▸ What's New* after an update)

You'll also be asked once about optional, anonymous usage **telemetry** — this is your choice and can be changed later in Preferences.

**Interface language.** ACE Presenter's menus and screens are available in **9 languages** on both editions — English, Spanish, French, German, Portuguese, Russian, Chinese (Simplified), Korean and Arabic. It follows your system language by default; choose another in *Preferences ▸ General ▸ Language* (the change applies after a relaunch).

**Coming from ProPresenter?** *File ▸ Import ▸ File…* (⌘I / Ctrl+I) takes a ProPresenter library or a single playlist and keeps its shape. See [Media ▸ The Import Wizard](06-media.md#the-import-wizard).

---

## Accounts & tiers

ACE Presenter runs fully without an account on the **Free** tier. Signing in unlocks your paid tier and (on macOS) lets the phone remote adopt your account automatically.

**To sign in:**

- **macOS:** *Settings ▸ Account ▸ Sign In*, or from the Upgrade sheet.
- **Windows:** *Help ▸ Sign In…*, or the sign-in prompt, or *Preferences ▸ Account*.

Enter the email and password for your ACE account. If you were given a licence key instead, you can paste it (macOS offers a "Have a licence key?" field). Cloud transcription (Deepgram) becomes available once you're signed in — see [Detection & Auto-Follow](05-detection-ai.md).

### What each tier unlocks

| Feature | Free | Pro | Venue |
|---|:---:|:---:|:---:|
| Full service building, cues, songs, scripture | ✅ | ✅ | ✅ |
| Bundled (public-domain) Bibles | ✅ | ✅ | ✅ |
| On-device detection / auto-follow | ✅ | ✅ | ✅ |
| **Audience output** | 1 only | ✅ | ✅ |
| Diagonal "ACE FREE" watermark on output | shown | — | — |
| **Multiple outputs** (audience + stage + more) | — | ✅ | ✅ |
| **Looks** (per-screen theme assignments) | — | ✅ | ✅ |
| **Image & video playback** | — | ✅ | ✅ |
| **Licensed / online Bible translations** (e.g. ESV) | — | ✅ | ✅ |
| 8-layer compositor | — | — | ✅ |
| Edge-blending | — | — | ✅ |
| Network redundancy | — | — | ✅ |

Upgrade any time from *Help ▸ Upgrade ACE Presenter…* (macOS) / *Help ▸ ACE Plans…* (Windows). See [Preferences, Shortcuts & Menus](11-preferences-shortcuts.md) for the Account pane.

> **Free-tier watermark.** On Free, a faint diagonal "ACE FREE" mark is drawn across the audience output. It disappears the moment a Pro/Venue licence is active.

---

## The main window

ACE Presenter centers on **workspaces** you switch between, a **media bin** along the bottom, and an **output control panel** for taking content live.

### Workspaces (⌘1–⌘6 / Ctrl+1–Ctrl+6)

| # | Workspace | What it's for |
|---|---|---|
| 1 | **Stage** | The live presentation view with preview (PVW) and program (PGM) controls and the live slide grid |
| 2 | **Song** | The song panel — the selected song's slides as the audience sees them, with Labels and Credit pickers |
| 3 | **Edit** | A non-destructive slide editor |
| 4 | **Bible** | The scripture workspace |
| 5 | **Looks** | Apply themes and Looks |
| 6 | **Cue Plan** | Your service order (running order) |

The tab bar along the top reads **STAGE · SONG · EDIT · BIBLE · LOOKS · CUE PLAN** in that order on both editions. The Theme Editor opens as its own window (*Output ▸ Themes…*, ⌘T / Ctrl+T).

### Persistent elements

- **Top status bar** — the **LISTENING / IDLE** pill (detection on/off), a match-confidence pill while listening, stream status, and the venue badge. See [Detection & Auto-Follow](05-detection-ai.md) and [Streaming & Audio](09-streaming-and-audio.md).
- **Media bin** (⌘M / Ctrl+M to toggle) — your images, videos, audio, and slide decks, in folders and playlists. See [Media](06-media.md).
- **Output control panel** — **CLEAR / BLACK / LIVE / TAKE**, per-layer clears, and audience/stage toggles. See [Outputs & Screens](08-outputs-and-screens.md).

### Layout presets

The workspace layout can be switched between presets (General, Sermon, Conference, Stream, Custom) to emphasize different tools. On macOS the **Stream** preset is also where the streaming controls appear; on Windows streaming is reached from *Output ▸ Stream…* regardless of layout. See [Streaming & Audio](09-streaming-and-audio.md).

---

## Your first service (quick path)

1. **Add songs.** *File ▸ New Song…* (⌘N / Ctrl+N), paste the lyrics, and let ACE split them into sections — or drop in SongSelect lyrics files, or add the *Public-Domain Hymns* pack from *File ▸ Import*. See [Songs & Arrangements](03-songs-and-arrangements.md).
2. **Build the order.** Add songs and cues to the **Cue Plan**; drag to reorder. Add scripture from the **Bible** workspace. See [Building a Service](02-service-and-cues.md) and [Scripture](04-scripture.md).
3. **Set up your screen.** *Output ▸ Screen Setup…* (⇧⌘, / Ctrl+Shift+,) — assign your projector/TV to the **audience** output. See [Outputs & Screens](08-outputs-and-screens.md).
4. **Pick a look.** Choose a theme in the **Looks** workspace or edit one in the **Theme** editor. See [Themes, Looks & Overlays](07-themes-looks-overlays.md).
5. **Go live.** Click a cue to send it live; use **→ / ←** (or a clicker's **Page Down / Page Up**) to move one slide, **↓ / ↑** to move one row in the slide grid, **⌘B** (macOS) / **B** (Windows) to blank, and **CLEAR** to stop showing content.
6. *(Optional)* **Turn on auto-follow.** Click the **LISTENING** pill so ACE can follow the worship leader and advance slides for you. See [Detection & Auto-Follow](05-detection-ai.md).
7. *(Optional)* **Use your phone.** Enable the remote and connect a phone as a wireless controller. See [The Phone Remote](10-remote-control.md).

---

## See also

- [Building a Service: Cues & Running Order](02-service-and-cues.md)
- [Preferences, Shortcuts & Menus](11-preferences-shortcuts.md)
- [Appendix B — Keyboard Shortcuts](appendix-b-keyboard-shortcuts.md)
- [Appendix C — External Dependencies & Troubleshooting](appendix-c-dependencies.md)
