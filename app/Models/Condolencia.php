<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Condolencia extends Model
{
    protected $table = 'condolencias';

    protected $fillable = [
        'tratamiento',
        'nombre',
        'fecha',
        'user_id',
    ];

    protected $casts = [
        'fecha' => 'date',
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
