import { Publication } from '@/types/publication';
import React, { forwardRef } from 'react';

type Props = {
    publication: Publication
    orientation: 'vertical' | 'horizontal';
};

const ImagenCard = forwardRef<HTMLDivElement, Props>(
  ({ publication, orientation }, ref) => {

    const isVertical = orientation === 'vertical';

    // 🔥 DIMENSIONES REALES (NO CAMBIAR)
    const width = isVertical ? 1575 : 3564;
    const height = 2376;

    // 🔥 CONFIGURACIÓN AJUSTADA (SIN VALORES NEGATIVOS)

    const current = {
        top_vertical: Number(publication.type_publication?.top_vertical),
        top_horizontal: Number(publication.type_publication?.top_horizontal),
        fechaBottom_vertical: Number(publication.type_publication?.fechaBottom_vertical),
        fechaBottom_horizontal: Number(publication.type_publication?.fechaBottom_horizontal),
        fontsize_vertical: Number(publication.type_publication?.fontsize_vertical),
        fontsize_horizontal: Number(publication.type_publication?.fontsize_horizontal),
    }



    const image_src = `${window.location.origin}/images/${publication.type_publication?.institution?.prefix}-${publication.type_publication?.nombre.split(' ')[0]}-${isVertical?'vertical':'horizontal'}.png`

    // 🔥 FORMATO FECHA
    const formatearFecha = (fecha: string) => {
      const f = new Date(fecha);

      const dia = f.getDate();
      const mes = f.toLocaleDateString('es-ES', { month: 'long' });
      const anio = f.getFullYear();

      return `Santa Cruz ${dia} de ${mes} de ${anio}`;
    };

    return (
      <div
        ref={ref}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >

        {/* 🖼️ FONDO */}
        <img
          src={image_src}
          crossOrigin="anonymous"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />

        {/* 📝 CONTENEDOR TEXTO */}
        <div
          style={{
            position: 'absolute',
            top: `${(isVertical) ? current.top_vertical : current.top_horizontal}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            textAlign: 'center',
          }}
        >

          {/* 🔤 NOMBRE */}
          <h1
            style={{
              fontFamily: '"Bukhari Script", cursive',
              fontSize: `${(isVertical) ? current.fontsize_vertical : current.fontsize_horizontal}px`,
              fontWeight: 400,
              textTransform: 'capitalize',
              color: '#000',
              margin: 0,
              lineHeight: 1.1,
              textShadow: `
                -4px -4px 0 #fff,
                 4px -4px 0 #fff,
                -4px  4px 0 #fff,
                 4px  4px 0 #fff,
                 0px  0px 6px #fff
              `,
            }}
          >
            {publication.tratamiento}. {publication.nombre}
          </h1>

        </div>

        {/* 📅 FECHA (SEPARADA PARA EVITAR DESFASE) */}
        <div
          style={{
            position: 'absolute',
            bottom: `${(isVertical) ? current.fechaBottom_vertical : current.fechaBottom_horizontal}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: `${(isVertical) ? current.fontsize_vertical * 0.32 : current.fontsize_horizontal * 0.5}px`,
              color: '#444',
              margin: 0,
              fontWeight: 'bold',
            }}
          >
            {formatearFecha(publication.fecha)}
          </p>
        </div>

      </div>
    );
  }
);

ImagenCard.displayName = 'ImagenCard';

export default ImagenCard;
