import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import type { Institution } from '@/types/institution';
import type { TypePublication } from '@/types/type-publication';

type Props = {
  institutions?: Institution[];
  initialData?: TypePublication;
  url: string;
  method?: 'post' | 'put';
};

export default function Form({ institutions = [], initialData, url, method = 'post' }: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    nombre: initialData?.nombre || '',
    institution_id: initialData?.institution_id ?? '',
    fontsize_vertical: initialData?.fontsize_vertical || '',
    fontsize_horizontal: initialData?.fontsize_horizontal || '',
    top_vertical: initialData?.top_vertical || '',
    top_horizontal: initialData?.top_horizontal || '',
    fechaBottom_horizontal: initialData?.fechaBottom_horizontal || '',
    fechaBottom_vertical: initialData?.fechaBottom_vertical || '',
    activo: initialData?.activo ?? true,
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    method === 'post' ? post(url) : put(url);
  };

  return (
    <form onSubmit={submit} className="space-y-4 max-w-xl">
      <div>
        <label className="block mb-1">Nombre</label>
        <input
          value={data.nombre}
          onChange={(e) => setData('nombre', e.target.value)}
          className="border p-2 w-full rounded"
        />
        {errors.nombre && <div className="text-red-500">{errors.nombre}</div>}
      </div>

      <div>
        <label className="block mb-1">Institución</label>
        <select
          value={data.institution_id}
          onChange={(e) => setData('institution_id', e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="">Seleccionar institución</option>
          {institutions.map((institution) => (
            <option key={institution.id} value={institution.id} className="text-black">
              {institution.nombre}
            </option>
          ))}
        </select>
        {errors.institution_id && <div className="text-red-500">{errors.institution_id}</div>}
      </div>

      <div>
        <label className="block mb-1">Font Size Vertical</label>
        <input
          value={data.fontsize_vertical}
          onChange={(e) => setData('fontsize_vertical', e.target.value)}
          className="border p-2 w-full rounded"
        />
        {errors.fontsize_vertical && <div className="text-red-500">{errors.fontsize_vertical}</div>}
      </div>

      <div>
        <label className="block mb-1">Font Size Horizontal</label>
        <input
          value={data.fontsize_horizontal}
          onChange={(e) => setData('fontsize_horizontal', e.target.value)}
          className="border p-2 w-full rounded"
        />
        {errors.fontsize_horizontal && <div className="text-red-500">{errors.fontsize_horizontal}</div>}
      </div>

      <div>
        <label className="block mb-1">Top Vertical</label>
        <input
          value={data.top_vertical}
          onChange={(e) => setData('top_vertical', e.target.value)}
          className="border p-2 w-full rounded"
        />
        {errors.top_vertical && <div className="text-red-500">{errors.top_vertical}</div>}
      </div>

      <div>
        <label className="block mb-1">Top Horizontal</label>
        <input
          value={data.top_horizontal}
          onChange={(e) => setData('top_horizontal', e.target.value)}
          className="border p-2 w-full rounded"
        />
        {errors.top_horizontal && <div className="text-red-500">{errors.top_horizontal}</div>}
      </div>

      <div>
        <label className="block mb-1">Fecha Bottom Horizontal</label>
        <input
          value={data.fechaBottom_horizontal}
          onChange={(e) => setData('fechaBottom_horizontal', e.target.value)}
          className="border p-2 w-full rounded"
        />
        {errors.fechaBottom_horizontal && <div className="text-red-500">{errors.fechaBottom_horizontal}</div>}
      </div>

      <div>
        <label className="block mb-1">Fecha Bottom Vertical</label>
        <input
          value={data.fechaBottom_vertical}
          onChange={(e) => setData('fechaBottom_vertical', e.target.value)}
          className="border p-2 w-full rounded"
        />
        {errors.fechaBottom_vertical && <div className="text-red-500">{errors.fechaBottom_vertical}</div>}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="activo"
          type="checkbox"
          checked={data.activo}
          onChange={(e) => setData('activo', e.target.checked)}
          className="rounded"
        />
        <label htmlFor="activo">Activo</label>
      </div>

      <Button type="submit" variant="default" disabled={processing}>
        Guardar
      </Button>
    </form>
  );
}
