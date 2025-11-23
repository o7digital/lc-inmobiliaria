// Exemple d'utilisation dans une page de détails de propriété

import { RealEstateListingSchema, BreadcrumbSchema } from '@/components/common/JsonLdSchema';
import useImageAlt from '@/hooks/useImageAlt';

export default function PropertyDetailsExample() {
  const { generateAlt, generateGalleryAlts, generateTitle } = useImageAlt();

  // Données exemple d'une propriété
  const property = {
    id: 1,
    title: 'Casa moderna en Polanco',
    description: 'Hermosa casa moderna de 3 recámaras con acabados de lujo',
    price: 8500000,
    location: 'Polanco, Ciudad de México',
    propertyType: 'Casa',
    bedrooms: 3,
    bathrooms: 2.5,
    area: 250,
    images: [
      '/images/properties/property-1-main.jpg',
      '/images/properties/property-1-living.jpg',
      '/images/properties/property-1-kitchen.jpg',
      '/images/properties/property-1-bedroom.jpg',
    ],
  };

  // Générer les alt texts pour toutes les images
  const imageAlts = generateGalleryAlts(
    {
      title: property.title,
      location: property.location,
      propertyType: property.propertyType,
      price: property.price,
      bedrooms: property.bedrooms,
    },
    property.images.length
  );

  return (
    <>
      {/* Schema.org JSON-LD pour cette propriété */}
      <RealEstateListingSchema
        name={property.title}
        description={property.description}
        url={`https://www.lcinmobiliaria.com/property-directus/${property.id}`}
        image={property.images.map(img => `https://www.lcinmobiliaria.com${img}`)}
        price={property.price}
        priceCurrency="MXN"
        address={{
          streetAddress: 'Dirección exacta',
          addressLocality: 'Ciudad de México',
          addressRegion: 'CDMX',
          postalCode: '11560',
          addressCountry: 'MX',
        }}
        numberOfRooms={property.bedrooms}
        floorSize={{
          value: property.area,
          unitCode: 'MTK', // m²
        }}
      />

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: 'https://www.lcinmobiliaria.com' },
          { name: 'Propiedades', url: 'https://www.lcinmobiliaria.com/listing_01' },
          { name: property.title, url: `https://www.lcinmobiliaria.com/property-directus/${property.id}` },
        ]}
      />

      <div className="property-details">
        <h1>{property.title}</h1>

        {/* Image principale avec alt text optimisé */}
        <img
          src={property.images[0]}
          alt={imageAlts[0]}
          title={generateTitle({ propertyData: { title: property.title } })}
          className="main-image"
        />

        {/* Galerie d'images avec alt texts */}
        <div className="image-gallery">
          {property.images.slice(1).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={imageAlts[index + 1]}
              title={generateTitle({ propertyData: { title: property.title } })}
              className="gallery-image"
            />
          ))}
        </div>

        {/* Reste du contenu... */}
      </div>
    </>
  );
}
