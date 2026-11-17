"use client";

import { useState, type InputHTMLAttributes } from "react";

/**
 * A password box with a show/hide eye (operator, 2026-11-15: "there is no
 * hide and unhide icon for password"). Same look as the site's other inputs;
 * the eye sits inside the box on the right. The button never submits the
 * form, and screen readers hear "Show password" / "Hide password".
 */
export default function PasswordInput(
  { className = "", ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
) {
  const [shown, setShown] = useState(false);
  return (
    <div className="relative">
      <input {...props} type={shown ? "text" : "password"} className={`${className} pr-11`} />
      <button
        type="button"
        onClick={() => setShown((s) => !s)}
        aria-label={shown ? "Hide password" : "Show password"}
        aria-pressed={shown}
        title={shown ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[#777] hover:text-white focus:outline-none focus-visible:text-white transition"
      >
        {shown ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 3l18 18" />
            <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
            <path d="M9.9 5.1A9.7 9.7 0 0 1 12 5c5 0 9 4.5 10 7-.4 1-1.2 2.3-2.4 3.6M6.3 6.3C4.3 7.6 2.8 9.6 2 12c1 2.5 5 7 10 7 1.7 0 3.2-.5 4.6-1.3" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12c1-2.5 5-7 10-7s9 4.5 10 7c-1 2.5-5 7-10 7S3 14.5 2 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}
