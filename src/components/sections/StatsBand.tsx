import { Counter, ScrollStagger, ScrollItem } from "@/components/motion";

export interface Stat {
  /** Animated count-up; use `text` instead for values like "<1s". */
  num?: { to: number; suffix?: string; prefix?: string; decimals?: number };
  text?: string;
  label: string;
}

/**
 * StatsBand — full-bleed metrics strip between hairlines. Numbers count up
 * (Counter, reduced-motion safe); non-numeric values render as plain text.
 */
export default function StatsBand({
  stats,
  className = "",
}: {
  stats: Stat[];
  className?: string;
}) {
  return (
    <section className={`border-y border-[#1A1A1A] px-6 py-14 sm:px-10 ${className}`}>
      <ScrollStagger className="mx-auto grid max-w-5xl grid-cols-2 gap-10 sm:grid-cols-4">
        {stats.map((s) => (
          <ScrollItem key={s.label} className="text-center">
            <div className="text-4xl font-bold tracking-tight text-[var(--accent-vivid,#E8183A)] sm:text-5xl">
              {s.num ? (
                <Counter
                  to={s.num.to}
                  suffix={s.num.suffix}
                  prefix={s.num.prefix}
                  decimals={s.num.decimals}
                />
              ) : (
                s.text
              )}
            </div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#888]">
              {s.label}
            </div>
          </ScrollItem>
        ))}
      </ScrollStagger>
    </section>
  );
}
