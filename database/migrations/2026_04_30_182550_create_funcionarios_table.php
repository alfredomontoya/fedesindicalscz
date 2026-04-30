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
        Schema::create('funcionarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('listado_id')->constrained('listados')->onDelete('cascade');
            $table->string('nro_lista');
            $table->string('nombre');
            $table->string('ci');
            $table->string('cargo')->nullable();
            $table->string('edificio')->nullable();
            $table->string('tipo')->in(['item', 'contrato'])->default('item');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('funcionarios');
    }
};
