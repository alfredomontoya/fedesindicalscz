<?php

namespace App\Policies;

use App\Models\Responsable;
use App\Models\User;

class ResponsablePolicy
{
    /**
     * Permite bypass total si es admin
     */
    public function before(User $user, string $ability)
    {
        if ($user->isAdmin()) {
            return true;
        }
    }

    /**
     * Ver listado
     */
    public function viewAny(User $user): bool
    {
        return true; // cualquier usuario autenticado
    }

    /**
     * Ver un registro específico
     */
    public function view(User $user, Responsable $responsable): bool
    {
        return $responsable->user_id === $user->id;
    }

    /**
     * Crear
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Actualizar
     */
    public function update(User $user, Responsable $responsable): bool
    {
        return $responsable->user_id === $user->id;
    }

    /**
     * Eliminar
     */
    public function delete(User $user, Responsable $responsable): bool
    {
        return $responsable->user_id === $user->id;
    }

    /**
     * Restaurar (si usas soft deletes)
     */
    public function restore(User $user, Responsable $responsable): bool
    {
        return $responsable->user_id === $user->id;
    }

    /**
     * Eliminar permanentemente
     */
    public function forceDelete(User $user, Responsable $responsable): bool
    {
        return $responsable->user_id === $user->id;
    }
}
