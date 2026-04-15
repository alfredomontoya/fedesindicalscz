import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import ModalGenerarImagenCondolencia from './../../components/ModalGenerarImagenCondolencia';

type Condolencia = {
  id: number;
  tratamiento: string;
  nombre: string;
  fecha: string;
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
    <AppLayout>
      <Head title="Condolencias" />

      <div className="p-6">

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Condolencias</h1>

          <Link
            href="/condolencias/create"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Nuevo
          </Link>
        </div>

        <div className="overflow-x-auto rounded shadow">
          <table className="w-full text-sm">

            <thead className="">
              <tr>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Fecha</th>
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

                  <td className="p-3 text-center space-x-2">

                    <button
                      onClick={() => abrirModal(c, 'vertical')}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Vertical
                    </button>

                    <button
                      onClick={() => abrirModal(c, 'horizontal')}
                      className="bg-purple-600 text-white px-3 py-1 rounded"
                    >
                      Horizontal
                    </button>

                  </td>

                  <td className="p-3 text-center space-x-2">

                    <Link
                      href={`/condolencias/${c.id}/edit`}
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
          <ModalGenerarImagenCondolencia
            data={selected}
            orientation={orientation}
            onClose={() => setSelected(null)}
          />
        )}

      </div>
    </AppLayout>
  );
}
