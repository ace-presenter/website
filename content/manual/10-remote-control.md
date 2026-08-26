# The Phone Remote

**ACE Presenter Remote** is a companion phone app — one app for **iOS and Android** — that controls a running copy of ACE Presenter over your **local network**. From a phone in your hand you can walk the running order, jump to any cue and slide, blank and clear the output, control video playback, search the library, and even edit or create songs, all while watching live preview thumbnails of what is currently on screen.

The remote is a separate download from the presenter itself. It talks to *either* edition of the desktop app — macOS or Windows — over a small WebSocket protocol. The macOS edition is the protocol authority, so a few remote features work against macOS but are still in progress on Windows; those are flagged throughout this chapter.

> **This chapter covers the phone side.** For the desktop features the remote drives, see [Building a Service: Cues & Running Order](02-service-and-cues.md), [Scripture](04-scripture.md), [Media](06-media.md), and [Outputs & Screens](08-outputs-and-screens.md).

---

## What you need

- The desktop app (macOS or Windows) running on a computer.
- The phone and the computer on the **same local network** (same Wi-Fi / LAN).
- The ACE Presenter Remote app installed on the phone.
- On **Windows only**, the remote server switched on (see below). On **macOS** it is always on.

---

## Enabling the remote on the presenter

Before a phone can connect, the desktop app has to be listening for it. This is the one place where the two editions differ significantly.

### macOS — always on *(macOS only behavior)*

The macOS edition starts its remote server automatically at launch. There is **no toggle** — as soon as the app is open, it is discoverable and ready to pair. It listens for control traffic on **WebSocket port 7001**, with a separate **HTTP service on port 7002** for preview images.

> **macOS 15 (Sequoia) and later** prompt once for **local-network permission** the first time the app advertises itself. Allow it, or the phone will never see the presenter in discovery. If you declined by accident, re-enable ACE Presenter under *System Settings ▸ Privacy & Security ▸ Local Network*.

### Windows — off by default *(both, with a Windows enable step)*

The Windows edition ships with the remote server **OFF**. Turn it on with:

| Action | How to get there |
|---|---|
| Start / Stop the remote server | *Workspace ▸ Start/Stop Remote Server* — shortcut **Ctrl+R** |

When the server is running, the presenter shows its **status** — the network **address** phones should connect to, plus a live **device count** of how many phones are currently paired. Windows serves both control traffic and preview images on **port 7001** (there is no separate HTTP port). Toggle the server off again with the same menu item or **Ctrl+R**; a broadcast operator may prefer to leave it off until needed.

> **Shortcut:** Start/Stop Remote Server is **Ctrl+R** on Windows; there is no macOS equivalent because the macOS server is always running. See [Preferences, Shortcuts & Menus](11-preferences-shortcuts.md).

---

## Connecting the phone (the Connection Hub)

The remote opens on its **Connection Hub** — the entry screen that finds presenters and lets you join one.

**What it does.** The Hub lists presenters it discovers automatically on the network and also lets you type in an address by hand.

- **Automatic discovery (Bonjour / mDNS).** The Hub browses for the `_aceremote._tcp` service and lists every presenter it finds. Tap a presenter in the list to connect. When two copies are running on the network, a TXT `instanceID` record disambiguates them so you connect to the right one.
- **Manual IP entry.** If discovery is blocked (some guest or enterprise Wi-Fi networks disable mDNS), type the presenter's address into the **Presenter IP** field. The **default port is 7001** on both platforms.

**How to get there.** The Connection Hub is the first screen the app shows. If you are already connected, disconnecting returns you here.

> **If nothing shows up:** confirm the phone and computer share the same network; on Windows confirm the remote server is running (**Ctrl+R**); on macOS 15+ confirm local-network permission was granted. Then fall back to manual IP entry with port 7001.

### Demo / Explore mode

Don't have a presenter on the network — or just want to look around? The Hub offers an **Explore / Demo** mode that runs the whole app against built-in sample data, no desktop connection required. Every tab is populated so you can learn the layout before a service.

---

## What happens when you connect (the handshake)

On connect, the phone and presenter exchange a short handshake: the phone sends a `hello` (announcing the protocol version and the list of capabilities it supports), and the presenter replies with the current **state**, **preview** thumbnails, and **media state**. From then on the phone stays in sync as you and the operator work.

**Operator-profile adoption** *(macOS only)* — On **macOS**, the presenter also sends a **profile frame** carrying the signed-in operator's account details (email, licence tier, organization). The phone **adopts that account automatically**, so the remote inherits whatever the operator is signed in to — no separate login needed.

On **Windows** *(Windows: not yet available)* — the presenter does **not** send a profile frame. The phone therefore has to **sign in itself** (email + password on the Account tab) if you want account-tied features on the remote.

---

## What the phone can control

Once paired, the remote is a full operating surface for the live service. The table below summarizes the controls; details for each are in the referenced desktop chapters.

| Control | What it does | Badge |
|---|---|---|
| **Previous / Next cue** | Step backward and forward through the running order | *(both)* |
| **Jump to cue + slide** | Tap any cue, then any slide within it, to take it live | *(both)* |
| **Blank** | Toggle the output to black | *(both)* |
| **Layered clear / restore** | Clear or restore individual lanes — slide, media, props, messages, or all | *(both)* |
| **Live preview thumbnails** | See the current and next slide as live images | *(both)* |
| **Present song** | Take a song from the library live | *(both)* |
| **Present scripture** | Take a scripture passage live | *(both)* |
| **Present media** | Take a media item live | *(both)* |
| **Media transport** | Play / pause / stop / restart / seek a video, with ~1 Hz position ticks | *(both — but see scrubber note)* |
| **Search** | Find songs, scripture, and media | *(both — scope differs, see below)* |
| **Song edit / create** | Edit an existing song's lyrics or create a new one, with optimistic concurrency so two editors don't clobber each other | *(both)* |
| **Remote screen configuration** | View and change output/screen setup from the phone | *(macOS only)* |
| **Bible-version listing** | Browse and choose Bible translations from the phone | *(macOS only)* |

### Honest notes on transport and search

- **The scrubber / position bar is display-only** *(both)* — Today, on **both** platforms, the media position bar shows elapsed and total time and updates as the clip plays, but you **cannot drag it to seek**. The working transport is **play / pause / stop / restart**. Treat the bar as a progress indicator, not a control.
- **Search scope differs by platform.** On **macOS**, remote search is **scope-aware** and resolves **Bible references** (type a reference and it finds the passage). On **Windows** *(Windows: not yet available)*, remote search is a **flat title/name substring match** — no scope, no Bible-reference resolution. It will find a song or media item by its name, but it will not resolve "John 3:16" to a passage.

---

## The phone's tabs

The remote is organized into five tabs along the bottom.

| Tab | What it's for | Badge |
|---|---|---|
| **Remote** | The live operating surface — previous/next, blank, layered clear/restore, current+next preview thumbnails, and media transport | *(both)* |
| **Cues** | The running order (the service's cue list). Tap a cue to jump to it, drill into its slides to take a specific slide live | *(both)* |
| **Library** | Songs, scripture, and media, with search. Present items live, and edit or create songs | *(both — search scope differs, see above)* |
| **Screens** | Remote screen / output configuration and Bible-version listing | *(macOS only — Windows returns "not supported")* |
| **Account** | Sign-in (email + password) and account status | *(both — but see below)* |

### Remote tab

**What it does.** Your primary live controls: previous/next tiles, a blank toggle, per-lane clear/restore, and live preview thumbnails of the current and next slide. When a video is live, the transport tiles (play/pause/stop/restart) and the display-only position bar appear here.

### Cues tab

**What it does.** Mirrors the presenter's running order so you can walk the service from your hand. Tap a cue to jump to it; open a cue to take an individual slide live.

### Library tab

**What it does.** Browse and search the song library, scripture, and media, and take any of them live (present song / scripture / media). This is also where you **edit or create a song** from the phone; edits use optimistic concurrency so your changes and the operator's don't overwrite each other. Remember the search-scope difference: Bible-reference search works on macOS but not on Windows.

### Screens tab *(macOS only)*

**What it does.** On **macOS**, lets you inspect and change output/screen configuration and see the list of available Bible versions from the phone.

On **Windows** *(Windows: not yet available)*, the presenter does not answer the phone's screen-configuration or Bible-version requests — it returns **"not supported"** — so this tab has nothing to drive there yet. Configure screens and Bible versions from the Windows desktop instead: see [Outputs & Screens](08-outputs-and-screens.md) and [Scripture](04-scripture.md).

### Account tab

**What it does.** Shows the signed-in account and offers sign-in with **email + password**.

- On **macOS**, the account is usually adopted from the operator automatically at connect (the profile frame), so you may already be signed in here.
- On **Windows**, there is no profile frame, so you sign in on this tab yourself if you want account-tied features.

---

## Quick troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Presenter not in the discovery list | mDNS blocked, or (Windows) server off, or (macOS 15+) local-network permission denied | Use manual IP + port 7001; on Windows press **Ctrl+R**; on macOS grant local-network permission |
| Phone connects but shows no account | Windows sends no profile frame | Sign in on the **Account** tab |
| Screens tab is empty / "not supported" | Connected to a Windows presenter | Expected today — configure screens on the desktop |
| Can't drag the position bar to seek | Scrubber is display-only on both platforms | Use play/pause/stop/restart instead |
| Search won't find a Bible reference | Connected to a Windows presenter (flat search) | Search by title, or resolve the reference on the desktop |

---

*See also:* [Outputs & Screens](08-outputs-and-screens.md) · [Scripture](04-scripture.md) · [Media](06-media.md) · [Preferences, Shortcuts & Menus](11-preferences-shortcuts.md) · [Platform Differences appendix](appendix-a-platform-differences.md)
