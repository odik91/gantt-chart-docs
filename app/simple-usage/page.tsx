export default function SimpleUsagePage() {
  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Simple Usage
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300">
          Contoh penggunaan dasar: membuat `tasks`, render{" "}
          <code className="px-1 rounded bg-zinc-100 dark:bg-zinc-800">
            {`<Gantt />`}
          </code>
          , dan menangani perubahan dengan `onChangeTasks`.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          Contoh Kode (Minimal + onChangeTasks)
        </h2>
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 text-zinc-100 p-4">
          <code>{`"use client";

import { useState } from "react";
import {
  Gantt,
  type Task,
  type TaskOrEmpty,
  ViewMode,
} from "@odik91/gantt-task-react";
import "@odik91/gantt-task-react/dist/style.css";

export default function SimpleGanttPage() {
  const [tasks, setTasks] = useState<TaskOrEmpty[]>([
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
      shortName: "PIC-1",
    },
  ]);

  return (
    <div style={{ height: 520 }}>
      <Gantt
        tasks={tasks}
        viewMode={ViewMode.Day}
        onClick={(task) => console.log("clicked:", task)}
        onChangeTasks={(nextTasks) => setTasks([...nextTasks])}
      />
    </div>
  );
}`}</code>
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          Catatan
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
          <li>
            Pastikan komponen dijalankan di client{" "}
            <code className="px-1 rounded bg-zinc-100 dark:bg-zinc-800">
              &quot;use client&quot;
            </code>
            , karena library ini bersifat interaktif.
          </li>
          <li>
            Gunakan state di React untuk menyimpan `tasks`, agar perubahan dari
            drag/edit langsung memutakhirkan tampilan.
          </li>
          <li>
            `Task` wajib punya: `id`, `type`, `name`, `start`, `end`, `progress`.
          </li>
        </ul>
      </section>
    </article>
  );
}

