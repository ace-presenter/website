# Themes, Looks & Overlays

This chapter covers everything that controls how your slides *look* on screen: the **Looks workspace** for applying and switching themes at showtime, the **Theme Editor** for designing them, the **overlays** that sit on top of every slide (lower-thirds, logo/watermark, translation band, CCLI, the Free-tier watermark), and the **Stage Display Layout editor** for your confidence/stage monitor.

For where these themes actually appear — audience versus stage windows, multiple outputs, transparency for downstream keying — see [Outputs & Screens](08-outputs-and-screens.md). For the slide content that themes render (song lyrics, scripture, sections), see [Songs & Arrangements](03-songs-and-arrangements.md) and [Scripture](04-scripture.md).

> **Reading conventions.** Shortcuts are written **macOS ⌘X / Windows Ctrl+X**. Availability badges: *(both)*, *(macOS only)*, *(Windows: not yet available)*, *(Pro)*.

---

## The Looks workspace

**What it does.** The Looks workspace is where you apply a theme (or a Look) to what is currently on screen. It has two sections:

- **THEMES** — a grid of theme tiles. Tapping a tile applies that theme immediately (`applyTheme`); the tile that is currently on air shows a **LIVE** badge.
- **LOOKS** — named *per-screen theme assignments* (for example, a warm theme on the audience screen while the stage screen runs a high-contrast cue-list look). *(Pro)*

The two sections are **mutually exclusive**: applying a theme clears the active Look, and applying a Look overrides the plain theme. Only one is live at a time.

**How to get there.** Open the workspace with **⌘5 / Ctrl+5**, or from the workspace switcher. From here you can also jump straight into design tools: **Edit Themes** opens the [Theme Editor](#the-theme-editor); **Edit Looks** *(macOS)* opens the Look editor.

**Options.**

| Element | What it does | Availability |
|---|---|---|
| Theme tile | Applies the theme to live output | *(both)* |
| **LIVE** badge | Marks the theme/Look currently on air | *(both)* |
| Edit Themes | Opens the Theme Editor | *(both)* |
| Edit Looks | Opens the per-screen Look editor | *(macOS only)* |

### Looks (per-screen theme assignments) — *(Pro)*

A **Look** bundles a theme *per screen*, so one action re-skins your whole rig at once. On macOS the **LookEditor** lets you assign, per screen, a theme plus its layers, opacity/blend, and transition, then save the result as a named Look you can recall from the Looks grid or the [Command Palette](11-preferences-shortcuts.md).

- **macOS** — full authoring. Create, name, and edit Looks with per-screen theme, layers, opacity/blend, and transitions.
- **Windows: not yet available** — the LOOKS section is an **upsell**, not an editor. On the Free tier the button reads **Upgrade to Pro**; even on Pro the Windows port folds Looks into the flat theme list rather than authoring per-screen assignments. The hint text explains what a Look *would* do ("a warm audience theme while the stage runs a high-contrast cue list"), but there is no Look editor on Windows yet.

Because Looks is Pro-gated, the Free tier shows the upgrade prompt on both platforms. See [Getting Started ▸ Accounts & Tiers](01-getting-started.md#accounts--tiers).

---

## The Theme Editor

**What it does.** The Theme Editor is where you design a theme — the fonts, colors, background, and on-slide objects that ACE uses to render every slide of a given kind. It is a **three-pane** editor: a **sidebar** listing your themes, a **16:9 canvas** in the middle, and an **inspector** on the right for the selected object or the theme as a whole.

**How to get there.** *Output ▸ Themes…* (**⌘T / Ctrl+T**), or **Edit Themes** in the [Looks workspace](#the-looks-workspace).

**Working in the editor.**

- **Make Active** applies the theme you are editing to live output. (On Windows the button reads **Make Active**, then flips to **Active** once applied.)
- Changes **auto-save**, with **undo/redo** while you work.
- **Rulers and guides** help you align objects on the canvas *(macOS richer; Windows provides the core canvas)*.

### Fonts

- Pick from all installed font families.
- **Import** custom fonts (`.ttf`, `.otf`, `.ttc`) so a theme can travel with its typeface. *(both)*

### Colors

Set colors by hex for:

| Target | Purpose |
|---|---|
| **Text** | Fill color of the type |
| **Stroke** | Outline around glyphs |
| **Shadow** | Drop shadow behind text |

### Alignment

Horizontal **and** vertical alignment for text within its box.

### Background

| Mode | What it does |
|---|---|
| **Solid** | A single fill color |
| **Gradient** | A color gradient |
| **Image** | A still image background |
| **Transparent** | No background — passes alpha through for NDI/downstream keying (see [Streaming & Audio ▸ NDI](09-streaming-and-audio.md)) |

### Objects

A theme can carry **objects** stacked on the canvas: **text**, **shape**, and **image**. Each object has these properties:

| Property | What it does |
|---|---|
| Visibility | Show/hide the object |
| Lock | Prevent accidental edits |
| Z-order | Front-to-back stacking |
| Rotation | Angle in degrees |
| Opacity | Transparency |
| Build animation | An entrance/reveal animation |

Text objects can contain **content tokens** — placeholders ACE substitutes at render time (see below).

### Content tokens

Text objects use `{{token}}` placeholders that ACE fills in from the live slide.

| Token | Renders | Availability |
|---|---|---|
| `{{title}}` | Song/cue title | *(both)* |
| `{{verse}}` | Current verse text (macOS) | macOS |
| `{{scripture}}` | Current passage text (Windows uses this where macOS uses `{{verse}}`) | Windows |
| `{{translation}}` | Translated line for comparison/multi-language themes | **macOS only** — *(Windows: not yet available)* |
| `{{verse:N}}` | The Nth verse in a comparison layout (indexed) | **macOS only** — *(Windows: not yet available)* |

> **Windows token caveat.** The Windows renderer **ignores `{{translation}}` and indexed `{{verse:N}}`**, and uses `{{scripture}}` where macOS uses `{{verse}}`. If you build a theme on macOS that relies on translation or indexed-verse tokens and open it on Windows, those tokens will not render. See [Per-slide templates & comparison](#per-slide-templates--comparison-themes) below.

### Per-slide templates & comparison themes

- **macOS** — a single theme carries **multiple per-slide templates** (Lyrics / Bible / Title / Blank), and ACE picks the right template automatically based on the cue's kind. macOS themes can also define **comparison / multi-translation** layouts that show several translations at once (**Compare N Translations**), driven by the `{{translation}}` and `{{verse:N}}` tokens above.
- **Windows: not yet available** — a Windows theme is a **single object canvas**. The "add slide template" control is present but **stubbed** (it does not yet create per-kind templates), and comparison / multi-translation themes are macOS-only.

### Built-in themes

- **macOS** — a library-driven set of built-in themes.
- **Windows** — three hardcoded starters: **Default Dark**, **Bold Red**, **Minimal White**.

You can duplicate and edit any built-in as the starting point for your own.

---

## Slide rendering

Every slide is composed on a fixed **1920×1080** canvas and then scaled to fit each output, **letterboxing** to preserve aspect ratio. Text **auto-fits** — long lines shrink to stay inside their box.

Under the hood the two editions render differently, which is why some effects are macOS-only:

- **macOS** — a 10-layer compositor with per-layer opacity, blend modes, and transitions, GPU-accelerated, including a scrolling-lyrics mode.
- **Windows** — a single composited slide image plus a separate overlay widget.

For how many layers your tier unlocks and how layers are cleared per output, see [Outputs & Screens ▸ Layers](08-outputs-and-screens.md).

---

## Overlays

Overlays draw *on top of* whatever theme is live. They are configured once and stay on until you turn them off.

### Lower-thirds

**What it does.** A lower-third is a title/subtitle banner (speaker name, sermon title, announcement) that fires over the current slide.

**How to get there.** *Editors ▸ Lower Thirds*. On Windows this is **Ctrl+Shift+L**. *(macOS has no default shortcut.)*

**Options.**

| Option | Choices |
|---|---|
| Title / Subtitle | The two text fields |
| **Style** | Classic Bar · Full-Width Band · Name Bug · Centered Card |
| Accent color / Text color | Banner and type colors |
| Alignment | Left / center / right |
| Opacity | Banner transparency |
| Margin | Distance from the screen edge |
| Font sizes | Title and subtitle sizes |

Each saved lower-third row has its own **FIRE** (put it on air) and **HIDE** (take it off) controls, so you can prepare several and trigger them during the service.

**Where they're stored.** macOS stores lower-thirds inside the presentation document; Windows stores them in app settings (with a migration for older files). Functionally they behave the same *(both)*.

### Logo / watermark overlay

**What it does.** Pins a logo or watermark image to a corner or the center of every output. Once configured it is **always on** until you clear it.

**How to get there.** *Workspace ▸ Logo / Watermark…*

**Options:** image file, position (corner or center), **width %**, **opacity**, and **margin**.

### Translation overlay

**What it does.** A subtitle-style band that shows translated text across the bottom (or top/center) of the output. This is a *visual* overlay and is **decoupled** from spoken-language audio translation — see [Streaming & Audio ▸ Audio routing](09-streaming-and-audio.md) for the audio side.

**How to get there.** *Output ▸ Translation Overlay…*

**Options.**

| Option | Choices |
|---|---|
| Position | Top / bottom / center |
| Style | Band / translucent / text-only |
| Language | ISO-639-1 language code |

### The Free-tier watermark

On the **Free** tier, ACE tiles a diagonal **"ACE FREE"** watermark across the full screen at 50% opacity. It is automatic and identical on both platforms *(both)*, and disappears when you sign in on a Pro or Venue licence. See [Getting Started ▸ Accounts & Tiers](01-getting-started.md#accounts--tiers).

### The CCLI number

**What it does.** For licence compliance, ACE draws a small, dimmed CCLI licence number in the corner of song-lyric slides.

**How to get there.** Set your number in *Settings / Preferences ▸ CCLI license number* (see [Preferences](11-preferences-shortcuts.md)).

- **macOS** — always shown on song slides.
- **Windows: not yet available** on object-based themes — Windows renders the CCLI number **only on legacy-style themes**, not on the newer object-based themes. If you rely on CCLI display on Windows, use a legacy theme until this lands.

---

## The Stage Display Layout editor

**What it does.** Designs the layout of your **stage / confidence monitor** — the screen the worship team and speaker see. It is a 1920×1080 canvas of **slots** you place and size, some of which show **live data** pulled from the presentation engine.

**How to get there.** *Output ▸ Stage Layout…* (**⇧⌘T / Ctrl+Shift+T**). Toggle the stage output itself with **⌥⌘S / Ctrl+Shift+D**; see [Outputs & Screens ▸ Stage monitor](08-outputs-and-screens.md).

> **Free tier:** there is no stage output on Free (audience only). Stage layouts require Pro or above.

**Slot types.**

| Slot | What it holds |
|---|---|
| **Text** | Static text you type |
| **Live Text** | A live engine source (see table below) |
| **Shape** | A rectangle/graphic element |
| **Image** | A static image |
| **Video** | A video element |

**Live Text sources.** A Live Text slot binds to one of the engine's data sources:

| Source | Shows | Availability |
|---|---|---|
| Current slide | Text of the live slide | *(both)* |
| Next slide | Text of the upcoming slide | *(both)* |
| Timer | A running timer | *(both)* |
| Clock | Wall-clock time | *(both)* |
| Presentation name | Current cue/song title | *(both)* |
| Counts | Slide/section counts | *(both)* |
| Scripture reference (now / next) | Passage citation | *(both)* |
| Scripture translation (now) | Translation name | *(both)* |
| Scripture verse (now / next) | Verse text | *(both)* |
| Next scripture translation | Upcoming translation | *(macOS only)* |
| AI confidence | Live detection confidence | *(macOS)* |
| Video countdown | Time remaining on media | *(macOS only)* |
| Chord chart | Chord/lyric chart | *(macOS only)* |

**Presets.** Start from a ready-made layout: **Default**, **Classic NOW + NEXT**, **Speaker View**, **Scripture Reader**. You can then save your own **named layouts** and recall them.

**Platform differences.**

- **macOS** — the richer editor: layouts are stored in the presentation, with **undo/redo**, **snap**, and **rulers**, and the **full source list**.
- **Windows** — a lighter editor: layouts are stored in app settings (`stage/layoutJSON` and `stage/savedLayouts`), with **no undo/snap/rulers** and a **reduced source picker** that omits **Video Countdown**, **Chord Chart**, and **Next Scripture Translation**.

> **Stage theme override.** The per-output *Stage Theme* control (in Screen Setup) is a real picker on macOS but a **placeholder on Windows** — it does not yet apply a stage-specific theme. This lives with the output configuration; see [Outputs & Screens ▸ Screen Setup](08-outputs-and-screens.md).
