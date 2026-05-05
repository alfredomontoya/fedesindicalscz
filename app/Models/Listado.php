<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listado extends Model
{
    use HasFactory;
    //
    protected $fillable = [
        'nombre',
        'descripcion',
        'is_enable',
    ];

    protected $table = 'listados';

    /**
     * Relations
     */

    public function funcionarios()
    {
        return $this->hasMany(Funcionario::class, 'listado_id');
    }

}
