import type { StoredStatus, Task, TaskInput } from "./tasks";

const API_URL = (import.meta.env["VITE_API_URL"] ?? "http://localhost:3001/api").replace(
  /\/+$/,
  "",
);

function normalizeTask(task: Task): Task {
  return { ...task, id: String(task.id) };
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  signal?: AbortSignal;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const init: RequestInit = { method: options.method ?? "GET" };
  if (options.signal) init.signal = options.signal;
  if (options.body !== undefined) {
    init.headers = { "Content-Type": "application/json" };
    init.body = JSON.stringify(options.body);
  }
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, init);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new Error("Não foi possível conectar ao servidor.");
  }

  if (response.status === 204) return undefined as T;

  const payload = await response.text();
  let data: unknown = null;
  if (payload) {
    try {
      data = JSON.parse(payload);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data
        ? String((data as { message?: unknown }).message)
        : null;
    throw new Error(message || `A solicitação falhou (${response.status}).`);
  }

  return data as T;
}

export function getTasks(signal?: AbortSignal): Promise<Task[]> {
  return request<Task[]>("/tarefas", signal ? { signal } : {}).then((tasks) =>
    tasks.map(normalizeTask),
  );
}

export function createTaskRequest(input: TaskInput): Promise<Task> {
  return request<Task>("/tarefas", { method: "POST", body: input }).then(normalizeTask);
}

export function updateTaskRequest(
  id: string,
  input: TaskInput,
  status: StoredStatus,
): Promise<Task> {
  return request<Task>(`/tarefas/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: { ...input, status },
  }).then(normalizeTask);
}

export function updateTaskStatusRequest(id: string, status: StoredStatus): Promise<Task> {
  return request<Task>(`/tarefas/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    body: { status },
  }).then(normalizeTask);
}

export function deleteTaskRequest(id: string): Promise<void> {
  return request<void>(`/tarefas/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
