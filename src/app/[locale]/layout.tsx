import type { Metadata } from "next";
import "../globals.css";
import { CommandPalette } from "@/components/features/CommandPalette";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { BookmarkProvider } from "@/components/providers/BookmarkProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://awesome-ai-tools.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Awesome AI Tools — 2,582 Skills & 68 Subagents Suite",
    template: "%s | Awesome AI Tools",
  },
  description: "The premier open-source suite of 2,582 AI Skills, 68 Specialist Subagents, and Multi-Agent Workflows for Claude Code, Cursor, and Google Antigravity.",
  keywords: [
    "AI skills",
    "subagents",
    "Claude Code skills",
    "Cursor rules",
    "Google Antigravity",
    "multi-agent workflows",
    "AI developer tools",
    "TDD cycle",
    "AgentShield",
  ],
  authors: [{ name: "Dimas Rahmanda Alfarizi" }],
  creator: "Dimas Rahmanda Alfarizi",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "id_ID",
    url: BASE_URL,
    title: "Awesome AI Tools — 2,582 Skills & 68 Subagents Suite",
    description: "The premier open-source suite of 2,582 AI Skills, 68 Specialist Subagents, and Multi-Agent Workflows.",
    siteName: "Awesome AI Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awesome AI Tools — 2,582 Skills & 68 Subagents Suite",
    description: "The premier open-source suite of 2,582 AI Skills, 68 Specialist Subagents, and Multi-Agent Workflows.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      en: "/en",
      id: "/id",
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <BookmarkProvider>
              {children}
              <CommandPalette />
              <Toaster theme="dark" position="bottom-right" />
            </BookmarkProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
