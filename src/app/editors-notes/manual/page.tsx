import type { Metadata } from "next";
import ProductManualPage from "@/components/manual/ProductManualPage";
import { MANUAL_HTML, MANUAL_NAV } from "./manual.generated";

export const metadata: Metadata = {
  title: "Editors' Notes Manual",
  description:
    "The complete ACE Editors' Notes user manual — timecoded notes for DaVinci Resolve on macOS, click-to-seek, marker import, and on-device AI.",
  alternates: { canonical: "/editors-notes/manual" },
};

export default function Page() {
  return (
    <ProductManualPage
      productKey="editorsNotes"
      productLabel="Contents"
      kicker="ACE · Editors' Notes"
      lede="The complete guide to ACE Editors' Notes — timecoded notes for DaVinci Resolve on macOS, where every timecode jumps the playhead to the exact frame."
      nav={MANUAL_NAV}
      html={MANUAL_HTML}
      pdfHref="/manuals/editors-notes.pdf"
    />
  );
}
