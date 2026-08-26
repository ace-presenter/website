# Outputs & Screens

This chapter covers everything ACE Presenter sends to a screen: the **audience output** your congregation sees, the **stage/confidence monitor** your musicians and speakers see, the **Screen Setup** dialog where you assign displays and tune each output, **multi-output** arrangements (mirror, grouped, edge-blend), the **OUTPUT control panel** for taking content live and clearing it, **quick screen** operator messages, and how the app recovers when a display is unplugged mid-service.

> **How outputs are stored.** macOS keeps a per-output map that can describe any number of outputs, each keyed to a specific display. Windows keeps two roles — **Audience** and **Stage** — plus a mirror list, keyed by display name. The practical result is the same day to day; the difference matters mostly for [multi-output](#multi-output-mirror-grouped-edge-blend) setups.

> **Tier note.** The **Free** tier provides a **single audience output only** — no stage output, no multiple/grouped displays, and a diagonal "ACE FREE" watermark on what it shows. Multiple outputs and stage displays require **Pro**; edge-blending and the deepest compositor require **Venue**. See [Getting Started ▸ Accounts & Tiers](01-getting-started.md).

---

## The audience output

**What it does.** The audience output is the fullscreen live program — the slides, scripture, media, and overlays your congregation sees — shown on the display you assign to it. It carries whatever is currently live, blanks to black when you blank, and shows the [Free-tier watermark](07-themes-looks-overlays.md) on the Free tier.

**How to get there.**

- **Assign a display:** open [Screen Setup](#the-screen-setup-dialog) — *Output ▸ Screen Setup…* (**macOS ⇧⌘, / Windows Ctrl+Shift+,**) — and pick a monitor for the audience output.
- **Show/hide it:** *Workspace ▸ Toggle Audience Screen* (**macOS ⌥⌘A / Windows Ctrl+L**), or the **AUD** button in the [OUTPUT control panel's](#the-output-control-panel) OUTPUTS row.

> **Shortcut collision (Windows).** On Windows, **Ctrl+L** toggles the audience screen. On macOS, ⇧⌘L is *Toggle Listening* (detection), an unrelated feature — don't carry the habit across platforms. See [Detection & Auto-Follow](05-detection-ai.md).

**Options.**

- **Keyboard on the output window itself** *(Windows only):* the Windows audience output window handles keys directly when focused — **arrows / Space / PageDown** advance to the next slide, **B** blanks, **Esc** closes the window. On macOS the audience window does not handle its own keys; drive it from the main window instead.
- **Windowed (no display):** if you have no second monitor, you can run the output in a window rather than fullscreen (see [Display assignment](#screen-setup-sub-tabs) below).

---

## The stage / confidence monitor

**What it does.** The stage output is a separate confidence display for people on the platform — musicians, speakers, tech. Instead of the raw program it shows a **configurable layout**: current and next slide, a clock, timers, scripture reference, slide counts, and more. (You design that layout in the Stage Layout editor — see [Themes, Looks & Overlays ▸ Stage Display Layout](07-themes-looks-overlays.md).)

**How to get there.**

- **Design the layout:** *Output ▸ Stage Layout…* (**macOS ⇧⌘T / Windows Ctrl+Shift+T**).
- **Show/hide the output:** *Workspace ▸ Toggle Stage Screen* (**macOS ⌥⌘S / Windows Ctrl+Shift+D**), or the **STG** button in the OUTPUTS row of the [OUTPUT control panel](#the-output-control-panel).

**Options.**

- **Mirror-program backdrop** — draw a dimmed copy of the live program behind the stage layout (set in [Screen Setup](#screen-setup-sub-tabs)). *(both)*
- Some stage-layout data sources are **not yet wired on either platform** — AI Confidence, Stage Message, Operator Note, Video Countdown, and Chord Chart slots render as placeholders for now. *(both)*
- The stage output requires **Pro or above**; Free is audience-only.

---

## The Screen Setup dialog

**What it does.** Screen Setup is the control room for every output: which display each one uses, its color grade, keystone correction, which layers it shows, how it goes fullscreen, its blanking color, and (for the stage) its theme and backdrop. It is also where you reach the [Identify overlay and test patterns](#identify-overlay--test-patterns).

**How to get there.** *Output ▸ Screen Setup…* — **macOS ⇧⌘, / Windows Ctrl+Shift+,**.

### Screen Setup sub-tabs

| Sub-tab | What it does | Platform notes |
|---|---|---|
| **Display assignment** | Pick the monitor for each output from a picker, or choose **"Windowed (no display)"** to run in a window. | *(both)* |
| **Color / grade** | Brightness, Saturation, Contrast sliders + **Reset**, to match a projector or LED wall. | macOS shows a numeric readout beside each slider; Windows shows the sliders only. |
| **Corner-Pin (keystone)** | Four draggable corner handles + **Reset** to correct a skewed projection; hold **⇧** while dragging for fine control. | *(both)* |
| **Layers** | Per-output visibility toggles: hide **Media**, **Messages**, **Props**, **Bible**, **Announcements** on that output. | *(both)* |
| **Fullscreen mode** | Choose **Borderless Fill** vs **True Fullscreen**. | On macOS these behave differently. On Windows both currently call the same fullscreen path, so they are **identical in effect** *(Windows: not yet available — the distinction)*. |
| **Screen color** | The color the output shows when blanked / with no content. | macOS applies this per-output. On Windows the setting is stored per-role but **only the audience color is actually applied** — a stage color is saved but not used *(Windows: not yet available — stage screen color)*. |
| **Stage Theme** (stage output only) | Override the theme used for the stage display. | macOS has a real picker. On Windows this tab is **placeholder text with no picker** *(Windows: not yet available)*. |
| **Mirror-program backdrop** (stage output only) | Draw a dimmed copy of the live program behind the stage layout. | *(both)* |

> Streaming-related toggles (NDI send, audio routing) also live in Screen Setup but are documented in [Streaming & Audio](09-streaming-and-audio.md).

---

## Multi-output: mirror, grouped, edge-blend

**What it does.** Beyond a single audience screen, ACE Presenter can drive several displays at once in a few arrangements:

- **Single** — one audience output.
- **Mirror** — the same program on multiple displays.
- **Grouped** — one wide image sliced across several displays (e.g. three projectors making one panorama). Each display shows one **slice** of the whole.
- **Edge-blend** — grouped output where adjacent slices overlap slightly and fade into each other, so the seams disappear on overlapping projectors.

Each slice is described by an index, a total count, an axis (horizontal/vertical), a pan offset, and a blend amount (up to ~30%).

**How to get there.** Assign the displays and configure slicing in [Screen Setup](#the-screen-setup-dialog).

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
| **TXT** | Blank the slide text layer. | macOS clears the slide (text) layer specifically; Windows currently maps this to a blank toggle. |
| **MEDIA** | Suppress the media/background layer (checkable). | macOS clears media plus any video input; Windows applies a scoped per-output media suppression, kept in sync across outputs. |
| **L3** | Clear the lower-third / props overlay. | *(both)* |
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

- **Windows:** *View ▸ Quick Screen…* (**Ctrl+J**). It opens as an inspector panel.
- **macOS:** the quick-screen sheet (also under the *Output* workspace controls); the shared shortcut is **⌘J**.
- **Clear it:** press **Esc**.

**Options.**

- **Route** the message to **ALL**, **STG** (stage), or **AUD** (audience). The default is **stage**, so you can cue the platform without the congregation seeing it.
- Type free text, or pick from **recents / presets** (saved between sessions).
- On macOS, showing a quick screen also ducks the front-of-house audio slightly; see [Streaming & Audio](09-streaming-and-audio.md).

---

## Hot-plug display recovery

**What it does.** If a display is unplugged, sleeps, or changes during a service, ACE Presenter tries to recover gracefully rather than dropping your output. When it can't reconnect automatically, it shows a banner telling you how to reassign.

**Platform behavior.**

- **macOS:** rebinds outputs by a stable display identifier, tracks which specific output was lost, dims a degraded window to ~45% so you can see something is wrong, and shows a banner: **"DISPLAY LOST … ⇧⌘, to reassign"**.
- **Windows:** re-matches displays by name and rebuilds any mirror set, showing a banner: **"… Ctrl+Shift+, to reassign"**. It does not dim the degraded window or rebind by stable identifier.

**What to do.** Follow the banner — open [Screen Setup](#the-screen-setup-dialog) (**macOS ⇧⌘, / Windows Ctrl+Shift+,**) and reassign the affected output to the correct monitor.

---

## Identify overlay & test patterns

**What it does.** When you're not sure which physical monitor is which — a common problem with three identical projectors — the Identify tools paint a label on every screen, and the test patterns help you check color, focus, and alignment before the service.

**How to get there.** The Screen Setup footer / Diagnostics area.

**Options.**

- **Identify Screens** — overlays each display's number, name, and resolution.
- **Identify Outputs** — overlays a role card (Audience / Stage) on each output.
- **Test Patterns:**
  - **macOS:** four patterns — **Color Bars, Focus Grid, Greyscale, Solid White** — each shown for **8 seconds**.
  - **Windows:** a single **color-bars** pattern shown for **3 seconds** *(Windows: reduced test-pattern set)*.

---

## See also

- [Themes, Looks & Overlays](07-themes-looks-overlays.md) — what renders on each layer, the stage-display layout editor, lower-thirds, logo, and the Free-tier watermark.
- [Streaming & Audio](09-streaming-and-audio.md) — NDI send/receive, capture cards, ATEM, and audio routing (also configured in Screen Setup).
- [Building a Service: Cues & Running Order](02-service-and-cues.md) — going live, blank/clear behavior, and Go On Air.
- [Appendix A — Platform Differences](appendix-a-platform-differences.md) — the authoritative macOS ↔ Windows list.
