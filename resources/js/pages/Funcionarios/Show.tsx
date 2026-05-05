import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Funcionario } from '@/types/funcionario';


interface Props {
  funcionario: Funcionario;
}

export default function Show({ funcionario }: Props) {
  return (
    <>
      <Head title={`Funcionario: ${funcionario.nombre}`} />

      <div className="p-6">

        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Funcionario: {funcionario.nombre}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Información del funcionario registrado.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => router.visit('/funcionarios')}
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
              <p className="text-lg font-medium capitalize">
                {funcionario.nombre}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">CI</p>
              <p className="text-lg font-medium">
                {funcionario.ci}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">N° Lista</p>
              <p className="text-lg font-medium">
                {funcionario.nro_lista}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Tipo</p>
              <p className="text-lg font-medium uppercase">
                {funcionario.tipo}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Cargo</p>
              <p className="text-lg font-medium">
                {funcionario.cargo ?? 'No asignado'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Edificio</p>
              <p className="text-lg font-medium">
                {funcionario.edificio ?? 'No definido'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Creado el</p>
              <p className="text-lg font-medium">
                {new Date(funcionario.created_at).toLocaleDateString('es-ES')}
              </p>
            </div>

          </CardContent>
        </Card>

        {/* RELACIÓN LISTADO */}
        <Card>
          <CardHeader>
            <CardTitle>Listado</CardTitle>
          </CardHeader>

          <CardContent>
            {funcionario.listado ? (
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {funcionario.listado.nombre}
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.visit(`/listados/${funcionario.listado?.id}`)}
                >
                  Ver listado
                </Button>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No pertenece a ningún listado.
              </p>
            )}
          </CardContent>
        </Card>

      </div>
    </>
  );
}
