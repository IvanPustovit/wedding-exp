import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes, Caveat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  variable: "--font-great-vibes",
  display: 'swap',
});

const caveat = Caveat({
  weight: "700",
  subsets: ["latin", "cyrillic"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Запрошуємо на весілля",
  description: "Запрошуємо на весілля",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ua">
      <body className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${caveat.variable} `}>
        {children}
      </body>
    </html>
  );
}
