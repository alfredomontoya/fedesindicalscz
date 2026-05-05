<?php

namespace App\Policies;

use App\Models\User;
use App\Models\TypePublication;

class TypePublicationPolicy
{
    /**
     * Ver listado
     */
    public function viewAny(User $user): bool
    {
        return true; // todos los usuarios autenticados
    }

    /**
     * Ver uno
     */
    public function view(User $user, TypePublication $typePublication): bool
    {
        return true;
    }

    /**
     * Crear
     */
    public function create(User $user): bool
    {
        return $user->isAdmin(); // solo admin
    }

    /**
     * Actualizar
     */
    public function update(User $user, TypePublication $typePublication): bool
    {
        return $user->isAdmin();
    }

    /**
     * Eliminar
     */
    public function delete(User $user, TypePublication $typePublication): bool
    {
        return $user->isAdmin();
    }

    /**
     * Restaurar (opcional)
     */
    public function restore(User $user, TypePublication $typePublication): bool
    {
        return false;
    }

    /**
     * Eliminar permanentemente (opcional)
     */
    public function forceDelete(User $user, TypePublication $typePublication): bool
    {
        return false;
    }
}
