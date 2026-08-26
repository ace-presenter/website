"use client";

import { useEffect, useState } from "react";

export type ManualNavItem = { id: string; title: string; num: string };

// Sticky table-of-contents rail for the manual. Highlights the section in view
// and doubles as a slide-in drawer on small screens. The article itself is
// server-rendered; this only reads the DOM the server produced.
export default function ManualNav({
  items,
  label = "Contents",
}: {
  items: ManualNavItem[];
  label?: string;
}) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-12% 0px -80% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <>
      <button
        type="button"
        className="manual-menu"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        ☰ Contents
      </button>
      <nav className={"manual-nav" + (open ? " open" : "")} aria-label="Manual contents">
        <div className="manual-nav-title">{label}</div>
        {items.map((i) => (
          <a
            key={i.id}
            href={"#" + i.id}
            onClick={() => setOpen(false)}
            className={"manual-navlink" + (active === i.id ? " active" : "")}
          >
            <span className="manual-navnum">{i.num || "·"}</span>
            <span>{i.title}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
