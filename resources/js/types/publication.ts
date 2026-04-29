import type { TypePublication } from './type-publication';

export type Publication = {
  id: number;

  user_id: number;
  type_publication_id: number;

  tratamiento: string;
  nombre: string;
  fecha_nacimiento: string | null;
  fecha: string;

  created_at: string;
  updated_at: string;

  // relaciones (opcionales según with())
  user?: {
    id: number;
    name: string;
    email?: string;
  } | null;

  type_publication?: TypePublication | null;
};
