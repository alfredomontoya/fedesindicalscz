import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import ModalGenerarImagenCumple from '@/components/ModalGenerarImagenCumple';
import { create } from './../../actions/Laravel/Fortify/Http/Controllers/AuthenticatedSessionController';
import { Button } from '@/components/ui/button';
import { Pencil, RectangleVertical, RectangleHorizontal } from 'lucide-react';

type User = {
    id: number;
    name: string;
    email: string;
}

type Cumple = {
  id: number;
  user_id: number;
  user: User;
  tratamiento: string;
  nombre: string;
  fecha_nacimiento: string;
  created_at: string;
  updated_at: string;
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

          <Button
            variant={'default'}
            onClick={() => router.visit('/cumples/create')}
            >
            Nuevo
          </Button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded shadow">
          <table className="w-full text-sm">

            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Fecha de nacimiento</th>
                <th className="p-3 text-left">Creacion</th>
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

                  <td className="p-3">
                    {new Date(c.created_at).toLocaleDateString()} <br />
                    {c.user_id && (
                      <span className="text-xs text-gray-500">
                        (ID usuario: {c.user.name})
                      </span>
                    )}
                  </td>

                  {/* BOTONES GENERAR */}
                  <td className="p-3 text-center space-x-2">

                    <Button
                      onClick={() => abrirModal(c, 'vertical')}
                      variant={'default'}
                      size={'sm'}
                    >
                      <RectangleVertical size={18} /> Vertical
                    </Button>

                    <Button
                      onClick={() => abrirModal(c, 'horizontal')}
                      variant={'default'}
                      size={'sm'}
                    >
                      <RectangleHorizontal size={18} /> Horizontal
                    </Button>

                  </td>

                  {/* ACCIONES */}
                  <td className="p-3 text-center space-x-2">

                    {/* <Link
                      href={`/cumples/${c.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link> */}
                    <Button
                        variant="default"
                        onClick={ () => router.visit(`/cumples/${c.id}/edit`) }
                        size={'sm'}
                        >
                          <Pencil size={18} /> Editar
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

