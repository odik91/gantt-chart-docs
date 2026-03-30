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
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 text-zinc-100 p-4">
          <code>{`npm i @odik91/gantt-task-react`}</code>
        </pre>
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
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 text-zinc-100 p-4">
          <code>{`// app/layout.tsx
import "@odik91/gantt-task-react/dist/style.css";`}</code>
        </pre>
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

