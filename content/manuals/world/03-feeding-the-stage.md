# 3. Feeding the Stage

*For the **operator**.* This chapter is about **Ingest** — getting live video (and the show audio) into the world. There are four ways to bring a camera in; pick per source. It also covers how audio flows and where ACE Presenter is headed.

> **Preview — verified.** The main path (OBS / vMix → LiveKit → the stage screen) has been confirmed end-to-end on real LiveKit Cloud: a live publisher's track appeared on the stage screen, sub-second. The iso-camera, encoder, and in-browser paths use the same machinery. Pointing a full **production switcher via WHIP at the reserved room** is the intended live setup; the last mile (a real OBS box replacing the test publisher) is being finalised.

---

## The model in one line

```
switcher / camera ──► LiveKit room ──► a "feed" ──► routed onto a surface (screen / wall)
```

- Your program output goes to **one reserved room, `ace-stage`** — the **Program (PGM)** feed. Route it onto the main screen and any IMAG side walls.
- Each **extra camera / angle** publishes into **its own** room and becomes an additional live feed you route to a side surface.
- **Audio** rides the program room and plays as a flat venue **PA** (full level everywhere). Attendee **voice** is separate and spatial — see [Audio](#how-audio-flows).

Transport is one WebRTC stack (LiveKit), so video, voice, and spatial audio all travel together — you don't run separate systems for each.

---

## Prerequisite: a LiveKit project

Live feeds ride on **LiveKit** (a WebRTC media server). In the current preview an operator uses a **LiveKit Cloud** project (free tier is fine) and points their encoder at it. In the released product this is intended to be brokered through the ACE gateway on your license, so you won't handle raw keys — that pooled path is [wired but still being finished](06-platforms-and-status.md). *(in development)*

If no LiveKit is configured, the world simply stays on its **file feed** (a bundled or supplied video) — nothing breaks, you just don't get live.

---

## Four ways to get a camera in

### 1. OBS / vMix → PGM (the main feed) *(preview — verified)*

This is the primary, verified path. In OBS:

1. **Settings ▸ Stream ▸ Service: WHIP**.
2. Set the **URL** and **bearer token** from your LiveKit project's ingress for room **`ace-stage`**.
3. **Start Streaming**.

The **Program** feed lights up the main screen, and the audio in this stream becomes the venue PA. vMix works the same way via its WHIP/external output.

### 2. OBS / vMix → an iso room (an extra angle)

Run a **second** WHIP output — a second OBS instance, or a vMix external output — into its **own** room, for example `ace-cam-2`. Then in the composer:

1. **Compose ▸ Feeds ▸ "Live (LiveKit room)"** — label it (e.g. "Stage cam"), set the room to `ace-cam-2`, and **+ Add feed**.
2. In the producer panel, open **Feed routing** and point a **side surface** at it.

> Iso cameras are **video-only** to the world. The show audio always comes from the program room, so the world ignores iso-room audio to avoid doubling it.

### 3. Hardware encoder (RTMP / WHIP)

For pro cameras through an encoder/decoder, configure a **LiveKit ingress** for the target room (**WHIP**, or **RTMP** if your encoder only speaks RTMP), then add a **live feed** for that room exactly as in path 2. Most of the work is on the LiveKit side; the world side is identical to any other live feed.

Setting up an ingress once, per room: in your LiveKit project, **Ingress ▸ Create**, choose **WHIP** (or RTMP), set the room name and a participant identity, and copy the ingress URL + key into your encoder or OBS.

### 4. In-browser publisher (no OBS) *(preview)*

Turn the **operator's own webcam or a screen/window** into a camera — the quickest possible angle, no external software:

1. **Compose ▸ "Publish a camera (this device)"** → pick **Webcam** or **Screen / window**, set a room (e.g. `ace-cam-3`) and a feed label.
2. **● Start publishing** — this publishes the device into the room and auto-adds a matching live feed.
3. Route it onto a surface. **■ Stop publishing** ends it.

Publishing needs a publish-grant token (distinct from the attendee mic-only token). The app fetches it for you.

---

## How audio flows

There are **two independent audio buses**, and the world sorts sources into them automatically:

| Bus | Source | Behaviour | How it's identified |
|---|---|---|---|
| **Program** | The PGM room's audio — your OBS/switcher mix | **Flat PA** — same level everywhere, no distance falloff | A participant that publishes **video** is treated as program |
| **Voice** | Attendee microphones | **Spatial** — positioned at each speaker's avatar, quieter with distance | An **audio-only** participant is treated as attendee voice |

So you don't tag anything: OBS (which publishes video) becomes the PA, and a phone attendee (audio only) becomes a positioned voice in the crowd. You balance the two buses, mute the crowd, or mute one person from the producer console — see [Going Live ▸ Audio mix](04-going-live.md#mixing-audio). A synthetic room **reverb** gives voices a sense of the space; swapping in a recorded impulse response of a real venue for higher fidelity is supported. *(preview — spatial voice is built and running; a session with several mic'd people is needed to sign it off perceptually.)*

---

## A note on stage videos (file feeds)

When you use a **file** feed (a pre-roll, or a fallback while you set up), the video must be a **faststart MP4** — one whose index is at the front of the file — or browsers won't stream it smoothly. If you prepare video for this, export or remux it as faststart. Live feeds don't have this constraint; it only applies to file feeds.

---

## Where ACE Presenter fits

The intended suite handoff is that **ACE Presenter publishes straight into a world surface** — either as a **video** feed (its program output → LiveKit) or as **structured data** (slides and lyrics sent over a data channel and rendered natively in-world, crisp at any distance), with cues syncing slide changes. That would make the world just another output ACE Presenter already speaks to, in the same cueing language as the rest of the suite.

This direct integration is **[planned](06-platforms-and-status.md)**, not built. **Today**, you bridge them the same way as any other source: send ACE Presenter's output through **OBS/vMix (or an NDI/capture bridge) → LiveKit** as a normal live feed. *(planned)*

---

## Quick reference

| Want | Do |
|---|---|
| Main screen shows the show | OBS **WHIP → `ace-stage`**; route **Program** onto the main surface |
| A second camera angle | Publish to its **own** room (path 2/3/4) → add a **live feed** → route to a side surface |
| Show audio fills the venue | Automatic — the program room's audio plays as flat PA |
| A quick angle with no OBS | **Compose ▸ Publish a camera (this device)** → Webcam or Screen |
| No live feed available | The world stays on the file feed — nothing breaks |
