<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Listado;

class ListadoPolicy
{
    /**
     * Ver listado (index)
     */
    public function viewAny(User $user): bool
    {
        return true; // cualquier usuario autenticado
    }

    /**
     * Ver un listado
     */
    public function view(User $user, Listado $listado): bool
    {
        return true;
    }

    /**
     * Crear listado
     */
    public function create(User $user): bool
    {
        return $this->isAdmin($user);
    }

    /**
     * Actualizar listado
     */
    public function update(User $user, Listado $listado): bool
    {
        return $this->isAdmin($user);
    }

    /**
     * Eliminar listado
     */
    public function delete(User $user, Listado $listado): bool
    {
        return $this->isAdmin($user);
    }

    /**
     * Restaurar (opcional)
     */
    public function restore(User $user, Listado $listado): bool
    {
        return false;
    }

    /**
     * Eliminación forzada (opcional)
     */
    public function forceDelete(User $user, Listado $listado): bool
    {
        return false;
    }

    /**
     * 🔐 Helper: verificar si es admin
     */
    private function isAdmin(User $user): bool
    {
        // opción 1: método en modelo User
        if (method_exists($user, 'isAdmin')) {
            return $user->isAdmin();
        }

        // opción 2: relación roles
        return $user->roles()
            ->where('nombre', 'admin')
            ->exists();
    }
}
