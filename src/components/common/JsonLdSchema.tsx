import React from 'react';

interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[]; // URLs des réseaux sociaux
}

interface RealEstateListingSchemaProps {
  name: string;
  description: string;
  url: string;
  image: string[];
  price: number;
  priceCurrency: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  numberOfRooms?: number;
  floorSize?: {
    value: number;
    unitCode: string; // "MTK" pour m²
  };
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

// Schema pour l'organisation (agence immobilière)
export const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({
  name,
  url,
  logo,
  description,
  address,
  contactPoint,
  sameAs,
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": name,
    "url": url,
    ...(logo && { "logo": logo }),
    ...(description && { "description": description }),
    ...(address && address.addressLocality && {
      "address": {
        "@type": "PostalAddress",
        ...address,
      }
    }),
    ...(contactPoint && (contactPoint.email || contactPoint.telephone) && {
      "contactPoint": {
        "@type": "ContactPoint",
        ...contactPoint,
      }
    }),
    ...(sameAs && { "sameAs": sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Schema pour une propriété immobilière
export const RealEstateListingSchema: React.FC<RealEstateListingSchemaProps> = ({
  name,
  description,
  url,
  image,
  price,
  priceCurrency,
  address,
  numberOfRooms,
  floorSize,
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "url": url,
    "image": image,
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": priceCurrency,
      "availability": "https://schema.org/InStock",
      "url": url,
    },
    "address": {
      "@type": "PostalAddress",
      ...address,
    },
    ...(numberOfRooms && { "numberOfRooms": numberOfRooms }),
    ...(floorSize && {
      "floorSize": {
        "@type": "QuantitativeValue",
        ...floorSize,
      }
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Schema pour le fil d'Ariane (breadcrumb)
export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Schema pour les avis/notes
interface AggregateRatingSchemaProps {
  itemName: string;
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

export const AggregateRatingSchema: React.FC<AggregateRatingSchemaProps> = ({
  itemName,
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1,
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": itemName,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount,
      "bestRating": bestRating,
      "worstRating": worstRating,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
