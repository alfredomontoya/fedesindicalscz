import { Head, Link } from '@inertiajs/react';
import Form from './Form';

export default function Create() {
  return (
    <>
      <Head title="Nueva Condolencia" />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Nueva Condolencia
        </h1>

        <Form url="/condolencias" method="post" />

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

Create.layout = {
    breadcrumbs: [
        {
            title: 'Condolencias/Crear',
            href: '/condolencias',
        },
    ],
};
