<?php

namespace App\Http\Controllers;

use App\Models\Cumple;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CumpleController extends Controller
{
    public function index()
    {
        return Inertia::render('Cumples/Index', [
            'cumples' => Cumple::with('user')->latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Cumples/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'tratamiento' => 'required',
            'nombre' => 'required',
            'fecha_nacimiento' => 'required|date',
        ]);

        Cumple::create([
            'user_id' => auth()->id(),
            'tratamiento' => $request->tratamiento,
            'nombre' => $request->nombre,
            'fecha_nacimiento' => $request->fecha_nacimiento,
        ]);

        return redirect()->route('cumples.index');
    }

    public function edit(Cumple $cumple)
    {
        return Inertia::render('Cumples/Edit', [
            'cumple' => $cumple
        ]);
    }

    public function update(Request $request, Cumple $cumple)
    {
        $request->validate([
            'tratamiento' => 'required',
            'nombre' => 'required',
            'fecha_nacimiento' => 'required|date',
        ]);

        $cumple->update($request->only([
            'tratamiento',
            'nombre',
            'fecha_nacimiento'
        ]));

        return redirect()->route('cumples.index');
    }

    public function destroy(Cumple $cumple)
    {
        $cumple->delete();
        return back();
    }
}
