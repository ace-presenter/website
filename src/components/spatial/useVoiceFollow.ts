"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

/**
 * "Read it out loud": the visitor reads the lyric and the slide moves on.
 * Uses the browser's own speech recognition (Chrome, Edge, Safari); nothing
 * is sent to ACE. A taste of following by voice, not ACE's engine — the copy
 * around it says so.
 *
 * Matching is forgiving on purpose: target words are found in order, a word
 * counts if it's within one letter (or shares its first four letters), and
 * the line moves on when every word but one is heard.
 */

type Rec = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
};

const getCtor = (): (new () => Rec) | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};

const clean = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z\s']/g, " ")
    .replace(/'/g, "")
    .split(/\s+/)
    .filter(Boolean);

function near(a: string, b: string) {
  if (a === b) return true;
  if (a.length >= 4 && b.length >= 4 && a.slice(0, 4) === b.slice(0, 4)) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  // one edit
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else { i++; j++; }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

/** How many of `target`'s words were heard, in order, and whether its last word was. */
export function matchLine(target: string, heard: string[]) {
  const words = clean(target);
  let n = 0;
  let k = 0;
  let last = false;
  for (const [idx, w] of words.entries()) {
    let found = -1;
    for (let j = k; j < heard.length; j++) {
      if (near(w, heard[j])) {
        found = j;
        break;
      }
    }
    if (found < 0) continue; // a misheard word doesn't stop the rest counting
    n++;
    k = found + 1;
    if (idx === words.length - 1) last = true;
  }
  return { n, total: words.length, last };
}

/** Finished the line: most words heard and the end of it, or all but one. */
export const lineDone = ({ n, total, last }: ReturnType<typeof matchLine>) =>
  n >= total - 1 || (last && n >= Math.ceil(total * 0.75));

export type VoiceState = "off" | "starting" | "on" | "denied" | "error";

export function useVoiceFollow({
  line,
  onLineDone,
  onHeard,
  levelRef,
}: {
  line: string;
  onLineDone: () => void;
  onHeard: (n: number, text: string) => void;
  levelRef: RefObject<number>;
}) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<VoiceState>("off");
  const rec = useRef<Rec | null>(null);
  const want = useRef(false);
  const consumed = useRef(0);
  const lineRef = useRef(line);
  const cb = useRef({ onLineDone, onHeard });
  const media = useRef<{ stream: MediaStream; ctx: AudioContext; raf: number } | null>(null);

  useEffect(() => setSupported(!!getCtor()), []);
  useEffect(() => {
    lineRef.current = line;
  }, [line]);
  useEffect(() => {
    cb.current = { onLineDone, onHeard };
  }, [onLineDone, onHeard]);

  const stopLevel = () => {
    const m = media.current;
    if (!m) return;
    cancelAnimationFrame(m.raf);
    m.stream.getTracks().forEach((t) => t.stop());
    void m.ctx.close();
    media.current = null;
    if (levelRef.current !== undefined) (levelRef as { current: number }).current = 0;
  };

  const startLevel = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const an = ctx.createAnalyser();
      an.fftSize = 512;
      ctx.createMediaStreamSource(stream).connect(an);
      const buf = new Float32Array(an.fftSize);
      const tick = () => {
        an.getFloatTimeDomainData(buf);
        let s = 0;
        for (let i = 0; i < buf.length; i++) s += buf[i] * buf[i];
        (levelRef as { current: number }).current = Math.min(1, Math.sqrt(s / buf.length) * 8);
        if (media.current) media.current.raf = requestAnimationFrame(tick);
      };
      media.current = { stream, ctx, raf: requestAnimationFrame(tick) };
    } catch {
      /* the level meter is a nicety; recognition still runs */
    }
  };

  const stop = useCallback(() => {
    want.current = false;
    rec.current?.abort();
    rec.current = null;
    stopLevel();
    setState("off");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback(() => {
    const Ctor = getCtor();
    if (!Ctor) return;
    want.current = true;
    consumed.current = 0;
    setState("starting");
    const r = new Ctor();
    r.lang = "en-US";
    r.continuous = true;
    r.interimResults = true;
    r.maxAlternatives = 1;
    r.onresult = (e) => {
      setState("on");
      let text = "";
      for (let i = 0; i < e.results.length; i++) text += " " + e.results[i][0].transcript;
      const all = clean(text);
      const heard = all.slice(consumed.current);
      const m = matchLine(lineRef.current, heard);
      cb.current.onHeard(m.n, heard.join(" "));
      if (lineDone(m)) {
        consumed.current = all.length;
        cb.current.onLineDone();
      }
    };
    r.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        want.current = false;
        stopLevel();
        setState("denied");
      } else if (e.error !== "no-speech" && e.error !== "aborted") {
        setState("error");
      }
    };
    r.onend = () => {
      // Chrome ends after a pause; keep going while the visitor wants it.
      if (want.current && rec.current === r) {
        consumed.current = 0;
        try {
          r.start();
        } catch {
          /* already started */
        }
      }
    };
    rec.current = r;
    try {
      r.start();
      setState("on");
      void startLevel();
    } catch {
      setState("error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => stop(), [stop]);

  return { supported, state, start, stop };
}
