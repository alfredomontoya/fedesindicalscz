import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';

type Props = {
  initialData?: any;
  url: string;
  method?: 'post' | 'put';
};

export default function Form({ initialData, url, method = 'post' }: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    tratamiento: initialData?.tratamiento || 'Sr',
    nombre: initialData?.nombre || '',
    fecha: initialData?.fecha
        ? new Date(initialData.fecha).toISOString().split('T')[0]
        : '',
  });

  const submit = (e: any) => {
    e.preventDefault();
    method === 'post' ? post(url) : put(url);
  };

  return (
    <form onSubmit={submit} className="space-y-4 max-w-md">

      <div>
        <label className="block mb-1">Tratamiento</label>
        <select
          value={data.tratamiento}
          onChange={e => setData('tratamiento', e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="Sr" className='text-black' >Sr</option>
          <option value="Sra" className='text-black'>Sra</option>
        </select>
        {errors.tratamiento && <div className="text-red-500">{errors.tratamiento}</div>}
      </div>

      <div>
        <label className="block mb-1">Nombre</label>
        <input
          value={data.nombre}
          onChange={e => setData('nombre', e.target.value)}
          className="border p-2 w-full rounded"
        />
        {errors.nombre && <div className="text-red-500">{errors.nombre}</div>}
      </div>

      <div>
        <label className="block mb-1">Fecha</label>
        <input
          type="date"
          value={data.fecha}
          onChange={e => setData('fecha', e.target.value)}
          className="border p-2 w-full rounded"
        />
        {errors.fecha && <div className="text-red-500">{errors.fecha}</div>}
      </div>

      <Button
        variant={'default'}
        type="submit"
        disabled={processing}
      >
        Guardar
      </Button>
    </form>
  );
}
