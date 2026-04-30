<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Funcionario;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FuncionarioTest extends TestCase
{
    use RefreshDatabase;

    public function test_puede_encontrar_funcionario_por_id()
    {
        // Crear un funcionario en la BD de prueba
        $funcionario = Funcionario::factory()->create();

        // Buscarlo
        $resultado = Funcionario::find($funcionario->id);

        // Verificar
        $this->assertNotNull($resultado);
        $this->assertEquals($funcionario->id, $resultado->id);
    }

    public function test_find_1()
{
    Funcionario::factory()->create(['id' => 1]);

    $resultado = Funcionario::find(1);

    $this->assertNotNull($resultado);
}
}
