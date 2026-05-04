import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Terms — ACE" };

export default function Terms() {
  return (
    <>
      <nav className="px-6 sm:px-10 py-5 flex items-center justify-between border-b border-[#1A1A1A]">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="ACE" width={32} height={32} className="rounded-md" />
          <span className="font-bold tracking-tight text-lg">ACE</span>
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16 text-white">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
          Legal
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-[#C4C4C4] mb-12">Last updated: 2026-05-04 · Placeholder</p>

        <Section title="License">
          ACE is licensed, not sold. By downloading and installing ACE, you accept
          a non-transferable, revocable license to use the software for personal
          or commercial presentation purposes.
        </Section>

        <Section title="No warranty">
          ACE is provided &quot;as is&quot; without warranty of any kind. While we work hard
          to make it reliable for live events, you remain responsible for testing
          and having a fallback plan.
        </Section>

        <Section title="Beta period">
          During the public beta (first 90 days post-launch), ACE is free to
          download and use. After the beta, paid tiers will be introduced.
          Existing beta users will be grandfathered into the Standard tier free
          for life.
        </Section>

        <Section title="Acceptable use">
          Don&apos;t use ACE to transcribe or display content you don&apos;t have rights to.
          Don&apos;t reverse-engineer or redistribute the binaries.
        </Section>

        <Section title="Contact">
          Legal:{" "}
          <a href="mailto:hello@ace-presenter.app" className="text-[#E8183A] hover:text-white transition font-semibold">
            hello@ace-presenter.app
          </a>.
        </Section>
      </article>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-3 text-white">{title}</h2>
      <p className="text-[#D4D4D4] leading-relaxed">{children}</p>
    </section>
  );
}
