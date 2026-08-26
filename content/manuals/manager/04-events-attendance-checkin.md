# 4 · Events, Attendance & Check-in

This chapter covers the full lifecycle of a gathering: planning an event, taking registrations and payment, recording who attended your services, and running secure children's check-in for families ministry.

---

## Events & the calendar *(available)*

*Dashboard ▸ Events* (and the *Calendar* view) is where you plan everything from a weekly service to a one-off conference.

- **Create events** with a title, date and time, location, and an online/offline designation.
- **Calendar views** — see events by day, week, or month.
- **Recurring events** — set up weekly services and monthly meetings once.
- **Reminders** — the AI agent automatically reminds attendees and organisers as an event approaches (see [The AI Agent](08-the-ai-agent.md)); reminder timing is configurable.

Events also feed the dashboard's **Upcoming events** panel and drive post-event follow-up tasks.

---

## Event registration & payment *(early access, setup required for paid events)*

Events can go beyond a calendar entry and take **registrations** — free, paid, or donation-based.

### Setting up registration

When you enable registration on an event, you can define:

- **Pricing** — free, paid, or donation-based.
- **Ticket types** — Adult, Student, Child, VIP, Early Bird, and so on, each with its own price.
- **Capacity and waitlist** — cap the numbers, with a waitlist when full.
- **Registration deadline.**
- **Custom questions** — ask registrants anything you need (dietary requirements, T-shirt size, and the like).
- **Promo codes** — percentage or fixed discounts.

> **Paid registration needs Stripe connected.** Card payments run through Stripe, so paid tickets only work once an administrator has connected your organisation's Stripe account (see [Integrations](09-reports-integrations-portal.md#integrations)). Free events work without it.

### The registration flow

Members register from the **portal** or a shared link. For paid events they pay by card (Apple Pay and Google Pay included) through Stripe checkout, then receive a confirmation over email or WhatsApp with the event details, a **QR-code ticket** for check-in, and a calendar invite (.ics).

### On the day — event check-in

Open the event's check-in view and either **scan the QR ticket** or search by name to mark someone as arrived. Walk-ups can be registered at the door.

### Managing registrants

Admins and managers see the full registrant list with payment status, can **export to CSV**, **message all registrants** at once, and process **refunds** through Stripe. When the event is full and someone cancels, the first person on the **waitlist** is automatically invited and given 24 hours to confirm.

---

## Service attendance *(early access)*

*Dashboard ▸ Attendance* records who came to your regular gatherings — the data behind pastoral care and growth tracking.

### Taking attendance

1. **Create a service record** — for example, "Sunday Service — 1 June, 10:00 am", with a type (main, midweek, or special) and location.
2. **Mark who attended** — search and tick off members, or pull the attendance straight from children's check-in.
3. **Record visitors** — add someone who isn't yet a member; they enter the visitor follow-up pathway (see [Communication, Campaigns & Care](07-communication-campaigns-care.md#visitor-follow-up)).
4. **Count summary** — total attendance, first-timers, members, and children.

### Attendance history and pastoral alerts

- Every **member profile** carries an attendance timeline (present / absent / visitor), an attendance rate over the last 30, 90, and 365 days, and a **last-attended** date on their card.
- **Absentee alerts** — the AI engagement monitor flags members who haven't attended in a configurable number of weeks (default four) and creates a follow-up task for their department leader, escalating to a pastor after longer absences. This is one of ACE Manager's most valued pastoral features: nobody quietly slips away unnoticed.

### Trends

Attendance rolls up into week-on-week graphs, month-over-month comparisons, year-on-year for the same Sunday (to account for seasons), and a department breakdown showing which ministries are growing. See [Reports & Analytics](09-reports-integrations-portal.md#reports--analytics).

---

## Children's check-in *(early access)*

Secure children's check-in is a **safeguarding** feature, not a convenience — and it is built to be safe by default. It runs at *Dashboard ▸ Children's Check-in* for staff, with a dedicated full-screen **kiosk** for families.

### The check-in flow

1. A parent arrives and finds their family by typing a name or phone number.
2. They select which children to check in and which class or group each child is joining.
3. The system prints a **security label** for the child (name, class, a one-time security code, and today's date) and a **matching parent stub** carrying only the code.
4. The security code is random and changes every session, uniquely linking that child to that parent for that day.

### Labels and medical flags

Labels are designed for standard label printers (DYMO LabelWriter and Brother QL series). A child's label carries a **QR code** linking to their record for quick lookup, and if the child has an **allergy or medical note**, it is flagged prominently so staff are alerted before the child is admitted to class.

### Kiosk mode

The **kiosk** (`/kiosk`) turns a tablet or iPad into a self-service check-in station: full-screen, tap-to-search, keyboard hidden. Alternatively, staff can run an assisted station from a desk with a computer.

### Check-out — the safeguarding gate

A child is only released when the returning adult presents the **matching security code**. A mismatch alerts staff and the child is held — there is no release without a code match. Each class keeps a **live register** of who is currently checked in, and if a child hasn't been collected a set time after the service ends, staff are alerted to a **late collection**. Historical registers are searchable by date and class.

---

## Where to go next

- Schedule the volunteers who run these events → [Volunteer Rotas & Serving](05-volunteer-rotas-serving.md)
- Follow up with first-time visitors → [Communication, Campaigns & Care](07-communication-campaigns-care.md#visitor-follow-up)
- Turn attendance into insight → [Reports & Analytics](09-reports-integrations-portal.md#reports--analytics)
