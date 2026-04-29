import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, RectangleVertical, RectangleHorizontal } from 'lucide-react';
import ModalGenerarImagen from '@/components/ModalGenerarImagen';
import { Publication } from '@/types/publication';


export default function Index({ publications }: { publications: Publication[] }) {

  const [selected, setSelected] = useState<Publication | null>(null);
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');

  const eliminar = (id: number) => {
    if (confirm('¿Eliminar registro?')) {
      router.delete(`/publications/${id}`);
    }
  };

  const abrirModal = (c: Publication, tipo: 'vertical' | 'horizontal') => {
    setSelected(c);
    setOrientation(tipo);
  };

  return (
    <>
      <Head title="Publicaciones" />

      <div className="p-6">

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Publicaciones</h1>

          <Button
            variant={'default'}
            onClick={() => router.visit('/publications/create')}
            >
            Nuevo
          </Button>
        </div>

        <div className="overflow-x-auto rounded shadow">
          <table className="w-full text-sm">

            <thead className="">
              <tr>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Creacion</th>
                <th className="p-3 text-center">Generar</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {publications.map((c) => (
                <tr key={c.id} className="border-t">

                  <td className="p-3">
                    <div className='uppercase'>
                        {c.type_publication?.nombre?? 'Tipo no encontrado'}
                    </div>
                    <div className="text-xs text-gray-500">
                        {c.type_publication?.institution?.nombre ?? 'Institución no encontrada'}
                    </div>
                  </td>
                  <td className="p-3 capitalize" >
                    {c.tratamiento} {c.nombre}
                  </td>

                  <td className="p-3">
                    {new Date(c.fecha).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {new Date(c.created_at).toLocaleDateString()}
                    {c.user && (
                      <div className="text-xs text-gray-500">
                        (ID usuario: {c.user.name})
                      </div>
                    )}
                  </td>

                  <td className="p-3 text-center space-x-2">

                    <Button
                    variant={'default'}
                        size={'sm'}
                      onClick={() => abrirModal(c, 'vertical')}

                    >
                      <RectangleVertical size={18} /> Vertical
                    </Button>

                    <Button
                    variant={'default'}
                        size={'sm'}
                      onClick={() => abrirModal(c, 'horizontal')}

                    >
                      <RectangleHorizontal size={18} /> Horizontal
                    </Button>

                  </td>

                  <td className="p-3 text-center space-x-2">

                    {/* <Link
                      href={`/publicaciones/${c.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link> */}

                    <Button
                      variant="default"
                      size={'sm'}
                      onClick={() => router.visit(`/publications/${c.id}/edit`)}
                    >
                      <Pencil size={18} />
                      Editar
                    </Button>

                    {/* <button
                      onClick={() => eliminar(c.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button> */}

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* MODAL */}
        {selected && (
          <ModalGenerarImagen
            key={`${selected.id}-${orientation}`}
            data={selected}
            orientation={orientation}
            onClose={() => setSelected(null)}
          />
        )}

      </div>
    </>
  );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Publicaciones',
            href: '/publicaciones',
        },
    ],
};
