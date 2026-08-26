# 8 · Account, Sync, Backup & Settings

This chapter is the reference for everything in **Settings**: your account, appearance and language, notifications, Google Calendar, backup, how sync works, keeping the desktop app up to date, and deleting your account.

- [Opening Settings](#opening-settings)
- [Your account & profile](#your-account--profile)
- [Appearance](#appearance)
- [Language](#language)
- [Notifications](#notifications)
- [Push notifications](#push-notifications)
- [Google Calendar sync](#google-calendar-sync)
- [Backup: import & export](#backup-import--export)
- [How sync works](#how-sync-works)
- [Keeping the Mac app up to date](#keeping-the-mac-app-up-to-date)
- [Help & the guided tour](#help--the-guided-tour)
- [Deleting your account](#deleting-your-account)

---

## Opening Settings

Open the **avatar menu** in the top‑right and choose **Settings**. The page is organised into collapsible sections; click a section header to expand it. Choose **Back to dashboard** to leave.

---

## Your account & profile

The **Account** card shows your avatar, display name, email, sign‑in provider (Google, Apple, or email & password), and the month you joined. It also has your **Sign out** button.

Your ACE account is **shared across the ACE Suite**, so the same login works in other ACE apps and your data carries over. Signing out returns you to the sign‑in screen; your data stays safe in the cloud and is there again when you sign back in.

---

## Appearance

Under **Appearance**, choose your theme:

- **Light**
- **Dark**
- **System** — follows your device's appearance (the Mac app tracks macOS light/dark automatically).

The choice applies instantly and is remembered per account.

---

## Language

ACE Schedule's interface is fully translated. Under **Language**, pick from:

- **English**
- **Español** (Spanish)
- **Français** (French)
- **Português** (Portuguese)
- **Italiano** (Italian)

The change takes effect immediately across the app.

---

## Notifications

Under **Daily Rhythm & AI** you'll find the in‑app notification preferences and the daily‑puzzle timing:

- **Daily puzzle time** — when the day's puzzle prompt lands.
- **Daily puzzle**, **End of day**, **Weekly review** — toggle each reminder on or off.
- **Sound** — enable or mute notification sounds.

This is also where the [AI guidance](06-guidance-and-ceremony.md) toggles live.

---

## Push notifications

The **Push notifications** section (desktop and supported browsers) controls system‑level alerts. First, **Enable** notifications and grant permission when prompted. Then tune:

- **Morning briefing** — a start‑of‑day summary, with a configurable **time**.
- **Streak protection** — a nudge before you'd break a completion streak.
- **Weekly review** — a prompt to review your week.
- **Focus (Do Not Disturb)** — suppress notifications during focus time.
- **Advanced** — a **maximum number of notifications per day**, and **quiet hours** (start and end) during which nothing is sent.

If you previously **blocked** notifications in your browser or OS, the app can't re‑enable them itself — you'll need to allow them again in your browser/system settings, and the panel will tell you so.

---

## Google Calendar sync

*(Pro · setup required)*

The **Google Calendar** section connects ACE Schedule to your Google Calendar so your day's tasks can be pushed out as calendar events. **Connect** to authorise, then use **Sync … tasks for today** to send the day's tasks to your calendar; the panel shows when it last synced, and **Disconnect** unlinks it.

- This is a **Pro** feature.
- It is **setup‑dependent**: a Google API client ID must be configured for the deployment. If it isn't, the panel shows a notice explaining what an administrator needs to add before Calendar sync will work.
- Today's build pushes **tasks out to Google Calendar**. Deeper, fully two‑way calendar synchronisation is on the roadmap *(coming soon)*.

---

## Backup: import & export

Under **Import & Export** you can take a **full backup** of your data as **JSON**:

- **Export data** — downloads a JSON file containing your schedule, tasks, and settings.
- **Import data** — restores from a previously exported JSON file. (Only valid JSON exports are accepted; you'll get a clear message if a file can't be read.)

This is the right tool for **backing up**, **moving between accounts**, or keeping an archive. For period **reports** as spreadsheets, use the CSV/PDF export on the [Reports](07-tracking-analytics-reports.md#exporting-your-data) tab instead.

---

## How sync works

ACE Schedule stores your data in your ACE account in the cloud and keeps it **in sync in real time** across everywhere you're signed in. Plan on your laptop's browser at lunch and the same plan is on your Mac app that evening. Projects, in particular, update live — a change on one device appears on the others without a manual refresh.

There's nothing to configure: sync is automatic whenever you're signed in and online. (A dedicated offline mode with background sync is on the roadmap *(coming soon)*; for now the app needs a connection to load and save.)

---

## Keeping the Mac app up to date

The macOS app **updates itself**. When a new version is available it downloads in the background and shows a toast in the corner with a progress bar and a **Restart & Install** button; click it to apply the update, or it installs automatically the next time you quit. You'll always know what changed — the update prompt links to that version's release notes.

The web app is always current — just reload.

---

## Help & the guided tour

Under **Help**, choose **Restart guided tour** to replay the first‑run walkthrough of the dashboard any time you want a refresher.

For questions the manual doesn't cover, the in‑app **Support** page (and the [ACE Schedule website](https://ace-presenter.app/schedule)) have help and FAQs.

---

## Deleting your account

At the bottom of Settings is the **Danger Zone**. **Delete account** permanently removes your account and all associated data, and clears the app's local data on this device. You'll be asked to confirm first. **This cannot be undone** — export a [JSON backup](#backup-import--export) first if you might want your data later.

---

*You've reached the end of the manual. Jump back to the [overview and table of contents](README.md), or revisit [Getting Started](01-getting-started.md).*
