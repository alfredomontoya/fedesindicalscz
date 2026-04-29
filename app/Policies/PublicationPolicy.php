<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Publication;

class PublicationPolicy
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
    public function view(User $user, Publication $publication): bool
    {
        return $user && $user->id === $publication->user_id;
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
    public function update(User $user, Publication $publication): bool
    {
        return $user->id === $publication->user_id;
    }

    /**
     * Eliminar
     */
    public function delete(User $user, Publication $publication): bool
    {
        return $user->id === $publication->user_id;
    }
}
