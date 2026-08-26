# 4 · AI Schedule Import

*(Pro — 1 free import on the free tier · setup required)*

The fastest way to fill your week is to **photograph the plan you already have** and let ACE Schedule read it. Point your camera at a printed syllabus, a timetable, a planner page, or a whiteboard; the app extracts the tasks, times, and categories and drops them into your weekly schedule for you to review.

- [What it does](#what-it-does)
- [Where to find it](#where-to-find-it)
- [Supported files](#supported-files)
- [Using it, step by step](#using-it-step-by-step)
- [Free imports vs Pro](#free-imports-vs-pro)
- [Getting good results](#getting-good-results)
- [What "setup required" means](#what-setup-required-means)
- [Troubleshooting](#troubleshooting)

---

## What it does

AI Schedule Import takes an image or document of a schedule and turns it into structured tasks, organised **by day of the week**. Behind the scenes it uses a vision‑capable AI model to read the content and a language model to structure it, then hands the result back to you as a set of tasks — each with a **time**, a **title**, and a **category** — ready to merge into your weekly template.

You always **review before it's final**: import fills in the Schedule Builder, and you can edit, reorder, or delete anything before relying on it.

---

## Where to find it

The importer lives in the **Schedule Builder**:

1. Open **Settings** from the avatar menu.
2. Go to the **Schedule Builder** panel.
3. Turn on **Use custom schedule** — the **Import Schedule from File** card appears.

(If custom schedule is off, the importer is hidden, because there's no editable week for it to fill.)

---

## Supported files

You can upload:

- **Images** — PNG, JPG/JPEG. These give the **best** results.
- **PDF** — a timetable or planner exported to PDF.
- **TXT** — a plain‑text schedule.

**Maximum file size: 10 MB.** Images of a clear, well‑lit schedule are the most reliable input; photographs of handwriting can work when the writing is legible, but printed text and screenshots are more dependable.

---

## Using it, step by step

1. In the importer card, click **Click to upload** (or drag a file onto it).
2. The file uploads securely to your account's private storage, and the card shows **Uploading…**.
3. The AI then reads and structures the schedule — the card shows **Processing with AI…**. This usually takes a few seconds.
4. On success you'll see a confirmation with the **number of tasks found**, and the extracted tasks are merged into your weekly template.
5. **Review the result** in the Schedule Builder: adjust times, rename tasks, fix categories, reorder, and remove anything that isn't right (see [Chapter 3](03-weekly-planner.md)).

Imported days replace the corresponding days in your template where the AI found tasks, so it's easy to import one course or one week at a time and build up your plan.

---

## Free imports vs Pro

- **Free tier:** **one** AI import, ever. It's there so you can try the feature on a real schedule. The card shows how many free imports remain.
- Once your free import is used, the importer shows a **locked** state with an **Upgrade to Pro** button.
- **Pro:** **unlimited** imports — bring in every course outline at the start of a semester, or re‑import whenever your plan changes.

---

## Getting good results

- Use a **clear, high‑resolution** image; avoid glare and shadows.
- Prefer **structured layouts** — tables, lists, and timetables read best.
- Keep the schedule **in frame** and roughly upright.
- For printed material, a **screenshot or scan** beats a photo.
- Handwriting can work if it's neat; if a handwritten import comes back messy, tidy it up in the builder or type those tasks manually.

---

## What "setup required" means

AI Schedule Import is a **real, shipping feature**, and its full interface — upload, progress, results, quota — is always present. The intelligence behind it runs as a hosted AI service that must be **configured for your deployment** (an administrator provides the AI service credentials and deploys the processing function).

- On a **fully configured Pro deployment**, import works end‑to‑end as described.
- If the service isn't configured, the upload will report a processing error rather than returning tasks. In that case, build your week manually in the [Schedule Builder](03-weekly-planner.md) — nothing else is affected.

If you administer your own deployment, see the setup notes shipped with the product for enabling the AI processing function and its credentials.

---

## Troubleshooting

| Symptom | Likely cause & fix |
|---|---|
| *"Please upload a valid file"* | The file isn't a supported type. Use PNG, JPG, PDF, or TXT. |
| *"File too large"* | The file exceeds 10 MB. Reduce the resolution or crop it. |
| *Processing fails* | The image may be unreadable — try a clearer one — or the AI service isn't configured for your account (see [above](#what-setup-required-means)). |
| *Wrong times or categories* | Normal for messy inputs. Correct them in the [Schedule Builder](03-weekly-planner.md); the AI's output is a draft, not the last word. |
| *Importer card isn't showing* | Turn on **Use custom schedule** in the Schedule Builder. |

---

**Next:** [Projects, Kanban & Milestones →](05-projects-kanban-milestones.md)
