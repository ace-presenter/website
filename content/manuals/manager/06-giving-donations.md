# 6 · Giving & Donations

*Dashboard ▸ Giving* is ACE Manager's giving and donations module: funds, recorded donations, pledges and stewardship campaigns, recurring giving, and year-end contribution statements — with the AI agent watching for lapsed and first-time givers in the background.

The Giving area is organised into tabs — **Donations**, **Funds**, **Recurring**, **Pledges**, and **Statements** — each covered below.

> **Card giving needs Stripe connected.** ACE Manager records giving from any source, but *online* card donations run through Stripe. An administrator connects your organisation's Stripe account once (see [Integrations](09-reports-integrations-portal.md#integrations)); cash, cheque, and bank-transfer giving can be recorded without it.

---

## Funds *(early access)*

A **fund** is a designated pot that giving is directed to — General Fund, Building Fund, Missions, Youth Ministry, and so on. Each fund has a name, description, colour, and an optional **target amount**. Every donation is tagged to a fund, fund balances appear on the dashboard, and where a fund has a target you can track raised-versus-goal.

---

## Recording donations *(early access)*

Donations can reach ACE Manager three ways:

- **By hand** — record a gift with its amount, date, fund, and payment method (cash, card, bank transfer, or cheque), assigned to a member or logged as anonymous.
- **Automatically from online giving** — when a member gives by card, Stripe notifies ACE Manager and the donation is recorded for you, tagged to the right fund and member.
- **Bulk import** — bring in historical bank transfers or payroll giving from a CSV.

Every donation ties back to the giver's profile, building their giving history over time.

---

## Giving profiles *(early access)*

Each member's profile carries a **giving profile**: lifetime giving history, last donation date and amount, whether they're a regular or recurring giver, their year-to-date total, and their giving frequency (weekly, monthly, or sporadic). This gives pastoral and finance teams a complete, respectful picture of each household's generosity.

> **Giving is sensitive.** Giving data is treated with care and shown only to the roles that need it. Consider carefully who in your organisation should have access before enabling it broadly.

---

## Recurring giving *(early access, setup required)*

Members can set up **recurring gifts** — weekly or monthly — through the online giving flow, choosing the fund and amount. Recurring gifts run on Stripe and appear in the **Recurring** tab, where you can see who gives regularly and monitor the health of your regular income.

---

## Pledges & stewardship campaigns *(early access)*

For capital appeals and stewardship drives, create a **giving campaign** with a target — for example, "Building Fund 2026 — Target: £50,000". Members make **pledges** (commitments to give an amount over a period), and ACE Manager tracks **pledged versus received** so you can see fulfilment at a glance. Pledgers who fall behind can be sent gentle, automated reminders by the AI agent.

---

## Contribution statements *(early access)*

At year-end (or on demand), generate **contribution statements** — a PDF per donor summarising their giving, required for tax purposes in most jurisdictions. You can **batch-generate** statements for all active donors and email them directly to members through their preferred channel.

---

## Online giving widget *(early access, setup required)*

For your website, ACE Manager provides a simple, embeddable **giving form**: Stripe-powered, accepting card, Apple Pay, and Google Pay, with fund selection by the donor and optional recurring setup. Donations made through the widget flow straight into the Giving module.

---

## Reporting & the AI agent

Giving rolls up into reports you can pull in a click: total giving by week, month, or year; top donors (with an anonymised option); giving by fund; **lapsed donors** (gave last year, not this year); and **first-time givers** this month.

The AI agent adds a layer competitors don't have:

- It **monitors lapsed donors**: *"12 members who gave last year haven't given yet this year — draft a gentle follow-up?"*
- It surfaces **trends with context**: *"Giving is down 18% vs last March — likely causes: Easter timing, school holidays."*
- It can **thank first-time givers** automatically with a warm, personalised message.

All of this runs within the agent's guardrails and always respects the sensitivity of giving data — see [The AI Agent](08-the-ai-agent.md).

---

## Where to go next

- Connect Stripe → [Integrations](09-reports-integrations-portal.md#integrations)
- Let members see their own giving → [The Member Self-Service Portal](09-reports-integrations-portal.md#the-member-self-service-portal)
- Let the agent chase lapsed givers → [The AI Agent](08-the-ai-agent.md)
