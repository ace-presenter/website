import type { Metadata } from "next";
import ProductManualPage from "@/components/manual/ProductManualPage";
import { MANUAL_HTML, MANUAL_NAV } from "./manual.generated";

export const metadata: Metadata = {
  title: "World Guide",
  description:
    "A preview guide to ACE World — the 3D virtual venue where your audience joins as avatars, watches your live feed together, and hears each other in spatial voice.",
  alternates: { canonical: "/world/manual" },
};

export default function Page() {
  return (
    <ProductManualPage
      productKey="world"
      productLabel="Contents"
      kicker="ACE · World"
      lede="A preview guide to ACE World — the 3D virtual venue where your audience joins as avatars, watches your live feed together, and hears each other in spatial voice."
      nav={MANUAL_NAV}
      html={MANUAL_HTML}
      pdfHref="/manuals/world.pdf"
    />
  );
}
