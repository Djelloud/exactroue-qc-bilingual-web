import { useLanguage } from '@/contexts/LanguageContext';
import Counter from '@/components/Counter';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, ArrowRight, Wrench, Hammer, Sparkles, Paintbrush, Droplet, Cog, ShoppingCart, Truck, MapPin } from 'lucide-react';
import hero from '@/assets/hero-wheel-dark.jpg';
import g1 from '@/assets/atelier-1.jpg';
import g2 from '@/assets/atelier-2.jpg';
import g3 from '@/assets/atelier-3.jpg';
import g4 from '@/assets/atelier-4.jpg';

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-3 font-display uppercase tracking-[0.3em] text-xs text-gold mb-4">
    <span className="w-8 h-px bg-gold" /> {children}
  </div>
);

const Home = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Hammer, k: 's1' },
    { icon: Wrench, k: 's2' },
    { icon: Sparkles, k: 's3' },
    { icon: Paintbrush, k: 's4' },
    { icon: Droplet, k: 's5' },
    { icon: Cog, k: 's6' },
    { icon: ShoppingCart, k: 's7' },
    { icon: Truck, k: 's8' },
  ];

  const testimonials = [
    { initials: 'MB', q: 'testi.q1', r: 'testi.r1' },
    { initials: 'SL', q: 'testi.q2', r: 'testi.r2' },
    { initials: 'AC', q: 'testi.q3', r: 'testi.r3' },
  ];

  const regions = ['Montréal', 'Laval', 'Longueuil', 'Brossard', 'Rive-Sud', 'Rive-Nord'];
  const faqs = [1, 2, 3, 4, 5];

  return (
    <div>
      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="relative container mx-auto px-6 py-32">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-3 border border-gold/40 px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="font-display uppercase tracking-[0.25em] text-xs text-gold">
                {t('hero.badge')}
              </span>
            </div>
            <h1 className="font-display uppercase font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
              {t('hero.title').split(' ').slice(0, -2).join(' ')}{' '}
              <span className="text-gold">{t('hero.title').split(' ').slice(-2).join(' ')}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/devis" className="group inline-flex items-center gap-2 bg-gold text-primary-foreground font-display uppercase tracking-wider text-sm font-semibold px-7 py-4 hover:bg-gold-bright transition-colors">
                {t('hero.cta1')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#gallery" className="inline-flex items-center gap-2 border border-border hover:border-gold hover:text-gold font-display uppercase tracking-wider text-sm font-semibold px-7 py-4 transition-colors">
                {t('hero.cta2')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16 reveal">
            <Eyebrow>{t('process.eyebrow')}</Eyebrow>
            <h2 className="font-display uppercase font-bold text-4xl md:text-5xl">{t('process.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['s1', 's2', 's3', 's4'].map((k, i) => (
              <div key={k} className="reveal relative" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-16 h-16 rounded-full border-2 border-gold grid place-items-center font-display text-2xl font-bold text-gold mb-6">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display uppercase text-xl font-bold mb-3">{t(`process.${k}.t`)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(`process.${k}.d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-card/30 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16 reveal">
            <Eyebrow>{t('services.eyebrow')}</Eyebrow>
            <h2 className="font-display uppercase font-bold text-4xl md:text-5xl">{t('services.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {services.map(({ icon: Icon, k }, i) => (
              <div
                key={k}
                className="group bg-card p-8 hover:bg-background transition-all relative reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="absolute top-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <Icon className="w-8 h-8 text-gold mb-6" strokeWidth={1.5} />
                <h3 className="font-display uppercase text-lg font-bold mb-3 leading-tight">{t(`services.${k}.t`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(`services.${k}.d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16 reveal">
            <Eyebrow>{t('gallery.eyebrow')}</Eyebrow>
            <h2 className="font-display uppercase font-bold text-4xl md:text-5xl mb-4">{t('gallery.title')}</h2>
            <p className="text-muted-foreground">{t('gallery.sub')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 reveal">
            {[g1, g2, g3, g4, g3, g2, g4, g1].map((src, i) => (
              <div
                key={i}
                className={`relative overflow-hidden bg-card group ${i % 5 === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'}`}
              >
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-background/30 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border mt-20 border border-border">
            {[
              { n: 20000, s: '+', k: 'stats.1' },
              { n: 20, s: '+', k: 'stats.2' },
              { n: 500, s: '+', k: 'stats.3' },
              { n: 98, s: '%', k: 'stats.4' },
            ].map((stat) => (
              <div key={stat.k} className="bg-background p-8 text-center reveal">
                <div className="font-display text-5xl md:text-6xl font-bold text-gold mb-2">
                  <Counter end={stat.n} suffix={stat.s} />
                </div>
                <div className="font-display uppercase tracking-widest text-xs text-muted-foreground">
                  {t(stat.k)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="about" className="py-24 bg-card/30 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16 reveal">
            <Eyebrow>{t('testi.eyebrow')}</Eyebrow>
            <h2 className="font-display uppercase font-bold text-4xl md:text-5xl">{t('testi.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((tt, i) => (
              <div key={i} className="bg-background border border-border p-8 reveal group hover:border-gold/40 transition-colors" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-8">“{t(tt.q)}”</p>
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-gold text-primary-foreground grid place-items-center font-display font-bold">
                    {tt.initials}
                  </div>
                  <div className="text-sm text-muted-foreground">{t(tt.r)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="py-24 border-t border-border relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <Eyebrow>{t('coverage.eyebrow')}</Eyebrow>
              <h2 className="font-display uppercase font-bold text-4xl md:text-5xl mb-4">{t('coverage.title')}</h2>
              <p className="text-muted-foreground mb-8">{t('coverage.sub')}</p>
              <div className="grid grid-cols-2 gap-3">
                {regions.map((r) => (
                  <div key={r} className="flex items-center gap-3 border border-border p-4 hover:border-gold transition-colors group">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span className="font-display uppercase tracking-wider text-sm">{r}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal aspect-square relative border border-border p-8 bg-card/40">
              {/* Stylized map */}
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(44 53% 54%)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(44 53% 54%)" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {Array.from({ length: 12 }).map((_, i) => (
                  <circle key={i} cx="200" cy="200" r={20 + i * 14} fill="none" stroke="hsl(0 0% 16%)" strokeWidth="1" />
                ))}
                <circle cx="200" cy="200" r="180" fill="url(#glow)" />
                {[
                  [200, 200, 'Montréal', 8],
                  [140, 150, 'Laval', 5],
                  [260, 250, 'Longueuil', 5],
                  [280, 300, 'Brossard', 4],
                  [120, 280, 'Rive-Sud', 4],
                  [180, 90, 'Rive-Nord', 4],
                ].map(([x, y, name, r]: any, i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r={r} fill="hsl(44 53% 54%)">
                      <animate attributeName="r" values={`${r};${r + 4};${r}`} dur="2.5s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                    </circle>
                    <text x={x + 12} y={y + 4} fill="hsl(0 0% 80%)" fontSize="11" fontFamily="Barlow Condensed" letterSpacing="1">
                      {name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-card/30 border-t border-border">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="mb-12 reveal text-center">
            <Eyebrow>{t('faq.eyebrow')}</Eyebrow>
            <h2 className="font-display uppercase font-bold text-4xl md:text-5xl">{t('faq.title')}</h2>
          </div>
          <Accordion type="single" collapsible className="reveal">
            {faqs.map((n) => (
              <AccordionItem key={n} value={`${n}`} className="border-border">
                <AccordionTrigger className="font-display uppercase tracking-wide text-left text-base hover:text-gold py-6">
                  {t(`faq.q${n}`)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {t(`faq.a${n}`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="py-28 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={hero} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        <div className="relative container mx-auto px-6 text-center reveal">
          <h2 className="font-display uppercase font-bold text-4xl md:text-6xl mb-4">
            <span className="text-gold">{t('cta.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">{t('cta.sub')}</p>
          <a href="mailto:info@exactwheel.ca" className="group inline-flex items-center gap-2 bg-gold text-primary-foreground font-display uppercase tracking-wider text-sm font-semibold px-8 py-4 hover:bg-gold-bright transition-colors">
            {t('cta.btn')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
