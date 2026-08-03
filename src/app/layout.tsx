import type { Metadata } from "next";
import "./globals.css";
import { CommandPalette } from "@/components/features/CommandPalette";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Awesome AI Dev Tools",
  description: "The largest curated collection of AI tools, frameworks, MCP servers, agents, prompts, and resources for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {children}
        <CommandPalette />
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
