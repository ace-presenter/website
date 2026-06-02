"use client";

import Link from "next/link";
import { useState } from "react";
import { products, type ProductKey } from "@/lib/brand";

const SERIF = "font-[family-name:var(--font-instrument-serif)] italic font-normal";

type Item = {
  key: ProductKey;
  index: string;
  name: string;
  status: "Available now" | "In development";
  href: string;
  tagline: string;
  stat: string;
  cta?: { label: string; href: string };
};

const ITEMS: Item[] = [
  {
    key: "presenter",
    index: "01",
    name: "Presenter",
    status: "Available now",
    href: "/presenter",
    tagline:
      "Audio in, slides out. Sub-second cue detection for worship, conferences, lectures, and theater — on-device by default.",
    stat: "< 1s latency",
    cta: { label: "Download for Mac", href: "/api/download?platform=mac-arm64" },
  },
  {
    key: "schedule",
    index: "02",
    name: "Schedule",
    status: "Available now",
    href: "/schedule",
    tagline:
      "AI routine and task manager. Photograph a syllabus, extract tasks in one step. Daily guidance, cloud-synced.",
    stat: "Web + desktop",
    cta: { label: "Open Schedule Manager", href: "https://app.ace-presenter.app/auth" },
  },
  {
    key: "editorsNotes",
    index: "03",
    name: "Editors' Notes",
    status: "Available now",
    href: "/editors-notes",
    tagline:
      "Qt6 macOS app wired into DaVinci Resolve. Every timecode in your notes jumps Resolve to that frame.",
    stat: "DaVinci Resolve",
    cta: {
      label: "Download for Mac",
      href: "/api/download?product=editors-notes&platform=mac-arm64",
    },
  },
  {
    key: "manager",
    index: "04",
    name: "Manager",
    status: "In development",
    href: "/manager",
    tagline:
      "Members, departments, events, tasks, and campaigns. Multi-tenant, role-based, with AI actions built in.",
    stat: "Churches & ministries",
  },
  {
    key: "world",
    index: "05",
    name: "World",
    status: "In development",
    href: "/world",
    tagline:
      "A 3D audience space for live events. Babylon.js on desktop, WebXR on the web, tied to your stage feed.",
    stat: "Electron + WebXR",
  },
];

export default function SuiteIndex() {
  const [active, setActive] = useState(0);
  const a = ITEMS[active];
  const acc = products[a.key];

  return (
    <section className="px-6 sm:px-10 py-24 border-b border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
          The ACE Suite
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-12 text-white max-w-2xl">
          The whole suite,{" "}
          <span className={`${SERIF} text-[#E8183A]`}>at a glance</span>
        </h2>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-start">
          {/* Left: hover-reveal list */}
          <ul className="border-b border-[#1A1A1A]">
            {ITEMS.map((it, i) => {
              const p = products[it.key];
              const on = i === active;
              return (
                <li key={it.key}>
                  <Link
                    href={it.href}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-center gap-4 border-t border-[#1A1A1A] py-5 sm:py-6"
                  >
                    <span className="text-xs font-mono tabular-nums text-[#555] w-7 shrink-0">
                      {it.index}
                    </span>
                    <span
                      className="text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-200"
                      style={{ color: on ? "#FFFFFF" : "#7A7A7A" }}
                    >
                      {it.name}
                    </span>
                    <span
                      className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] uppercase tracking-[0.18em] font-bold transition-colors duration-200"
                      style={{
                        color: on ? p.accentVivid : "#666",
                        borderColor: on ? p.accent : "#262626",
                      }}
                    >
                      <span
                        className="w-1 h-1 rounded-full"
                        style={{ backgroundColor: p.accent, opacity: it.status === "Available now" ? 1 : 0.5 }}
                      />
                      {it.status}
                    </span>
                    <span
                      aria-hidden
                      className="ml-auto text-xl transition-all duration-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus:opacity-100 group-focus:translate-x-0"
                      style={{ color: p.accentVivid }}
                    >
                      &rarr;
                    </span>
                  </Link>
                  {/* Mobile inline detail (no hover on touch) */}
                  <p className="lg:hidden -mt-2 pb-5 pl-11 text-sm text-[#888] leading-relaxed">
                    {it.tagline}
                  </p>
                </li>
              );
            })}
          </ul>

          {/* Right: live preview that swaps on hover (desktop only) */}
          <div className="hidden lg:block sticky top-24">
            <div className="relative rounded-2xl border border-[#222] overflow-hidden bg-[#0D0D0D]">
              <div
                aria-hidden
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(90% 70% at 30% 20%, rgba(${acc.rgb},0.22), rgba(${acc.rgb},0) 70%)`,
                }}
              />
              <div key={active} className="ace-reveal relative p-7">
                <div
                  className="rounded-xl border border-[#222] overflow-hidden mb-6"
                  style={{
                    background: `linear-gradient(160deg, rgba(${acc.rgb},0.14), rgba(20,20,20,0.6))`,
                  }}
                >
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <span className="ml-3 text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
                      ACE &middot; {a.name}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col gap-3">
                    <div
                      className="text-2xl font-bold tracking-tight"
                      style={{ color: acc.accentVivid }}
                    >
                      {a.name}
                    </div>
                    <div className="h-2 rounded-full bg-white/10 w-3/4" />
                    <div className="h-2 rounded-full bg-white/10 w-1/2" />
                    <div className="mt-3 flex gap-1.5 items-end h-14">
                      {Array.from({ length: 11 }).map((_, b) => (
                        <span
                          key={b}
                          className="flex-1 rounded-sm"
                          style={{
                            height: `${30 + Math.abs(Math.sin(b * 1.3 + active)) * 60}%`,
                            backgroundColor: `rgba(${acc.rgb},${0.3 + (b % 3) * 0.2})`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[#C4C4C4] text-sm leading-relaxed">{a.tagline}</p>
                <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#888] font-semibold">
                  {a.stat}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  {a.cta && (
                    <a
                      href={a.cta.href}
                      className="px-5 py-2.5 rounded-full text-white font-bold text-xs transition hover:scale-[1.03] active:scale-100"
                      style={{ backgroundColor: acc.accent }}
                    >
                      {a.cta.label}
                    </a>
                  )}
                  <Link
                    href={a.href}
                    className="px-5 py-2.5 rounded-full bg-[#141414] hover:bg-[#1F1F1F] text-[#C4C4C4] font-semibold text-xs transition border border-[#2A2A2A]"
                  >
                    Learn more &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
