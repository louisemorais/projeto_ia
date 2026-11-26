import { AlertTriangle, Clock } from "lucide-react";

interface DeadlineNoticeProps {
  overdue: number;
  dueSoon: number;
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function DeadlineNotice({ overdue, dueSoon }: DeadlineNoticeProps) {
  return (
    <section aria-label="Avisos de vencimento" aria-live="polite" className="grid gap-2 sm:grid-cols-2">
      {overdue > 0 && (
        <p className="flex items-start gap-3 rounded-lg border border-status-late/30 bg-status-late-soft px-4 py-3 text-sm text-status-late">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <span>
            <strong>Prazo vencido:</strong>{" "}
            {plural(overdue, "tarefa está atrasada.", "tarefas estão atrasadas.")}
          </span>
        </p>
      )}
      {dueSoon > 0 && (
        <p className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning-soft px-4 py-3 text-sm text-warning">
          <Clock className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <span>
            <strong>Prazo próximo:</strong>{" "}
            {plural(dueSoon, "tarefa vence hoje ou amanhã.", "tarefas vencem hoje ou amanhã.")}
          </span>
        </p>
      )}
    </section>
  );
}
