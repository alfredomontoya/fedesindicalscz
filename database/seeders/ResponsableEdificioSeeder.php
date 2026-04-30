<?php

namespace Database\Seeders;

use App\Models\Responsable;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResponsableEdificioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $edificios = ['Edificio A', 'Edificio B', 'Edificio C', 'Edificio D', 'Edificio E', 'Edificio F', 'Edificio G', 'Edificio H', 'Edificio I', 'Edificio J'];
        foreach(Responsable::all() as $responsable) {
            \App\Models\ResponsableEdificio::factory()->create([
                'responsable_id' => $responsable->id,
                'edificio' => $edificios[array_rand($edificios)],
            ]);
         }

    }
}
