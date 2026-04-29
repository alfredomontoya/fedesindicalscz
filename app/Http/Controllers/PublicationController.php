<?php

namespace App\Http\Controllers;

use App\Models\Publication;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicationController extends BaseController
{

    use AuthorizesRequests, ValidatesRequests;

    public function __construct()
    {
        $this->authorizeResource(Publication::class, 'publication');
    }
    /**
     * Listado
     */
    public function index()
    {
        $query = Publication::with(['user', 'type_publication.institution'])
            ->where('user_id', auth()->id());

        // if (request('search')) {
        //     $query->where('nombre', 'like', '%' . request('search') . '%');
        // }

        $publications = $query->latest()->get();

        return Inertia::render('Publications/Index', [
            'publications' => $publications
        ]);
    }

    /**
     * Formulario de creación (opcional si usas modal)
     */
    public function create()
    {
        return Inertia::render('Publications/Create');
    }

    /**
     * Guardar
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'type_publication_id' => 'required|exists:type_publications,id',
            'tratamiento' => 'required|in:Sr,Sra',
            'nombre' => 'required|string|max:255',
            'fecha_nacimiento' => 'required|date',
            'fecha' => 'required|date',
        ]);

        $data['user_id'] = auth()->id();

        Publication::create($data);

        return redirect()
            ->route('publications.index')
            ->with('success', 'Publicacion registrada correctamente');
    }

    /**
     * Mostrar (opcional)
     */
    public function show(Publication $publication)
    {
        return Inertia::render('Publications/Show', [
            'publication' => $publication,
        ]);
    }

    public function showApi($id)
    {
        $publication = Publication::with([
            'user',
            'type_publication.institution'
        ])->findOrFail($id);

        // 🔐 aplicar policy manualmente
        $this->authorize('view', $publication);

        return response()->json([
            'data' => $publication
        ]);
    }

    /**
     * Formulario de edición
     */
    public function edit(Publication $publication)
    {
        $this->authorizeUser($publication);

        return Inertia::render('Publications/Edit', [
            'publication' => $publication
        ]);
    }

    /**
     * Actualizar
     */
    public function update(Request $request, Publication $publication)
    {
        $this->authorizeUser($publication);

        $data = $request->validate([
            'type_publication_id' => 'required|exists:type_publications,id',
            'tratamiento' => 'required|in:Sr,Sra',
            'nombre' => 'required|string|max:255',
            'fecha_nacimiento' => 'required|date',
            'fecha' => 'required|date',
        ]);

        $publication->update($data);

        return redirect()
            ->route('publications.index')
            ->with('success', 'Publicacion actualizada correctamente');
    }

    /**
     * Eliminar
     */
    public function destroy(Publication $publication)
    {
        $this->authorizeUser($publication);

        $publication->delete();

        return redirect()
            ->route('publications.index')
            ->with('success', 'Publicacion eliminada correctamente');
    }

    /**
     * Seguridad: validar que pertenece al usuario
     */
    private function authorizeUser(Publication $publication)
    {
        if ($publication->user_id !== auth()->id()) {
            abort(403, 'No autorizado');
        }
    }
}
