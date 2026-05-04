import { Head, router } from '@inertiajs/react';
import { useMemo, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Eye } from 'lucide-react';
import Pagination from '@/components/Pagination';
import { Paginated } from '@/types/Paginated';

interface Role {
  id: number;
  nombre: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  roles: Role[];
}

export default function Index({
  users,
  filters
}: {
  users: Paginated<User>;
  filters: { search: string };
}) {

  // 🔥 SPA STATE
  const [rows, setRows] = useState(users.data);
  const [links, setLinks] = useState(users.links);
  const [search, setSearch] = useState(filters.search || '');
  const [loading, setLoading] = useState(false);

  // 🔍 SEARCH SPA
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    router.get('/users', { search }, {
      preserveState: true,
      replace: true,
      onSuccess: (page) => {
        const props = page.props as any;

        setRows(props.users.data);
        setLinks(props.users.links);
      },
      onFinish: () => setLoading(false),
    });
  };

  // 🗑 DELETE
  const eliminar = (id: number) => {
    if (!confirm('¿Eliminar usuario?')) return;

    router.delete(`/users/${id}`, {
      onSuccess: () => {
        setRows((prev) => prev.filter((u) => u.id !== id));
      },
    });
  };

  // 🎯 roles memo
  const usersWithRoles = useMemo(
    () =>
      rows.map((user) => ({
        ...user,
        roleNames: user.roles.map((r) => r.nombre).join(', ') || 'Sin roles',
      })),
    [rows]
  );

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

        setRows(props.users.data);
        setLinks(props.users.links);
      },
      onFinish: () => setLoading(false),
    });
  };

  return (
    <>
      <Head title="Usuarios" />

      <div className="p-6 relative">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Administrar Usuarios</h1>
            <p className="text-sm text-gray-600">
              Solo el administrador puede gestionar usuarios
            </p>
          </div>

          <Button onClick={() => router.visit('/users/create')}>
            Nuevo Usuario
          </Button>
        </div>

        {/* SEARCH */}
        <form onSubmit={submit} className="flex gap-2 mb-6">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
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
                <th className="p-3">Nombre</th>
                <th className="p-3">Correo</th>
                <th className="p-3">Roles</th>
                <th className="p-3">Creación</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {usersWithRoles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-400">
                    No se encontraron usuarios
                  </td>
                </tr>
              ) : (
                usersWithRoles.map((user) => (
                  <tr key={user.id} className="border-t">

                    <td className="p-3 font-medium">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.roleNames}</td>
                    <td className="p-3">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>

                    <td className="p-3 text-center space-x-2">
                      <Button size="sm" onClick={() => router.visit(`/users/${user.id}`)}>
                        <Eye size={16} />
                      </Button>

                      <Button size="sm" onClick={() => router.visit(`/users/${user.id}/edit`)}>
                        <Pencil size={16} />
                      </Button>

                      <Button size="sm" onClick={() => eliminar(user.id)}>
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
