# 6. Platforms, Requirements & Status

The candid chapter. What runs ACE Virtual World, what the network needs, and an honest, layer-by-layer board of what works today versus what's still being built. Because this is a [pre-release product](README.md#how-to-read-this-guide), this page is the authoritative status reference for the whole guide.

---

## Platforms

| Who | Platform | How it runs |
|---|---|---|
| **Operator** | Native desktop app (macOS / Windows via Electron) | The world view plus a separate always-on-top **Producer Controls** window for the console |
| **Operator** | Modern browser | The same world, with the composer and producer panel in the operator role |
| **Attendee** | Modern browser (desktop / laptop / phone) | Zero-install; open the link and **Enter world** |
| **Attendee** | **Meta Quest** headset (WebXR) | The same link in the Quest browser → **Enter XR** for immersive VR |
| **Attendee** | Installable app (PWA) | The browser experience installed for fast repeat visits |

**Browser recommendation:** Chrome or Edge give the best WebGL and WebRTC behaviour. Recent Safari and Firefox work for attendees.

---

## Requirements

### For attendees

- A modern browser and a reasonable internet connection.
- A **microphone** to talk (optional — watching needs nothing extra).
- For VR: a **Meta Quest** headset.
- **Nothing else** — no account, no install, no license.

### For operators

- The desktop app or a modern browser, and enough machine to run a 3D scene comfortably (a discrete GPU helps for large crowds).
- A way to get video in — usually **OBS or vMix** — pointed at a **LiveKit** project over **WHIP** (see [Chapter 3](03-feeding-the-stage.md)).
- An ACE **license** for the operator/producer role (the audience is always free). The licensed, metered go-live path is [still being finished](#status-board) — see below.

### Network & hosting

Because the audience reaches the show over the internet, the real-time services must be **hosted and reachable** — they can't live only on the operator's laptop behind a home router:

- **LiveKit** (the video + spatial-audio transport) is hosted (LiveKit Cloud). ✅
- **The world backend** (presence, producer state, feeds, config) must be deployed somewhere public and multi-tenant, so one central deployment can host many operators' events, each fully isolated from the others. ✅ (multi-event isolation is in place)

Real-time media (WebRTC) needs UDP to flow; on very locked-down corporate or school networks it can be blocked. If an attendee can't connect at all, a different network usually fixes it.

---

## Status board

The heart of this chapter. Read it by the [five layers](README.md#the-mental-model-an-event-is-five-layers). Badge meanings are in the [README](README.md#how-to-read-this-guide): *(preview — verified)*, *(preview)*, *(in development)*, *(planned)*.

### Layer 1 — Ingest (getting content in)

| Feature | Status | Notes |
|---|---|---|
| OBS / vMix → LiveKit (WHIP) → stage screen | *(preview — verified)* | Confirmed end-to-end on real LiveKit Cloud; the primary path |
| Iso / extra cameras (own room → side surface) | *(preview)* | Same machinery as the main feed; video-only to the world |
| Hardware encoder (WHIP / RTMP ingress) | *(preview)* | Mostly LiveKit-side config; world side identical |
| In-browser publisher (operator webcam / screen) | *(preview)* | Publishes the operator's device and auto-adds a feed |
| Slide-deck feed (pre-rendered images) + laser pointer | *(preview)* | Only the slide index travels; in-app PDF/PPTX conversion is *(planned)* |
| **ACE Presenter → world** (video and/or structured data) | *(planned)* | Bridge via OBS/NDI today; native suite handoff is designed, not built |

### Layer 2 — Transport (real-time delivery)

| Feature | Status | Notes |
|---|---|---|
| One WebRTC stack (LiveKit) for video + voice + spatial audio | *(preview — verified)* | Live video path confirmed on real keys |
| Multi-track ingest (N publishers in one room → N feeds) | *(preview)* | Verified against live LiveKit; needs 2+ publishers to populate all tiles |
| Pooled, license-gated media tokens via the ACE gateway | *(in development)* | Wired; rides on account infrastructure being finished. Today the world backend mints tokens itself |

### Layer 3 — World (the venue)

| Feature | Status | Notes |
|---|---|---|
| Composable graybox venue — stage, screens, floor, breakout | *(preview)* | Real geometry you compose against |
| Composer — surfaces, feeds, routing, gizmos, drop/snap, branding, scenes | *(preview)* | Build-verified; a full interactive sign-off pass is still to come |
| Live collaborative editing (drags stream in real time) | *(preview)* | Build-verified; multi-client live-drag not yet interactively signed off |
| Multi-surface routing + presenter layouts (Grid / PiP / Speaker) | *(preview)* | Each tile is a surface you route a feed onto |
| Finished **venue art (GLTF)** — detailed geometry, baked lighting | *(in development)* | Engine consumes it; the art itself is being made |
| Lightmap-baked lighting on a real venue model | *(in development)* | Loader is built; the bake is external art-pipeline work |
| Stage floor reflections / image-based lighting | *(preview)* | Runs; needs visual tuning on a display |
| Volumetric ("Gaussian splat") venues from real-world captures | *(planned)* | Early scaffold only |

### Layer 4 — Presence (the people)

| Feature | Status | Notes |
|---|---|---|
| Avatars, movement, name tags | *(preview)* | Capsule placeholders until finished art loads |
| Spatial voice (positioned per avatar, distance falloff) | *(preview)* | Built and running; needs a several-person mic'd session to sign off perceptually |
| Room reverb (sense of the space) | *(preview)* | Synthetic default ships; a recorded venue impulse response can be swapped in |
| Crowd scaling (LOD, interest management for hundreds) | *(preview)* | Built; runtime-confirmed via a crowd simulator |
| Finished **avatar art (GLB)** + lip-sync (mouth movement) | *(in development)* | Code is in place; needs the rigged art dropped in |
| Full VR hand / locomotion polish + in-headset UI | *(planned)* | Core VR presence works; refinement pending |

### Layer 5 — Production (show control)

| Feature | Status | Notes |
|---|---|---|
| Go live / end event; join code + shareable link | *(preview)* | Creates an isolated per-event world |
| Scenes (Intro / Main / Breakout) — camera + lighting + content | *(preview)* | Synced to every client |
| Cue list — backend-resolved actions fired to everyone | *(preview)* | |
| Feed routing, live | *(preview)* | Re-route any surface mid-show |
| Audio mix — Program/Voice faders, mute-all, per-attendee mute | *(preview)* | Mutes enforced at the source |
| Zone lock/unlock with live occupancy | *(preview)* | |
| **Temporal (frame-accurate) A/V sync** | *(in development)* | The hardest item; cues apply "now to everyone" until it lands |
| **Live captions** of stage audio (speech-to-text) | *(in development)* | A local-mic demo source exists; production stage caption source pending |
| **Metered go-live on your license** (production billing) | *(in development)* | End-to-end path is wired; rides on account infrastructure being finished |
| Real lighting-desk ingest (DMX / Art-Net) | *(planned)* | Virtual rig mirroring a physical rig |
| Audio zones (different audio per area) | *(planned)* | Needs an audio-zone geometry model |

---

## The one big caveat

Most of the *(preview)* items above have been verified at the **build and type level** and, for media, **against real LiveKit** — but a full **interactive, in-headset, multi-participant show** has not yet been signed off end to end. The live media path and the crowd simulation are the parts confirmed at runtime. Treat everything here as a **preview of a product in active development**: it works in early builds, it will change, and it is not yet released.

To follow along or be brought in as it opens up, [register interest](https://www.ace-presenter.app/world).

---

## See also

- [Getting Started & Concepts](01-getting-started.md) — the five layers and roles
- [Setting Up a Venue](02-setting-up-a-venue.md) — the composer
- [Feeding the Stage](03-feeding-the-stage.md) — ingest paths and audio
- [Going Live & the Producer Console](04-going-live.md) — running the show
- [Joining as an Attendee](05-joining-as-an-attendee.md) — the audience experience
