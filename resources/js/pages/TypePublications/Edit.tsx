import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import Form from './Form';
import type { TypePublication } from '@/types/type-publication';
import { Institution } from '@/types/institution';

export default function Edit(
    { institutions, typePublication }:
    { institutions: Institution[], typePublication: TypePublication }) {
  return (
    <>
      <Head title="Editar Tipo de Publicación" />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Editar Tipo de Publicación</h1>

        <Form
          initialData={typePublication}
          url={`/type-publications/${typePublication.id}`}
          method="put"
          institutions={institutions}
        />

        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => router.visit('/type-publications')}
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
      title: 'TypePublications/Editar',
      href: '/type-publications',
    },
  ],
};
