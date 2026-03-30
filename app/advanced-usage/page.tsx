"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import {
  Gantt,
  ViewMode,
  formatTaskTitleWithPic,
  syncParentDateRangeFromChildren,
  type Task,
  type TaskOrEmpty,
} from "@odik91/gantt-task-react";
import { id } from "date-fns/locale";

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-zinc-900 text-zinc-100 p-4">
      <code>{code}</code>
    </pre>
  );
}

function GanttFrame({
  height,
  children,
}: {
  height: number;
  children: ReactNode;
}) {
  return (
    <div className="overflow-x-auto overflow-y-hidden w-full">
      <div
        style={{
          height,
          minWidth: 1800,
          width: "max-content",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function AdvancedUsagePage() {
  const viewDate = useMemo(() => new Date(2020, 1, 1), []);

  // 1) Hierarki + sync parent dates dari children
  const rawHierarchyTasks = useMemo<TaskOrEmpty[]>(
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
    ],
    []
  );

  const initialHierarchyTasks = useMemo(
    () => syncParentDateRangeFromChildren(rawHierarchyTasks),
    [rawHierarchyTasks]
  );
  const [hierarchyTasks, setHierarchyTasks] = useState<TaskOrEmpty[]>(
    initialHierarchyTasks
  );

  const hierarchyLabel = useMemo(
    () => formatTaskTitleWithPic("Design", "Ana"),
    []
  );

  const codeHierarchy = `"use client";

import { useMemo, useState } from "react";
import {
  Gantt,
  ViewMode,
  syncParentDateRangeFromChildren,
  type TaskOrEmpty,
} from "@odik91/gantt-task-react";

const rawTasks = [
  { id: "p1", type: "project", name: "Project Alpha", start: new Date(2020, 1, 1), end: new Date(2020, 1, 10), progress: 0, isDisabled: true },
  { id: "t1", type: "task", parent: "p1", name: "Design", start: new Date(2020, 1, 1), end: new Date(2020, 1, 3), progress: 60, shortName: "Ana" },
  { id: "t2", type: "task", parent: "p1", name: "Implementation", start: new Date(2020, 1, 3), end: new Date(2020, 1, 6), progress: 20, shortName: "Budi" },
];

export default function AdvancedGanttHierarchy() {
  const initialTasks = useMemo<TaskOrEmpty[]>(
    () => syncParentDateRangeFromChildren(rawTasks),
    []
  );
  const [tasks, setTasks] = useState<TaskOrEmpty[]>(initialTasks);

  return (
    <Gantt
      tasks={tasks}
      viewMode={ViewMode.QuarterYear}
      isShowCriticalPath
      isUpdateDisabledParentsOnChange
      onChangeTasks={(nextTasks) =>
        setTasks(syncParentDateRangeFromChildren(nextTasks))
      }
    />
  );
}`;

  // 2) Dependencies antar task
  const rawDependencyTasks = useMemo<TaskOrEmpty[]>(
    () => [
      {
        id: "p1",
        type: "project",
        name: "Project Alpha",
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 12),
        progress: 0,
        isDisabled: true,
      },
      {
        id: "t1",
        type: "task",
        parent: "p1",
        name: "Design",
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 4),
        progress: 60,
        shortName: "Ana",
      },
      {
        id: "t2",
        type: "task",
        parent: "p1",
        name: "Implementation",
        start: new Date(2020, 1, 4),
        end: new Date(2020, 1, 7),
        progress: 20,
        shortName: "Budi",
        // t2 start mengikuti end dari t1
        dependencies: [
          {
            sourceId: "t1",
            sourceTarget: "endOfTask",
            ownTarget: "startOfTask",
          },
        ],
      },
    ],
    []
  );

  const [dependencyTasks, setDependencyTasks] = useState<TaskOrEmpty[]>(
    rawDependencyTasks
  );

  const codeDependency = `"use client";

// Dependency: t2 start mengikuti end dari t1
const tasks = [
  {
    id: "t2",
    type: "task",
    parent: "p1",
    name: "Implementation",
    start: new Date(2020, 1, 4),
    end: new Date(2020, 1, 7),
    progress: 20,
    shortName: "Budi",
    dependencies: [
      {
        sourceId: "t1",
        sourceTarget: "endOfTask",
        ownTarget: "startOfTask",
      },
    ],
  },
];

<Gantt
  tasks={tasks}
  viewMode={ViewMode.Day}
  isShowCriticalPath
/>`;

  // 3) Localization + holiday + styling kustom (weekend sebagai holiday)
  const rawHolidayTasks = useMemo<TaskOrEmpty[]>(
    () => [
      {
        id: "p1",
        type: "project",
        name: "Project Alpha",
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 14),
        progress: 0,
        isDisabled: true,
      },
      {
        id: "t1",
        type: "task",
        parent: "p1",
        name: "Task A",
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 8),
        progress: 35,
        shortName: "Ana",
      },
      {
        id: "t2",
        type: "task",
        parent: "p1",
        name: "Task B",
        start: new Date(2020, 1, 6),
        end: new Date(2020, 1, 12),
        progress: 15,
        shortName: "Budi",
      },
    ],
    []
  );

  const [holidayTasks, setHolidayTasks] = useState<TaskOrEmpty[]>(
    rawHolidayTasks
  );

  const checkIsWeekendHoliday = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday, Saturday
  };

  const codeHoliday = `import { id } from "date-fns/locale";

<Gantt
  tasks={tasks}
  viewMode={ViewMode.Day}
  dateLocale={id}
  isAdjustToWorkingDates
  checkIsHoliday={(date) => {
    const day = date.getDay();
    // weekend = holiday
    return day === 0 || day === 6;
  }}
  colors={{
    barBackgroundSelectedColor: "#1d4ed8",
    todayColor: "#ef4444",
    holidayBackgroundColor: "#111827",
  }}
/>`;

  // 4) Enable weekend sebagai hari kerja
  const [weekendAsWorkingDay, setWeekendAsWorkingDay] = useState(true);

  const checkIsHolidayWithWeekendToggle = (date: Date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    if (weekendAsWorkingDay) return false;
    return isWeekend;
  };

  const codeWeekendWorkingDay = `const [weekendAsWorkingDay, setWeekendAsWorkingDay] = useState(true);

<Gantt
  tasks={tasks}
  viewMode={ViewMode.Day}
  isAdjustToWorkingDates
  checkIsHoliday={(date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    return weekendAsWorkingDay ? false : isWeekend;
  }}
/>`;

  // 5) List tampilan: Day/Week/Month/QuarterYear
  const viewModeOptions = useMemo(
    () => [
      { label: "Day", value: ViewMode.Day },
      { label: "Week", value: ViewMode.Week },
      { label: "Month", value: ViewMode.Month },
      { label: "QuarterYear", value: ViewMode.QuarterYear },
    ],
    []
  );
  const [selectedViewMode, setSelectedViewMode] = useState<ViewMode>(
    ViewMode.Day
  );

  const rawViewModeTasks = useMemo<TaskOrEmpty[]>(
    () => [
      {
        id: "p1",
        type: "project",
        name: "Project Timeline",
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 30),
        progress: 0,
        isDisabled: true,
      },
      {
        id: "t1",
        type: "task",
        parent: "p1",
        name: "Milestone 1",
        start: new Date(2020, 1, 2),
        end: new Date(2020, 1, 10),
        progress: 20,
      },
      {
        id: "t2",
        type: "task",
        parent: "p1",
        name: "Implementation",
        start: new Date(2020, 1, 10),
        end: new Date(2020, 1, 22),
        progress: 50,
      },
    ],
    []
  );
  const [viewModeTasks, setViewModeTasks] = useState<TaskOrEmpty[]>(
    rawViewModeTasks
  );

  const codeViewMode = `const viewModeOptions = [
  { label: "Day", value: ViewMode.Day },
  { label: "Week", value: ViewMode.Week },
  { label: "Month", value: ViewMode.Month },
  { label: "QuarterYear", value: ViewMode.QuarterYear },
];

const [selectedViewMode, setSelectedViewMode] = useState(ViewMode.Day);

<Gantt
  tasks={tasks}
  viewMode={selectedViewMode}
/>`;

  // 6) CRUD (contoh tambah/hapus/update progress via UI)
  const rawCrudTasks = useMemo<TaskOrEmpty[]>(
    () => [
      {
        id: "p1",
        type: "project",
        name: "CRUD Project",
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 10),
        progress: 0,
        isDisabled: true,
      },
      {
        id: "t1",
        type: "task",
        parent: "p1",
        name: "Draft",
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 3),
        progress: 10,
      },
      {
        id: "t2",
        type: "task",
        parent: "p1",
        name: "Build",
        start: new Date(2020, 1, 3),
        end: new Date(2020, 1, 6),
        progress: 25,
      },
    ],
    []
  );

  const [crudTasks, setCrudTasks] = useState<TaskOrEmpty[]>(
    syncParentDateRangeFromChildren(rawCrudTasks)
  );
  const [crudIndex, setCrudIndex] = useState(3);

  const crudResolverRef = useRef<((value: TaskOrEmpty | null) => void) | null>(
    null
  );
  const crudModeRef = useRef<"add" | "edit" | null>(null);
  const crudEditTaskRef = useRef<TaskOrEmpty | null>(null);
  const crudPendingIdRef = useRef<string | null>(null);

  const dateToInputValue = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const inputValueToDate = (value: string) => {
    const [y, m, d] = value.split("-").map((v) => Number(v));
    return new Date(y, m - 1, d);
  };

  const [crudModalOpen, setCrudModalOpen] = useState(false);
  const [crudModalMode, setCrudModalMode] = useState<"add" | "edit">("add");
  const [crudFormName, setCrudFormName] = useState("");
  const [crudFormStart, setCrudFormStart] = useState("");
  const [crudFormEnd, setCrudFormEnd] = useState("");
  const [crudFormProgress, setCrudFormProgress] = useState(0);

  const codeCrud = `"use client";

// CRUD dengan modal (Add + Edit) + sync parent dates
import { useState } from "react";
import { Gantt, ViewMode, syncParentDateRangeFromChildren, type TaskOrEmpty } from "@odik91/gantt-task-react";

export default function CrudModalExample() {
  const [tasks, setTasks] = useState<TaskOrEmpty[]>(syncParentDateRangeFromChildren(rawCrudTasks));
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");

  // form state: name, start, end, progress
  const [name, setName] = useState("");
  const [start, setStart] = useState("2020-02-01");
  const [end, setEnd] = useState("2020-02-03");
  const [progress, setProgress] = useState(0);

  function openAdd() {
    setMode("add");
    setName("Task ...");
    setIsOpen(true);
  }

  function openEdit() {
    setMode("edit");
    setIsOpen(true);
  }

  function submit() {
    const startDate = inputValueToDate(start);
    const endDate = inputValueToDate(end);
    const nextTasks =
      mode === "add"
        ? [...tasks, { id: ..., type: "task", parent: "p1", name, start: startDate, end: endDate, progress }]
        : tasks.map((t) => (t.id === selectedTaskId ? { ...t, name, start: startDate, end: endDate, progress } : t));

    setTasks(syncParentDateRangeFromChildren(nextTasks));
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={openAdd}>Add Task</button>
      <button onClick={openEdit} disabled={!selectedTaskId}>Edit</button>

      <Gantt
        tasks={tasks}
        viewMode={ViewMode.Day}
        onClick={(task) => setSelectedTaskId(task.id)}
        onChangeTasks={(next) => setTasks(syncParentDateRangeFromChildren(next))}
      />

      {isOpen && (
        <Modal onSubmit={submit}>
          {/* input: name, start(date), end(date), progress */}
        </Modal>
      )}
    </>
  );
}`;

  const resolveCrudModal = (nextTask: TaskOrEmpty | null) => {
    const resolver = crudResolverRef.current;
    crudResolverRef.current = null;
    crudModeRef.current = null;
    crudEditTaskRef.current = null;
    crudPendingIdRef.current = null;
    setCrudModalOpen(false);
    resolver?.(nextTask);
  };

  const cancelCrudModal = () => {
    resolveCrudModal(null);
  };

  const submitCrudModal = () => {
    const mode = crudModeRef.current;
    if (!mode) return;

    const start = inputValueToDate(crudFormStart);
    const endCandidate = inputValueToDate(crudFormEnd);
    const end = endCandidate < start ? start : endCandidate;
    const progress = Math.max(0, Math.min(100, crudFormProgress));

    if (mode === "add") {
      const pendingId = crudPendingIdRef.current ?? `t${crudIndex}`;
      const newTask: TaskOrEmpty = {
        id: pendingId,
        type: "task",
        name: crudFormName || pendingId,
        start,
        end,
        progress,
      };

      setCrudIndex((v) => v + 1);
      resolveCrudModal(newTask);
      return;
    }

    const editTask = crudEditTaskRef.current;
    if (!editTask) {
      resolveCrudModal(null);
      return;
    }

    if (editTask.type !== "empty") {
      const updated: TaskOrEmpty = {
        ...editTask,
        name: crudFormName || editTask.name,
        start,
        end,
        progress,
      };
      resolveCrudModal(updated);
      return;
    }

    const updatedEmpty: TaskOrEmpty = {
      ...editTask,
      name: crudFormName || editTask.name,
    };
    resolveCrudModal(updatedEmpty);
  };

  const onAddTask = async (parentTask: Task): Promise<TaskOrEmpty | null> => {
    const currentIndex = crudIndex;
    const pendingId = `t${currentIndex}`;

    const start = new Date(parentTask.start);
    const endCandidate = new Date(start);
    endCandidate.setDate(endCandidate.getDate() + 2);
    const end =
      parentTask.end && endCandidate > parentTask.end
        ? new Date(parentTask.end)
        : endCandidate;

    crudModeRef.current = "add";
    crudEditTaskRef.current = null;
    crudPendingIdRef.current = pendingId;

    setCrudModalMode("add");
    setCrudFormName(`Task ${currentIndex}`);
    setCrudFormStart(dateToInputValue(start));
    setCrudFormEnd(dateToInputValue(end));
    setCrudFormProgress(0);

    return new Promise((resolve) => {
      crudResolverRef.current = resolve;
      setCrudModalOpen(true);
    });
  };

  const onEditTask = async (
    task: TaskOrEmpty
  ): Promise<TaskOrEmpty | null> => {
    crudModeRef.current = "edit";
    crudPendingIdRef.current = null;
    crudEditTaskRef.current = task;

    setCrudModalMode("edit");
    setCrudFormName(task.name);

    if (task.type !== "empty") {
      setCrudFormStart(dateToInputValue(task.start));
      setCrudFormEnd(dateToInputValue(task.end));
      setCrudFormProgress(task.progress);
    } else {
      setCrudFormStart(dateToInputValue(viewDate));
      setCrudFormEnd(
        dateToInputValue(new Date(viewDate.getTime() + 2 * 86400000))
      );
      setCrudFormProgress(0);
    }

    return new Promise((resolve) => {
      crudResolverRef.current = resolve;
      setCrudModalOpen(true);
    });
  };

  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Advanced Usage
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300">
          Setiap contoh di bawah menampilkan hasil Gantt chart yang
          dirender, lalu diikuti contoh kode-nya.
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

        <div className="rounded-xl border border-black/5 bg-white dark:bg-black">
          <div className="p-3 text-sm text-zinc-600 dark:text-zinc-300 border-b border-black/5">
            Contoh label: {hierarchyLabel}
          </div>
          <GanttFrame height={620}>
            <Gantt
              tasks={hierarchyTasks}
              viewMode={ViewMode.QuarterYear}
              viewDate={viewDate}
              isShowCriticalPath
              isUpdateDisabledParentsOnChange
              onChangeTasks={(nextTasks) =>
                setHierarchyTasks(syncParentDateRangeFromChildren(nextTasks))
              }
            />
          </GanttFrame>
        </div>

        <CodeBlock code={codeHierarchy} />
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

        <div className="rounded-xl border border-black/5 bg-white dark:bg-black">
          <div className="p-3 text-sm text-zinc-600 dark:text-zinc-300 border-b border-black/5">
            t2 tergantung end dari t1
          </div>
          <GanttFrame height={620}>
            <Gantt
              tasks={dependencyTasks}
              viewMode={ViewMode.Day}
              viewDate={viewDate}
              isShowCriticalPath
              isUpdateDisabledParentsOnChange
              onChangeTasks={(nextTasks) =>
                setDependencyTasks(syncParentDateRangeFromChildren(nextTasks))
              }
            />
          </GanttFrame>
        </div>

        <CodeBlock code={codeDependency} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          3) Localization, holiday, dan styling kustom
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Anda bisa mengontrol tampilan timeline, format header, warna, jarak,
          dan aturan “holiday” (misalnya weekend).
        </p>

        <div className="rounded-xl border border-black/5 bg-white dark:bg-black">
          <div className="p-3 text-sm text-zinc-600 dark:text-zinc-300 border-b border-black/5">
            Weekend dianggap holiday
          </div>
          <GanttFrame height={620}>
            <Gantt
              tasks={holidayTasks}
              viewMode={ViewMode.Day}
              viewDate={viewDate}
              dateLocale={id}
              isAdjustToWorkingDates
              checkIsHoliday={checkIsWeekendHoliday}
              colors={{
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
              renderTopHeader={(date) =>
                `${date.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}`
              }
              onChangeTasks={(nextTasks) =>
                setHolidayTasks(syncParentDateRangeFromChildren(nextTasks))
              }
            />
          </GanttFrame>
        </div>

        <CodeBlock code={codeHoliday} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          4) Enable weekend sebagai hari kerja
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Toggle ini mengubah logika <code>checkIsHoliday</code> untuk weekend:
          ketika di-enable, weekend akan dianggap hari kerja (bukan holiday).
        </p>

        <div className="rounded-xl border border-black/5 bg-white dark:bg-black">
          <div className="p-3 text-sm text-zinc-600 dark:text-zinc-300 border-b border-black/5 flex items-center justify-between gap-4">
            <span>Weekend sebagai hari kerja</span>
            <label className="inline-flex items-center gap-2 text-zinc-700 dark:text-zinc-200 text-xs">
              <input
                type="checkbox"
                checked={weekendAsWorkingDay}
                onChange={(e) => setWeekendAsWorkingDay(e.target.checked)}
              />
              Enable
            </label>
          </div>
          <GanttFrame height={620}>
            <Gantt
              tasks={holidayTasks}
              viewMode={ViewMode.Day}
              viewDate={viewDate}
              isAdjustToWorkingDates
              checkIsHoliday={checkIsHolidayWithWeekendToggle}
              colors={{
                barBackgroundSelectedColor: "#1d4ed8",
                arrowColor: "#94a3b8",
                todayColor: "#ef4444",
                holidayBackgroundColor: "#111827",
              }}
              onChangeTasks={(nextTasks) =>
                setHolidayTasks(syncParentDateRangeFromChildren(nextTasks))
              }
            />
          </GanttFrame>
        </div>

        <CodeBlock code={codeWeekendWorkingDay} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          5) List tampilan Day / Week / Month / QuarterYear
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Gunakan selector untuk mengganti <code>viewMode</code> dan melihat
          perubahan timeline.
        </p>

        <div className="rounded-xl border border-black/5 bg-white dark:bg-black space-y-3">
          <div className="p-3 border-b border-black/5">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm text-zinc-600 dark:text-zinc-300">
                View mode
              </div>
              <select
                value={selectedViewMode}
                onChange={(e) => setSelectedViewMode(e.target.value as ViewMode)}
                className="rounded-md border border-black/10 bg-white dark:bg-black/20 px-3 py-1 text-sm text-zinc-800 dark:text-zinc-100"
              >
                {viewModeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <GanttFrame height={620}>
            <Gantt
              tasks={viewModeTasks}
              viewMode={selectedViewMode}
              viewDate={viewDate}
              isUpdateDisabledParentsOnChange
              onChangeTasks={(nextTasks) =>
                setViewModeTasks(syncParentDateRangeFromChildren(nextTasks))
              }
            />
          </GanttFrame>
        </div>

        <CodeBlock code={codeViewMode} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          6) Contoh CRUD (Modal + Edit)
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Contoh CRUD sederhana dengan modal: Add task baru, Edit task
          terpilih, dan Delete. Semua perubahan disinkronkan ke
          <code> tasks</code> lalu diteruskan ke <code>Gantt</code>.
        </p>

        <div className="rounded-xl border border-black/5 bg-white dark:bg-black space-y-3">
          <GanttFrame height={620}>
            <Gantt
              tasks={crudTasks}
              viewMode={ViewMode.Day}
              viewDate={viewDate}
              isUpdateDisabledParentsOnChange
              onAddTask={onAddTask}
              onEditTask={onEditTask}
              onChangeTasks={(nextTasks) =>
                setCrudTasks(syncParentDateRangeFromChildren(nextTasks))
              }
            />
          </GanttFrame>
        </div>

        <CodeBlock code={codeCrud} />

        {crudModalOpen ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={cancelCrudModal}
          >
            <div
              className="w-full max-w-md rounded-xl border border-black/10 bg-white p-5 shadow-xl dark:bg-black dark:border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {crudModalMode === "add" ? "Add Task" : "Edit Task"}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Ubah name, start, end, dan progress.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={cancelCrudModal}
                  className="rounded-md border border-black/10 bg-white px-2 py-1 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:bg-black/20 dark:border-white/10 dark:text-zinc-100 dark:hover:bg-black/40"
                >
                  X
                </button>
              </div>

              <form
                className="mt-4 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitCrudModal();
                }}
              >
                <div className="space-y-1">
                  <label className="block text-xs text-zinc-600 dark:text-zinc-300">
                    Name
                  </label>
                  <input
                    value={crudFormName}
                    onChange={(e) => setCrudFormName(e.target.value)}
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-blue-500/30 dark:bg-black/20 dark:border-white/10 dark:text-zinc-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs text-zinc-600 dark:text-zinc-300">
                      Start
                    </label>
                    <input
                      type="date"
                      value={crudFormStart}
                      onChange={(e) => setCrudFormStart(e.target.value)}
                      className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-blue-500/30 dark:bg-black/20 dark:border-white/10 dark:text-zinc-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs text-zinc-600 dark:text-zinc-300">
                      End
                    </label>
                    <input
                      type="date"
                      value={crudFormEnd}
                      onChange={(e) => setCrudFormEnd(e.target.value)}
                      className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-blue-500/30 dark:bg-black/20 dark:border-white/10 dark:text-zinc-50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs text-zinc-600 dark:text-zinc-300">
                    Progress ({crudFormProgress}%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={crudFormProgress}
                    onChange={(e) => setCrudFormProgress(Number(e.target.value))}
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-blue-500/30 dark:bg-black/20 dark:border-white/10 dark:text-zinc-50"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={cancelCrudModal}
                    className="rounded-md border border-black/10 bg-white px-3 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:bg-black/20 dark:border-white/10 dark:text-zinc-100 dark:hover:bg-black/40"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </section>
    </article>
  );
}

