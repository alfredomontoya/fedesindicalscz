import { useForm } from '@inertiajs/react';

type Props = {
  initial?: any;
  submitUrl: string;
  method?: 'post' | 'put';
};

export default function Form({ initial, submitUrl, method = 'post' }: Props) {

  const { data, setData, post, put, processing } = useForm({
    tratamiento: initial?.tratamiento ?? '',
    nombre: initial?.nombre ?? '',
    fecha_nacimiento: initial?.fecha_nacimiento ?? '',
  });

  const submit = (e: any) => {
    e.preventDefault();

    if (method === 'post') {
      post(submitUrl);
    } else {
      put(submitUrl);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">

      <input
        className="border p-2 w-full"
        placeholder="Tratamiento (Sr, Sra)"
        value={data.tratamiento}
        onChange={(e) => setData('tratamiento', e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Nombre"
        value={data.nombre}
        onChange={(e) => setData('nombre', e.target.value)}
      />

      <input
        type="date"
        className="border p-2 w-full"
        value={data.fecha_nacimiento}
        onChange={(e) => setData('fecha_nacimiento', e.target.value)}
      />

      <button
        disabled={processing}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>

    </form>
  );
}
