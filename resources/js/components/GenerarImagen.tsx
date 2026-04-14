import { useRef } from 'react';
import html2canvas from 'html2canvas';
import CondolenciaCard from './CondolenciaCard';

export default function GenerarImagen({ data }: any) {
  const refV = useRef<HTMLDivElement>(null);
  const refH = useRef<HTMLDivElement>(null);

  const generar = async (ref: any, name: string) => {
    if (!ref.current) return;

    const canvas = await html2canvas(ref.current, {
      scale: 2, // mejor calidad
      useCORS: true,
    });

    const link = document.createElement('a');
    link.download = name;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-6">

      {/* PREVISUALIZACIÓN */}
      <div className="flex gap-4 flex-wrap">

        <CondolenciaCard
          ref={refV}
          nombre={data.nombre}
          tratamiento={data.tratamiento}
          orientation="vertical"
        />

        <CondolenciaCard
          ref={refH}
          nombre={data.nombre}
          tratamiento={data.tratamiento}
          orientation="horizontal"
        />

      </div>

      {/* BOTONES */}
      <div className="space-x-3">

        <button
          onClick={() => generar(refV, 'condolencia-vertical.png')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Descargar Vertical
        </button>

        <button
          onClick={() => generar(refH, 'condolencia-horizontal.png')}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Descargar Horizontal
        </button>

      </div>

    </div>
  );
}
