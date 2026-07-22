import Link from "next/link";
import Image from "next/image";
import FooterSignup from "@/components/sections/FooterSignup";

/**
 * ACE Suite — global footer.
 *
 * Multi-column: brand block + Products / Presenter for… / Resources / Company,
 * then a bottom row with the updates signup and copyright. A faint crimson
 * horizon arc rises behind the bottom edge so every page ends on the brand
 * motif. Server component (signup input is the only client island).
 */

const COLUMNS: {
  title: string;
  links: { href: string; label: string; soon?: boolean; external?: boolean }[];
}[] = [
  {
    title: "Products",
    links: [
      { href: "/presenter", label: "Presenter" },
      { href: "/schedule", label: "Schedule" },
      { href: "/editors-notes", label: "Editors' Notes" },
      { href: "/manager", label: "Manager", soon: true },
      { href: "/world", label: "World", soon: true },
    ],
  },
  {
    title: "Presenter for…",
    links: [
      { href: "/presenter/worship", label: "Worship" },
      { href: "/presenter/conferences", label: "Conferences" },
      { href: "/presenter/lectures", label: "Lectures" },
      { href: "/presenter/theater", label: "Theater" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/learn", label: "Learn" },
      { href: "/support", label: "Support" },
      { href: "/download", label: "Download" },
      { href: "/pricing", label: "Pricing" },
      { href: "/presenter#whats-new", label: "What's New" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/waitlist", label: "Waitlist" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "mailto:hello@ace-presenter.app", label: "hello@ace-presenter.app", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#1A1A1A] px-6 sm:px-10 pt-14 pb-10 text-sm text-[#C4C4C4]">
      {/* Faint horizon arc behind the bottom edge — pages end on the motif. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-55%] w-[140%] h-[60%]"
        style={{
          background:
            "radial-gradient(ellipse 50% 80% at 50% 100%, rgba(200,16,46,0.14), rgba(200,16,46,0.04) 55%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand block */}
          <div className="col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={28} height={28} className="rounded-md" />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-white">ACE</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#888]">
                  Agentic Cue Experience
                </span>
              </div>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-[#888]">
              The suite that listens to the room — live presentation, planning,
              and post-production tools built to work together.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#666]">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2 text-xs">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a href={l.href} className="transition hover:text-white">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="inline-flex items-center gap-1.5 transition hover:text-white">
                        {l.label}
                        {l.soon && (
                          <span className="rounded-full border border-white/15 px-1.5 py-px font-mono text-[8px] uppercase tracking-[0.18em] text-[#888]">
                            Soon
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col gap-6 border-t border-[#1A1A1A] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <FooterSignup />
          <p className="text-[11px] text-[#666]">
            © 2026 Rainbow Kreativ · Made for the people who run the room.
          </p>
        </div>
      </div>
    </footer>
  );
}
