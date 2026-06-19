"use client";

/**
 * WaitlistForm — email capture for the ACE launch waitlist.
 *
 * Posts to /api/waitlist (service-role insert). Reusable: drop it on a page
 * or in a section. `product` tags which list the signup belongs to; the
 * checkbox `interests` are free-form tags stored with the row.
 *
 * Visual: ACE dark theme, crimson accent. Structure mirrors a clean IR-style
 * signup module — email field, interest checkboxes, submit, success state.
 */

import { useState } from "react";

interface WaitlistFormProps {
  /** which list: presenter | windows | world | suite … (default "presenter") */
  product?: string;
  /** where the signup happened — stored for attribution */
  source?: string;
  /** interest checkboxes; omit/empty to hide the block */
  interests?: string[];
  /** submit button label */
  cta?: string;
  /** accent [base, vivid, "r,g,b"] — defaults to Presenter crimson */
  accent?: [string, string, string];
}

const DEFAULT_ACCENT: [string, string, string] = ["#C8102E", "#E8183A", "200,16,46"];

export default function WaitlistForm({
  product = "presenter",
  source,
  interests = [
    "Launch & release updates",
    "Windows version",
    "Beta invitations",
    "Tips & tutorials",
  ],
  cta = "Join the waitlist",
  accent = DEFAULT_ACCENT,
}: WaitlistFormProps) {
  const [, vivid, rgb] = accent;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [picked, setPicked] = useState<string[]>(interests.slice(0, 1));
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  function toggle(tag: string) {
    setPicked((p) => (p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag]));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || undefined,
          product,
          interests: picked,
          source: source ?? (typeof window !== "undefined" ? window.location.pathname : undefined),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div
        className="rounded-2xl border border-[#222] bg-[#0E0E0E] p-8 text-center"
        style={{ boxShadow: `0 0 60px rgba(${rgb},0.12)` }}
      >
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl"
          style={{ background: `rgba(${rgb},0.15)`, color: vivid }}
        >
          ✓
        </div>
        <h3 className="text-xl font-bold text-white">You&apos;re on the list.</h3>
        <p className="mt-2 text-sm text-[#A8A8A8]">
          We&apos;ll email <span className="text-white">{email}</span> when there&apos;s
          news worth your time. No spam, unsubscribe anytime.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-[#222] bg-[#0E0E0E] p-6 sm:p-8 text-left"
      style={{ boxShadow: `0 0 60px rgba(${rgb},0.08)` }}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          autoComplete="name"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full border border-[#262626] bg-[#161616] px-5 py-3 text-sm text-white placeholder-[#666] outline-none transition focus:border-[#3A3A3A] sm:w-2/5"
        />
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="you@church.org"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full border border-[#262626] bg-[#161616] px-5 py-3 text-sm text-white placeholder-[#666] outline-none transition focus:border-[#3A3A3A]"
        />
      </div>

      {interests.length > 0 && (
        <div className="mt-5">
          <p className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-[#777]">
            Tell us what to send
          </p>
          <div className="flex flex-wrap gap-2">
            {interests.map((tag) => {
              const on = picked.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggle(tag)}
                  className="rounded-full border px-3.5 py-1.5 text-xs font-medium transition"
                  style={{
                    borderColor: on ? vivid : "#2A2A2A",
                    background: on ? `rgba(${rgb},0.14)` : "transparent",
                    color: on ? "#fff" : "#9A9A9A",
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-[#E8183A]">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-full px-7 py-3.5 text-sm font-bold text-white transition disabled:opacity-60"
        style={{ background: vivid }}
      >
        {status === "loading" ? "Adding you…" : cta}
      </button>

      <p className="mt-3 text-center text-[11px] text-[#666]">
        No spam. One account works across every ACE product.
      </p>
    </form>
  );
}
