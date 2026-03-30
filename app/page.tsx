import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Dokumentasi `@odik91/gantt-task-react`
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300">
          Mulai dari `get started`, instalasi, penggunaan sederhana, sampai
          penggunaan advance lengkap dengan contoh kode.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/get-started"
          className="rounded-xl border border-black/5 bg-white/60 dark:bg-white/5 px-4 py-4 hover:bg-white dark:hover:bg-white/10"
        >
          <div className="font-medium text-zinc-900 dark:text-zinc-50">
            Get Started
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Langkah cepat render Gantt
          </div>
        </Link>
        <Link
          href="/installation"
          className="rounded-xl border border-black/5 bg-white/60 dark:bg-white/5 px-4 py-4 hover:bg-white dark:hover:bg-white/10"
        >
          <div className="font-medium text-zinc-900 dark:text-zinc-50">
            Installation
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Perintah install + catatan Next.js
          </div>
        </Link>
        <Link
          href="/simple-usage"
          className="rounded-xl border border-black/5 bg-white/60 dark:bg-white/5 px-4 py-4 hover:bg-white dark:hover:bg-white/10"
        >
          <div className="font-medium text-zinc-900 dark:text-zinc-50">
            Simple Usage
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Contoh tasks + handler dasar
          </div>
        </Link>
        <Link
          href="/advanced-usage"
          className="rounded-xl border border-black/5 bg-white/60 dark:bg-white/5 px-4 py-4 hover:bg-white dark:hover:bg-white/10"
        >
          <div className="font-medium text-zinc-900 dark:text-zinc-50">
            Advanced
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Hierarki, dependencies, localization, dan styling
          </div>
        </Link>
      </div>
    </section>
  );
}
