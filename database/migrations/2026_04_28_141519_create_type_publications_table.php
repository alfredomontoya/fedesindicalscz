<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('type_publications', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->foreignId('institution_id')->constrained()->cascadeOnDelete();

            $table->string('fontsize_vertical')->nullable();
            $table->string('fontsize_horizontal')->nullable();
            $table->string('top_vertical')->nullable();
            $table->string('top_horizontal')->nullable();
            $table->string('fechaBottom_horizontal')->nullable();
            $table->string('fechaBottom_vertical')->nullable();

            $table->boolean('activo')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('type_publications');
    }
};
