<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Funcionario;

class FuncionarioPolicy
{
    /**
     * Ver listado
     */
    public function viewAny(User $user): bool
    {
        return true; // cualquier usuario autenticado puede ver
    }

    /**
     * Ver un funcionario
     */
    public function view(User $user, Funcionario $funcionario): bool
    {
        return true; // puedes restringir si quieres
    }

    /**
     * Crear
     */
    public function create(User $user): bool
    {
        return $this->isAdmin($user);
    }

    /**
     * Actualizar
     */
    public function update(User $user, Funcionario $funcionario): bool
    {
        return $this->isAdmin($user);
    }

    /**
     * Eliminar
     */
    public function delete(User $user, Funcionario $funcionario): bool
    {
        return $this->isAdmin($user);
    }

    /**
     * Restaurar (opcional)
     */
    public function restore(User $user, Funcionario $funcionario): bool
    {
        return false;
    }

    /**
     * Forzar eliminación (opcional)
     */
    public function forceDelete(User $user, Funcionario $funcionario): bool
    {
        return false;
    }

    /**
     * 🔐 Helper: verificar admin
     */
    private function isAdmin(User $user): bool
    {
        // Ajusta según tu sistema de roles

        // opción 1: método en modelo
        if (method_exists($user, 'isAdmin')) {
            return $user->isAdmin();
        }

        // opción 2: relación roles
        return $user->roles()
            ->where('nombre', 'admin')
            ->exists();
    }
}
