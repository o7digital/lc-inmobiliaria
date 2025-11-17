/**
 * Hook pour générer automatiquement des alt texts SEO-friendly pour les images
 */

interface PropertyData {
  title?: string;
  location?: string;
  propertyType?: string;
  price?: number;
  bedrooms?: number;
}

interface ImageAltConfig {
  propertyData?: PropertyData;
  imageType?: 'main' | 'gallery' | 'thumbnail' | 'agent' | 'logo';
  imageIndex?: number;
  customAlt?: string;
}

export const useImageAlt = () => {
  /**
   * Génère un alt text descriptif et SEO-friendly pour les images
   * @param config - Configuration pour générer l'alt text
   * @returns Alt text optimisé
   */
  const generateAlt = (config: ImageAltConfig): string => {
    const { propertyData, imageType = 'main', imageIndex = 0, customAlt } = config;

    // Si un alt text personnalisé est fourni, l'utiliser
    if (customAlt) {
      return customAlt;
    }

    // Pour les logos
    if (imageType === 'logo') {
      return 'LC Inmobiliaria - Logo de agencia inmobiliaria';
    }

    // Pour les agents
    if (imageType === 'agent' && propertyData?.title) {
      return `Agente inmobiliario ${propertyData.title}`;
    }

    // Pour les propriétés
    if (propertyData) {
      const parts: string[] = [];

      // Type de propriété
      if (propertyData.propertyType) {
        parts.push(propertyData.propertyType);
      }

      // Nombre de chambres
      if (propertyData.bedrooms) {
        parts.push(`${propertyData.bedrooms} recámaras`);
      }

      // Localisation
      if (propertyData.location) {
        parts.push(`en ${propertyData.location}`);
      }

      // Type d'image dans la galerie
      if (imageType === 'gallery' && imageIndex > 0) {
        parts.push(`- Foto ${imageIndex + 1}`);
      }

      // Prix (optionnel)
      if (propertyData.price && imageType === 'main') {
        const formattedPrice = new Intl.NumberFormat('es-MX', {
          style: 'currency',
          currency: 'MXN',
          maximumFractionDigits: 0,
        }).format(propertyData.price);
        parts.push(`- ${formattedPrice}`);
      }

      if (parts.length > 0) {
        return parts.join(' ');
      }

      // Fallback si pas assez de données
      if (propertyData.title) {
        return propertyData.title;
      }
    }

    // Fallback générique
    return 'Propiedad en venta o renta - LC Inmobiliaria';
  };

  /**
   * Génère des alt texts pour une galerie d'images
   * @param propertyData - Données de la propriété
   * @param numberOfImages - Nombre d'images dans la galerie
   * @returns Array d'alt texts
   */
  const generateGalleryAlts = (propertyData: PropertyData, numberOfImages: number): string[] => {
    return Array.from({ length: numberOfImages }, (_, index) => {
      return generateAlt({
        propertyData,
        imageType: index === 0 ? 'main' : 'gallery',
        imageIndex: index,
      });
    });
  };

  /**
   * Génère un title attribute (tooltip) pour l'image
   * @param config - Configuration
   * @returns Title text
   */
  const generateTitle = (config: ImageAltConfig): string => {
    const { propertyData, customAlt } = config;

    if (customAlt) {
      return customAlt;
    }

    if (propertyData?.title) {
      return `Ver detalles de ${propertyData.title}`;
    }

    return 'Ver más información';
  };

  return {
    generateAlt,
    generateGalleryAlts,
    generateTitle,
  };
};

export default useImageAlt;
