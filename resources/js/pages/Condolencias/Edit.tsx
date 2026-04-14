import { Head, Link } from '@inertiajs/react';
import Form from './Form';

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

        <Link
          href="/condolencias"
          className="inline-block mt-4 text-gray-600"
        >
          ← Volver
        </Link>
      </div>
    </>
  );
}
