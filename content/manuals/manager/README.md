# ACE Manager — User Manual

A comprehensive reference for **ACE Manager**, the AI-powered organisation and church management platform in the ACE Suite. Keep your whole congregation or team in one directory, coordinate departments and volunteer rotas, run events and check-in, track giving, reach every member on their own channel, and let an AI operations agent handle the routine follow-up in the background.

> **What ACE Manager is — and where it is in its life.** ACE Manager is the organisational command layer of the ACE Suite. It is a **web application**: you run it in any modern browser, on a laptop or a phone, at your organisation's ACE Manager address. There is no separate app to install.
>
> - **Web app** — the full product, on any device with a browser. This is the only place the dashboard lives today.
> - **Member portal** — a lightweight, mobile-first self-service area your members reach through a personal link, with no account or password to remember. See [The Member Self-Service Portal](09-reports-integrations-portal.md#the-member-self-service-portal).
> - **One ACE account** — the same login works across the ACE Suite, so ACE Manager, ACE Presenter, and ACE Schedule share one sign-in and one bill.
>
> **ACE Manager is in early access (late beta).** The core is in daily use, but the product is still moving quickly, and it is in the middle of a platform migration from its original database to a new one. A few modules are newer than others, and a few advertised integrations are still being wired up. This manual is honest about which is which — every module carries a status badge, and anything not yet fully live is marked. **Native mobile apps (iOS / Android) are not available yet**; the member portal is built to work well on a phone browser in the meantime.

---

## How to read this manual

**Where things live.** ACE Manager has two main surfaces:

- **The Dashboard** (`/dashboard`) — the staff workspace, where admins, managers, and department leaders run the organisation. Menu paths use ▸ (for example, *Dashboard ▸ Giving ▸ Funds*).
- **The Portal** (`/portal/…`) — the member-facing self-service area, opened from a personal link.

**Who sees what.** ACE Manager is role-based. Three staff roles — **Admin**, **Manager**, and **Staff** (department leaders) — see different slices of the dashboard, and members see only their own portal. Where a feature is limited to certain roles, it is called out inline. The full picture is in [Getting Started ▸ Roles & access](01-getting-started.md#roles--access).

**Status badges.** Not every module is at the same level of maturity in early access. Availability is flagged inline:

| Badge | Meaning |
|---|---|
| *(available)* | Working now in early access |
| *(early access)* | Present and usable, but newer and still maturing — expect refinements |
| *(setup required)* | Ships in the app, but only works once an administrator has configured the backend service behind it (messaging providers, payment keys, integrations) |
| *(rolling out)* | Being switched on progressively; may not yet be visible on every account |
| *(planned)* | On the roadmap; not available today |

**Honesty about the AI.** ACE Manager's agent is a real, shipping part of the product, but it depends on a hosted AI service and on your messaging providers being connected. On a fully configured account it drafts messages, answers members, and runs scheduled background jobs end-to-end. Where it is not configured, the interface is still present and the app degrades gracefully — you simply do the work manually. This manual always says which is which, and [The AI Agent](07-the-ai-agent.md) documents every guardrail.

---

## What ACE Manager does, at a glance

- **People** — a single directory of your congregation or membership, plus an internal staff directory, with profiles, engagement, and self-registration. See [People](02-people-members-and-staff.md).
- **Departments, teams & small groups** — ministry structure for staff, and small groups for members. See [Departments, Teams & Small Groups](03-departments-teams-groups.md).
- **Events, attendance & check-in** — plan events, take registrations and payment, record service attendance, and run secure children's check-in. See [Events, Attendance & Check-in](04-events-attendance-checkin.md).
- **Volunteer rotas** — schedule volunteers across ministry teams, with unavailability, accept/decline, and swaps. See [Volunteer Rotas & Serving](05-volunteer-rotas-serving.md).
- **Giving & donations** — funds, donations, pledges, recurring giving, and contribution statements. See [Giving & Donations](06-giving-donations.md).
- **Communication & campaigns** — reach members over WhatsApp, SMS, email, Telegram, and Instagram, with templates, campaigns, prayer requests, and visitor follow-up. See [Communication, Campaigns & Care](07-communication-campaigns-care.md).
- **The AI agent** — an operations assistant that assigns tasks, sends reminders, answers members, and generates reports — within guardrails you set. See [The AI Agent](08-the-ai-agent.md).
- **Reports, analytics, integrations & the portal** — weekly digests, trends, connected tools, and member self-service. See [Reports, Analytics, Integrations & the Portal](09-reports-integrations-portal.md).

---

## Who ACE Manager is for

ACE Manager was built **for churches and ministries first** — congregation records, service planning, volunteer coordination, pastoral follow-up, giving, and multi-department reporting are its centre of gravity, and the vocabulary throughout (members, departments, services, pastoral care) reflects that. It also serves **ministry teams** (worship, youth, media, outreach, admin) and, more broadly, **any organisation or team** that coordinates people, events, communication, and tasks at scale — nonprofits, schools, and production companies included. Where a term is church-specific, read it as your organisation's equivalent.

---

## Table of contents

1. [Getting Started](01-getting-started.md) — sign-up, organisation onboarding, the trial, seeding departments, roles & access, the dashboard, plans
2. [People — Members & Staff](02-people-members-and-staff.md) — the congregation directory, member profiles, self-registration, the internal staff directory
3. [Departments, Teams & Small Groups](03-departments-teams-groups.md) — ministry departments, department-scoped access, small groups, group discovery
4. [Events, Attendance & Check-in](04-events-attendance-checkin.md) — event planning, registration & payment, service attendance, children's check-in, kiosk mode
5. [Volunteer Rotas & Serving](05-volunteer-rotas-serving.md) — building rotas, roles, unavailability, accept/decline, swaps, serving history
6. [Giving & Donations](06-giving-donations.md) — funds, recording donations, pledges & campaigns, recurring giving, statements, online giving
7. [Communication, Campaigns & Care](07-communication-campaigns-care.md) — channels, templates, campaigns, internal messaging, prayer requests, visitor follow-up
8. [The AI Agent](08-the-ai-agent.md) — what it does, its personality, modes, guardrails, approvals, the kill switch, background automations, natural-language questions
9. [Reports, Analytics, Integrations & the Portal](09-reports-integrations-portal.md) — reports & digests, analytics, integrations (Planning Center, Google, Zoom, Stripe), CCLI reporting, the member self-service portal

---

## A note on plans

ACE Manager is offered on a base-plus-usage model: a plan includes a bundle of member records and team seats, and larger organisations add capacity on top. There is a **free tier** for small teams and a **14-day free trial** on the paid plans. The full breakdown — what each tier includes and how seats scale — is in [Getting Started ▸ Plans & billing](01-getting-started.md#plans--billing). Pricing and limits are still being finalised during early access and may change before general availability.
