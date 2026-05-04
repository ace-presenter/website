import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ACE — AI-powered live presentation",
  description:
    "ACE listens to your live audio, identifies what's being said or sung, and pushes the right slide to the audience screen. For worship teams, conferences, lectures, and live events.",
  metadataBase: new URL("https://ace-presenter.app"),
  openGraph: {
    title: "ACE — AI-powered live presentation",
    description:
      "ACE listens, you present. Worship, conferences, lectures, theater — one app that follows the speaker.",
    url: "https://ace-presenter.app",
    siteName: "ACE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE — AI-powered live presentation",
    description: "ACE listens, you present.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0d12] text-zinc-100 selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}
