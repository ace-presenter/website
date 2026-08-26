# 7 · Communication, Campaigns & Care

Communication is where ACE Manager is genuinely ahead of the field. It reaches members on **their** channel — WhatsApp, SMS, email, Telegram, or Instagram — with templates, scheduled campaigns, and an AI agent that can hold real conversations. This chapter covers outbound messaging (templates and campaigns), internal team messaging, and two care workflows built on top: prayer requests and visitor follow-up.

> **Messaging needs providers connected.** Outbound WhatsApp, SMS, Telegram, and Instagram messaging runs through a messaging provider (Twilio and equivalents), and email runs through a hosted email service. These are *(setup required)*: an administrator connects them once, after which messaging works end-to-end. On the **Free** plan, AI messaging isn't included; on **Growth** you get WhatsApp and email; on **Pro** all five channels are available. See [Plans & billing](01-getting-started.md#plans--billing).

---

## Channels — reaching members where they are *(setup required)*

Every member has a **preferred channel** set on their profile, and every message ACE Manager sends respects it. The five supported channels:

| Channel | Best for |
|---|---|
| **WhatsApp** | The primary channel for most congregations — highest open rates, conversational |
| **SMS** | A reliable fallback and urgent reminders |
| **Email** | Longer content, newsletters, receipts, and statements |
| **Telegram** | Tech-savvy members and group broadcasts |
| **Instagram DMs** | A younger audience, event promotion, and engagement |

Members also control **frequency** (all updates / important only / minimal), **topics of interest**, **quiet hours**, and **language** from their profile and the portal, so you reach people the way they've asked to be reached.

---

## Message templates *(available)*

*Dashboard ▸ Templates* holds reusable message templates so common messages are consistent and quick.

- Insert **variables** like `{{first_name}}`, `{{event_name}}`, and `{{time}}` — they're filled in per recipient automatically.
- Templates can be **channel-specific** (a WhatsApp template, an SMS template, an email template), and WhatsApp templates track their approval status.
- Toggle **AI personalisation** on a template to let the agent tailor the wording to each member rather than sending it verbatim.

---

## Campaigns *(available; delivery requires providers)*

*Dashboard ▸ Campaigns* sends a message to many members at once — a broadcast.

- **Campaign types** — event reminder, welcome, birthday, announcement, follow-up, devotional, volunteer confirmation, or a custom message.
- **Channels** — send on a single channel or several at once; each member still receives it on their preferred one.
- **Targeting** — everyone, a specific group, a tag, or a hand-picked selection of members.
- **Status flow** — Draft → Scheduled → Sending → Sent (or Cancelled). Schedule a campaign to go out at a chosen time and it respects members' quiet hours.
- **Delivery stats** — per campaign, see sent, delivered, read, replied, and failed counts.

### Automated message moments

Beyond broadcasts, ACE Manager sends the right message at the right moment automatically (all drafted in your agent's voice):

- **Welcome** when a member registers.
- **Service and event reminders** ahead of time (24 h / 2 h / 30 min, configurable), without spamming.
- **Birthday and anniversary** greetings, scheduled from profile data, with optional personal notes from leaders.
- **Post-event follow-ups** that gather feedback (*"How was Sunday? Reply 1–5 ⭐"*) and route a low rating to pastoral care.
- **Volunteer confirmations** for rotas (see [Volunteer Rotas & Serving](05-volunteer-rotas-serving.md)).
- **Devotionals** on a schedule set by leadership.

---

## Two-way conversations *(setup required)*

Members can **reply** to any message and have a genuine conversation. The AI agent understands context, remembers the member's history, pulls live answers from your data (*"What time is service this Sunday?"*, *"Can I sign up for youth volunteering?"*), and hands off to a human the moment a topic is sensitive. How the agent behaves, and every guardrail around it, is documented in [The AI Agent](08-the-ai-agent.md).

---

## Internal messaging *(available)*

Separate from member communication, *Dashboard ▸ Messages* is the **staff** communication hub — think of it as your team's internal chat.

- **Channels** for teams and topics, plus **1:1 direct messages** with a searchable member picker (existing DMs are reused rather than duplicated).
- **Department channels** — admins and managers create a channel that automatically includes a whole department.
- **Announcements** — admins post to the entire organisation or to selected departments.
- **Message deletion** — you can delete your own messages; admins can remove any message. Deletions are soft (the message shows as removed) and always confirmed first.

Who can create which channel type is role-based: staff can start direct messages and project channels; managers add department channels; only admins create announcements.

---

## Prayer requests *(early access)*

*Dashboard ▸ Prayer Requests* is a care workflow no mainstream competitor offers with AI.

- **Members submit** a request — a title, details, and a **privacy level** (public, leadership only, or pastor only), with an anonymous option. Requests can also come in through the portal or by message.
- **The prayer board** lets leadership see active requests sorted by newest, unanswered, or urgent, filter by department, privacy, or assigned pastor, and mark each as Praying, Answered, or Closed.
- **AI-drafted responses** — the agent drafts a pastoral reply in your configured voice, but for prayer requests it **never sends without a pastor's approval**. The pastor reviews, edits, and sends via the member's channel.
- **Follow-up** — an automatic check-in after seven days (*"We're still praying for you — how are things?"*), and marking a request Answered invites a praise report.
- **Analytics** — request volume, average response time, and AI-tagged common themes (health, relationships, finances, work).

---

## Visitor follow-up *(early access)*

New visitors are the highest-value contacts a church has, and *Dashboard ▸ Visitor Follow-up* makes sure none are missed.

- **Capture** visitors from a welcome-card form (shareable or embeddable), a quick "I met someone today" add from the attendance module, or a QR code at the entrance that lets visitors self-register on their phone.
- **Care pathway** — configure a sequence of touchpoints triggered by a first visit. A typical pathway: a same-day welcome, a personal note from a pastor on day 3, a small-group invitation on day 7, a pastoral check-in on day 14, and a membership invitation on day 30. Each step waits a set number of days, then sends on a chosen channel.
- **Pathway builder** — build custom sequences step by step. The AI drafts each message; staff can personalise before it sends, and any step can be **manual** (needs a person to act) or **automated** (the agent sends it).
- **Tracking** — see every visitor in the pipeline, what stage they're at, when they were last contacted, and whether they've replied.
- **Convert to member** — one button turns a visitor into a full member record, migrating their data and triggering a welcome-to-the-family message.

---

## Where to go next

- Understand the intelligence behind all of this → [The AI Agent](08-the-ai-agent.md)
- Set members' channels and preferences → [People — Members & Staff](02-people-members-and-staff.md)
- Measure engagement → [Reports & Analytics](09-reports-integrations-portal.md#reports--analytics)
