import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  links: PaginationLink[];
  onChange: (url: string) => void;
  loading?: boolean;
}

export default function Pagination({ links, onChange, loading }: Props) {
  const renderLabel = (label: string) => {
    const isPrev = label.includes('Previous');
    const isNext = label.includes('Next');

    if (isPrev) return <ChevronLeft size={16} />;
    if (isNext) return <ChevronRight size={16} />;

    return <span dangerouslySetInnerHTML={{ __html: label }} />;
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2 justify-center relative">
      {loading && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded" />
      )}

      {links.map((link, index) => {
        const disabled = !link.url || link.active;

        return (
          <Button
            key={`${index}-${link.label}`}
            variant={link.active ? 'secondary' : 'default'}
            size="sm"
            disabled={disabled || loading}
            onClick={() => link.url && onChange(link.url)}
          >
            {renderLabel(link.label)}
          </Button>
        );
      })}
    </div>
  );
}
