import { Head, Link } from '@inertiajs/react';
import Form from './Form';

export default function Create() {
  return (
    <>
      <Head title="Nueva Publicacion" />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Nueva Publicacion
        </h1>

        <Form url="/publications" method="post" />

        <Link
          href="/publications"
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
            title: 'Publicaciones/Crear',
            href: '/publications',
        },
    ],
};
