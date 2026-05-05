<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;
use App\Models\Listado;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Inertia\Inertia;

class FuncionarioController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function __construct()
    {
        if (!app()->runningInConsole()) {
            $this->authorizeResource(Funcionario::class, 'funcionario');
        }
    }

    /**
     * Listado de funcionarios
     */
    public function index(Request $request)
    {
        $search = $request->string('search')->trim();

        $query = Funcionario::with('listado')->latest();

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('nombre', 'like', "%{$search}%")
                  ->orWhere('ci', 'like', "%{$search}%")
                  ->orWhere('cargo', 'like', "%{$search}%")
                  ->orWhere('edificio', 'like', "%{$search}%")
                  ->orWhereHas('listado', function ($q) use ($search) {
                      $q->where('nombre', 'like', "%{$search}%");
                  });
            });
        }

        $funcionarios = $query->paginate(10)->withQueryString();

        return Inertia::render('Funcionarios/Index', [
            'funcionarios' => $funcionarios,
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
        return Inertia::render('Funcionarios/Create', [
            'listados' => Listado::select('id', 'nombre')->get(),
        ]);
    }

    /**
     * Guardar funcionario
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'ci' => 'required|string|max:20',
            'cargo' => 'required|string|max:255',
            'edificio' => 'required|string|max:255',
            'tipo' => 'required|in:Item,Contrato',
            'listado_id' => 'required|exists:listados,id',
            'nro_lista' => 'nullable|string|max:50',
        ]);

        Funcionario::create($data);

        return redirect()
            ->route('funcionarios.index')
            ->with('success', 'Funcionario creado correctamente');
    }

    /**
     * Mostrar funcionario
     */
    public function show(Funcionario $funcionario)
    {
        return Inertia::render('Funcionarios/Show', [
            'funcionario' => $funcionario->load('listado'),
        ]);
    }

    /**
     * Formulario de edición
     */
    public function edit(Funcionario $funcionario)
    {
        return Inertia::render('Funcionarios/Edit', [
            'funcionario' => $funcionario,
            'listados' => Listado::select('id', 'nombre')->get(),
        ]);
    }

    /**
     * Actualizar funcionario
     */
    public function update(Request $request, Funcionario $funcionario)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'ci' => 'required|string|max:20',
            'cargo' => 'required|string|max:255',
            'edificio' => 'required|string|max:255',
            'tipo' => 'required|in:Item,Contrato',
            'listado_id' => 'required|exists:listados,id',
            'nro_lista' => 'nullable|string|max:50',
        ]);

        $funcionario->update($data);

        return redirect()
            ->route('funcionarios.show', $funcionario)
            ->with('success', 'Funcionario actualizado correctamente');
    }

    /**
     * Eliminar funcionario
     */
    public function destroy(Funcionario $funcionario)
    {
        $funcionario->delete();

        return redirect()
            ->route('funcionarios.index')
            ->with('success', 'Funcionario eliminado correctamente');
    }
}
