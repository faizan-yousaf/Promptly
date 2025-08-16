import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Promptly - AI-Powered Prompt Generation",
  description: "From Idea to Perfect Prompt — Instantly. AI-powered multilingual SaaS for professional prompt generation with advanced reasoning capabilities.",
  keywords: ["AI", "prompt generation", "multilingual", "SaaS", "artificial intelligence", "automation"],
  authors: [{ name: "Promptly Team" }],
  creator: "Promptly",
  publisher: "Promptly",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://promptly.ai",
    title: "Promptly - AI-Powered Prompt Generation",
    description: "From Idea to Perfect Prompt — Instantly. Generate professional prompts with AI.",
    siteName: "Promptly",
  },
  twitter: {
    card: "summary_large_image",
    title: "Promptly - AI-Powered Prompt Generation",
    description: "From Idea to Perfect Prompt — Instantly. Generate professional prompts with AI.",
    creator: "@promptly",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      <body className={`${inter.variable} antialiased bg-black text-white min-h-screen`}>
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );
}
