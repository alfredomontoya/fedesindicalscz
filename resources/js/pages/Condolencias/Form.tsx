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
    fecha: initialData?.fecha || '',
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
          <option value="Sr">Sr</option>
          <option value="Sra">Sra</option>
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

      <button
        type="submit"
        disabled={processing}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>
    </form>
  );
}
