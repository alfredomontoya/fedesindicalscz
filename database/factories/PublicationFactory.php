<?php

namespace Database\Factories;

use App\Models\Institution;
use App\Models\Publication;
use App\Models\TypePublication;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Publication>
 */
class PublicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tratamientos = ['Ing', 'sr', 'sra', 'dr', 'dra', 'lic', 'abg'];
        return [
            //
            'user_id' => User::all('id')->random(),
            'type_publication_id' => TypePublication::all('id')->random(),
            'tratamiento' => $this->faker->randomElement($tratamientos),
            'nombre' => "{$this->faker->name()} {$this->faker->firstName()}",
            'fecha_nacimiento' => $this->faker->dateTimeBetween('1950-01-01', '2000-12-30'),
            'fecha' => now(),
        ];
    }
}
