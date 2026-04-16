import { Head, Link, router } from '@inertiajs/react';
import Form from './Form';
import { Button } from '@/components/ui/button';

export default function Edit({ condolencia }: any) {
  return (
    <>
      <Head title="Editar Condolencia" />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Editar Condolencia
        </h1>

        <Form
          initialData={condolencia}
          url={`/condolencias/${condolencia.id}`}
          method="put"
        />
        <br />
        <Button
            variant={'secondary'}
          onClick={ () => router.visit('/condolencias')}

        >
          ← Volver
        </Button>
      </div>
    </>
  );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Condolencias/Editar',
            href: '/condolencias',
        },
    ],
};
