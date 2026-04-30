<?php

namespace Database\Factories;

use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Model>
 */
class ResponsableEdificioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $edificios = ['Edificio A', 'Edificio B', 'Edificio C', 'Edificio D', 'Edificio E', 'Edificio F', 'Edificio G', 'Edificio H', 'Edificio I', 'Edificio J'];
        return [
            //
            'responsable_id' => \App\Models\Responsable::factory(),
            'edificio' => $this->faker->randomElement($edificios),
            // 'is_active' => $this->faker->boolean(),
        ];
    }
}
