<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    use HasFactory;
    //
    protected $fillable = [
        'listado_id',
        'nro_lista',
        'nombre',
        'ci',
        'cargo',
        'edificio',
        'tipo',
    ];

    protected $table = 'funcionarios';

    public function listado()
    {
        return $this->belongsTo(Listado::class);
    }

    public function responsableEdificio()
    {
        return $this->hasMany(ResponsableEdificio::class, 'edificio', 'edificio');
    }


}
