// resources/js/pages/publications/Create.tsx

import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

import Form from './Form';
import ImagenCard from '@/components/ImagenCard';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  RectangleHorizontal,
  RectangleVertical,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

export default function Create() {

  const [orientation, setOrientation] = useState<
    'vertical' | 'horizontal'
  >('vertical');

  const [zoom, setZoom] = useState(0.18);

  // 🔥 PREVIEW EN TIEMPO REAL
  const [previewData, setPreviewData] = useState<any>({
    institution_id: '1',
    type_publication_id: '1',

    tratamiento: 'Sr',

    nombre: '',

    fecha: new Date()
      .toISOString()
      .split('T')[0],

    type_publication: {
      nombre: 'Condolencia',

      top_vertical: 850,
      top_horizontal: 900,

      fechaBottom_vertical: 150,
      fechaBottom_horizontal: 180,

      fontsize_vertical: 120,
      fontsize_horizontal: 140,

      institution: {
        prefix: 'fstmb',
      },
    },
  });

  const realWidth =
    orientation === 'vertical'
      ? 1575
      : 3564;

  const realHeight = 2376;

  const previewWidth = useMemo(() => {
    return realWidth * zoom;
  }, [realWidth, zoom]);

  const previewHeight = useMemo(() => {
    return realHeight * zoom;
  }, [realHeight, zoom]);

  return (
    <>
      <Head title="Nueva Publicacion" />

      <div className="p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <h1 className="text-2xl font-bold">
            Nueva publicación
          </h1>

          {/* ORIENTACION */}
          <div className="flex items-center gap-2">

            <Button
              variant={
                orientation === 'vertical'
                  ? 'default'
                  : 'outline'
              }
              onClick={() =>
                setOrientation('vertical')
              }
            >
              <RectangleVertical size={18} />
            </Button>

            <Button
              variant={
                orientation === 'horizontal'
                  ? 'default'
                  : 'outline'
              }
              onClick={() =>
                setOrientation('horizontal')
              }
            >
              <RectangleHorizontal size={18} />
            </Button>

          </div>

        </div>

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            2xl:grid-cols-[420px_1fr]
            gap-6
          "
        >

          {/* FORM */}
          <Card className="h-fit">

            <CardHeader>
              <CardTitle>
                Configuración
              </CardTitle>
            </CardHeader>

            <CardContent>

              <Form
                url="/publications"
                method="post"
                previewData={previewData}
                setPreviewData={setPreviewData}
              />

            </CardContent>

          </Card>

          {/* PREVIEW */}
          <Card className="overflow-hidden">

            <CardHeader className="border-b">

              <div className="flex items-center justify-between">

                <CardTitle>
                  Vista previa en tiempo real
                </CardTitle>

                {/* ZOOM */}
                <div className="flex items-center gap-2">

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      setZoom((z) =>
                        Math.max(z - 0.02, 0.08)
                      )
                    }
                  >
                    <ZoomOut size={18} />
                  </Button>

                  <div className="text-sm w-16 text-center">
                    {Math.round(zoom * 100)}%
                  </div>

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      setZoom((z) =>
                        Math.min(z + 0.02, 0.45)
                      )
                    }
                  >
                    <ZoomIn size={18} />
                  </Button>

                </div>

              </div>

            </CardHeader>

            <CardContent
              className="
                p-4
                bg-muted/20
                overflow-auto
              "
              style={{
                height: 'calc(100vh - 220px)',
              }}
            >

              <div
                className="
                  flex
                  justify-center
                  items-start
                  min-w-max
                "
              >

                <div
                  className="
                    bg-white
                    shadow-2xl
                    border
                    rounded-md
                    overflow-hidden
                  "
                  style={{
                    width: previewWidth,
                    height: previewHeight,
                  }}
                >

                  {/* 🔥 PREVIEW */}
                  <div
                    style={{
                      transform: `scale(${zoom})`,
                      transformOrigin: 'top left',
                      width: realWidth,
                      height: realHeight,
                    }}
                  >
                    <ImagenCard
                      publication={previewData}
                      orientation={orientation}
                    />
                  </div>

                </div>

              </div>

            </CardContent>

          </Card>

        </div>

      </div>
    </>
  );
}

Create.layout = {
  breadcrumbs: [
    {
      title: 'Publicaciones/Crear',
      href: '/publications',
    },
  ],
};
