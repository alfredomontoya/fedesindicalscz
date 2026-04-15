import React, { forwardRef } from 'react';

type Props = {
  nombre: string;
  tratamiento: string;
  fecha: string;
  orientation: 'vertical' | 'horizontal';
};

const CumpleCard = forwardRef<HTMLDivElement, Props>(
  ({ nombre, tratamiento, fecha, orientation }, ref) => {

    const isVertical = orientation === 'vertical';

    // 🔥 dimensiones reales (IGUAL CRITERIO QUE CONDOLENCIA)
    const width = isVertical ? 1575 : 3564;
    const height = 2376;

    const config = {
      vertical: {
        top: 900,
        fontSize: 110,
        fechaBottom: 200,
      },
      horizontal: {
        top: 1320,
        fontSize: 140,
        fechaBottom: 250,
      },
    };

    const current = isVertical ? config.vertical : config.horizontal;

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
          backgroundColor: '#fff',
        }}
      >

        {/* 🎂 FONDO */}
        <img
          src={
            isVertical
              ? `${window.location.origin}/images/cumple-vertical.png`
              : `${window.location.origin}/images/cumple-horizontal.png`
          }
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

        {/* 📝 TEXTO */}
        <div
          style={{
            position: 'absolute',
            top: `${current.top}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: `${current.fontSize}px`,
              fontWeight: 900,
              color: '#333',
              margin: 0,
              textShadow: `
                -4px -4px 0 #fff,
                 4px -4px 0 #fff,
                -4px  4px 0 #fff,
                 4px  4px 0 #fff,
                 0 0 6px #fff
              `,
            }}
          >
            🎉 {tratamiento}. {nombre}
          </h1>
        </div>

        {/* 📅 FECHA */}
        <div
          style={{
            position: 'absolute',
            bottom: `${current.fechaBottom}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: isVertical ? '40px' : '55px',
              fontFamily: 'Arial',
              fontWeight: 'bold',
              color: '#444',
              margin: 0,
            }}
          >
            {formatearFecha(fecha)}
          </p>
        </div>

      </div>
    );
  }
);

CumpleCard.displayName = 'CumpleCard';
export default CumpleCard;
