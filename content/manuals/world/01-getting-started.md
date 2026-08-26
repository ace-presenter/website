# 1. Getting Started & Concepts

This chapter explains what ACE Virtual World is, the ideas the rest of the guide builds on, and the shape of a typical session — so both operators and attendees know what they're stepping into.

> **Preview product.** ACE Virtual World is [in development and not yet released](README.md#how-to-read-this-guide). This chapter describes the intended experience; feature badges mark what already works in early builds.

---

## What ACE Virtual World is

Picture a real event at a real venue — a stage, a big screen, a floor where people stand, a couple of breakout areas off to the side. ACE Virtual World builds a **virtual twin** of that kind of space and drops your **live event** inside it:

- The **stage screen** plays your live camera or switcher feed, sub-second, the same way it would on a video wall in the room.
- **Attendees** join as **avatars** and stand together in the space — they see each other, not names in a chat list.
- Everyone hears each other in **spatial voice**: a voice comes from the direction of the person speaking and gets quieter with distance, so the room sounds like a room.
- A **producer** drives the moment for everyone — changing scenes, firing cues, adjusting lighting and the audio mix, opening and closing areas.

It is deliberately **not** "a video call" and **not** "a video on a page." It is a shared place.

### Two things it is not (yet)

Being honest up front: today the venue is a clean, functional **graybox** — real geometry with a stage, screens, a floor, and breakout zones, but not the finished, art-directed venue. Finished venue and avatar **art** is [in development](06-platforms-and-status.md). And **frame-accurate** alignment of the feed with cues across every screen (temporal sync) is still being built. Everything else in this chapter describes what already runs.

---

## The five layers (the whole system in one picture)

The [README](README.md#the-mental-model-an-event-is-five-layers) introduces the five-layer model; here it is as a flow you can hold in your head:

```
  1. INGEST            2. TRANSPORT           3. WORLD          4. PRESENCE        5. PRODUCTION
  where content     one real-time stack     the venue         the people         show control
  comes from        (video+voice+audio)     (stage, screens,  (avatars, voice)   (scenes, cues,
  OBS / camera  ──►  LiveKit (WebRTC)  ──►   floor, breakout) + avatars in it ──► lighting, audio,
  encoder / webcam                          many surfaces      spatial voice      zones, moderation)
```

- **Ingest** is your job as operator: point a camera or switcher at the world. See [Feeding the Stage](03-feeding-the-stage.md).
- **Transport** is handled for you. A single WebRTC media server (LiveKit) carries the live video, everyone's voices, and the spatial-audio positioning — one stack instead of three.
- **World** is the venue you compose: surfaces (screens), lights, spawn points, breakout zones, branding. See [Setting Up a Venue](02-setting-up-a-venue.md).
- **Presence** is the crowd — each attendee is an avatar that moves, and whose voice is positioned at their location.
- **Production** is the live show, run from the producer console. See [Going Live & the Producer Console](04-going-live.md).

You don't have to master all five to run a simple event. The minimum is: compose or open a venue (World), point OBS at it (Ingest), and press **Go live** (Production). The rest deepens the experience.

---

## Who does what: operator vs attendee

ACE Virtual World has two roles, and the difference is enforced, not cosmetic — an attendee never sees or can trigger operator controls.

### The operator (a.k.a. producer)

The **licensed** person who sets up and runs the venue. As operator you:

1. **Compose** the venue — place screens, set branding, lay out scenes. *(See [Chapter 2](02-setting-up-a-venue.md).)*
2. **Feed** the stage — connect OBS / vMix / a camera / a webcam. *(See [Chapter 3](03-feeding-the-stage.md).)*
3. **Go live and run the show** from the producer console — scenes, cues, lighting, audio mix, zones, moderation. *(See [Chapter 4](04-going-live.md).)*

The operator tools live in a **composer** (design the room) and a **producer console** (run the room). On the native desktop app the producer console is its own always-on-top window.

### The attendee

Anyone you invite. Attendees:

- **Open a link** (and sometimes type a short join code) — nothing to install, no account, no license.
- **Watch** the stage feed, **look around** the venue, **move**, and **talk** in spatial voice.
- Join from a **browser** (desktop or mobile) or step inside on a **Meta Quest** headset via WebXR.

Everything an attendee needs is in [Chapter 5](05-joining-as-an-attendee.md).

> **Licensing, briefly.** The **operator** is the licensed party. The **audience is free** — they never sign in. When an operator goes live, that session is intended to be metered against the operator's ACE license. That production billing path is wired but rides on account infrastructure still being finished — see [Status](06-platforms-and-status.md). *(in development)*

---

## The shape of a session

Here is a whole event end to end, so the pieces have a place to hang.

**Before the event (operator, minutes to hours ahead)**

1. Open or compose a venue: choose the space, place your stage screen(s) and any side screens, set your logo and colours, and lay out a few scenes (e.g. *Intro*, *Main stage*, *Breakout*). → [Chapter 2](02-setting-up-a-venue.md)
2. Decide how the stage feed gets in — usually **OBS or vMix → LiveKit**. Have that ready to start streaming. → [Chapter 3](03-feeding-the-stage.md)

**Going live (operator)**

3. Press **● Go live** on the operator console. This creates the event as its own isolated world and shows you a **join code** and a **copyable link**.
4. Share the link with your audience (email, chat, a page — however you reach them).
5. Start your OBS/vMix stream. Switch the stage feed to **live**; the stage screen lights up.

**During the event**

6. Attendees open the link and appear as avatars. They watch, move, and talk.
7. You drive the room from the producer console: change **scenes**, fire **cues**, set **lighting moods**, balance the **audio mix** (show audio vs. crowd voices), and open or close **zones**. Mute the crowd for a keynote, or mute one person for moderation. → [Chapter 4](04-going-live.md)

**Ending**

8. Press **End event** to stop new joins and close the world.

Multiple operators can run **concurrent** events — each event is a completely separate world with its own people, scene, feeds, and audio mix.

---

## Where to go next

- **Operators**, start with [Setting Up a Venue](02-setting-up-a-venue.md).
- **Attendees**, jump straight to [Joining as an Attendee](05-joining-as-an-attendee.md).
- Want the candid maturity picture first? See [Platforms, Requirements & Status](06-platforms-and-status.md).
