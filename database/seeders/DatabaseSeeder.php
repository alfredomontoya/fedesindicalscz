<?php

namespace Database\Seeders;

use App\Http\Controllers\InstitutionController;
use App\Models\TypePublication;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Alfredo Montoya',
            'email' => 'amontoya@example.com',
            'password' => bcrypt('4725253'),
        ]);

        $this->call(InstitutionSeeder::class);
        $this->call(TypePublicationSeeder::class);
        $this->call(PublicationSeeder::class);
    }
}
