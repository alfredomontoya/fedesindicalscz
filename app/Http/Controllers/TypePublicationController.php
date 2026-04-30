<?php

namespace App\Http\Controllers;

use App\Models\Institution;
use App\Models\TypePublication;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;

class TypePublicationController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * Listado de tipos de publicación.
     */
    public function index(Request $request)
    {
        $search = $request->string('search')->trim();

        $query = TypePublication::with('institution')->latest();

        if ($search !== '') {
            $query->where(function ($query) use ($search) {
                $query->where('nombre', 'like', "%{$search}%")
                    ->orWhereHas('institution', function ($query) use ($search) {
                        $query->where('nombre', 'like', "%{$search}%");
                    });
            });
        }

        $typePublications = $query->paginate(10)->withQueryString();

        return Inertia::render('TypePublications/Index', [
            'typePublications' => $typePublications,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Formulario de creación.
     */
    public function create()
    {
        return Inertia::render('TypePublications/Create', [
            'institutions' => Institution::select('id', 'nombre')->get(),
        ]);
    }

    /**
     * Guardar nuevo tipo de publicación.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'institution_id' => 'required|exists:institutions,id',
            'fontsize_vertical' => 'nullable|string|max:255',
            'fontsize_horizontal' => 'nullable|string|max:255',
            'top_vertical' => 'nullable|string|max:255',
            'top_horizontal' => 'nullable|string|max:255',
            'fechaBottom_horizontal' => 'nullable|string|max:255',
            'fechaBottom_vertical' => 'nullable|string|max:255',
            'activo' => 'sometimes|boolean',
        ]);

        $data['activo'] = $request->boolean('activo', true);

        TypePublication::create($data);

        return redirect()
            ->route('type-publications.index')
            ->with('success', 'Tipo de publicación creado correctamente');
    }

    /**
     * Mostrar un tipo de publicación.
     */
    public function show(TypePublication $typePublication)
    {
        return Inertia::render('TypePublications/Show', [
            'typePublication' => $typePublication->load('institution'),
        ]);
    }

    /**
     * Formulario de edición.
     */
    public function edit(TypePublication $typePublication)
    {
        return Inertia::render('TypePublications/Edit', [
            'typePublication' => $typePublication,
            'institutions' => Institution::select('id', 'nombre')->get(),
        ]);
    }

    /**
     * Actualizar tipo de publicación.
     */
    public function update(Request $request, TypePublication $typePublication)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'institution_id' => 'required|exists:institutions,id',
            'fontsize_vertical' => 'nullable|string|max:255',
            'fontsize_horizontal' => 'nullable|string|max:255',
            'top_vertical' => 'nullable|string|max:255',
            'top_horizontal' => 'nullable|string|max:255',
            'fechaBottom_horizontal' => 'nullable|string|max:255',
            'fechaBottom_vertical' => 'nullable|string|max:255',
            'activo' => 'sometimes|boolean',
        ]);

        $data['activo'] = $request->boolean('activo', true);

        $typePublication->update($data);

        return redirect()
            ->route('type-publications.show', $typePublication)
            ->with('success', 'Tipo de publicación actualizado correctamente');
    }

    /**
     * Eliminar tipo de publicación.
     */
    public function destroy(TypePublication $typePublication)
    {
        TypePublication::destroy($typePublication->id);

        return redirect()
            ->route('type-publications.index')
            ->with('success', 'Tipo de publicación eliminado correctamente');
    }
}
