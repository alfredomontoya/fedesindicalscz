import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import ModalGenerarImagenCondolencia from './../../components/ModalGenerarImagenCondolencia';
import { Button } from '@/components/ui/button';
import { Pencil, RectangleVertical, RectangleHorizontal } from 'lucide-react';

type Condolencia = {
  id: number;
  tratamiento: string;
  nombre: string;
  fecha: string;
  created_at: string;
  user_id: number | null;
  user: {
      id: number;
      name: string;
      email: string;
  } | null;
};

export default function Index({ condolencias }: { condolencias: Condolencia[] }) {

  const [selected, setSelected] = useState<Condolencia | null>(null);
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');

  const eliminar = (id: number) => {
    if (confirm('¿Eliminar registro?')) {
      router.delete(`/condolencias/${id}`);
    }
  };

  const abrirModal = (c: Condolencia, tipo: 'vertical' | 'horizontal') => {
    setSelected(c);
    setOrientation(tipo);
  };

  return (
    <>
      <Head title="Condolencias" />

      <div className="p-6">

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Condolencias</h1>

          <Button
            variant={'default'}
            onClick={() => router.visit('/condolencias/create')}
            >
            Nuevo
          </Button>
        </div>

        <div className="overflow-x-auto rounded shadow">
          <table className="w-full text-sm">

            <thead className="">
              <tr>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Creacion</th>
                <th className="p-3 text-center">Generar</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {condolencias.map((c) => (
                <tr key={c.id} className="border-t">

                  <td className="p-3">
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
                      href={`/condolencias/${c.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link> */}

                    <Button
                      variant="default"
                      size={'sm'}
                      onClick={() => router.visit(`/condolencias/${c.id}/edit`)}
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
          <ModalGenerarImagenCondolencia
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
            title: 'Condolencias',
            href: '/condolencias',
        },
    ],
};
