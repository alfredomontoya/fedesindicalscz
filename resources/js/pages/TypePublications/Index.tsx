import { Head, router } from '@inertiajs/react';
import { useMemo, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import type { TypePublication } from '@/types/type-publication';

type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

type PaginatedTypePublication = {
  data: TypePublication[];
  links: PaginationLink[];
};

export default function Index({
  typePublications,
  filters,
}: {
  typePublications: PaginatedTypePublication;
  filters: { search: string };
}) {
  const [search, setSearch] = useState(filters.search || '');

  const eliminar = (id: number) => {
    if (confirm('¿Eliminar tipo de publicación?')) {
      router.delete(`/type-publications/${id}`);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.get('/type-publications', { search }, { preserveState: true, replace: true });
  };

  const paginationLinks = useMemo(
    () =>
      typePublications.links.map((link) => ({
        ...link,
        label: link.label.replace(/&laquo;/g, '«').replace(/&raquo;/g, '»'),
      })),
    [typePublications.links]
  );

  return (
    <>
      <Head title="Tipos de Publicación" />

      <div className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Tipos de Publicación</h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <form onSubmit={submit} className="flex items-center gap-2">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por nombre o institución"
                className="border p-2 rounded w-full sm:w-72"
              />
              <Button type="submit" variant="default">
                Buscar
              </Button>
            </form>
            <Button
              variant="default"
              onClick={() => router.visit('/type-publications/create')}
            >
              Nuevo
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded shadow">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Institución</th>
                <th className="p-3 text-left">Activo</th>
                <th className="p-3 text-left">Creación</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {typePublications.data.map((typePublication) => (
                <tr
                  key={typePublication.id}
                  className="border-t hover:bg-slate-50/50 cursor-pointer"
                  onClick={() => router.visit(`/type-publications/${typePublication.id}`)}
                >
                  <td className="p-3 uppercase">{typePublication.nombre}</td>
                  <td className="p-3">
                    {typePublication.institution?.nombre ?? 'No definida'}
                  </td>
                  <td className="p-3">{typePublication.activo ? 'Sí' : 'No'}</td>
                  <td className="p-3">
                    {new Date(typePublication.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={(event) => {
                        event.stopPropagation();
                        router.visit(`/type-publications/${typePublication.id}/edit`);
                      }}
                    >
                      <Pencil size={16} /> Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(event) => {
                        event.stopPropagation();
                        eliminar(typePublication.id);
                      }}
                    >
                      <Trash2 size={16} /> Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {paginationLinks.map((link) => (
            <Button
              key={link.label + String(link.active)}
              variant={link.active ? 'secondary' : 'default'}
              size="sm"
              disabled={!link.url || link.active}
              onClick={() => link.url && router.visit(link.url, { preserveState: true, replace: true })}
            >
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}

Index.layout = {
  breadcrumbs: [
    {
      title: 'TypePublications',
      href: '/type-publications',
    },
  ],
};
