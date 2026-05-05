<?php

namespace App\Http\Controllers;

use App\Models\Listado;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Inertia\Inertia;

class ListadoController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function __construct()
    {
        if (!app()->runningInConsole()) {
            $this->authorizeResource(Listado::class, 'listado');
        }
    }

    /**
     * Listado de listados
     */
    public function index(Request $request)
    {
        $search = $request->string('search')->trim();

        $query = Listado::query()->latest();

        if ($search !== '') {
            $query->where('nombre', 'like', "%{$search}%");
        }

        $listados = $query->paginate(10)->withQueryString();

        return Inertia::render('Listados/Index', [
            'listados' => $listados,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Formulario de creación
     */
    public function create()
    {
        return Inertia::render('Listados/Create');
    }

    /**
     * Guardar listado
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        Listado::create($data);

        return redirect()
            ->route('listados.index')
            ->with('success', 'Listado creado correctamente');
    }

    /**
     * Mostrar listado
     */
    public function show(Listado $listado)
    {
        return Inertia::render('Listados/Show', [
            'listado' => $listado->load('funcionarios'),
        ]);
    }

    /**
     * Formulario de edición
     */
    public function edit(Listado $listado)
    {
        return Inertia::render('Listados/Edit', [
            'listado' => $listado,
        ]);
    }

    /**
     * Actualizar listado
     */
    public function update(Request $request, Listado $listado)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        $listado->update($data);

        return redirect()
            ->route('listados.show', $listado)
            ->with('success', 'Listado actualizado correctamente');
    }

    /**
     * Eliminar listado
     */
    public function destroy(Listado $listado)
    {
        $listado->delete();

        return redirect()
            ->route('listados.index')
            ->with('success', 'Listado eliminado correctamente');
    }
}
