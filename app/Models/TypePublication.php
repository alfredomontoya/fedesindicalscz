<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypePublication extends Model
{
    //
    protected $table = 'type_publications';

    protected $fillable = [
        'nombre',
        'institution_id',
        'fontsize_vertical',
        'fontsize_horizontal',
        'top_vertical',
        'top_horizontal',
        'fechaBottom_horizontal',
        'fechaBottom_vertical',
        'activo',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relaciones
    |--------------------------------------------------------------------------
    */
    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

}
