"use client";

import { useMemo, useState } from "react";
import type { TaskOrEmpty, ViewMode as ViewModeType } from "@odik91/gantt-task-react";
import { Gantt, ViewMode } from "@odik91/gantt-task-react";

function GanttDemo({
  tasks,
  viewMode,
  title,
  code,
}: {
  tasks: TaskOrEmpty[];
  viewMode: ViewModeType;
  title: string;
  code: string;
}) {
  const [nextTasks, setNextTasks] = useState<TaskOrEmpty[]>(tasks);

  return (
    <section className="space-y-3">
      <div className="rounded-xl border border-black/5 bg-white dark:bg-black">
        <div className="p-3 text-sm text-zinc-600 dark:text-zinc-300 border-b border-black/5">
          {title}
        </div>
        <div className="overflow-x-auto overflow-y-hidden w-full">
          <div
            style={{
              height: 520,
              minWidth: 1800,
              width: "max-content",
            }}
          >
            <Gantt
              tasks={nextTasks}
              viewMode={viewMode}
              onChangeTasks={(t) => setNextTasks([...t])}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          Contoh Kode: {title}
        </h2>
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 text-zinc-100 p-4">
          <code>{code}</code>
        </pre>
      </div>
    </section>
  );
}

export default function SimpleUsagePage() {
  const viewMode = useMemo(() => ViewMode.Day, []);

  const codeBasic = `"use client";

import { useState } from "react";
import { Gantt, ViewMode, type TaskOrEmpty } from "@odik91/gantt-task-react";
import "@odik91/gantt-task-react/dist/style.css";

export default function SimpleGantt() {
  const [tasks, setTasks] = useState<TaskOrEmpty[]>([
    {
      id: "p1",
      type: "project",
      name: "Project Alpha",
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 10),
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
    },
    {
      id: "t2",
      type: "task",
      parent: "p1",
      name: "Implementation",
      start: new Date(2020, 1, 3),
      end: new Date(2020, 1, 7),
      progress: 10,
    },
  ]);

  return (
    <div style={{ height: 520, overflowX: "auto" }}>
      <div style={{ minWidth: 1800, width: "max-content" }}>
        <Gantt
          tasks={tasks}
          viewMode={ViewMode.Day}
          onChangeTasks={(nextTasks) => setTasks([...nextTasks])}
        />
      </div>
    </div>
  );
}`;

  const codeWithAvatar = `"use client";

import { useState } from "react";
import {
  Gantt,
  ViewMode,
  type TaskOrEmpty,
} from "@odik91/gantt-task-react";
import "@odik91/gantt-task-react/dist/style.css";

export default function GanttWithAvatar() {
  const [tasks, setTasks] = useState<TaskOrEmpty[]>([
    {
      id: "p2",
      type: "project",
      name: "Project Beta",
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 10),
      progress: 0,
      isDisabled: true,
    },
    {
      id: "t3",
      type: "task",
      parent: "p2",
      name: "Design review",
      shortName: "Ana",
      avatarUrl: "https://i.pravatar.cc/48?img=12",
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 4),
      progress: 60,
    },
    {
      id: "t4",
      type: "task",
      parent: "p2",
      name: "Development",
      shortName: "Budi",
      avatarUrl: "https://i.pravatar.cc/48?img=32",
      start: new Date(2020, 1, 4),
      end: new Date(2020, 1, 8),
      progress: 20,
    },
  ]);

  return (
    <div style={{ height: 520, overflowX: "auto" }}>
      <div style={{ minWidth: 1800, width: "max-content" }}>
        <Gantt
          tasks={tasks}
          viewMode={ViewMode.Day}
          onChangeTasks={(nextTasks) => setTasks([...nextTasks])}
        />
      </div>
    </div>
  );
}`;

  const tasksBasic = useMemo<TaskOrEmpty[]>(
    () => [
      {
        id: "p1",
        type: "project",
        name: "Project Alpha",
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 10),
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
      },
      {
        id: "t2",
        type: "task",
        parent: "p1",
        name: "Implementation",
        start: new Date(2020, 1, 3),
        end: new Date(2020, 1, 7),
        progress: 10,
      },
    ],
    []
  );

  const tasksWithAvatar = useMemo<TaskOrEmpty[]>(
    () => [
      {
        id: "p2",
        type: "project",
        name: "Project Beta",
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 10),
        progress: 0,
        isDisabled: true,
      },
      {
        id: "t3",
        type: "task",
        parent: "p2",
        name: "Design review",
        shortName: "Ana",
        avatarUrl: "https://i.pravatar.cc/48?img=12",
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 4),
        progress: 60,
      },
      {
        id: "t4",
        type: "task",
        parent: "p2",
        name: "Development",
        shortName: "Budi",
        avatarUrl: "https://i.pravatar.cc/48?img=32",
        start: new Date(2020, 1, 4),
        end: new Date(2020, 1, 8),
        progress: 20,
      },
    ],
    []
  );

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

      <GanttDemo
        tasks={tasksBasic}
        viewMode={viewMode}
        title="Simple Gantt"
        code={codeBasic}
      />

      <GanttDemo
        tasks={tasksWithAvatar}
        viewMode={viewMode}
        title="Gantt dengan Avatar"
        code={codeWithAvatar}
      />

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

