"use client";

import { useState } from "react";

function CommandBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Fallback sederhana bila clipboard tidak tersedia.
      setCopied(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onCopy}
        className="absolute top-3 right-3 z-10 inline-flex items-center justify-center rounded-md border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-800 hover:bg-white dark:bg-black/40 dark:text-zinc-100 dark:hover:bg-black/60"
      >
        {copied ? "Copied" : "Copy"}
      </button>

      <pre className="overflow-x-auto rounded-xl bg-zinc-900 text-zinc-100 p-4 pt-10">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function InstallationPage() {
  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Installation
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300">
          Cara install paket dan catatan penting untuk Next.js.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          Install via npm
        </h2>
        <CommandBlock code={`npm i @odik91/gantt-task-react`} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          Import CSS
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Paket ini mengandalkan stylesheet di `dist/style.css`. Pada Next.js
          App Router, cara paling aman adalah meng-`import` global CSS di
          `app/layout.tsx`.
        </p>
        <CommandBlock
          code={`// app/layout.tsx
import "@odik91/gantt-task-react/dist/style.css";`}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          Installation untuk React
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Paket ini punya peer dependency untuk <code>react</code> dan{" "}
          <code>react-dom</code>. Di proyek Next.js, biasanya React sudah
          terpasang, jadi tidak perlu install ulang.
        </p>

        <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
          <li>
            Untuk Next.js: React sudah tersedia (cukup pastikan versi React
            kompatibel).
          </li>
          <li>
            Untuk project React lain: install peer dependency berikut.
          </li>
        </ul>

        <CommandBlock code={`npm i react react-dom`} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          Requirements
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
          <li>
            Engine paket: Node.js &gt;= <code>18</code>.
          </li>
          <li>
            Peer dependency: <code>react</code> dan <code>react-dom</code>.
            Versi React 18+ atau 19 juga kompatibel.
          </li>
        </ul>
      </section>
    </article>
  );
}

