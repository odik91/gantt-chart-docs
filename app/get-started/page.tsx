"use client";

import { useMemo } from "react";
import { Gantt, ViewMode, type Task } from "@odik91/gantt-task-react";

export default function GetStartedPage() {
  const viewDate = useMemo(() => new Date(2020, 1, 1), []);

  const tasks = useMemo<Task[]>(
    () => [
      // Root project so the task list has a hierarchy to render.
      {
        id: "p1",
        type: "project",
        name: "Project Alpha",
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 6),
        progress: 0,
        isDisabled: true,
      },
      {
        id: "t1",
        type: "task",
        parent: "p1",
        name: "Idea",
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 3),
        progress: 45,
        shortName: "Ana",
      },
      {
        id: "t2",
        type: "task",
        parent: "p1",
        name: "Implementation",
        start: new Date(2020, 1, 3),
        end: new Date(2020, 1, 6),
        progress: 10,
        shortName: "Budi",
      },
    ],
    []
  );

  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Get Started
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300">
          Berikut langkah cepat untuk menampilkan Gantt chart dengan{" "}
          <code className="px-1 rounded bg-zinc-100 dark:bg-zinc-800">
            @odik91/gantt-task-react
          </code>
          .
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          Langkah Cepat
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
          <li>Install paket dengan `npm`.</li>
          <li>Import CSS `dist/style.css`.</li>
          <li>Siapkan array `tasks` (tipe `Task`).</li>
          <li>
            Render komponen{" "}
            <code className="px-1 rounded bg-zinc-100 dark:bg-zinc-800">
              {`<Gantt tasks={tasks} />`}
            </code>
            .
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          Contoh Minimal
        </h2>
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 text-zinc-100 p-4">
          <code>{`"use client";

import { useMemo } from "react";
import { Gantt, type Task, ViewMode } from "@odik91/gantt-task-react";
import "@odik91/gantt-task-react/dist/style.css";

export default function SimpleGantt() {
  const tasks = useMemo<Task[]>(
    () => [
      {
        id: "t1",
        type: "task",
        name: "Idea",
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 2),
        progress: 45,
      },
      {
        id: "t2",
        type: "task",
        name: "Implementation",
        start: new Date(2020, 1, 2),
        end: new Date(2020, 1, 6),
        progress: 10,
      },
    ],
    []
  );

  return (
    <div style={{ height: 480 }}>
      <Gantt tasks={tasks} viewMode={ViewMode.Day} />
    </div>
  );
}`}</code>
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          Demo Render (Realtime)
        </h2>
        <div className="rounded-xl border border-black/5 bg-white dark:bg-black">
          <div className="p-3 text-sm text-zinc-600 dark:text-zinc-300 border-b border-black/5">
            Contoh tasks diambil dari snippet di atas.
          </div>
          <div className="overflow-x-auto overflow-y-hidden w-full">
            <div
              style={{
                height: 520,
                // Prevent shrink so the internal Gantt layout can exceed viewport width.
                minWidth: 1800,
                width: "max-content",
              }}
            >
              <Gantt
                tasks={tasks}
                viewMode={ViewMode.Day}
                viewDate={viewDate}
              />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

