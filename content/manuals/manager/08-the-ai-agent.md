# 8 · The AI Agent

The AI agent is what makes ACE Manager more than a database. It is an **operations assistant** that runs quietly in the background — assigning tasks, sending reminders, answering members, watching for people who are drifting, and drafting reports — and that you can also just *talk to*. Crucially, it works **within boundaries you set**, keeps a full audit trail, and asks before doing anything high-stakes.

This chapter explains what the agent does, how to give it a personality, the three modes it can run in, and — most importantly — every guardrail that keeps it safe.

> **The agent depends on setup.** It runs on a hosted AI service and, for member messaging, on your connected messaging providers. On a fully configured **Pro** account it works end-to-end; where the AI service or providers aren't connected, the interface is still there and ACE Manager degrades gracefully — you do the work manually and the agent panels stay quiet. Autonomous operation is a Pro capability; lower tiers get the chat assistant. See [Plans & billing](01-getting-started.md#plans--billing).

---

## What the agent does

### Talk to it — the agent chat

A **floating chat button** in the bottom-right of the dashboard opens a conversation with the agent from anywhere. Ask it questions in plain language and it answers from your live data:

- *"Who's available this Sunday?"*
- *"How many tasks are overdue?"*
- *"Show me all staff in the worship department."*
- *"Which members haven't been seen in a month?"*

Behind the scenes the agent turns your question into a query against your organisation's data and answers with real numbers — it does not guess. It can also **propose actions** (assign a task, draft a reminder) which, depending on its mode, it either does directly or offers for your approval.

### Work on its own — background automations

Even when nobody is logged in, the agent runs scheduled jobs to keep operations moving:

| Automation | When | What it does |
|---|---|---|
| **Daily digest** | Each morning | Summarises yesterday's activity across the organisation and files it as a report for admins |
| **Task reminders** | Through the day | Nudges people about overdue and due-soon tasks (de-duplicated so nobody is nagged) |
| **Event reminders** | Hourly | Reminds attendees and organisers about events in the next 24 hours |
| **Engagement monitor** | Each morning | Flags members inactive 30+ days or with low engagement, so pastoral care can follow up |

It also drafts the routine member messages described in [Communication, Campaigns & Care](07-communication-campaigns-care.md) — welcomes, birthdays, rota confirmations, follow-ups — and, on incoming WhatsApp or SMS, can **auto-reply** in your agent's voice using the recent conversation for context.

---

## Giving the agent a personality *(available)*

From *Dashboard ▸ Settings ▸ Personality*, you shape how the agent sounds so it feels like part of *your* team:

- **Name** — what the agent is called (many churches name it, e.g. "Grace Assistant").
- **Personality & tone** — friendly, formal, casual, pastoral, or friendly-pastoral.
- **Emoji use** — off, or minimal / moderate / frequent.
- **Response length** — a cap so replies stay brief.
- **Sign-off** — an optional closing line.
- **System prompt** — free-form additional instructions for anything specific to your organisation.
- **Knowledge** — point the agent at your website and an FAQ so it answers from your own information.

---

## The three modes

The agent runs in one of three modes, set by an admin. This single choice determines how much it does on its own:

| Mode | Behaviour |
|---|---|
| **Autonomous** | The agent carries out routine actions directly, without asking — auto-assigning volunteers, sending reminders, replying to common questions. High-stakes actions still require approval (see below). *(Pro)* |
| **Approval only** | The agent proposes everything and waits for a human to approve before acting. Nothing goes out without a click. |
| **Chat only** | The agent answers questions and gives suggestions, but never proposes or takes actions. Purely informational. |

Start in **approval only** or **chat only** while you build trust, then move to **autonomous** once you're comfortable with what the agent does.

---

## Guardrails — how the agent is kept safe

ACE Manager's agent is deliberately constrained. These guardrails are always in force.

### Human-in-the-loop for high-stakes actions

Anything consequential — budget decisions, public communications, staffing changes, and **prayer-request responses** — requires a human's approval before it happens, even in autonomous mode. Proposed actions appear in the **Agent log** and as **pending approvals** on the dashboard, where an admin or manager approves, edits, or rejects them.

### Working hours and quiet hours

The agent only acts within the **working hours** you configure (with a separate weekend toggle), so members aren't messaged at 2 a.m. and staff aren't nudged overnight. Member-facing messages additionally respect each member's own **quiet hours**.

### A daily action limit

A configurable **maximum daily actions** cap prevents the agent from ever doing too much in a day — a safety ceiling on autonomous activity.

### It never fabricates, and it protects privacy

The agent is instructed to reference **only your real organisation data** — it does not invent facts, figures, or member details. It is also instructed to protect member privacy and treats sensitive data (giving, pastoral notes) with care.

### Escalation and pastoral-care handling

You define **escalation keywords** (like "emergency", "crisis", "urgent") that immediately alert leadership and pull the agent out of the conversation, and **pastoral-care keywords** (grief, illness, personal struggle) that route the conversation to a human on the pastoral team rather than the AI. The agent's line is always: *"I'm connecting you with [name] who can help you with this."* You can also give it a list of **topics to avoid** entirely.

### Everything is logged — the audit trail

Every action the agent takes is written to the **Agent log** (*Dashboard ▸ Agent*, admin and manager only): what it did, when, why, and what triggered it. Nothing the agent does is invisible. Ask it *"Why did you assign this to John?"* and it will explain its reasoning.

### The kill switch

If anything ever feels wrong, an admin can **pause all autonomous actions instantly**. The agent stops acting on its own immediately; you can resume when you're ready. This is the ultimate backstop — you are always in control.

---

## Interaction modes at a glance

| Mode | You do | Agent does |
|---|---|---|
| **Autonomous** | Set the rules | Acts on routine work directly |
| **Approval** | Approve / reject | Proposes, then waits |
| **Chat** | Ask | Answers and suggests |
| **Override** | Correct it ("assign Sarah instead") | Adjusts to your instruction |

---

## Where to go next

- Configure modes, hours, and limits → *Dashboard ▸ Settings* (Admin)
- See what the agent has done → *Dashboard ▸ Agent* (the audit log)
- Understand the messaging it drafts → [Communication, Campaigns & Care](07-communication-campaigns-care.md)
