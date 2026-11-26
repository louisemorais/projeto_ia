import { addDays, format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

/** Status escolhidos pelo usuário. "Atrasada" é sempre calculado, nunca armazenado. */
export type StoredStatus = "pendente" | "em_andamento" | "concluida";
export type DisplayStatus = StoredStatus | "atrasada";
export type StatusFilter = "todas" | DisplayStatus;
export type DeadlineAlert = "vencido" | "proximo" | null;

export interface Task {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  /** ISO timestamp gerado automaticamente na criação. */
  createdAt: string;
  /** Data do prazo no formato YYYY-MM-DD. */
  deadline: string;
  status: StoredStatus;
  isDemo?: boolean;
}

export interface TaskInput {
  title: string;
  description: string;
  createdBy: string;
  deadline: string;
}

export type TaskInputErrors = Partial<Record<keyof TaskInput, string>>;

export const STATUS_LABELS: Record<DisplayStatus, string> = {
  pendente: "Pendente",
  em_andamento: "Em andamento",
  concluida: "Concluída",
  atrasada: "Atrasada",
};

export const EDITABLE_STATUSES: StoredStatus[] = ["pendente", "em_andamento", "concluida"];

export const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "pendente", label: "Pendentes" },
  { value: "em_andamento", label: "Em andamento" },
  { value: "concluida", label: "Concluídas" },
  { value: "atrasada", label: "Atrasadas" },
];

/** Data local no formato YYYY-MM-DD (comparável como texto). */
export function toDateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function getDisplayStatus(task: Task, today: Date): DisplayStatus {
  if (task.status === "concluida") return "concluida";
  if (task.deadline < toDateKey(today)) return "atrasada";
  return task.status;
}

export function getDeadlineAlert(task: Task, today: Date): DeadlineAlert {
  if (task.status === "concluida") return null;
  const todayKey = toDateKey(today);
  if (task.deadline < todayKey) return "vencido";
  if (task.deadline === todayKey || task.deadline === toDateKey(addDays(today, 1))) {
    return "proximo";
  }
  return null;
}

export function filterTasks(tasks: Task[], filter: StatusFilter, today: Date): Task[] {
  if (filter === "todas") return tasks;
  return tasks.filter((task) => getDisplayStatus(task, today) === filter);
}

export function validateTaskInput(input: TaskInput): TaskInputErrors {
  const errors: TaskInputErrors = {};
  if (!input.title.trim()) errors.title = "Informe o título da tarefa.";
  if (!input.description.trim()) errors.description = "Informe a descrição da tarefa.";
  if (!input.createdBy.trim()) errors.createdBy = "Informe o nome de quem criou a tarefa.";
  if (!input.deadline.trim()) errors.deadline = "Informe a data do prazo.";
  return errors;
}

export function createTask(input: TaskInput, now: Date, id: string): Task {
  return {
    id,
    title: input.title.trim(),
    description: input.description.trim(),
    createdBy: input.createdBy.trim(),
    deadline: input.deadline,
    createdAt: now.toISOString(),
    status: "pendente",
  };
}

/** Atualiza os dados preservando id e data de criação originais. */
export function updateTask(task: Task, input: TaskInput, status: StoredStatus): Task {
  return {
    ...task,
    title: input.title.trim(),
    description: input.description.trim(),
    createdBy: input.createdBy.trim(),
    deadline: input.deadline,
    status,
    createdAt: task.createdAt,
  };
}

export function formatDate(value: string): string {
  return format(parseISO(value), "dd/MM/yyyy", { locale: ptBR });
}

export function formatDateLong(value: string): string {
  return format(parseISO(value), "EEEE, d 'de' MMMM", { locale: ptBR });
}

/** Dados de demonstração com prazos relativos ao dia atual. */
export function createMockTasks(now: Date): Task[] {
  const day = (offset: number) => toDateKey(addDays(now, offset));
  const created = (offset: number) => addDays(now, offset).toISOString();
  return [
    {
      id: "demo-1",
      title: "Estudar JavaScript",
      description: "Revisar funções, arrays e manipulação do DOM com exercícios práticos.",
      createdBy: "Ana Souza",
      createdAt: created(-3),
      deadline: day(0),
      status: "em_andamento",
      isDemo: true,
    },
    {
      id: "demo-2",
      title: "Revisar conteúdo de banco de dados",
      description: "Reler o capítulo sobre normalização e refazer as consultas SQL da aula.",
      createdBy: "Bruno Lima",
      createdAt: created(-6),
      deadline: day(-2),
      status: "pendente",
      isDemo: true,
    },
    {
      id: "demo-3",
      title: "Finalizar exercício de programação",
      description: "Concluir o exercício de estruturas de repetição e enviar no ambiente da turma.",
      createdBy: "Carla Mendes",
      createdAt: created(-5),
      deadline: day(-1),
      status: "concluida",
      isDemo: true,
    },
    {
      id: "demo-4",
      title: "Estudar conceitos de orientação a objetos",
      description: "Entender classes, herança, encapsulamento e polimorfismo com exemplos.",
      createdBy: "Ana Souza",
      createdAt: created(-1),
      deadline: day(1),
      status: "pendente",
      isDemo: true,
    },
    {
      id: "demo-5",
      title: "Fazer resumo de algoritmos",
      description: "Montar um resumo sobre busca binária e ordenação para revisar antes da prova.",
      createdBy: "Diego Rocha",
      createdAt: created(0),
      deadline: day(5),
      status: "pendente",
      isDemo: true,
    },
  ];
}
