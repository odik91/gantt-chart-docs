import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@odik91/gantt-task-react/dist/style.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "gantt-task-react Docs",
  description: "Dokumentasi untuk @odik91/gantt-task-react",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-black/5">
          <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
            <div className="font-semibold text-zinc-900 dark:text-zinc-50">
              gantt-task-react Docs
            </div>
            <nav className="flex items-center gap-4 text-sm">
              <Link
                className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                href="/get-started"
              >
                Get Started
              </Link>
              <Link
                className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                href="/installation"
              >
                Installation
              </Link>
              <Link
                className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                href="/simple-usage"
              >
                Simple Usage
              </Link>
              <Link
                className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                href="/advanced-usage"
              >
                Advanced
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10">
          {children}
        </main>

        <footer className="border-t border-black/5">
          <div className="max-w-5xl mx-auto px-6 py-6 text-xs text-zinc-500">
            Built with Next.js (App Router).
          </div>
        </footer>
      </body>
    </html>
  );
}
