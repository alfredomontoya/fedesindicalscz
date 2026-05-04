<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Funcionario;
use App\Models\Listado;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FuncionarioTest extends TestCase
{
    use RefreshDatabase;

    public function test_db_testing()
    {
        $this->assertSame('sqlite', config('database.default'));
    }

    /** @test */
    public function test_puede_listar_funcionarios_http()
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();

        $this->actingAs($user); // 🔐 autenticación simulada

        \App\Models\Funcionario::factory()->count(3)->create();

        $response = $this->get('/funcionarios');

        $response->assertStatus(200);
    }

    /** @test */
    public function test_puede_crear_funcionario()
    {
        $listado = Listado::factory()->create();

        $funcionario = Funcionario::create([
            'listado_id' => $listado->id,
            'nro_lista' => '001',
            'nombre' => 'Juan Perez',
            'ci' => '123456',
            'cargo' => 'Analista',
            'edificio' => 'Central',
            'tipo' => 'item',
        ]);

        $this->assertDatabaseHas('funcionarios', [
            'ci' => '123456',
            'nombre' => 'Juan Perez',
        ]);
    }

    /** @test */
    public function test_puede_leer_funcionario()
    {

        /** @var \App\Models\Funcionario $funcionario */
        $funcionario = Funcionario::factory()->create();

        /** @var \App\Models\Funcionario|null $resultado */
        $resultado = Funcionario::findOrFail($funcionario->id);

        $this->assertNotNull($resultado);
        $this->assertEquals($funcionario->id, $resultado->id);
    }

    /** @test */
    public function test_puede_actualizar_funcionario()
    {
        $funcionario = Funcionario::factory()->create();

        $funcionario->update([
            'nombre' => 'Carlos Gomez',
            'cargo' => 'Supervisor'
        ]);

        $this->assertDatabaseHas('funcionarios', [
            'id' => $funcionario->id,
            'nombre' => 'Carlos Gomez',
            'cargo' => 'Supervisor'
        ]);
    }

    /** @test */
    public function test_puede_eliminar_funcionario()
    {
        $funcionario = Funcionario::factory()->create();

        $funcionario->delete();

        $this->assertDatabaseMissing('funcionarios', [
            'id' => $funcionario->id
        ]);
    }


}
