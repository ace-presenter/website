# 4. Going Live & the Producer Console

*For the **operator**.* Your venue is composed ([Chapter 2](02-setting-up-a-venue.md)) and your feed is ready ([Chapter 3](03-feeding-the-stage.md)). This chapter is running the show: going live, sharing the link, and driving the room from the producer console — scenes, cues, lighting, the audio mix, zones, and moderation.

> **Preview.** The producer console runs in early builds and drives scenes, cues, lighting moods, feed routing, audio, and zones — all synced to every client. It is verified at the build level and against live LiveKit; a full interactive show sign-off is still to come. **Frame-accurate** alignment of the feed with cues across every screen (temporal sync) is [in development](06-platforms-and-status.md).

---

## Going live

The **● Go live** control lives on the operator console. Pressing it:

1. **Creates the event** as its own isolated world, seeded with the venue you composed.
2. Binds you (the operator) into the event's room.
3. Shows you a **join code** (a short code like `3XH4H`) and a **copyable link** (a URL with the code in it).

Then:

4. **Share the link** with your audience — email, chat, a page, however you reach them. That's all they need; no account, no install (see [Chapter 5](05-joining-as-an-attendee.md)).
5. **Start your stream** (OBS/vMix), and switch the stage feed to **live** — the stage screen lights up with your program.

**● End event** stops new joins and closes the world. Multiple operators can run **concurrent** events; each is a fully separate world with its own people, scene, feeds, and audio mix.

> **Metering.** Going live is intended to register the event against your ACE **license** and meter the audience joins. That production billing path is wired end-to-end but rides on account infrastructure still being finished — in the current preview the link works against the world backend regardless. See [Status](06-platforms-and-status.md). *(in development)*

---

## The producer console

On the **native desktop app** the producer console is its own **always-on-top window** (open it from the Window menu, or the ⌘⇧P shortcut), separate from the world view — so you can watch the room and drive it at the same time. In the **browser**, the producer panel appears alongside the world when you're in the operator role.

The console is organised around the things you change live: **scenes**, the **cue list**, **feed routing**, the **audio mix**, **zones**, and the **in-room** people list.

---

## Scenes: cutting the room's look

A **scene** bundles a camera framing, a lighting mood, and what's on each screen (see [Chapter 2 ▸ Scenes](02-setting-up-a-venue.md#scenes-saving-looks-to-cut-between)). Firing a scene applies it to **everyone at once**. The three built-in scenes give you a working show out of the box:

- **Intro** — welcoming look with the greeter banner, for as people arrive.
- **Main stage** — the show look, framed on the stage.
- **Breakout** — oriented toward the breakout areas.

Cut to **Intro** as the room fills, to **Main stage** when the show starts, and to **Breakout** to send people into smaller groups. Each cut changes camera framing, lighting mood, and screen content together, synced to every attendee.

---

## The cue list

The **cue list** fires individual actions on demand — the moment-to-moment beats of your show. Cues run **backend-resolved actions** (the server decides and applies the effect), so firing a cue changes the world for every client consistently, not just on your screen. Use cues for the granular moves between scene changes — a specific lighting hit, opening a zone, a content change on one surface.

> **Timing.** Cues apply live to everyone, but **frame-exact** alignment with the video (so a lower-third lands on the same frame for every attendee) is the **temporal sync** work still [in development](06-platforms-and-status.md). For now, treat cues as "apply now to everyone," which is right for the great majority of moments.

---

## Re-routing feeds live

**Feed routing** in the console is live: point any surface at a different feed mid-show. Cut the main screen from the program mix to a slide deck; move an iso camera onto a side wall; swap a presenter tile. This is the same routing you set up while composing ([Chapter 2 ▸ Routing feeds](02-setting-up-a-venue.md#routing-feeds-onto-surfaces)), available during the show.

For **slide decks**, step through with **◀ ▶** — only the current slide index travels to attendees, so it stays sharp. You can toggle a **● Laser** pointer and hover a screen to paint a dot every attendee sees. *(preview)*

---

## Mixing audio

The console's **Audio mix** section controls the [two audio buses](03-feeding-the-stage.md#how-audio-flows) — the show's **Program** PA and the crowd's spatial **Voice**:

- **Program / Voices faders** — set the room balance for everyone. Bring voices down under a talk; bring them up for a Q&A.
- **Mute all voices (keynote)** — silences every attendee mic in one tap, so only the show audio plays. Each client drops its own mic at the source, and the local voice bus is dropped as a backstop, so the mute is real, not just lowered. Tap again to un-mute.
- **Per-attendee mute** — the 🎤 button next to a name in the **In-room** list mutes one person (moderation).

> Mutes are enforced **at the source**: a muted client turns its own microphone off. That means a mute genuinely stops the audio rather than only turning it down on other people's machines.

---

## Managing zones

**Zones** are the named areas you defined while composing — stage, floor, breakout, VIP, backstage. During the show you **lock and unlock** them to shape where people can be:

- Open the **breakout** zones after the keynote to send people into groups.
- Keep **backstage** or **VIP** locked to everyone but the right people.

Lock state and live occupancy sync to every client, so what you see in the console matches what attendees experience. (Anchoring different **audio** to different zones is [planned](06-platforms-and-status.md).)

---

## Moderating the room

The **In-room** list is your roster and your moderation surface:

- See who's present.
- **Mute one person** with the 🎤 button next to their name.
- **Mute the whole crowd** with **Mute all voices (keynote)** for talks and presentations.

Because voice is spatial, disruptive audio is naturally localised — but the per-person and global mutes are there for real control when you need it.

---

## A simple run sheet

A minimal show, start to finish:

1. **Compose** or open your venue and **publish** it. → [Chapter 2](02-setting-up-a-venue.md)
2. Have **OBS/vMix ready** to stream to `ace-stage`. → [Chapter 3](03-feeding-the-stage.md)
3. **● Go live**; copy the **link**; share it.
4. Cut to the **Intro** scene as people arrive.
5. **Start the stream**; switch the stage feed to **live**.
6. Cut to **Main stage**; run the show with **scenes** and **cues**.
7. Balance the **audio mix**; **mute the crowd** for talks, un-mute for Q&A.
8. Open **breakout** zones for small groups if you want them.
9. **● End event** when you're done.

---

## What's still being built here

To keep expectations honest, the show-control features not yet finished:

- **Temporal (frame-accurate) A/V sync** — aligning the feed and cues to the exact same frame for every attendee. *(in development)*
- **Live captions** of the stage audio via speech-to-text. A local-microphone demo caption source exists; the production stage-audio caption source is *(in development)*.
- **Real lighting-desk ingest** (DMX / Art-Net) so the virtual rig mirrors a physical rig. *(planned)*
- **Audio zones** — different audio anchored to different areas. *(planned)*

See [Chapter 6](06-platforms-and-status.md) for the full board.
