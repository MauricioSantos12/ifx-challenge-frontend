import api from "./api";

export interface User {
  id: string;
  email: string;
  role: "Admin" | "Cliente";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  login: (data: LoginPayload) =>
    api.post<{ user: User }>("/login", data).then((res) => res.data.user),
};
