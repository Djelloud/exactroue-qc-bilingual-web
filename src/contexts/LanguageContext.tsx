import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Expert Rim Repair & Restoration',
    'hero.subtitle': 'Serving Quebec with fast, reliable, and affordable rim repair services.',
    'hero.cta': 'Get a Free Quote',
    
    // Benefits
    'benefits.mobile.title': '24/7 Mobile Service',
    'benefits.mobile.desc': 'We come to you, anywhere in Quebec',
    'benefits.warranty.title': 'Lifetime Warranty',
    'benefits.warranty.desc': 'Quality guaranteed on all repairs',
    'benefits.finish.title': 'Factory Finish Results',
    'benefits.finish.desc': 'Professional refinishing like new',
    'benefits.fast.title': 'Fast Turnaround',
    'benefits.fast.desc': 'Most repairs completed same day',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive rim repair solutions for all vehicle types',
    'services.straightening': 'Rim Straightening',
    'services.straightening.desc': 'Professional straightening of bent rims to restore perfect balance and safety.',
    'services.crack': 'Crack & Weld Repair',
    'services.crack.desc': 'Expert welding and structural repairs for cracked alloy wheels.',
    'services.curb': 'Curb Rash & Scratch Repair',
    'services.curb.desc': 'Complete restoration of cosmetic damage from curbs and road hazards.',
    'services.powder': 'Powder Coating & Refinishing',
    'services.powder.desc': 'Durable powder coating in any color for a lasting factory finish.',
    'services.paint': 'Paint Matching',
    'services.paint.desc': 'Precise color matching to your original wheel specifications.',
    'services.mobile': 'Mobile Repair Service',
    'services.mobile.desc': 'Convenient on-site repairs at your home or office.',
    'services.alloy': 'Alloy & Chrome Repair',
    'services.alloy.desc': 'Specialized repair for alloy and chrome wheel finishes.',
    
    // Gallery
    'gallery.title': 'Our Work',
    'gallery.subtitle': 'See the dramatic transformations we deliver every day',
    'gallery.before': 'Before',
    'gallery.after': 'After',
    
    // About
    'about.title': 'About ExactRoue',
    'about.subtitle': 'Quebec\'s trusted wheel repair experts',
    'about.story': 'Our Story',
    'about.story.text': 'ExactRoue was founded on a passion for automotive excellence and a commitment to customer satisfaction. We understand that your vehicle\'s wheels are more than just functional components—they\'re an investment in safety, performance, and style. Our team brings years of specialized experience in rim repair and refinishing, using industry-leading techniques and equipment to deliver results that exceed expectations.',
    'about.mission': 'Our Mission',
    'about.mission.text': 'We are dedicated to providing Quebec drivers with accessible, high-quality wheel repair services. Our mission is to restore your wheels to their original condition while offering the convenience, speed, and value you deserve.',
    'about.values': 'Our Values',
    'about.values.quality': 'Quality: Every repair meets our strict factory-finish standards',
    'about.values.safety': 'Safety: Your safety is our top priority in every repair',
    'about.values.satisfaction': 'Satisfaction: We\'re not done until you\'re completely satisfied',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch for a free quote or consultation',
    'contact.info': 'Contact Information',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.hours': 'Business Hours',
    'contact.form.title': 'Send Us a Message',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.service.area': 'Service Area',
    'contact.service.area.text': 'We proudly serve all of Quebec, with mobile service available throughout the greater Montreal region.',
    
    // Footer
    'footer.tagline': 'Professional wheel repair and restoration services across Quebec',
    'footer.rights': 'All rights reserved.',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.gallery': 'Galerie',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Réparation et Restauration de Jantes Expertes',
    'hero.subtitle': 'Nous desservons le Québec avec des services de réparation de jantes rapides, fiables et abordables.',
    'hero.cta': 'Obtenez une Soumission Gratuite',
    
    // Benefits
    'benefits.mobile.title': 'Service Mobile 24/7',
    'benefits.mobile.desc': 'Nous venons à vous, partout au Québec',
    'benefits.warranty.title': 'Garantie à Vie',
    'benefits.warranty.desc': 'Qualité garantie sur toutes les réparations',
    'benefits.finish.title': 'Résultats Finition d\'Usine',
    'benefits.finish.desc': 'Refinition professionnelle comme neuf',
    'benefits.fast.title': 'Service Rapide',
    'benefits.fast.desc': 'La plupart des réparations le jour même',
    
    // Services
    'services.title': 'Nos Services',
    'services.subtitle': 'Solutions complètes de réparation de jantes pour tous types de véhicules',
    'services.straightening': 'Redressage de Jantes',
    'services.straightening.desc': 'Redressage professionnel des jantes courbées pour restaurer l\'équilibre parfait et la sécurité.',
    'services.crack': 'Réparation de Fissures et Soudure',
    'services.crack.desc': 'Soudure experte et réparations structurelles pour jantes en alliage fissurées.',
    'services.curb': 'Réparation de Rayures et Éraflures',
    'services.curb.desc': 'Restauration complète des dommages cosmétiques causés par les bordures et les dangers de la route.',
    'services.powder': 'Revêtement en Poudre et Finition',
    'services.powder.desc': 'Revêtement en poudre durable dans n\'importe quelle couleur pour une finition d\'usine durable.',
    'services.paint': 'Correspondance de Peinture',
    'services.paint.desc': 'Correspondance de couleur précise aux spécifications originales de vos roues.',
    'services.mobile': 'Service de Réparation Mobile',
    'services.mobile.desc': 'Réparations pratiques sur place à votre domicile ou bureau.',
    'services.alloy': 'Réparation d\'Alliage et de Chrome',
    'services.alloy.desc': 'Réparation spécialisée pour les finitions de roues en alliage et chrome.',
    
    // Gallery
    'gallery.title': 'Notre Travail',
    'gallery.subtitle': 'Découvrez les transformations spectaculaires que nous réalisons chaque jour',
    'gallery.before': 'Avant',
    'gallery.after': 'Après',
    
    // About
    'about.title': 'À Propos d\'ExactRoue',
    'about.subtitle': 'Les experts en réparation de roues de confiance du Québec',
    'about.story': 'Notre Histoire',
    'about.story.text': 'ExactRoue a été fondé sur une passion pour l\'excellence automobile et un engagement envers la satisfaction client. Nous comprenons que les roues de votre véhicule sont plus que de simples composants fonctionnels—ce sont un investissement dans la sécurité, la performance et le style. Notre équipe apporte des années d\'expérience spécialisée en réparation et refinition de jantes, utilisant des techniques et équipements de pointe pour livrer des résultats qui dépassent les attentes.',
    'about.mission': 'Notre Mission',
    'about.mission.text': 'Nous sommes dédiés à fournir aux conducteurs québécois des services de réparation de roues accessibles et de haute qualité. Notre mission est de restaurer vos roues à leur condition originale tout en offrant la commodité, la rapidité et la valeur que vous méritez.',
    'about.values': 'Nos Valeurs',
    'about.values.quality': 'Qualité : Chaque réparation respecte nos normes strictes de finition d\'usine',
    'about.values.safety': 'Sécurité : Votre sécurité est notre priorité absolue dans chaque réparation',
    'about.values.satisfaction': 'Satisfaction : Nous n\'avons pas terminé tant que vous n\'êtes pas complètement satisfait',
    
    // Contact
    'contact.title': 'Contactez-Nous',
    'contact.subtitle': 'Contactez-nous pour une soumission gratuite ou une consultation',
    'contact.info': 'Informations de Contact',
    'contact.phone': 'Téléphone',
    'contact.email': 'Courriel',
    'contact.address': 'Adresse',
    'contact.hours': 'Heures d\'Ouverture',
    'contact.form.title': 'Envoyez-Nous un Message',
    'contact.form.name': 'Votre Nom',
    'contact.form.email': 'Adresse Courriel',
    'contact.form.phone': 'Numéro de Téléphone',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Envoyer le Message',
    'contact.service.area': 'Zone de Service',
    'contact.service.area.text': 'Nous sommes fiers de desservir tout le Québec, avec un service mobile disponible dans toute la grande région de Montréal.',
    
    // Footer
    'footer.tagline': 'Services professionnels de réparation et restauration de roues à travers le Québec',
    'footer.rights': 'Tous droits réservés.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr'); // Default to French for Quebec

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
