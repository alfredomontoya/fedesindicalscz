<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear rol de administrador
        Role::updateOrCreate(
            ['nombre' => 'admin'],
            ['descripcion' => 'Administrador del sistema con acceso total']
        );

        // Crear otros roles predeterminados
        Role::updateOrCreate(
            ['nombre' => 'editor'],
            ['descripcion' => 'Puede crear y editar contenido']
        );

        Role::updateOrCreate(
            ['nombre' => 'revisor'],
            ['descripcion' => 'Puede revisar contenido']
        );

        Role::updateOrCreate(
            ['nombre' => 'usuario'],
            ['descripcion' => 'Usuario estándar del sistema']
        );
    }
}
