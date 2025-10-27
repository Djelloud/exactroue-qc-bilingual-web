import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import img01 from '@/assets/exactwheel01.jpg';
import img02 from '@/assets/exactwheel02.jpg';
import img03 from '@/assets/exactwheel03.jpg';
import img04 from '@/assets/exactwheel04.jpg';
import img05 from '@/assets/exactwheel05.jpg';
import img06 from '@/assets/exactwheel06.jpg';
import img07 from '@/assets/exactwheel07.jpg';
import img08 from '@/assets/exactwheel08.jpg';

const Gallery = () => {
  const { t } = useLanguage();

  const galleryItems = [
    { image: img01 },
    { image: img02 },
    { image: img03 },
    { image: img04 },
    { image: img05 },
    { image: img06 },
    { image: img07 },
    { image: img08 },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => (
            <Card key={index} className="overflow-hidden border-border">
              <div className="p-4">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt="Gallery image"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
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
