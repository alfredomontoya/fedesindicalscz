<?php

namespace Database\Seeders;

use App\Http\Controllers\InstitutionController;
use App\Models\Funcionario;
use App\Models\Listado;
use App\Models\Responsable;
use App\Models\ResponsableEdificio;
use App\Models\Role;
use App\Models\TypePublication;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->truncateAllTables();

        // Crear roles primero
        $this->call(RoleSeeder::class);

        // Crear usuario de prueba
        $user = User::factory()->create([
            'name' => 'Alfredo Montoya',
            'email' => 'amontoya@example.com',
            'password' => bcrypt('4725253'),
        ]);

        // Asignar rol de admin al usuario
        $adminRole = Role::firstWhere('nombre', 'admin');
        if ($adminRole) {
            $user->roles()->attach($adminRole->id);
        }

        User::factory(50)->create();

        $this->call(InstitutionSeeder::class);
        $this->call(TypePublicationSeeder::class);
        $this->call(PublicationSeeder::class);

        Responsable::factory(10)->create();
        Listado::create([
            'nombre' => 'FIESTA 2026',
            'descripcion' => 'Listado de funcionarios activos en la institución',
            'is_enable' => true,
        ]);
        Funcionario::factory(50)->create();
        $this->call(ResponsableEdificioSeeder::class);
    }

    /**
     * Truncate all application tables and reset auto-increment counters.
     */
    protected function truncateAllTables(): void
    {
        Schema::disableForeignKeyConstraints();

        $connection = DB::connection();
        $driver = $connection->getDriverName();
        $tables = [];

        if ($driver === 'mysql') {
            $database = $connection->getDatabaseName();
            $tables = collect(DB::select('SHOW TABLES'))->map(function ($row) {
                return array_values((array) $row)[0];
            })->toArray();
        } elseif ($driver === 'sqlite') {
            $tables = collect(DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"))
                ->pluck('name')
                ->toArray();
        } elseif ($driver === 'pgsql') {
            $tables = collect(DB::select("SELECT tablename FROM pg_tables WHERE schemaname = 'public'"))
                ->pluck('tablename')
                ->toArray();
        } else {
            $tables = Schema::getConnection()->getDoctrineSchemaManager()->listTableNames();
        }

        foreach ($tables as $table) {
            if ($table === 'migrations') {
                continue;
            }

            DB::table($table)->truncate();
        }

        Schema::enableForeignKeyConstraints();
    }
}
