import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
// import { Breadcrumbs } from '@/components/breadcrumbs';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Role {
  id: number;
  nombre: string;
  descripcion?: string;
  users: { id: number; name: string; email: string }[];
  created_at: string;
}

export default function Index({ roles, isAdmin }: { roles: Role[]; isAdmin: boolean }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredRoles = useMemo(() => {
    return roles.filter((role) =>
      role.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [roles, searchTerm]);

  const handleDelete = () => {
    if (!roleToDelete) return;

    setIsDeleting(true);

    router.delete(`/roles/${roleToDelete.id}`, {
      onFinish: () => {
        setIsDeleting(false);
        setRoleToDelete(null);
      },
    });
  };

//   const breadcrumbs = [
//     { label: 'Dashboard', href: '/dashboard' },
//     { label: 'Roles', href: '/roles' },
//   ];

  return (
    <AppShell>
      <Head title="Roles" />

      <div className="space-y-4 p-6">
        {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}

        <div className="flex items-center justify-between" >
          <div>
            <h1 className="text-3xl font-bold">Gestión de Roles</h1>
            <p className="text-gray-500 mt-2">
              {isAdmin
                ? 'Administra todos los roles del sistema'
                : 'Visualiza tus roles asignados'}
            </p>
          </div>

          {isAdmin && (
            <Link href="/roles/create">
              <Button className="gap-2">
                <Plus size={20} />
                Nuevo Rol
              </Button>
            </Link>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Búsqueda de Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roles Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-center">Usuarios</TableHead>
                    {isAdmin && (
                      <TableHead className="text-right">Acciones</TableHead>
                    )}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredRoles.length > 0 ? (
                    filteredRoles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-semibold">
                          {role.nombre}
                        </TableCell>

                        <TableCell className="text-gray-600">
                          {role.descripcion || 'Sin descripción'}
                        </TableCell>

                        <TableCell className="text-center">
                          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {role.users?.length || 0}
                          </span>
                        </TableCell>

                        {isAdmin && (
                          <TableCell className="text-right space-x-2">
                            <Link href={`/roles/${role.id}/edit`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                              >
                                <Pencil size={16} />
                                Editar
                              </Button>
                            </Link>

                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setRoleToDelete(role)}
                              className="gap-2"
                            >
                              <Trash2 size={16} />
                              Eliminar
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={isAdmin ? 4 : 3}
                        className="text-center py-8 text-gray-500"
                      >
                        No se encontraron roles
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog
        open={!!roleToDelete}
        onOpenChange={(open) => !open && setRoleToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar rol?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro que desea eliminar el rol "
              {roleToDelete?.nombre}"? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Roles',
            href: '/roles',
        },
    ],
};
