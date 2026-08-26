# 3 · Timecodes & Click-to-Seek

This is the heart of ACE Editors' Notes. Every timecode in your notes is a live link to your Resolve timeline: **click it, and Resolve's playhead jumps to that exact frame.** No copy-paste, no alt-tabbing, no hunting.

---

## The problem it solves

The old loop: you keep notes in one app and edit in Resolve. Every time a note references a moment, you copy the timecode, switch to Resolve, click into the timecode field, paste, hit enter, then switch back. Dozens of times a session. It's slow and it breaks concentration.

ACE Editors' Notes collapses that to a single click. Your notes sit beside the timeline and *navigate* it.

---

## How timecodes are recognized

You don't mark up timecodes or use any special syntax. As you type, ACE Editors' Notes watches for timecode patterns and, the instant one is complete, renders it **blue and bold** and makes it clickable. This highlighting is done live by a syntax highlighter — it never alters your underlying text, so exports and searches see the plain characters you typed.

**Recognized formats:**

| You type | Interpreted as |
|---|---|
| `01:02:33:18` | Hours : minutes : seconds : **frames** (standard, frame-accurate) |
| `01:02:33` | Hours : minutes : seconds (no frame field) |
| `1:22:14` | Single-digit hours are accepted |

For frame-accurate work, prefer the full **HH:MM:SS:FF** form. That's the format the **Insert Timecode** button produces and the format Resolve markers import as.

---

## Two ways to put a timecode in a note

### 1. Type it

Just write it inline with your note. This is ideal offline, or when you're transcribing a director calling out times:

```
01:05:42:05 – tighten this cut
```

The moment `01:05:42:05` is complete it turns blue and becomes clickable.

### 2. Stamp Resolve's current playhead — Insert Timecode *(needs Resolve)*

When the bridge is connected, you can grab exactly where Resolve is parked instead of typing digits:

1. Park Resolve's playhead on the frame you're noting.
2. In ACE Editors' Notes, click **Insert Timecode** (the button reads *"Insert Timecode (00:00:00:00)"*), or press **⌘T**.
3. Resolve's current playhead timecode is inserted at your cursor, ready for you to type the note after it.

This is the fastest way to build accurate notes while you scrub: land on a frame, ⌘T, type the thought, repeat.

> **Offline behaviour.** With no Resolve connection, Insert Timecode still lets you place a timecode — you enter it manually in HH:MM:SS:FF form. The click-to-seek jump simply waits until Resolve is connected again.

---

## Click-to-seek: clicking a timecode drives Resolve *(needs Resolve)*

With the connection dot **green**:

1. **Click any blue timecode** in your notes.
2. ACE Editors' Notes sends a seek command through the Python bridge.
3. **Resolve's playhead jumps** to that frame — effectively instantly.

The status area confirms the clicked timecode. That's the whole interaction: read your note, click the time, you're there.

**What clicking needs to succeed:**

- The connection dot is green (Resolve running, project + timeline open, bridge connected — see [Getting Started](01-getting-started.md)).
- The timecode is a valid `HH:MM:SS:FF` / `HH:MM:SS` form.
- The timecode falls **within the active timeline's range**.

---

## Timeline start offset — why `01:00:00:00` matters

Broadcast timelines very often **start at `01:00:00:00`** rather than zero. ACE Editors' Notes accounts for the timeline's start timecode when it seeks, so a note that says `01:00:10:00` lands where you expect on an hour-based timeline.

The practical consequences:

- On a timeline that starts at `01:00:00:00`, a timecode like `01:00:10:00` seeks correctly, while `00:00:10:00` may fall *before* the start of the timeline and not jump.
- If clicks seem to land in the wrong place, check **Resolve ▸ Timeline ▸ Timeline Settings ▸ Start Timecode**, and confirm your note timecodes are expressed in the same base as the timeline.
- Match your timeline **FPS** to the project FPS too — a frame field only means the same instant if the frame rate agrees.

---

## Clicking does nothing? Quick checks

1. **Is the dot green?** Click-to-seek is a live feature; a red dot means standalone mode. Reconnect per [Getting Started](01-getting-started.md).
2. **Is the format valid?** It must read as `HH:MM:SS:FF` or `HH:MM:SS` and appear blue/bold. If it isn't highlighted, it isn't recognized.
3. **Is it in range?** A timecode before the timeline's start (the `01:00:00:00` offset case above) or past its end won't jump.
4. **Is the timeline active and unlocked in Resolve?** The playhead can only move on the active timeline.

More fixes in [Shortcuts & Troubleshooting](08-shortcuts-and-troubleshooting.md).

---

## A note on the reverse direction

Clicking a note-timecode to move Resolve works today. The *opposite* automation — the app **creating a marker in Resolve** at a note's timecode — is written and ready but currently blocked by a Resolve 20.x API bug. That story, and the marker import that works great right now, is [Chapter 4](04-markers-from-resolve.md).
