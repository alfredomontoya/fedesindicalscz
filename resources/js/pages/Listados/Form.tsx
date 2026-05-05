import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router, useForm } from '@inertiajs/react';

type Props = {
  initialData?: {
    nombre: string;
    descripcion?: string | null;
    is_enable: boolean;
  };
  url: string;
  method?: 'post' | 'put';
};

export default function Form({
  initialData,
  url,
  method = 'post',
}: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    nombre: initialData?.nombre || '',
    descripcion: initialData?.descripcion || '',
    is_enable: initialData?.is_enable ?? true,
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    method === 'post' ? post(url) : put(url);
  };

  return (
    <form onSubmit={submit} className="space-y-6">

      <div className="grid gap-4 md:grid-cols-2">

        {/* NOMBRE */}
        <div className="space-y-2">
          <label htmlFor="nombre">Nombre</label>
          <Input
            id="nombre"
            value={data.nombre}
            onChange={(e) => setData('nombre', e.target.value)}
          />
          {errors.nombre && (
            <div className="text-red-500">{errors.nombre}</div>
          )}
        </div>

        {/* DESCRIPCIÓN */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="descripcion">Descripción</label>
          <Input
            id="descripcion"
            value={data.descripcion || ''}
            onChange={(e) => setData('descripcion', e.target.value)}
          />
          {errors.descripcion && (
            <div className="text-red-500">{errors.descripcion}</div>
          )}
        </div>

        {/* ESTADO */}
        <div className="space-y-2">
          <label htmlFor="is_enable">Estado</label>

          <Select
            value={data.is_enable ? '1' : '0'}
            onValueChange={(value) => setData('is_enable', value === '1')}
            >
            <SelectTrigger className="w-full" id="is_enable">
                <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="1">Activo</SelectItem>
                <SelectItem value="0">Inactivo</SelectItem>
            </SelectContent>
            </Select>

          {errors.is_enable && (
            <div className="text-red-500">{errors.is_enable}</div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 md:col-span-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.visit('/listados')}
          >
            Cancelar
          </Button>

          <Button type="submit" disabled={processing}>
            {method === 'post' ? 'Crear Listado' : 'Actualizar Listado'}
          </Button>
        </div>

      </div>
    </form>
  );
}
