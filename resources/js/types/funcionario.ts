import type { Listado } from "./listado";

export interface Funcionario {
    id: number;
    listado_id: number;
    nro_lista: string;
    nombre: string;
    ci: string;
    cargo?: string | null;
    edificio?: string | null;
    tipo: 'item' | 'contrato';
    created_at: string;
    updated_at: string;
    listado: Listado
}
