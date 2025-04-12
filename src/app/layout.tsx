import type { Metadata } from "next";
import { Geist, Geist_Mono, Work_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/ThemeToggle";
import { ThemeScript } from "@/components/ThemeScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minerva",
  description: "MinervaAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${workSans.variable} ${workSans.variable} antialiased work-sans-text`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
