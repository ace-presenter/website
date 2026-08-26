import { products, type ProductKey } from "@/lib/brand";

/**
 * Manual banner — sits between Nav and the page Hero on a product page.
 * An accent strip linking to that product's user manual (in-site reader +
 * downloadable PDF), themed to the product's colour.
 *
 * Backward-compatible: called with no props it renders the ACE Presenter
 * banner exactly as before (/presenter/manual + /ACE-Presenter-Manual.pdf).
 * Other product pages pass their own product/title/readHref/pdfHref.
 *
 * No version number — platforms are not on the same version, so any single
 * number here is wrong for one of them. The reader always reflects the
 * committed manual content.
 */

type ManualBannerProps = {
  /** Product accent to theme the strip. Defaults to presenter. */
  product?: ProductKey;
  /** Headline, e.g. "ACE Schedule User Manual — Web & macOS". */
  title?: string;
  /** In-site reader route, e.g. "/schedule/manual". */
  readHref?: string;
  /** Downloadable PDF, e.g. "/manuals/schedule.pdf". Omit to hide the button. */
  pdfHref?: string | null;
};

export default function ManualBanner({
  product = "presenter",
  title = "ACE Presenter User Manual — Mac & Windows",
  readHref = "/presenter/manual",
  pdfHref = "/ACE-Presenter-Manual.pdf",
}: ManualBannerProps = {}) {
  const b = products[product];
  return (
    <div
      className="px-4 sm:px-6 py-3 border-b text-white"
      style={{ background: b.accent, borderColor: "rgba(0,0,0,0.28)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span className="font-bold text-sm sm:text-base tracking-tight">{title}</span>
        </div>
        <span className="hidden sm:inline text-white/70 text-sm">—</span>
        <div className="flex items-center gap-2 sm:gap-3">
          {pdfHref ? (
            <a
              href={pdfHref}
              className="font-extrabold text-sm sm:text-base px-4 py-2 rounded-full bg-white hover:bg-[#F5F5F5] transition shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
              style={{ color: b.accent }}
              download
            >
              Download PDF
            </a>
          ) : null}
          <a
            href={readHref}
            className="font-bold text-sm sm:text-base px-4 py-2 rounded-full text-white transition border border-white/20 hover:bg-black/25"
            style={{ background: "rgba(0,0,0,0.22)" }}
          >
            Read online
          </a>
        </div>
      </div>
    </div>
  );
}
