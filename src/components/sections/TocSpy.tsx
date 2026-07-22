"use client";

import { useEffect, useState } from "react";

/**
 * TocSpy — sticky table-of-contents with scroll-spy highlighting.
 *
 * Watches the sections referenced by `items` with one IntersectionObserver;
 * the entry nearest the top of the viewport wins. Falls back gracefully:
 * with no JS the links still work as plain anchors.
 */
export default function TocSpy({
  items,
  label = "On this page",
}: {
  items: { id: string; label: string }[];
  label?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        // highlight the first TOC entry currently on screen
        const first = items.find((i) => visible.has(i.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="sticky top-24 text-sm">
      <div className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#888]">
        {label}
      </div>
      <ul className="space-y-2 border-l border-[#1F1F1F]">
        {items.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`-ml-px block border-l pl-4 transition ${
                  on
                    ? "border-[#C8102E] font-semibold text-white"
                    : "border-transparent text-[#C4C4C4] hover:text-white"
                }`}
              >
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
