import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

interface Props {
  user: User;
}

export default function Show({ user }: Props) {
  return (
    <>
      <Head title={`Usuario: ${user.name}`} />

      <div className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Usuario: {user.name}</h1>
            <p className="text-sm text-gray-600 mt-1">Detalles del usuario y roles asignados.</p>
          </div>
          <Button variant="outline" onClick={() => router.visit('/users')}>
            Volver
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Información</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Nombre</p>
              <p className="text-lg font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Correo</p>
              <p className="text-lg font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Creado el</p>
              <p className="text-lg font-medium">{new Date(user.created_at).toLocaleDateString('es-ES')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roles asignados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {user.roles.length > 0 ? (
                user.roles.map((role) => (
                  <span
                    key={role.id}
                    className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                  >
                    {role.nombre}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">Este usuario no tiene roles asignados.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
