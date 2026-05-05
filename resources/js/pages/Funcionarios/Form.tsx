import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Funcionario } from '@/types/funcionario';
import { Listado } from '@/types/listado';
import { router, useForm } from '@inertiajs/react';


type Props = {
  listados?: Listado[];
  initialData?: Funcionario;
  url: string;
  method?: 'post' | 'put';
};

export default function Form({
  listados = [],
  initialData,
  url,
  method = 'post',
}: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    listado_id: initialData?.listado_id ?? '',
    nro_lista: initialData?.nro_lista || '',
    nombre: initialData?.nombre || '',
    ci: initialData?.ci || '',
    cargo: initialData?.cargo || '',
    edificio: initialData?.edificio || '',
    tipo: initialData?.tipo || 'item',
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    method === 'post' ? post(url) : put(url);
  };

  return (
    <form onSubmit={submit} className="space-y-6">

        <div className="grid gap-4 md:grid-cols-2">
            {/* LISTADO */}
            <div className="space-y-2">
                <label htmlFor="listado">Listado</label>
                <Select
                value={data.listado_id ? String(data.listado_id) : ''}
                onValueChange={(value) => setData('listado_id', Number(value))}
                >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar listado" />
                </SelectTrigger>

                <SelectContent>
                    {listados.map((l) => (
                    <SelectItem key={l.id} value={String(l.id)}>
                        {l.nombre}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                {errors.listado_id && <div className="text-red-500">{errors.listado_id}</div>}
            </div>

            {/* NRO LISTA */}
            <div className="space-y-2">
                <label htmlFor="nro_lista">
                  N° Lista
                </label>
                <Input
                    id="nro_lista"
                    value={data.nro_lista}
                    onChange={(e) => setData('nro_lista', e.target.value)}
                />
                {errors.nro_lista && <div className="text-red-500">{errors.nro_lista}</div>}
            </div>

            {/* NOMBRE */}
            <div className="space-y-2">
                <label htmlFor="nombre">
                  Nombre
                </label>
                <Input
                id="nombre"
                value={data.nombre}
                onChange={(e) => setData('nombre', e.target.value)}
                />
                {errors.nombre && <div className="text-red-500">{errors.nombre}</div>}
            </div>

            {/* CI */}
            <div className="space-y-2">
                <label htmlFor="ci">
                  CI
                </label>
                <Input
                    id="ci"
                    value={data.ci}
                    onChange={(e) => setData('ci', e.target.value)}
                />
                {errors.ci && <div className="text-red-500">{errors.ci}</div>}
            </div>

            {/* TIPO */}
            <div className="space-y-2">
                <label htmlFor="tipo">
                  Tipo
                </label>
                <Select
                    value={data.tipo ?? ''}
                    onValueChange={(value: 'item' | 'contrato') =>
                        setData('tipo', value)
                    }
                    >
                    <SelectTrigger className="w-full" id="tipo">
                        <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="item">Item</SelectItem>
                        <SelectItem value="contrato">Contrato</SelectItem>
                    </SelectContent>
                </Select>
                {errors.tipo && <div className="text-red-500">{errors.tipo}</div>}
            </div>

            {/* CARGO */}
            <div className="space-y-2">
                <label htmlFor="cargo">
                  Cargo
                </label>
                <Input
                    id="cargo"
                    value={data.cargo || ''}
                    onChange={(e) => setData('cargo', e.target.value)}
                />
                {errors.cargo && <div className="text-red-500">{errors.cargo}</div>}
            </div>

            {/* EDIFICIO */}
            <div className="space-y-2">
                <label htmlFor="edificio">
                  Edificio
                </label>
                <Input
                    id="edificio"
                    value={data.edificio || ''}
                    onChange={(e) => setData('edificio', e.target.value)}
                />
                {errors.edificio && <div className="text-red-500">{errors.edificio}</div>}
            </div>

            {/* SUBMIT */}
            {/* <Button type="submit" disabled={processing}>
                Guardar
            </Button> */}

            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => router.visit('/funcionarios')}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={processing}>
                  Crear Funcionario
                </Button>
              </div>
        </div>
    </form>
  );
}
