# Themes, Looks & Overlays

This chapter covers everything that controls how your slides *look* on screen: the **Looks workspace** for applying and switching themes at showtime, the **Theme Editor** for designing them, **text scaling** that keeps words inside their box, the **lower thirds** (animated name bars, and lyrics or scripture as a lower-third bar), the other **overlays** that sit on top of every slide (logo/watermark, translation band, CCLI, the Free-tier watermark), and the **Stage Display Layout editor** for your confidence/stage monitor.

For where these themes actually appear — audience versus stage windows, multiple outputs, transparency for downstream keying — see [Outputs & Screens](08-outputs-and-screens.md). For the slide content that themes render (song lyrics, scripture, sections), see [Songs & Arrangements](03-songs-and-arrangements.md) and [Scripture](04-scripture.md).

> **Reading conventions.** Shortcuts are written **macOS ⌘X / Windows Ctrl+X**. Availability badges: *(both)*, *(macOS only)*, *(Windows: not yet available)*, *(Pro)*.

---

## The Looks workspace

**What it does.** The Looks workspace is where you apply a theme (or a Look) to what is currently on screen. It has two sections:

- **THEMES** — a grid of theme tiles. Tapping a tile applies that theme immediately (`applyTheme`); the tile that is currently on air shows a **LIVE** badge.
- **LOOKS** — named *per-screen theme assignments* (for example, a warm theme on the audience screen while the stage screen runs a high-contrast cue-list look). *(Pro)*

The two sections are **mutually exclusive**: applying a theme clears the active Look, and applying a Look overrides the plain theme. Only one is live at a time.

**How to get there.** Open the workspace with **⌘5 / Ctrl+5**, or from the workspace switcher. From here you can also jump straight into design tools: **Edit Themes** opens the [Theme Editor](#the-theme-editor); **Edit Looks** opens the Look editor (it reads **Upgrade to Pro** without a Pro licence). On Windows the Look editor is also at *Editors ▸ Look Editor*.

**Options.**

| Element | What it does | Availability |
|---|---|---|
| Theme tile | Applies the theme to live output | *(both)* |
| **LIVE** badge | Marks the theme/Look currently on air | *(both)* |
| Edit Themes | Opens the Theme Editor | *(both)* |
| Edit Looks | Opens the per-screen Look editor | *(both)* *(Pro)* |

### Looks (per-screen theme assignments) — *(Pro)*

A **Look** decides what each screen shows, so one action re-skins your whole rig at once. In the Look editor you set, per screen, an optional theme override and which **layers** that screen shows, then save the result as a named Look you can recall from the Looks grid. *(both)*

- **Layers really come off.** Turning *Background* or *Media* off for a screen in a Look takes it off that screen — the wall, the stage and the network feed alike.
- **A Look sits on top of the show's theme.** Screens a Look doesn't mention keep their theme rather than going black.
- **One theme for the whole service.** The Look editor's **ALL SCREENS ▸ Theme** sets a single theme across every screen at once ("everything goes white tonight"). It holds even over cues that carry a theme of their own; a screen you've given its own theme in the Look still keeps it.
- **Screens of their own** (added in [Screen Setup](08-outputs-and-screens.md#screens-and-destinations)) appear in the Look editor by name, so a stream feed can carry lyrics on black while the wall keeps the full look.
- macOS also offers per-screen opacity/blend and transitions, and lists Looks in the [Command Palette](11-preferences-shortcuts.md).

Because Looks is Pro-gated, the Free tier shows the upgrade prompt on both platforms. See [Getting Started ▸ Accounts & Tiers](01-getting-started.md#accounts--tiers).

---

## The Theme Editor

**What it does.** The Theme Editor is where you design a theme — the fonts, colors, background, and on-slide objects that ACE uses to render every slide of a given kind. It is a **three-pane** editor: a **sidebar** listing your themes (with a separate **LOWER THIRD THEMES** section), a **16:9 canvas** in the middle, and an **inspector** on the right for the selected object or the theme as a whole. It opens as a window of its own that you can move, resize and leave open.

**How to get there.** *Output ▸ Themes…* (**⌘T / Ctrl+T**), or **Edit Themes** in the [Looks workspace](#the-looks-workspace).

**Working in the editor.**

- **Make Active** applies the theme you are editing to live output. (On Windows the button reads **Make Active**, then flips to **Active** once applied.)
- Changes **auto-save**, with **undo/redo** while you work.
- **Rulers and guides** help you align objects on the canvas *(macOS)*.

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

Text objects can contain **content tokens** — placeholders ACE substitutes at render time (see below) — and each has [Scaling and Line Transform](#text-that-fits-its-box-scaling-and-line-transform) settings.

### Text that fits its box: Scaling and Line Transform

**What it does.** Keeps text inside its box, the way ProPresenter does. Every text box has these settings in the Text inspector: *(both)*

| Setting | Choices | Effect |
|---|---|---|
| **Scaling** | **None** · **Text up or down** · **Text up** · **Text down** | Whether the text grows to fill the box, shrinks to fit it, or both. |
| **Size limits** | **Min** / **Max** | The smallest and largest size Scaling may use. |
| **Line Transform** | **None** · **One word per line** · **One character per line** · **Remove line returns** · **Replace line returns** (with a **Replace with** field) | Reshapes the lines before they're drawn. |

**Lyrics and Bible verses shrink to fit by default**, so a long passage is never cut off — on the screen or the stage display. The [Stage Layout editor](#the-stage-display-layout-editor) has Scaling with Min/Max too (no Line Transform). Scaling and Line Transform don't apply to lower-third slides, which size their bar to the words instead.

### Content tokens

Text objects use `{{token}}` placeholders that ACE fills in from the live slide.

| Token | Renders | Availability |
|---|---|---|
| `{{title}}` | Song/cue title | *(both)* |
| `{{lyrics}}` | The slide's lyric lines | *(both)* |
| `{{verse}}` | Current verse text (Windows also accepts `{{scripture}}`) | *(both)* |
| `{{reference}}` | The passage reference | *(both)* |
| `{{translation}}` | The translation name | *(both)* |
| `{{verse:N}}`, `{{translation:N}}` | The Nth column of a comparison layout (indexed) | *(both)* |

A theme built on one edition renders the same on the other.

### Per-slide templates & comparison themes

A single theme carries **multiple per-slide templates** — **Lyrics**, **Bible**, **Title**, **Blank**, **Compare 2 / 3 / 4 Translations** and **Lower Third** — listed under **SLIDES** in the editor (the **+** adds one). ACE picks the right template automatically: Lyrics for a song, Bible for a verse, Compare *N* for a comparison. In the Bible and Compare templates the reference, the verse and the translation each sit in a box of their own. Themes from earlier versions get the missing templates added without losing anything you designed. *(both)*

### Built-in themes

- **macOS** — a library-driven set of built-in themes.
- **Windows** — three starters: **Default Dark**, **Bold Red**, **Minimal White**.
- **Both** — two lower-third themes, **Static** and **Animated** (see [Lyrics and scripture as lower thirds](#lyrics-and-scripture-as-lower-thirds)).

You can duplicate and edit any built-in as the starting point for your own.

---

## Slide rendering

Every slide is composed on a fixed **1920×1080** canvas and then scaled to fit each output, **letterboxing** to preserve aspect ratio. Text follows each box's [Scaling](#text-that-fits-its-box-scaling-and-line-transform) setting; lyric and verse boxes shrink to fit by default.

Under the hood the two editions render differently, which is why some effects are macOS-only:

- **macOS** — a 10-layer compositor with per-layer opacity, blend modes, and transitions, GPU-accelerated, including a scrolling-lyrics mode.
- **Windows** — a single composited slide image plus a separate overlay widget.

For how many layers your tier unlocks and how layers are cleared per output, see [Outputs & Screens ▸ Layers](08-outputs-and-screens.md).

---

## Overlays

Overlays draw *on top of* whatever theme is live. They are configured once and stay on until you turn them off.

### Lower thirds

**What it does.** A lower third is a title/subtitle bar (speaker name and role, sermon title, announcement) that fires over the current slide. Lower thirds **animate in, hold, and animate out**. *(both)*

**How to get there.** **macOS:** the **EDITORS** pop-up in the tab bar ▸ **Lower Thirds**. **Windows:** *Editors ▸ Lower Thirds* (**Ctrl+Shift+L**). Press **+** to create one.

**Options.**

| Option | Choices |
|---|---|
| **Title** / **Subtitle** (optional) | The two text fields |
| **Design** | The theme's default, or one of **twelve** designs: Classic Bar · Full-Width Band · Name Bug · Centered Card · Wipe Bar · Line Draw · Split Bar · Glass Panel · Kinetic Type · Scripture Tag · Social Handle · Ticker |
| **Hide automatically** | Takes the lower third down by itself after the seconds you set |
| Alignment, margin, background opacity, title/subtitle size | Placement and sizing |
| Accent color / Text color | Bar and type colors |

**Designing your own.** A lower third's look comes from a theme: design your own under **LOWER THIRD THEMES** in the Theme Editor, set how each part moves **in** and **out**, and press **Play** to watch it run. Change the theme and the look follows.

**In the Cue Plan.** Making a lower third adds its cue to the plan; **clicking the cue fires it**. Right-click the cue for **Edit Lower Third…** (Windows also lists **Fire Lower Third**). **CLEAR** takes a lower third down too, and clearing one from the phone remote no longer clears the whole screen. *(both)*

**Where they appear.** On the audience screen, the PROGRAM monitor, NDI, the livestream and the recording. For keying over cameras, Screen Setup's **Overlay source with transparency** publishes a separate NDI source — named *"… Overlays"* (default *ACE Overlays*) — carrying just the lower thirds and your logo on a clear background. *(both)* See [Outputs & Screens](08-outputs-and-screens.md#overlays-ndi-source).

### Lyrics and scripture as lower thirds

**What it does.** Songs and verses can go out as a **bar along the bottom** instead of filling the screen — the look a livestream or camera feed needs. Give your stream screen a lower-third theme in its Look and the room keeps its full-screen words. *(both)*

- **Two ready-made themes**, **Static** and **Animated**, sit in the Theme Editor beside your other themes. Press **+** under **LOWER THIRD THEMES** to make your own from **sixteen designs** for lyrics and Bible — half static, half animated — and set colours and position once for the whole theme. Every part of a design can be animated in, out and on Next; **Play** shows exactly what will go out.
- **The bar stays up; the words change.** The bar comes in with the first line, and on every Next only the words change, with the bar growing or shrinking smoothly to fit. CLEAR, a blank or an announcement takes it out. Verses compared in two, three or four translations sit side by side, one column each.
- **Too long? Split it.** A slide with more words than the bar can hold is marked **TOO LONG** in the slide grid (*"Too long for a lower third. Right-click → Split in Two."*). Right-click it ▸ **Split in Two**: it breaks where a reader would pause and keeps the reference on both halves.

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

**What it does.** For licence compliance, once your CCLI licence number is set ACE draws it, small and dimmed, on song-lyric slides, together with the song's **credit line** — title, writers, © and CCLI song number — on the slides chosen with the Song panel's **Credit:** picker (first slide by default). See [Songs & Arrangements ▸ CCLI credit line and usage report](03-songs-and-arrangements.md#ccli-credit-line-and-usage-report).

**How to get there.** *Preferences ▸ General ▸ CCLI license number* (see [Preferences](11-preferences-shortcuts.md)).

- **macOS** — shown on song slides.
- **Windows** — drawn by the built-in slide layout; themes built from positioned objects don't draw the number or the credit line yet *(Windows: not yet available on object-based themes)*.

---

## The Stage Display Layout editor

**What it does.** Designs the layout of your **stage / confidence monitor** — the screen the worship team and speaker see. It is a 1920×1080 canvas of **slots** you place and size, some of which show **live data** pulled from the presentation engine.

**How to get there.** *Output ▸ Stage Layout…* (**⇧⌘T / Ctrl+Shift+T**). It opens as a window of its own. Toggle the stage output itself with **⌥⌘S / Ctrl+Shift+D**; see [Outputs & Screens ▸ Stage monitor](08-outputs-and-screens.md).

**Each stage screen can show something different.** Every stage screen picks its own layout in Screen Setup (**Stage Layout**, or follow the live layout) — lyrics and chords on the musicians' monitor, timers and notes on the director's. See [Outputs & Screens](08-outputs-and-screens.md#the-stage--confidence-monitor). *(both)*

> **Free tier:** there is no stage output on Free (audience only). Stage layouts require Pro or above.

**Slot types.**

| Slot | What it holds |
|---|---|
| **Text** | Static text you type |
| **Live Text** | A live engine source (see table below) |
| **Shape** | A rectangle/graphic element |
| **Image** | A static image |
| **Video** | A video element |
| **Screen preview** | A live picture of the audience screen, so a musician sees what the congregation sees without turning round *(Windows: not yet available)* |

Text and Live Text slots have **Scaling** with **Min/Max** size limits, like theme text boxes.

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
- **Windows** — a lighter editor: layouts are stored in app settings, with **no undo/snap/rulers** *(Windows: not yet available)* and a **reduced source picker** that omits **Video Countdown**, **Chord Chart**, and **Next Scripture Translation**.

> **Stage theme override.** The per-output *Stage Theme* control (in Screen Setup) is a real picker on macOS (**Same as Audience** or a theme) but still a **placeholder on Windows** *(Windows: not yet available)*. See [Outputs & Screens ▸ Screen Setup](08-outputs-and-screens.md).
