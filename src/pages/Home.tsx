import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Truck, Shield, Wrench, Clock } from 'lucide-react';
import heroImage from '@/assets/accueil-slide12.jpg';

const Home = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Truck,
      title: t('benefits.mobile.title'),
      description: t('benefits.mobile.desc'),
    },
    {
      icon: Shield,
      title: t('benefits.warranty.title'),
      description: t('benefits.warranty.desc'),
    },
    {
      icon: Wrench,
      title: t('benefits.finish.title'),
      description: t('benefits.finish.desc'),
    },
    {
      icon: Clock,
      title: t('benefits.fast.title'),
      description: t('benefits.fast.desc'),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 to-charcoal/70" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <Button asChild size="lg" className="shadow-accent">
            <Link to="/contact">{t('hero.cta')}</Link>
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        {/* <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-border hover:shadow-soft transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div> */}
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-charcoal to-charcoal/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('hero.title')}
          </h2>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="default" className="shadow-accent">
              <Link to="/contact">{t('hero.cta')}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/services">{t('nav.services')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
