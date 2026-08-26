# 5 · Volunteer Rotas & Serving

Every church and team lives or dies by its volunteer schedule — who is on the sound desk, who is welcoming at the door, who is teaching the children this Sunday. ACE Manager's **rotas** module handles this properly: not just a task list, but a repeating schedule of roles across your ministry teams, with unavailability, accept/decline, and swaps built in.

*Dashboard ▸ Rotas* is where leaders build and publish rotas; members manage their own serving from the portal.

> **Rotas are different from tasks.** A task is a one-off thing to do. A rota is a recurring schedule of *positions* to fill — Sound Lead, Drums, Vocals, Welcome — week after week, from a pool of qualified volunteers.

---

## Building a rota *(early access)*

### Serving teams and roles

First, define the **serving teams** that use rotas — Sound Team, Welcome, Children's Church, Worship, Ushers, and so on — and the **roles** within each. A worship team might have Lead Vocals, Backing Vocals, Keys, Drums, and Bass; the sound team might have Sound Lead and Monitor Engineer. Each role can specify a minimum required and a maximum allowed.

### The rota grid

Create a rota for a team and you get a **grid view**: dates across the top, roles down the left, so you can see at a glance who is serving when.

- **Drag-and-drop** volunteers into positions and dates.
- **Rotation logic** can auto-rotate through a pool of qualified volunteers so the same people aren't always on.
- **Clone a previous rota** as a starting point instead of building from scratch.
- **Recurring rotas** — weekly, bi-weekly, monthly, or custom.

### Clash detection

As you build, ACE Manager warns you about conflicts:

- The same person scheduled for two overlapping roles on the same day.
- A volunteer scheduled on a date they've marked **unavailable**.

Conflicts can be a **hard block** or a **soft warning**, configurable per role.

---

## Unavailability *(early access)*

Volunteers mark the dates they can't serve — from the portal — before you build the rota. Admins see this unavailability up front, and a forward-looking calendar answers the everyday question, *"Who's available on 15 June?"* This is what keeps a rota realistic rather than a wishlist.

---

## Publishing, accept & decline *(early access)*

A rota has a lifecycle:

1. **Draft** — visible only to you while you build it.
2. **Publish** — each assigned volunteer is automatically notified on their preferred channel (WhatsApp, email, or SMS). The AI agent drafts the message: *"Hi [name], you're on [role] this Sunday [date]. Can you confirm?"*
3. **Accept or decline** — each volunteer confirms or declines their assignment, with a deadline you can set per rota.
4. **On a decline** — you're notified and can reassign or find cover. The AI agent can suggest suitable replacements.
5. **Re-publish** — when you change a published rota, only the volunteers whose assignment actually changed are re-notified, so nobody gets spurious messages.

---

## Swaps *(early access)*

Life happens, and volunteers need to swap. A volunteer can request a **swap** with another eligible team member; the request goes to both parties for confirmation, and admins see all pending swaps in one place. The AI agent can suggest suitable swap candidates based on role, availability, and how recently each person has served.

---

## Serving history & over-serving *(early access)*

The rota module remembers who served when. You can:

- View **who served on any past date**.
- Confirm whether a scheduled volunteer **actually showed up** (this ties into [attendance](04-events-attendance-checkin.md#service-attendance)).
- See a **serving-frequency report** — who is over-serving and who is under-serving.

The AI agent watches for burnout and will flag it: *"Marcus has served 6 of the last 7 Sundays — consider resting him."* Caring for volunteers is as important as filling the slots.

---

## What members see

From the **portal**, each volunteer sees only what concerns them: their upcoming assignments, with **accept / decline / swap** on each, their unavailability calendar, and their own serving history. They never touch the dashboard. See [The Member Self-Service Portal](09-reports-integrations-portal.md#the-member-self-service-portal).

---

## Where to go next

- Set up the teams that serve → [Departments, Teams & Small Groups](03-departments-teams-groups.md)
- Let the agent chase confirmations → [The AI Agent](08-the-ai-agent.md)
- Give volunteers their self-service view → [The Member Self-Service Portal](09-reports-integrations-portal.md#the-member-self-service-portal)
