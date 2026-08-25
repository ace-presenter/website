/**
 * Manual banner — sits between Nav and the page Hero on Presenter pages.
 * Brand-red strip advertising the latest versioned user manual (PDF + HTML).
 *
 * The manual is shipped under a stable, version-agnostic filename
 * (/manual/ACE_User_Manual.{html,pdf}) so the banner never 404s
 * between releases.
 *
 * It does not name a version, and the manual itself no longer carries one. The
 * two platforms are not on the same version number, so any single number here
 * is wrong for one of them — and it went stale the moment a release shipped,
 * which is how this banner ended up advertising a manual two versions behind
 * the app while the file it linked to was four months old.
 */

export default function ManualBanner() {
  return (
    <div className="bg-[#C8102E] text-white px-4 sm:px-6 py-3 border-b border-[#A00D26]">
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
          <span className="font-bold text-sm sm:text-base tracking-tight">
            ACE Presenter User Manual — Mac &amp; Windows
          </span>
        </div>
        <span className="hidden sm:inline text-white/70 text-sm">—</span>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/manual/ACE_User_Manual.pdf"
            className="font-extrabold text-sm sm:text-base px-4 py-2 rounded-full bg-white text-[#C8102E] hover:bg-[#FFF0F2] transition shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
            download
          >
            Download PDF
          </a>
          <a
            href="/manual/ACE_User_Manual.html"
            className="font-bold text-sm sm:text-base px-4 py-2 rounded-full bg-[#7A0A1C] text-white hover:bg-[#5C0815] transition border border-white/20"
          >
            Read HTML
          </a>
        </div>
      </div>
    </div>
  );
}
