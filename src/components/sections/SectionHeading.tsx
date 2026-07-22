import type { ReactNode } from "react";

/**
 * AccentItalic — the ACE typographic signature: one Instrument Serif italic
 * word in the active product accent. Use at most once per headline.
 */
export function AccentItalic({ children }: { children: ReactNode }) {
  return (
    <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[var(--accent-vivid,#E8183A)]">
      {children}
    </span>
  );
}

/**
 * SectionHeading — mono eyebrow + big headline + optional lede.
 * Standardizes the pattern previously hand-written per section.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : "text-left"} max-w-3xl ${className}`}>
      {eyebrow && (
        <div
          className={`mb-4 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          <span className="h-px w-8 bg-[var(--accent,#C8102E)]" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#888]">
            {eyebrow}
          </span>
          {centered && <span className="h-px w-8 bg-[var(--accent,#C8102E)]" aria-hidden />}
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {lede && (
        <p className={`mt-5 text-base leading-relaxed text-[#B4B4B4] sm:text-lg ${centered ? "mx-auto" : ""} max-w-2xl`}>
          {lede}
        </p>
      )}
    </div>
  );
}
