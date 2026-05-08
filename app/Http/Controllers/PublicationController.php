<?php

namespace App\Http\Controllers;

use App\Models\Publication;
use App\Models\Institution;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\StorePublicationRequest;
use App\Http\Requests\UpdatePublicationRequest;
use App\Models\TypePublication;

class PublicationController extends Controller
{
    public function __construct()
    {
        // Aplica automáticamente policies (view, create, update, delete, etc.)
        $this->authorizeResource(Publication::class, 'publication');
    }

    /**
     * Listado
     */
    public function index(Request $request): Response
    {
        $publications = Publication::with([
                'user:id,name',
                'type_publication',
                'type_publication.institution'
            ])
            // ->where('user_id', $request->user()->id)
            ->search($request->input('search')) // scope en el modelo
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Publications/Index', [
            'filters' => $request->only('search'),
            'publications' => $publications
        ]);
    }

    /**
     * Formulario de creación
     */
    public function create(): Response
    {
        return Inertia::render('Publications/Create', [
            'institutions' => Institution::select([
            'id',
            'nombre'
            ])->get(),

            'typePublications' => TypePublication::with(
                'institution'
            )->get(),
        ]);
    }

    /**
     * Guardar
     */
    public function store(StorePublicationRequest $request)
    {
        Publication::create([
            ...$request->validated(),
            'user_id' => $request->user()->id,
        ]);

        return redirect()
            ->route('publications.index')
            ->with('success', 'Publicación registrada correctamente');
    }

    /**
     * Mostrar
     */
    public function show(Publication $publication): Response
    {
        $publication->load([
            'user:id,name',
            'type_publication.institution'
        ]);

        return Inertia::render('Publications/Show', [
            'publication' => $publication,
        ]);
    }

    /**
     * Formulario de edición
     */
    public function edit(Publication $publication): Response
    {
        return Inertia::render('Publications/Edit', [
            'institutions' => Institution::select(['id', 'nombre'])->get(),
            'publication' => $publication->load([
                'type_publication.institution'
            ])
        ]);
    }

    /**
     * Actualizar
     */
    public function update(UpdatePublicationRequest $request, Publication $publication)
    {
        $publication->update($request->validated());

        return redirect()
            ->route('publications.index')
            ->with('success', 'Publicación actualizada correctamente');
    }

    /**
     * Eliminar
     */
    public function destroy(Publication $publication)
    {
        $publication->delete();

        return redirect()
            ->route('publications.index')
            ->with('success', 'Publicación eliminada correctamente');
    }
}
