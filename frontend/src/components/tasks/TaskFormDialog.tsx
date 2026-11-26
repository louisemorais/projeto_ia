import { useEffect, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  EDITABLE_STATUSES,
  STATUS_LABELS,
  formatDate,
  validateTaskInput,
  type StoredStatus,
  type Task,
  type TaskInput,
  type TaskInputErrors,
} from "@/lib/tasks";

const EMPTY: TaskInput = {
  title: "",
  description: "",
  createdBy: "",
  deadline: "",
};
const FIELD_ORDER: (keyof TaskInput)[] = ["title", "description", "createdBy", "deadline"];

interface TaskFormDialogProps {
  open: boolean;
  task: Task | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: TaskInput, status: StoredStatus) => void | Promise<void>;
}

export function TaskFormDialog({ open, task, onOpenChange, onSubmit }: TaskFormDialogProps) {
  const [values, setValues] = useState<TaskInput>(EMPTY);
  const [status, setStatus] = useState<StoredStatus>("pendente");
  const [errors, setErrors] = useState<TaskInputErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const isEditing = task !== null;

  useEffect(() => {
    if (!open) return;
    setValues(
      task
        ? {
            title: task.title,
            description: task.description,
            createdBy: task.createdBy,
            deadline: task.deadline,
          }
        : EMPTY,
    );
    setStatus(task?.status ?? "pendente");
    setErrors({});
  }, [open, task]);

  function update(field: keyof TaskInput, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validateTaskInput(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(values, status);
    } finally {
      setSubmitting(false);
    }
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  const fieldProps = (field: keyof TaskInput) => ({
    id: `task-${field}`,
    name: field,
    value: values[field],
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `task-${field}-error` : undefined,
    "aria-required": true,
    className: errors[field] ? "border-destructive bg-background" : "bg-background",
  });

  const fieldError = (field: keyof TaskInput) =>
    errors[field] ? (
      <p id={`task-${field}-error`} className="text-sm font-semibold text-destructive">
        {errors[field]}
      </p>
    ) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {isEditing ? "Editar tarefa" : "Nova tarefa"}
          </DialogTitle>
          <DialogDescription>
            Campos marcados com <span aria-hidden="true">*</span>
            <span className="sr-only">asterisco</span> são obrigatórios.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} noValidate onSubmit={handleSubmit} className="grid gap-4">
          {errorCount > 0 && (
            <div
              role="alert"
              className="rounded-md border border-destructive/30 bg-status-late-soft px-3 py-2 text-sm text-status-late"
            >
              {errorCount === 1
                ? "Preencha o campo obrigatório indicado abaixo."
                : `Preencha os ${errorCount} campos obrigatórios indicados abaixo.`}
            </div>
          )}

          <div className="grid gap-1.5">
            <Label htmlFor="task-title">
              Título da tarefa <span aria-hidden="true">*</span>
            </Label>
            <Input
              {...fieldProps("title")}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Ex.: Estudar JavaScript"
            />
            {fieldError("title")}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="task-description">
              Descrição <span aria-hidden="true">*</span>
            </Label>
            <Textarea
              {...fieldProps("description")}
              rows={4}
              onChange={(e) => update("description", e.target.value)}
              placeholder="O que precisa ser feito?"
            />
            {fieldError("description")}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid content-start gap-1.5">
              <Label htmlFor="task-createdBy">
                Criada por <span aria-hidden="true">*</span>
              </Label>
              <Input
                {...fieldProps("createdBy")}
                onChange={(e) => update("createdBy", e.target.value)}
                placeholder="Seu nome"
                autoComplete="name"
              />
              {fieldError("createdBy")}
            </div>

            <div className="grid content-start gap-1.5">
              <Label htmlFor="task-deadline">
                Data do prazo <span aria-hidden="true">*</span>
              </Label>
              <Input
                {...fieldProps("deadline")}
                type="date"
                onChange={(e) => update("deadline", e.target.value)}
              />
              {fieldError("deadline")}
            </div>
          </div>

          {isEditing ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid content-start gap-1.5">
                <Label htmlFor="task-status">Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as StoredStatus)}>
                  <SelectTrigger id="task-status" className="h-9 bg-background">
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
              <div className="grid content-start gap-1.5">
                <span className="text-sm font-medium">Data de criação</span>
                <p className="flex h-9 items-center rounded-md border border-dashed px-3 text-sm text-muted-foreground">
                  {formatDate(task.createdAt)}
                </p>
              </div>
            </div>
          ) : (
            <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
              A data de criação será registrada automaticamente e a tarefa começará como{" "}
              <strong className="text-foreground">Pendente</strong>.
            </p>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              className="h-10"
              disabled={submitting}
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="h-10" disabled={submitting}>
              {submitting ? "Salvando…" : isEditing ? "Salvar alterações" : "Cadastrar tarefa"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
