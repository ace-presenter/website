# ACE Virtual World — Preview Guide

A shared **3D virtual venue** that replicates a live event. Not a video on a screen — a space your audience *enters*: they watch your live stage feed together, see one another as avatars, hear each other in **spatial voice**, and a **producer** drives the room in real time. It runs in a desktop app, in any modern browser, and inside a Meta Quest headset via WebXR.

> **In development — not yet released.** ACE Virtual World is being built now. This is a **preview guide**: it describes the intended experience and is honest about what already works in early builds versus what is still being built. Nothing here is a promise of a ship date, and details will change before release. To be brought in as it opens up, [register interest](https://www.ace-presenter.app/world).

---

## How to read this guide

This guide has **two readers** in mind, and every chapter says which parts are for whom:

- **The operator / producer** — the licensed person who composes the venue and runs the show. Setting up a venue, feeding the stage, and driving the room are operator tasks.
- **The attendee** — anyone you invite. They join by opening a link, with **no account, no app install, and no license**. If you were sent a link, [Joining as an Attendee](05-joining-as-an-attendee.md) is the only chapter you need.

**Status vocabulary.** Because this is a pre-release product, features are flagged inline so you always know what to expect today:

| Badge | Meaning |
|---|---|
| *(preview — verified)* | Working in early builds and confirmed end-to-end on real infrastructure |
| *(preview)* | Built and running in early builds; still being hardened, and not yet perceptually or interactively signed off |
| *(in development)* | Actively being built; the plumbing exists but the finished experience is not here yet |
| *(planned)* | Designed and on the roadmap; not started or early scaffold only |

When a feature's badge and the surrounding text disagree, trust the text — it carries the detail.

---

## The mental model: an event is five layers

Everything in ACE Virtual World maps onto one of five layers. Keeping them straight makes the rest of the guide click into place — and each layer is at a different stage of maturity.

| # | Layer | What it is | Where it is today |
|---|---|---|---|
| 1 | **Ingest** | Where your content comes from — OBS, vMix, a camera, a webcam, ACE Presenter | Live camera and switcher feeds work *(preview — verified)*; ACE Presenter integration is *(planned)* |
| 2 | **Transport** | Real-time delivery of video, voice, and spatial audio | One WebRTC stack (LiveKit) carries all three; live media is *(preview — verified)*, spatial voice is *(preview)* |
| 3 | **World** | The venue itself — stage, floor, screens, breakout areas | A composable graybox venue with multiple surfaces works; finished venue **art (GLTF)** is *(in development)* |
| 4 | **Presence** | The people — avatars, movement, spatial voice | Avatars, movement, and positioned voice run; final avatar **art** and lip-sync rigs are *(in development)* |
| 5 | **Production** | Show control — scenes, cues, lighting, audio, moderation | The producer console drives scenes, cues, lighting moods, audio, and zones *(preview)* |

Read the layers top to bottom and you have the whole pipeline: a feed comes **in** (Ingest), travels over **one transport**, lands in a **venue** full of **people**, and a **producer** shapes the moment for everyone.

---

## What already works, and what is still coming

A quick, honest snapshot. The chapters go deeper.

**Working in early builds**

- **Live media** — OBS / vMix / a hardware encoder → LiveKit → the stage screen, sub-second. Confirmed end-to-end on real LiveKit Cloud. *(preview — verified)*
- **The producer console** — scenes (Intro / Main stage / Breakout), a firing cue list, lighting moods, feed routing, and zone lock/unlock, all synced to every client. *(preview)*
- **Spatial voice** — each attendee's voice is positioned in 3D at their avatar and attenuates with distance. Built and running; needs a session with several mic'd people to sign off perceptually. *(preview)*
- **Audience join** — a link plus a short code, no account, in a browser or a Quest headset. *(preview)*

**Still being built**

- **Venue and avatar art** — the venue is a functional graybox and avatars fall back to simple capsules until finished 3D art (GLTF/GLB) is dropped in. *(in development)*
- **Temporal A/V sync** — frame-accurate alignment of the stage feed with cues across every attendee's screen. *(in development)*
- **Captions** — live captions of the stage audio via speech-to-text. A local-microphone demo exists; the production caption source is *(in development)*.
- **Production billing / licensing** — the metered "go live on your license" path is wired but rides on account infrastructure still being finished. *(in development)*

For the full, layer-by-layer status, see [Platforms, Requirements & Status](06-platforms-and-status.md).

---

## Table of contents

1. [Getting Started & Concepts](01-getting-started.md) — what the world is, the five layers, roles, and the shape of a session
2. [Setting Up a Venue](02-setting-up-a-venue.md) — *(operator)* compose the space: surfaces, feeds, cameras, branding, scenes
3. [Feeding the Stage](03-feeding-the-stage.md) — *(operator)* get video in: OBS / vMix / encoder / webcam over WHIP + LiveKit, and where ACE Presenter fits
4. [Going Live & the Producer Console](04-going-live.md) — *(operator)* go live, fire scenes and cues, mix audio, manage zones, moderate the room
5. [Joining as an Attendee](05-joining-as-an-attendee.md) — *(attendee)* open the link in a browser or on a Quest, look around, talk, watch
6. [Platforms, Requirements & Status](06-platforms-and-status.md) — devices, network and hosting requirements, and a candid per-feature status board

---

## Where ACE Virtual World fits in the suite

ACE Virtual World is part of the **ACE Suite** — one account, one brand, one cueing language across the products. The plan is that you schedule an event in ACE Schedule, present with ACE Presenter, and gather the room in ACE Virtual World, all speaking the same feed and cue model. That cross-product handoff — ACE Presenter publishing straight into a world surface — is *(planned)*; see [Feeding the Stage ▸ Where ACE Presenter fits](03-feeding-the-stage.md#where-ace-presenter-fits).
