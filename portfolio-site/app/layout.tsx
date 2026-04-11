import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jay Boyd — Full-Stack Engineer",
  description:
    "Full-Stack Software Engineer specializing in React, Next.js, Three.JS, and AI. Based in Memphis, TN. Open to full-time roles.",
  openGraph: {
    title: "Jay Boyd — Full-Stack Engineer",
    description:
      "Full-Stack Software Engineer. React, Next.js 15, Three.JS, AI.",
    url: "https://thejayvariable.com",
    siteName: "Jay Boyd",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jay Boyd — Full-Stack Engineer",
    description:
      "Full-Stack Software Engineer. React, Next.js 15, Three.JS, AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
