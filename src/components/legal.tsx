import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/**
 * Shared building blocks for the legal pages (Privacy, Terms, DPA).
 *
 * These pages are long-form prose, so the primitives here mirror a small
 * markdown vocabulary — numbered sections, lettered sub-sections, paragraphs,
 * and bullet lists — styled to match the dark ACE site chrome.
 */

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <article className="max-w-3xl mx-auto px-6 py-16 text-white">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
          Legal
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-[#C4C4C4] mb-12">{updated}</p>
        {children}
      </article>
      <Footer />
    </>
  );
}

export function Meta({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12 rounded-lg border border-[#2A2A2A] bg-[#0F0F0F] p-5 text-sm leading-relaxed text-[#C4C4C4] space-y-1">
      {children}
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-white tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      {children}
    </div>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[#D4D4D4] leading-relaxed mb-4">{children}</p>;
}

export function Bullets({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mb-4 space-y-2 pl-5 list-disc marker:text-[#C8102E] text-[#D4D4D4] leading-relaxed">
      {children}
    </ul>
  );
}

export function Ordered({ children }: { children: React.ReactNode }) {
  return (
    <ol className="mb-4 space-y-2 pl-5 list-decimal marker:text-[#C8102E] text-[#D4D4D4] leading-relaxed">
      {children}
    </ol>
  );
}

export function Mail() {
  return (
    <a
      href="mailto:hello@ace-presenter.app"
      className="text-[#E8183A] hover:text-white transition font-semibold"
    >
      hello@ace-presenter.app
    </a>
  );
}
