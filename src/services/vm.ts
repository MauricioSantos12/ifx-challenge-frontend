import api from "./api";

export interface VM {
  id: string;
  name: string;
  cores: number;
  ram: number;
  disk: number;
  os: string;
  status: "Encendida" | "Apagada";
}

export type VMPayload = Omit<VM, "id">;

export const vmService = {
  getAll: () => api.get<VM[]>("/vms"),
  getById: (id: string) => api.get<VM>(`/vms/${id}`),
  create: (data: VMPayload) => api.post<VM>("/vms", data),
  update: (id: string, data: VMPayload) => api.put<VM>(`/vms/${id}`, data),
  delete: (id: string) => api.delete(`/vms/${id}`),
};
