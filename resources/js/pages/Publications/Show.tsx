// resources/js/pages/publications/Show.tsx

import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

import ImagenCard from '@/components/ImagenCard';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';

import { Separator } from '@/components/ui/separator';

import {
  RectangleHorizontal,
  RectangleVertical,
  ZoomIn,
  ZoomOut,
  Calendar,
  User,
  Building2,
  Tag,
  Mail,
} from 'lucide-react';
import { Publication } from '@/types/publication';

type Props = {
  publication: Publication;
};

export default function Show({ publication }: Props) {
  const [orientation, setOrientation] = useState<
    'vertical' | 'horizontal'
  >('vertical');

  const [zoom, setZoom] = useState(0.18);

  // Datos para la vista previa
  const previewData = {
    institution_id: String(publication.type_publication?.institution_id),
    type_publication_id: String(publication.type_publication_id),
    tratamiento: publication.tratamiento,
    nombre: publication.nombre,
    fecha: publication.fecha,
    type_publication: publication.type_publication,
  };

  const realWidth = orientation === 'vertical' ? 1575 : 3564;
  const realHeight = 2376;

  const previewWidth = useMemo(() => {
    return realWidth * zoom;
  }, [realWidth, zoom]);

  const previewHeight = useMemo(() => {
    return realHeight * zoom;
  }, [realHeight, zoom]);

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Head title={`Publicación - ${publication.nombre}`} />

      <div className="p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Detalles de la publicación
            </h1>
            <p className="text-muted-foreground mt-1">
              ID: #{publication.id}
            </p>
          </div>

          {/* ORIENTACIÓN */}
          <div className="flex items-center gap-2">
            <Button
              variant={orientation === 'vertical' ? 'default' : 'outline'}
              onClick={() => setOrientation('vertical')}
            >
              <RectangleVertical size={18} />
            </Button>

            <Button
              variant={orientation === 'horizontal' ? 'default' : 'outline'}
              onClick={() => setOrientation('horizontal')}
            >
              <RectangleHorizontal size={18} />
            </Button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 2xl:grid-cols-[420px_1fr] gap-6">
          {/* INFO CARD */}
          <Card>
            <CardHeader>
              <CardTitle>Información de la publicación</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Tipo de publicación */}
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Tag size={16} />
                  <span>Tipo de publicación</span>
                </div>
                <Badge variant="secondary" className="text-base">
                  {publication.type_publication?.nombre || 'N/A'}
                </Badge>
              </div>

              <Separator />

              {/* Institución */}
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Building2 size={16} />
                  <span>Institución</span>
                </div>
                <p className="text-lg font-medium">
                  {publication.type_publication?.institution?.nombre || 'N/A'}
                </p>
              </div>

              <Separator />

              {/* Tratamiento y Nombre */}
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <User size={16} />
                  <span>Persona</span>
                </div>
                <p className="text-lg font-medium">
                  {publication.tratamiento} {publication.nombre}
                </p>
              </div>

              <Separator />

              {/* Fecha */}
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar size={16} />
                  <span>Fecha</span>
                </div>
                <p className="text-lg font-medium">
                  {formatDate(publication.fecha)}
                </p>
              </div>

              <Separator />

              {/* Usuario que creó */}
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <User size={16} />
                  <span>Creado por</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{publication.user?.name || 'N/A'}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(publication.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PREVIEW CARD */}
          <Card className="overflow-hidden">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>Vista previa</CardTitle>

                {/* ZOOM */}
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      setZoom((z) => Math.max(z - 0.02, 0.08))
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
                      setZoom((z) => Math.min(z + 0.02, 0.45))
                    }
                  >
                    <ZoomIn size={18} />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent
              className="p-4 bg-muted/20 overflow-auto"
              style={{
                height: 'calc(100vh - 220px)',
              }}
            >
              <div className="flex justify-center items-start min-w-max">
                <div
                  className="bg-white shadow-2xl border rounded-md overflow-hidden"
                  style={{
                    width: previewWidth,
                    height: previewHeight,
                  }}
                >
                  {/* PREVIEW */}
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

Show.layout = {
  breadcrumbs: [
    {
      title: 'Publicaciones',
      href: '/publications',
    },
    {
      title: 'Ver publicación',
      href: '#',
    },
  ],
};
