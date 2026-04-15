import React, { forwardRef } from 'react';

type Props = {
  nombre: string;
  tratamiento: string;
  fecha: string;
  orientation: 'vertical' | 'horizontal';
};

const CondolenciaCard = forwardRef<HTMLDivElement, Props>(
  ({ nombre, tratamiento, fecha, orientation }, ref) => {

    const isVertical = orientation === 'vertical';

    // 🔥 DIMENSIONES REALES (NO CAMBIAR)
    const width = isVertical ? 1575 : 3564;
    const height = 2376;

    // 🔥 CONFIGURACIÓN AJUSTADA (SIN VALORES NEGATIVOS)
    const config = {
      vertical: {
        top: 1350,
        fontSize: 90,
        fechaBottom: 150,
      },
      horizontal: {
        top: 1280,
        fontSize: 120,
        fechaBottom: 220,
      },
    };

    const current = isVertical ? config.vertical : config.horizontal;

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
          src={
            isVertical
              ? `${window.location.origin}/images/condolencia-vertical.png`
              : `${window.location.origin}/images/condolencia-horizontal.png`
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

        {/* 📝 CONTENEDOR TEXTO */}
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

          {/* 🔤 NOMBRE */}
          <h1
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: `${current.fontSize}px`,
              fontWeight: 900,
              color: '#333',
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
            {tratamiento}. {nombre}
          </h1>

        </div>

        {/* 📅 FECHA (SEPARADA PARA EVITAR DESFASE) */}
        <div
          style={{
            position: 'absolute',
            bottom: `${current.fechaBottom}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: isVertical ? '40px' : '55px',
              color: '#444',
              margin: 0,
              fontWeight: 'bold',
            }}
          >
            {formatearFecha(fecha)}
          </p>
        </div>

      </div>
    );
  }
);

CondolenciaCard.displayName = 'CondolenciaCard';

export default CondolenciaCard;
