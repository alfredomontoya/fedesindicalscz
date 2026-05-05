import { Head } from '@inertiajs/react';
import Form from './Form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Listado } from '@/types/listado';

export default function Edit({ listado }: { listado: Listado }) {
  return (
    <>
      <Head title={`Editar: ${listado.nombre}`} />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Editar Listado
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Datos del listado</CardTitle>
          </CardHeader>

          <CardContent>
            <Form
              initialData={listado}
              url={`/listados/${listado.id}`}
              method="put"
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

Edit.layout = {
  breadcrumbs: [
    {
      title: 'Listados',
      href: '/listados',
    },
    {
      title: 'Editar',
      href: '#',
    },
  ],
};
