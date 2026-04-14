<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Condolencia;

class CondolenciaPolicy
{
    /**
     * Ver listado
     */
    public function viewAny(User $user): bool
    {
        return true; // cualquier usuario autenticado
    }

    /**
     * Ver un registro
     */
    public function view(User $user, Condolencia $condolencia): bool
    {
        return $user->id === $condolencia->user_id;
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
    public function update(User $user, Condolencia $condolencia): bool
    {
        return $user->id === $condolencia->user_id;
    }

    /**
     * Eliminar
     */
    public function delete(User $user, Condolencia $condolencia): bool
    {
        return $user->id === $condolencia->user_id;
    }
}
