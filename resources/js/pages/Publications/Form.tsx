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
};

export default function Form({
  initialData,
  url,
  method = 'post',
  previewData,
  setPreviewData,
}: Props) {

  const {
    data,
    setData,
    post,
    put,
    processing,
    errors,
  } = useForm({

    institution_id:
      initialData?.institution_id || '1',

    type_publication_id:
      initialData?.type_publication_id || '1',

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

      {/* INSTITUCION */}
      <div>

        <Label className="mb-2 block">
          Institución
        </Label>

        <Select
          value={String(data.institution_id)}
          onValueChange={(value) =>
            setField(
              'institution_id',
              value
            )
          }
        >

          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccione institución" />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="1">
              Federación
            </SelectItem>

            <SelectItem value="2">
              Sindicato
            </SelectItem>

          </SelectContent>

        </Select>

        {errors.institution_id && (
          <div className="text-red-500 text-sm mt-1">
            {errors.institution_id}
          </div>
        )}

      </div>

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

            <SelectItem value="1">
              Condolencia
            </SelectItem>

            <SelectItem value="2">
              Cumpleaños
            </SelectItem>

          </SelectContent>

        </Select>

        {errors.type_publication_id && (
          <div className="text-red-500 text-sm mt-1">
            {errors.type_publication_id}
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

      {/* BOTON */}
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
