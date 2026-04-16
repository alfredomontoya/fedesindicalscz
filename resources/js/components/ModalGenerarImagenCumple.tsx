import { useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import CumpleCard from './CumpleCard';
import { Download } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function ModalGenerarImagenCumple({ data, orientation, onClose }: any) {

  const previewRef = useRef<HTMLDivElement>(null);
  const renderRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const isVertical = orientation === 'vertical';

  const realWidth = isVertical ? 1575 : 3564;
  const realHeight = 2376;

  const scale = isVertical ? 0.25 : 0.18;

  const previewWidth = realWidth * scale;
  const previewHeight = realHeight * scale;

  // ESC cerrar
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // wait fonts
  const waitForFonts = async () => {
    if ((document as any).fonts) {
      await (document as any).fonts.ready;
    }
  };

  // wait images
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

  // DESCARGAR
  const generar = async () => {
    if (!renderRef.current) return;

    await waitForFonts();
    await waitForImages(renderRef.current);

    const canvas = await html2canvas(renderRef.current, {
      scale: 1,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `cumple-${orientation}.png`;
    link.click();
  };

  // WHATSAPP
  const compartirWhatsApp = async () => {
    if (!renderRef.current) return;

    await waitForFonts();
    await waitForImages(renderRef.current);

    const canvas = await html2canvas(renderRef.current, {
      scale: 1,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const texto = `Feliz cumpleaños ${data.tratamiento} ${data.nombre}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`);
  };

  // click fuera
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
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

        {/* PREVIEW */}
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
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: realWidth,
                height: realHeight,
              }}
            >
              <CumpleCard
                ref={previewRef}
                nombre={data.nombre}
                tratamiento={data.tratamiento}
                fecha={data.created_at}
                orientation={orientation}
              />
            </div>
          </div>

          {/* BOTONES FLOTANTES */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-3 items-end">

            {/* DESCARGAR */}
            <button
              onClick={generar}
              className="
                group flex items-center
                h-12 w-12 hover:w-44
                bg-white/20 backdrop-blur-md text-black
                rounded-full shadow-lg border border-white/30
                overflow-hidden
                transition-all duration-300
              "
            >
              <div className="w-12 flex items-center justify-center flex-shrink-0">
                <Download size={20} />
              </div>

              <span className="whitespace-nowrap pr-4 opacity-0 group-hover:opacity-100 transition">
                Descargar
              </span>
            </button>

            {/* WHATSAPP */}
            <button
              onClick={compartirWhatsApp}
              className="
                group flex items-center
                h-12 w-12 hover:w-44
                bg-white/20 backdrop-blur-md text-black
                rounded-full shadow-lg border border-white/30
                overflow-hidden
                transition-all duration-300
              "
            >
              <div className="w-12 flex items-center justify-center flex-shrink-0">
                <FaWhatsapp size={20} />
              </div>

              <span className="whitespace-nowrap pr-4 opacity-0 group-hover:opacity-100 transition">
                WhatsApp
              </span>
            </button>

          </div>
        </div>

        {/* RENDER OCULTO */}
        <div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
          <CumpleCard
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
