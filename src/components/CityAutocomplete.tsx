"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CityAutocomplete — a free-text city field with type-ahead suggestions.
 *
 * A combobox, not a strict select: it always lets the user type any city
 * (onChange fires on every keystroke, so the form works even if the geocoder
 * is slow or down), and offers debounced suggestions from /api/geo/cities.
 * Keyboard: ↑/↓ to move, Enter to pick, Esc to dismiss.
 */

interface Suggestion {
  name: string;
  label: string;
}

export default function CityAutocomplete({
  value,
  onChange,
  placeholder = "City / Town",
  required,
  inputClassName = "",
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  inputClassName?: string;
  id?: string;
}) {
  const [items, setItems] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);
  const justPicked = useRef(false);

  // Debounced fetch on value change (unless the change came from a pick).
  useEffect(() => {
    if (justPicked.current) {
      justPicked.current = false;
      return;
    }
    const q = value.trim();
    if (q.length < 2) {
      setItems([]);
      setOpen(false);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/geo/cities?q=${encodeURIComponent(q)}`, { signal: ctrl.signal });
        if (!r.ok) return;
        const data = (await r.json()) as { cities: Suggestion[] };
        setItems(data.cities ?? []);
        setOpen((data.cities ?? []).length > 0);
        setActive(-1);
      } catch {
        /* fail soft — free text still works */
      }
    }, 250);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [value]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  function pick(s: Suggestion) {
    justPicked.current = true;
    onChange(s.name);
    setOpen(false);
    setActive(-1);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open || items.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + items.length) % items.length);
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      pick(items[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={boxRef} className="relative">
      <input
        id={id}
        type="text"
        required={required}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => items.length > 0 && setOpen(true)}
        onKeyDown={onKeyDown}
        className={inputClassName}
      />
      {open && items.length > 0 && (
        <ul
          role="listbox"
          className="glass-card absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-auto rounded-xl bg-[#141414] py-1 shadow-2xl"
        >
          {items.map((s, i) => (
            <li key={s.label} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(s)}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full flex-col items-start px-3.5 py-2 text-left transition ${
                  i === active ? "bg-white/[0.07]" : "hover:bg-white/[0.05]"
                }`}
              >
                <span className="text-sm text-white">{s.name}</span>
                <span className="text-[11px] text-[#888]">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
