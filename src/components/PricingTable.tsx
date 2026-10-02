"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductTheme, ScrollReveal } from "@/components/motion";
import type { ProductKey } from "@/lib/brand";
import {
  PRICING,
  CONTACT_EMAIL,
  checkoutHref,
  clampSeats,
  seatRate,
  type Cadence,
  type Plan,
} from "@/lib/pricing";

function contactHref(product: string, plan: string) {
  const subject = encodeURIComponent(`ACE ${product} — ${plan}`);
  return `mailto:${CONTACT_EMAIL}?subject=${subject}`;
}

function PriceBlock({ plan, cadence }: { plan: Plan; cadence: Cadence }) {
  if (plan.kind === "free") {
    return (
      <div className="flex items-baseline gap-1.5">
        <span className="text-4xl font-bold text-white tracking-tight">Free</span>
        {plan.note && <span className="text-[#888] text-sm">{plan.note}</span>}
      </div>
    );
  }
  if (plan.kind === "oneTime") {
    return (
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-bold text-white tracking-tight">${plan.oneTimeUSD}</span>
          <span className="text-[#C4C4C4] text-sm">once</span>
        </div>
        {plan.note && <span className="mt-1 text-[11px] text-[#888]">{plan.note}</span>}
      </div>
    );
  }
  if (plan.kind === "custom") {
    return (
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-bold text-white tracking-tight">
            {plan.fromUSD ? `from $${plan.fromUSD}` : "Custom"}
          </span>
        </div>
        {plan.note && <span className="mt-1 text-[11px] text-[#888]">{plan.note}</span>}
      </div>
    );
  }
  // subscription
  const monthly = plan.monthlyUSD;
  const annual = plan.annualUSD;
  const showAnnual = cadence === "year" && annual != null;
  const amount = showAnnual ? annual : (monthly ?? annual);
  const unit = showAnnual ? "/ yr" : "/ mo";
  const perSeat = plan.perSeat ? " / seat" : "";
  const saves =
    monthly != null && annual != null
      ? Math.max(0, Math.round((1 - annual / (monthly * 12)) * 100))
      : 0;
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-1.5">
        <span className="text-4xl font-bold text-white tracking-tight">${amount}</span>
        <span className="text-[#C4C4C4] text-sm">{unit}{perSeat}</span>
      </div>
      {showAnnual && saves > 0 && (
        <span className="mt-1 text-[11px] font-semibold text-[var(--accent-vivid)]">
          Save {saves}% vs monthly
        </span>
      )}
      {!showAnnual && plan.note && <span className="mt-1 text-[11px] text-[#888]">{plan.note}</span>}
    </div>
  );
}

function Cta({
  plan,
  product,
  cadence,
  seats,
}: {
  plan: Plan;
  product: string;
  cadence: Cadence;
  seats?: number;
}) {
  const base = "mt-6 block text-center px-5 py-2.5 rounded-full font-bold text-xs transition";
  if (plan.cta === "none") return null;

  if (plan.cta === "checkout") {
    const href =
      plan.kind === "oneTime"
        ? checkoutHref(product, plan.id)
        : checkoutHref(product, plan.id, cadence, seats);
    // A per-seat plan says what it is about to charge for, so the number in the
    // stepper and the number on the button can never disagree.
    const label = plan.seats && seats ? `Buy ${seats} seats` : plan.ctaLabel;
    return (
      <a href={href} className={`${base} text-white bg-[var(--accent)] hover:opacity-90`}>
        {label}
      </a>
    );
  }
  if (plan.cta === "contact") {
    return (
      <a
        href={contactHref(product, plan.name)}
        className={`${base} text-[#C4C4C4] bg-[#1A1A1A] border border-[#2A2A2A] hover:bg-[#222]`}
      >
        {plan.ctaLabel}
      </a>
    );
  }
  // get-started / download
  return (
    <a
      href={plan.ctaHref ?? "/login"}
      className={`${base} text-[#C4C4C4] bg-[#1A1A1A] border border-[#2A2A2A] hover:bg-[#222]`}
    >
      {plan.ctaLabel}
    </a>
  );
}

/**
 * The seat stepper for per-seat plans. It owns the number the card buys: the
 * total, the button label and the checkout URL all read from it, and every way
 * of changing it (buttons, typing, arrow keys) goes through clampSeats, so the
 * card cannot show — or send — a count the plan doesn't sell.
 */
function SeatPicker({
  plan,
  product,
  cadence,
  seats,
  setSeats,
}: {
  plan: Plan;
  product: string;
  cadence: Cadence;
  seats: number;
  setSeats: (n: number) => void;
}) {
  const range = plan.seats!;
  const [draft, setDraft] = useState(String(seats));
  const annual = cadence === "year" && plan.annualUSD != null;
  const unit = seatRate(plan, annual ? "year" : "month");
  const total = unit * seats;

  function commit(value: string) {
    const n = clampSeats(plan, Number.parseInt(value, 10));
    setSeats(n);
    setDraft(String(n));
  }
  function step(by: number) {
    const n = clampSeats(plan, seats + by);
    setSeats(n);
    setDraft(String(n));
  }

  const stepBtn =
    "h-8 w-8 rounded-full border border-[#2A2A2A] bg-[#1A1A1A] text-base leading-none text-white transition hover:bg-[#222] disabled:opacity-35 disabled:hover:bg-[#1A1A1A]";

  return (
    <div className="mt-6 rounded-xl border border-[#2A2A2A] bg-[#111] p-3.5">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={`seats-${product}-${plan.id}`}
          className="text-[11px] font-bold uppercase tracking-wider text-[#888]"
        >
          Seats
        </label>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className={stepBtn}
            onClick={() => step(-1)}
            disabled={seats <= range.min}
            aria-label="One seat fewer"
          >
            −
          </button>
          <input
            id={`seats-${product}-${plan.id}`}
            type="number"
            inputMode="numeric"
            min={range.min}
            max={range.max}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={(e) => commit(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit((e.target as HTMLInputElement).value);
            }}
            className="w-14 rounded-lg border border-[#2A2A2A] bg-[#0E0E0E] py-1 text-center text-sm font-bold text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            className={stepBtn}
            onClick={() => step(1)}
            disabled={seats >= range.max}
            aria-label="One seat more"
          >
            +
          </button>
        </div>
      </div>
      <div className="mt-2.5 flex items-baseline justify-between border-t border-[#1F1F1F] pt-2.5">
        <span className="text-xs text-[#888]">
          {seats} × ${unit}
        </span>
        <span className="text-sm font-bold text-white">
          ${total.toLocaleString()}
          <span className="ml-1 text-[11px] font-normal text-[#888]">
            {annual ? "/ yr" : "/ mo"}
          </span>
        </span>
      </div>
    </div>
  );
}

function PlanCard({ plan, product, cadence }: { plan: Plan; product: string; cadence: Cadence }) {
  const highlight = !!plan.highlight;
  const [seats, setSeats] = useState(plan.seats?.default ?? 1);
  return (
    <div
      className={`h-full p-7 rounded-2xl relative flex flex-col ${highlight ? "" : "bg-[#141414] border border-[#222]"}`}
      style={
        highlight
          ? {
              background: "linear-gradient(to bottom, rgba(var(--accent-rgb),0.15), #141414)",
              border: "1px solid rgba(var(--accent-rgb),0.45)",
              boxShadow: "0 30px 80px -50px rgba(var(--accent-rgb),0.7)",
            }
          : undefined
      }
    >
      {plan.badge && (
        <div className="absolute -top-2.5 left-7 px-2.5 py-0.5 rounded-full text-white text-[10px] uppercase tracking-wider font-bold bg-[var(--accent)]">
          {plan.badge}
        </div>
      )}
      <div className="text-sm font-bold uppercase tracking-wider text-[#C4C4C4] mb-3">{plan.name}</div>
      <div className="mb-6">
        <PriceBlock plan={plan} cadence={cadence} />
      </div>
      <ul className="space-y-2.5 text-sm text-[#D4D4D4] flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="text-[var(--accent-vivid)] mt-0.5">✓</span>
            <span className="leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>
      {plan.seats && (
        <SeatPicker
          plan={plan}
          product={product}
          cadence={cadence}
          seats={seats}
          setSeats={setSeats}
        />
      )}
      <Cta plan={plan} product={product} cadence={cadence} seats={plan.seats ? seats : undefined} />
      {plan.seats && (
        <p className="mt-3 text-center text-[11px] text-[#888]">
          More than {plan.seats.max} seats?{" "}
          <a
            href={contactHref(product, `${plan.name} — ${plan.seats.max}+ seats`)}
            className="font-semibold text-[var(--accent-vivid)] hover:underline"
          >
            Talk to us
          </a>
        </p>
      )}
    </div>
  );
}

export default function PricingTable() {
  const [cadence, setCadence] = useState<Cadence>("year");

  return (
    <section className="px-6 sm:px-10 py-20 border-y border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        {/* Cadence toggle */}
        <ScrollReveal className="flex justify-center mb-14">
          <div className="inline-flex items-center p-1 rounded-full bg-[#141414] border border-[#2A2A2A]">
            {(["month", "year"] as Cadence[]).map((c) => (
              <button
                key={c}
                onClick={() => setCadence(c)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                  cadence === c ? "bg-[#C8102E] text-white" : "text-[#888] hover:text-white"
                }`}
              >
                {c === "month" ? "Monthly" : "Annual"}
                {c === "year" && (
                  <span className={`ml-2 ${cadence === c ? "text-white/80" : "text-[#C8102E]"}`}>save</span>
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="space-y-20">
          {PRICING.map((prod) => (
            <ProductTheme key={prod.key} product={prod.key as ProductKey}>
              <ScrollReveal>
                <div className="flex items-baseline gap-3 mb-2">
                  <Link
                    href={prod.href}
                    className="text-2xl font-bold text-white hover:text-[var(--accent-vivid)] transition"
                  >
                    {prod.name}
                  </Link>
                  <span className="h-px flex-1 bg-[#1F1F1F]" />
                </div>
                <p className="text-[#888] text-sm mb-6">{prod.tagline}</p>
              </ScrollReveal>
              <ScrollReveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {prod.plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} product={prod.product} cadence={cadence} />
                  ))}
                </div>
              </ScrollReveal>
            </ProductTheme>
          ))}
        </div>
      </div>
    </section>
  );
}
