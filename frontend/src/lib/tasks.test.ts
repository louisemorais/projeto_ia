import { describe, expect, it } from "vitest";

import {
  createTask,
  filterTasks,
  getDeadlineAlert,
  getDisplayStatus,
  updateTask,
  validateTaskInput,
  type Task,
} from "./tasks";

const today = new Date(2026, 10, 18, 15, 0, 0); // 18/11/2026

function task(partial: Partial<Task>): Task {
  return {
    id: "t",
    title: "Tarefa",
    description: "Descrição",
    createdBy: "Ana",
    createdAt: new Date(2026, 10, 10).toISOString(),
    deadline: "2026-11-25",
    status: "pendente",
    ...partial,
  };
}

describe("status das tarefas", () => {
  it("marca como atrasada uma tarefa não concluída com prazo vencido", () => {
    expect(getDisplayStatus(task({ deadline: "2026-11-17", status: "em_andamento" }), today)).toBe(
      "atrasada",
    );
  });

  it("não considera atrasada uma tarefa concluída com prazo vencido", () => {
    expect(getDisplayStatus(task({ deadline: "2026-11-01", status: "concluida" }), today)).toBe(
      "concluida",
    );
  });

  it("não considera atrasada uma tarefa que vence hoje", () => {
    expect(getDisplayStatus(task({ deadline: "2026-11-18" }), today)).toBe("pendente");
  });
});

describe("avisos de vencimento", () => {
  it("indica prazo próximo para hoje e amanhã", () => {
    expect(getDeadlineAlert(task({ deadline: "2026-11-18" }), today)).toBe("proximo");
    expect(getDeadlineAlert(task({ deadline: "2026-11-19" }), today)).toBe("proximo");
  });

  it("não avisa quando o prazo é depois de amanhã", () => {
    expect(getDeadlineAlert(task({ deadline: "2026-11-20" }), today)).toBeNull();
  });

  it("indica prazo vencido para tarefa atrasada", () => {
    expect(getDeadlineAlert(task({ deadline: "2026-11-17" }), today)).toBe("vencido");
  });

  it("não apresenta aviso para tarefa concluída", () => {
    expect(getDeadlineAlert(task({ deadline: "2026-11-17", status: "concluida" }), today)).toBeNull();
    expect(getDeadlineAlert(task({ deadline: "2026-11-18", status: "concluida" }), today)).toBeNull();
  });
});

describe("filtros", () => {
  const tasks = [
    task({ id: "a", status: "pendente" }),
    task({ id: "b", status: "em_andamento" }),
    task({ id: "c", status: "concluida" }),
    task({ id: "d", status: "pendente", deadline: "2026-11-10" }),
  ];

  it("Todas exibe todas as tarefas", () => {
    expect(filterTasks(tasks, "todas", today).map((t) => t.id)).toEqual(["a", "b", "c", "d"]);
  });

  it("Pendentes não inclui tarefas atrasadas", () => {
    expect(filterTasks(tasks, "pendente", today).map((t) => t.id)).toEqual(["a"]);
  });

  it("Atrasadas exibe apenas as tarefas com prazo vencido", () => {
    expect(filterTasks(tasks, "atrasada", today).map((t) => t.id)).toEqual(["d"]);
  });
});

describe("cadastro e edição", () => {
  it("exige título, descrição, criador e prazo", () => {
    const errors = validateTaskInput({ title: " ", description: "", createdBy: "", deadline: "" });
    expect(Object.keys(errors).sort()).toEqual(["createdBy", "deadline", "description", "title"]);
  });

  it("nova tarefa começa como Pendente com data de criação automática", () => {
    const created = createTask(
      { title: "A", description: "B", createdBy: "C", deadline: "2026-11-20" },
      today,
      "x",
    );
    expect(created.status).toBe("pendente");
    expect(created.createdAt).toBe(today.toISOString());
  });

  it("edição preserva a data de criação original", () => {
    const original = task({});
    const edited = updateTask(
      original,
      { title: "Novo", description: "Nova", createdBy: "Bia", deadline: "2026-12-01" },
      "em_andamento",
    );
    expect(edited.createdAt).toBe(original.createdAt);
    expect(edited.title).toBe("Novo");
    expect(edited.status).toBe("em_andamento");
  });
});
