import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#home', label: t('nav.home') },
    { href: '#services', label: t('nav.services') },
    { href: '#gallery', label: t('nav.gallery') },
    { href: '#about', label: t('nav.about') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <span className="inline-block w-8 h-8 rounded-full border-2 border-gold relative">
              <span className="absolute inset-1.5 rounded-full bg-red border border-red-bright" />
            </span>
            <span className="font-display text-xl font-bold uppercase tracking-widest">
              Exact <span className="text-gold">Wheel</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-display uppercase text-sm tracking-wider text-muted-foreground hover:text-gold transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center text-xs font-display uppercase tracking-widest">
              <button
                onClick={() => setLanguage('fr')}
                className={language === 'fr' ? 'text-gold' : 'text-muted-foreground hover:text-foreground'}
              >FR</button>
              <span className="mx-2 text-border">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'text-gold' : 'text-muted-foreground hover:text-foreground'}
              >EN</button>
            </div>
            <a
              href="/devis"
              className="bg-gold text-primary-foreground font-display uppercase tracking-wider text-sm font-semibold px-5 py-2.5 hover:bg-gold-bright transition-colors"
            >
              {t('nav.quote')}
            </a>
          </div>

          <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-6 space-y-4 border-t border-border pt-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block font-display uppercase tracking-wider text-muted-foreground hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <button onClick={() => setLanguage('fr')} className={`font-display uppercase ${language === 'fr' ? 'text-gold' : 'text-muted-foreground'}`}>FR</button>
              <span className="text-border">|</span>
              <button onClick={() => setLanguage('en')} className={`font-display uppercase ${language === 'en' ? 'text-gold' : 'text-muted-foreground'}`}>EN</button>
            </div>
            <a href="/devis" onClick={() => setOpen(false)} className="block text-center bg-gold text-primary-foreground font-display uppercase tracking-wider text-sm font-semibold px-5 py-3">
              {t('nav.quote')}
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
