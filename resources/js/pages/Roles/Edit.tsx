import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AlertError from '@/components/alert-error';
import { Loader, Trash2, Plus } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Role {
  id: number;
  nombre: string;
  descripcion: string | null;
  users: User[];
  created_at: string;
  updated_at: string;
}

interface Props {
  role: Role;
}

export default function Edit({ role }: Props) {
  const { data, setData, put, errors, processing } = useForm({
    nombre: role.nombre,
    descripcion: role.descripcion || '',
  });

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [assigningUser, setAssigningUser] = useState(false);
  const [removingUserId, setRemovingUserId] = useState<number | null>(null);

  useEffect(() => {
    // Cargar usuarios disponibles
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        // Filtrar usuarios que no están ya asignados
        const assignedIds = role.users.map((u) => u.id);
        setUsers(data.filter((u: User) => !assignedIds.includes(u.id)));
      })
      .catch((err) => console.error('Error loading users:', err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/roles/${role.id}`, {
      onSuccess: () => {
        router.visit('/roles');
      },
    });
  };

  const handleAssignUser = async () => {
    if (!selectedUserId) return;

    setAssigningUser(true);
    try {
      const response = await fetch(`/roles/${role.id}/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ user_id: parseInt(selectedUserId) }),
      });

      if (response.ok) {
        // Recargar la página
        window.location.href = `/roles/${role.id}/edit`;
      }
    } catch (error) {
      console.error('Error assigning user:', error);
    } finally {
      setAssigningUser(false);
    }
  };

  const handleRemoveUser = async (userId: number) => {
    setRemovingUserId(userId);
    try {
      const response = await fetch(`/roles/${role.id}/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (response.ok) {
        // Recargar la página
        window.location.href = `/roles/${role.id}/edit`;
      }
    } catch (error) {
      console.error('Error removing user:', error);
    } finally {
      setRemovingUserId(null);
    }
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Roles', href: '/roles' },
    { label: `Editar: ${role.nombre}`, href: '#' },
  ];

  return (
    <AppShell>
      <Head title={`Editar Rol: ${role.nombre}`} />
      <div className="space-y-4 p-6">

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Editar Rol: {role.nombre}</h1>
          <Link href="/roles">
            <Button variant="outline">Volver</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información del Rol</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.keys(errors).length > 0 && (
                <AlertError errors={Object.values(errors).filter(Boolean)} />
              )}

              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Rol *</Label>
                <Input
                  id="nombre"
                  type="text"
                  value={data.nombre}
                  onChange={(e) => setData('nombre', e.target.value)}
                  className={errors.nombre ? 'border-red-500' : ''}
                  disabled={processing}
                />
                {errors.nombre && (
                  <p className="text-sm text-red-500">{errors.nombre}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <textarea
                  id="descripcion"
                  value={data.descripcion}
                  onChange={(e) => setData('descripcion', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  disabled={processing}
                />
                {errors.descripcion && (
                  <p className="text-sm text-red-500">{errors.descripcion}</p>
                )}
              </div>

              <div className="flex gap-2 justify-end">
                <Link href="/roles">
                  <Button variant="outline" disabled={processing}>
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" disabled={processing} className="gap-2">
                  {processing ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    'Guardar Cambios'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Sección de Gestión de Usuarios */}
        <Card>
          <CardHeader>
            <CardTitle>Asignar Usuarios al Rol</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecciona un usuario..." />
                </SelectTrigger>
                <SelectContent>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No hay usuarios disponibles
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <Button
                onClick={handleAssignUser}
                disabled={assigningUser || !selectedUserId}
                className="gap-2"
              >
                {assigningUser ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Asignando...
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    Asignar
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Usuarios Asignados */}
        <Card>
          <CardHeader>
            <CardTitle>Usuarios Asignados ({role.users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {role.users.length > 0 ? (
                    role.users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-semibold">{user.name}</TableCell>
                        <TableCell className="text-gray-600">{user.email}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveUser(user.id)}
                            disabled={removingUserId === user.id}
                            className="gap-2"
                          >
                            {removingUserId === user.id ? (
                              <>
                                <Loader size={16} className="animate-spin" />
                                Removiendo...
                              </>
                            ) : (
                              <>
                                <Trash2 size={16} />
                                Remover
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                        No hay usuarios asignados a este rol
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
Edit.layout = {
    breadcrumbs: [
        {
            title: 'Roles/Editar',
            href: '/roles',
        },
    ],
};
