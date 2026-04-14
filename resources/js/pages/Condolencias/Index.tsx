import GenerarImagen from '@/components/GenerarImagen';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ condolencias }: any) {

  const eliminar = (id: number) => {
    if (confirm('¿Eliminar registro?')) {
      router.delete(`/condolencias/${id}`);
    }
  };

  return (
    <>
      <Head title="Condolencias" />

      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">
            Condolencias
          </h1>

          <Link
            href="/condolencias/create"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Nuevo
          </Link>
        </div>

        <table className="w-full border">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {condolencias.map((c: any) => (
              <tr key={c.id}>
                <td>{c.tratamiento} {c.nombre}</td>
                <td>{new Date(c.fecha).toLocaleDateString()}</td>
                <td>
                    <GenerarImagen data={c} />
                </td>
                <td>
                  <Link href={`/condolencias/${c.id}/edit`}>
                    Editar
                  </Link>

                  <button onClick={() => eliminar(c.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
