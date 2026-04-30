<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Listado extends Model
{
    //
    protected $fillable = [
        'nombre',
        'descripcion',
        'is_enable',
    ];

    protected $table = 'listados';

}
