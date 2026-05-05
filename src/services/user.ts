import api from "./api";

export interface UserRecord {
  id: string;
  email: string;
  role: "Admin" | "Cliente";
  created_at: string;
  updated_at: string;
}

export interface UserPayload {
  email: string;
  password?: string;
  role: "Admin" | "Cliente";
}

export const userService = {
  getAll: () => api.get<UserRecord[]>("/users"),
  create: (data: UserPayload) => api.post<UserRecord>("/users", data),
  update: (id: string, data: UserPayload) => api.put<UserRecord>(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};
