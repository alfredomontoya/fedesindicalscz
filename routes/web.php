<?php

use App\Http\Controllers\FuncionarioController;
use App\Http\Controllers\ListadoController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\TypePublicationController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

/*
|--------------------------------------------------------------------------
| Home
|--------------------------------------------------------------------------
*/
Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

/*
|--------------------------------------------------------------------------
| Resources (WEB - Inertia)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {

    Route::resource('publications', PublicationController::class)
        ->names('publications');

    Route::resource('type-publications', TypePublicationController::class)
        ->names('type-publications');

    Route::resource('roles', RoleController::class)
        ->names('roles');

    Route::resource('funcionarios', FuncionarioController::class)
        ->names('funcionarios');

    Route::resource('listados', ListadoController::class)
        ->names('listados');
});

/*
|--------------------------------------------------------------------------
| ADMIN ACTIONS (WEB)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'admin'])->group(function () {

    Route::post('roles/{role}/assign', [RoleController::class, 'assignRole'])
        ->name('roles.assign');

    Route::post('roles/{role}/remove', [RoleController::class, 'removeRole'])
        ->name('roles.remove');
});

require __DIR__.'/settings.php';
