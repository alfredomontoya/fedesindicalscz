import { Head, Link } from '@inertiajs/react';
import Form from './Form';
import type { Institution } from '@/types/institution';


export default function Create({ institutions }: { institutions: Institution[] }) {
  return (
    <>
      <Head title="Nuevo Tipo de Publicación" />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Nuevo Tipo de Publicación</h1>

        <Form institutions={institutions} url="/type-publications" method="post" />

        <Link href="/type-publications" className="inline-block mt-4 text-gray-600">
          ← Volver
        </Link>
      </div>
    </>
  );
}

Create.layout = {
  breadcrumbs: [
    {
      title: 'TypePublications/Crear',
      href: '/type-publications',
    },
  ],
};
