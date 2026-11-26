import { afterEach, describe, expect, it, vi } from "vitest";

import { createTaskRequest, getTasks } from "./tasks-api";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("API de tarefas", () => {
  it("carrega tarefas e normaliza os identificadores retornados pelo PostgreSQL", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify([{ id: 12, title: "Estudar" }]), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    await expect(getTasks()).resolves.toEqual([{ id: "12", title: "Estudar" }]);
  });

  it("envia novos dados para a API e apresenta mensagens de erro do servidor", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ id: 8, title: "Revisar" }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ message: "Prazo inválido" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }),
      );
    vi.stubGlobal("fetch", fetchMock);

    const input = {
      title: "Revisar",
      description: "Capítulo 2",
      createdBy: "Ana",
      deadline: "2026-12-01",
    };

    await expect(createTaskRequest(input)).resolves.toMatchObject({ id: "8" });
    expect(fetchMock.mock.calls[0]?.[1]).toMatchObject({
      method: "POST",
      body: JSON.stringify(input),
    });
    await expect(createTaskRequest(input)).rejects.toThrow("Prazo inválido");
  });
});
