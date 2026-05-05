import { Head, Link } from '@inertiajs/react';
import Form from './Form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Listado } from '@/types/listado';



export default function Create({ listados }: { listados: Listado[] }) {
  return (
    <>
      <Head title="Nuevo Funcionario" />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Nuevo Funcionario</h1>

        <Card>
          <CardHeader>
            <CardTitle>Datos del usuario</CardTitle>
          </CardHeader>
          <CardContent>
                <Form
                    listados={listados}
                    url="/funcionarios"
                    method="post"
                    />

                {/* <Link
                    href="/funcionarios"
                    className="inline-block mt-4 text-gray-600"
                    >
                    ← Volver
                </Link> */}
          </CardContent>
    </Card>

      </div>
    </>
  );
}

Create.layout = {
  breadcrumbs: [
    {
      title: 'Funcionarios/Crear',
      href: '/funcionarios',
    },
  ],
};
