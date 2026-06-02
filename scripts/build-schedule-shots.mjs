#!/usr/bin/env node
/**
 * build-schedule-shots.mjs
 *
 * Turns raw Schedule Manager screenshots into the optimized .webp files the
 * marketing site serves from public/schedule/. Drop your captures into
 * scripts/raw-screenshots/ (PNG/JPG/WEBP, any size, ideally ≥1600px wide,
 * retina is great) named by SCREEN below, then run:
 *
 *   node scripts/build-schedule-shots.mjs
 *
 * Each input is resized to 1600px wide (height auto, no upscaling) and written
 * as public/schedule/<screen>.webp at quality 82 — matching the existing assets,
 * so no site code changes are needed.
 *
 * Accepted input names per screen (first match wins): <screen>.{png,jpg,jpeg,webp}
 */
import sharp from "sharp";
import { readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const RAW = join(root, "scripts", "raw-screenshots");
const OUT = join(root, "public", "schedule");
const TARGET_WIDTH = 1600;
const QUALITY = 82;

// Screen → friendly label (app screen it should show)
const SCREENS = {
  welcome:   "Home / Welcome",
  "my-tasks":"My Tasks",
  projects:  "Projects (Pro)",
  tracker:   "Track",
  reports:   "Reports (Pro)",
  settings:  "Settings",
  support:   "Support",
};
const EXTS = ["png", "jpg", "jpeg", "webp"];

if (!existsSync(RAW)) {
  mkdirSync(RAW, { recursive: true });
  console.log(`Created ${RAW}\nDrop your screenshots there named: ${Object.keys(SCREENS).map(s => s + ".png").join(", ")}`);
  process.exit(0);
}

const found = readdirSync(RAW);
let done = 0, missing = [];
for (const [screen, label] of Object.entries(SCREENS)) {
  const file = EXTS.map(e => `${screen}.${e}`).find(n => found.includes(n));
  if (!file) { missing.push(`${screen} (${label})`); continue; }
  const out = join(OUT, `${screen}.webp`);
  await sharp(join(RAW, file))
    .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  const { width, height } = await sharp(out).metadata();
  console.log(`✓ ${file}  →  public/schedule/${screen}.webp  (${width}×${height})`);
  done++;
}
console.log(`\n${done}/${Object.keys(SCREENS).length} screenshots built.`);
if (missing.length) console.log(`Missing (skipped): ${missing.join(", ")}`);
console.log(`Next: review public/schedule/, then commit + push to redeploy.`);
