import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SpatialHero from "@/components/spatial/SpatialHero";
import SpatialAudioDemo from "@/components/spatial/SpatialAudioDemo";
import PhoneTour from "@/components/spatial/PhoneTour";

// Concept for the 3.0 look (operator, 2026-11-17). Not linked, not indexed.
// Once approved these sections move into the home and Presenter pages and
// this route is deleted.
export const metadata: Metadata = {
  title: "New look — concept",
  robots: { index: false, follow: false },
};

export default function ConceptPage() {
  return (
    <main className="flex flex-1 flex-col bg-[#09090B] font-sans">
      <Nav />
      <SpatialHero />
      <SpatialAudioDemo />
      <PhoneTour />
      <Footer />
    </main>
  );
}
