/**
 * /signup — ACE Account creation.
 *
 * Creates a new ACE Suite account in the shared Supabase project. One ACE
 * account works across every product (Presenter, Schedule, Manager,
 * Editors' Notes, World). If email confirmation is enabled, the user is
 * asked to confirm; the link lands on /api/auth/callback and then /account.
 */

"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import HorizonGlow from "@/components/hero/HorizonGlow";
import { COUNTRIES } from "@/lib/countries";

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

function getSupabase() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON);
}

// useSearchParams() requires a Suspense boundary for static prerender.
export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const searchParams = useSearchParams();
  const rawNext = searchParams.get("next") ?? "";
  const safeNext = rawNext.startsWith("/") ? rawNext : "/account";
  const isCheckout = safeNext.includes("/api/stripe/checkout");

  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [org, setOrg]           = useState("");
  const [city, setCity]         = useState("");
  const [country, setCountry]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [sent, setSent]         = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = getSupabase();

    try {
      const callbackNext = safeNext !== "/account" ? `?next=${encodeURIComponent(safeNext)}` : "";
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/api/auth/callback${callbackNext}`,
          data: {
            full_name: name || undefined,
            organization: org || undefined,
            city: city || undefined,
            country: country || undefined,
          },
        },
      });
      if (err) throw err;

      // Existing-account guard: Supabase returns a user with no identities
      // when the email is already registered (prevents account enumeration).
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError("An account with this email already exists. Try signing in instead.");
        return;
      }

      // Confirmations disabled -> session returned immediately.
      if (data.session) {
        location.href = safeNext;
        return;
      }

      // Otherwise the user must confirm via the emailed link.
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign-up failed. Try again.");
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
        <Link
          href={safeNext !== "/account" ? `/login?next=${encodeURIComponent(safeNext)}` : "/login"}
          className="text-sm text-[#888] hover:text-white transition"
        >
          Sign in &rarr;
        </Link>
      </nav>

      <section className="relative flex-1 flex items-center justify-center overflow-hidden px-6 py-20">
        <HorizonGlow strength={0.55} />
        <div className="glass-card relative z-10 w-full max-w-md rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-2">
              Create account
            </div>
            {isCheckout ? (
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Create an account to{" "}
                <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
                  complete your purchase.
                </span>
              </h1>
            ) : (
              <h1 className="text-3xl font-bold tracking-tight text-white">
                One account,{" "}
                <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
                  the whole suite.
                </span>
              </h1>
            )}
          </div>

          {sent ? (
            <div className="rounded-2xl bg-[#0D0D0D] border border-[#222] p-6 text-center">
              <p className="text-white font-semibold mb-2">Confirm your email</p>
              <p className="text-sm text-[#888]">
                We sent a confirmation link to{" "}
                <span className="text-[#C4C4C4]">{email}</span>. Click it to
                activate your ACE account.
              </p>
              <Link
                href={safeNext !== "/account" ? `/login?next=${encodeURIComponent(safeNext)}` : "/login"}
                className="mt-4 inline-block text-xs text-[#C8102E] hover:text-[#E8183A] transition"
              >
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#888] font-semibold mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#C8102E] transition"
                />
              </div>

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

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#888] font-semibold mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#C8102E] transition"
                />
              </div>

              <div className="pt-1 border-t border-[#1A1A1A]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#555] font-semibold mb-3">
                  Where are you based?
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="Church, ministry, school, or organization"
                    className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#C8102E] transition"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      autoComplete="address-level2"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City / Town"
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#C8102E] transition"
                    />
                    <select
                      required
                      autoComplete="country-name"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-sm focus:outline-none focus:border-[#C8102E] transition ${country ? "text-white" : "text-[#555]"}`}
                    >
                      <option value="" disabled>Country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c} className="text-white">{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

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
                {loading ? "Creating account…" : "Create account"}
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-xs text-[#555]">
            Already have an account?{" "}
            <Link
              href={safeNext !== "/account" ? `/login?next=${encodeURIComponent(safeNext)}` : "/login"}
              className="text-[#C8102E] hover:text-[#E8183A] transition"
            >
              Sign in &rarr;
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
