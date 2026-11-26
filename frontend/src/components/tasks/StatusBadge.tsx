import { AlertTriangle, CheckCircle2, Circle, Clock, Hourglass } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { STATUS_LABELS, type DeadlineAlert, type DisplayStatus } from "@/lib/tasks";

const STATUS_ICONS = {
  pendente: Circle,
  em_andamento: Hourglass,
  concluida: CheckCircle2,
  atrasada: AlertTriangle,
} satisfies Record<DisplayStatus, unknown>;

export function StatusBadge({ status }: { status: DisplayStatus }) {
  const Icon = STATUS_ICONS[status];
  return (
    <Badge variant={status}>
      <Icon aria-hidden="true" />
      <span>
        <span className="sr-only">Status: </span>
        {STATUS_LABELS[status]}
      </span>
    </Badge>
  );
}

export function DeadlineAlertBadge({ alert }: { alert: DeadlineAlert }) {
  if (alert === "vencido") {
    return (
      <Badge variant="atrasada">
        <AlertTriangle aria-hidden="true" />
        Prazo vencido
      </Badge>
    );
  }
  if (alert === "proximo") {
    return (
      <Badge variant="warning">
        <Clock aria-hidden="true" />
        Prazo próximo
      </Badge>
    );
  }
  return null;
}
