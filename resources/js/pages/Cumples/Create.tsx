import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import Form from './Form';
import { Button } from '@/components/ui/button';

export default function Create() {

  return (
    <>
      <Head title="Nuevo Cumple" />

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-4">Nuevo Cumple</h1>

        <Form
          submitUrl="/cumples"
          method="post"
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

Create.layout = {
    breadcrumbs: [
        {
            title: 'Cumples/Crear',
            href: '/cumples',
        },
    ],
};
