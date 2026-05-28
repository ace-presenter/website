import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "ACE Manager — Church & Ministry Management",
  description:
    "ACE Manager is the organizational command layer of the ACE suite. Run members, departments, tasks, events, communication, and reporting from one coordinated system. Built for churches, ministries, and teams.",
  alternates: { canonical: "/manager" },
  openGraph: {
    title: "ACE Manager — Church & Ministry Management",
    description:
      "ACE Manager helps churches, ministries, and teams run members, departments, tasks, events, communication, and reporting from one coordinated system.",
    url: "https://www.ace-presenter.app/manager",
  },
};

const FEATURES = [
  {
    tag: "Members",
    title: "Your congregation. One directory.",
    body: "Full member records: contact info, family links, attendance history, pastoral notes, and lifecycle status. Search, filter, and act from one place.",
  },
  {
    tag: "Departments",
    title: "Every ministry team, coordinated.",
    body: "Worship, youth, media, outreach, admin — each department has its own roster, tasks, events, and reporting. Leaders see their slice. Admins see everything.",
  },
  {
    tag: "Events & Services",
    title: "Plan the service. Run it. Follow up.",
    body: "Service planning with volunteer assignments and attendance tracking. Post-service follow-up tasks generated automatically by the AI agent.",
  },
  {
    tag: "AI Agent",
    title: "Operations that run themselves.",
    body: "The ACE Manager agent assigns tasks, sends follow-ups, preps meeting agendas, monitors volunteer engagement, and generates department reports — autonomously.",
  },
  {
    tag: "Communication",
    title: "Reach every member on their channel.",
    body: "Email, SMS, WhatsApp, and in-app messaging. Campaigns with templates, scheduling, and open-rate tracking. Your AI agent handles routine follow-up without you.",
  },
  {
    tag: "Reports",
    title: "Know what's happening. Always.",
    body: "Weekly AI digests, attendance trends, volunteer engagement scores, task completion rates, and department performance — generated, not compiled.",
  },
];

const VS_CHURCHSUITE = [
  {
    dimension: "AI operations",
    ace: "Autonomous agent — assigns, follows up, reports",
    them: "None",
  },
  {
    dimension: "Pricing",
    ace: "Members included in base plan",
    them: "£1/person/month with £50 minimum",
  },
  {
    dimension: "Channels",
    ace: "Email, SMS, WhatsApp, in-app",
    them: "Email and SMS only",
  },
  {
    dimension: "Module bundling",
    ace: "Everything in your plan",
    them: "Children, Giving, Bookings charged separately",
  },
  {
    dimension: "Suite integration",
    ace: "Connects to ACE Presenter and Schedule",
    them: "Standalone, no live-event layer",
  },
  {
    dimension: "Reporting",
    ace: "AI-generated, one click",
    them: "Manual export",
  },
];

export default function ManagerPage() {
  return (
    <main className="flex-1 flex flex-col font-sans">
      <Nav activeProduct="manager" />
      <Hero />
      <Features />
      <VsChurchSuite />
      <UseCases />
      <SuiteConnector />
      <FinalCTA variant="manager" />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="px-6 sm:px-10 pt-24 sm:pt-32 pb-20 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-4">
          ACE · Manager
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 text-white">
          The organizational{" "}
          <span className="font-[family-name:var(--font-instrument-serif)] italic font-normal text-[#E8183A]">
            command layer.
          </span>
        </h1>
        <p className="text-[#C4C4C4] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          ACE Manager helps churches, ministries, and teams run members,
          departments, tasks, events, communication, and reporting from one
          coordinated system.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/manager/app"
            className="px-7 py-3.5 rounded-full bg-white hover:bg-[#E8E8E8] text-black font-bold text-sm transition"
          >
            Open ACE Manager
          </a>
          <Link
            href="/pricing#manager"
            className="px-7 py-3.5 rounded-full border border-[#2A2A2A] hover:border-[#444] text-[#C4C4C4] hover:text-white text-sm transition"
          >
            See pricing
          </Link>
        </div>
        <p className="text-[#555] text-xs mt-5">
          Part of the ACE suite · One account covers all products
        </p>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="px-6 sm:px-10 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#555] font-semibold mb-10 text-center">
          What it does
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.tag}
              className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#C8102E] font-bold">
                {f.tag}
              </div>
              <h3 className="text-white font-semibold text-lg leading-snug">{f.title}</h3>
              <p className="text-[#888] text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VsChurchSuite() {
  return (
    <section className="px-6 sm:px-10 py-20 border-t border-[#1A1A1A]">
      <div className="max-w-4xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#555] font-semibold mb-3 text-center">
          Why switch
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white text-center mb-10">
          ACE Manager vs ChurchSuite
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1E1E1E]">
                <th className="text-left py-3 pr-6 text-[#555] font-medium w-1/4" />
                <th className="text-left py-3 pr-6 text-white font-semibold w-[37.5%]">ACE Manager</th>
                <th className="text-left py-3 text-[#555] font-medium w-[37.5%]">ChurchSuite</th>
              </tr>
            </thead>
            <tbody>
              {VS_CHURCHSUITE.map((row, i) => (
                <tr key={row.dimension} className={`border-b border-[#1A1A1A] ${i % 2 === 0 ? "bg-[#0D0D0D]" : ""}` }>
                  <td className="py-4 pr-6 text-[#555] text-xs uppercase tracking-wider font-medium">{row.dimension}</td>
                  <td className="py-4 pr-6 text-[#C4C4C4]">{row.ace}</td>
                  <td className="py-4 text-[#555]">{row.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="px-6 sm:px-10 py-20 border-t border-[#1A1A1A]">
      <div className="max-w-4xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#555] font-semibold mb-3 text-center">Built for</div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white text-center mb-12">Who uses ACE Manager</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              label: "Primary",
              title: "Churches & Ministries",
              body: "Congregation records, service planning, volunteer coordination, pastoral follow-up, and multi-department reporting. The reason ACE Manager exists.",
            },
            {
              label: null,
              title: "Ministry Teams",
              body: "Worship, youth, media, outreach, and admin teams — each with their own roster, task board, event calendar, and AI-generated weekly digest.",
            },
            {
              label: null,
              title: "Organizations & Teams",
              body: "Any team that coordinates people, events, communication, and tasks at an organizational scale — schools, nonprofits, and production companies included.",
            },
          ].map((uc) => (
            <div
              key={uc.title}
              className={`bg-[#111] border rounded-2xl p-6 ${
                uc.label === "Primary"
                  ? "border-[#C8102E]/30 ring-1 ring-[#C8102E]/20"
                  : "border-[#1E1E1E]"
              }`}
            >
              {uc.label && (
                <div className="text-[9px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-2">
                  {uc.label}
                </div>
              )}
              <h3 className="text-white font-semibold mb-3">{uc.title}</h3>
              <p className="text-[#888] text-sm leading-relaxed">{uc.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SuiteConnector() {
  return (
    <section className="px-6 sm:px-10 py-16 border-t border-[#1A1A1A]">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#555] font-semibold mb-4">
          Part of ACE
        </div>
        <p className="text-white text-xl sm:text-2xl font-semibold leading-snug mb-3">
          ACE runs the cues, the schedule, and the notes
          {" "}—{" "}
          <span className="text-[#888] font-normal">so you can run the room.</span>
        </p>
        <p className="text-[#555] text-sm max-w-xl mx-auto mt-4 leading-relaxed">
          One account gives you ACE Presenter for live production, ACE Schedule
          for personal task management, and ACE Manager for organizational
          operations. Same login. No separate billing.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-[#555]">
          <Link href="/presenter" className="hover:text-[#C4C4C4] transition">ACE Presenter →</Link>
          <span aria-hidden>·</span>
          <Link href="/schedule" className="hover:text-[#C4C4C4] transition">ACE Schedule →</Link>
          <span aria-hidden>·</span>
          <Link href="/editors-notes" className="hover:text-[#C4C4C4] transition">ACE Editors&#39; Notes →</Link>
        </div>
      </div>
    </section>
  );
}
