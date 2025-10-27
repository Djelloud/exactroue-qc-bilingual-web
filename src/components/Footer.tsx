import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import logo from '@/assets/exactroue-logo.png';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="ExactRoue" className="h-12 w-auto" />
            <p className="text-sm text-muted-foreground">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('nav.services')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/services" className="hover:text-primary transition-colors">
                  {t('services.straightening')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors">
                  {t('services.crack')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors">
                  {t('services.curb')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors">
                  {t('services.powder')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">{t('contact.info')}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+15146836999" className="hover:text-primary transition-colors">
                (514) 683-6999
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@exactroue.com" className="hover:text-primary transition-colors">
                  info@exactroue.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>Montreal, Quebec</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} ExactRoue Inc. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
