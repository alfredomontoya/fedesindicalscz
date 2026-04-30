<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResponsableEdificio extends Model
{
    use HasFactory;
    //
    protected $fillable = [
        'responsable_id',
        'edificio',
        'is_active',
    ];
    protected $table = 'responsable_edificios';

    public function responsable()
    {
        return $this->belongsTo(Responsable::class);
    }
}
