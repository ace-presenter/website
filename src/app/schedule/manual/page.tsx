import type { Metadata } from "next";
import ProductManualPage from "@/components/manual/ProductManualPage";
import { MANUAL_HTML, MANUAL_NAV } from "./manual.generated";

export const metadata: Metadata = {
  title: "Schedule Manual",
  description:
    "The complete ACE Schedule user manual — planning your week with AI, running each day, projects and analytics. On the web and macOS.",
  alternates: { canonical: "/schedule/manual" },
};

export default function Page() {
  return (
    <ProductManualPage
      productKey="schedule"
      productLabel="Contents"
      kicker="ACE · Schedule"
      lede="The complete guide to ACE Schedule — plan your week with AI, run each day, and track your progress. On the web and macOS."
      nav={MANUAL_NAV}
      html={MANUAL_HTML}
      pdfHref="/manuals/schedule.pdf"
    />
  );
}
