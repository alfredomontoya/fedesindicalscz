import { Head, router } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { Paginated } from '@/types/Paginated';
import Pagination from '@/components/Pagination';
import { Input } from '@/components/ui/input';
import { Funcionario } from '@/types/funcionario';


export default function Index({
  funcionarios,
  filters,
}: {
  funcionarios: Paginated<Funcionario>;
  filters: { search: string };
}) {

  // 🔥 SPA STATE
  const [rows, setRows] = useState(funcionarios.data);
  const [links, setLinks] = useState(funcionarios.links);
  const [search, setSearch] = useState(filters.search || '');
  const [loading, setLoading] = useState(false);

  // 🔍 SEARCH SPA
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    router.get('/funcionarios', { search }, {
      preserveState: true,
      replace: true,
      onSuccess: (page) => {
        const props = page.props as any;

        setRows(props.funcionarios.data);
        setLinks(props.funcionarios.links);
      },
      onFinish: () => setLoading(false),
    });
  };

  // 🗑 DELETE
  const eliminar = (id: number) => {
    if (!confirm('¿Eliminar funcionario?')) return;

    router.delete(`/funcionarios/${id}`, {
      onSuccess: () => {
        setRows((prev) => prev.filter((f) => f.id !== id));
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

        setRows(props.funcionarios.data);
        setLinks(props.funcionarios.links);
      },
      onFinish: () => setLoading(false),
    });
  };

  return (
    <>
      <Head title="Funcionarios" />

      <div className="p-6 relative">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Funcionarios</h1>

          <Button onClick={() => router.visit('/funcionarios/create')}>
            Nuevo
          </Button>
        </div>

        {/* SEARCH */}
        <form onSubmit={submit} className="flex gap-2 mb-6">
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, CI, cargo o edificio"
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
                <th className="p-3 text-left">CI</th>
                <th className="p-3 text-left">Cargo</th>
                <th className="p-3 text-left">Edificio</th>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Listado</th>
                <th className="p-3 text-left">Creación</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-400">
                    No se encontraron registros
                  </td>
                </tr>
              ) : (
                rows.map((f) => (
                  <tr key={f.id} className="border-t">

                    <td className="p-3 font-medium capitalize">
                      {f.nombre}
                    </td>

                    <td className="p-3">
                      {f.ci}
                    </td>

                    <td className="p-3">
                      {f.cargo}
                    </td>

                    <td className="p-3">
                      {f.edificio}
                    </td>

                    <td className="p-3">
                      {f.tipo}
                    </td>

                    <td className="p-3">
                      {f.listado?.nombre ?? 'Sin listado'}
                      {f.nro_lista && (
                        <div className="text-xs text-gray-500">
                          N° {f.nro_lista}
                        </div>
                      )}
                    </td>

                    <td className="p-3">
                      {new Date(f.created_at).toLocaleDateString()}
                    </td>

                    <td className="p-3 text-center space-x-2">
                      <Button size="sm" onClick={() => router.visit(`/funcionarios/${f.id}`)}>
                        <Eye size={16} />
                      </Button>

                      <Button size="sm" onClick={() => router.visit(`/funcionarios/${f.id}/edit`)}>
                        <Pencil size={16} />
                      </Button>

                      <Button size="sm" onClick={() => eliminar(f.id)}>
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

      </div>
    </>
  );
}

Index.layout = {
  breadcrumbs: [
    {
      title: 'Funcionarios',
      href: '/funcionarios',
    },
  ],
};
