import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import Form from './Form';

export default function Edit({ cumple }: any) {

  return (
    <AppLayout>
      <Head title="Editar Cumple" />

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-4">Editar Cumple</h1>

        <Form
          initial={cumple}
          submitUrl={`/cumples/${cumple.id}`}
          method="put"
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
