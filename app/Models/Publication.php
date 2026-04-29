<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;
    //
    protected $table = 'publications';

    protected $fillable = [
        'user_id',
        'type_publication_id',
        'tratamiento',
        'nombre',
        'fecha_nacimiento',
        'fecha',
    ];

    protected $casts = [
        'fecha_nacimiento' => 'date',
        'fecha' => 'date',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relaciones
    |--------------------------------------------------------------------------
    */
    public function user () {
        return $this->belongsTo(User::class);
    }

    public function type_publication () {
        return $this->belongsTo(TypePublication::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

}
