import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import type { TypePublication } from '@/types/type-publication';

export default function Show({ typePublication }: { typePublication: TypePublication }) {
  return (
    <>
      <Head title="Detalle de Tipo de Publicación" />

      <div className="p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
          <h1 className="text-2xl font-bold">Detalle de Tipo de Publicación</h1>
          <Button
            variant="default"
            onClick={() => router.visit(`/type-publications/${typePublication.id}/edit`)}
          >
            Editar
          </Button>
        </div>

        <div className="space-y-4 max-w-xl">
          <div>
            <div className="font-semibold">Nombre</div>
            <div>{typePublication.nombre}</div>
          </div>

          <div>
            <div className="font-semibold">Institución</div>
            <div>{typePublication.institution?.nombre ?? 'No definida'}</div>
          </div>

          <div>
            <div className="font-semibold">Activo</div>
            <div>{typePublication.activo ? 'Sí' : 'No'}</div>
          </div>

          <div>
            <div className="font-semibold">Font Size Vertical</div>
            <div>{typePublication.fontsize_vertical ?? '-'}</div>
          </div>

          <div>
            <div className="font-semibold">Font Size Horizontal</div>
            <div>{typePublication.fontsize_horizontal ?? '-'}</div>
          </div>

          <div>
            <div className="font-semibold">Top Vertical</div>
            <div>{typePublication.top_vertical ?? '-'}</div>
          </div>

          <div>
            <div className="font-semibold">Top Horizontal</div>
            <div>{typePublication.top_horizontal ?? '-'}</div>
          </div>

          <div>
            <div className="font-semibold">Fecha Bottom Horizontal</div>
            <div>{typePublication.fechaBottom_horizontal ?? '-'}</div>
          </div>

          <div>
            <div className="font-semibold">Fecha Bottom Vertical</div>
            <div>{typePublication.fechaBottom_vertical ?? '-'}</div>
          </div>

          <div>
            <div className="font-semibold">Creado</div>
            <div>{new Date(typePublication.created_at).toLocaleString()}</div>
          </div>

          <div>
            <div className="font-semibold">Actualizado</div>
            <div>{new Date(typePublication.updated_at).toLocaleString()}</div>
          </div>
        </div>

        <Link href="/type-publications" className="inline-block mt-6 text-gray-600">
          ← Volver
        </Link>
      </div>
    </>
  );
}

Show.layout = {
  breadcrumbs: [
    {
      title: 'TypePublications/Detalle',
      href: '/type-publications',
    },
  ],
};
