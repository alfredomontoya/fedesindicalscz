<?php

namespace Database\Seeders;

use App\Models\Publication;
use App\Models\TypePublication;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PublicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Publication::factory(20)->create();
    }
}
