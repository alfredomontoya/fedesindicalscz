import { Head, Link } from '@inertiajs/react';
import {AppShell} from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Breadcrumbs} from '@/components/breadcrumbs';
import { ArrowLeft } from 'lucide-react';

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

export default function Show({ role }: Props) {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Roles', href: '/roles' },
    { label: role.nombre, href: '#' },
  ];

  const createdAt = new Date(role.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const updatedAt = new Date(role.updated_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <AppShell>
      <Head title={`Rol: ${role.nombre}`} />
      <div className="space-y-4">
        {/* <Breadcrumbs items={breadcrumbs} /> */}

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{role.nombre}</h1>
          <Link href="/roles">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={20} />
              Volver
            </Button>
          </Link>
        </div>

        {/* Información General */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Rol</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-600">Nombre</h3>
              <p className="text-lg">{role.nombre}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600">Descripción</h3>
              <p className="text-lg">
                {role.descripcion || <span className="text-gray-400 italic">Sin descripción</span>}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Creado el</h3>
                <p className="text-lg">{createdAt}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Actualizado el</h3>
                <p className="text-lg">{updatedAt}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usuarios Asignados */}
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {role.users.length > 0 ? (
                    role.users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-semibold">{user.name}</TableCell>
                        <TableCell className="text-gray-600">{user.email}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-8 text-gray-500">
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

Show.layout = {
  breadcrumbs: [
    {
      title: 'Roles',
      href: '/roles',
    },
  ],
};
