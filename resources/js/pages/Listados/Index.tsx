import { Head, router } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Eye } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Paginated } from '@/types/Paginated';
import { Listado } from '@/types/listado';

export default function Index({
  listados,
  filters
}: {
  listados: Paginated<Listado>;
  filters: { search: string };
}) {

  // 🔥 SPA STATE
  const [rows, setRows] = useState(listados.data);
  const [links, setLinks] = useState(listados.links);
  const [search, setSearch] = useState(filters.search || '');
  const [loading, setLoading] = useState(false);

  // 🔍 SEARCH SPA
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    router.get('/listados', { search }, {
      preserveState: true,
      replace: true,
      onSuccess: (page) => {
        const props = page.props as any;

        setRows(props.listados.data);
        setLinks(props.listados.links);
      },
      onFinish: () => setLoading(false),
    });
  };

  // 🗑 DELETE
  const eliminar = (id: number) => {
    if (!confirm('¿Eliminar listado?')) return;

    router.delete(`/listados/${id}`, {
      onSuccess: () => {
        setRows((prev) => prev.filter((l) => l.id !== id));
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

        setRows(props.listados.data);
        setLinks(props.listados.links);
      },
      onFinish: () => setLoading(false),
    });
  };

  return (
    <>
      <Head title="Listados" />

      <div className="p-6 relative">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Administrar Listados</h1>
            <p className="text-sm text-gray-600">
              Gestión de listados del sistema
            </p>
          </div>

          <Button onClick={() => router.visit('/listados/create')}>
            Nuevo Listado
          </Button>
        </div>

        {/* SEARCH */}
        <form onSubmit={submit} className="flex gap-2 mb-6">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre..."
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
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Descripción</th>
                <th className="p-3 text-center">Estado</th>
                <th className="p-3">Creación</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-400">
                    No se encontraron listados
                  </td>
                </tr>
              ) : (
                rows.map((listado) => (
                  <tr key={listado.id} className="border-t">

                    <td className="p-3 font-medium">{listado.nombre}</td>

                    <td className="p-3">
                      {listado.descripcion || '—'}
                    </td>

                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        listado.is_enable
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {listado.is_enable ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>

                    <td className="p-3">
                      {new Date(listado.created_at).toLocaleDateString()}
                    </td>

                    <td className="p-3 text-center space-x-2">
                      <Button size="sm" onClick={() => router.visit(`/listados/${listado.id}`)}>
                        <Eye size={16} />
                      </Button>

                      <Button size="sm" onClick={() => router.visit(`/listados/${listado.id}/edit`)}>
                        <Pencil size={16} />
                      </Button>

                      <Button size="sm" onClick={() => eliminar(listado.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <Pagination
          links={links}
          onChange={goToPage}
          loading={loading}
        />

      </div>
    </>
  );
}
