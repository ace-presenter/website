/**
 * POST /api/waitlist — join the ACE launch waitlist.
 *
 * Body: { email, name?, product?, interests?: string[], source? }
 * Sends a notification email to hello@ace-presenter.app via Resend.
 * Also sends a confirmation email to the subscriber.
 *
 * Requires RESEND_API_KEY in env (resend.com — free up to 100/day).
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRODUCTS = new Set([
  "presenter",
  "windows",
  "world",
  "schedule",
  "manager",
  "notes",
  "suite",
]);

const FROM_ADDRESS = "ACE <waitlist@ace-presenter.app>";
const NOTIFY_ADDRESS = "hello@ace-presenter.app";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const name = body.name ? String(body.name).trim().slice(0, 120) : null;
  const product = PRODUCTS.has(String(body.product)) ? String(body.product) : "presenter";
  const interests = Array.isArray(body.interests)
    ? body.interests.filter((x): x is string => typeof x === "string").slice(0, 12)
    : [];
  const source = body.source ? String(body.source).slice(0, 200) : null;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[waitlist] RESEND_API_KEY not set");
    return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const displayName = name ? `${name} (${email})` : email;
  const interestList = interests.length ? interests.join(", ") : "none selected";
  const fromPage = source ?? "unknown";

  try {
    // Notification to hello@ace-presenter.app
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: NOTIFY_ADDRESS,
      subject: `New waitlist signup — ${email}`,
      html: `
        <p style="font-family:sans-serif;color:#111">
          <strong>New waitlist signup</strong>
        </p>
        <table style="font-family:sans-serif;font-size:14px;color:#333;border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0;color:#888">Name</td><td>${displayName}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#888">Product</td><td>${product}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#888">Interests</td><td>${interestList}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#888">Source</td><td>${fromPage}</td></tr>
        </table>
      `,
    });

    // Confirmation to the subscriber
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "You're on the ACE waitlist",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;color:#111">
          <p style="font-size:22px;font-weight:700;margin-bottom:4px">You're on the list${name ? `, ${name.split(" ")[0]}` : ""}.</p>
          <p style="color:#555;margin-top:0">
            We'll reach out when there's news worth your time — release notes
            and product updates. No noise, no spam.
          </p>
          <p style="color:#555">— The ACE team</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
          <p style="font-size:11px;color:#aaa">
            You're receiving this because you signed up at ace-presenter.app.
            Reply to unsubscribe at any time.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[waitlist] send failed:", e instanceof Error ? e.message : e);
    return NextResponse.json(
      { error: "Couldn't add you right now — please try again in a moment." },
      { status: 500 }
    );
  }
}
