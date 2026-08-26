/**
 * /reviews — what operators say after running a real service on ACE.
 *
 * The page is built to hold real reviews and to be honest when it has none.
 * Everything it renders comes from `@/lib/reviews`, which is empty until
 * somebody actually says something we have permission to publish. See the
 * rule at the top of that file before adding anything.
 *
 * Two things are deliberate:
 *
 *  - No AggregateRating markup below MIN_REVIEWS_FOR_AGGREGATE. Google wants
 *    aggregate ratings to describe something real, and a mean over one or two
 *    reviews is noise dressed as data.
 *  - The empty state asks for the first review instead of hiding the page.
 *    A reviews page with nothing on it is a fair thing for a new product to
 *    have. A reviews page with invented quotes is not survivable.
 */
import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HorizonGlow from "@/components/hero/HorizonGlow";
import SectionHeading, { AccentItalic } from "@/components/sections/SectionHeading";
import { ScrollReveal, ScrollStagger, ScrollItem } from "@/components/motion";
import {
  REVIEWS,
  USE_CASE_LABELS,
  averageRating,
  MIN_REVIEWS_FOR_AGGREGATE,
  type Review,
} from "@/lib/reviews";

const REVIEW_EMAIL =
  "mailto:hello@ace-presenter.app" +
  "?subject=" + encodeURIComponent("My ACE review") +
  "&body=" + encodeURIComponent(
    [
      "What happened when you ran a service with ACE:",
      "",
      "",
      "— — —",
      "So we can credit you properly:",
      "Your name:",
      "Role (e.g. tech director, volunteer operator):",
      "Church / venue (only if we may name it):",
      "City:",
      "Out of five:",
      "",
      "We publish nothing without your say-so, and we never edit what you wrote",
      "beyond fixing a typo.",
    ].join("\n")
  );

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "What operators say after running a real service with ACE Presenter.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "ACE Presenter — reviews",
    description:
      "What operators say after running a real service with ACE Presenter.",
    url: "https://www.ace-presenter.app/reviews",
    siteName: "ACE",
    locale: "en_US",
    type: "website",
  },
};

/* ───────────── stars ───────────── */
function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span
      className={`inline-flex gap-0.5 ${className}`}
      role="img"
      aria-label={`${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill={i <= Math.round(rating) ? "#E8183A" : "#2A2A2A"}
          aria-hidden
        >
          <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.6z" />
        </svg>
      ))}
    </span>
  );
}

/* ───────────── one review ───────────── */
function ReviewCard({ review }: { review: Review }) {
  const credit = [review.role, review.venue, review.location]
    .filter(Boolean)
    .join(" · ");
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-[#1F1F1F] bg-[#0E0E0E] p-6 transition hover:border-[#2A2A2A]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Stars rating={review.rating} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#666]">
          {USE_CASE_LABELS[review.useCase]}
        </span>
      </div>
      <blockquote className="flex-1 text-[15px] leading-relaxed text-[#DEDEDE]">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 border-t border-[#1A1A1A] pt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">{review.name}</span>
          {review.verified && (
            <span
              className="rounded-full border border-[#2A3F2A] bg-[#132013] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-[#7BC47B]"
              title="We know this operator ran a live service on ACE"
            >
              Ran a service
            </span>
          )}
        </div>
        {credit && <div className="mt-1 text-xs text-[#888]">{credit}</div>}
      </figcaption>
    </figure>
  );
}

/* ───────────── no reviews yet ───────────── */
function EmptyState() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-[#242424] bg-[#0C0C0C] p-10 text-center">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#666]">
        Nothing here yet
      </p>
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">
        No reviews yet — and we&apos;re not going to invent any.
      </h2>
      <p className="mx-auto mb-8 max-w-lg text-[15px] leading-relaxed text-[#B4B4B4]">
        ACE has been following real services since August, but nobody has yet
        put their experience in writing for us to publish. If one of those
        rooms was yours, you can fix that in about a minute — good or bad. We
        print what you write, we don&apos;t edit it beyond a typo, and we
        don&apos;t name your church unless you tell us we can.
      </p>
      <a
        href={REVIEW_EMAIL}
        className="inline-block rounded-full bg-[#E8183A] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#FF2649]"
      >
        Write the first one →
      </a>
      <p className="mt-6 text-xs text-[#666]">
        Haven&apos;t run it yet?{" "}
        <Link href="/download" className="text-[#999] underline underline-offset-4 transition hover:text-white">
          Download for Mac or Windows
        </Link>{" "}
        — there&apos;s a free tier.
      </p>
    </div>
  );
}

export default function ReviewsPage() {
  const reviews = REVIEWS;
  const avg = averageRating(reviews);
  const showAggregate = reviews.length >= MIN_REVIEWS_FOR_AGGREGATE && avg !== null;

  return (
    <main className="flex flex-1 flex-col font-sans">
      <Nav />

      {/* Rating markup only when it describes something real. */}
      {showAggregate && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "ACE Presenter",
              applicationCategory: "BusinessApplication",
              operatingSystem: "macOS 14+, Windows 10+",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: avg.toFixed(1),
                reviewCount: reviews.length,
                bestRating: 5,
                worstRating: 1,
              },
            }),
          }}
        />
      )}

      <section className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32">
        <HorizonGlow strength={0.5} />
        <div className="relative z-10">
          <SectionHeading
            eyebrow="Reviews"
            title={
              <>
                What happens when the room{" "}
                <AccentItalic>actually runs it</AccentItalic>.
              </>
            }
            lede="Sunday morning is a bad time to find out software doesn't work. These are operators who took that risk, in their own words."
          />

          {showAggregate && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <Stars rating={avg} />
              <span className="text-sm text-[#C4C4C4]">
                <span className="font-semibold text-white">{avg.toFixed(1)}</span>{" "}
                from {reviews.length} review{reviews.length === 1 ? "" : "s"}
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          {reviews.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {reviews.length < MIN_REVIEWS_FOR_AGGREGATE && (
                <p className="mb-8 text-center text-xs text-[#666]">
                  Too few reviews so far to average them into a score that would
                  mean anything. Here they are individually instead.
                </p>
              )}
              <ScrollStagger
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                stagger={0.08}
              >
                {reviews.map((review, i) => (
                  <ScrollItem key={`${review.name}-${review.date}-${i}`}>
                    <ReviewCard review={review} />
                  </ScrollItem>
                ))}
              </ScrollStagger>

              <ScrollReveal className="mt-14 text-center">
                <p className="mb-5 text-[15px] text-[#B4B4B4]">
                  Run a service with ACE? Tell us how it went — including if it
                  went badly.
                </p>
                <a
                  href={REVIEW_EMAIL}
                  className="inline-block rounded-full border border-[#2A2A2A] bg-[#1A1A1A] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#222]"
                >
                  Add your review →
                </a>
              </ScrollReveal>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
