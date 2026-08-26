# ACE Schedule — User Manual

A comprehensive reference for **ACE Schedule Manager**, the AI‑assisted schedule, task, and routine app in the ACE Suite. Photograph a plan and turn it into tasks, run your day from a single dashboard, track streaks and completion over time, and close each evening with an intentional review.

> **What ACE Schedule is.** ACE Schedule ships as one product you can use two ways, backed by one cloud account:
> - **Web app** — the reference experience, in any modern browser. This is where every feature appears first.
> - **macOS desktop app** — the same app in a native, notarized macOS shell, with auto‑updates and native notifications.
> - **One ACE account** — sign in once and your schedule, projects, and settings sync across the web and the desktop. The account is shared across the ACE Suite, so the same login works in other ACE apps.
>
> Windows, Linux, and native mobile apps are **not** available yet — see the status notes below. In the meantime the web app runs on any device with a browser, including phones and tablets.

---

## How to read this manual

**Where things live.** Menu paths use ▸ (for example, *Settings ▸ Schedule Builder*). The app's main sections are reached from the navigation tabs — **My Tasks**, **Track**, **Projects**, **Reports** — and from the user menu in the top‑right (**Settings**, **Sign out**).

**Status notes.** Not every capability is available to every user, and a few advertised features depend on backend configuration. Availability is flagged inline:

| Badge | Meaning |
|---|---|
| *(Free)* | Included on the free tier |
| *(Pro)* | Requires an ACE Schedule Pro subscription |
| *(setup required)* | Ships in the app, but only returns live results once the backend service is configured for your account — the app degrades gracefully until then |
| *(coming soon)* | On the roadmap; not available today |

When a feature is both Pro **and** depends on backend setup — most of the AI features are — both badges apply. These are described honestly throughout: the interface is present, and the intelligence behind it is a Pro capability that an administrator enables.

**Honesty about AI.** ACE Schedule's AI features — schedule import, daily guidance, and personalised puzzles — are real, shipping parts of the app, but they call a hosted AI service. On a correctly configured Pro deployment they work end‑to‑end; if the service is not configured, the app falls back cleanly (you still get the manual planner, and guidance panels simply stay quiet). This manual always tells you which is which.

---

## The app at a glance

ACE Schedule is organised around a few core surfaces you move between using the navigation tabs:

- **My Tasks** — your daily dashboard: today's agenda, the 7‑day week, category filters, task cards you complete, a month calendar, and your progress and streaks. See [The Daily Dashboard](02-daily-dashboard.md).
- **Schedule Builder** *(in Settings)* — the weekly template where you design each day's tasks, drag them into order, and run AI import. See [The Weekly Planner](03-weekly-planner.md).
- **Track** — completion analytics: totals, success rate, perfect days, best streak, and trends. See [Tracking, Analytics & Reports](07-tracking-analytics-reports.md).
- **Projects** *(Pro)* — long‑term goals on a status board with progress and deadlines. See [Projects, Kanban & Milestones](05-projects-kanban-milestones.md).
- **Reports** *(Pro)* — deeper reports with period selection and CSV/PDF export. See [Tracking, Analytics & Reports](07-tracking-analytics-reports.md).
- **The daily rituals** — AI daily guidance, the daily brain puzzle, and the End‑of‑Day Ceremony. See [Daily Guidance & the End‑of‑Day Ceremony](06-guidance-and-ceremony.md).
- **Settings** — account, appearance, language, notifications, Google Calendar, backup, and the schedule builder. See [Account, Sync, Backup & Settings](08-account-sync-settings.md).

---

## Table of contents

1. [Getting Started](01-getting-started.md) — install the web and Mac apps, create your ACE account, the onboarding walkthrough, and the tiers
2. [The Daily Dashboard](02-daily-dashboard.md) — today's agenda, time blocks, categories, completing tasks, notes & subtasks, the calendar, and streaks
3. [The Weekly Planner](03-weekly-planner.md) — the Schedule Builder, per‑day editing, drag‑to‑reorder, categories, priorities, recurrence, and filters
4. [AI Schedule Import](04-ai-schedule-import.md) — photograph a syllabus or planner and extract a working week
5. [Projects, Kanban & Milestones](05-projects-kanban-milestones.md) — the project board, statuses and progress, deadlines, and long‑term milestones
6. [Daily Guidance & the End‑of‑Day Ceremony](06-guidance-and-ceremony.md) — AI guidance, scripture reflections, the daily puzzle, and closing the day
7. [Tracking, Analytics & Reports](07-tracking-analytics-reports.md) — the Track dashboard, streaks and perfect days, Pro reports, and exports
8. [Account, Sync, Backup & Settings](08-account-sync-settings.md) — sign‑in, appearance & language, notifications, Google Calendar, backup, sync, desktop updates, and account deletion

---

## Free vs Pro

ACE Schedule is free to use for daily planning, and a **Pro** subscription unlocks the project board, deeper reports, unlimited AI import, and the AI guidance features. Pro starts with a **7‑day free trial**, and you can cancel at any time.

| | **Free** | **Pro** |
|---|---|---|
| Daily dashboard & task completion | ✓ | ✓ |
| Weekly schedule builder & custom categories | ✓ | ✓ |
| Notes, subtasks, priorities, recurring & due dates | ✓ | ✓ |
| Streaks & the Track analytics dashboard | ✓ | ✓ |
| Daily brain puzzle (standard) | ✓ | ✓ |
| End‑of‑Day Ceremony | ✓ | ✓ |
| Cloud sync across web + desktop | ✓ | ✓ |
| JSON backup (import & export) | ✓ | ✓ |
| AI schedule import | 1 free import, then Pro | Unlimited |
| Projects & Kanban board | — | ✓ |
| Milestone tracking | — | ✓ |
| Reports (periods, insights, CSV/PDF export) | — | ✓ |
| AI daily guidance & scripture reflections | — | ✓ *(setup required)* |
| AI‑personalised puzzles | — | ✓ *(setup required)* |
| Google Calendar sync | — | ✓ *(setup required)* |

Exact prices, annual billing, and ministry/education discounts are on the **[ACE pricing page](https://ace-presenter.app/pricing)** — that page is the source of truth for current numbers. Upgrade in‑app from any locked feature, or from *Settings*.

> **Note on this table.** The split above reflects how the current build actually gates each feature. Marketing material may group features slightly differently; where they differ, the app's own behaviour — described in these chapters — is authoritative.

---

*ACE Schedule Manager is part of the ACE Suite. This manual documents the web app and the macOS desktop app.*
