import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import ModalGenerarImagenCumple from '@/components/ModalGenerarImagenCumple';

type Cumple = {
  id: number;
  user_id: number;
  tratamiento: string;
  nombre: string;
  fecha_nacimiento: string;
};

export default function Index({ cumples }: { cumples: Cumple[] }) {

  const [selected, setSelected] = useState<Cumple | null>(null);
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');

  const eliminar = (id: number) => {
    if (confirm('¿Eliminar registro?')) {
      router.delete(`/cumples/${id}`);
    }
  };

  const abrirModal = (c: Cumple, tipo: 'vertical' | 'horizontal') => {
    setSelected(c);
    setOrientation(tipo);
  };

  return (
    <>
      <Head title="Cumpleaños" />

      <div className="p-6">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">
            Cumpleaños
          </h1>

          <Link
            href="/cumples/create"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Nuevo
          </Link>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded shadow">
          <table className="w-full text-sm">

            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Fecha de nacimiento</th>
                <th className="p-3 text-center">Generar</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {cumples.map((c) => (
                <tr key={c.id} className="border-t">

                  <td className="p-3">
                    {c.tratamiento}. {c.nombre}
                  </td>

                  <td className="p-3">
                    {new Date(c.fecha_nacimiento).toLocaleDateString()}
                  </td>

                  {/* BOTONES GENERAR */}
                  <td className="p-3 text-center space-x-2">

                    <button
                      onClick={() => abrirModal(c, 'vertical')}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Vertical
                    </button>

                    <button
                      onClick={() => abrirModal(c, 'horizontal')}
                      className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                    >
                      Horizontal
                    </button>

                  </td>

                  {/* ACCIONES */}
                  <td className="p-3 text-center space-x-2">

                    <Link
                      href={`/cumples/${c.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() => eliminar(c.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* MODAL */}
        {selected && (
          <ModalGenerarImagenCumple
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
            title: 'Cumpleaños',
            href: '/cumples',
        },
    ],
};

