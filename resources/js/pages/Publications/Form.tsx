// resources/js/pages/publications/Form.tsx

import React from 'react';

import { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  initialData?: any;

  url: string;

  method?: 'post' | 'put';

  previewData: any;

  setPreviewData: React.Dispatch<
    React.SetStateAction<any>
  >;

  typePublications: any[];
};

export default function Form({
  initialData,
  url,
  method = 'post',
  previewData,
  setPreviewData,
  typePublications,
}: Props) {

  const firstType =
    typePublications?.[0] || null;

  const {
    data,
    setData,
    post,
    put,
    processing,
    errors,
  } = useForm({

    institution_id:
      initialData?.institution_id ||
      String(firstType?.institution_id || '1'),

    type_publication_id:
      initialData?.type_publication_id ||
      String(firstType?.id || '1'),

    tratamiento:
      initialData?.tratamiento || 'Sr',

    nombre:
      initialData?.nombre || '',

    fecha:
      initialData?.fecha
        ? new Date(initialData.fecha)
            .toISOString()
            .split('T')[0]
        : new Date()
            .toISOString()
            .split('T')[0],
  });

  // 🔥 ACTUALIZAR FORM + PREVIEW
  const setField = (
    field: string,
    value: any
  ) => {

    setData(field as any, value);

    // 🔥 TYPE PUBLICATION
    if (
      field === 'type_publication_id'
    ) {

      const selectedType =
        typePublications.find(
          (item) =>
            String(item.id) ===
            String(value)
        );

      setPreviewData((prev: any) => ({
        ...prev,

        type_publication_id:
          value,

        institution_id:
          String(
            selectedType?.institution_id
          ),

        type_publication:
          selectedType,
      }));

      return;
    }

    // 🔥 DEFAULT
    setPreviewData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    method === 'post'
      ? post(url)
      : put(url);
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-5"
    >

      {/* TIPO */}
      <div>

        <Label className="mb-2 block">
          Tipo publicación
        </Label>

        <Select
          value={String(
            data.type_publication_id
          )}
          onValueChange={(value) =>
            setField(
              'type_publication_id',
              value
            )
          }
        >

          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccione tipo" />
          </SelectTrigger>

          <SelectContent>

            {typePublications.map(
              (item) => (

                <SelectItem
                  key={item.id}
                  value={String(item.id)}
                >
                  {item.nombre}
                </SelectItem>

              )
            )}

          </SelectContent>

        </Select>

        {errors.type_publication_id && (
          <div className="text-red-500 text-sm mt-1">
            {
              errors.type_publication_id
            }
          </div>
        )}

      </div>

      {/* TRATAMIENTO */}
      <div>

        <Label className="mb-2 block">
          Tratamiento
        </Label>

        <Select
          value={data.tratamiento}
          onValueChange={(value) =>
            setField(
              'tratamiento',
              value
            )
          }
        >

          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccione tratamiento" />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="Sr">
              Sr
            </SelectItem>

            <SelectItem value="Sra">
              Sra
            </SelectItem>

          </SelectContent>

        </Select>

        {errors.tratamiento && (
          <div className="text-red-500 text-sm mt-1">
            {errors.tratamiento}
          </div>
        )}

      </div>

      {/* NOMBRE */}
      <div>

        <Label className="mb-2 block">
          Nombre
        </Label>

        <Input
          value={data.nombre}
          onChange={(e) =>
            setField(
              'nombre',
              e.target.value
            )
          }
        />

        {errors.nombre && (
          <div className="text-red-500 text-sm mt-1">
            {errors.nombre}
          </div>
        )}

      </div>

      {/* FECHA */}
      <div>

        <Label className="mb-2 block">
          Fecha
        </Label>

        <Input
          type="date"
          value={data.fecha}
          onChange={(e) =>
            setField(
              'fecha',
              e.target.value
            )
          }
        />

        {errors.fecha && (
          <div className="text-red-500 text-sm mt-1">
            {errors.fecha}
          </div>
        )}

      </div>

      {/* BOTÓN */}
      <Button
        type="submit"
        disabled={processing}
        className="w-full"
      >
        Guardar publicación
      </Button>

    </form>
  );
}
