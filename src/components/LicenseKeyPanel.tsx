"use client";

import { useState } from "react";

interface Issued { token: string; expires_at: number; products: string[]; tier: string }

/**
 * Fetches a licence key from /api/license/issue and shows it with a copy button.
 * Desktop apps (Presenter, Editors' Notes) paste this into their "Connect
 * account" flow; it's sent as `Authorization: Bearer …` to the ACE gateway.
 */
export default function LicenseKeyPanel() {
  const [issued, setIssued] = useState<Issued | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function getKey() {
    setLoading(true); setError(null); setCopied(false);
    try {
      const res = await fetch("/api/license/issue", { method: "POST" });
      const data = await res.json();
      if (!res.ok) { setError(data.detail || data.error || "Could not issue a licence."); setIssued(null); }
      else setIssued(data as Issued);
    } catch {
      setError("Network error.");
    } finally { setLoading(false); }
  }

  async function copy() {
    if (!issued) return;
    await navigator.clipboard.writeText(issued.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={getKey}
        disabled={loading}
        className="px-6 py-3 rounded-full bg-[#C8102E] hover:bg-[#E8183A] disabled:opacity-50 text-white font-bold text-sm transition"
      >
        {loading ? "Issuing…" : "Get my licence key"}
      </button>

      {error && (
        <p className="mt-5 text-sm text-[#F59E0B]">
          {error === "Sign in to get your ACE licence key." ? "Sign in to get your ACE licence key." : error}
        </p>
      )}

      {issued && (
        <div className="mt-6 p-5 rounded-2xl bg-[#0D0D0D] border border-[#222] text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#888] font-bold">
              {issued.tier} · {issued.products.join(" · ")}
            </span>
            <button onClick={copy} className="text-xs font-semibold text-[#C8102E] hover:text-[#E8183A] transition">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <code className="block text-[11px] leading-relaxed text-[#C4C4C4] break-all font-[family-name:var(--font-geist-mono)]">
            {issued.token}
          </code>
          <p className="mt-3 text-[11px] text-[#666]">
            Expires {new Date(issued.expires_at * 1000).toLocaleDateString()}. Paste it into your ACE desktop app.
          </p>
        </div>
      )}
    </div>
  );
}
