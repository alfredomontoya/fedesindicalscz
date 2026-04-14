<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cumple extends Model
{
    protected $table = 'cumples';

    protected $fillable = [
        'tratamiento',
        'nombre',
        'fecha_nacimiento',
        'user_id',
    ];

    protected $casts = [
        'fecha_nacimiento' => 'date',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relaciones
    |--------------------------------------------------------------------------
    */

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    public function getNombreCompletoAttribute(): string
    {
        return "{$this->tratamiento} {$this->nombre}";
    }
}
