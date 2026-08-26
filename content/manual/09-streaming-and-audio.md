# Streaming & Audio

This chapter covers everything ACE Presenter does *past the projector*: pushing your service to the internet over RTMP, sending it to other machines over NDI, pulling cameras and switchers in as program layers, controlling an ATEM switcher, and routing sound to the right speakers — including spatial/binaural monitoring and per-venue audio zones.

If you are still setting up the audience and stage displays themselves, start with [Outputs & Screens](08-outputs-and-screens.md). Anything that needs an external driver, runtime, or piece of hardware is summarised in [Appendix C — External Dependencies & Troubleshooting](appendix-c-dependencies.md).

> **How to read the badges.** *(both)* = same on macOS and Windows · *(macOS only)* = not on Windows · *(Windows: not yet available)* = exists on macOS, not yet ported · *(build-dependent)* = on Windows, present only if the app was compiled with the relevant module. See the [Platform Differences appendix](appendix-a-platform-differences.md) for the authoritative list.

---

## Live streaming (RTMP)

**What it does.** Encodes a composite of your program output — camera/capture backdrop plus the live slide — and pushes it to any RTMP destination (YouTube Live, Facebook, a custom media server, etc.). This is the same **PROGRAM composite** described [below](#the-program-composite); it is not a screen recording of the app.

**How to get there.**

- **macOS** — the Stream panel lives in the **STREAM layout preset**. Click the red **STREAM** button in the toolbar to switch to that preset; the panel (roughly 460×560) appears. Streaming controls are only reachable from this preset.
- **Windows** — **Output ▸ Stream…**, available from any layout. The same panel opens as a dialog.

**Options.** The settings are identical on both platforms:

| Setting | Choices / default | Notes |
|---|---|---|
| **Server URL** | default `rtmp://a.rtmp.youtube.com/live2` | The RTMP ingest endpoint from your streaming provider. |
| **Stream Key** | text | Your provider's secret key. On Windows a **reveal** control lets you unmask it to check it; treat it like a password. |
| **Resolution** | 720p / 1080p | The composite is rendered at 1080p and scaled to this. |
| **Bitrate** | 1500 / 2500 / 4500 / 6000 kbps | Higher = better quality, more upload bandwidth. Match your provider's recommendation for the chosen resolution. |
| **Audio Input** | capture device | The microphone/mix that is encoded into the stream — see [Audio-input capture device](#audio-input-capture-device). |
| **Go Live / Stop** | button | Starts and stops the broadcast. A frame counter shows encoding is running. |

**Going live.** Set the URL, key, resolution and bitrate, choose an audio input, then press **Go Live**. The button turns green and reads **Stop Stream** while broadcasting; press it again to end the broadcast.

**Auto-reconnect** *(Windows)*. If the connection drops mid-broadcast, Windows automatically retries with a backoff schedule — up to 20 attempts over roughly four and a half minutes (1s, 2s, 4s, 8s, then 15s intervals). The panel reports progress ("Stream reconnecting — attempt 3 of 20, retrying in 15s"); if every attempt fails it gives up with a message. This rides out a router reboot or a flapping uplink without operator intervention. On **macOS**, a lost connection is reported as an error and streaming stops — reconnect manually.

**Encoder & requirements.**

- **macOS** — uses HaishinKit and is **always built in**. No extra install; streaming is available in any macOS build.
- **Windows** — uses an **FFmpeg** encoder that is **(build-dependent)**: the build must be compiled with `ACE_WITH_FFMPEG`. If it wasn't, the Stream dialog shows the message *"This build has no streaming encoder. Rebuild with ACE_WITH_FFMPEG=ON"* and **Go Live is disabled**. Check your build if the button is greyed out.

| Requirement | Platform | Needed for |
|---|---|---|
| RTMP ingest URL + stream key | both | Any live stream |
| Upload bandwidth ≥ selected bitrate | both | Stable broadcast |
| `ACE_WITH_FFMPEG` build | Windows | Streaming at all (else Go Live disabled) |

---

## The PROGRAM composite

**What it does.** The single image ACE streams and sends over NDI. It is layered: a **camera or capture backdrop** (cover-fit to fill the frame) with the **live slide composited on top**. When output is blanked, the composite goes black. It is always rendered at 1080p internally and scaled to the chosen stream resolution. This is what your online audience sees — independent of the physical audience and stage displays. *(both)*

To put a camera *into* this composite rather than just a slide, see [Camera & video input](#camera--video-input).

---

## NDI

NDI carries video (and alpha) between machines over the local network — sending ACE's program to a switcher or capture PC, or bringing another NDI source into ACE as a video input.

### NDI send

**What it does.** Publishes the PROGRAM composite as a named NDI source that other NDI-aware software on your network can subscribe to.

**How to get there.** **Screen Setup ▸ NDI** — toggle it on and set the **stream name** that will appear to receivers.

- **macOS** — shows a teal status badge and, if the runtime is missing, a guided install sheet.
- **Windows** — shows an inline caption for status.

The NDI setting is stored **per venue** (`ndiEnabled` / `ndiName`), so different venue profiles can publish under different names — see [Venues & venue profiles](#venues--venue-profiles).

**Requirements.** The **NDI runtime is not bundled** with either edition and must be installed separately. macOS provides a fetch helper; Windows detects the runtime on the filesystem. See [Appendix C](appendix-c-dependencies.md).

### NDI receive

**What it does.** Lets ACE consume another NDI source (a PTZ camera, a graphics machine, another ACE) as a program video layer. Received sources appear in the **Stream Video Input** picker labelled **"\<name\> (NDI)"**.

**How to get there.** Open the video-input picker in the Stream panel and choose the NDI source.

**Platform status.**

- **Windows** — full receive loop *(both, functional)*. NDI enumeration is deferred until you first open the picker, to avoid a firewall prompt at launch.
- **macOS** — the receiver is **header-verified only (unconfirmed live)**: the code path exists but has not been validated end-to-end. Treat macOS NDI receive as experimental.

**Requirements.** NDI runtime installed (see above); the source and ACE on the same network.

---

## DeckLink / SDI capture

**What it does.** Brings a Blackmagic DeckLink (or compatible SDI/HDMI capture) input into ACE as a program video layer. Capture devices appear in the **Stream Video Input** picker labelled **"\<name\> (SDI)"**.

**How to get there.** Choose the SDI device in the Stream panel's video-input picker.

**Platform notes.**

- **Windows** — a COM implementation with format detection, **gated on the Blackmagic SDK at build time**.
- **macOS** — the `ACEDeckLink` module, loaded dynamically (`dlopen`).

**Requirements.** The **Blackmagic Desktop Video** driver must be installed for the capture hardware to be visible to ACE on either platform. See [Appendix C](appendix-c-dependencies.md).

---

## Camera & video input

**What it does.** Uses a webcam or other live video device as the backdrop layer of the PROGRAM composite — "**Show camera as program layer**." With a camera selected, slides composite on top of the live picture; with **"None (slide only)"** selected, the composite is slides on a black background.

**How to get there.** In the Stream panel, enable **Show camera as program layer**, pick the device, and use the preview to confirm framing.

**Options.**

- Device picker (webcams, capture cards, plus NDI/SDI sources described above).
- **"None (slide only)"** — a valid choice that omits any camera backdrop.
- Live preview of the selected input.

**Platform note.** macOS enumerates more Apple device types, including Continuity Camera and Desk View. *(both, with more device types on macOS)*

---

## ATEM switcher control

**What it does.** Lets ACE cut a Blackmagic ATEM switcher to a chosen program input when a cue goes live. Each cue can carry a **VIDEO SWITCHER** input number; when that cue is taken, ACE tells the ATEM to cut to that input — keeping your switcher's program in sync with the presentation.

**How to get there.**

- **Windows** — **Preferences ▸ ATEM** tab. Enable it, set the **host** (default `192.168.1.100`) and **port** (default `9910`), and use **Connect** to test the link. Then set the per-cue **VIDEO SWITCHER** input in the New/Edit Cue dialog (the field appears when ATEM is enabled).
- **macOS** — configured in the app's persistence/settings rather than a dedicated Preferences tab; the same per-cue video-switcher input applies.

**Macro triggering.**

- **macOS** — ATEM **macro triggering is scaffolded but unvalidated** *(macOS only)*. It is behind a developer/build flag and not a supported feature.
- **Windows** — deliberately **omits macros**; it performs the program-input cut only.

**Requirements.** An **ATEM switcher reachable on the LAN**. ACE talks to it over raw UDP with **no Blackmagic SDK**, so no additional driver is required — but the switcher must be powered, networked, and at the configured host/port. See [Appendix C](appendix-c-dependencies.md).

---

## The Stream layout preset

On **macOS**, layout is a first-class preset enum — **General / Sermon / Conference / Stream / Custom** — and the Stream panel (and its red toolbar button) is **gated to the Stream preset**. Switching to the Stream preset is how you reach streaming controls.

On **Windows**, presets are simply **named layouts**; streaming is reached independently via **Output ▸ Stream…** regardless of the current layout. *(both, reached differently)*

---

## Audio

ACE distinguishes two audio concerns that are easy to confuse:

- **Audio-input capture** — what gets *encoded into a stream or recording* (one device in, described next).
- **Output routing (AudioRouter / FOH)** — where the app's *own* sound (media beds, translation, spatial monitoring) is *sent out* to speakers and headphones.

### Audio-input capture device

**What it does.** Selects the microphone or mix that ACE encodes into the live stream (and recording). This is distinct from output routing below.

**How to get there.** The **Audio Input** control in the Stream panel.

**Options.**

- **macOS** — Core Audio devices plus **"System default"** (with a hint to route a full mix in via BlackHole or similar).
- **Windows** — `QMediaDevices` inputs plus **"None (no audio)"**; captured at 48 kHz, stereo, 16-bit.

### Output routing (AudioRouter / FOH)

**What it does.** Assigns a real output device to each audio *role*, so front-of-house, stage monitors, headphone/binaural monitoring, and each translation language can go to different interfaces.

**How to get there.** **Screen Setup ▸ Audio**.

**Roles.**

| Role | Purpose | Notes |
|---|---|---|
| **Front-of-house (FOH)** | The congregation's main speakers | Unassigned falls back to the Windows/system default output. |
| **Stage monitor** | Stage / in-ear monitors | May be set to **Off**; an unassigned monitor is silent by design (not a duplicate of FOH). |
| **Binaural / headphones** | Headphone spatial monitoring | Only active when Spatial audio is enabled (see below). |
| **Translation (per language)** | One output per translation language | Send each language to its own interface. |

**Options & behaviour.**

- Output routing is persisted **per venue** (`VenueProfile.audioRoles`).
- A role pointing at a device that is no longer present shows an **amber "missing device" warning**.
- Devices are **re-enumerated on hot-plug**, so plugging in an interface updates the pickers live.

### Spatial / binaural (HRTF) monitoring

**What it does.** Renders a head-related-transfer-function (HRTF) binaural mix to headphones, positioning each translation language at a chosen angle around the listener. Useful for a translator or operator monitoring several languages at once on one pair of headphones.

**How to get there.** The **Spatial** toggle in the **Screen Setup ▸ Audio** section, plus a **per-language azimuth** slider for each language (**−90° to +90°**, 0° = centre).

**Options.**

- Enable/disable the binaural bus (feeds the **Binaural / headphones** role).
- Per-language azimuth placement.

**Platform status & requirements.**

- **macOS** — uses `AVAudioEnvironmentNode` HRTF and includes an **AudioWatchdog** that automatically degrades spatial processing under CPU load. Always available.
- **Windows** — **(build-dependent)**: requires the app to be compiled with **`ACE_WITH_SPATIAL_AUDIO`**. Without it, spatial audio is disabled and there is no binaural bus. There is **no watchdog** on Windows.

### Venues & venue profiles

**What it does.** A **venue profile** bundles a whole room's configuration: display assignments, output devices, NDI settings, audio roles, room model / zones, spatial settings, and detection language. Switching venues re-applies all of it at once — ideal for a portable rig used in different rooms, or a building with several spaces.

**How to get there.** **⌘⇧V** (macOS) / **Ctrl+Shift+V** (Windows).

- **macOS** — the **Venues sheet**: full create/read/update/delete plus detailed per-section editing.
- **Windows** — **Output ▸ Venues…** opens the Venues dialog: **create/read/update/delete only**, plus a venue badge in the status bar.

Profiles are stored in `venues.json`. *(both, editor is richer on macOS)*

### Audio Zones / RoomModel

**What it does.** Models a room as a top-down floorplan of **zones** and **speakers**, each with a **trim (dB)** and a **propagation delay** so distant zones stay time-aligned with the stage. Live **level/mute faders** let you ride each zone during a service.

**How to get there.** **macOS** — the **Inspector ▸ Zones** tab (part of the venue/room configuration): initialise a room model, add zones and speakers, drag them into place on the floorplan, and adjust live level/mute faders.

**Platform status.**

- **macOS** — the **full floorplan editor** described above: init room model, add zone/speaker, drag to position, live level/mute faders in the Inspector Zones tab. *(macOS only)*
- **Windows** — **(Windows: not yet available)**. The Zones tab is a hardcoded empty state ("Phase 7/9"); there is no zone or room editor and no fader UI. Zones authored on macOS **do** travel in an imported `venues.json`, so a Windows machine can *load* a venue that contains zones — but it still cannot edit them or show faders.

**Requirements.** None external; this is an in-app model.

### Audio for media

**What it does.** Governs how sound attached to media and cues behaves during a service.

**Defaults & options** *(both, with per-platform controls)*:

- **Motion** backgrounds **loop and play muted**.
- **Background audio beds loop**.
- **Video audio is muted on the stage output by default.**
- **macOS** — an on-preview **mute toggle**, and FOH is **ducked by −6 dB during a quick-screen** message so spoken announcements sit above the bed.
- **Windows** — per-lane **mute / solo / bypass** controls plus the media defaults above.

---

## Related chapters

- [Outputs & Screens](08-outputs-and-screens.md) — audience/stage displays, Screen Setup, blank/clear, the OUTPUT control panel.
- [Themes, Looks & Overlays](07-themes-looks-overlays.md) — the slides that composite over camera/capture in the PROGRAM image.
- [Building a Service: Cues & Running Order](02-service-and-cues.md) — where a cue's VIDEO SWITCHER input is set.
- [Preferences, Shortcuts & Menus](11-preferences-shortcuts.md) — the ATEM tab and other settings panes.
- [Appendix C — External Dependencies & Troubleshooting](appendix-c-dependencies.md) — NDI runtime, Blackmagic Desktop Video, ATEM on the LAN, and the `ACE_WITH_FFMPEG` / `ACE_WITH_SPATIAL_AUDIO` build flags.
