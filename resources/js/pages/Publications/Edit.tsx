import { Head, Link, router } from '@inertiajs/react';
import Form from './Form';
import { Button } from '@/components/ui/button';

export default function Edit({ publication }: any) {
  return (
    <>
      <Head title="Editar publication" />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Editar publication
        </h1>

        <Form
          initialData={publication}
          url={`/publications/${publication.id}`}
          method="put"
        />
        <br />
        <Button
            variant={'secondary'}
          onClick={ () => router.visit('/publications')}

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
            title: 'Publications/Editar',
            href: '/publications',
        },
    ],
};
