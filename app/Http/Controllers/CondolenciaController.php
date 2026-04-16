<?php

namespace App\Http\Controllers;

use App\Models\Condolencia;
use Faker\Provider\Base;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CondolenciaController extends BaseController
{

    use AuthorizesRequests, ValidatesRequests;

    public function __construct()
    {
        $this->authorizeResource(Condolencia::class, 'condolencia');
    }
    /**
     * Listado
     */
    public function index()
    {
        $condolencias = Condolencia::with('user')->where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Condolencias/Index', [
            'condolencias' => $condolencias
        ]);
    }

    /**
     * Formulario de creación (opcional si usas modal)
     */
    public function create()
    {
        return Inertia::render('Condolencias/Create');
    }

    /**
     * Guardar
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'tratamiento' => 'required|in:Sr,Sra',
            'nombre' => 'required|string|max:255',
            'fecha' => 'required|date',
        ]);

        $data['user_id'] = auth()->id();

        Condolencia::create($data);

        return redirect()
            ->route('condolencias.index')
            ->with('success', 'Condolencia registrada correctamente');
    }

    /**
     * Mostrar (opcional)
     */
    public function show(Condolencia $condolencia)
    {
        $this->authorizeUser($condolencia);

        return Inertia::render('Condolencias/Show', [
            'condolencia' => $condolencia
        ]);
    }

    /**
     * Formulario de edición
     */
    public function edit(Condolencia $condolencia)
    {
        $this->authorizeUser($condolencia);

        return Inertia::render('Condolencias/Edit', [
            'condolencia' => $condolencia
        ]);
    }

    /**
     * Actualizar
     */
    public function update(Request $request, Condolencia $condolencia)
    {
        $this->authorizeUser($condolencia);

        $data = $request->validate([
            'tratamiento' => 'required|in:Sr,Sra',
            'nombre' => 'required|string|max:255',
            'fecha' => 'required|date',
        ]);

        $condolencia->update($data);

        return redirect()
            ->route('condolencias.index')
            ->with('success', 'Condolencia actualizada correctamente');
    }

    /**
     * Eliminar
     */
    public function destroy(Condolencia $condolencia)
    {
        $this->authorizeUser($condolencia);

        $condolencia->delete();

        return redirect()
            ->route('condolencias.index')
            ->with('success', 'Condolencia eliminada correctamente');
    }

    /**
     * Seguridad: validar que pertenece al usuario
     */
    private function authorizeUser(Condolencia $condolencia)
    {
        if ($condolencia->user_id !== auth()->id()) {
            abort(403, 'No autorizado');
        }
    }
}
