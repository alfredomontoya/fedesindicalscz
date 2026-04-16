import { Button } from '@/components/ui/button';
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
    fecha_nacimiento: initial?.fecha_nacimiento
        ? new Date(initial.fecha_nacimiento).toISOString().split('T')[0]
        : '',
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

      <Button
        disabled={processing}
        variant={'default'}
      >
        Guardar
      </Button>

    </form>
  );
}
