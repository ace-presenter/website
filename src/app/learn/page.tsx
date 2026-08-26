import type { Metadata } from "next";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HorizonGlow from "@/components/hero/HorizonGlow";
import { ProductTheme } from "@/components/motion";
import { products, type ProductKey } from "@/lib/brand";

import presenterShot from "../../../public/presenter/stage.png";
import scheduleShot from "../../../public/schedule/welcome.webp";
import notesShot from "../../../public/editors-notes/screenshot-insert-timecode.png";
import managerShot from "../../../public/og/og-manager.png";
import worldShot from "../../../public/og/og-world.png";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Learn the ACE Suite — Presenter, Schedule, Editors' Notes, Manager, and World. What each product does, who it's for, and where to find its user manual.",
  alternates: { canonical: "/learn" },
};

type ProductEntry = {
  key: ProductKey;
  name: string;
  tagline: string;
  status: string;
  platform: string;
  body: string;
  features: string[];
  href: string;
  manualHref?: string;
  visual: StaticImageData;
  visualAlt: string;
};

const PRODUCTS: ProductEntry[] = [
  {
    key: "presenter",
    name: "Presenter",
    tagline: "Slides that follow the room.",
    status: "Shipping",
    platform: "macOS & Windows",
    body: "Live worship and event presentation that listens to the room. As the worship leader sings or the speaker reads, ACE Presenter recognises the moment and moves to the right lyric or verse — so the operator stays in control instead of chasing the service.",
    features: [
      "Auto-follow detection advances lyrics and scripture as they're sung and spoken — on-device or in the cloud.",
      "Songs, scripture, media, and announcements in one running order, with arrangements and service plans.",
      "A full theme editor, looks, lower-thirds, and a stage / confidence monitor.",
      "Multi-screen output with corner-pin keystone, colour grade, and per-layer control.",
      "Streaming, NDI, capture cards, ATEM control, and spatial audio for the whole room.",
      "Run the service from your phone — cues, live preview, and video transport over your network.",
    ],
    href: "/presenter",
    manualHref: "/presenter/manual",
    visual: presenterShot,
    visualAlt: "ACE Presenter stage output",
  },
  {
    key: "schedule",
    name: "Schedule",
    tagline: "Plan and run your day with AI routines.",
    status: "Shipping",
    platform: "Web & macOS",
    body: "Photograph a syllabus, planner, or whiteboard and ACE Schedule reads it into a working week — then guides you through actually running each day, from the first task to an end-of-day reflection.",
    features: [
      "AI schedule import — snap a photo of any plan and get tasks, times, and deadlines extracted for you.",
      "A daily dashboard laid out by time block and category, with streaks to keep you consistent.",
      "Projects and Kanban boards for bigger efforts, with milestones and progress tracking.",
      "Daily AI guidance to open the day and an end-of-day ceremony to close it.",
      "Progress analytics and exportable weekly reports.",
      "Cloud sync across web and desktop under one ACE account.",
    ],
    href: "/schedule",
    manualHref: "/schedule/manual",
    visual: scheduleShot,
    visualAlt: "ACE Schedule welcome screen",
  },
  {
    key: "editorsNotes",
    name: "Editors' Notes",
    tagline: "Timecoded notes inside DaVinci Resolve.",
    status: "Public beta",
    platform: "macOS",
    body: "A native note-taking app for video editors where every timecode you type becomes a clickable link that jumps Resolve's playhead to that exact frame — so your notes and your timeline are one surface.",
    features: [
      "Click a timecode to seek Resolve straight to that frame — no copy-paste, no app-switching.",
      "Insert the current playhead position with one click; import timeline markers with their colours and comments.",
      "Rich text, live timecode highlighting, instant search, and auto-save.",
      "Colour-code notes by department — VFX, Audio, Colour, Edit, Review.",
      "On-device AI polishes rough notes and transcribes voice memos — nothing leaves the machine.",
      "Local-first: an offline database, no account, built for locked-down edit suites.",
    ],
    href: "/editors-notes",
    manualHref: "/editors-notes/manual",
    visual: notesShot,
    visualAlt: "ACE Editors' Notes inserting a timecode",
  },
  {
    key: "manager",
    name: "Manager",
    tagline: "One dashboard for your whole organization.",
    status: "Early access",
    platform: "Web",
    body: "Where Presenter runs the service and Schedule runs your day, ACE Manager runs the organisation — members, departments, rotas, giving, events, and communication in one place, with an AI agent handling the routine work in the background.",
    features: [
      "A member and team directory with departments, roles, and engagement tracking.",
      "Volunteer rotas, attendance, events with ticketing, and children's check-in.",
      "Giving and donations with funds, pledges, and online payments.",
      "Multi-channel messaging — WhatsApp, SMS, email, Telegram, and Instagram.",
      "An autonomous AI agent that assigns tasks, follows up with members, and drafts reports.",
      "A member self-service portal, plus Planning Center, Google, Zoom, and Stripe connections.",
    ],
    href: "/manager",
    manualHref: "/manager/manual",
    visual: managerShot,
    visualAlt: "ACE Manager dashboard",
  },
  {
    key: "world",
    name: "World",
    tagline: "A shared 3D space for your audience.",
    status: "In development",
    platform: "Web, Desktop & VR",
    body: "A virtual venue that recreates your live event as a place. The audience enters as avatars, watches your program feed together on the in-world stage, hears each other in spatial voice, and a producer drives the room in real time — the same cueing language as Presenter.",
    features: [
      "Your live feed on an in-world stage, sub-second, from OBS, vMix, a camera, or Presenter.",
      "Spatial voice — attendee mics panned to their avatar and fading with distance.",
      "A producer console that fires scenes and cues — lighting, cameras, and screens — for everyone at once.",
      "Zero-install audience join by link in any browser, or step inside on a Meta Quest headset.",
      "Zones, live occupancy, and audio moderation for VIP areas and keynotes.",
      "Multi-tenant event worlds, metered against your licence — audiences just open a link.",
    ],
    href: "/world",
    manualHref: "/world/manual",
    visual: worldShot,
    visualAlt: "ACE World virtual venue",
  },
];

function ProductSection({ p, flip }: { p: ProductEntry; flip: boolean }) {
  const brand = products[p.key];
  return (
    <ProductTheme product={p.key}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div className={flip ? "lg:order-2" : ""}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: brand.accent, boxShadow: `0 0 12px ${brand.accent}` }}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#999]">
                {p.name}
              </span>
            </span>
            <span
              className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{
                color: brand.accentVivid,
                borderColor: `rgba(${brand.rgb},0.35)`,
                background: `rgba(${brand.rgb},0.10)`,
              }}
            >
              {p.status}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#777]">
              {p.platform}
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            {p.tagline}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#B4B4B4] sm:text-lg">
            {p.body}
          </p>
          <ul className="mt-7 grid gap-2.5">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-[#D4D4D4]">
                <span className="mt-0.5" style={{ color: brand.accentVivid }} aria-hidden>
                  ✓
                </span>
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={p.href}
              className="group inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3"
              style={{ color: brand.accentVivid }}
            >
              Explore {p.name} <span aria-hidden>→</span>
            </Link>
            {p.manualHref ? (
              <Link
                href={p.manualHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
              >
                Read the manual <span aria-hidden>→</span>
              </Link>
            ) : (
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#666]">
                User manual coming soon
              </span>
            )}
          </div>
        </div>

        {/* Visual */}
        <div className={flip ? "lg:order-1" : ""}>
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] blur-2xl"
              style={{
                background: `radial-gradient(60% 60% at 50% 45%, rgba(${brand.rgb},0.26), transparent 75%)`,
              }}
            />
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D] shadow-[0_32px_90px_-28px_rgba(0,0,0,0.8)]">
              <Image
                src={p.visual}
                alt={p.visualAlt}
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 560px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </ProductTheme>
  );
}

export default function Learn() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#1A1A1A] px-6 pb-20 pt-20 sm:px-10 sm:pt-24">
        <HorizonGlow strength={0.6} />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C8102E]" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#888]">
              Learn ACE
            </span>
            <span className="h-px w-8 bg-[#C8102E]" aria-hidden />
          </div>
          <h1 className="text-5xl font-bold leading-[1.03] tracking-tight text-white sm:text-6xl">
            One suite for the whole event.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#C4C4C4]">
            Five tools that share one account, one design, and one idea — AI that
            handles the busywork so you can run the moment. Plan the day, present
            the service, run the organisation, gather the room, and annotate the
            cut. Open a product to go deep, and find its user manual on its page.
          </p>
          <nav className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {PRODUCTS.map((p) => (
              <a
                key={p.key}
                href={`#${p.key}`}
                className="rounded-full border border-white/12 px-3.5 py-1.5 text-sm text-[#D4D4D4] transition hover:border-white/40 hover:text-white"
              >
                {p.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Product sections */}
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
        {PRODUCTS.map((p, i) => (
          <section
            key={p.key}
            id={p.key}
            className="scroll-mt-24 border-b border-[#161616] py-20 last:border-b-0 sm:py-24"
          >
            <ProductSection p={p} flip={i % 2 === 1} />
          </section>
        ))}
      </div>

      {/* Closing note */}
      <section className="border-t border-[#1A1A1A] px-6 py-16 text-center sm:px-10">
        <p className="mx-auto max-w-xl text-[#9A9A9A]">
          One ACE account works across every product. Start with the one you need
          today — the rest are there when you grow into them.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/pricing"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[#E8E8E8]"
          >
            See pricing
          </Link>
          <Link
            href="/support"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40"
          >
            Get support
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
