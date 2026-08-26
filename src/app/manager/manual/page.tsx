import type { Metadata } from "next";
import ProductManualPage from "@/components/manual/ProductManualPage";
import { MANUAL_HTML, MANUAL_NAV } from "./manual.generated";

export const metadata: Metadata = {
  title: "Manager Manual",
  description:
    "The complete ACE Manager user manual — running your organisation's people, departments, rotas, giving, events, communication, and the AI agent.",
  alternates: { canonical: "/manager/manual" },
};

export default function Page() {
  return (
    <ProductManualPage
      productKey="manager"
      productLabel="Contents"
      kicker="ACE · Manager"
      lede="The complete guide to ACE Manager — run your organisation's people, departments, rotas, giving, events, and communication, with an AI agent doing the routine work."
      nav={MANUAL_NAV}
      html={MANUAL_HTML}
      pdfHref="/manuals/manager.pdf"
    />
  );
}
