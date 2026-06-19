import Link from "next/link";
import { products } from "@/lib/brand";
import { ScrollReveal } from "@/components/motion";

/**
 * Products — the suite as a calm editorial list, not a bento grid.
 * Hairline-divided rows, generous spacing, one accent. Each product keeps
 * only a small identity dot. No glass, no glow, no per-card colour flood.
 */

type Row = {
  pkey: keyof typeof products;
  name: string;
  desc: string;
  status: "Available" | "In development";
  href: string;
};

const ROWS: Row[] = [
  {
    pkey: "presenter",
    name: "Presenter",
    desc: "Listens to the room and fires the next slide in under a second. Native macOS, on-device.",
    status: "Available",
    href: "/presenter",
  },
  {
    pkey: "schedule",
    name: "Schedule",
    desc: "Photograph a syllabus, get a task list back. Daily guidance, synced across web and desktop.",
    status: "Available",
    href: "/schedule",
  },
  {
    pkey: "editorsNotes",
    name: "Editors' Notes",
    desc: "Every timecode in your notes jumps DaVinci Resolve to that exact frame.",
    status: "Available",
    href: "/editors-notes",
  },
  {
    pkey: "manager",
    name: "Manager",
    desc: "Members, departments, events, and campaigns for an organization. Multi-tenant, role-based.",
    status: "In development",
    href: "/manager",
  },
  {
    pkey: "world",
    name: "World",
    desc: "A shared 3D space for live audiences, tied to your stage feed.",
    status: "In development",
    href: "/world",
  },
];

export default function Products() {
  return (
    <section className="px-6 sm:px-10 py-28 sm:py-36 border-t border-[#1A1A1A]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#888] mb-5">
            The suite
          </p>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-2xl">
            Five tools. One account.
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-16 border-t border-[#1A1A1A]">
          {ROWS.map((r, i) => (
            <Link
              key={r.pkey}
              href={r.href}
              className="group grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-baseline gap-x-8 gap-y-2 border-b border-[#1A1A1A] py-8 sm:py-10 transition-colors hover:bg-white/[0.015]"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-[#555] tabular-nums">
                  0{i + 1}
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: products[r.pkey].accent }}
                />
                <h3 className="text-xl sm:text-2xl font-bold text-white">{r.name}</h3>
              </div>

              <p className="text-[#A8A8A8] text-base leading-relaxed max-w-xl">
                {r.desc}
              </p>

              <div className="flex items-center gap-5 justify-self-start sm:justify-self-end">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#666] whitespace-nowrap">
                  {r.status}
                </span>
                <span className="text-[#666] transition-all group-hover:text-[#E8183A] group-hover:translate-x-0.5">
                  →
                </span>
              </div>
            </Link>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
