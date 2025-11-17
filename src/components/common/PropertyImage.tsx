import React from 'react';
import useImageAlt from '@/hooks/useImageAlt';

interface PropertyImageProps {
  src: string;
  propertyData?: {
    title?: string;
    location?: string;
    propertyType?: string;
    price?: number;
    bedrooms?: number;
  };
  imageType?: 'main' | 'gallery' | 'thumbnail' | 'agent' | 'logo';
  imageIndex?: number;
  customAlt?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
}

/**
 * Composant Image optimisé pour le SEO
 * Génère automatiquement les alt texts et title attributes
 */
const PropertyImage: React.FC<PropertyImageProps> = ({
  src,
  propertyData,
  imageType = 'main',
  imageIndex = 0,
  customAlt,
  className = '',
  width,
  height,
  loading = 'lazy',
  onClick,
}) => {
  const { generateAlt, generateTitle } = useImageAlt();

  const altText = generateAlt({
    propertyData,
    imageType,
    imageIndex,
    customAlt,
  });

  const titleText = generateTitle({
    propertyData,
    customAlt,
  });

  return (
    <img
      src={src}
      alt={altText}
      title={titleText}
      className={className}
      width={width}
      height={height}
      loading={loading}
      onClick={onClick}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
};

export default PropertyImage;
