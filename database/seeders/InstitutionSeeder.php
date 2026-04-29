<?php

namespace Database\Seeders;

use App\Models\Institution;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstitutionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Institution::create([
            'nombre' => 'Federacion Sindical de Trabajadores de Santa Cruz',
            'sigla' => 'FSTSC',
            'prefix' => 'fede',
        ]);
        Institution::create([
            'nombre' => 'Sindicato de Trabajadores Municipales de Santa Cruz',
            'sigla' => 'STMSC',
            'prefix' => 'sind',
        ]);
    }
}
