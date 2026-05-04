<?php

namespace Database\Factories;

use App\Models\Listado;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Listado>
 */
class ListadoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'nombre' => $this->faker->word(),
            'descripcion' => $this->faker->sentence(),
            'is_enable' => true,
        ];
    }
}
