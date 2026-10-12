import { ScrollReveal } from "@/components/motion";
import {
  PRESENTER_LIMITS,
  PRESENTER_FREE,
  PRESENTER_PRO,
  PRESENTER_VENUE,
  type PlanGroup,
} from "@/lib/presenterPlans";

// ACE Presenter 3.0 — every function, plan by plan. Generated data
// (scripts/gen-presenter-plans.py from the apps' own docs/V3_PLANS.md), so
// this page and the apps' plan locks can't disagree. The apps' Upgrade
// windows link here ("Compare every feature").

function Column({ title, lead, groups }: { title: string; lead: string; groups: PlanGroup[] }) {
  return (
    <div className="rounded-2xl border border-[#1F1F1F] bg-[#0D0D0D] p-6">
      <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-1">{title}</div>
      <p className="text-sm text-[#888] mb-5">{lead}</p>
      {groups.map((g) => (
        <div key={g.group} className="mb-5">
          <div className="text-xs font-semibold text-white mb-2">{g.group}</div>
          <ul className="space-y-1.5">
            {g.items.map((i) => (
              <li key={i.name} className="text-sm text-[#C4C4C4] leading-snug">
                <span className="text-[#E8183A] mr-1.5">✓</span>
                {i.name}
                {i.macOnly && (
                  <span className="ml-1.5 rounded bg-[#1F1F1F] px-1.5 py-0.5 text-[10px] text-[#888] align-middle">Mac</span>
                )}
                {i.limit && <span className="block pl-5 text-xs text-[#888]">{i.limit}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function PresenterPlanComparison() {
  return (
    <section id="compare" data-accent-rgb="200,16,46" className="px-6 sm:px-10 py-24 border-b border-[#1A1A1A]">
      <ScrollReveal className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">ACE Presenter 3.0</div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Every feature, plan by plan</h2>
          <p className="text-[#C4C4C4] max-w-2xl mx-auto">
            Free covers a service a week. Pro covers every day. Venue adds what larger teams and productions use.
            If you used ACE before 3.0, you keep everything you have today for six months — and a plan never stops
            anything in the middle of a service.
          </p>
        </div>

        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-[#888]">
                <th className="py-3 pr-4 font-medium">Limits</th>
                <th className="py-3 px-4 font-medium text-white">Free</th>
                <th className="py-3 px-4 font-medium text-white">Pro</th>
                <th className="py-3 pl-4 font-medium text-white">Venue</th>
              </tr>
            </thead>
            <tbody>
              {PRESENTER_LIMITS.map((r) => (
                <tr key={r.where} className="border-t border-[#1A1A1A] align-top">
                  <td className="py-3 pr-4 text-[#C4C4C4]">{r.where}</td>
                  <td className="py-3 px-4 text-[#D4D4D4]">{r.free}</td>
                  <td className="py-3 px-4 text-[#D4D4D4]">{r.pro}</td>
                  <td className="py-3 pl-4 text-[#D4D4D4]">{r.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Column title="Free" lead="On every plan." groups={PRESENTER_FREE} />
          <Column title="Pro" lead="Everything in Free, and:" groups={PRESENTER_PRO} />
          <Column title="Venue" lead="Everything in Pro, and:" groups={PRESENTER_VENUE} />
        </div>
        <p className="mt-6 text-xs text-[#666] text-center">
          <span className="rounded bg-[#1F1F1F] px-1.5 py-0.5 text-[10px] text-[#888] mr-1">Mac</span>
          on the Mac today; coming to Windows.
        </p>
      </ScrollReveal>
    </section>
  );
}
