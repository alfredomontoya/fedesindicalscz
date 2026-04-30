import { User } from "./auth";

export interface Role {
  id: number;
  nombre: string;
  descripcion: string | null;
  users: User[];
  created_at: string;
  updated_at: string;
}
