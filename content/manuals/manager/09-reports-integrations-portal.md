# 9 · Reports, Analytics, Integrations & the Portal

This final chapter covers the three surfaces that surround everything else: the **reports and analytics** that turn your data into insight, the **integrations** that connect ACE Manager to the tools you already use, and the **member self-service portal** that lets your congregation manage themselves.

---

## Reports & Analytics

### Reports & digests *(early access)*

*Dashboard ▸ Reports* (admin and manager only) is where generated reports live — chiefly the AI **weekly and daily digests**. Rather than compiling updates by hand, you get a written summary of what happened across the organisation, produced by the agent and filed automatically each morning. You can also generate department reports, attendance summaries, and giving reports on demand.

The distinction ACE Manager draws is that reports are **generated, not compiled** — the work of gathering and summarising is done for you.

### Analytics *(early access)*

*Dashboard ▸ Analytics* (admin and manager only) presents the trends behind the numbers, as theme-aware charts:

- **Attendance** — week-on-week, month-over-month, and year-on-year for the same Sunday, with a department breakdown.
- **Volunteer engagement** — who's serving, who's over- or under-serving.
- **Task completion** — how much is getting done, and where things stall.
- **Giving** — totals by period and by fund, lapsed and first-time givers.
- **Member engagement** — engagement scores and sentiment across the congregation.
- **Department performance** — a comparative view across ministries.

Charts adapt to light and dark themes and are designed to be readable at a glance.

### Activity feed *(available)*

*Dashboard ▸ Activity* is a live, chronological feed of what's happening across the organisation — a quick pulse for anyone who wants to see recent changes without opening every module.

---

## Integrations

*Dashboard ▸ Integrations* (admin and manager only) connects ACE Manager to the tools you already run. Integrations are being switched on progressively during early access — the panel shows each connection and its sync status, and some are further along than others.

| Integration | What it does | Status |
|---|---|---|
| **Stripe** | Payments behind giving, event registration, and your subscription | *(setup required)* — connect your Stripe account to accept card payments |
| **Google Workspace** | Calendar (two-way sync), Drive (files), Gmail | *(rolling out)* — calendar sync is the priority; Drive and Gmail follow |
| **Planning Center** | Import church rosters, schedules, and volunteer data | *(rolling out)* |
| **Zoom** | Video links for online small groups and meetings | *(rolling out)* |
| **Social platforms** | Instagram, YouTube, and others for content and engagement signals | *(planned / partial)* |
| **Slack / Teams** | Bring team messaging into ACE Manager | *(planned)* |

> **Honest status.** Stripe is the most mature integration because giving and registration depend on it. The others are being wired up during early access — the connection cards are present, and each lights up as it's completed. Check the Integrations panel for the current state on your account, and treat anything marked *(planned)* as not yet available.

### CCLI song-use reporting *(planned)*

For churches using ACE Presenter to run worship, ACE Manager is designed to **capture song usage automatically**: when a song cue goes live during a service, ACE Presenter can notify ACE Manager, which logs the title, artist, CCLI number, and date, then generates the monthly CCLI report churches are legally required to file — replacing the usual spreadsheet. This cross-product integration is on the roadmap and pairs ACE Manager with [ACE Presenter](../../manual/README.md).

---

## The Member Self-Service Portal

The **portal** is the member-facing side of ACE Manager — a lightweight, mobile-first area where your congregation manages themselves, taking a large share of routine admin off your staff. It is deliberately separate from the dashboard, which members never see.

### No account, no password *(early access)*

Members don't sign up or remember a password. Instead, they open a **personal link** you send them — a secure, single-purpose link that *is* their authorisation. Tap it and the portal opens straight to their own information. If a link expires, they simply request a fresh one; there's nothing to reset. This is intentional: the easiest possible way in for people who aren't technical, on the phone in their pocket.

### What members can do

From the portal, a member can:

- **See their serving** — upcoming rota assignments, with **accept / decline / swap** on each, plus their unavailability calendar and serving history (see [Volunteer Rotas & Serving](05-volunteer-rotas-serving.md)).
- **Manage events** — see the events they're registered for, and **register** for new ones (paying by card where the event is paid).
- **Browse and join small groups** — discover open groups, filter by day, location, type, or language, and join or request to join (see [Departments, Teams & Small Groups](03-departments-teams-groups.md)).
- **See their giving** — a summary of their own donations, where giving is enabled.
- **Submit prayer requests** and see responses (see [Communication, Campaigns & Care ▸ Prayer requests](07-communication-campaigns-care.md#prayer-requests)).
- **Follow church announcements.**

### Managing their own details

Members keep their own record up to date — contact details, profile photo, emergency contact, and their **communication preferences**: which channel to reach them on for which kind of notification, their quiet hours, and their language. Because members maintain this themselves, your directory stays accurate without staff effort.

### Specialised portal links

Alongside the main hub, ACE Manager can send members focused links for a single task — confirming a **rota** assignment, submitting a **prayer** request, or responding to a **visitor follow-up** — so a WhatsApp message can drop them straight onto the one screen they need.

> **The portal is mobile-first by design.** Until native mobile apps arrive, the portal is how members use ACE Manager on their phones — and it's built for exactly that. Staff, meanwhile, work in the dashboard, which is best on a larger screen.

---

## The end of the manual

You've now seen every part of ACE Manager: setting up your organisation and people, structuring departments and groups, running events and check-in, scheduling volunteers, tracking giving, communicating across every channel, directing the AI agent, and giving members self-service. As an early-access product, ACE Manager is still growing quickly — modules marked *(early access)*, *(rolling out)*, and *(planned)* will keep maturing, and this manual will be updated as they do.

- Back to the [overview and table of contents](README.md)
- Start setting up → [Getting Started](01-getting-started.md)
