import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Title template — the home page sets `title` directly; child pages
  // (segment landings, /support, etc.) supply their own title and the
  // template wraps it as `<their title> | ACE`. Keeps brand visible
  // without forcing every page to repeat the suffix.
  title: {
    default: "ACE — Agentic Cue Experience",
    template: "%s | ACE",
  },
  description:
    "AI-powered live presentation for worship, conferences, lectures, and theater. ACE listens to the room and pushes the right slide — automatically.",
  metadataBase: new URL("https://www.ace-presenter.app"),
  applicationName: "ACE",
  keywords: [
    "ai presenter",
    "worship presentation software",
    "propresenter alternative",
    "ai slide control",
    "automatic slide advance",
    "lyric detection",
    "bible verse detection",
    "church presentation software",
    "conference slide automation",
    "lecture presentation software",
    "theater cue software",
    "live event slides",
  ],
  authors: [{ name: "ACE", url: "https://www.ace-presenter.app" }],
  creator: "ACE",
  publisher: "ACE",
  // Canonical fallback — child pages override via their own
  // `alternates.canonical`. Without this, search engines may index
  // tracking-param variants of the home page as separate URLs.
  alternates: {
    canonical: "/",
  },
  // Explicit robots directives — defaults are usually fine but being
  // explicit eliminates any "are bots indexing me?" question.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Presentation Software",
  // openGraph + twitter image fields are filled in automatically from
  // the colocated `opengraph-image.tsx` — Next.js wires the generated
  // 1200×630 PNG into both <meta property="og:image"> and
  // <meta name="twitter:image">. Don't duplicate the URLs here.
  openGraph: {
    title: "ACE — Agentic Cue Experience",
    description:
      "ACE listens, you present. Worship, conferences, lectures, theater — one app that follows the speaker.",
    url: "https://www.ace-presenter.app",
    siteName: "ACE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE — Agentic Cue Experience",
    description: "ACE listens, you present. AI-powered live presentation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0F0F0F] text-white selection:bg-[#C8102E]/40">
        {children}
      </body>
    </html>
  );
}
