# Scripture

The **Bible workspace** is where you look up, preview, and present passages of scripture — by typing a reference, browsing book/chapter/verse, searching by keyword, comparing translations side by side, and (during a live service) following along with what the preacher is quoting. It shares the same output pipeline as everything else in ACE, so a passage goes to the audience and stage screens exactly the way a song or slide does.

This chapter covers the Bible workspace itself. Automatic Bible-reference detection from live audio is introduced briefly here and documented in full in [Detection & Auto-Follow (AI)](05-detection-ai.md). For turning a passage into part of your running order, see [Building a Service](02-service-and-cues.md).

> **Platform note.** The Bible workspace exists on both editions and works the same way for the core tasks. Two differences matter: macOS ships a **wider set of bundled translations**, while Windows adds a **Zefania XML import** for bringing your own; and live auto-follow behaves slightly differently (covered under [Auto-scroll & follow](#auto-scroll--follow-live-detection)).

---

## Opening the Bible workspace

**What it does.** Switches the main window to the scripture view: a grid of verse tiles for the current chapter, with a two-row control bar across the top for navigation, search, comparison, and display options.

**How to get there.**

- Click the **BIBLE** tab (workspace switcher).
- Or use the workspace shortcut — the Bible workspace is one of the numbered workspaces (macOS ⌘1–⌘6 / Windows Ctrl+1–Ctrl+6); see [Preferences, Shortcuts & Menus](11-preferences-shortcuts.md) for the exact number in your layout.

The chapter you were last viewing is restored. The top control bar has two rows: **Row 1** holds the keyword search field plus the **Compare** and **Options** buttons; **Row 2** holds the reference field, the book / chapter / verse pickers, the translation picker, and **GO** / **CLEAR**.

---

## Finding a passage

### The reference field, pickers, GO and CLEAR

**What it does.** Gets you to a specific verse or range. Type a reference like `John 3:1-36` into the reference field and press **GO** (or Enter), or build the location with the three pickers.

**How to get there.** Row 2 of the control bar:

| Control | Behaviour |
|---|---|
| **Reference field** | Type a free-form reference (`John 3:16`, `Ps 23`, `John 3:1-36`). Press **GO** or Enter to jump. |
| **Book picker** | Drop-down of all books; choosing one resets to chapter 1, verse 1. |
| **Chapter picker** | Lists every chapter in the current book. |
| **Verse picker** | Lists every verse, plus an **All verses** entry to select the whole chapter as a range. The button reads **Verse N** (or a range when one is active). |
| **GO** | Resolves whatever is in the reference field and jumps the pickers/grid to it. |
| **CLEAR** | Empties the reference field. |

Ranges are fully supported — `John 3:1-36` selects verses 1 through 36, and **All verses** selects the entire chapter.

### Arrow-key navigation

**What it does.** Moves through scripture without touching the mouse once the grid has focus.

| Key | Moves |
|---|---|
| **←** / **→** | Previous / next **verse** |
| **↑** / **↓** | Previous / next **chapter** |

This is the fastest way to walk a reading verse by verse while it is live.

### Search — reference vs keyword

**What it does.** One search box (Row 1, placeholder *"Search reference or keywords…"*) does double duty:

- Type a **reference** (e.g. `Romans 8:28`) and it jumps the pickers/grid straight to that location.
- Type **keywords** (e.g. `love your enemies`) and it scans the entire Bible — roughly 31,000 verses — and lists matches.

**Options.** Keyword results are **capped at 200** matches to keep the list responsive; narrow your terms if you need something further down. Results are drawn from the currently active translation.

---

## Translations

**What it does.** Chooses which translation the grid, preview, and live output use. The translation picker (Row 2) groups entries into **Installed** and **Online (licensed)**.

**How to get there.** Click the translation button (it shows the current translation's name). The menu is grouped:

| Group | What's in it | Requirements |
|---|---|---|
| **Installed** | Bundled public-domain translations plus anything you've imported. KJV is the default. macOS bundles a wider set (e.g. ASV, WEB, BBE, CUV, RV1909, LSG1910, and more). | None — works offline, all tiers *(both)* |
| **Online (licensed)** | Licensed/online translations such as **ESV** and translations served through **API.Bible**. | **Pro tier + an available gateway** *(Pro)*. Streamed a chapter at a time. |

**Honesty note.** Online and licensed translations are **not usable on the Free tier**, and they require a reachable gateway (ACE's licensing/content service). If you are on Free, or the gateway is unavailable, these entries will not present. The picker groups them under **Online (licensed)** so it is clear which ones carry that requirement. Everything under **Installed** works offline on any tier.

**Bring your own key.** You may optionally supply your own **API.Bible** key to access additional online translations through your own account. Configure this in Preferences ▸ Bible (see [Preferences, Shortcuts & Menus](11-preferences-shortcuts.md)).

**Getting more translations.**

- **Download translations… *(both)*** — the picker's overflow offers a downloader for additional bundled/available versions.
- **Import translation (Zefania XML)… *(Windows only)*** — Windows adds a menu item to import a translation from a Zefania-format XML file. This appears in the translation picker's overflow menu, the **Options** menu, and the workspace context menu. macOS does not expose Zefania import here; it relies on its wider bundled set and the Import Wizard for other scripture formats (see [Media](06-media.md)).

Cues built from a licensed translation are internally flagged as licensed, so that exporting a service will **not redistribute** copyrighted verse text.

---

## Presenting a passage

**What it does.** Sends the selected verse or range to preview and, when you choose, to the live audience/stage output — with the same layering and theming as any other slide.

**How to get there.** From the verse grid:

| Action | Result |
|---|---|
| **Single-click** a verse tile | Selects it and updates the preview. Does **not** go live. |
| **Double-click** a verse tile | Takes the passage **live** immediately. |
| **Right-click** a tile (or use the menu) | Opens the passage menu (below). |

Tiles carry the tooltip *"Click to preview · double-click to go live"* as a reminder.

**The passage (right-click) menu:**

| Item | What it does |
|---|---|
| **Take Passage Live** | Sends the current selection to the live output now. |
| **Add Passage to Plan** | Builds a scripture cue from the selection and adds it to your running order without going live. See [Building a Service](02-service-and-cues.md). |
| **Study {reference}…** | Opens Deep Scripture Study for that verse (see [below](#deep-scripture-study-cross-references)). |

### Passage options

**What it does.** Controls how verses are laid out on the slides — numbering, whether the reference and translation are shown, whether each verse gets its own slide, and where the reference appears.

**How to get there.** The **Options** button (Row 1). Settings persist between sessions.

| Option | Default | Effect |
|---|---|---|
| **Show verse numbers** | On | Prefixes each verse with its number. |
| **Show reference** | On | Displays the passage reference (e.g. *John 3:16*) on the slide. |
| **Show translation** | On | Displays the translation name/abbreviation. |
| **Break on new verse** | On | Puts **each verse on its own slide**; off keeps the passage together and paginates by fit. |
| **Reference placement** | Each slide | Radio group — see below. |

**Reference placement** (only meaningful when *Show reference* is on):

| Choice | Behaviour |
|---|---|
| **Passage — each slide** | The reference appears on every slide of the passage. |
| **Passage — last slide** | The reference appears only on the final slide. |
| **No reference** | Suppresses the reference on the slides. |

> **Windows theme caveat.** The Windows slide renderer does not yet honour the `{{translation}}` token or indexed `{{verse:N}}` tokens in custom themes, and it uses `{{scripture}}` where macOS uses `{{verse}}`. Multi-template and comparison themes are macOS-only. If a custom scripture theme looks wrong on Windows, this is why — see [Themes, Looks & Overlays](07-themes-looks-overlays.md).

---

## Compare translations

**What it does.** Shows the same verse in several translations side by side, so you can read them together and then push the comparison live.

**How to get there.** The **Compare** button (Row 1). Pick the translations to include; the panel shows each translation's rendering of the current verse. A **GO LIVE** action sends the comparison to the audience. A **Clear comparison** entry resets the set.

**Requirements.** *(both)* for bundled translations. If your comparison set includes any **Online (licensed)** translation, that translation still requires **Pro + a gateway** *(Pro)* — the same rule as elsewhere. Side-by-side comparison slides are richest on macOS; on Windows, see the theme caveat above.

---

## Auto-scroll & follow (live detection)

**What it does.** During a live service with detection running, the workspace helps you keep pace with the passage being read or quoted. The selected verse always **auto-scrolls into view** in the grid *(both)*. Beyond that, the two editions follow live Bible-reference detection differently:

| Edition | Follow behaviour |
|---|---|
| **macOS** | **Auto-follows** live detection directly in the verse grid — as references are heard, the grid moves to them. The detection banner shows the **confidence %** and the **translation**. |
| **Windows** | Follows via a **detection banner**: when a reference is heard, a banner appears reading *"Detected: {reference}"* with **Preview** and **Show** buttons. **Preview** jumps the grid to it; **Show** takes it live. The banner shows the **reference only** (no confidence % or translation). |

On both editions, verses the preacher seems to be **paraphrasing** surface as a **suggested verses** panel — each entry has a **Show** button that pushes that verse live, and a **CLEAR** to dismiss all suggestions.

A reference already present in your running order will jump to that cue when heard. A reference with no matching cue raises the banner (or, if *Auto-program spoken scripture* is enabled, can build a cue and go live automatically — that setting is off by default). All of this — how references are parsed, plausibility guards, "mentioned in passing" vetoes, and the auto-program toggle — is documented in [Detection & Auto-Follow (AI)](05-detection-ai.md).

---

## Deep Scripture Study (cross-references)

**What it does.** Opens a study panel for a verse showing its **cross-references** — related passages drawn from the bundled *Treasury of Scripture Knowledge* — so you can explore connected scripture without leaving ACE. It works offline.

**How to get there.**

- Right-click a verse and choose **Study {reference}…**, or
- Use the **Study…** entry in the passage menu.

From the study panel you can navigate to any cross-referenced verse and, from there, preview or present it like any other passage.

---

## See also

- [Detection & Auto-Follow (AI)](05-detection-ai.md) — live transcription, Bible-reference detection, and the confidence/translation banner details.
- [Building a Service](02-service-and-cues.md) — how *Add Passage to Plan* fits into your running order.
- [Themes, Looks & Overlays](07-themes-looks-overlays.md) — scripture slide templates, tokens, and the Windows renderer caveats.
- [Preferences, Shortcuts & Menus](11-preferences-shortcuts.md) — the Bible preferences pane and your BYO API.Bible key.
