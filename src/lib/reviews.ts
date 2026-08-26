/**
 * Reviews — what real operators said after running a real service.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  THE ONE RULE: nothing goes in this file that a real person did not say.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Not a paraphrase of something someone probably felt, not a composite of
 * several conversations, not a line written here and approved over the phone.
 * An invented review is fraud whichever way it is framed, and in this market
 * it is also the single fastest way to lose the room: worship tech is a small
 * world that talks to itself, and a quote with a church name on it will be
 * checked by someone who knows that church.
 *
 * The page reads from this array. While it is empty the page says so, plainly,
 * and asks for the first one. An honest empty state costs a little credibility
 * once; a fabricated quote costs all of it, permanently.
 *
 * TO ADD A REAL ONE
 *   1. Get it in writing — email or message, not a remembered conversation.
 *   2. Get explicit permission to publish the name and the venue. "You can
 *      quote me" is not permission to name their church.
 *   3. Paste it verbatim. Fix typos and nothing else. If it needs a trim, cut
 *      from the ends and never from the middle; no ellipses that change the
 *      sense of what was said.
 *   4. Set `verified` true only if you personally know they ran a service on
 *      ACE. It drives a visible badge, so it is a claim in its own right.
 *   5. Keep `sourceNote` for yourself — where the quote came from, so the next
 *      person can find the original. It is never rendered.
 */

export type UseCase = "worship" | "conference" | "lecture" | "theater";

export interface Review {
  /** Verbatim. See the rule above. */
  quote: string;
  /** As they asked to be credited. */
  name: string;
  /** Optional: "Tech director", "Volunteer operator". */
  role?: string;
  /** Church, venue, school, company — only with permission to name it. */
  venue?: string;
  /** "Lagos, Nigeria" / "Leeds, UK". Optional. */
  location?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  useCase: UseCase;
  /** ISO date of the service or event they are describing. */
  date: string;
  /** True only if we know they ran a real service on ACE. Renders a badge. */
  verified: boolean;
  /** Internal only — never rendered. Where the quote came from. */
  sourceNote?: string;
}

/**
 * Empty on purpose. ACE has been running in real rooms since August, but no
 * operator has yet put anything in writing that we have permission to publish.
 * The moment one does, it goes here and the page changes shape on its own.
 */
export const REVIEWS: Review[] = [];

export const USE_CASE_LABELS: Record<UseCase, string> = {
  worship: "Worship",
  conference: "Conferences",
  lecture: "Lectures",
  theater: "Theater",
};

/** Mean rating, or null when there is nothing to average. */
export function averageRating(reviews: Review[]): number | null {
  if (reviews.length === 0) return null;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

/**
 * Google requires an AggregateRating to describe something real, and thin
 * samples make a mean meaningless anyway — one five-star review is not a
 * five-star product. Below this count the page shows the reviews without
 * claiming an aggregate, and emits no rating markup at all.
 */
export const MIN_REVIEWS_FOR_AGGREGATE = 5;
