<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePublicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check(); // Solo usuarios autenticados pueden crear publicaciones
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'type_publication_id' => 'required|exists:type_publications,id',
            'tratamiento' => 'required|in:Sr,Sra',
            'nombre' => 'required|string|max:255',
            'fecha_nacimiento' => 'nullable|date',
            'fecha' => 'required|date',
        ];
    }
}
