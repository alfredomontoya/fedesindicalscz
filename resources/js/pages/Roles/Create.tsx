import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AlertError from '@/components/alert-error';
import { Loader } from 'lucide-react';

export default function Create() {
  const { data, setData, post, errors, processing } = useForm({
    nombre: '',
    descripcion: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/roles', {
      onSuccess: () => {
        router.visit('/roles');
      },
    });
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Roles', href: '/roles' },
    { label: 'Crear Rol', href: '#' },
  ];

  return (
    <AppShell>
      <Head title="Crear Rol" />
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Crear Nuevo Rol</h1>
          <Link href="/roles">
            <Button variant="outline">Cancelar</Button>
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
                  placeholder="ej: editor, moderador, revisor"
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
                  placeholder="Describe las responsabilidades y permisos de este rol"
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
                    'Guardar Rol'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Publicaciones',
            href: '/publicaciones',
        },
    ],
};
