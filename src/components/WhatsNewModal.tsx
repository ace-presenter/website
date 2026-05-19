"use client";

/**
 * WhatsNewModal — release-announcement popup for the marketing site.
 *
 * Pops up centered on EVERY page load. The localStorage "last-seen"
 * dismissal check was removed — the operator/buyer audience is small
 * and the release cadence is fast (multiple ships per week during
 * launch), so seeing the changelog every visit is the desired
 * behaviour. Dismissed for the current session via ✕, "Close",
 * clicking the overlay, or Esc — refresh and it returns.
 *
 * Replaces the v1.2-era bottom-right toast. The modal pattern was
 * requested deliberately — it's the only surface that reliably draws
 * attention to a major release without a banner taking permanent real
 * estate.
 *
 * Server-side: `version` is passed in from the home page after it
 * resolves the live latest-mac.yml manifest. If the manifest fetch
 * failed (returns null), the modal simply doesn't render.
 */

import { useEffect, useState, useCallback } from "react";

interface Highlight {
  icon: React.ReactNode;
  title: string;
  body: string;
}

interface ReleaseContent {
  version: string;
  date: string;          // human-readable, e.g. "May 6, 2026"
  codename?: string;     // optional release code-name
  highlights: Highlight[];
  /** Why this release is more efficient / powerful than the previous
   *  ones — appears as a divider section between the highlights and the
   *  collapsible details. Each item is a short comparison line. */
  whyBetter?: { label: string; body: string }[];
  improvements: string[];
  fixes: string[];
  removed?: string[];
}

// ── Icons (inline SVG so we don't pull in a runtime icon dependency) ─────────

const I = {
  display: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 18v3" />
    </svg>
  ),
  layers: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 22 8.5 12 15 2 8.5 12 2" />
      <polyline points="2 15.5 12 22 22 15.5" />
    </svg>
  ),
  book: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  image: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  sparkle: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2" />
    </svg>
  ),
  bug: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="6" width="8" height="14" rx="4" />
      <path d="M9 9 6 6M15 9l3-3M3 13h3M18 13h3M9 18l-3 3M15 18l3 3" />
    </svg>
  ),
  trash: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    </svg>
  ),
  caret: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  external: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
};

// ── Release content. Update this object on each ship. ──────────────────────
//
// Why hardcoded vs. CMS: the marketing site is intentionally a single
// Next.js project with no CMS dependency. Each release is a deliberate
// edit + deploy, which is also the only place the release codename and
// editorial framing live. Backend's CHANGELOG list is the comprehensive
// record; this object is the headline-curated subset.

const CURRENT: ReleaseContent = {
  version: "1.8.5",
  date: "May 19, 2026",
  highlights: [
    {
      icon: I.sparkle,
      title: "Real noise suppression in front of Whisper (RNNoise)",
      body: "ACE now denoises every audio frame before it reaches the transcription engine. The biggest architecture gap from our internal audio-recognition blueprint — closed. RNNoise (the open-source recurrent-NN noise filter from Xiph.org, same one used in Zoom-grade telephony) runs at the audio interface's native 48 kHz rate before the resample to 16 kHz, so it sees the cleanest possible signal. Sirens, HVAC, congregation noise, and stage-bleed get attenuated; voice stays clean. Apple Silicon only in v1.8.5 (Intel Macs get a graceful passthrough — no regression). Operator-tunable via Settings; default on. Internal smoke test on synthetic white noise: 99.99% energy reduction with voice signal preserved.",
    },
    {
      icon: I.bug,
      title: "Deepgram WebSocket dies → ACE flips to Whisper automatically",
      body: "Live-service log on v1.8.4 surfaced Deepgram's WebSocket dropping with a 'keepalive ping timeout' mid-sermon. The send loop kept firing audio into the dead socket for ~7 minutes — no transcripts produced, the operator didn't know until they manually toggled offline mode. v1.8.5 detects the terminal error class (1011, keepalive timeout, connection-closed, internal-error) at the source, clears the dead socket, and triggers an automatic fallback to Whisper within one detection cycle. No more silent audio loss.",
    },
    {
      icon: I.bug,
      title: "Following-mode no longer exits while the preacher's still on the verse",
      body: "When a Bible verse is displayed and the preacher reads it word-for-word, every transcript counts as a 'miss' against following mode (because the seq-advance logic only checks the NEXT verse). After 7 such 'misses' the system exited following mode — exactly as the preacher was about to transition to the next verse. v1.8.5 adds a 'hold' path: when the transcript matches the CURRENT verse, the miss counter resets and following mode stays alive. Verbatim reading of Genesis 1:26 → seamless transition to 1:27/1:28 when the preacher moves on.",
    },
    {
      icon: I.bug,
      title: "Manual click on a verse no longer exits following mode immediately",
      body: "After manually clicking a Bible verse, the very next preacher transcript could trip 'too many misses' and exit following mode — because the manual-display path was setting following=True but not resetting the stale miss counter from the prior session. v1.8.5 zeros the counter on every manual click. Operator-corrected verses now get a fresh follow-along window.",
    },
    {
      icon: I.bug,
      title: "\"Matthew 6, verse 17\" — now displays 6:17, not 6:1",
      body: "Field log surfaced 'Matthew 6, verse 17' parsing as Matthew 6:1 because the regex required whitespace between the chapter digit and the 'verse' keyword. The comma immediately after '6' broke the match. v1.8.5 widens the separator to accept comma, period, dash, OR whitespace — mirroring what the pure-digit form ('Matthew 6:17') already does. Preachers who comma-pause between chapter and verse now land on the right verse.",
    },
    {
      icon: I.sparkle,
      title: "Recent-display window: paraphrases follow the operator's lead",
      body: "When a Bible verse has been displayed (auto OR manual) in the same book within the last 60 seconds, the system now allows paraphrase auto-display without requiring an explicit intent phrase. Operator's prior click is the intent signal. Field log: preacher quoted 2 Corinthians 4:6 verbatim ('For God who commanded the lights to shine out of darkness') right after manually displaying 1 Corinthians 4:1 — FAISS correctly identified the verse but v1.8.3's no-intent kill held it back. v1.8.5 lets it through when the recent-display window is active. Tighter score gate (≥0.60) + multi-window stability still required so this doesn't reopen the hymn-noise false-positive class.",
    },
    {
      icon: I.sparkle,
      title: "Import song lyrics from PDF, Word, and PowerPoint",
      body: "Most operators receive the week's lyrics as PDFs from pastors, Word docs from worship leaders, or PowerPoint decks already structured one-slide-per-section. v1.8.5 accepts all three: .pdf (pdfplumber extracts text-based PDFs; image-only scans need OCR which isn't bundled), .docx (python-docx for Office Open XML; legacy binary .doc not supported), and .pptx (python-pptx with title-placeholder promotion — if a slide title says 'Verse 1' or 'Chorus', that becomes the section header; otherwise the smart sectioner clusters stanzas by repetition). Imported songs land directly in the library on save. Plus all the formats already supported: plain text, ChordPro, ProPresenter 6/7, OpenLyrics XML, OpenLP archive.",
    },
    {
      icon: I.sparkle,
      title: "Auto-switches Deepgram to multilingual when it stops hearing English",
      body: "Live-service log surfaced 7+ minutes of Deepgram empty Results with real audio present (RMS 0.05-0.10, well above the silence floor). Root cause: operator left Deepgram on English while the worship leader sang an Efik chorus / preached a Spanish testimonial — Deepgram's English speech-detector rejected non-English vocals as 'no speech' indefinitely. v1.8.5 tracks consecutive empty Results plus a rolling RMS buffer: when 80+ empties land while audio is present, ACE persists 'auto-detect' to your settings and reconnects Deepgram in multilingual nova-2 mode. No operator action required, no rebuild, no manual setting flip. The next service start re-arms the trigger so an English-only week doesn't get stuck in multilingual unnecessarily.",
    },
    {
      icon: I.bug,
      title: "Section detection now follows mid-service song edits",
      body: "Field log surfaced section detection failing to advance after an operator edited a song's sections during a live service. Root cause: ACE caches embedded sections per song to avoid recomputing on every detection window, but the cache had no invalidation path on the six section-mutating endpoints (add, edit, delete, reorder, merge, split). After an edit, FAISS section similarity kept scoring against the stale pre-edit embeddings. v1.8.5 wires invalidate_section_cache to every mutation endpoint so edits take effect on the next detection cycle — no more 'stop and restart detection' workaround.",
    },
    {
      icon: I.bug,
      title: "Library 'currently listening' indicator no longer sticks on the previous song",
      body: "When ACE confirmed a new song mid-service, the animated EQ-bars indicator and bold-white title styling stayed lit on the previous song in the library list. Both songs looked active. Root cause: the indicator was keyed off the rolling detection-history (up to 20 candidates kept indefinitely), so every song that had ever been a candidate kept its icon lit forever. v1.8.5 keys the icon and title styling off the currently active detection only. The confidence-percent badge still shows for every candidate so operators see the ranked picture in multi-song scenes — just one song lights up at a time.",
    },
    {
      icon: I.bug,
      title: "\"Genesis 47 verse 15\" — now displays Genesis 47:15 (not 47:1) (from v1.8.4)",
      body: "Live-service log on v1.8.3 surfaced the preacher saying 'Genesis 47 verse 15 to 27' and the system auto-displaying Genesis 47:**1** at 95% confidence — wrong verse on screen. Root cause: no parse path between the digit-form 'Book 47:15' and the spoken-form 'Book chapter 47 verse 15' handled the elision where the preacher drops 'chapter' when chapter is a digit. v1.8.4 adds the missing rung. 'Romans 8 verse 28', '1 Timothy 2 verse 11', 'John 3 verse 16' — all now land correctly. Range suffixes like 'verse 15 to 27' resolve to the start verse so sequential-following picks up the right cursor.",
    },
    {
      icon: I.bug,
      title: "Auto-imported songs no longer arrive empty or with just one verse",
      body: "When ACR identified a new worship song via fingerprint and the system tried to fetch lyrics from Genius, some imports landed with 0 sections (Genius scrape returned nothing usable) or 1 section (Genius page had no [Section] markers and the lyrics were a single stanza, so the smart-sectioner couldn't fire). The operator then saw 'one verse' placeholder rows or a useless empty song in the library. v1.8.4 rejects imports with fewer than 2 sections or less than 100 characters of total lyrics. When auto-import fails, the system stays unconfirmed and the operator gets a clean retry instead of a half-imported lock-in.",
    },
    {
      icon: I.bug,
      title: "ACR-identified songs with decorated titles now find their Genius page",
      body: "ACR returns titles like 'Nagode (Live) feat. David Dam' or 'Holy Spirit (Acoustic) [Single]'. Genius indexes by canonical title and was returning zero results, so the system stayed stuck on the previously-confirmed song for ~30 seconds while a different live song was actually playing. v1.8.4 strips parenthetical/bracket suffixes, 'feat.'/'ft.'/'featuring'/'with' tails, and version-tail dashes ('- Live') before the Genius query. Nine real-world test titles all map cleanly to the canonical form.",
    },
    {
      icon: I.bug,
      title: "Chorus 2 ↔ Chorus 3 ↔ Chorus 4 flicker on iterating-noun choruses",
      body: "v1.8.3 phrase-family chorus dedup used token-set Jaccard ≥ 0.85, which folded near-duplicate chorus variants with extra 'oh's or dropped articles. But Ekondo-style choruses iterate a single noun position ('I see North America' / 'I see South America' / 'I see Africa') and score only 0.60 Jaccard — below threshold. v1.8.4 adds a second signal: position-aligned token similarity. When two chorus sections share the same scaffold and ≥70% of their token positions match, they fold into one family. Either signal qualifies. The slide stops oscillating between chorus variants on prophetic-declaration worship songs.",
    },
    {
      icon: I.sparkle,
      title: "Voice nav: spoken verse numbers + smart deference to fresh references",
      body: "Two fixes for verse navigation commands the preacher speaks mid-sermon. (a) v1.8.2's regex required digit-form verse numbers, so 'Exodus chapter 16 verse eight and verse 35' skipped past 'verse eight' and grabbed 'verse 35'. v1.8.4 accepts spoken numbers and the non-greedy regex keeps the FIRST verse mentioned. (b) When a preacher names a new book and chapter ('Genesis 47 verse 15'), voice nav used to fire 'goto:15' against whatever stale follow position was set — landing on Exodus 9:15 if the preacher had been in Exodus earlier. v1.8.4 detects the book name in the utterance and defers to fresh-reference parsing.",
    },
    {
      icon: I.bug,
      title: "\"Chapter six and verse 17\" — mixed-form parsing fixed",
      body: "v1.8.2's regex over-caught the connector word 'and' into the chapter group, so 'Galatians chapter six and verse 17' captured 'six and' as the chapter, which can't be parsed as a number — system fell through to chapter-only fallback (verse=1). v1.8.4 strips leading/trailing connector words ('and', 'et', 'und', 'e', 'y' for English, French, German, Italian, Spanish) before number parsing. Now works for digit-spoken-mixed forms across all five languages.",
    },
    {
      icon: I.sparkle,
      title: "Mode switch (Bible → Song) no longer falls back to Whisper",
      body: "When the operator toggled detection mode from Bible to Song mid-service, the new Deepgram WebSocket open was racing with the old session's teardown — the system gave up after the 5-second ready timeout and fell back to Whisper, even though the WS opened cleanly ~7 seconds later. v1.8.4 awaits the previous session's clean shutdown (with a 5s timeout + cancel fallback) before opening the new one. Mode switches now stay on Deepgram if Deepgram is configured.",
    },
    {
      icon: I.layers,
      title: "Bible lookup latency instrumentation",
      body: "Added perf_counter timing around the Signal A SQL lookup so any regression on cold-cache or large-translation-set lookups surfaces in the backend log. Blueprint target: <50ms; typical observed: 1-5ms with the indexed primary key. Logged at >10ms (info) and >50ms (warning) so trends are visible without requiring you to attach a profiler.",
    },
    {
      icon: I.bug,
      title: "Wrong-verse flicker on hymn audio — eliminated (from v1.8.3)",
      body: "On v1.8.2 with a worship-music bed playing during a sermon, Whisper would invent Bible-flavored fragments ('In the name of Jesus, Amen.', 'the world and all its intellectual') that FAISS scored ≥0.88 against verses sharing those tokens — Luke 4:3 and 1 Thessalonians 4:1 were the recurring false positives. No purely semantic gate could separate that noise from real paraphrases (the embedder rewards token co-occurrence equally). v1.8.3 stops auto-display from firing on semantic-only matches when the preacher hasn't either named a reference (\"Luke 4:3\") or used a recognizable intent phrase (\"open your Bibles to…\", \"the scripture says\"). Those matches still appear in the suggestion sidebar — they just don't take over the screen.",
    },
    {
      icon: I.sparkle,
      title: "Multi-window stability gate for paraphrase auto-display",
      body: "Even with reading intent active, a single 0.95+ FAISS match on a noisy transcript could fire the wrong verse. v1.8.3 adds a stability requirement: semantic matches in intent-active mode must hit the same verse across 2 consecutive detection windows before they take over the screen. Explicit references (\"Luke 8:1\") still fire instantly — only the semantic path waits. Adds ~3-5 seconds of latency on paraphrases; eliminates the wrong-verse flash class.",
    },
    {
      icon: I.image,
      title: "Display stays put through quiet moments in worship",
      body: "Old behavior cleared song + section after 15s of silence in one shot — so a worship leader pausing between phrases for breath would drop the slide and reacquire it noisily. v1.8.3 graduates: at 10s of silence, section-progression bias relaxes (vocals returning can re-pick the section); at 20s, the slide clears. The current song stays anchored through the pause.",
    },
    {
      icon: I.bug,
      title: "Chorus 1 ↔ Chorus 2 flicker — fewer cases left",
      body: "v1.7.5 fixed this for verbatim-identical chorus lyrics. v1.8.3 extends it to near-duplicates — when Chorus 1 and Chorus 2 share most of their words but differ by an extra 'oh', a dropped article, or a tag line, they're now treated as one chorus family and the slide stops flipping between them.",
    },
    {
      icon: I.book,
      title: "Six more languages for \"open your Bibles to…\"",
      body: "Reading-intent phrases now cover Chinese (Simplified + Traditional), Arabic, Hausa, Russian, Italian, and Tagalog — joining the existing English, Spanish, French, German, Portuguese, Yoruba, Igbo, Swahili, Korean, Dutch/Afrikaans, and Nigerian English/Pidgin. A pastor saying \"圣经说\" or \"الكتاب المقدس يقول\" or \"la Bibbia dice\" now trips the same intent flag that opens the auto-display gate.",
    },
    {
      icon: I.book,
      title: "Four more languages for Bible references",
      body: "\"Matthieu chapitre 5 verset 3\" (French), \"Matthäus Kapitel 5 Vers 3\" (German), \"Matteo capitolo 5 versetto 3\" (Italian), \"João 3:16\" (Portuguese) now all parse to the right verse. All 66 Bible books got French/German/Portuguese/Italian aliases — total dictionary now 547 book aliases × 617 intent phrases across 13 languages. Closed a latent bug too: French/German/Portuguese/Italian digit references (\"jean 3:16\", \"matteo 5:3\") were silently returning no match in some dev builds — fixed.",
    },
    {
      icon: I.sparkle,
      title: "Lower ACRCloud API costs per service",
      body: "Audio-fingerprint identification used to fire any time the detector was uncertain — burning credits on questions ACR couldn't actually answer. v1.8.3 only calls ACR when the lyric-FAISS top match sits in the murky 0.40–0.60 confidence band. Below that, the no-match fallback handles it; above, FAISS is confident enough that ACR would just confirm what we already know. Field testing: ~10–15 ACR calls per service vs. the old unbounded 30+.",
    },
    {
      icon: I.layers,
      title: "Offline accuracy measurement (replay harness)",
      body: "New backend script — `replay_audio.py` — takes any recorded service audio file, streams it through the same Whisper + Bible-FAISS + check_bible pipeline the live backend uses, and writes a CSV of every detection event (transcript, score, votes, streak, auto_display flag). Operators with engineering capacity can now measure 'right verse on screen' rate against their own recorded services and compare across releases. Run with `python -m backend.scripts.replay_audio --audio path/to/service.wav`.",
    },
    {
      icon: I.bug,
      title: "Deepgram duplicate-word noise fixed (from v1.8.2)",
      body: "On v1.8.1, Deepgram's overlapping interim transcripts polluted the FAISS query as 'I was was in a meeting' / 'the the the New Testament Testament saint'. Real matches still landed sometimes — but at lower confidence than they should have, and occasionally on the wrong verse. v1.8.2 dedups at three points (fragment add, sentence join, final query). The search engine sees clean text.",
    },
    {
      icon: I.bug,
      title: "Voice nav: \"chapter N verse M\" now parses both numbers (from v1.8.2)",
      body: "When the preacher said 'chapter seven verse fourteen' while 2 Corinthians 3 was on screen, v1.8.1 only parsed 'verse 14' and stayed on chapter 3 — landing on 2 Cor 3:14 instead of 2 Cor 7:14. v1.8.2 catches the paired reference and jumps to the right chapter+verse together. The bare 'verse N' fallback still works when only the verse is named.",
    },
    {
      icon: I.bug,
      title: "Following-mode is more patient with paraphrase (from v1.8.2)",
      body: "v1.8.1 exited 'following the preacher verse-by-verse' mode after just 1-2 transcripts that didn't quote scripture verbatim. Preachers rarely quote verbatim — they cite verse, paraphrase three lines, cite the next verse. v1.8.2 keeps follow-along alive through those paraphrase gaps (limit bumped 4 → 7 misses).",
    },
    {
      icon: I.bug,
      title: "\"Holy Spirit\" search now finds KJV's \"Holy Ghost\" (from v1.8.2)",
      body: "Whisper transcribes modern English; the KJV index stores archaic forms. v1.8.1 lost legitimate verse matches because 'Holy Spirit' didn't match 'Holy Ghost', 'says' didn't match 'saith', etc. — and 2 Peter 1:21 (the actual verse) lost to the wrong verse. v1.8.2 augments each search chunk with archaic-form variants for a small set of well-known modern↔KJV pairs before embedding.",
    },
    {
      icon: I.bug,
      title: "Bible auto-display catches paraphrase matches (from v1.8.2)",
      body: "Operator log showed real verse matches landing at 0.50-0.59 confidence — just below the 0.65 floor — and never reaching the screen. v1.8.2 drops the intent-active threshold to 0.50 (combined with the synonym augmentation above, real verses now display). The non-intent path keeps its 0.88+5-word floor so random commentary doesn't fire random verses.",
    },
    {
      icon: I.bug,
      title: "Bible mode: no more \"fast falls the eventide\" hallucinations (from v1.8.2)",
      body: "When detection_mode was 'bible', Whisper was still biased by the song library from earlier in the service — so silent buffers during sermons kept hallucinating 'fast falls the eventide' (Abide With Me). v1.8.2 drops the song-library prompt entirely in bible mode and uses scripture vocab + Bible-book names only.",
    },
    {
      icon: I.bug,
      title: "Backend log noise: uvicorn INFO no longer shows as [backend:err] (from v1.8.2)",
      body: "Every HTTP request hitting the backend used to log as '[backend:err]' because uvicorn writes its access logs to stderr. Looked alarming. Real errors still go to :err; INFO lines, [Pipeline], [Bible], [Audio…], [VAD], [Deepgram], etc. now route to stdout cleanly.",
    },
    {
      icon: I.bug,
      title: "Two quieter fixes (from v1.8.2)",
      body: "(a) 'intent=True' flag stops firing on transcripts that inherited a book/chapter from earlier text — it now requires the parsed book name to actually appear in the current utterance. (b) Audio buffer pre-fills its stride counter on Start, so the first callback fires one stride earlier — the dashboard feels responsive ~2 s sooner after pressing Start.",
    },
    {
      icon: I.book,
      title: "Every Bible is Ready out of the box (since v1.8.1)",
      body: "Nine public-domain translations bundled and pre-indexed — KJV, ASV, BBE, WEB, RV1960, CUV (Chinese), Van Dyck (Arabic), Almeida Atualizada (Portuguese), French APEE. Live detection in every one. Settings → Bible shows them all as 'Ready' on first launch; you never see a 'Preparing 35%' progress bar during a service.",
    },
    {
      icon: I.bug,
      title: "Bible detection silently dead after activating translations — fixed",
      body: "On v1.8.0, clicking 'Set up' on several Bibles at once spawned background index builders that competed with the live-detection engine for the same single-threaded embedder. Net result: Whisper transcribed normally but verses never displayed. v1.8.1 hard-caps concurrent builds at 1 across the whole process and (because every bundled Bible is now pre-built) the build path mostly only ever runs for user-imported Bibles you add yourself.",
    },
    {
      icon: I.bug,
      title: "Confidence ± buttons work on cold start",
      body: "On a fresh install the toolbar's confidence threshold buttons silently no-op'd until you visited Settings — the click was computing `undefined + 0.05 = NaN` against an empty config and the backend rejected it. v1.8.1 falls back to 60% if no value is saved, so the toolbar works from the first launch.",
    },
    {
      icon: I.bug,
      title: "Sermon-mode Bible detection now attaches verse context",
      body: "When ACE picks a verse out of a sermon transcript (not direct quotation), it tries to attach the 1–2 verses on either side for context display. A scope bug in v1.8.0 meant that call silently failed every time — verses landed correct but bare. v1.8.1 calls the right helper.",
    },
    {
      icon: I.bug,
      title: "Five quieter bugs from a post-ship audit",
      body: "/api/propresenter/verify was permanently returning an error string because `requests` was never imported at module top. Settings PUT could NameError-crash when flipping Deepgram on mid-session. Sermon-mode verse context, a dormant route landmine, dead code with an undefined variable, and an edge case in the Bible loader where intra-file duplicates could land twice — all fixed.",
    },
    {
      icon: I.layers,
      title: "Bundle bigger to keep operations simpler",
      body: "v1.8.0's 863 MB download was thanks to leaving most translations as 'install later'. The detection-dead bug we just fixed taught us that's the wrong trade. v1.8.1 ships at ~3.4 GB so all nine translations are present + ready. Operators never see a 'Preparing 35%' progress bar in Settings during a service. The auto-updater pulls only the delta thanks to blockmaps; first install is the one slow download.",
    },
    {
      icon: I.book,
      title: "Multilingual Bible — 9 translations bundled (from v1.8)",
      body: "Public-domain Bibles in English (KJV, ASV, BBE, WEB), Spanish (Reina-Valera 1960), Chinese (Union Version), Arabic (Van Dyck), Portuguese (Almeida Atualizada), and French. Live detection works in any of them — preach in Spanish and Spanish verses display; preach in Mandarin and the Chinese Union Version comes up.",
    },
    {
      icon: I.sparkle,
      title: "Yoruba, Igbo, Hausa, Swahili — visible as 'Coming later'",
      body: "African-language Bibles are on the roadmap. They appear in the translations panel as 'Coming later' so you can see exactly what's planned. We don't have written redistribution clearance from the rights holders yet — the licensing conversation is in progress with the Bible Societies. Once each language is cleared, it ships as a free pack and existing installs get it on the next update.",
    },
    {
      icon: I.book,
      title: "Bible Translations settings panel",
      body: "Settings → Bible has a clean operator-facing panel grouped by language. Each translation shows its state — Ready / Coming later / Disabled — plus license + copyright info you can expand. You don't need to set anything up for normal use; the panel is there for managing translations during a service and for handling Bibles you've imported yourself.",
    },
    {
      icon: I.book,
      title: "Chapter reader click handlers (v1.7.4)",
      body: "v1.7.3 shipped the click-to-expand chapter modal but the click handler wasn't getting attached — clicking the verse in Program or Preview did nothing. v1.7.4 fixes the wiring on both panes, and the DETECTED card in the Bible panel is now also clickable as the primary entry point. Four ways in: DETECTED card, Program, Preview, suggestion cards.",
    },
    {
      icon: I.sparkle,
      title: "Chapter reader opens instantly (no more verse-by-verse loading)",
      body: "v1.7.3's reader was issuing one HTTP request per verse — opening Psalm 119 meant 176 round-trips and a visible loading flicker. v1.7.4 fetches the entire chapter in a single batched request. The modal now pops open and scrolls to the active verse in one frame.",
    },
    {
      icon: I.sparkle,
      title: "Chapter reader no longer mixes 1 John / 2 John / 3 John verses",
      body: "The chapter endpoint was doing a fuzzy LIKE '%John%' match on the book column — so opening 'John 3' returned verses from John AND 1 John, 2 John, 3 John, interleaved by verse number. Switched to exact-book match. Same fix applied to the single-verse endpoint.",
    },
    {
      icon: I.sparkle,
      title: "Deepgram no longer fires twice per sentence",
      body: "The Deepgram SDK emits both is_final and speech_final for the same finalised utterance. v1.7.3's dispatch ran the FAISS pipeline on both — every spoken sentence got searched twice, doubling backend log noise and detection latency. v1.7.4 tracks the last-fired transcript per session and short-circuits the duplicate immediately.",
    },
    {
      icon: I.book,
      title: "Click a Bible verse → see the full chapter (v1.7.3)",
      body: "When a verse is auto-detected and displayed, click it in the Program or Preview pane and a modal opens with the full chapter. The active verse is highlighted in gold and auto-scrolls to the middle of the reader. Each verse in the chapter has a 'Push' button — pivot to a different verse without leaving the modal.",
    },
    {
      icon: I.sparkle,
      title: "Bible reference detection — works on the verses that used to slip (v1.7.3)",
      body: "Operators reported 'Luke 4:1 detects but Luke 6:20 doesn't.' Root cause: Whisper had zero bias toward biblical reference patterns, so it transcribed numbers inconsistently. v1.7.3 bakes all 66 book names + sample references (John 3:16, Romans 8:28, First Corinthians 13:4) into Whisper's English prompt. Also: the parser now accepts 'Matthew 8.8', 'Matthew 8-8', 'John 17, 17' — Whisper invents punctuation differently each time, so we accept all of them.",
    },
    {
      icon: I.sparkle,
      title: "Phrase-loop hallucination killed",
      body: "If you saw the backend log spamming 'fast falls the eventide; fast falls the eventide; fast falls the eventide.' that's Whisper biased by Abide With Me's lyrics inventing text from quiet audio. v1.7.3 detects 3+ copies of any 10+ char phrase and drops them before search — no more wrong-verse flicker triggered by a hallucinated loop.",
    },
    {
      icon: I.sparkle,
      title: "Deepgram auto-flip when you save an API key",
      body: "Save a Deepgram API key in Settings → Audio and transcription_mode flips to online automatically. Clear the key and it flips back to offline. Operators kept saving the key and wondering why Whisper was still running — that two-step is gone.",
    },
    {
      icon: I.book,
      title: "Bible auto-display: tuned so wrong-verse flicker is rare",
      body: "Detection now requires score ≥ 0.88 AND ≥5 words for non-intent matches. v1.7.2's aggressive 0.80 threshold caused 'I shall be' (3 words) to match Ezekiel 28:24 at 98% — meaningless embedding similarity for short fragments. Legitimate hits like 'ashamed of the gospel of Christ' → Romans 1:16 still fire; the noise is gone.",
    },
    {
      icon: I.image,
      title: "Theme editor changes finally apply to Bible projection",
      body: "Customised your font / colour / shadow in the theme editor and Bible verses kept the original gold-on-black? The Bible verse renderer was using hardcoded styles. v1.7.3 wires the active theme through so your verses match your songs.",
    },
    {
      icon: I.sparkle,
      title: "Stops the random freezes during detection (v1.7.2)",
      body: "Three causes stacked: every backend log line was a blocking sync disk write (37 MB log on busy installs), launching a second copy spawned a duplicate backend, and force-quitting left ghost processes. v1.7.2 fixed all three: async logger + 5 MB rotation, single-instance lock, startup orphan-reaper.",
    },
    {
      icon: I.image,
      title: "Clear actually clears the slide image (v1.7.2)",
      body: "v1.5.4 patched the layer-specific Clear (F2 / Clear Slide) but the general Clear button only dropped the lyric text — the image stayed on screen. v1.7.2 fixed: main Clear now resets display_bg_image_path when the background is an ephemeral slide push. Solid/gradient backdrops left alone.",
    },
    {
      icon: I.book,
      title: "12 public-domain hymns, ready to use (v1.7.1)",
      body: "Fresh installs ship with a starter hymn library — Amazing Grace, Holy Holy Holy, Blessed Assurance, It Is Well With My Soul–style classics, all confirmed pre-1928 public domain. If you're upgrading, install them in one click via Settings → Data → Install Starter Hymns. Idempotent: clicking it again skips anything you already have by title.",
    },
    {
      icon: I.sparkle,
      title: "Critical: stops the cold-launch data wipe (v1.7.0)",
      body: "v1.6.0 through 1.6.2 had a bug where the first-launch seed routine could overwrite your database on every restart — silently wiping imported Bibles and replacing them with bundled defaults. If you noticed Bibles disappearing, this is why. v1.7.0+ changes the seed gate so an existing database is never overwritten. If you lost translations, re-import them; they'll persist from now on.",
    },
    {
      icon: I.layers,
      title: "Multi-day Service Plan tabs (v1.7.0)",
      body: "Run more than one service a week — Sunday morning + Sunday evening + Midweek — and switch between them with one click. Each tab shows name + date; + New creates a fresh plan inline; hover a tab and click × to delete (with confirm). Plans sort most-recent-date first.",
    },
    {
      icon: I.sparkle,
      title: "Genius imports — proper section detection",
      body: "Genius pages without [Section] headers used to lump every lyric into one Verse 1. Blank lines now act as section breaks and a repetition-based smart sectioner tags chorus / pre-chorus / verses automatically.",
    },
    {
      icon: I.image,
      title: "Imports show up immediately — no restart",
      body: "Imported a song? It now appears in the Library sidebar instantly. Imported a Bible? It's in the BiblePanel dropdown and Settings → Bibles right away. The 'Importing…' toast also dismisses properly now (no more pinned spinners).",
    },
    {
      icon: I.layers,
      title: "ProPresenter Migrator (v1.6.0)",
      body: "Five-stage wizard detects your local ProPresenter folder, scans every .pro file + Media Bin, previews exactly what'll come over, then imports songs (with section structure), playlists, and media in one shot. Coming from PP no longer means starting empty.",
    },
    {
      icon: I.sparkle,
      title: "Animated Welcome Splash (v1.6.0)",
      body: "First-launch greeting opens with concentric rings + the ACE bullseye while the app primes itself in the background.",
    },
    {
      icon: I.image,
      title: "Intel Macs — fully working (v1.6.0)",
      body: "v1.0–v1.5.7 silently shipped an arm64 Python backend inside the Intel .app, so detection died on launch for every Intel Mac. The build pipeline now copies the right per-arch backend. If you tried ACE on Intel before and it wouldn't start — install v1.7.0.",
    },
    {
      icon: I.book,
      title: "Imported Bibles visible in the panel (v1.6.1)",
      body: "Through v1.6.0, the BiblePanel dropdown showed only the 5 bundled translations — imported XML Bibles were invisible. Now the dropdown renders every translation actually in your database, with a 'Custom' group for codes outside the standard registry.",
    },
    {
      icon: I.book,
      title: "Bible verse lock — ⌘⇧L (v1.5.5)",
      body: "Catches the right verse but keeps suggesting alternatives mid-sermon? Press ⌘⇧L to lock the current verse. Suggestions still appear in the transcript; nothing auto-replaces what's on screen.",
    },
  ],
  improvements: [
    "Build pipeline now runs a `seed:clean` script before every release — asserts only the 5 public-domain Bibles are in the bundled seed, zero songs, zero dev residue",
    "Tab strip in Service Plan shows date below name; supports + New / delete with confirm",
    "Global Bible PageDown / PageUp shortcuts work from anywhere in the app",
    "Reset Detection (⌘⇧R) — clears hallucinated state without stopping capture",
    "Whisper context-prompt rebuilds on Auto/Song/Bible mode change — no more vocabulary bleed",
    "Cold-start audience reset — no leftover slide flashing from the previous service",
  ],
  fixes: [
    "Bible references being missed because Whisper transcribed numbers inconsistently (added 66 book names + ref examples to Whisper's prompt)",
    "Reference parser now accepts 'Matthew 8.8' / 'Matthew 8-8' / 'John 17, 17' alongside the existing colon/space forms",
    "Wrong-verse flicker from short fragments (auto-display now requires score ≥0.88 AND ≥5 words for non-intent matches)",
    "Romans-1:16 stuck-loop after a correct match (transcript-history accumulator cleared after every auto-display)",
    "First-detection lag at boot (Bible FAISS now eager-loads at startup instead of on first sermon-mode activation)",
    "Theme editor not applying to Bible projection (BibleVerseDisplay was using hardcoded styles)",
    "Whisper hallucination loop 'fast falls the eventide; …' filling backend logs (3+ phrase-repeat filter)",
    "Saving a Deepgram key but staying on Whisper (auto-flips transcription_mode now)",
    "Random freezes during active detection (async logger + single-instance lock + startup orphan reaper)",
    "Bible verses invisible in operator Preview/Program when displayed via the Bible panel",
    "Slide image staying on screen after pressing Clear (only F2 / Clear Slide had been patched)",
    "CCLI SongSelect import silently broken (called a function that doesn't exist — surfaced during code audit)",
    "Macro execute path referenced dead lazy-init helpers — would have NameError'd on first run",
    "Cold-launch data wipe affecting Bible-only operators on v1.6.x (now stopped)",
    "Genius lyrics lumping into one Verse 1 when source had no [Section] headers",
    "'Importing…' toast pinned forever after song import (toast id mismatch)",
    "Imported songs not appearing in Library sidebar without restart",
    "BiblePanel + Settings not refreshing after a Bible import",
    "Dock disappearing on single-display Macs when audience window opened",
    "Service Plan + New button doing nothing (Electron window.prompt incompatibility)",
  ],
};

// ── Component ───────────────────────────────────────────────────────────────

interface Props {
  version: string | null;
}

export default function WhatsNewModal({ version }: Props) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  // Collapsible sections — Improvements open by default to give visitors
  // a sense of depth without scrolling; Fixes/Removed collapsed because
  // they're more reference than headline.
  const [openImprovements, setOpenImprovements] = useState(true);
  const [openFixes, setOpenFixes] = useState(false);
  const [openRemoved, setOpenRemoved] = useState(false);

  // Show on every page load. Version-match guard stays — without it the
  // visitor would see a stale modal pointing to an older release during
  // the deploy gap between R2 manifest update and Vercel CDN warm-up.
  const shouldShow = useCallback(() => {
    if (!version) return false;
    if (version !== CURRENT.version) return false;
    if (typeof window === "undefined") return false;
    return true;
  }, [version]);

  useEffect(() => {
    if (!shouldShow()) return;
    // Slight delay so the hero gets first-paint attention before the
    // modal fades in. 700ms feels intentional, not jarring.
    const t = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(t);
  }, [shouldShow]);

  // Dismiss for the current session only — no localStorage write.
  // Refreshing the page brings the modal back, by design (per request).
  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => setVisible(false), 200);
  }, []);

  // Esc to close
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  if (!visible) return null;

  const ChevronCaret = ({ open }: { open: boolean }) => (
    <span
      className="transition-transform duration-200 inline-flex items-center"
      style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
    >
      {I.caret}
    </span>
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`What's new in ACE v${CURRENT.version}`}
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 transition-opacity duration-200 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
      onClick={dismiss}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(8, 10, 14, 0.78)", backdropFilter: "blur(8px)" }}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className={`relative w-full max-w-[640px] max-h-[88vh] overflow-y-auto rounded-2xl shadow-2xl transition-transform duration-200 ${
          exiting ? "scale-[0.98]" : "scale-100"
        }`}
        style={{
          background: "linear-gradient(180deg, #161B26 0%, #0D1117 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.6), 0 0 50px rgba(200,16,46,0.10)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close (top-right) */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[#9AA0AC] hover:text-white hover:bg-white/5 transition-colors text-[16px] leading-none"
        >
          ✕
        </button>

        {/* Header */}
        <div className="px-7 pt-7 pb-2">
          {CURRENT.codename && (
            <div className="text-[20px] font-bold text-white tracking-tight mb-1">
              &ldquo;{CURRENT.codename}&rdquo;
            </div>
          )}
          <div className="text-[20px] font-bold text-white tracking-tight">
            v{CURRENT.version} &mdash; what&rsquo;s new
          </div>
          <div className="text-[12px] text-[#888] mt-1">
            ACE changelog for v{CURRENT.version} &middot; released {CURRENT.date}
          </div>
        </div>

        {/* Highlights — top items with leading icons */}
        <div className="px-7 py-4 space-y-5">
          {CURRENT.highlights.map((h, i) => (
            <div key={i} className="flex gap-4">
              <div
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
                style={{
                  background: "rgba(232,24,58,0.10)",
                  color: "#E8183A",
                  border: "1px solid rgba(232,24,58,0.22)",
                }}
                aria-hidden="true"
              >
                {h.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold text-white leading-tight mb-1">
                  {h.title}
                </div>
                <p className="text-[12.5px] text-[#B0B5C0] leading-[1.55]">
                  {h.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Why this release outperforms past releases — appears between
            highlights and the collapsible details. Adds a labelled
            divider with side-by-side "before/after"-shaped comparison
            lines, framing the release as a step-change rather than a
            list of incremental items. */}
        {CURRENT.whyBetter && CURRENT.whyBetter.length > 0 && (
          <>
            <div className="mx-7 mt-5 mb-3 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/[0.08]" />
              <span
                className="text-[10px] font-bold tracking-[0.18em] uppercase"
                style={{ color: "#E8183A" }}
              >
                Why v{CURRENT.version} is more powerful
              </span>
              <span className="h-px flex-1 bg-white/[0.08]" />
            </div>
            <div className="px-7 pb-3 space-y-3">
              {CURRENT.whyBetter.map((w, i) => (
                <div
                  key={i}
                  className="rounded-md p-3"
                  style={{
                    background: "rgba(232,24,58,0.04)",
                    border: "1px solid rgba(232,24,58,0.10)",
                  }}
                >
                  <div
                    className="text-[11.5px] font-bold mb-1"
                    style={{ color: "#E8183A", letterSpacing: "0.02em" }}
                  >
                    {w.label}
                  </div>
                  <p className="text-[12px] text-[#B0B5C0] leading-[1.55]">
                    {w.body}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Vertical separator before collapsibles */}
        <div className="mx-7 my-3 h-px bg-white/[0.06]" />

        {/* Collapsible sections */}
        <div className="px-7 pb-2 space-y-1">
          <CollapsibleSection
            icon={I.sparkle}
            label="Improvements"
            count={CURRENT.improvements.length}
            open={openImprovements}
            onToggle={() => setOpenImprovements((o) => !o)}
            items={CURRENT.improvements}
          />
          <CollapsibleSection
            icon={I.bug}
            label="Bug Fixes"
            count={CURRENT.fixes.length}
            open={openFixes}
            onToggle={() => setOpenFixes((o) => !o)}
            items={CURRENT.fixes}
          />
          {CURRENT.removed && CURRENT.removed.length > 0 && (
            <CollapsibleSection
              icon={I.trash}
              label="Removed"
              count={CURRENT.removed.length}
              open={openRemoved}
              onToggle={() => setOpenRemoved((o) => !o)}
              items={CURRENT.removed}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-white/[0.06] flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={dismiss}
            className="px-4 py-2 rounded-lg text-[12.5px] font-semibold text-[#B0B5C0] hover:text-white hover:bg-white/5 transition-colors"
          >
            Close
          </button>
          <a
            href="#whats-new"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("whats-new");
              if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
              dismiss();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12.5px] font-bold text-white transition-colors"
            style={{ background: "#1E2230", border: "1px solid rgba(255,255,255,0.10)" }}
          >
            View Changelog
            <span aria-hidden="true">{I.external}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Collapsible row primitive ──────────────────────────────────────────────

interface CollapsibleSectionProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  items: string[];
}

function CollapsibleSection({
  icon,
  label,
  count,
  open,
  onToggle,
  items,
}: CollapsibleSectionProps) {
  return (
    <div className="rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/[0.03] transition-colors text-left"
      >
        <span
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.04)",
            color: "#A3A3A3",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className="flex-1 text-[13.5px] font-semibold text-white">
          {label}
        </span>
        <span className="text-[11px] text-[#666] tabular-nums mr-1">{count}</span>
        <span className="text-[#9AA0AC]">
          <span
            className="inline-flex items-center transition-transform duration-200"
            style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </span>
      </button>
      {open && (
        <ul className="px-3 pb-3 pt-1 space-y-2">
          {items.map((it, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-[12.5px] text-[#B0B5C0] leading-[1.55] pl-10 pr-2"
            >
              <span
                className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                style={{ background: "#555" }}
                aria-hidden="true"
              />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
