import type { User, Task, ApiResponse } from "../types";

const BASE_URL = "http://localhost:5015/api";

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const { body, ...customConfig } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = body;
  }

  try {
    const response = await fetch(BASE_URL + endpoint, config);

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      const error = new Error(
        errorData.message || "Ocorreu um erro na requisição."
      );
      // error.response = response; // Descomente se precisar inspecionar a resposta completa no erro
      throw error;
    }

    // Para respostas 204 No Content, o corpo é vazio
    if (response.status === 204) {
      // Retornamos um objeto no formato esperado pela ApiResponse
      return { data: {} as T };
    }

    const data: T = await response.json();
    return { data }; // Envolvemos o resultado em um objeto { data: ... }
  } catch (error) {
    console.error("Erro na chamada da API:", error);
    throw error;
  }
}

// --- Funções para Usuários ---
export const getUsers = (): Promise<ApiResponse<User[]>> =>
  apiFetch<User[]>("/user");
export const getUser = (userId: string): Promise<ApiResponse<User>> =>
  apiFetch<User>(`/user/${userId}`);
export const createUser = (
  userData: Omit<User, "id">
): Promise<ApiResponse<User>> =>
  apiFetch<User>("/user", {
    method: "POST",
    body: JSON.stringify(userData),
  });
export const updateUser = (
  userId: number,
  userData: Omit<User, "id">
): Promise<ApiResponse<User>> =>
  apiFetch<User>(`/user/${userId}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  });
export const deleteUser = (userId: number): Promise<ApiResponse<{}>> =>
  apiFetch<{}>(`/user/${userId}`, {
    method: "DELETE",
  });

// --- Funções para Tarefas ---
export const getTasksByUser = (userId: string): Promise<ApiResponse<Task[]>> =>
  apiFetch<Task[]>(`/user/${userId}/tasks`);
export const createTask = (
  taskData: Omit<Task, "id">
): Promise<ApiResponse<Task>> =>
  apiFetch<Task>("/task", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
export const updateTask = (
  taskId: number,
  taskData: Partial<Task>
): Promise<ApiResponse<Task>> =>
  apiFetch<Task>(`/task/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
export const deleteTask = (taskId: number): Promise<ApiResponse<{}>> =>
  apiFetch<{}>(`/task/${taskId}`, {
    method: "DELETE",
  });
