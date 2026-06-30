import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const { t, language, setLanguage } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-8 h-8 rounded-full border-2 border-gold relative">
                <span className="absolute inset-1.5 rounded-full bg-red border border-red-bright" />
              </span>
              <span className="font-display text-xl font-bold uppercase tracking-widest">
                Exact <span className="text-gold">Wheel</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-5">{t('footer.about')}</p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 grid place-items-center border border-border hover:border-gold hover:text-gold transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-widest text-sm text-gold mb-5">{t('footer.nav')}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                ['#home', t('nav.home')],
                ['#services', t('nav.services')],
                ['#gallery', t('nav.gallery')],
                ['#about', t('nav.about')],
                ['#contact', t('nav.contact')],
              ].map(([h, l]) => (
                <li key={h}><a href={h} className="hover:text-gold transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-widest text-sm text-gold mb-5">{t('footer.contact')}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-gold" />{t('footer.address')}</li>
              <li className="flex items-start gap-2"><Clock className="w-4 h-4 mt-0.5 text-gold" />{t('footer.hours')}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-widest text-sm text-gold mb-5">{t('nav.contact')}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground mb-5">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold" /><a href="tel:+15141234567" className="hover:text-gold">(514) 123-4567</a></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold" /><a href="mailto:info@exactwheels.com" className="hover:text-gold">info@exactwheels.com</a></li>
            </ul>
            <a href="/devis" className="inline-block bg-gold text-primary-foreground font-display uppercase tracking-wider text-sm font-semibold px-5 py-2.5 hover:bg-gold-bright transition-colors">
              {t('nav.quote')}
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} Exact Wheel Repair. {t('footer.rights')}</p>
          <div className="flex items-center font-display uppercase tracking-widest">
            <button onClick={() => setLanguage('fr')} className={language === 'fr' ? 'text-red' : 'hover:text-foreground'}>FR</button>
            <span className="mx-2">|</span>
            <button onClick={() => setLanguage('en')} className={language === 'en' ? 'text-red' : 'hover:text-foreground'}>EN</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
