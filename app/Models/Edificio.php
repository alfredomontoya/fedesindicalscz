<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Edificio extends Model
{
    //
    protected $table = 'edificio';

    protected $fillable = [
        'listado_id',
        'nombre',
        'activo',
    ];

    // Relación con el modelo Listado
    public function listado()
    {
        return $this->belongsTo(Listado::class, 'listado_id');
    }
}
