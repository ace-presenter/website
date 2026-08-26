# 1 · Getting Started

This chapter takes you from nothing to a working ACE Manager organisation: creating your account, onboarding your organisation, understanding the trial, seeding your departments, learning who can see what, and finding your way around the dashboard.

> **ACE Manager is a web app.** There is nothing to install. Open your browser, go to your ACE Manager address, and sign in. It works on a laptop, a tablet, or a phone, though the staff dashboard is most comfortable on a larger screen. Native mobile apps are *(planned)*, not available today.

---

## Creating your account and organisation

Every ACE Manager account belongs to **one organisation** (your church, ministry, or team). The person who signs up first becomes that organisation's **Admin**.

1. **Sign up.** From the sign-up page, enter your name, email, and a password. This creates your ACE account — the same login used across the ACE Suite.
2. **Your organisation is created.** ACE Manager creates a fresh, private organisation for you. All your data lives inside it and is never mixed with any other organisation's — this is a strict boundary, enforced at the database level.
3. **You land in onboarding.** A short guided wizard sets up the essentials before you reach the dashboard.

### The onboarding wizard

Onboarding is a few quick steps and you can move backward and forward freely:

1. **Welcome** — a brief orientation to what you're about to set up.
2. **About your organisation** — give your organisation a name, pick an **organisation type** (Church, Ministry, Media/Creative, Nonprofit, or Other), and set your **timezone**. The type lightly tailors the vocabulary and defaults; the timezone is important because it drives when the AI agent works and when scheduled messages and digests go out.
3. **Set up departments** — choose which ministry departments or teams to create from a ready-made list (see [Seeding departments](#seeding-departments) below). You can accept the defaults, pick a subset, or skip and add them later.
4. **Finish** — you're taken to your dashboard.

You can **skip onboarding** and configure everything later from *Dashboard ▸ Settings* and *Dashboard ▸ Departments* — nothing here is permanent.

---

## The free trial

The paid plans start with a **14-day free trial**, no charge until it ends, so you can seed your organisation, invite your team, and try the AI agent before committing. The **free tier** has no trial and no time limit — it is simply free, within its capacity limits. See [Plans & billing](#plans--billing).

---

## Seeding departments

Rather than build your ministry structure from scratch, ACE Manager ships with a library of **ready-made departments** grouped into four categories. From onboarding — or later, using the **Seed defaults** button on *Dashboard ▸ Departments* — you can create any of them in one click:

- **Ministry** — Children's Ministry, Youth & Young Adults, Men's & Women's Ministries, Marriage & Family, Evangelism & Missions, Prayer / Intercessory Team, Pastoral Care / Counselling.
- **Worship & Arts** — Music & Worship, Media & Technical, Creative Arts / Drama.
- **Operations & Support** — Administration, Finance & Treasury, Ushering & Protocol, Hospitality / Greeters, Facility & Maintenance, Communications / Publicity.
- **Leadership** — Senior Pastor, Pastors / Administrator, Deacons, Board of Trustees.

Each comes with a name, description, icon, and colour, and you can rename, recolour, add, or remove departments freely. If you are not a church, treat these as a starting template and rework them into your own teams. Full detail is in [Departments, Teams & Small Groups](03-departments-teams-groups.md).

---

## Roles & access

ACE Manager is **role-based**. There are three staff roles inside the dashboard, plus your members, who never touch the dashboard at all.

| Role | Who they are | What they can do |
|---|---|---|
| **Admin** | The organisation owner (and anyone they promote) | Everything. Full access to every dashboard page. Sole right to delete departments, manage billing and integrations, configure the AI agent, and approve agent actions. |
| **Manager** | Trusted leaders and administrators | Nearly everything: manage members, events, giving, rotas, campaigns, reports, and approve agent actions. Cannot delete departments or manage billing and integrations. |
| **Staff** (department leader) | The person who runs a ministry or team | A focused workspace scoped to **their department**: their members, tasks, calendar, messages, campaigns, templates, projects, and files. They do **not** see the organisation-wide Team directory, Departments admin, Integrations, the Agent log, Analytics, or Reports. |
| **Member** | Your congregation / audience | No dashboard access. Members interact only through the self-service **portal** and through messages on their preferred channel. See [The Member Self-Service Portal](09-reports-integrations-portal.md#the-member-self-service-portal). |

**Department scoping is the key idea for Staff.** A department leader sees only their own department's congregation members and their own department's slice of the dashboard. Admins and managers see across every department. This keeps a youth leader focused on the youth ministry while the senior pastor sees the whole organisation.

Roles are assigned from the internal staff directory — see [People ▸ The internal staff directory](02-people-members-and-staff.md#the-internal-staff-directory).

---

## The dashboard at a glance

After sign-in, staff land on the **Dashboard** (`/dashboard`) — the organisation's operational home. Around a left-hand navigation sidebar (which collapses to a mobile nav on small screens), the main overview brings together:

- **Stat cards** — active tasks, team online, agent actions today, pending approvals, and events this week, each with a small trend sparkline.
- **Agent activity** — a live feed of what the AI agent has been doing (assignments, reminders, conflict detection).
- **Tasks** — your prioritised task list with assignees and status.
- **Team** — staff with online / offline indicators.
- **Congregation** — member count, opted-in count, average engagement, and recent members (scoped to your department if you're Staff).
- **Upcoming events** — the next events with location and online/offline badges.
- **Integrations** — connected platforms and their sync status.
- **The floating agent chat** — a button in the bottom-right that opens a conversation with the AI agent from anywhere in the dashboard.

> **Demo data on an empty organisation.** Before you've added your own data, panels show realistic placeholder content so you can see how everything fits together. As soon as you add real members, tasks, and events, your data replaces it.

The navigation is grouped so the pages you use most are near the top. Everything in the sidebar is documented in the chapters that follow.

---

## Plans & billing

ACE Manager uses a **base-plus-usage** model rather than a flat per-person fee: each plan includes a bundle of **member records** and **team seats**, and you add more capacity only if you grow beyond the bundle. Billing is handled securely through Stripe, monthly or annually (annual saves roughly 17%).

| Plan | Base price | Included members | Included team seats | For |
|---|---|---|---|---|
| **Free** | Free | 50 | 3 | Small teams getting organised — dashboard, tasks, one integration. No AI messaging. |
| **Growth** | ~$29 / mo | 150 (extra members ~$0.15 each) | 10 (extra seats ~$3 each) | Growing organisations — AI chat assistant, WhatsApp + email messaging, campaigns, 5 integrations, basic analytics. Starts with a 14-day trial. |
| **Pro** | ~$59 / mo | 500 (extra members ~$0.10 each) | 25 (extra seats ~$2 each) | Established organisations — the **autonomous** AI operations agent, all five messaging channels, unlimited messages and campaigns, AI reports and digests, advanced analytics, custom branding, priority support. 14-day trial. |
| **Enterprise** | ~$149 / mo | 2,000 (extra members ~$0.08 each) | 100 (extra seats ~$1.50 each) | Multi-campus and large networks — a dedicated AI agent instance and the highest limits. Contact sales. |

Add-on modules can extend a plan where a capability isn't bundled. The exact contents of each tier, add-on availability, and final prices are **still being finalised during early access and may change** before general availability — treat the table above as indicative. Manage your subscription, seats, and payment method from *Dashboard ▸ Settings* (Admin only).

---

## Where to go next

- Add your people → [People — Members & Staff](02-people-members-and-staff.md)
- Set up your ministry structure → [Departments, Teams & Small Groups](03-departments-teams-groups.md)
- Turn on the AI agent (and set its boundaries) → [The AI Agent](08-the-ai-agent.md)
