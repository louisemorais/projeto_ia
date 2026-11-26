import { CalendarClock, CalendarPlus, Pencil, Trash2, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EDITABLE_STATUSES,
  STATUS_LABELS,
  formatDate,
  getDeadlineAlert,
  getDisplayStatus,
  toDateKey,
  type StoredStatus,
  type Task,
} from "@/lib/tasks";
import { cn } from "@/lib/utils";

import { DeadlineAlertBadge, StatusBadge } from "./StatusBadge";

const ACCENT: Record<string, string> = {
  pendente: "border-l-status-pending",
  em_andamento: "border-l-status-progress",
  concluida: "border-l-status-done",
  atrasada: "border-l-status-late",
};

interface TaskCardProps {
  task: Task;
  today: Date;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (task: Task, status: StoredStatus) => void;
}

export function TaskCard({ task, today, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const status = getDisplayStatus(task, today);
  const alert = getDeadlineAlert(task, today);
  const titleId = `task-title-${task.id}`;
  const statusId = `task-status-${task.id}`;
  const deadlineHint =
    alert === "proximo"
      ? task.deadline === toDateKey(today)
        ? "Vence hoje"
        : "Vence amanhã"
      : null;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "flex min-w-0 flex-col gap-4 rounded-xl border border-l-4 bg-card p-5 text-card-foreground shadow-card transition-shadow hover:shadow-card-hover",
        ACCENT[status],
        status === "concluida" && "bg-card/80",
      )}
    >
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={status} />
          <DeadlineAlertBadge alert={alert} />
          {task.isDemo && <Badge variant="demo">Demonstração</Badge>}
        </div>
        <h3
          id={titleId}
          className={cn(
            "text-xl font-semibold leading-snug break-words",
            status === "concluida" && "text-muted-foreground line-through decoration-1",
          )}
        >
          {task.title}
        </h3>
      </header>

      <p className="text-sm leading-relaxed whitespace-pre-line break-words text-muted-foreground">
        {task.description}
      </p>

      <dl className="grid gap-2 text-sm">
        <div className="flex items-center gap-2">
          <User className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <dt className="text-muted-foreground">Criada por</dt>
          <dd className="min-w-0 font-semibold break-words">{task.createdBy}</dd>
        </div>
        <div className="flex items-center gap-2">
          <CalendarPlus className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <dt className="text-muted-foreground">Criada em</dt>
          <dd className="font-semibold">{formatDate(task.createdAt)}</dd>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CalendarClock className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <dt className="text-muted-foreground">Prazo</dt>
          <dd
            className={cn(
              "font-semibold",
              alert === "vencido" && "text-status-late",
              alert === "proximo" && "text-warning",
            )}
          >
            {formatDate(task.deadline)}
            {deadlineHint && <span className="font-normal"> · {deadlineHint}</span>}
          </dd>
        </div>
      </dl>

      <footer className="mt-auto flex flex-col gap-3 border-t border-dashed pt-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor={statusId} className="text-xs font-semibold text-muted-foreground">
            Alterar status
          </label>
          <Select
            value={task.status}
            onValueChange={(value) => onStatusChange(task, value as StoredStatus)}
          >
            <SelectTrigger id={statusId} className="h-10 bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EDITABLE_STATUSES.map((value) => (
                <SelectItem key={value} value={value}>
                  {STATUS_LABELS[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-10 flex-1"
            onClick={() => onEdit(task)}
            aria-label={`Editar tarefa: ${task.title}`}
          >
            <Pencil aria-hidden="true" />
            Editar
          </Button>
          <Button
            variant="outline"
            className="h-10 flex-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => onDelete(task)}
            aria-label={`Excluir tarefa: ${task.title}`}
          >
            <Trash2 aria-hidden="true" />
            Excluir
          </Button>
        </div>
      </footer>
    </article>
  );
}
