<?php

use App\Http\Controllers\PublicationController;
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

Route::get('/api/publications/{id}', [PublicationController::class, 'showApi'])->middleware(['auth']);

Route::middleware(['auth'])->group(function () {
    // Route::resource('cumples', CumpleController::class);
});
require __DIR__.'/settings.php';
