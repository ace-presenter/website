import type { ReactNode } from "react";
import { Marquee } from "@/components/motion";

/**
 * LogoMarquee — the "runs with" compatibility ticker. Pass names (rendered as
 * quiet mono wordmarks) or arbitrary nodes.
 */
export default function LogoMarquee({
  label,
  items,
  className = "",
}: {
  label?: string;
  items: (string | ReactNode)[];
  className?: string;
}) {
  return (
    <section className={`px-0 py-12 ${className}`}>
      {label && (
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#666]">
          {label}
        </p>
      )}
      <Marquee speed={36}>
        {items.map((item, i) =>
          typeof item === "string" ? (
            <span
              key={i}
              className="whitespace-nowrap font-mono text-sm font-semibold uppercase tracking-[0.15em] text-[#555] transition hover:text-[#999]"
            >
              {item}
            </span>
          ) : (
            <span key={i}>{item}</span>
          )
        )}
      </Marquee>
    </section>
  );
}
