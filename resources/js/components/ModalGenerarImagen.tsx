import { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { router } from '@inertiajs/react';

import ImagenCard from './ImagenCard';
import type { Publication } from '../types/publication';

export type Props = {
  data: Publication;
  orientation: 'vertical' | 'horizontal';
  onClose: () => void;
};

export default function ModalGenerarImagen({
  data,
  orientation,
  onClose,
}: Props) {

  const renderRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const isVertical = orientation === 'vertical';

  // 🎯 tamaño REAL (EXPORT)
  const realWidth = isVertical ? 1575 : 3564;
  const realHeight = 2376;

  // 👁 escala SOLO para PREVIEW
  const previewScale = isVertical ? 0.25 : 0.18;

  const previewWidth = realWidth * previewScale;
  const previewHeight = realHeight * previewScale;

  const [publication, setPublication] = useState<Publication>(data);
  const [loading, setLoading] = useState(false);


  const [hovered, setHovered] = useState<string | null>(null);

    useEffect(() => {
        const fetchPublication = async () => {
            try {
            setLoading(true);

            const res = await fetch(`/api/publications/${data.id}`, {
                credentials: 'include',
                headers: {
                Accept: 'application/json',
                },
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error('ERROR BACKEND:', errorText);
                throw new Error('Error al cargar publicación');
            }

            const json = await res.json();
            setPublication(json.data);

            } catch (error) {
            console.error('Error cargando publication:', error);
            } finally {
            setLoading(false);
            }
        };

        fetchPublication();
    }, [data.id]);

  // 🔥 ESC para cerrar
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // 🔥 esperar fuentes
  const waitForFonts = async () => {
    if ((document as any).fonts) {
      await (document as any).fonts.ready;
    }
  };

  // 🔥 esperar imágenes
  const waitForImages = async (element: HTMLElement) => {
    const images = element.querySelectorAll('img');

    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();

        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );
  };

  // 📥 DESCARGAR
  const generar = async () => {
    if (!renderRef.current) return;

    try {
      await waitForFonts();
      await waitForImages(renderRef.current);

      const canvas = await html2canvas(renderRef.current, {
        scale: window.devicePixelRatio,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');

      link.download = `${data.type_publication?.institution?.prefix ?? 'doc'}-${
        data.type_publication?.nombre?.split(' ')[0] ?? 'tipo'
      }-${orientation}.png`;

      link.click();

    } catch (error) {
      console.error('Error generando imagen:', error);
    }
  };

  // 📱 WHATSAPP
  const compartirWhatsApp = async () => {
    if (!renderRef.current) return;

    try {
      await waitForFonts();
      await waitForImages(renderRef.current);

      const canvas = await html2canvas(renderRef.current, {
        scale: window.devicePixelRatio,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      );

      if (!blob) return;

      const file = new File([blob], `imagen.png`, {
        type: 'image/png',
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Publicación',
          text: `Publicación de ${data.tratamiento} ${data.nombre}`,
        });
      } else {
        const texto = `Publicación de ${data.tratamiento} ${data.nombre}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`);
      }

    } catch (error) {
      console.error('Error compartiendo:', error);
    }
  };

  // ❌ cerrar click fuera
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >

      {/* MODAL */}
      <div
        ref={modalRef}
        className="bg-muted-foreground rounded-lg p-4 relative inline-block"
        onClick={(e) => e.stopPropagation()}
      >

        {/* cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-xl"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-3 text-center">
          Vista previa ({orientation})
        </h2>

        {/* 👁 PREVIEW ESCALADO */}
        <div className="relative">

          <div
            style={{
              width: previewWidth,
              height: previewHeight,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                transform: `scale(${previewScale})`,
                transformOrigin: 'top left',
                width: realWidth,
                height: realHeight,
              }}
            >
              <ImagenCard
                ref={renderRef}
                publication={publication}
                orientation={orientation}
              />
            </div>
          </div>
            {/* 🔥 BOTONES FLOTANTES */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-3 items-end">

                {/* DESCARGAR */}
            <button
                className=" flex items-center h-12 w-12  bg-white/20 backdrop-blur-md text-black rounded-full shadow-lg border border-white/30 overflow-hidden transition-all duration-300"
                onMouseEnter={(e) => (e.currentTarget.style.width = '180px')}
                onMouseLeave={(e) => (e.currentTarget.style.width = '48px')}
                onClick={generar}
            >
                <div className="w-12 flex items-center justify-center flex-shrink-0">
                    <Download size={20} />
                </div>
                <span className="pr-4 whitespace-nowrap">
                    Descargar
                </span>
            </button>

            <button
                className="flex items-center h-12 w-12 bg-white/20 backdrop-blur-md text-black rounded-full shadow-lg border border-white/30 overflow-hidden transition-all duration-300"
                onMouseEnter={(e) => (e.currentTarget.style.width = '180px')}
                onMouseLeave={(e) => (e.currentTarget.style.width = '48px')}
                onClick={compartirWhatsApp}
            >
                <div className="w-12 flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp size={20} />
                </div>
                <span className="pr-4 whitespace-nowrap">
                    WhatsApp
                </span>
            </button>

            </div>
        </div>



        {/* 🔥 RENDER OCULTO (EXPORT REAL SIN SCALE) */}
        <div
          style={{
            position: 'fixed',
            left: '-9999px',
            top: 0,
            width: realWidth,
            height: realHeight,
          }}
        >
          <ImagenCard
            ref={renderRef}
            publication={publication}
            orientation={orientation}
          />
        </div>

      </div>
    </div>
  );
}
