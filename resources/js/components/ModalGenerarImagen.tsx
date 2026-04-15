import { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import CondolenciaCard from './CondolenciaCard';
import { Download, Share2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function ModalGenerarImagen({ data, orientation, onClose }: any) {

  const previewRef = useRef<HTMLDivElement>(null);
  const renderRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const isVertical = orientation === 'vertical';

  // 🔥 dimensiones reales
  const realWidth = isVertical ? 1575 : 3564;
  const realHeight = 2376;

  // 🔥 escala preview
  const scale = isVertical ? 0.25 : 0.18;

  const previewWidth = realWidth * scale;
  const previewHeight = realHeight * scale;

  const [hovered, setHovered] = useState<string | null>(null);

  // 🔥 cerrar con ESC
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

  // 🔥 descargar imagen
  const generar = async () => {
    if (!renderRef.current) return;

    try {
      await waitForFonts();
      await waitForImages(renderRef.current);

      const canvas = await html2canvas(renderRef.current, {
        scale: 1,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `condolencia-${orientation}.png`;
      link.click();

    } catch (error) {
      console.error('Error generando imagen:', error);
    }
  };

  // 🔥 compartir WhatsApp
  const compartirWhatsApp = async () => {
    if (!renderRef.current) return;

    try {
      await waitForFonts();
      await waitForImages(renderRef.current);

      const canvas = await html2canvas(renderRef.current, {
        scale: 1,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      );

      if (!blob) return;

      const file = new File([blob], `condolencia-${orientation}.png`, {
        type: 'image/png',
      });

      // 📱 móviles
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Condolencia',
          text: `Condolencias para ${data.tratamiento} ${data.nombre}`,
        });
      } else {
        // 💻 fallback
        const texto = `Condolencias para ${data.tratamiento} ${data.nombre}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`);
      }

    } catch (error) {
      console.error('Error compartiendo:', error);
    }
  };

  // 🔥 cerrar al hacer click fuera
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

        {/* ❌ cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-xl"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-3 text-center">
          Vista previa ({orientation})
        </h2>

        {/* 🔥 CONTENEDOR RELATIVO */}
        <div className="relative">

          {/* 👁 PREVIEW */}
          <div
            style={{
              width: previewWidth,
              height: previewHeight,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: realWidth,
                height: realHeight,
              }}
            >
              <CondolenciaCard
                ref={previewRef}
                nombre={data.nombre}
                tratamiento={data.tratamiento}
                fecha={data.fecha}
                orientation={orientation}
              />
            </div>
          </div>

          {/* 🔥 BOTONES FLOTANTES */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-3 items-end">

            {/* DESCARGAR */}
            <button
              onMouseEnter={(e) => (e.currentTarget.style.width = '180px')}
              onMouseLeave={(e) => (e.currentTarget.style.width = '48px')}
              onClick={generar}
              className="
                flex items-center
                h-12 w-12
                bg-white/20 backdrop-blur-md text-black
                rounded-full shadow-lg border border-white/30
                overflow-hidden
                transition-all duration-300
              "
            >
              <div className="w-12 flex items-center justify-center flex-shrink-0">
                <Download size={20} />
              </div>
              <span className="pr-4 whitespace-nowrap">
                Descargar
              </span>
            </button>

            {/* WHATSAPP */}
            <button
              onMouseEnter={(e) => (e.currentTarget.style.width = '180px')}
              onMouseLeave={(e) => (e.currentTarget.style.width = '48px')}
              onClick={compartirWhatsApp}
              className="
                flex items-center
                h-12 w-12
                bg-white/20 backdrop-blur-md text-black
                rounded-full shadow-lg border border-white/30
                overflow-hidden
                transition-all duration-300
              "
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

        {/* 🔥 render oculto */}
        <div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
          <CondolenciaCard
            ref={renderRef}
            nombre={data.nombre}
            tratamiento={data.tratamiento}
            fecha={data.fecha}
            orientation={orientation}
          />
        </div>

      </div>
    </div>
  );
}
