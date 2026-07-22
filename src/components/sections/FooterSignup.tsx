"use client";

import { useState } from "react";

/**
 * FooterSignup — slim email capture for the footer's bottom row.
 *
 * Posts to the existing /api/waitlist endpoint (product "suite", source
 * "footer") — same contract as WaitlistForm, minus name/interests.
 */
export default function FooterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

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
          product: "suite",
          interests: ["Launch & release updates"],
          source: "footer",
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
      <p className="text-sm text-[#A8A8A8]">
        <span className="text-white">You&apos;re on the list.</span> We&apos;ll only email
        when there&apos;s news worth your time.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm">
      <div className="flex gap-2">
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="you@church.org"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full border border-[#262626] bg-[#161616] px-4 py-2.5 text-sm text-white placeholder-[#666] outline-none transition focus:border-[#3A3A3A]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#E8E8E8] disabled:opacity-60"
        >
          {status === "loading" ? "…" : "Updates"}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-[#E8183A]">{error}</p>}
    </form>
  );
}
