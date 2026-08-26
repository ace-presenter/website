# 6 · On-Device AI: Note Polish & Voice Memo

ACE Editors' Notes has AI features built on a firm principle: **your notes are about unreleased footage under NDA, so AI runs on your Mac by default.** Nothing is sent to a server unless you deliberately opt in to the optional cloud upgrade. This chapter covers the two AI features that ship, what they need, and the private-by-default design.

---

## The privacy stance, stated plainly

Editors routinely work on material that can't leave the building. A director's note about "act two pacing" is not something to hand to a third-party API by default. So the design is **local-first, cloud-only-if-you-ask**:

- The shipping AI features run on **Apple's on-device models** — no network, no API key, nothing uploaded.
- A cloud option exists as an **explicit, per-feature opt-in** with a clear indicator when it's active (covered at the end of this chapter).
- The default, in every case, is on-device.

---

## Requirement: macOS 26 or later *(needs macOS 26+)*

Both shipping AI features depend on Apple frameworks that only exist on **macOS 26+** with **Apple Intelligence** enabled and downloaded on supported hardware:

- **Note Polish** uses Apple's on-device **Foundation Models** (the built-in system language model).
- **Voice Memo** uses Apple's **Speech** framework in its on-device mode.

On earlier macOS, the two buttons are still visible but **disabled**, each with a tooltip explaining the requirement (for example, *"Note Polish requires macOS 26+ with Apple Intelligence enabled"*). This is the second, higher macOS floor referenced in [Getting Started](01-getting-started.md): the app runs on macOS 12; the AI needs macOS 26.

Everything else in this manual works without any of this.

---

## Note Polish — raw notes into a director-ready brief

You take fast, messy notes during a review. Before sending them on, **Polish** rewrites them into a clean, professional, well-organized brief — same content, better presentation.

**How to use it:**

1. Write your note as usual.
2. Click **Polish Note** in the toolbar, or press **⌥⌘P** (also under *AI ▸ Polish Note*).
3. The on-device model rewrites the text and shows you the result.

**Design guarantees:**

- **Nothing is auto-applied.** The polished version is presented for you to accept or reject — your original is never silently overwritten.
- **Timecodes are preserved verbatim**, so click-to-seek keeps working on the polished text.
- The model is instructed not to invent details — it reorganizes and tightens what you wrote, it doesn't add facts. (As with any language model, give the result a read before sending it on.)

**Available when:** macOS 26+, Apple Intelligence enabled, supported hardware. Otherwise the button is disabled with an explanatory tooltip.

---

## Voice Memo — dictate a note, transcribed on-device

Sometimes it's faster to talk than type — especially mid-scrub in Resolve. Voice Memo captures a spoken note and drops the transcript into the editor.

**How to use it:**

1. **Press and hold** the **Hold to Record** button.
2. Speak your note — e.g. *"VFX department needs to remove the boom-mic shadow here, frames 2735 to 2890."*
3. **Release** the button. The transcript is inserted into the current note.

**Timecode stamping:** if Resolve is connected, the moment you *start* recording the app captures Resolve's playhead timecode and stamps the transcribed note with it — so a dictated note is anchored to the frame you were looking at, and is click-to-seek like any other ([Chapter 3](03-timecodes-click-to-seek.md)).

**Privacy design:**

- Transcription is **on-device** (the Speech framework's offline mode is enforced), so audio isn't sent anywhere for recognition.
- **Audio is never written to disk.** It's transcribed live and discarded — only the resulting text stays.
- First use prompts once for **Microphone** and **Speech Recognition** permission; allow both for the feature to work.

**Available when:** macOS 26+ with on-device Speech support. On-device recognition quality is strongest for English; the app enforces the on-device path rather than falling back to cloud. If your Mac lacks Speech support the button is disabled with a tooltip.

---

## The optional cloud upgrade — strictly opt-in

For anyone who wants frontier-model quality and accepts the trade-off, ACE Editors' Notes can route AI through the cloud instead of the on-device model. This is **off by default** and designed to be unmistakable when on.

- Configured in **Preferences**: you supply your own **Anthropic (Claude) API key**, stored in the macOS **Keychain** — never in the app's database or a plist.
- **Per-feature toggles:** even with a key stored, each feature (e.g. Polish) stays on-device unless you explicitly switch that feature to cloud. A feature uses the cloud *only* when a key is present **and** its toggle is on.
- **Visible when active:** a cloud-powered run is labelled (a "via Claude" badge) so you always know when note text left your Mac.
- Note text is sent **only** when you invoke a cloud-enabled feature — there's no background syncing.

If you have an ACE Suite account, the app can also sign in from Preferences to carry your entitlement; the AI defaults remain on-device regardless. When in doubt, the safe default — and the shipping default — is **local**.

---

## Roadmap AI (not in the current beta)

The AI plan sequences further on-device features after Polish and Voice Memo — **Smart Categorization** (suggest a note's category), **Semantic Search** (find notes by meaning), and **Cross-note Insights** (e.g. "summarize all VFX notes for this timeline"). These are designed local-first as well but are **not part of the current beta**; treat them as direction, not shipped features. The keyword search and manual categories in [Chapter 5](05-writing-categories-search.md) cover today's needs without AI.

---

Next: getting your notes out of the app — [Exporting & Handoff](07-exporting-and-handoff.md).
