import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import teamPhoto from '@/assets/exactwheel01.jpg';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('about.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Team Photo */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-soft">
            <img
              src={teamPhoto}
              alt="ExactRoue Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Story */}
          <Card className="border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">{t('about.story')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.story.text')}
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">{t('about.mission')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.mission.text')}
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <Card className="border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">{t('about.values')}</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{t('about.values.quality')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{t('about.values.safety')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{t('about.values.satisfaction')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
