# 1 · Getting Started

This chapter takes you from download to a running app, explains exactly what you need for the optional DaVinci Resolve link, and gets you connected.

---

## Requirements

ACE Editors' Notes has a small **core** that runs on its own, and an **optional Resolve bridge** that needs a couple of extra pieces. You can use the app happily with only the core.

| What | Requirement | Needed for |
|---|---|---|
| **macOS** | macOS 12 Monterey or later | The app itself |
| **Mac hardware** | Apple Silicon (M-series) | The shipping build is a native `arm64` binary — no Rosetta |
| **DaVinci Resolve** | Resolve 18 or later (18.x–20.x; tested against 20.3.2) | Click-to-seek, marker import, playhead timecode stamping |
| **Python 3** | A Resolve-compatible Python 3 install (tested with 3.14) | The live bridge to Resolve only |
| **macOS 26+** | macOS 26 or later with Apple Intelligence enabled | The on-device AI features (Note Polish, Voice Memo) only — see [Chapter 6](06-on-device-ai.md) |

### Reconciling the macOS version

There are two different floors, and it's worth being clear about them:

- **The app runs on macOS 12 and up.** Notes, timecodes, click-to-seek, marker import, categories, search, and export all work from Monterey onward.
- **The AI features need macOS 26 or later.** Note Polish and Voice Memo are built on Apple's on-device models (the Foundation Models and Speech frameworks), which only exist on macOS 26+. On earlier macOS, those two buttons are present but **disabled**, with a tooltip explaining why. Nothing else is affected.

In short: **macOS 12 to use the app; macOS 26 to also use the AI.**

### DaVinci Resolve version support

The Resolve link is **optional**. When Resolve isn't running, the app is a normal offline notes app.

- Supported: **DaVinci Resolve 18 through 20**. Development and testing reference is **20.3.2**.
- The link works with both the free DaVinci Resolve and DaVinci Resolve Studio.
- One important caveat lives entirely in Resolve, not in this app: **Resolve 20.x has a scripting bug that blocks creating markers from notes.** Importing markers *from* Resolve and click-to-seek are unaffected. Full detail in [Chapter 4](04-markers-from-resolve.md).

---

## Installing the app

1. Download the current DMG (for example `ACE-EditorsNotes-1.6.1-arm64.dmg`) from the ACE website.
2. Open the `.dmg` and drag **ACEEditorsNotes.app** into your **Applications** folder.
3. Launch it from Applications. The shipping public beta is Apple-signed and notarized, so it should open normally; macOS may ask you once to confirm opening an app downloaded from the internet — click **Open**.

Updates install themselves: ACE Editors' Notes uses **Sparkle** auto-update, so new beta builds download and apply in the background without interrupting your session.

> **If macOS says the app is "damaged" or won't open.** Early beta builds were not signed, and a stale download can still trip Gatekeeper. If that happens, open **Terminal** and run:
> ```bash
> xattr -cr /Applications/ACEEditorsNotes.app
> ```
> Then try opening it again. You only need to do this once. (This clears the quarantine flag macOS adds to downloaded files; it is safe.)

---

## First launch

On first launch you'll see the single main window and, a moment later, a **Welcome tour** — a spotlight overlay that walks you through the library dropdowns, Insert Timecode, Import Markers, the AI buttons, and export. You can **Skip** it and replay it any time from *Help ▸ Welcome Tour*.

If DaVinci Resolve isn't running, the connection dot (top of the window) is **red** — that's expected and fine. Create a project and start taking notes; the app is fully usable offline. See [Projects, Timelines & Notes](02-projects-timelines-notes.md).

Your notes are stored locally in a SQLite database under *~/Library/Application Support/* (the folder retains the legacy *CutNotes* name). Nothing leaves your Mac unless you explicitly turn on the optional cloud AI upgrade in [Chapter 6](06-on-device-ai.md).

---

## Setting up the DaVinci Resolve bridge

This section is only needed for the live features (click-to-seek, playhead stamping, marker import). Skip it if you're using the app standalone.

### How the bridge works

ACE Editors' Notes doesn't touch Resolve directly. It launches a small **Python helper process** (`resolve_bridge.py`) and talks to it over JSON. That helper uses Blackmagic's official **DaVinci Resolve Scripting API** to move the playhead, read markers, and report project/timeline info.

```
ACE Editors' Notes  ──JSON──▶  resolve_bridge.py  ──▶  DaVinci Resolve Scripting API
   (click a timecode)              (seekTimecode)          (playhead moves)
```

Because it uses Resolve's own scripting API, three conditions have to be true for the bridge to connect.

### Step 1 — Install a Resolve-compatible Python 3

Resolve's Scripting API needs a Python 3 interpreter it can load. The app has been tested with Python 3.14. The simplest route is Homebrew:

```bash
brew install python
```

Confirm it's there:

```bash
python3 --version
```

### Step 2 — Enable external scripting in Resolve

1. Open **DaVinci Resolve**.
2. Go to **DaVinci Resolve ▸ Preferences ▸ System ▸ General**.
3. Under **External scripting using**, choose **Local** (or **Network**).
4. Open a **project** and a **timeline** — the bridge needs an active timeline to talk to.

### Step 3 — Make the Resolve scripting module findable (if needed)

If the connection dot stays red even with Resolve open, Python may not be finding Blackmagic's scripting module. Add its path to your shell profile (`~/.zshrc`):

```bash
export PYTHONPATH="/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting/Modules:$PYTHONPATH"
```

Then reload it with `source ~/.zshrc` and relaunch both apps.

### Step 4 — Launch order and connecting

- Start **DaVinci Resolve first**, open a project and timeline, then launch **ACE Editors' Notes**. (Launching Resolve *after* the app also works — the connection restores automatically.)
- Watch the connection dot: it turns **green** within about 5–10 seconds of a valid project/timeline being detected.
- The app auto-detects the current Resolve project and timeline and keeps them in sync every few seconds — no manual pairing.

Once the dot is green you're ready for [Timecodes & Click-to-Seek](03-timecodes-click-to-seek.md).

> **The dot stays red?** Confirm, in order: (1) Resolve is running with a project *and* timeline open; (2) external scripting is enabled (Step 2); (3) `python3 --version` works; (4) the `PYTHONPATH` line is set (Step 3). A quick relaunch of both apps clears most transient cases. More in [Shortcuts & Troubleshooting](08-shortcuts-and-troubleshooting.md).

---

## Where this leaves you

- **Offline / standalone:** ready now — go to [Chapter 2](02-projects-timelines-notes.md).
- **Live with Resolve:** green dot means click-to-seek and marker import are live — go to [Chapter 3](03-timecodes-click-to-seek.md).
- **AI features:** available if you're on macOS 26+ — go to [Chapter 6](06-on-device-ai.md).
