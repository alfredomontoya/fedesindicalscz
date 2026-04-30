import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { FormEvent } from 'react';

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
  roles: Role[];
}

export default function Edit({ user, roles }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: '',
    roles: user.roles.map((role) => role.id),
  });

  const toggleRole = (id: number) => {
    const roleIds = data.roles.includes(id)
      ? data.roles.filter((roleId) => roleId !== id)
      : [...data.roles, id];

    setData('roles', roleIds);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    put(`/users/${user.id}`);
  };

  return (
    <>
      <Head title={`Editar Usuario: ${user.name}`} />

      <div className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Editar Usuario</h1>
            <p className="text-sm text-gray-600 mt-1">Actualiza datos, roles y contraseña para el usuario.</p>
          </div>
          <Button variant="outline" onClick={() => router.visit('/users')}>
            Volver
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Datos del usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(event) => setData('name', event.target.value)}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(event) => setData('email', event.target.value)}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Nueva contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(event) => setData('password', event.target.value)}
                    placeholder="Dejar vacío para mantener la actual"
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(event) => setData('password_confirmation', event.target.value)}
                    placeholder="Repite la nueva contraseña"
                  />
                  {errors.password_confirmation && (
                    <p className="text-sm text-red-500">{errors.password_confirmation}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Roles asignados</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  {roles.map((role) => (
                    <label key={role.id} className="flex items-center gap-2 rounded border p-3">
                      <Checkbox
                        checked={data.roles.includes(role.id)}
                        onCheckedChange={() => toggleRole(role.id)}
                      />
                      <div>
                        <p className="font-medium">{role.nombre}</p>
                      </div>
                    </label>
                  ))}
                  {errors.roles && <p className="text-sm text-red-500">{errors.roles}</p>}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => router.visit('/users')}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={processing}>
                  Guardar cambios
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
