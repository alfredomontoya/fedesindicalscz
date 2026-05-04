<?php

namespace Database\Factories;

use App\Models\Funcionario;
use App\Models\Listado;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Funcionario>
 */
class FuncionarioFactory extends Factory
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
            'nombre' => $this->faker->name(),
            'ci' => $this->faker->numerify('########'),
            'cargo' => $this->faker->jobTitle(),
            'edificio' => $this->faker->randomElement($edificios),
            'tipo' => $this->faker->randomElement(['Item', 'Contrato']),
            'listado_id' => Listado::factory(),
            // 'listado_id' => Listado::all('id')->random(),
            'nro_lista' => $this->faker->numerify('###'),
        ];
    }
}
