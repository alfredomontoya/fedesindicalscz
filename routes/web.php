<?php

use App\Http\Controllers\CondolenciaController;
use App\Http\Controllers\CumpleController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::resource('condolencias', CondolenciaController::class)
    ->middleware(['auth'])
    ->names('condolencias');

Route::middleware(['auth'])->group(function () {
    Route::resource('cumples', CumpleController::class);
});
require __DIR__.'/settings.php';
