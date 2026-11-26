import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, ClipboardList, Info, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { DeadlineNotice } from "@/components/tasks/DeadlineNotice";
import { DeleteTaskDialog } from "@/components/tasks/DeleteTaskDialog";
import { StatusFilters } from "@/components/tasks/StatusFilters";
import { TaskCard } from "@/components/tasks/TaskCard";
import { TaskFormDialog } from "@/components/tasks/TaskFormDialog";
import { Button } from "@/components/ui/button";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasks,
  updateTaskRequest,
  updateTaskStatusRequest,
} from "@/lib/tasks-api";
import {
  FILTERS,
  STATUS_LABELS,
  filterTasks,
  formatDateLong,
  getDeadlineAlert,
  toDateKey,
  type StatusFilter,
  type StoredStatus,
  type Task,
  type TaskInput,
} from "@/lib/tasks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Estudo em Dia — Lista de tarefas de estudo" },
      {
        name: "description",
        content:
          "Organize suas tarefas de estudo da semana: cadastre atividades, acompanhe o status e veja os prazos.",
      },
      { property: "og:title", content: "Estudo em Dia — Lista de tarefas de estudo" },
      {
        property: "og:description",
        content: "Organize suas tarefas de estudo da semana e acompanhe os prazos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  // Datas dependem do relógio do navegador: os dados são criados só após a montagem.
  const [now, setNow] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);
  const [filter, setFilter] = useState<StatusFilter>("todas");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [deleting, setDeleting] = useState<Task | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setNow(new Date());
    setLoading(true);
    setLoadError(null);
    getTasks(controller.signal)
      .then(setTasks)
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setLoadError(
            error instanceof Error ? error.message : "Não foi possível carregar as tarefas.",
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [reload]);

  const today = useMemo(() => now ?? new Date(0), [now]);

  const counts = useMemo(() => {
    const result = {} as Record<StatusFilter, number>;
    for (const f of FILTERS) result[f.value] = filterTasks(tasks, f.value, today).length;
    return result;
  }, [tasks, today]);

  const visible = useMemo(() => filterTasks(tasks, filter, today), [tasks, filter, today]);

  const alerts = useMemo(() => {
    let overdue = 0;
    let dueSoon = 0;
    for (const task of tasks) {
      const alert = getDeadlineAlert(task, today);
      if (alert === "vencido") overdue++;
      if (alert === "proximo") dueSoon++;
    }
    return { overdue, dueSoon };
  }, [tasks, today]);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(task: Task) {
    setEditing(task);
    setFormOpen(true);
  }

  async function handleSubmit(input: TaskInput, status: StoredStatus) {
    try {
      if (editing) {
        const updated = await updateTaskRequest(editing.id, input, status);
        setTasks((prev) => prev.map((task) => (task.id === updated.id ? updated : task)));
        toast.success("Tarefa atualizada.");
      } else {
        const created = await createTaskRequest(input);
        setTasks((prev) => [created, ...prev]);
        toast.success("Tarefa cadastrada como Pendente.");
      }
      setFormOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível salvar a tarefa.");
    }
  }

  async function handleStatusChange(task: Task, status: StoredStatus) {
    try {
      const updated = await updateTaskStatusRequest(task.id, status);
      setTasks((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      toast.success(`Status alterado para ${STATUS_LABELS[status]}.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível alterar o status.");
    }
  }

  async function handleDelete(task: Task) {
    try {
      await deleteTaskRequest(task.id);
      setTasks((prev) => prev.filter((item) => item.id !== task.id));
      setDeleting(null);
      toast.success("Tarefa excluída.");
    } catch (error) {
      setDeleting(null);
      toast.error(error instanceof Error ? error.message : "Não foi possível excluir a tarefa.");
    }
  }

  const activeFilterLabel = FILTERS.find((f) => f.value === filter)?.label ?? "";

  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="border-b bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <BookOpen className="size-6" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h1 className="text-3xl font-bold leading-tight tracking-tight">
                Estudo <span className="highlight-mark">em Dia</span>
              </h1>
              <p className="text-sm text-muted-foreground">Lista de tarefas de estudo da semana</p>
            </div>
          </div>
          <Button onClick={openCreate} className="h-11 w-full px-5 text-base sm:w-auto">
            <Plus aria-hidden="true" />
            Nova tarefa
          </Button>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Hoje
            </p>
            <p className="font-display text-2xl first-letter:uppercase">
              {now ? formatDateLong(toDateKey(now)) : "\u00a0"}
            </p>
          </div>
          <p className="inline-flex items-start gap-2 rounded-lg border border-dashed border-muted-foreground/40 bg-muted px-3 py-2 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              <strong className="text-foreground">Dados persistidos:</strong> as tarefas são
              carregadas e salvas no servidor.
            </span>
          </p>
        </div>

        {now && <DeadlineNotice overdue={alerts.overdue} dueSoon={alerts.dueSoon} />}

        <section aria-labelledby="tasks-heading" className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h2 id="tasks-heading" className="text-2xl font-semibold">
              Minhas tarefas
            </h2>
            <StatusFilters value={filter} counts={counts} onChange={setFilter} />
          </div>

          <p className="sr-only" aria-live="polite">
            {now ? `Filtro ${activeFilterLabel}: ${visible.length} tarefas exibidas.` : ""}
          </p>

          {loading || !now ? (
            <p className="py-12 text-center text-muted-foreground">Carregando tarefas…</p>
          ) : loadError ? (
            <div
              role="alert"
              className="flex flex-col items-center gap-3 rounded-xl border border-destructive/30 bg-card px-6 py-10 text-center"
            >
              <p className="font-semibold text-destructive">
                Não foi possível carregar as tarefas.
              </p>
              <p className="text-sm text-muted-foreground">{loadError}</p>
              <Button variant="outline" onClick={() => setReload((value) => value + 1)}>
                Tentar novamente
              </Button>
            </div>
          ) : visible.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed bg-card/70 px-6 py-14 text-center">
              <ClipboardList className="size-10 text-muted-foreground" aria-hidden="true" />
              <p className="font-display text-xl font-semibold">
                {tasks.length === 0
                  ? "Nenhuma tarefa cadastrada"
                  : `Nenhuma tarefa em “${activeFilterLabel}”`}
              </p>
              <p className="max-w-sm text-sm text-muted-foreground">
                {tasks.length === 0
                  ? "Cadastre sua primeira tarefa de estudo para começar a organizar a semana."
                  : "Não há tarefas com esse status no momento. Escolha outro filtro ou cadastre uma nova tarefa."}
              </p>
              <Button variant="outline" onClick={openCreate} className="mt-2 h-10">
                <Plus aria-hidden="true" />
                Nova tarefa
              </Button>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((task) => (
                <li key={task.id} className="flex min-w-0">
                  <TaskCard
                    task={task}
                    today={today}
                    onEdit={openEdit}
                    onDelete={setDeleting}
                    onStatusChange={handleStatusChange}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <TaskFormDialog
        open={formOpen}
        task={editing}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
      />
      <DeleteTaskDialog
        task={deleting}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
