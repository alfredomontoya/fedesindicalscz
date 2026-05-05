import { Head } from '@inertiajs/react';
import Form from './Form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Create() {
  return (
    <>
      <Head title="Nuevo Listado" />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Nuevo Listado</h1>

        <Card>
          <CardHeader>
            <CardTitle>Datos del listado</CardTitle>
          </CardHeader>

          <CardContent>
            <Form
              url="/listados"
              method="post"
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

Create.layout = {
  breadcrumbs: [
    {
      title: 'Listados',
      href: '/listados',
    },
    {
      title: 'Crear',
      href: '/listados/create',
    },
  ],
};
