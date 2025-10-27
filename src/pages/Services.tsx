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
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('services.intro.title')}</h1>
          <p className="text-lg text-muted-foreground mb-4">{t('services.intro.p1')}</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">{t('services.intro.list_title')}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('services.list.straightening_detail')}</li>
            <li>{t('services.list.welding_detail')}</li>
            <li>{t('services.list.paint_detail')}</li>
            <li>{t('services.list.machining_detail')}</li>
            <li>{t('services.list.tire_detail')}</li>
            <li>{t('services.list.sales_detail')}</li>
            <li>{t('services.list.pickup_detail')}</li>
          </ul>
          <p className="text-lg text-muted-foreground mt-6">{t('services.intro.p2')}</p>
          <p className="text-lg text-muted-foreground mt-4">{t('services.intro.p3')}</p>
        </div>
        {/* Services Grid */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">{t('services.title')}</h2>
            <p className="text-muted-foreground mt-2">{t('services.subtitle')}</p>
          </div>
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
    </div>
  );
};

export default Services;
