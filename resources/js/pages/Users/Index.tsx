import { Head, router } from '@inertiajs/react';
import { useMemo, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Eye } from 'lucide-react';

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

export default function Index({ users, filters }: { users: User[]; filters: { search: string } }) {
  const [search, setSearch] = useState(filters.search || '');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.get('/users', { search }, { preserveState: true, replace: true });
  };

  const eliminar = (id: number) => {
    if (confirm('¿Eliminar usuario?')) {
      router.delete(`/users/${id}`);
    }
  };

  const usersWithRoles = useMemo(
    () =>
      users.map((user) => ({
        ...user,
        roleNames: user.roles.map((role) => role.nombre).join(', ') || 'Sin roles',
      })),
    [users]
  );

  return (
    <>
      <Head title="Usuarios" />

      <div className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Administrar Usuarios</h1>
            <p className="text-sm text-gray-600 mt-1">Solo el administrador puede crear, editar y asignar roles.</p>
          </div>
          <Button variant="default" onClick={() => router.visit('/users/create')}>
            Nuevo Usuario
          </Button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <form onSubmit={submit} className="flex w-full gap-2">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nombre o correo"
              className="w-full rounded border px-3 py-2"
            />
            <Button type="submit">Buscar</Button>
          </form>
        </div>

        <div className="overflow-x-auto rounded border">
          <table className="w-full text-sm">
            <thead className=" text-left text-xs uppercase">
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
                  <td colSpan={5} className="p-6 text-center text-sm text-gray-500/50">
                    No se encontraron usuarios.
                  </td>
                </tr>
              ) : (
                usersWithRoles.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-foreground/20">
                    <td className="p-3 font-medium">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.roleNames}</td>
                    <td className="p-3">{new Date(user.created_at).toLocaleDateString('es-ES')}</td>
                    <td className="p-3 text-center space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => router.visit(`/users/${user.id}`)}
                        className="gap-2"
                      >
                        <Eye size={16} /> Ver
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.visit(`/users/${user.id}/edit`)}
                        className="gap-2"
                      >
                        <Pencil size={16} /> Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => eliminar(user.id)}
                        className="gap-2"
                      >
                        <Trash2 size={16} /> Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
