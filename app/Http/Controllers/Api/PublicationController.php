<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use Illuminate\Http\Request;
use App\Http\Resources\PublicationResource;
use App\Http\Requests\StorePublicationRequest;
use App\Http\Requests\UpdatePublicationRequest;

class PublicationController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->authorizeResource(Publication::class, 'publication');
    }

    /**
     * Listado
     */
    public function index(Request $request)
    {
        $publications = Publication::with([
                'user:id,name',
                'type_publication.institution:id,nombre'
            ])
            ->where('user_id', $request->user()->id)
            ->search($request->search)
            ->latest()
            ->paginate(10);

        return PublicationResource::collection($publications);
    }

    /**
     * Guardar
     */
    public function store(StorePublicationRequest $request)
    {
        $publication = Publication::create([
            ...$request->validated(),
            'user_id' => $request->user()->id
        ]);

        return new PublicationResource($publication);
    }

    /**
     * Mostrar
     */
    public function show(Publication $publication)
    {
        $pub = new PublicationResource($publication->load([
            'user:id,name',
            'type_publication.institution:id,nombre'
        ]));
        dd($pub);
        return new PublicationResource(
            $publication->load([
                'user:id,name',
                'type_publication.institution'
            ])
        );
    }

    /**
     * Actualizar
     */
    public function update(UpdatePublicationRequest $request, Publication $publication)
    {
        $publication->update($request->validated());

        return new PublicationResource($publication);
    }

    /**
     * Eliminar
     */
    public function destroy(Publication $publication)
    {
        $publication->delete();

        return response()->json([
            'message' => 'Eliminado correctamente'
        ]);
    }
}
