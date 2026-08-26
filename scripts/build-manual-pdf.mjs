// Emits the print HTML for a manual booklet PDF, then renders it with WeasyPrint.
//
//   node scripts/build-manual-pdf.mjs <product>
//     <product> = presenter | schedule | editors-notes | manager | world
//
// Writes scripts/.pdf-build/<product>.html, then (if `weasyprint` is on PATH)
// renders it to the served PDF:
//   - presenter → public/ACE-Presenter-Manual.pdf
//   - others    → public/manuals/<product>.pdf
//
// WeasyPrint needs pango/cairo (brew install weasyprint), and on macOS may need
// DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib. Vercel never runs this — the
// generated PDFs are committed. Design matches the ACE manual: dark cover with
// the app-icon + tagline, page-numbered Contents, dark section dividers, and
// light content pages, coloured by the product accent.
import { execSync } from "child_process";
import { writeFileSync, readdirSync, readFileSync, existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const CFG = {
  presenter: { name: "ACE Presenter", dir: "content/manual", out: "public/ACE-Presenter-Manual.pdf", a: "#C8102E", v: "#E8183A", ink: "#B00E28", tag1: "Present every", tag2: "word.", meta: "macOS &amp; Windows", lede: "Live worship and event presentation for macOS and Windows — it follows the service for you, advancing lyrics and scripture as they are sung and spoken." },
  schedule: { name: "ACE Schedule", dir: "content/manuals/schedule", out: "public/manuals/schedule.pdf", a: "#6941C6", v: "#8B68D6", ink: "#5A34B0", tag1: "Plan every", tag2: "day.", meta: "Web &amp; macOS", lede: "AI-powered scheduling for the web and macOS — photograph a syllabus or plan and it builds your week, then guides you through running each day." },
  "editors-notes": { name: "ACE Editors' Notes", dir: "content/manuals/editors-notes", out: "public/manuals/editors-notes.pdf", a: "#B07C2A", v: "#CFA04D", ink: "#8A5E17", tag1: "Note every", tag2: "frame.", meta: "macOS · DaVinci Resolve", lede: "Timecoded notes for DaVinci Resolve on macOS — every timecode you type is a clickable link that jumps the playhead to the exact frame." },
  manager: { name: "ACE Manager", dir: "content/manuals/manager", out: "public/manuals/manager.pdf", a: "#0A7B52", v: "#3DAA80", ink: "#076043", tag1: "Run every", tag2: "team.", meta: "Web", lede: "The AI-powered command layer for your organisation — members, departments, rotas, giving, events, and communication in one place." },
  world: { name: "ACE World", dir: "content/manuals/world", out: "public/manuals/world.pdf", a: "#0884A8", v: "#3AAEC8", ink: "#066885", tag1: "Gather every", tag2: "room.", meta: "Web · Desktop · VR", lede: "A 3D virtual venue where your audience joins as avatars, watches your live feed together, and hears each other in spatial voice." },
};

const key = process.argv[2];
const c = CFG[key];
if (!c) { console.error("usage: node scripts/build-manual-pdf.mjs <presenter|schedule|editors-notes|manager|world>"); process.exit(1); }
const dir = resolve(root, c.dir);
if (!existsSync(dir)) { console.error("no content dir", dir); process.exit(1); }

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const h1of = (p) => { const m = readFileSync(p, "utf8").match(/^#\s+(.+?)\s*$/m); return m ? m[1].replace(/[*_`]/g, "").trim() : ""; };
function meta(fn) {
  const title = h1of(resolve(dir, fn)) || fn.replace(/\.md$/, "");
  if (/^readme\.md$/i.test(fn)) return { order: -1, num: "", eye: "Overview", title };
  const n = fn.match(/^(\d{1,2})[-.]/); if (n) { const k = parseInt(n[1], 10); return { order: k, num: String(k).padStart(2, "0"), eye: `Section ${String(k).padStart(2, "0")}`, title }; }
  const a = fn.match(/^appendix[-_]?([a-z])/i); if (a) return { order: 1000 + a[1].toLowerCase().charCodeAt(0), num: a[1].toUpperCase(), eye: `Appendix ${a[1].toUpperCase()}`, title };
  return { order: 500, num: "", eye: title, title };
}
const anchor = (fn) => "sec-" + fn.replace(/\.md$/, "");
const iconTile = (sz) => `<svg width="${sz}" height="${sz}" viewBox="0 0 100 100"><rect width="100" height="100" rx="24" fill="#141414"/><rect x="16" y="16" width="42" height="42" rx="12" fill="${c.a}"/><rect x="46" y="46" width="42" height="42" rx="12" fill="#fff"/></svg>`;
const markSq = (sz) => `<svg width="${sz}" height="${sz}" viewBox="0 0 60 60"><rect x="2" y="2" width="56" height="56" rx="16" fill="${c.a}"/></svg>`;

const entries = readdirSync(dir).filter((f) => f.endsWith(".md")).map((fn) => ({ fn, ...meta(fn) })).sort((x, y) => x.order - y.order);
let toc = "", bodies = "";
for (const e of entries) {
  let frag = execSync(`pandoc --from gfm --to html5 "${resolve(dir, e.fn)}"`, { encoding: "utf8", maxBuffer: 1e7 });
  frag = frag.replace(/href="([0-9a-zA-Z-]+)\.md(#[^"]*)?"/g, (_m, b) => `href="#sec-${b}"`);
  if (/^readme\.md$/i.test(e.fn)) frag = frag.replace(/<h2[^>]*>(Table of contents|Contents)<\/h2>[\s\S]*?<\/ul>/i, "");
  const pm = frag.match(/<p>([\s\S]*?)<\/p>/i);
  const desc = pm ? pm[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 150) : "";
  frag = frag.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, "");
  const label = e.num ? e.num + " · " : "";
  toc += `<a class="toc-row" href="#${anchor(e.fn)}"><span class="toc-num">${e.num || "00"}</span><span class="toc-title">${esc(e.title)}</span></a>\n`;
  bodies += `<section class="divider" id="${anchor(e.fn)}"><div class="dv-eyebrow">${e.eye}</div><h1 class="dv-title">${esc(e.title)}</h1>${desc ? `<p class="dv-desc">${esc(desc)}${desc.length >= 150 ? "…" : ""}</p>` : ""}<div class="dv-mark">${markSq(56)}</div></section>
<section class="doc"><div class="doc-head">${label}${esc(e.title)}</div>${frag}</section>`;
}

const badges = [["(both)", "both", "both"], ["(macOS only)", "mac", "macOS only"], ["(Windows: not yet available)", "winno", "Windows — not yet"], ["(build-dependent)", "build", "build-dependent"], ["(Windows only)", "win", "Windows only"], ["(coming soon)", "soon", "coming soon"], ["(in development)", "dev", "in development"], ["(preview — verified)", "ok", "preview · verified"], ["(preview)", "preview", "preview"], ["(planned)", "planned", "planned"], ["(beta)", "beta", "beta"], ["(early access)", "early", "early access"], ["(Pro)", "pro", "Pro"]];
for (const [n, cls, t] of badges) bodies = bodies.split(n).join(`<span class="badge b-${cls}">${t}</span>`);

const css = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500;600&display=swap');
@page { size: A4; margin: 20mm 17mm 16mm; @bottom-left { content: "${c.name} · User Manual"; font-family:"Geist Mono",monospace; font-size:7.5pt; color:#9a9a9a; letter-spacing:.04em; } @bottom-right { content: counter(page); font-family:"Geist Mono",monospace; font-size:8pt; color:#9a9a9a; } }
@page cover { margin:0; background:#0F0F0F; @bottom-left{content:none} @bottom-right{content:none} }
@page divider { margin:0; background:#0F0F0F; @bottom-left{content:none} @bottom-right{content:none} }
@page contents { @bottom-left{content:none} }
* { box-sizing:border-box; }
html { font-family:"Geist",-apple-system,"Helvetica Neue",Arial,sans-serif; color:#1A1719; font-size:10.5pt; line-height:1.55; }
body { margin:0; }
h1,h2,h3,h4 { font-family:"Geist",sans-serif; font-weight:700; letter-spacing:-.015em; color:#12100F; }
p,li { color:#26221F; } strong { font-weight:600; color:#12100F; }
a { color:${c.ink}; text-decoration:none; }
code { font-family:"Geist Mono",monospace; font-size:.84em; background:#F2F1F4; color:${c.ink}; padding:.08em .36em; border-radius:4px; border:1px solid #E6E4EA; }
.cover { page:cover; background:#0F0F0F; color:#fff; height:297mm; padding:34mm 26mm; display:flex; flex-direction:column; page-break-after:always; }
.cover-top { flex:1; }
.cover .eyebrow { font-family:"Geist Mono",monospace; font-size:10pt; letter-spacing:.32em; text-transform:uppercase; color:${c.v}; margin:26mm 0 6mm; }
.cover h1 { font-family:"Geist",sans-serif; font-weight:800; font-size:52pt; line-height:1.0; color:#fff; margin:0; letter-spacing:-.02em; }
.cover h1 .dot { color:${c.v}; }
.cover .lede { font-size:13pt; line-height:1.5; color:#B7B4B2; max-width:120mm; margin:9mm 0 0; }
.cover-rule { border:none; border-top:1px solid rgba(255,255,255,.16); margin:11mm 0 6mm; }
.cover-foot { display:flex; justify-content:space-between; align-items:flex-end; }
.cover .tag { font-family:"Geist",sans-serif; font-weight:700; font-size:17pt; color:#fff; }
.cover .tag .w { color:${c.v}; }
.cover .meta { font-family:"Geist Mono",monospace; font-size:8pt; line-height:1.9; color:#7C7876; text-align:right; }
.cover .meta b { color:#CFCBC9; font-weight:500; }
.contents { page:contents; padding-top:4mm; }
.contents .c-head { display:flex; align-items:center; gap:3mm; border-bottom:1px solid #E7E0DF; padding-bottom:3mm; }
.contents .c-head span { font-family:"Geist",sans-serif; font-weight:600; font-size:11pt; }
.contents h2 { font-size:30pt; margin:8mm 0 2mm; border-bottom:2px solid #12100F; padding-bottom:3mm; }
.toc-row { display:flex; align-items:baseline; gap:5mm; padding:2.4mm 0; border-bottom:1px solid #F0ECEB; color:#26221F; }
.toc-num { font-family:"Geist Mono",monospace; font-size:8pt; color:${c.ink}; width:9mm; flex:none; }
.toc-title { flex:1; font-size:11pt; }
.toc-row::after { content: leader('.') target-counter(attr(href url), page); font-family:"Geist Mono",monospace; font-size:8.5pt; color:#8a8a8a; }
.divider { page:divider; background:#0F0F0F; color:#fff; height:297mm; padding:40mm 26mm; position:relative; page-break-before:always; page-break-after:always; }
.dv-eyebrow { font-family:"Geist Mono",monospace; font-size:10pt; letter-spacing:.3em; text-transform:uppercase; color:${c.v}; margin-top:78mm; }
.dv-title { font-family:"Geist",sans-serif; font-weight:800; font-size:44pt; line-height:1.02; color:#fff; margin:6mm 0 0; letter-spacing:-.02em; }
.dv-desc { font-size:12.5pt; color:#A9A5A3; margin:7mm 0 0; max-width:120mm; }
.dv-mark { position:absolute; left:26mm; bottom:30mm; }
.doc { page-break-before:always; }
.doc-head { font-family:"Geist",sans-serif; font-weight:700; font-size:21pt; letter-spacing:-.02em; color:#12100F; border-bottom:2px solid #12100F; padding-bottom:3.5mm; margin:0 0 6mm; }
.doc h2 { font-size:15.5pt; margin:8mm 0 2.5mm; }
.doc h3 { font-size:12pt; margin:6mm 0 1.5mm; padding-left:6mm; position:relative; }
.doc h3::before { content:""; position:absolute; left:0; top:2.2mm; width:3mm; height:3mm; background:${c.a}; border-radius:1px; }
.doc h4 { font-size:10.5pt; color:#6E6567; margin:5mm 0 1mm; }
.doc p { margin:2mm 0; } .doc ul,.doc ol { padding-left:6mm; margin:2mm 0; } .doc li { margin:1mm 0; } .doc li::marker { color:${c.a}; }
blockquote { margin:3.5mm 0; padding:3mm 5mm; background:${c.a}14; border-left:2.5px solid ${c.a}; border-radius:0 2mm 2mm 0; }
blockquote strong { color:${c.ink}; }
hr { border:none; border-top:1px solid #E7E0DF; margin:6mm 0; }
table { border-collapse:collapse; width:100%; font-size:8.6pt; margin:3.5mm 0; border:1px solid #E7E0DF; }
th,td { text-align:left; padding:2mm 3mm; border-bottom:1px solid #EFEAE9; vertical-align:top; }
thead th { background:#F6F2F1; font-family:"Geist Mono",monospace; font-size:7.2pt; letter-spacing:.05em; text-transform:uppercase; color:#6E6567; font-weight:500; }
tbody tr:last-child td { border-bottom:none; } td code { white-space:nowrap; }
.badge { display:inline-block; font-family:"Geist Mono",monospace; font-size:7.4pt; font-weight:500; padding:.3mm 2mm; border-radius:3mm; white-space:nowrap; border:1px solid; }
.b-both { color:#1B7F52; background:#E9F5EE; border-color:#BFE3CE; } .b-ok { color:#1B7F52; background:#E9F5EE; border-color:#BFE3CE; }
.b-mac { color:#2563A6; background:#E9F1FA; border-color:#C4DBF1; } .b-winno { color:#9A6212; background:#FaF0DD; border-color:#EAD3A2; }
.b-build { color:#4A5566; background:#EEF0F3; border-color:#D5DAE1; } .b-win { color:#B0532A; background:#FaEEE6; border-color:#EDD0BE; }
.b-soon { color:#9A6212; background:#FaF0DD; border-color:#EAD3A2; } .b-dev { color:#4A5566; background:#EEF0F3; border-color:#D5DAE1; }
.b-preview { color:#2563A6; background:#E9F1FA; border-color:#C4DBF1; } .b-planned { color:#6E6567; background:#F1EEED; border-color:#E0D9D8; }
.b-beta { color:#6D3FB0; background:#F1EAFB; border-color:#DDCBF3; } .b-early { color:#0A7B52; background:#E7F4EE; border-color:#BFE3D2; } .b-pro { color:#6D3FB0; background:#F1EAFB; border-color:#DDCBF3; }
h2,h3,.doc-head { page-break-after:avoid; } tr,blockquote,h1,h2,h3,li { page-break-inside:avoid; }
`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(c.name)} — User Manual</title><style>${css}</style></head>
<body>
<section class="cover"><div class="cover-top">${iconTile(88)}<div class="eyebrow">User Manual</div><h1>${esc(c.name)}<span class="dot">.</span></h1><p class="lede">${c.lede}</p></div>
<hr class="cover-rule"><div class="cover-foot"><div class="tag">${c.tag1} <span class="w">${c.tag2}</span></div><div class="meta"><b>${c.meta}</b><br>${entries.filter((e) => e.order >= 0 && e.order < 1000).length} sections<br>ace-presenter.app</div></div></section>
<section class="contents"><div class="c-head">${iconTile(20)}<span>${esc(c.name)}</span></div><h2>Contents</h2>${toc}</section>
${bodies}
</body></html>`;

const buildDir = resolve(root, "scripts/.pdf-build");
mkdirSync(buildDir, { recursive: true });
const htmlPath = resolve(buildDir, `${key}.html`);
writeFileSync(htmlPath, html);
console.log(`wrote ${htmlPath} (${entries.length} sections)`);

// Render with WeasyPrint if available.
try {
  const outPath = resolve(root, c.out);
  mkdirSync(dirname(outPath), { recursive: true });
  execSync(`weasyprint "${htmlPath}" "${outPath}"`, { stdio: "ignore" });
  console.log(`rendered ${c.out}`);
} catch {
  console.log(`(weasyprint not run — install it, then: weasyprint ${htmlPath} ${c.out})`);
}
