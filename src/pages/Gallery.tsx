import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import before1 from '@/assets/gallery-before-1.jpg';
import after1 from '@/assets/gallery-after-1.jpg';
import before2 from '@/assets/gallery-before-2.jpg';
import after2 from '@/assets/gallery-after-2.jpg';

const Gallery = () => {
  const { t } = useLanguage();

  const galleryItems = [
    {
      before: before1,
      after: after1,
      category: t('services.curb'),
    },
    {
      before: before2,
      after: after2,
      category: t('services.crack'),
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('gallery.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => (
            <Card key={index} className="overflow-hidden border-border">
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-4 text-center">{item.category}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img
                        src={item.before}
                        alt={`${t('gallery.before')} - ${item.category}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-center text-muted-foreground">
                      {t('gallery.before')}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img
                        src={item.after}
                        alt={`${t('gallery.after')} - ${item.category}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-center text-primary">
                      {t('gallery.after')}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
