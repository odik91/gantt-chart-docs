export default function AdvancedUsagePage() {
  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Advanced Usage
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300">
          Contoh advanced: hierarchy task, syncing range parent dari children,
          dependency arrows, localization/holiday, dan styling kustom.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          1) Hierarki + sync parent dates dari children
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Untuk data dari API/import, gunakan helper{" "}
          <code className="px-1 rounded bg-zinc-100 dark:bg-zinc-800">
            syncParentDateRangeFromChildren
          </code>{" "}
          supaya `start/end` parent mengikuti rentang children langsung.
        </p>
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 text-zinc-100 p-4">
          <code>{`"use client";

import { useMemo, useState } from "react";
import {
  Gantt,
  type Task,
  type TaskOrEmpty,
  ViewMode,
  syncParentDateRangeFromChildren,
  formatTaskTitleWithPic,
} from "@odik91/gantt-task-react";
import "@odik91/gantt-task-react/dist/style.css";

const rawTasks: Task[] = [
  // Parent project (di-disable agar tidak dipindah manual)
  {
    id: "p1",
    type: "project",
    name: "Project Alpha",
    start: new Date(2020, 1, 1),
    end: new Date(2020, 1, 10),
    progress: 0,
    isDisabled: true,
  },
  // Child task (parent mengacu ke id parent)
  {
    id: "t1",
    type: "task",
    parent: "p1",
    name: "Design",
    start: new Date(2020, 1, 1),
    end: new Date(2020, 1, 3),
    progress: 60,
    shortName: "Ana",
  },
  {
    id: "t2",
    type: "task",
    parent: "p1",
    name: "Implementation",
    start: new Date(2020, 1, 3),
    end: new Date(2020, 1, 6),
    progress: 20,
    shortName: "Budi",
  },
];

export default function AdvancedGanttHierarchy() {
  // Sync start/end parent dari children (direct children)
  const initialTasks = useMemo<TaskOrEmpty[]>(
    () => syncParentDateRangeFromChildren(rawTasks),
    []
  );
  const [tasks, setTasks] = useState<TaskOrEmpty[]>(initialTasks);

  // Helper label title yang sama seperti yang ditampilkan UI
  // (untuk custom column / kebutuhan lain)
  const label = formatTaskTitleWithPic("Design", "Ana");
  void label;

  return (
    <div style={{ height: 620 }}>
      <Gantt
        tasks={tasks}
        viewMode={ViewMode.QuarterYear}
        isShowCriticalPath
        // Default-nya true, tapi kita set eksplisit untuk dokumentasi
        isUpdateDisabledParentsOnChange
        onChangeTasks={(nextTasks) => setTasks([...nextTasks])}
      />
    </div>
  );
}`}</code>
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          2) Dependencies antar task
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Dependency dibuat dari properti <code>dependencies</code> pada task
          target. Gunakan <code>sourceTarget</code> dan <code>ownTarget</code>{" "}
          untuk menentukan ujung start/end yang dihubungkan.
        </p>
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 text-zinc-100 p-4">
          <code>{`// Contoh dependency: t2 start mengikuti end dari t1
{
  id: "t2",
  type: "task",
  parent: "p1",
  name: "Implementation",
  start: new Date(2020, 1, 3),
  end: new Date(2020, 1, 6),
  progress: 20,
  shortName: "Budi",
  dependencies: [
    {
      sourceId: "t1",
      sourceTarget: "endOfTask",
      ownTarget: "startOfTask",
    },
  ],
}`}</code>
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          3) Localization, holiday, dan styling kustom
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Anda bisa mengontrol tampilan timeline, format header, warna, jarak,
          dan aturan “holiday” (misalnya weekend).
        </p>
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 text-zinc-100 p-4">
          <code>{`import { id } from "date-fns/locale";

// ...di dalam komponen Gantt:
<Gantt
  tasks={tasks}
  viewMode={ViewMode.Day}
  dateLocale={id}
  isAdjustToWorkingDates
  checkIsHoliday={(date) => {
    // weekend = holiday (0=Sunday, 6=Saturday)
    const day = date.getDay();
    return day === 0 || day === 6;
  }}
  colors={{
    barBackgroundColor: "#0f172a",
    barBackgroundSelectedColor: "#1d4ed8",
    arrowColor: "#94a3b8",
    todayColor: "#ef4444",
    holidayBackgroundColor: "#111827",
  }}
  distances={{
    rowHeight: 48,
    headerHeight: 52,
    handleWidth: 12,
    arrowIndent: 10,
  }}
  dateFormats={{
    dateColumnFormat: "MMM yyyy",
    dayTopHeaderFormat: "EEE, d",
  }}
  renderTopHeader={(date, viewMode) =>
    \`\${viewMode}: \${date.toLocaleDateString()}\`
  }
/>`}</code>
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          4) Event handler lanjutan (opsional)
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          `onChangeTasks` paling simpel untuk sinkron state. Untuk kebutuhan
          khusus, Anda juga bisa memakai callback lain seperti `onClick`,
          `onRelationChange`, atau `fixStartPosition`.
        </p>
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 text-zinc-100 p-4">
          <code>{`<Gantt
  tasks={tasks}
  onClick={(task) => console.log("task clicked", task.id)}
  onRelationChange={(from, to, isOneDescendant) => {
    console.log("relation changed", { from, to, isOneDescendant });
  }}
  fixStartPosition={(task, date, index) => {
    console.log("fix start", task.id, date, index);
  }}
/>`}</code>
        </pre>
      </section>
    </article>
  );
}

