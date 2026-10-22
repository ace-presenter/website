import type { Metadata } from "next";
import TopupResult from "@/components/TopupResult";

export const metadata: Metadata = {
  title: "Purchase cancelled",
  description: "You left checkout. No charge was made.",
  alternates: { canonical: "/billing/topup-cancel" },
  robots: { index: false },
};

export default function TopupCancel() {
  return (
    <TopupResult eyebrow="Checkout closed" title="No charge was made">
      <p>
        You left checkout before paying, so nothing was bought and your card
        wasn&rsquo;t charged.
      </p>
      <p>
        Go back to ACE Presenter whenever you&rsquo;re ready — you can buy
        more drafts or minutes from there at any time.
      </p>
    </TopupResult>
  );
}
