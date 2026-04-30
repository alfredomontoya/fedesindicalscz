<?php

namespace Database\Seeders;

use App\Models\TypePublication;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypePublicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        TypePublication::create([
            'nombre' => 'condolencia federacion',
            'institution_id' => 1,
            'fontsize_vertical' => '120',
            'fontsize_horizontal' => '150',
            'top_vertical' => '1300',
            'top_horizontal' => '1250',
            'fechaBottom_horizontal' => '220',
            'fechaBottom_vertical' => '120',
        ]);
        TypePublication::create([
            'nombre' => 'cumpleaños federacion',
            'institution_id' => 1,
            'fontsize_vertical' => '120',
            'fontsize_horizontal' => '150',
            'top_vertical' => '1000',
            'top_horizontal' => '1350',
            'fechaBottom_horizontal' => '220',
            'fechaBottom_vertical' => '120',
        ]);
        TypePublication::create([
            'nombre' => 'condolencia sindicato',
            'institution_id' => 2,
            'fontsize_vertical' => '120',
            'fontsize_horizontal' => '180',
            'top_vertical' => '1300',
            'top_horizontal' => '1150',
            'fechaBottom_horizontal' => '30',
            'fechaBottom_vertical' => '60',
        ]);
        TypePublication::create([
            'nombre' => 'cumpleaños sindicato',
            'institution_id' => 2,
            'fontsize_vertical' => '24',
            'fontsize_horizontal' => '18',
            'top_vertical' => '100',
            'top_horizontal' => '50',
            'fechaBottom_horizontal' => '20',
            'fechaBottom_vertical' => '20',
        ]);
    }
}
