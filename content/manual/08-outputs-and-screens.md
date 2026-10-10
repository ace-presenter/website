# Outputs & Screens

This chapter covers everything ACE Presenter sends to a screen: **screens and their destinations** (a display, a window, NDI, Syphon or SDI), the **audience output** your congregation sees, the **stage/confidence monitor** your musicians and speakers see, the **Screen Setup** dialog where you set all of this up, **multi-output** arrangements (mirror, grouped, edge-blend), the **OUTPUT control panel** for taking content live and clearing it, **quick screen** operator messages, and how the app recovers when a display is unplugged mid-service.

> **Screens and outputs.** A **screen** decides *what* is shown — its layers, its theme, its Look. An **output** is *where* it goes — a display, a window, or a network/video feed. A screen can have several outputs (the same picture in two places), and a role (Audience or Stage) can have several screens, each showing something different. See [Screens and destinations](#screens-and-destinations).

> **Tier note.** The **Free** tier provides a **single audience output only** — no stage output, no multiple/grouped displays, and a diagonal "ACE FREE" watermark on what it shows. Multiple outputs and stage displays require **Pro**; edge-blending and the deepest compositor require **Venue**. See [Getting Started ▸ Accounts & Tiers](01-getting-started.md).

---

## The audience output

**What it does.** The audience output is the fullscreen live program — the slides, scripture, media, and overlays your congregation sees — shown on the display you assign to it. It carries whatever is currently live, blanks to black when you blank, and shows the [Free-tier watermark](07-themes-looks-overlays.md) on the Free tier.

**How to get there.**

- **Assign a display:** open [Screen Setup](#the-screen-setup-dialog) — *Output ▸ Screen Setup…* (**macOS ⇧⌘, / Windows Ctrl+Shift+,**) — select the audience screen and pick a monitor in its [destination box](#screens-and-destinations).
- **Show/hide it:** *Workspace ▸ Toggle Audience Screen* (**macOS ⌥⌘A / Windows Ctrl+L**), or the **AUD** button in the [OUTPUT control panel's](#the-output-control-panel) OUTPUTS row.

> **Shortcut collision (Windows).** On Windows, **Ctrl+L** toggles the audience screen. On macOS, ⇧⌘L is *Toggle Listening* (detection), an unrelated feature — don't carry the habit across platforms. See [Detection & Auto-Follow](05-detection-ai.md).

**Options.**

- **Keyboard on the output window itself** *(Windows only):* the Windows audience output window handles keys directly when focused — **arrows / Space / PageDown** advance to the next slide, **B** blanks, **Esc** closes the window. On macOS the audience window does not handle its own keys; drive it from the main window instead.
- **Windowed:** if you have no second monitor, choose **Windowed** in the destination box to run the output in a window rather than fullscreen.

---

## The stage / confidence monitor

**What it does.** The stage output is a separate confidence display for people on the platform — musicians, speakers, tech. Instead of the raw program it shows a **configurable layout**: current and next slide, a clock, timers, scripture reference, slide counts, and more. (You design that layout in the Stage Layout editor — see [Themes, Looks & Overlays ▸ Stage Display Layout](07-themes-looks-overlays.md).)

**How to get there.**

- **Design the layout:** *Output ▸ Stage Layout…* (**macOS ⇧⌘T / Windows Ctrl+Shift+T**).
- **Show/hide the output:** *Workspace ▸ Toggle Stage Screen* (**macOS ⌥⌘S / Windows Ctrl+Shift+D**), or the **STG** button in the OUTPUTS row of the [OUTPUT control panel](#the-output-control-panel).

**Options.**

- **A layout per stage screen** — each stage screen picks its own layout in Screen Setup's **Stage Layout** picker, or follows the live layout (macOS: **Follow Live**; Windows: **Follow the live layout**). Give the musicians lyrics and chords and the director timers and notes. *(both)*
- **Mirror-program backdrop** — draw a dimmed copy of the live program behind the stage layout (set in [Screen Setup](#screen-setup-sub-tabs)). *(both)*
- **Screen preview** — a stage layout can carry a live picture of the audience screen *(Windows: not yet available)*.
- Some stage-layout data sources are **not yet wired on either platform** — AI Confidence, Stage Message, Operator Note, Video Countdown, and Chord Chart slots render as placeholders for now. *(both)*
- The stage output requires **Pro or above**; Free is audience-only.

---

## The Screen Setup dialog

**What it does.** Screen Setup is the control room for every screen and output: where each one goes, its color grade, keystone correction, which layers it shows, how it goes fullscreen, its blanking color, and (for the stage) its layout, theme and backdrop. It is also where you reach the [Identify overlay and test patterns](#identify-overlay--test-patterns).

**How to get there.** *Output ▸ Screen Setup…* — **macOS ⇧⌘, / Windows Ctrl+Shift+,**.

### Screens and destinations

The left side of Screen Setup lists your screens, grouped by role (Audience, Stage), with their outputs beneath them. *(both)*

**Adding a screen.** The **+** asks what you mean: *(both)*

- **New screen — its own layers and theme** — a screen of its own. It appears in the [Look editor](07-themes-looks-overlays.md#looks-per-screen-theme-assignments--pro) by name, so a stream feed can carry lyrics on black while the wall keeps the full look.
- **Another output — same content, second destination** — the same picture in a second place (mirroring).

**Naming.** Double-click a screen to rename it — "Foyer TV", "Balcony" — or right-click ▸ **Rename…**. *(both)*

**The destination box.** Click a selected output's destination box to choose where it goes:

| Destination | What it does | Platform |
|---|---|---|
| **Not in use — nothing opens** | Keeps the output configured but closed. | *(both)* |
| **Windowed** | A window on this computer. | *(both)* |
| **A display** (listed by name) | Fullscreen on that monitor or projector. | *(both)* |
| **NDI — send over the network** | Sends the screen as an NDI source **under that screen's name**, ready for a streaming machine, a switcher or another building — stage screens included. Needs the NDI runtime (see [Appendix C](appendix-c-dependencies.md)). | *(both)* |
| **Syphon — share with apps on this Mac** | Hands the screen straight to OBS, vMix or another app on the same Mac, with no network in between. | *(macOS only)* — Syphon is a Mac technology. |
| **SDI — *card name*** | Sends the screen out of a Blackmagic card as SDI, for a switcher or a hardware recorder. Listed only when a card is present. | *(macOS only for now)* *(Windows: not yet available)* |

> **The single NDI switch is retired.** NDI used to be one global "broadcast" switch that could only send the audience program. Any screen can now be an NDI feed through its destination box, which is why there's no separate NDI on/off. *(both)*

**Taking it back.** Removing a screen or output, or switching a whole role off, shows a banner with **Undo** for ten seconds. *(both)*

**Nothing hidden.** On macOS, screens your licence can't open are marked rather than left out, the destination box shows what the screen is actually putting out, and a tab holding a corner pin or hidden layer carries a dot so nothing sits there forgotten.

### Overlays NDI source

In Screen Setup's advanced section (**ADVANCED — RENDERER · NDI**), **Overlay source with transparency** publishes an extra NDI source — *"… Overlays"*, by default *ACE Overlays* — carrying only the lower thirds and your logo on a transparent background, for keying over cameras in vMix, OBS, an ATEM or a TriCaster. *(both)*

### Screen Setup sub-tabs

| Sub-tab | What it does | Platform notes |
|---|---|---|
| **Display / Hardware** | Where the output goes is set in the [destination box](#screens-and-destinations); this tab shows the output's size and aspect ratio. | *(both)* |
| **Color / grade** | Brightness, Saturation, Contrast sliders + **Reset**, to match a projector or LED wall. | macOS shows a numeric readout beside each slider; Windows shows the sliders only. |
| **Corner-Pin (keystone)** | Four draggable corner handles + **Reset** to correct a skewed projection; hold **⇧** while dragging for fine control. | *(both)* |
| **Layers** | Per-output visibility toggles: hide **Media**, **Messages**, **Props**, **Bible**, **Announcements** on that output. | *(both)* |
| **Fullscreen mode** | Choose **Borderless Fill** vs **True Fullscreen** (under DISPLAY MODE). | On macOS these behave differently. On Windows both currently use the same fullscreen path, so they are **identical in effect** *(Windows: not yet available — the distinction)*. |
| **Screen color** | The color the output shows when blanked / with no content. | macOS applies this per-output. On Windows the setting is stored per-role but **only the audience color is actually applied** — a stage color is saved but not used *(Windows: not yet available — stage screen color)*. |
| **Stage Layout** (stage screens) | The layout this stage screen shows, or follow the live layout. | *(both)* |
| **Stage Theme** (stage output only) | Override the theme used for the stage display. | macOS has a real picker (**Same as Audience** or a theme). On Windows this tab is **placeholder text with no picker** *(Windows: not yet available)*. |
| **Mirror-program backdrop** (stage output only) | Draw a dimmed copy of the live program behind the stage layout. | *(both)* |

> Audio routing (**Screen Setup ▸ Audio**) and NDI as a destination are documented further in [Streaming & Audio](09-streaming-and-audio.md).

---

## Multi-output: mirror, grouped, edge-blend

**What it does.** Beyond a single audience screen, ACE Presenter can drive several displays at once in a few arrangements:

- **Single** — one audience output.
- **Mirror** — the same program on multiple displays.
- **Grouped** — one wide image sliced across several displays (e.g. three projectors making one panorama). Each display shows one **slice** of the whole.
- **Edge-blend** — grouped output where adjacent slices overlap slightly and fade into each other, so the seams disappear on overlapping projectors.

Each slice is described by an index, a total count, an axis (horizontal/vertical), a pan offset, and a blend amount (up to ~30%).

**How to get there.** Assign the displays and configure slicing in [Screen Setup](#the-screen-setup-dialog). Mirroring is a choice you make with **+ ▸ Another output**.

**Options & platform notes.**

- **Slice count & index** — macOS lets you set the total number of slices and each display's index by hand. On Windows the **slice count and index are derived from the screen-list order** and cannot be overridden manually *(Windows: not yet available — manual slice count/index)*.
- **Pan and axis** — adjustable on both platforms.
- **Edge blend** — a **Venue-tier** feature. Neither platform yet threads the blend percentage fully into every slice, so treat edge-blend width as approximate and verify on the wall.
- Multiple outputs require **Pro**; edge-blending requires **Venue**.

---

## The OUTPUT control panel

**What it does.** The OUTPUT control panel is the always-visible strip of live controls for taking content live, blanking, clearing specific layers, and showing/hiding outputs. It is organized as four rows.

**How to get there.** It sits in the main window (see [the main window overview](README.md#the-main-window-at-a-glance)); its actions also appear under the *Output* menu.

### OUTPUT row

| Control | What it does |
|---|---|
| **CLEAR** | Stop showing any content — clears the slide, media, blanks, and any quick screen. Same as *Output ▸ Clear*. |
| **BLACK ↔ SHOW** | Toggle a full blank. The button reads **BLACK** when live and flips to **SHOW** while blanked. Same as the blank shortcut (**macOS ⌘B / Windows B**). |
| **LIVE** | Status indicator — lit when program is live, reads **IDLE** otherwise. |
| **TAKE** | Advance to the next slide (take next). |

### CLEAR TARGETS row — ALL / AUD / STG

Scopes **which outputs** the CLEAR / BLACK / MEDIA actions affect: **ALL** outputs, **AUD** (audience only), or **STG** (stage only). On Windows this selection persists as the engine's blank scope, so a blank or media clear can be aimed at just one output. *(both)*

### LAYERS row

Clears or hides individual layers without disturbing the rest of the live output.

| Button | What it does | Platform notes |
|---|---|---|
| **TXT** | Clear / hide the slide text layer. | macOS clears the slide (text) layer; on Windows it's an on/off toggle that hides the text on the targeted outputs. |
| **MEDIA** | Suppress the media/background layer (checkable). | macOS clears media plus any video input; Windows hides the media/backdrop on the targeted outputs. The NDI feeds follow this button too. |
| **L3** | Clear the lower-third / props overlay. | *(both)* — a toggle on Windows. |
| **ALL CLR** | Clear everything and restore all layers to their normal state. | *(both)* |

See [Themes, Looks & Overlays](07-themes-looks-overlays.md) for what lives on each layer (lower-thirds, logo, translation overlay).

### OUTPUTS row — AUD / STG

Toggles the audience and stage outputs.

- **macOS:** **enables/disables** the output (the disabled state is remembered between sessions).
- **Windows:** **shows/hides** the output window, subject to the role being enabled in [Screen Setup](#the-screen-setup-dialog).

The **AUD** and **STG** buttons mirror the *Workspace ▸ Toggle Audience/Stage* shortcuts above.

---

## Quick screen / operator messages

**What it does.** Quick screen puts a short text message directly on an output — "Please silence your phones", "Prayer time", a countdown note, or a message to the platform. Useful for on-the-fly announcements without building a cue.

**How to get there.**

- *View ▸ Quick Screen…* (**⌘J / Ctrl+J**). *(both)*
- **Clear it:** macOS *Output ▸ Clear Quick Screen* (**Esc**); Windows **Clear screen**.

**Options.**

- **Route** the message to **All**, **Stage**, or **Audience**. On macOS the default is **stage**, so you can cue the platform without the congregation seeing it; on Windows the default is **Audience**.
- Type free text, or pick from **recents / presets** (saved between sessions).
- **Windows:** the sheet's *Push to…* button currently only saves the text to recents — show the message from the **Messages** tab instead *(Windows: Push not yet working)*.
- On macOS, showing a quick screen also ducks the front-of-house audio slightly; see [Streaming & Audio](09-streaming-and-audio.md).

---

## Hot-plug display recovery

**What it does.** If a display is unplugged, sleeps, or changes during a service, ACE Presenter tries to recover gracefully rather than dropping your output. When it can't reconnect automatically, it shows a banner telling you how to reassign.

**Platform behavior.**

- **macOS:** rebinds outputs by a stable display identifier, tracks which specific output was lost, dims a degraded window to ~45% so you can see something is wrong, and shows a banner: **"DISPLAY LOST … ⇧⌘, to reassign"**.
- **Windows:** moves windows to the remaining displays and shows a **DISPLAY LOST** banner — **"… — Ctrl+Shift+, to reassign"** — with a **REASSIGN** button. It does not dim the degraded window or rebind by stable identifier.

**What to do.** Follow the banner — open [Screen Setup](#the-screen-setup-dialog) (**macOS ⇧⌘, / Windows Ctrl+Shift+,**) and reassign the affected output to the correct monitor.

---

## Identify overlay & test patterns

**What it does.** When you're not sure which physical monitor is which — a common problem with three identical projectors — the Identify tools paint a label on every screen, and the test patterns help you check color, focus, and alignment before the service.

**How to get there.** The Screen Setup footer / Diagnostics area.

**Options.**

- **Identify Screens** — overlays each display's number, name, and resolution.
- **Identify Outputs** — overlays a role card (Audience / Stage) on each output. (On Windows it labels the main audience and stage outputs only, not extra named screens.)
- **Test Patterns:**
  - **macOS:** four patterns — **Color Bars, Focus Grid, Greyscale, Solid White** — each shown for **8 seconds**.
  - **Windows:** a single **color-bars** pattern shown for **3 seconds** *(Windows: reduced test-pattern set)*.

---

## See also

- [Themes, Looks & Overlays](07-themes-looks-overlays.md) — what renders on each layer, the stage-display layout editor, lower-thirds, logo, and the Free-tier watermark.
- [Streaming & Audio](09-streaming-and-audio.md) — the livestream, NDI receive, capture cards, ATEM, and audio routing (also configured in Screen Setup).
- [Building a Service: Cues & Running Order](02-service-and-cues.md) — going live, blank/clear behavior, and Go On Air.
- [Appendix A — Platform Differences](appendix-a-platform-differences.md) — the authoritative macOS ↔ Windows list.
