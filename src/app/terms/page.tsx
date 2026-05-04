export const metadata = { title: "Terms — ACE" };

export default function Terms() {
  return (
    <article className="prose prose-invert max-w-3xl mx-auto px-6 py-20">
      <h1>Terms of Service</h1>
      <p className="text-[#A3A3A3]">Last updated: 2026-05-04 · Placeholder</p>

      <h2>License</h2>
      <p>
        ACE is licensed, not sold. By downloading and installing ACE, you accept
        a non-transferable, revocable license to use the software for personal
        or commercial presentation purposes.
      </p>

      <h2>No warranty</h2>
      <p>
        ACE is provided "as is" without warranty of any kind. While we work hard
        to make it reliable for live events, you remain responsible for testing
        and having a fallback plan.
      </p>

      <h2>Beta period</h2>
      <p>
        During the public beta (first 90 days post-launch), ACE is free to
        download and use. After the beta, paid tiers will be introduced.
        Existing beta users will be grandfathered into the Standard tier free
        for life.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Don't use ACE to transcribe or display content you don't have rights to.
        Don't reverse-engineer or redistribute the binaries.
      </p>

      <h2>Contact</h2>
      <p>
        Legal: <a href="mailto:hello@ace-presenter.app">hello@ace-presenter.app</a>.
      </p>
    </article>
  );
}
