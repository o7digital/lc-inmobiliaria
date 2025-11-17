/**
 * Configuration SEO centralisée pour LC Inmobiliaria
 * À mettre à jour avec les vraies informations de l'entreprise
 */

export const SEO_CONFIG = {
  // Informations de base
  siteName: 'LC Inmobiliaria',
  siteUrl: 'https://www.lcinmobiliaria.com', // ⚠️ À MODIFIER avec votre vrai domaine
  
  // Informations de l'organisation
  organization: {
    name: 'LC Inmobiliaria',
    legalName: 'LC Inmobiliaria S.A. de C.V.', // ⚠️ À MODIFIER
    description: 'Agencia inmobiliaria líder especializada en venta y renta de propiedades de lujo en México',
    logo: '/images/logo.png', // ⚠️ À MODIFIER avec le vrai chemin du logo
    foundingDate: '2020', // ⚠️ À MODIFIER
    
    // Adresse (OPTIONNEL - laisser vide si pas souhaité pour sécurité)
    address: {
      streetAddress: '', // Laisser vide si pas d'adresse publique
      addressLocality: 'Ciudad de México', // Juste la ville
      addressRegion: 'CDMX',
      postalCode: '', // Optionnel
      addressCountry: 'MX',
    },
    
    // Contact (OPTIONNEL pour sécurité)
    contact: {
      telephone: '', // Laisser vide pour éviter appels non désirés
      email: 'contacto@lcinmobiliaria.com', // ⚠️ À MODIFIER - Email uniquement
      contactType: 'customer service',
    },
    
    // Réseaux sociaux
    socialMedia: {
      facebook: 'https://www.facebook.com/lcinmobiliaria', // ⚠️ À MODIFIER ou supprimer
      instagram: 'https://www.instagram.com/lcinmobiliaria', // ⚠️ À MODIFIER ou supprimer
      twitter: '', // ⚠️ Ajouter si applicable
      linkedin: '', // ⚠️ Ajouter si applicable
      youtube: '', // ⚠️ Ajouter si applicable
    },
  },
  
  // Métadonnées par défaut
  defaultMetadata: {
    title: 'LC Inmobiliaria - Venta y Renta de Propiedades en México',
    description: 'Encuentra tu hogar ideal con LC Inmobiliaria. Casas, departamentos y propiedades de lujo en venta y renta. Asesoría profesional en bienes raíces.',
    keywords: [
      'inmobiliaria',
      'venta de casas',
      'renta de departamentos',
      'propiedades en México',
      'bienes raíces',
      'casas en venta',
      'departamentos en renta',
      'propiedades de lujo',
    ],
    ogImage: '/images/og-image.jpg', // ⚠️ Image Open Graph par défaut (1200x630px recommandé)
  },
  
  // Configuration des pages
  pages: {
    home: {
      title: 'LC Inmobiliaria - Tu Hogar Ideal te Espera',
      description: 'Descubre las mejores propiedades en venta y renta. Casas, departamentos y terrenos con asesoría personalizada.',
    },
    listings: {
      title: 'Propiedades en Venta y Renta | LC Inmobiliaria',
      description: 'Explora nuestro catálogo completo de propiedades. Filtros avanzados para encontrar exactamente lo que buscas.',
    },
    contact: {
      title: 'Contacto | LC Inmobiliaria',
      description: 'Contáctanos para más información sobre nuestras propiedades. Estamos aquí para ayudarte a encontrar tu hogar ideal.',
    },
    aboutUs: {
      title: 'Quiénes Somos | LC Inmobiliaria',
      description: 'Conoce nuestra historia y compromiso con la excelencia en el mercado inmobiliario mexicano.',
    },
  },
  
  // Zones géographiques couvertes
  serviceAreas: [
    'Ciudad de México',
    'Polanco',
    'Roma',
    'Condesa',
    'Santa Fe',
    // ⚠️ Ajouter vos zones de service
  ],
  
  // Types de propriétés
  propertyTypes: {
    casa: 'Casa',
    departamento: 'Departamento',
    terreno: 'Terreno',
    oficina: 'Oficina',
    local: 'Local Comercial',
    bodega: 'Bodega',
  },
};

/**
 * Génère un titre SEO optimisé
 */
export const generatePageTitle = (pageTitle: string, includeSiteName = true): string => {
  if (includeSiteName) {
    return `${pageTitle} | ${SEO_CONFIG.siteName}`;
  }
  return pageTitle;
};

/**
 * Obtient les URLs des réseaux sociaux (filtre les vides)
 */
export const getSocialMediaUrls = (): string[] => {
  return Object.values(SEO_CONFIG.organization.socialMedia).filter(url => url !== '');
};

/**
 * Génère la description d'une propriété pour le SEO
 */
export const generatePropertyDescription = (property: {
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  location: string;
  price?: number;
}): string => {
  const parts: string[] = [];
  
  if (property.type) {
    parts.push(property.type);
  }
  
  if (property.bedrooms) {
    parts.push(`${property.bedrooms} recámaras`);
  }
  
  if (property.bathrooms) {
    parts.push(`${property.bathrooms} baños`);
  }
  
  if (property.area) {
    parts.push(`${property.area}m²`);
  }
  
  parts.push(`en ${property.location}`);
  
  if (property.price) {
    const formattedPrice = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(property.price);
    parts.push(`- ${formattedPrice}`);
  }
  
  return parts.join(' ');
};

export default SEO_CONFIG;
