import React, { forwardRef } from 'react';

type Props = {
  nombre: string;
  tratamiento: string;
  orientation: 'vertical' | 'horizontal';
};

const CondolenciaCard = forwardRef<HTMLDivElement, Props>(
  ({ nombre, tratamiento, orientation }, ref) => {

    const isVertical = orientation === 'vertical';

    return (
      <div
        ref={ref}
        className={`
          relative overflow-hidden bg-white
          ${isVertical ? 'w-[600px] h-[800px]' : 'w-[800px] h-[600px]'}
        `}
      >

        {/* 🎨 Fondo dinámico */}
        <div className="absolute inset-0">
          <img
            src={
              isVertical
                ? '/images/condolencia-vertical.png'
                : '/images/condolencia-horizontal.png'
            }
            className="w-full h-full object-cover"
          />
        </div>

        {/* 📝 Texto encima del diseño */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

          <h1
            className={`text-3xl font-extra-bold text-gray-800 m-5
                ${isVertical ? 'pt-32' : 'pt-22'}`}
            style={{
                fontFamily: 'Anton, sans-serif',
                letterSpacing: '1px',
                textShadow: `
                -2px -2px 0 #fff,
                2px -2px 0 #fff,
                -2px  2px 0 #fff,
                2px  2px 0 #fff,
                0px  0px 2px #fff
                `,
            }}
            >
            {tratamiento}. {nombre}
        </h1>

        </div>

      </div>
    );
  }
);

CondolenciaCard.displayName = 'CondolenciaCard';

export default CondolenciaCard;
