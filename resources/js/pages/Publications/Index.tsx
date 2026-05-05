import { Head, router } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Eye, RectangleVertical, RectangleHorizontal } from 'lucide-react';
import ModalGenerarImagen from '@/components/ModalGenerarImagen';
import { Publication } from '@/types/publication';
import { Paginated } from '@/types/Paginated';
import Pagination from '@/components/Pagination';

export default function Index({
  publications,
  filters,
}: {
  publications: Paginated<Publication>;
  filters: { search: string };
}) {

  // 🔥 SPA STATE
  const [rows, setRows] = useState(publications.data);
  const [links, setLinks] = useState(publications.links);
  const [search, setSearch] = useState(filters.search || '');
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<Publication | null>(null);
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');

  // 🔍 SEARCH SPA
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    router.get('/publications', { search }, {
      preserveState: true,
      replace: true,
      onSuccess: (page) => {
        const props = page.props as any;

        setRows(props.publications.data);
        setLinks(props.publications.links);
      },
      onFinish: () => setLoading(false),
    });
  };

  // 🗑 DELETE
  const eliminar = (id: number) => {
    if (!confirm('¿Eliminar registro?')) return;

    router.delete(`/publications/${id}`, {
      onSuccess: () => {
        setRows((prev) => prev.filter((p) => p.id !== id));
      },
    });
  };

  // 📄 PAGINATION SPA
  const goToPage = (url: string | null) => {
    if (!url) return;

    setLoading(true);

    router.get(url, {}, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      onSuccess: (page) => {
        const props = page.props as any;

        setRows(props.publications.data);
        setLinks(props.publications.links);
      },
      onFinish: () => setLoading(false),
    });
  };

  // 🎨 MODAL
  const abrirModal = (c: Publication, tipo: 'vertical' | 'horizontal') => {
    setSelected(c);
    setOrientation(tipo);
  };

  return (
    <>
      <Head title="Publicaciones" />

      <div className="p-6 relative">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Publicaciones</h1>

          <Button onClick={() => router.visit('/publications/create')}>
            Nuevo
          </Button>
        </div>

        {/* SEARCH */}
        <form onSubmit={submit} className="flex gap-2 mb-6">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o tipo"
            className="w-full rounded border px-3 py-2"
          />
          <Button type="submit">Buscar</Button>
        </form>

        {/* TABLE */}
        <div className="overflow-x-auto rounded border relative">

          {loading && (
            <div className="absolute inset-0 bg-background/30 dark:bg-background/50 backdrop-blur-sm z-10" />
          )}

          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Creación</th>
                <th className="p-3 text-center">Generar</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-400">
                    No se encontraron registros
                  </td>
                </tr>
              ) : (
                rows.map((c) => (
                  <tr key={c.id} className="border-t">

                    <td className="p-3">
                      <div className="uppercase">
                        {c.type_publication?.nombre ?? 'Tipo no encontrado'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {c.type_publication?.institution?.nombre ?? 'Institución no encontrada'}
                      </div>
                    </td>

                    <td className="p-3 capitalize">
                      {c.tratamiento} {c.nombre}
                    </td>

                    <td className="p-3">
                      {new Date(c.fecha).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {new Date(c.created_at).toLocaleDateString()}
                      {c.user && (
                        <div className="text-xs text-gray-500">
                          ({c.user.name})
                        </div>
                      )}
                    </td>

                    <td className="p-3 text-center space-x-2">
                      <Button size="sm" onClick={() => abrirModal(c, 'vertical')}>
                        <RectangleVertical size={16} />
                      </Button>

                      <Button size="sm" onClick={() => abrirModal(c, 'horizontal')}>
                        <RectangleHorizontal size={16} />
                      </Button>
                    </td>

                    <td className="p-3 text-center space-x-2">
                      <Button size="sm" onClick={() => router.visit(`/publications/${c.id}`)}>
                        <Eye size={16} />
                      </Button>

                      <Button size="sm" onClick={() => router.visit(`/publications/${c.id}/edit`)}>
                        <Pencil size={16} />
                      </Button>

                      <Button size="sm" onClick={() => eliminar(c.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION SPA */}
        <Pagination
          links={links}
          onChange={goToPage}
          loading={loading}
        />

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
