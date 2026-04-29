import type { Institution } from './institution';

export type TypePublication = {
  id: number;
  nombre: string;

  institution_id: number;

  fontsize_vertical: string | null;
  fontsize_horizontal: string | null;
  top_vertical: string | null;
  top_horizontal: string | null;
  fechaBottom_horizontal: string | null;
  fechaBottom_vertical: string | null;

  activo: boolean;

  created_at: string;
  updated_at: string;

  // relación (cuando uses with)
  institution?: Institution | null;
};
