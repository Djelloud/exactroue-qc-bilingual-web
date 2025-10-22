import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Zap, Sparkles, Palette, Paintbrush, Truck, Chrome } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Settings,
      title: t('services.straightening'),
      description: t('services.straightening.desc'),
    },
    {
      icon: Zap,
      title: t('services.crack'),
      description: t('services.crack.desc'),
    },
    {
      icon: Sparkles,
      title: t('services.curb'),
      description: t('services.curb.desc'),
    },
    {
      icon: Palette,
      title: t('services.powder'),
      description: t('services.powder.desc'),
    },
    {
      icon: Paintbrush,
      title: t('services.paint'),
      description: t('services.paint.desc'),
    },
    {
      icon: Truck,
      title: t('services.mobile'),
      description: t('services.mobile.desc'),
    },
    {
      icon: Chrome,
      title: t('services.alloy'),
      description: t('services.alloy.desc'),
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('services.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-border hover:shadow-soft transition-all hover:border-primary/50">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
