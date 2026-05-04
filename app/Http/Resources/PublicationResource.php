<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'tratamiento' => $this->tratamiento,
            'fecha' => $this->fecha,
            'fecha_nacimiento' => $this->fecha_nacimiento,

            'user' => [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
            ],

            'type_publication' => [
                'id' => $this->type_publication?->id,
                'nombre' => $this->type_publication?->nombre,
                'institution' => [
                    'id' => $this->type_publication?->institution?->id,
                    'nombre' => $this->type_publication?->institution?->nombre,
                ]
            ],
        ];
    }
}
