import type { Metadata } from "next";
import TopupResult from "@/components/TopupResult";
import { AccentItalic } from "@/components/sections";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your extra Ask ACE drafts or cloud-detection minutes are on their way to your ACE account.",
  alternates: { canonical: "/billing/topup-success" },
  robots: { index: false },
};

export default function TopupSuccess() {
  return (
    <TopupResult eyebrow="Payment received" title={<>Thank <AccentItalic>you</AccentItalic></>}>
      <p>
        Your extra drafts or minutes are added to your ACE account as soon as
        Stripe confirms the payment — usually within a minute.
      </p>
      <p>
        Go back to ACE Presenter. They count from your next Ask ACE draft or
        your next listen, after the ones your plan includes this month.
      </p>
      <p className="text-base text-[#888]">
        If you paid by bank debit or another delayed method, they&rsquo;re added
        when that payment clears.
      </p>
    </TopupResult>
  );
}
