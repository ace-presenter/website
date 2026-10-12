# 12 — Following by Voice, Speakers & Shows

New in **ACE Presenter 3.0**. ACE now follows any script as it is spoken — a talk, a lesson, a play — and gives the people on stage the tools they expect: notes, a presenter view, a teleprompter and captions. This chapter covers all of it, plus the broadcast rundown, streaming to several places, the input check and the plans.

Badges as elsewhere: *(both)*, *(Windows: not yet available)*, and the plan that has it — *(Pro)* means Pro and Venue, *(Venue)* means Venue only. The full list of what each plan includes is at [ace-presenter.app/pricing](https://www.ace-presenter.app/pricing#compare).

---

## What will you use ACE for?

The first time 3.0 runs, ACE asks what you use it for — **Church, Events, Education, Stage** or **Broadcast** — and sets its words, its starting layout and how it listens to suit. A service becomes an event, a lesson, a show or an episode; the cue plan becomes an agenda, a lesson plan, a running order or a rundown. *(both)*

- **Each show remembers its own mode.** Open a church service and ACE is in Church mode; open a conference deck saved as Events and it switches.
- Change it any time: *File ▸ Use ACE for*, or in Settings / Preferences.
- If you used ACE before 3.0, Church is already picked; nothing changes unless you choose something else.
- Like every launch question, it waits until nothing is on air, so it never takes the keyboard from your clicker.

## Following slides by voice *(Pro: 10 hours a month · Venue: unlimited)* *(both)*

ACE listens to the speaker and moves the slides as they talk, reading from the **speaker notes** of each slide (or the slide's own text when there are no notes).

**Turn it on:** *Output ▸ Follow Slides by Voice*, or the *Follow by voice* switch in the presenter view. Listening must be running (the LISTENING pill or START).

**How it behaves**

- It puts up the slide holding the **next** words to be said, so short lines are on screen as they are spoken.
- If the speaker goes off script, it **holds** where it is (the presenter view says *OFF SCRIPT*) and picks up again when they come back.
- Moving a slide by hand is always fine: ACE carries on from wherever you put it.
- It never moves backwards on its own by mistake.
- On recorded talks it was within one line of the speaker 98% of the time, about 0.8 s behind.

**Good input matters.** Give ACE the presenter's microphone feed from the desk, not a room microphone. See *The input check* below.

## Speaker notes, the presenter view and clicker keys *(Free: one service day a week · Pro: every day)* *(both)*

- **Notes on any slide.** Edit a slide and type in its notes box. PowerPoint speaker notes come in with the deck when you import a .pptx.
- **Presenter view** — *Output ▸ Presenter View* (**⌥⌘P / Ctrl+Alt+P**). A window for the speaker or a confidence monitor: the slide now, the slide next, your notes in large type, and your timer (red once it runs over). With the rundown, it also shows how long is left in this item.
- **Clicker keys.** Presentation clickers just work: next, previous, and **B** or **.** to blank the screen.

## The voice teleprompter on a stage screen *(Pro: 10 hours a month · Venue: unlimited)* *(both)*

In the stage layout editor, select a **Current Slide** box and tick **Teleprompter**. On the stage screen it scrolls the speaker's notes as they talk, with the words still to say ahead. Tick **Mirror** for teleprompter glass. When nobody is following by voice it moves with the slides instead.

## Cues in your notes *(Venue)* *(both)*

Write a marker in a slide's notes and ACE fires it when the speaker reaches that point:

| Marker | What happens |
|---|---|
| `[LT: Ada Okoye, Guest author]` | Shows that name lower third (yours, matched by name, or a new one) |
| `[LT: off]` | Takes the lower third off |
| `[SCENE: Welcome]` | Triggers the scene group of that name |
| `[ATEM: cam 2]` | Cuts the ATEM switcher to input 2 (also `[ATEM: 2]`, `input 2`, `camera 2`) |

Markers are not shown on the slide or read aloud by the follower. **Put a marker a short phrase early:** a switcher cut lands one to three seconds after the word, because ACE has to hear it first. The ATEM cut is a cut, not a dissolve. Below Venue, markers are simply ignored.

## Surtitles for theatre *(Venue)* *(both)*

*File ▸ Import ▸ Surtitle Script…* turns a script into a deck ACE follows by the actors' voices: each line is what is **said** on stage (what ACE listens for) and what is **shown** (what the audience reads — often a translation).

- **CSV or TSV:** `said, shown` on each row, or `speaker, said, shown`. A header row naming the columns is recognised and not imported.
- **Plain text:** one entry per paragraph, `said | shown`. With no `|`, the line is shown as it is said.

Run it with *Follow Slides by Voice* on. On a recorded play the exact line was up 81% of the time.

## Live captions *(Pro: 10 hours a month · Venue: unlimited)* *(both)*

What the speaker says, as a caption band. Choose where in Settings / Preferences ▸ *Live captions*:

- **On the screens** — the room sees them.
- **Stream and recording only** — online viewers get captions; the room doesn't.
- **Screens and stream** — both.

Songs are not captioned. Captions move on finished phrases, a moment after they are spoken. On the Mac, a recording's captions can also be exported as SRT or VTT. *(Windows: not yet available)*

## The broadcast rundown *(Venue)* *(both)*

Give each item a **planned length** in Edit Cue (half-minute steps). When you *Go On Air*, the run bar shows:

- the live item against its plan — e.g. **1:12 / 3:00**, red once it runs over;
- the show's **OVER / UNDER / ON TIME** so far;
- **NEXT IN** (time left in this item), **ENDS** (when the show finishes if the rest runs to plan) and **ELAPSED**.

Cue rows show each item's planned length and, once it has run, its actual time. A **Hold** doesn't stop the clock — the room's time keeps going — and an item you go back to carries on counting.

## Streaming to several places at once *(Venue)* *(both)*

In the Stream panel, *Destinations* lists where the stream goes — up to four, each with its own on/off switch, server URL and stream key. ACE encodes the picture **once** and sends it to every destination you have switched on.

- **Upload is the limit, not the computer.** The panel shows the upload you need (about 4.6 Mb/s per destination at 4,500 kbps).
- **A platform that can't keep up** goes red (*Can't keep up*): ACE briefly drops its picture until it catches up, so its viewers see a short freeze instead of a stream that falls further and further behind. The other destinations are not affected.
- **A destination that drops** reconnects on its own; one that can't connect at all (a wrong key) is marked *Failed* and the rest carry on.
- The same catch-up applies to a single destination: a slow upload no longer leaves your stream minutes behind by the end of the service.

**Stream health** *(Pro)* *(both)* — the STREAM pill in the top bar and the Stream panel show whether the stream is getting out: the rate, dropped frames and reconnects, green / amber / red.

## The input check *(every plan)* *(both — Windows checks levels only)*

The LISTENING pill and Detection settings say what ACE is hearing, and what to do about it:

| ACE says | What to do |
|---|---|
| Input is good | Nothing |
| Mostly music | Feed ACE a vocals-only send from the desk instead of a room mic or the full mix |
| Too quiet | Raise the input gain on the interface, or the send level on the desk |
| Too loud | Turn the send or the gain down until the peaks stay below full scale |
| No sound | Check the input device, the cable, and that the desk send is up |

## The plans *(both)*

ACE Presenter has three plans — **Free**, **Pro** and **Venue**. In short:

- **Free** — listening (song and Bible detection), live streaming and the speaker tools on **one service day a week**: the first time you use one of them in a week (Monday–Sunday), that whole day is open until midnight. Free screens and streams carry the **ACE FREE** mark.
- **Pro** — everything, every day, with no mark; following by voice and live captions for 10 hours a month; cloud speech 300 minutes a month.
- **Venue** — everything in Pro with no limit on following by voice, plus cue markers, surtitles, the rundown, several stream destinations, lyric and verse lower thirds, the Song Bank and more; cloud speech 900 minutes a month.

When something isn't in your plan, ACE says so plainly — *"The theme editor is part of ACE Pro"* — with **See plans** to compare.

- **A plan never stops anything in the middle of a service.** Limits only stop something *starting*: a stream that runs past midnight on a Free service day, or following that passes ten hours mid-sermon, carries on.
- **If you used ACE before 3.0, you keep everything you have today for six months** after 3.0's release; the Upgrade window shows until when. New 3.0 features follow the plans from day one.
