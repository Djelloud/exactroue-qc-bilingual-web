import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const { t, language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission will be implemented later with quote feature
    console.log('Form submitted');
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>{t('contact.info')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t('contact.phone')}</p>
                    <a href="tel:+15146836999" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      (514) 683-6999
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t('contact.email')}</p>
                    <a href="mailto:info@exactwheels.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      info@exactwheels.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t('contact.address')}</p>
                    <p className="text-sm text-muted-foreground">
                      1420 Boul Hymus, Dorval, QC H9P 1J6
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t('contact.hours')}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'fr' ? 'Lun–Mer: 8h00–17h00' : 'Mon–Wed: 8AM–5PM'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'fr' ? 'Jeu: 8h00–19h00' : 'Thu: 8AM–7PM'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'fr' ? 'Ven: 8h00–14h00' : 'Fri: 8AM–2PM'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'fr' ? 'Sam–Dim: Fermé' : 'Sat–Sun: Closed'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>{t('contact.service.area')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('contact.service.area.text')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>{t('contact.form.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contact.form.name')}</Label>
                      <Input id="name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contact.form.email')}</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.form.message')}</Label>
                    <Textarea id="message" rows={6} required />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    {t('contact.form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-12 max-w-6xl mx-auto">
          <Card className="border-border overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">
                {language === 'fr' ? 'Carte de la zone de service' : 'Service Area Map'}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
