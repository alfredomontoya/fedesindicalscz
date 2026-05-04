<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use App\Models\User;
use App\Models\Publication;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PublicationApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_lista_publicaciones()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        Publication::factory()->count(3)->create([
            'user_id' => $user->id
        ]);

        $response = $this->getJson('/api/publications');

        $response->assertStatus(200)
                 ->assertJsonCount(3, 'data');
    }

    public function test_crear_publicacion()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $data = Publication::factory()->make()->toArray();

        $response = $this->postJson('/api/publications', $data);

        $response->assertStatus(201)
                 ->assertJsonStructure(['data' => ['id', 'nombre']]);
    }

    public function test_ver_publicacion()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $publication = Publication::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->getJson("/api/publications/{$publication->id}");

        $response->assertStatus(200)
                 ->assertJsonPath('data.id', $publication->id);
    }

    public function test_actualizar_publicacion()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $publication = Publication::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->putJson("/api/publications/{$publication->id}", [
            'nombre' => 'Nuevo Nombre'
        ]);

        $response->assertStatus(200)
                 ->assertJsonPath('data.nombre', 'Nuevo Nombre');
    }

    public function test_eliminar_publicacion()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $publication = Publication::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->deleteJson("/api/publications/{$publication->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('publications', [
            'id' => $publication->id
        ]);
    }

    public function test_no_puede_ver_publicacion_de_otro_usuario()
    {
        $user = User::factory()->create();
        $otro = User::factory()->create();

        $this->actingAs($user, 'sanctum');

        $publication = Publication::factory()->create([
            'user_id' => $otro->id
        ]);

        $response = $this->getJson("/api/publications/{$publication->id}");

        $response->assertStatus(403);
    }
}
