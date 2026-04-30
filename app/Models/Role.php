<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['nombre', 'descripcion'])]
class Role extends Model
{
    /** @use HasFactory<\Database\Factories\RoleFactory> */
    use HasFactory;

    public $timestamps = true;

    /**
     * Relación muchos-a-muchos con usuarios
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'role_user');
    }
}
