<?php

use App\Http\Controllers\FuncionarioController;
use App\Http\Controllers\ListadoController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\TypePublicationController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::resource('publications', PublicationController::class)
    ->middleware(['auth'])
    ->names('publications');

Route::resource('type-publications', TypePublicationController::class)
    ->middleware(['auth'])
    ->names('type-publications');

Route::resource('roles', RoleController::class)
    ->middleware(['auth'])
    ->names('roles');

Route::resource('funcionarios', FuncionarioController::class)
    ->middleware(['auth'])
    ->names('funcionarios');

Route::resource('listados', ListadoController::class)
    ->middleware(['auth'])
    ->names('listados');

Route::resource('users', \App\Http\Controllers\UserController::class)
    ->middleware(['auth', 'admin'])
    ->names('users');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::post('roles/{role}/assign', [RoleController::class, 'assignRole'])->name('roles.assign');
    Route::post('roles/{role}/remove', [RoleController::class, 'removeRole'])->name('roles.remove');
    Route::get('api/users', [RoleController::class, 'getAvailableUsers'])->name('api.users');
});

Route::middleware(['auth'])->group(function () {
    Route::get('api/all-users', [RoleController::class, 'getAllUsers'])->name('api.all-users');
});

Route::get('/api/publications/{id}', [PublicationController::class, 'showApi'])->middleware(['auth']);


Route::middleware(['auth'])->group(function () {
    // Route::resource('cumples', CumpleController::class);
});
require __DIR__.'/settings.php';
