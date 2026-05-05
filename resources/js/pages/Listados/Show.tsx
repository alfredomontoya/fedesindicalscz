import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Funcionario {
  id: number;
  nombre: string;
  ci: string;
}

interface Listado {
  id: number;
  nombre: string;
  descripcion?: string | null;
  is_enable: boolean;
  created_at: string;
  funcionarios?: Funcionario[];
}

interface Props {
  listado: Listado;
}

export default function Show({ listado }: Props) {
  return (
    <>
      <Head title={`Listado: ${listado.nombre}`} />

      <div className="p-6">

        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Listado: {listado.nombre}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Información del listado registrado.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => router.visit('/listados')}
          >
            Volver
          </Button>
        </div>

        {/* INFORMACIÓN */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Información</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <div>
              <p className="text-sm text-gray-500">Nombre</p>
              <p className="text-lg font-medium">
                {listado.nombre}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Descripción</p>
              <p className="text-lg font-medium">
                {listado.descripcion ?? 'Sin descripción'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Estado</p>
              <span className={`inline-block px-2 py-1 rounded text-xs ${
                listado.is_enable
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {listado.is_enable ? 'Activo' : 'Inactivo'}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">Creado el</p>
              <p className="text-lg font-medium">
                {new Date(listado.created_at).toLocaleDateString('es-ES')}
              </p>
            </div>

          </CardContent>
        </Card>

        {/* FUNCIONARIOS RELACIONADOS */}
        <Card>
          <CardHeader>
            <CardTitle>Funcionarios</CardTitle>
          </CardHeader>

          <CardContent>
            {!listado.funcionarios || listado.funcionarios.length === 0 ? (
              <p className="text-sm text-gray-500">
                No hay funcionarios asociados a este listado.
              </p>
            ) : (
              <div className="space-y-2">
                {listado.funcionarios.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between border rounded p-2"
                  >
                    <div>
                      <p className="font-medium">{f.nombre}</p>
                      <p className="text-xs text-gray-500">CI: {f.ci}</p>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.visit(`/funcionarios/${f.id}`)}
                    >
                      Ver
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </>
  );
}
