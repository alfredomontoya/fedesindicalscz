import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import Form from './Form';
import { Button } from '@/components/ui/button';

export default function Edit({ cumple }: any) {

  return (
    <>
      <Head title="Editar Cumple" />

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-4">Editar Cumple</h1>

        <Form
          initial={cumple}
          submitUrl={`/cumples/${cumple.id}`}
          method="put"
        />

        <div className="mt-4">
          <Button
            variant={'secondary'}
            onClick={() => router.visit('/cumples')}
          >
            ← Volver
          </Button>
        </div>

      </div>
    </>
  );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Cumples/Editar',
            href: '/cumples/',
        },
    ],
};
