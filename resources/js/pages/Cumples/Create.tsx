import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import Form from './Form';

export default function Create() {

  return (
    <AppLayout>
      <Head title="Nuevo Cumple" />

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-4">Nuevo Cumple</h1>

        <Form
          submitUrl="/cumples"
          method="post"
        />

        <div className="mt-4">
          <Link href="/cumples" className="text-gray-600">
            Volver
          </Link>
        </div>

      </div>
    </AppLayout>
  );
}
