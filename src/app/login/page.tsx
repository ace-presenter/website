/**
 * /login — ACE Account sign-in.
 *
 * Supports email + password (existing users) and magic-link (passwordless).
 * On success the Supabase session is stored in cookies and the user is
 * redirected to /account.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

function getSupabase() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON);
}

type Mode = "password" | "magic";

export default function LoginPage() {
  const [mode, setMode]       = useState<Mode>("password");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [sent, setSent]       = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!SUPABASE_URL || !SUPABASE_ANON) {
        // Misconfigured deploy (missing NEXT_PUBLIC_SUPABASE_* at build time).
        // Surface a clear message instead of hanging on a thrown client init.
        throw new Error("Sign-in is temporarily unavailable. Please try again shortly.");
      }
      const supabase = getSupabase();
      if (mode === "magic") {
        const { error: err } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: `${location.origin}/api/auth/callback` },
        });
        if (err) throw err;
        setSent(true);
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        location.href = "/account";
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign-in failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0F0F0F] flex flex-col font-sans">
      {/* Minimal nav */}
      <nav className="px-6 sm:px-10 py-5 flex items-center justify-between border-b border-[#1A1A1A]">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="ACE" width={28} height={28} className="rounded-md" />
          <span className="font-bold tracking-tight text-white">ACE</span>
        </Link>
        <Link href="/account" className="text-sm text-[#888] hover:text-white transition">
          Account →
        </Link>
      </nav>

      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-2">
              Sign in
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              One account,{" "}
              <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
                the whole suite.
              </span>
            </h1>
          </div>

          {sent ? (
            <div className="rounded-2xl bg-[#0D0D0D] border border-[#222] p-6 text-center">
              <p className="text-white font-semibold mb-2">Check your email</p>
              <p className="text-sm text-[#888]">
                We sent a sign-in link to <span className="text-[#C4C4C4]">{email}</span>.
                Click it to sign in — no password needed.
              </p>
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="mt-4 text-xs text-[#C8102E] hover:text-[#E8183A] transition"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#888] font-semibold mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#C8102E] transition"
                />
              </div>

              {mode === "password" && (
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#888] font-semibold mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#C8102E] transition"
                  />
                </div>
              )}

              {error && (
                <p className="text-sm text-[#F59E0B] bg-[#1A1400] border border-[#3A2800] rounded-lg px-4 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-full bg-[#C8102E] hover:bg-[#E8183A] disabled:opacity-50 text-white font-bold text-sm transition"
              >
                {loading
                  ? "Signing in…"
                  : mode === "magic"
                  ? "Send magic link"
                  : "Sign in"}
              </button>

              <button
                type="button"
                onClick={() => { setMode(mode === "password" ? "magic" : "password"); setError(""); }}
                className="w-full text-sm text-[#888] hover:text-[#C4C4C4] transition"
              >
                {mode === "password"
                  ? "Sign in without a password →"
                  : "Sign in with a password →"}
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-xs text-[#555]">
            New to ACE?{" "}
            <Link href="/signup" className="text-[#C8102E] hover:text-[#E8183A] transition">
              Create an account →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
