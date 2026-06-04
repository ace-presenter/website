"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { products, type ProductKey } from "@/lib/brand";

/**
 * DemoTile — the right-hand visual in the product showcase.
 *
 * Picks the richest available representation, in priority order:
 *   1. `video`  → autoplaying, muted, looping clip with a poster still.
 *   2. `shot`   → a real product screenshot with a slow Ken-Burns drift.
 *   3. animated → a purpose-built CSS/SVG demo for the product (no asset needed).
 *
 * Everything is reduced-motion-safe: under `prefers-reduced-motion` the video
 * shows its poster, the screenshot holds still, and the animated demos render a
 * representative resting frame with no looping motion.
 *
 * All variants share the same tilted, accent-lit "device" shell so the section
 * reads consistently as you scroll between products.
 */

export type DemoShot = { src: string };
export type DemoVideo = { src: string; poster: string };

const TILT = "rotateX(7deg) rotateY(-13deg)";

export default function DemoTile({
  pkey,
  shot,
  video,
  label,
  chip,
  reKey,
}: {
  pkey: ProductKey;
  shot?: DemoShot;
  video?: DemoVideo;
  label: string;
  chip: string;
  /** Changes when the active slide changes — re-triggers the entrance. */
  reKey: number;
}) {
  const reduce = useReducedMotion();
  const acc = products[pkey];

  return (
    <div
      key={reKey}
      className="ace-reveal w-full max-w-lg"
      style={{ aspectRatio: "16 / 10" }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -9, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }
        className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 will-change-transform"
        style={{
          transform: TILT,
          boxShadow: `0 50px 130px -30px rgba(${acc.rgb},0.55), 0 12px 40px -20px rgba(0,0,0,0.85)`,
        }}
      >
        {video ? (
          <VideoLayer video={video} reduce={reduce} label={label} />
        ) : shot ? (
          <ShotLayer shot={shot} reduce={reduce} label={label} />
        ) : (
          <AnimatedLayer pkey={pkey} chip={chip} label={label} reduce={reduce} />
        )}

        {/* Accent sheen — unifies every variant under one light */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, rgba(${acc.rgb},0.16) 0%, rgba(${acc.rgb},0) 46%)`,
          }}
        />
      </motion.div>
    </div>
  );
}

/* ───────────── video ───────────── */

function VideoLayer({
  video,
  reduce,
  label,
}: {
  video: DemoVideo;
  reduce: boolean | null;
  label: string;
}) {
  // Reduced motion → show the poster still, no playback.
  if (reduce) {
    return (
      <Image
        src={video.poster}
        alt={`${label} preview`}
        fill
        sizes="(min-width: 1024px) 32rem, 100vw"
        className="object-cover object-top"
      />
    );
  }
  return (
    <video
      className="absolute inset-0 w-full h-full object-cover object-top"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={video.poster}
      aria-label={`${label} demo`}
    >
      <source src={video.src} />
    </video>
  );
}

/* ───────────── screenshot (Ken-Burns) ───────────── */

function ShotLayer({
  shot,
  reduce,
  label,
}: {
  shot: DemoShot;
  reduce: boolean | null;
  label: string;
}) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
      transition={
        reduce ? undefined : { duration: 18, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <Image
        src={shot.src}
        alt={`${label} screenshot`}
        fill
        sizes="(min-width: 1024px) 32rem, 100vw"
        className="object-cover object-top"
      />
    </motion.div>
  );
}

/* ───────────── animated demos (no asset) ───────────── */

function AnimatedLayer({
  pkey,
  chip,
  label,
  reduce,
}: {
  pkey: ProductKey;
  chip: string;
  label: string;
  reduce: boolean | null;
}) {
  const acc = products[pkey];
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        background: `linear-gradient(160deg, rgba(${acc.rgb},0.16), rgba(12,12,12,0.92))`,
      }}
    >
      {/* faux window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="ml-3 text-[10px] uppercase tracking-[0.2em] text-white/45 font-semibold">
          {chip}
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden">
        {pkey === "presenter" && <PresenterDemo reduce={reduce} />}
        {pkey === "world" && <WorldDemo reduce={reduce} />}
        {pkey !== "presenter" && pkey !== "world" && (
          <PanelDemo pkey={pkey} label={label} reduce={reduce} />
        )}
      </div>
    </div>
  );
}

/* Flagship: a compact "listening → match → advance" mock, in the spirit of the
   hero centerpiece but sized for the tile. */
function PresenterDemo({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="absolute inset-0 p-5 flex flex-col">
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-6 w-6 items-center justify-center">
          {!reduce && (
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ background: "rgba(34,197,94,0.30)" }}
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <span className="relative h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
        </span>
        <span className="text-xs font-semibold text-[#C4C4C4]">Listening…</span>
        <span className="ml-auto text-[9px] font-mono text-[#22C55E]">0.97</span>
      </div>

      {/* match bar */}
      <div className="mt-4 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg,#C8102E,#E8183A)",
            width: reduce ? "92%" : undefined,
          }}
          animate={reduce ? undefined : { width: ["12%", "92%"] }}
          transition={
            reduce
              ? undefined
              : { duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
          }
        />
      </div>

      {/* waveform */}
      <div className="mt-auto flex items-end justify-center gap-[3px] h-12">
        {Array.from({ length: 22 }).map((_, i) => (
          <motion.span
            key={i}
            className="flex-1 max-w-[5px] rounded-full"
            style={{ background: "rgba(200,16,46,0.5)", height: "30%" }}
            animate={reduce ? undefined : { height: ["22%", `${34 + ((i * 41) % 60)}%`, "22%"] }}
            transition={
              reduce
                ? undefined
                : {
                    duration: 1.1 + (i % 5) * 0.18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 7) * 0.05,
                  }
            }
          />
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-white/10 bg-black/40 px-3 py-2">
        <div className="text-[8px] uppercase tracking-[0.18em] text-[#666] font-bold">
          Now matched
        </div>
        <div className="text-[11px] font-semibold text-white">
          Goodness of God · auto-advanced
        </div>
      </div>
    </div>
  );
}

/* World: an orbiting virtual-space motif. */
function WorldDemo({ reduce }: { reduce: boolean | null }) {
  const rgb = products.world.rgb;
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {[0, 1, 2].map((ring) => (
        <motion.span
          key={ring}
          className="absolute rounded-full border"
          style={{
            width: `${38 + ring * 26}%`,
            height: `${38 + ring * 26}%`,
            borderColor: `rgba(${rgb},${0.4 - ring * 0.1})`,
          }}
          animate={reduce ? undefined : { rotate: ring % 2 ? -360 : 360 }}
          transition={
            reduce
              ? undefined
              : { duration: 18 + ring * 8, repeat: Infinity, ease: "linear" }
          }
        >
          <span
            className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
            style={{ background: `rgb(${rgb})`, boxShadow: `0 0 12px rgba(${rgb},0.9)` }}
          />
        </motion.span>
      ))}
      <span
        className="relative h-3 w-3 rounded-full"
        style={{ background: `rgb(${rgb})`, boxShadow: `0 0 22px rgba(${rgb},0.9)` }}
      />
    </div>
  );
}

/* Generic animated panel for remaining products (e.g. Manager). */
function PanelDemo({
  pkey,
  label,
  reduce,
}: {
  pkey: ProductKey;
  label: string;
  reduce: boolean | null;
}) {
  const acc = products[pkey];
  return (
    <div className="absolute inset-0 p-5 flex flex-col gap-3">
      <div className="text-2xl font-bold tracking-tight" style={{ color: acc.accentVivid }}>
        {label}
      </div>
      {[0, 1, 2, 3].map((row) => (
        <motion.div
          key={row}
          className="h-2.5 rounded-full"
          style={{
            width: ["78%", "62%", "70%", "48%"][row],
            background: `rgba(${acc.rgb},${0.5 - row * 0.08})`,
          }}
          animate={reduce ? undefined : { opacity: [0.45, 1, 0.45] }}
          transition={
            reduce
              ? undefined
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: row * 0.25 }
          }
        />
      ))}
      <div className="mt-auto flex gap-1.5 items-end h-14">
        {Array.from({ length: 10 }).map((_, b) => (
          <motion.span
            key={b}
            className="flex-1 rounded-sm"
            style={{
              height: `${30 + ((b * 27) % 60)}%`,
              background: `rgba(${acc.rgb},${0.35 + (b % 3) * 0.18})`,
            }}
            animate={reduce ? undefined : { scaleY: [0.7, 1, 0.7] }}
            transition={
              reduce
                ? undefined
                : { duration: 1.8 + (b % 4) * 0.2, repeat: Infinity, ease: "easeInOut", delay: (b % 5) * 0.1 }
            }
          />
        ))}
      </div>
    </div>
  );
}
