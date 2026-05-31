"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Slide = {
  src: string;
  alt: string;
  caption: string;
  description: string;
  width: number;
  height: number;
};

/**
 * Lightweight, dependency-free screenshot carousel for the Editors' Notes page.
 * Horizontal slide track + prev/next controls, clickable dots, and touch swipe.
 * Amber accent (#B07C2A / #CFA04D) per ACE-SUITE-BRAND.md.
 */
export default function ScreenshotCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);

  const go = (i: number) => setIndex((i + slides.length) % slides.length);
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  // Gentle autoplay; pauses on hover/focus and respects reduced-motion.
  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(
      () => setIndex((p) => (p + 1) % slides.length),
      6000,
    );
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (dx > 50) prev();
    else if (dx < -50) next();
    startX.current = null;
  };

  const active = slides[index];

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carousel"
      aria-label="ACE Editors' Notes screenshots"
    >
      {/* Viewport */}
      <div
        className="relative overflow-hidden rounded-2xl border border-[#222] bg-[#111] aspect-[1823/926] touch-pan-y select-none shadow-[0_30px_80px_-20px_rgba(176,124,42,0.25)]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={s.src}
              className="relative w-full h-full shrink-0"
              aria-hidden={i !== index ? "true" : "false"}
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.height}
                priority={i === 0}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Prev / Next */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous screenshot"
          className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-black/55 backdrop-blur border border-[#2A2A2A] text-white hover:border-[#B07C2A] hover:text-[#CFA04D] transition"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next screenshot"
          className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-black/55 backdrop-blur border border-[#2A2A2A] text-white hover:border-[#B07C2A] hover:text-[#CFA04D] transition"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>

        {/* Slide counter */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur border border-[#2A2A2A] text-[11px] font-[family-name:var(--font-geist-mono)] text-[#C4C4C4]">
          {index + 1} / {slides.length}
        </div>
      </div>

      {/* Caption */}
      <p className="mt-4 text-sm text-[#888] min-h-[2.5rem]">
        <span className="text-white font-medium">{active.caption}</span>
        {" — "}
        {active.description}
      </p>

      {/* Dots */}
      <div className="mt-3 flex items-center justify-center gap-2.5">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to ${s.caption}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-7 bg-[#B07C2A]" : "w-1.5 bg-[#3A3A3A] hover:bg-[#555]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
