/**
 * The homepage "Try it" demo — a small, self-contained service plan plus a
 * text matcher that stands in for ACE's on-device listener.
 *
 * Everything here is public domain (hymns written before 1900, scripture in
 * the 1769 Authorized text) so the demo never shows licensed lyrics. The
 * translation is deliberately not named anywhere on screen.
 */

export type CueKind = "horn" | "note" | "book";

export type Slide = {
  /** Section label shown on the stage canvas (VERSE 1, CHORUS, PSALM 23:1…). */
  label: string;
  lines: string[];
};

export type Cue = {
  id: string;
  kind: CueKind;
  title: string;
  /** Scripture reference, e.g. "John 3:16" — set for book cues only. */
  ref?: string;
  slides: Slide[];
};

export const SERVICE_NAME = "Sample Sunday Service";

export const CUES: Cue[] = [
  {
    id: "welcome",
    kind: "horn",
    title: "Welcome",
    slides: [
      { label: "ANNOUNCEMENT", lines: ["Welcome"] },
      { label: "ANNOUNCEMENT", lines: ["We're glad you're here", "this morning"] },
    ],
  },
  {
    id: "amazing-grace",
    kind: "note",
    title: "Amazing Grace",
    slides: [
      { label: "VERSE 1", lines: ["Amazing grace, how sweet the sound", "That saved a wretch like me"] },
      { label: "VERSE 1", lines: ["I once was lost, but now am found", "Was blind, but now I see"] },
      { label: "VERSE 2", lines: ["'Twas grace that taught my heart to fear", "And grace my fears relieved"] },
      { label: "VERSE 2", lines: ["How precious did that grace appear", "The hour I first believed"] },
      { label: "VERSE 3", lines: ["Through many dangers, toils and snares", "I have already come"] },
      { label: "VERSE 3", lines: ["'Tis grace hath brought me safe thus far", "And grace will lead me home"] },
    ],
  },
  {
    id: "it-is-well",
    kind: "note",
    title: "It Is Well With My Soul",
    slides: [
      { label: "VERSE 1", lines: ["When peace like a river attendeth my way", "When sorrows like sea billows roll"] },
      { label: "VERSE 1", lines: ["Whatever my lot, Thou hast taught me to say", "It is well, it is well with my soul"] },
      { label: "CHORUS", lines: ["It is well with my soul", "It is well, it is well with my soul"] },
    ],
  },
  {
    id: "holy-holy-holy",
    kind: "note",
    title: "Holy, Holy, Holy",
    slides: [
      { label: "VERSE 1", lines: ["Holy, holy, holy! Lord God Almighty!", "Early in the morning our song shall rise to Thee"] },
      { label: "VERSE 1", lines: ["Holy, holy, holy, merciful and mighty!", "God in three Persons, blessed Trinity!"] },
    ],
  },
  {
    id: "john-3-16",
    kind: "book",
    title: "John 3:16",
    ref: "John 3:16",
    slides: [
      {
        label: "JOHN 3:16",
        lines: [
          "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
        ],
      },
    ],
  },
  {
    id: "psalm-23",
    kind: "book",
    title: "Psalm 23:1-4",
    ref: "Psalm 23",
    slides: [
      { label: "PSALM 23:1", lines: ["The LORD is my shepherd; I shall not want."] },
      { label: "PSALM 23:2", lines: ["He maketh me to lie down in green pastures: he leadeth me beside the still waters."] },
      { label: "PSALM 23:3", lines: ["He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake."] },
      {
        label: "PSALM 23:4",
        lines: [
          "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.",
        ],
      },
    ],
  },
];

/** Phrases offered as one-tap suggestions under the input. */
export const SUGGESTIONS = [
  "Amazing grace, how sweet the sound",
  "Turn with me to John 3:16",
  "When peace like a river attendeth my way",
  "Psalm twenty-three, verse four",
  "Next slide",
];

/** The scripted run behind "Play a sample service". */
export const SAMPLE_SCRIPT = [
  "Good morning, and welcome!",
  "Amazing grace, how sweet the sound, that saved a wretch like me",
  "I once was lost, but now am found",
  "'Twas grace that taught my heart to fear",
  "Please turn with me to John chapter three, verse sixteen",
  "The Lord is my shepherd, I shall not want",
  "He restoreth my soul",
];

/* ───────────── matcher ───────────── */

export type Position = { cue: number; slide: number };

export type Detection =
  | { type: "song" | "scripture"; to: Position; via: "lyric" | "reference" }
  | { type: "command"; command: "next" | "previous" | "blank" }
  | { type: "missing-scripture"; ref: string }
  | { type: "none" };

const STOP = new Set(
  "a an and the of to in on my me i is it that this with for be so as at by or but now our we you your his him he thee thy thou do did am was".split(" "),
);

const words = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const content = (s: string) => words(s).filter((w) => !STOP.has(w));

/* Spoken numbers → digits, enough for chapter/verse references. */
const ONES: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
  eighteen: 18, nineteen: 19, first: 1, second: 2, third: 3, fourth: 4,
};
const TENS: Record<string, number> = { twenty: 20, thirty: 30, forty: 40, fifty: 50 };

function numberize(text: string): string {
  const toks = text.toLowerCase().replace(/-/g, " ").split(/\s+/);
  const out: string[] = [];
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i].replace(/[^a-z0-9:]/g, "");
    if (TENS[t] != null) {
      const next = toks[i + 1]?.replace(/[^a-z]/g, "");
      if (next && ONES[next] != null && ONES[next] < 10) {
        out.push(String(TENS[t] + ONES[next]));
        i++;
      } else out.push(String(TENS[t]));
    } else if (ONES[t] != null) out.push(String(ONES[t]));
    else out.push(toks[i]);
  }
  return out.join(" ");
}

const BOOKS = "genesis|exodus|psalms?|proverbs|isaiah|matthew|mark|luke|john|acts|romans|corinthians|galatians|ephesians|philippians|hebrews|james|revelation";
const REF = new RegExp(
  `\\b(${BOOKS})\\s+(?:chapter\\s+)?(\\d{1,3})(?:\\s*(?::|verses?|v\\.?)\\s*|\\s+)?(\\d{1,3})?`,
  "i",
);

function detectReference(text: string): Detection | null {
  const m = numberize(text).match(REF);
  if (!m) return null;
  const book = m[1].toLowerCase().replace(/s$/, "");
  const chapter = Number(m[2]);
  const verse = m[3] ? Number(m[3]) : 1;
  if (book === "john" && chapter === 3 && verse === 16) {
    return { type: "scripture", to: { cue: CUES.findIndex((c) => c.id === "john-3-16"), slide: 0 }, via: "reference" };
  }
  if (book === "psalm" && chapter === 23 && verse >= 1 && verse <= 4) {
    return { type: "scripture", to: { cue: CUES.findIndex((c) => c.id === "psalm-23"), slide: verse - 1 }, via: "reference" };
  }
  const name = m[1][0].toUpperCase() + m[1].slice(1).toLowerCase();
  return { type: "missing-scripture", ref: `${name} ${chapter}${m[3] ? `:${verse}` : ""}` };
}

function detectCommand(text: string): Detection | null {
  const t = words(text).join(" ");
  if (/^(next|next slide|advance|go forward|forward)$/.test(t)) return { type: "command", command: "next" };
  if (/^(back|go back|previous|previous slide|last slide)$/.test(t)) return { type: "command", command: "previous" };
  if (/^(blank|black|clear|blank screen|clear screen|go to black)$/.test(t)) return { type: "command", command: "blank" };
  return null;
}

/* Rarity weights: "restoreth" says far more about where we are than "soul". */
const LINES = CUES.flatMap((c) => c.slides.flatMap((s) => s.lines.map((l) => new Set(content(l)))));
const DF = new Map<string, number>();
LINES.forEach((set) => set.forEach((w) => DF.set(w, (DF.get(w) ?? 0) + 1)));
const idf = (w: string) => Math.log(1 + LINES.length / (DF.get(w) ?? 1));
const weight = (ws: Iterable<string>) => [...ws].reduce((sum, w) => sum + idf(w), 0);

/**
 * Fuzzy line match — rarity-weighted F1 over content words, scored per lyric
 * line, with a small bonus for the slide right after the one that's live
 * (services run forward, so ties should too).
 */
function detectLyric(text: string, live: Position | null): Detection | null {
  const said = new Set(content(text));
  if (said.size === 0) return null;
  const saidWeight = weight(said);
  let best: { score: number; to: Position } | null = null;

  CUES.forEach((cue, ci) => {
    cue.slides.forEach((slide, si) => {
      for (const line of slide.lines) {
        const lw = new Set(content(line));
        if (!lw.size) continue;
        const matched = [...lw].filter((w) => said.has(w));
        // Enough evidence? Two shared words, a short line, or one rare word.
        if (!matched.length) continue;
        if (matched.length < 2 && lw.size > 2 && (DF.get(matched[0]) ?? 0) > 2) continue;
        const hit = weight(matched);
        const p = hit / saidWeight;
        const r = hit / weight(lw);
        // F0.5: people sing fragments, so precision counts for more than recall.
        let score = (1.25 * p * r) / (0.25 * p + r);
        if (live && live.cue === ci && live.slide + 1 === si) score += 0.08;
        if (!best || score > best.score) best = { score, to: { cue: ci, slide: si } };
      }
    });
  });

  const found = best as { score: number; to: Position } | null;
  if (!found || found.score < 0.38) return null;
  const kind = CUES[found.to.cue].kind;
  return { type: kind === "book" ? "scripture" : "song", to: found.to, via: "lyric" };
}

export function detect(text: string, live: Position | null): Detection {
  return detectCommand(text) ?? detectReference(text) ?? detectLyric(text, live) ?? { type: "none" };
}
