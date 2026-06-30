import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.gallery': 'Galerie',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.quote': 'Obtenir un devis',

    'hero.badge': 'Montréal — Depuis 2002',
    'hero.title': "Réparation de roues en alliage d'exception",
    'hero.subtitle': 'Service professionnel pour particuliers, garages et concessionnaires.',
    'hero.cta1': 'Obtenir un devis gratuit',
    'hero.cta2': 'Voir notre galerie',

    'process.eyebrow': 'Comment ça marche',
    'process.title': 'Un processus simple, des résultats irréprochables',
    'process.s1.t': 'Demandez un devis',
    'process.s1.d': 'En ligne ou par téléphone, en moins de 24 heures.',
    'process.s2.t': 'Déposez vos roues',
    'process.s2.d': 'À notre atelier de Montréal ou via cueillette.',
    'process.s3.t': 'Reconditionnement expert',
    'process.s3.d': 'Réparation, redressement, polissage et finition.',
    'process.s4.t': 'Récupérez comme neuves',
    'process.s4.d': 'Cueillette à l’atelier ou livraison sur demande.',

    'services.eyebrow': 'Nos services',
    'services.title': 'Tout pour vos jantes, sous un même toit',
    'services.s1.t': 'Réparation de roues fissurées',
    'services.s1.d': 'Soudure TIG certifiée pour restaurer l’intégrité structurelle.',
    'services.s2.t': 'Redressement de jantes',
    'services.s2.d': 'Correction précise des déformations sur banc hydraulique.',
    'services.s3.t': 'Polissage miroir',
    'services.s3.d': 'Finition haute brillance pour un effet chrome éclatant.',
    'services.s4.t': 'Powder coat / Peinture cuite',
    'services.s4.d': 'Revêtement durable, cuit au four, toutes couleurs.',
    'services.s5.t': 'Peinture liquide',
    'services.s5.d': 'Tricoat, hypersilver et teintes personnalisées.',
    'services.s6.t': 'Usinage numérique',
    'services.s6.d': 'Tournage CNC pour finitions diamantées de précision.',
    'services.s7.t': 'Vente de roues d’occasion',
    'services.s7.d': 'Inventaire de roues OEM inspectées et garanties.',
    'services.s8.t': 'Livraison Montréal / Laval',
    'services.s8.d': 'Service de cueillette et livraison dans la région.',

    'gallery.eyebrow': 'Galerie',
    'gallery.title': 'Notre atelier en action',
    'gallery.sub': 'Un aperçu des transformations que nous réalisons chaque jour.',

    'stats.1': 'Roues réparées',
    'stats.2': 'Ans d’expérience',
    'stats.3': 'Clients actifs',
    'stats.4': 'Taux de satisfaction',

    'testi.eyebrow': 'Témoignages',
    'testi.title': 'Ce que nos clients disent',
    'testi.q1': 'Travail impeccable, mes jantes sont comme neuves. Service rapide et professionnel.',
    'testi.q2': 'Le seul atelier à qui je confie les roues de ma flotte. Précis et fiables.',
    'testi.q3': 'Polissage miroir parfait sur mes BBS. On voit la passion du métier.',
    'testi.r1': 'Martin Bergeron — Garage Bergeron Auto, Montréal',
    'testi.r2': 'Sophie Lemieux — Concession Lemieux Auto',
    'testi.r3': 'Alexandre Côté — Particulier, Laval',

    'coverage.eyebrow': 'Zone de service',
    'coverage.title': 'Nous desservons Montréal et ses environs',
    'coverage.sub': 'Service de cueillette et livraison disponible dans la grande région métropolitaine.',

    'faq.eyebrow': 'FAQ',
    'faq.title': 'Questions fréquentes',
    'faq.q1': 'Quels sont vos délais de réparation ?',
    'faq.a1': 'La majorité des réparations sont complétées en 24 à 72 heures selon la finition choisie.',
    'faq.q2': 'Offrez-vous la livraison ?',
    'faq.a2': 'Oui, nous offrons un service de cueillette et livraison à Montréal, Laval et la Rive-Sud.',
    'faq.q3': 'Comment obtenir un devis ?',
    'faq.a3': 'Remplissez notre formulaire en ligne avec quelques photos ou appelez-nous directement.',
    'faq.q4': 'Quels types de finition proposez-vous ?',
    'faq.a4': 'Powder coat, peinture liquide, hypersilver, tricoat, polissage miroir et finitions diamantées.',
    'faq.q5': 'Travaillez-vous avec les garages et concessionnaires ?',
    'faq.a5': 'Absolument. Nous offrons des tarifs préférentiels et une priorité de traitement aux professionnels.',

    'cta.title': 'Prêt à redonner vie à vos roues ?',
    'cta.sub': 'Plus de 500 clients nous font confiance à Montréal.',
    'cta.btn': 'Demander un devis gratuit',

    'footer.about': 'Spécialiste de la réparation de roues en alliage à Montréal depuis 2002.',
    'footer.nav': 'Navigation',
    'footer.contact': 'Coordonnées',
    'footer.hours': 'Lun–Ven 8h–17h',
    'footer.address': '1234 rue Industrielle, Montréal, QC',
    'footer.rights': 'Tous droits réservés.',

    'devis.eyebrow': 'Devis en ligne',
    'devis.title': 'Demandez votre soumission',
    'devis.sub': 'Envoyez-nous quelques photos et une description — nous vous répondons sous 24h ouvrables.',
    'devis.f.name': 'Nom complet',
    'devis.f.email': 'Courriel',
    'devis.f.phone': 'Téléphone',
    'devis.f.vehicle': 'Véhicule',
    'devis.f.vehicle.ph': 'ex. BMW M3 2021',
    'devis.f.size': 'Dimension de roue',
    'devis.f.size.ph': 'ex. 19"',
    'devis.f.service': 'Service souhaité',
    'devis.f.service.ph': 'Choisir un service…',
    'devis.f.service.other': 'Autre / à déterminer',
    'devis.f.description': 'Description du dommage ou du projet',
    'devis.f.description.ph': 'Décrivez l’état des roues, les dommages visibles, le rendu souhaité, etc.',
    'devis.f.photos': 'Photos des roues',
    'devis.f.photos.cta': 'Cliquez pour ajouter des photos',
    'devis.f.photos.hint': 'JPG ou PNG, max {mb} Mo par photo',
    'devis.submit': 'Envoyer ma demande',
    'devis.submitting': 'Envoi en cours…',
    'devis.success': 'Demande envoyée avec succès !',
    'devis.legal': 'Vos informations restent confidentielles et ne servent qu’à préparer votre soumission.',
    'devis.done.title': 'Merci !',
    'devis.done.sub': 'Nous avons bien reçu votre demande. Notre équipe vous contactera très bientôt à l’adresse fournie.',
    'devis.done.back': 'Retour à l’accueil',
    'devis.err.validation': 'Veuillez vérifier les champs obligatoires.',
    'devis.err.type': 'Seules les images sont acceptées.',
    'devis.err.size': 'Image trop volumineuse (max {mb} Mo).',
    'devis.err.max': 'Maximum {n} photos.',
    'devis.err.generic': 'Une erreur est survenue. Veuillez réessayer.',
  },
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.quote': 'Get a quote',

    'hero.badge': 'Montreal — Since 2002',
    'hero.title': 'Exceptional alloy wheel repair',
    'hero.subtitle': 'Professional service for drivers, garages and dealerships.',
    'hero.cta1': 'Get a free quote',
    'hero.cta2': 'View our gallery',

    'process.eyebrow': 'How it works',
    'process.title': 'A simple process, flawless results',
    'process.s1.t': 'Request a quote',
    'process.s1.d': 'Online or by phone, within 24 hours.',
    'process.s2.t': 'Drop off your wheels',
    'process.s2.d': 'At our Montreal shop or via pickup.',
    'process.s3.t': 'Expert reconditioning',
    'process.s3.d': 'Repair, straightening, polish and finishing.',
    'process.s4.t': 'Pick them up like new',
    'process.s4.d': 'Pickup at the shop or local delivery.',

    'services.eyebrow': 'Our services',
    'services.title': 'Everything for your wheels, under one roof',
    'services.s1.t': 'Cracked wheel repair',
    'services.s1.d': 'Certified TIG welding to restore structural integrity.',
    'services.s2.t': 'Wheel straightening',
    'services.s2.d': 'Precise correction on a hydraulic bench.',
    'services.s3.t': 'Mirror polishing',
    'services.s3.d': 'High-gloss finish with chrome-like brilliance.',
    'services.s4.t': 'Powder coating',
    'services.s4.d': 'Durable oven-cured coating in any color.',
    'services.s5.t': 'Liquid paint',
    'services.s5.d': 'Tricoat, hypersilver and custom colors.',
    'services.s6.t': 'CNC machining',
    'services.s6.d': 'Precision diamond-cut finishes via CNC lathe.',
    'services.s7.t': 'Used wheel sales',
    'services.s7.d': 'Inspected, warrantied OEM wheel inventory.',
    'services.s8.t': 'Montreal / Laval delivery',
    'services.s8.d': 'Pickup and delivery throughout the region.',

    'gallery.eyebrow': 'Gallery',
    'gallery.title': 'Our workshop in action',
    'gallery.sub': 'A glimpse of the transformations we deliver every day.',

    'stats.1': 'Wheels repaired',
    'stats.2': 'Years of experience',
    'stats.3': 'Active clients',
    'stats.4': 'Satisfaction rate',

    'testi.eyebrow': 'Testimonials',
    'testi.title': 'What our clients say',
    'testi.q1': 'Flawless work, my wheels look brand new. Fast and professional service.',
    'testi.q2': 'The only shop I trust with my fleet wheels. Precise and reliable.',
    'testi.q3': 'Perfect mirror polish on my BBS. True craftsmanship.',
    'testi.r1': 'Martin Bergeron — Bergeron Auto Garage, Montreal',
    'testi.r2': 'Sophie Lemieux — Lemieux Auto Dealership',
    'testi.r3': 'Alexandre Côté — Private client, Laval',

    'coverage.eyebrow': 'Service area',
    'coverage.title': 'We serve Montreal and surrounding areas',
    'coverage.sub': 'Pickup and delivery available throughout the metropolitan area.',

    'faq.eyebrow': 'FAQ',
    'faq.title': 'Frequently asked questions',
    'faq.q1': 'What are your turnaround times?',
    'faq.a1': 'Most repairs are completed within 24 to 72 hours depending on the chosen finish.',
    'faq.q2': 'Do you offer delivery?',
    'faq.a2': 'Yes, we offer pickup and delivery in Montreal, Laval and the South Shore.',
    'faq.q3': 'How do I get a quote?',
    'faq.a3': 'Fill in our online form with a few photos or call us directly.',
    'faq.q4': 'What finishes do you offer?',
    'faq.a4': 'Powder coat, liquid paint, hypersilver, tricoat, mirror polish and diamond-cut.',
    'faq.q5': 'Do you work with garages and dealerships?',
    'faq.a5': 'Absolutely. We offer preferred pricing and priority service to professionals.',

    'cta.title': 'Ready to bring your wheels back to life?',
    'cta.sub': 'Over 500 clients trust us in Montreal.',
    'cta.btn': 'Request a free quote',

    'footer.about': 'Alloy wheel repair specialist in Montreal since 2002.',
    'footer.nav': 'Navigation',
    'footer.contact': 'Contact',
    'footer.hours': 'Mon–Fri 8am–5pm',
    'footer.address': '1234 Industrial St, Montreal, QC',
    'footer.rights': 'All rights reserved.',

    'devis.eyebrow': 'Online quote',
    'devis.title': 'Request your estimate',
    'devis.sub': 'Send us a few photos and a description — we reply within 24 business hours.',
    'devis.f.name': 'Full name',
    'devis.f.email': 'Email',
    'devis.f.phone': 'Phone',
    'devis.f.vehicle': 'Vehicle',
    'devis.f.vehicle.ph': 'e.g. BMW M3 2021',
    'devis.f.size': 'Wheel size',
    'devis.f.size.ph': 'e.g. 19"',
    'devis.f.service': 'Desired service',
    'devis.f.service.ph': 'Choose a service…',
    'devis.f.service.other': 'Other / to be determined',
    'devis.f.description': 'Damage or project description',
    'devis.f.description.ph': 'Describe the wheel condition, visible damage, desired finish, etc.',
    'devis.f.photos': 'Wheel photos',
    'devis.f.photos.cta': 'Click to add photos',
    'devis.f.photos.hint': 'JPG or PNG, max {mb} MB per photo',
    'devis.submit': 'Send my request',
    'devis.submitting': 'Sending…',
    'devis.success': 'Request sent successfully!',
    'devis.legal': 'Your information stays confidential and is only used to prepare your estimate.',
    'devis.done.title': 'Thank you!',
    'devis.done.sub': 'We received your request. Our team will reach out very soon at the email you provided.',
    'devis.done.back': 'Back to home',
    'devis.err.validation': 'Please check the required fields.',
    'devis.err.type': 'Only image files are accepted.',
    'devis.err.size': 'Image too large (max {mb} MB).',
    'devis.err.max': 'Maximum {n} photos.',
    'devis.err.generic': 'Something went wrong. Please try again.',
  },
} as const;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const t = (key: string) => (translations[language] as Record<string, string>)[key] || key;
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};
