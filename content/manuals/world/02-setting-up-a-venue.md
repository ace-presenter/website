# 2. Setting Up a Venue

*For the **operator**.* This chapter covers composing the space before you go live: the surfaces (screens) your feeds land on, the feeds themselves, cameras you publish from the operator machine, branding, and the scenes you'll drive during the show.

> **Preview.** The composer runs in early builds and is feature-complete enough to author a multi-screen, multi-scene venue. It has been verified at the build level but has **not yet had a full interactive sign-off pass**, and the finished venue **art** is still being made — see the status notes throughout and in [Chapter 6](06-platforms-and-status.md).

---

## Becoming the operator

By default, opening a world puts you in as an **attendee** (world view only). To get the authoring tools you switch to the **operator** role:

- **Native desktop app** — the **Producer Controls** window (open it from the Window menu, or the ⌘⇧P shortcut) is your operator console. The main window is the world/attendee view, with an **Operator console** button on its heads-up display to unlock authoring inline.
- **Browser** — open the operator variant of the URL (the composer and producer panel appear) rather than the plain attendee link.

The backend rejects operator actions from attendees, so the role is a real boundary, not a UI hint.

Once you're operator you have two modes:

- **Compose** — design the room (this chapter).
- **Run** — drive the live show (the [producer console](04-going-live.md)).

---

## The "show file": what a venue is made of

A venue is a small set of building blocks you arrange. Think of them as the parts of a real production:

| Block | What it is | Real-world analogue |
|---|---|---|
| **Venue** | The space itself — geometry, floor, spawn/seating points, breakout areas | The building |
| **Surfaces** | Screens and walls your feeds play on — main screen, IMAG side walls, banners | The video walls |
| **Feeds** | Named sources of picture — a live camera room, a file, an image, a slide deck | Your inputs on a switcher |
| **Routes** | Which feed shows on which surface | Patching a source to a screen |
| **Lights** | The stage and house lighting rig | The lighting rig |
| **Zones** | Named areas with capacity and access (stage, floor, VIP, backstage) | Roped-off areas |
| **Scenes** | Saved looks — a camera framing + lighting mood + what's on each screen | Show "states" you cut between |
| **Branding** | Logo, colour palette, signage, welcome copy | The event's look |

You compose these before the event and **publish**. Publishing is the commit step — it saves the arrangement so every client (including people who join late) loads the same room.

> **On the venue itself.** Today the venue is a functional **graybox** — a real stage, screen, floor, and breakout zones you can compose against. Dropping in a finished, art-directed venue model (a GLTF/GLB, with baked lighting and detailed geometry) is supported by the engine but the **art is still being made**. *(in development)* Volumetric ("Gaussian splat") venues captured from the real world are an early scaffold. *(planned)*

---

## Placing and arranging surfaces

**Surfaces** are the screens. The main stage screen exists by default; you add side screens (IMAG walls), banners, and presenter tiles as needed.

In **Compose** mode you select an object and move, rotate, and resize it with 3D transform handles (gizmos):

- **Select** a surface to attach the handles to it.
- **Move / rotate / scale** with the gizmo.
- **⬇ Drop to ground** seats the object neatly on the floor.
- **⊾ Snap to surface** aligns it flat against the nearest wall or surface it faces — handy for hanging a screen on a wall without fiddling.

Two conveniences make this readable while composing:

- **Helper markers** show non-visible things — spotlight cones, house-light bulbs, and spawn-point arrows — so you can see where lights point and which way attendees will face when they arrive. These helpers only appear in Compose mode.
- **Live collaborative editing** — when you drag an object, the move streams in real time to every other connected client (a second operator screen, an attendee view, a headset) instead of jumping only when you publish. *(preview — build-verified; the multi-client live-drag has not yet had an interactive sign-off.)*

### Multi-presenter layouts

For panels and multi-camera talks, the composer offers ready-made **presenter layouts** that place several tiles facing the audience:

- **Grid 2×2** — four equal tiles.
- **PiP** — one big picture with a smaller inset.
- **Speaker + thumbnails** — one large speaker with a row of smaller feeds.

Each tile is its own surface, so you route a different live feed onto each one (see [Routing feeds](#routing-feeds-onto-surfaces) below). If a single room has several people publishing video, the world can surface each publisher as its own feed and bind each one to a distinct tile. *(preview — verified against live LiveKit; you need two or more publishers in the room to see all tiles populate.)*

---

## Feeds: naming your sources

A **feed** is a named source of picture. You define feeds in the composer's **Feeds** list. A feed is one of:

- **Live (LiveKit room)** — a live camera or switcher, identified by a room name (e.g. the reserved `ace-stage` for your program mix, or `ace-cam-2` for an extra angle). This is the main path — see [Chapter 3](03-feeding-the-stage.md).
- **Image** — a still.
- **Slide deck** — a folder of pre-rendered slide images you step through with ◀ ▶ during the show. Only the current slide *index* travels to attendees, so it stays crisp and light. A laser-pointer dot you paint on the slide can be streamed to everyone too. *(preview — decks are pre-rendered image folders today; in-app PDF/PowerPoint conversion is [planned](06-platforms-and-status.md).)*
- **File** — a video file feed (useful for a pre-roll or a fallback while you set up).

To add a live feed: **Compose ▸ Feeds ▸ "Live (LiveKit room)"**, give it a label (e.g. "Stage cam"), set its room name, and add it.

---

## Routing feeds onto surfaces

A **route** binds one feed to one surface — "show *this* on *that* screen." With your surfaces placed and your feeds named:

1. In the producer panel, open **Feed routing**.
2. Point a surface at a feed.

The main program feed (room `ace-stage`) lands on your main screen and any IMAG side walls; iso cameras go on side surfaces; presenter feeds go on the layout tiles. You can re-route live during the show from the same place — see [Going Live](04-going-live.md).

---

## Publishing a camera from the operator machine

You don't always need OBS. The composer can turn the **operator's own webcam or a screen/window share** into a feed — good for a quick extra angle or to share a slide from your desktop:

1. **Compose ▸ "Publish a camera (this device)"**.
2. Pick **Webcam** or **Screen / window**, choose a room name (e.g. `ace-cam-3`) and a feed label.
3. **● Start publishing** — this publishes the device into the room **and** auto-adds a matching live feed.
4. Route it onto a surface as above. **■ Stop publishing** ends it.

This uses a publish-grant token (for camera/screen), which the app obtains for you. Full details on all the ways to get video in are in [Chapter 3](03-feeding-the-stage.md).

---

## Branding

Set the event's look in the composer's **branding**: your **logo**, a **colour palette**, **signage**, and the **welcome copy** attendees see when they arrive. The *Intro* scene shows a greeter banner, and avatars carry billboarded nameplates so people can tell who's who.

---

## Scenes: saving looks to cut between

A **scene** is a saved combination of three things:

- **Camera framing** — where the director camera sits and what it frames (e.g. wide on the stage, or in among the crowd).
- **Lighting mood** — the rig's look for that moment (house up, stage key, accent spots).
- **Per-surface content** — what's on each screen.

Out of the box the world ships three scenes as a starting point:

- **Intro** — a welcoming look with the greeter banner, for as people arrive.
- **Main stage** — the show look, framed on the stage.
- **Breakout** — a look oriented toward the breakout areas.

You cut between scenes during the show from the producer console, and the change applies to **everyone at once**. Authoring your own scenes (custom camera framings, moods, and content per surface) builds on these presets. Lighting driven by a **real** lighting desk (DMX / Art-Net) so the virtual rig moves with the physical rig is [planned](06-platforms-and-status.md).

---

## Zones

**Zones** are named areas — stage, floor, breakout, VIP, backstage — each with a capacity and an access rule. During the show you **lock and unlock** them to shape where people can be (open the breakout rooms after the keynote; close backstage). Lock state and live occupancy sync to every client. You manage zones live from the producer console — see [Going Live ▸ Zones](04-going-live.md#managing-zones).

> **Audio zones** — anchoring different audio to different areas (a quiet lobby, a loud main floor) is designed but the geometry model for audio-specific zones is not built yet. *(planned)*

---

## Publish, and you're ready

When the room looks right, **publish** the venue. That saves the arrangement so every attendee — including late arrivals — loads the same space. From here you're ready to feed the stage ([Chapter 3](03-feeding-the-stage.md)) and go live ([Chapter 4](04-going-live.md)).
