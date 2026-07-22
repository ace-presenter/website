import type { ReactNode } from "react";
import { SpotlightCard, ScrollStagger, ScrollItem } from "@/components/motion";

export interface BentoItem {
  title: string;
  desc: ReactNode;
  /** Optional visual slot (equalizer bars, terminal line, mini-UI, …). */
  visual?: ReactNode;
  /** "wide" spans 2 columns on lg. */
  span?: "wide" | "normal";
}

/**
 * FeatureBento — asymmetric glass feature grid. Each tile is a SpotlightCard
 * (cursor-follow accent glow) revealed in a scroll cascade.
 */
export default function FeatureBento({
  items,
  className = "",
}: {
  items: BentoItem[];
  className?: string;
}) {
  return (
    <ScrollStagger
      className={`mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {items.map((f) => (
        <ScrollItem
          key={f.title}
          className={f.span === "wide" ? "lg:col-span-2" : ""}
        >
          <SpotlightCard className="glass-card h-full rounded-2xl">
            <div className="flex h-full flex-col p-6">
              {f.visual && <div className="mb-5">{f.visual}</div>}
              <h3 className="text-lg font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A8A8A8]">{f.desc}</p>
            </div>
          </SpotlightCard>
        </ScrollItem>
      ))}
    </ScrollStagger>
  );
}
