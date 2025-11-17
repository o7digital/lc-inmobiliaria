/**
 * Tests basiques pour vérifier que les composants SEO fonctionnent
 * Lancez ce fichier avec : npm run dev
 * Puis visitez : http://localhost:3000/test-seo
 */

import { RealEstateListingSchema, BreadcrumbSchema, OrganizationSchema } from '@/components/common/JsonLdSchema';
import PropertyImage from '@/components/common/PropertyImage';
import useImageAlt from '@/hooks/useImageAlt';
import SEO_CONFIG, { generatePageTitle, generatePropertyDescription } from '@/config/seo.config';

export default function SEOTestPage() {
  const { generateAlt, generateGalleryAlts } = useImageAlt();

  // Données de test
  const testProperty = {
    id: 1,
    title: 'Casa moderna en Polanco',
    description: 'Hermosa casa de 3 recámaras con acabados de lujo',
    type: 'Casa',
    bedrooms: 3,
    bathrooms: 2,
    area: 250,
    location: 'Polanco, Ciudad de México',
    price: 8500000,
    address: 'Av. Presidente Masaryk 123',
    city: 'Ciudad de México',
    state: 'CDMX',
    zipCode: '11560',
    images: [
      '/images/listing/img_43.jpg',
      '/images/listing/img_44.jpg',
      '/images/listing/img_45.jpg',
    ],
  };

  // Tests
  const altText = generateAlt({
    propertyData: {
      title: testProperty.title,
      location: testProperty.location,
      propertyType: testProperty.type,
      price: testProperty.price,
      bedrooms: testProperty.bedrooms,
    },
    imageType: 'main',
  });

  const galleryAlts = generateGalleryAlts({
    title: testProperty.title,
    location: testProperty.location,
    propertyType: testProperty.type,
    bedrooms: testProperty.bedrooms,
  }, 3);

  const propertyDesc = generatePropertyDescription({
    type: testProperty.type,
    bedrooms: testProperty.bedrooms,
    bathrooms: testProperty.bathrooms,
    area: testProperty.area,
    location: testProperty.location,
    price: testProperty.price,
  });

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Schemas invisibles mais vérifiables dans le code source */}
      <RealEstateListingSchema
        name={testProperty.title}
        description={testProperty.description}
        url={`${SEO_CONFIG.siteUrl}/test-seo`}
        image={testProperty.images.map(img => `${SEO_CONFIG.siteUrl}${img}`)}
        price={testProperty.price}
        priceCurrency="MXN"
        address={{
          streetAddress: testProperty.address,
          addressLocality: testProperty.city,
          addressRegion: testProperty.state,
          postalCode: testProperty.zipCode,
          addressCountry: 'MX',
        }}
        numberOfRooms={testProperty.bedrooms}
        floorSize={{ value: testProperty.area, unitCode: 'MTK' }}
      />

      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: SEO_CONFIG.siteUrl },
          { name: 'Propiedades', url: `${SEO_CONFIG.siteUrl}/listing_01` },
          { name: testProperty.title, url: `${SEO_CONFIG.siteUrl}/test-seo` },
        ]}
      />

      <h1 style={{ color: '#2c3e50', marginBottom: '30px' }}>
        🧪 Test de la Configuration SEO
      </h1>

      {/* Section 1: Configuration */}
      <section style={{ marginBottom: '40px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h2 style={{ color: '#34495e' }}>✅ 1. Configuration (SEO_CONFIG)</h2>
        <div style={{ marginTop: '15px' }}>
          <p><strong>Site Name:</strong> {SEO_CONFIG.siteName}</p>
          <p><strong>Site URL:</strong> {SEO_CONFIG.siteUrl}</p>
          <p><strong>Organization:</strong> {SEO_CONFIG.organization.name}</p>
          <p><strong>Email:</strong> {SEO_CONFIG.organization.contact.email}</p>
          <p><strong>Phone:</strong> {SEO_CONFIG.organization.contact.telephone}</p>
        </div>
        <div style={{ marginTop: '10px', padding: '10px', background: SEO_CONFIG.siteUrl.includes('lcinmobiliaria.com') ? '#fff3cd' : '#d4edda', borderRadius: '4px' }}>
          {SEO_CONFIG.siteUrl.includes('lcinmobiliaria.com') ? (
            <p>⚠️ <strong>Action requise:</strong> Mettez à jour l'URL dans <code>src/config/seo.config.ts</code></p>
          ) : (
            <p>✅ Configuration mise à jour</p>
          )}
        </div>
      </section>

      {/* Section 2: Alt Texts */}
      <section style={{ marginBottom: '40px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h2 style={{ color: '#34495e' }}>✅ 2. Alt Texts Automatiques</h2>
        <div style={{ marginTop: '15px' }}>
          <p><strong>Image principale:</strong></p>
          <pre style={{ background: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
            {altText}
          </pre>
          
          <p style={{ marginTop: '15px' }}><strong>Galerie (3 images):</strong></p>
          <pre style={{ background: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(galleryAlts, null, 2)}
          </pre>

          <p style={{ marginTop: '15px' }}><strong>Description générée:</strong></p>
          <pre style={{ background: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
            {propertyDesc}
          </pre>
        </div>
      </section>

      {/* Section 3: PropertyImage Component */}
      <section style={{ marginBottom: '40px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h2 style={{ color: '#34495e' }}>✅ 3. Composant PropertyImage</h2>
        <p>Image avec alt text automatique (inspectez le code HTML pour voir l'attribut alt):</p>
        <div style={{ marginTop: '15px' }}>
          <PropertyImage
            src={testProperty.images[0]}
            propertyData={{
              title: testProperty.title,
              location: testProperty.location,
              propertyType: testProperty.type,
              price: testProperty.price,
              bedrooms: testProperty.bedrooms,
            }}
            imageType="main"
            className="test-property-image"
            loading="eager"
          />
        </div>
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#6c757d' }}>
          💡 Faites un clic droit → Inspecter pour voir l'attribut <code>alt</code>
        </p>
      </section>

      {/* Section 4: Schema.org JSON-LD */}
      <section style={{ marginBottom: '40px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h2 style={{ color: '#34495e' }}>✅ 4. Schema.org JSON-LD</h2>
        <p>Les schemas sont invisibles mais présents dans le code source.</p>
        <div style={{ marginTop: '15px', padding: '15px', background: '#e7f3ff', borderRadius: '4px' }}>
          <p><strong>Pour vérifier:</strong></p>
          <ol>
            <li>Clic droit → Afficher le code source de la page</li>
            <li>Chercher <code>&lt;script type="application/ld+json"&gt;</code></li>
            <li>Ou utilisez l'extension Chrome "SEO Meta in 1 Click"</li>
          </ol>
        </div>
        <div style={{ marginTop: '15px', padding: '15px', background: '#fff3cd', borderRadius: '4px' }}>
          <p><strong>Pour tester en production:</strong></p>
          <p>🔗 <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer">
            Google Rich Results Test
          </a></p>
        </div>
      </section>

      {/* Section 5: Sitemap & Robots */}
      <section style={{ marginBottom: '40px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h2 style={{ color: '#34495e' }}>✅ 5. Sitemap & Robots.txt</h2>
        <div style={{ marginTop: '15px' }}>
          <p>
            <a href="/sitemap.xml" target="_blank" style={{ color: '#007bff', textDecoration: 'none' }}>
              📄 Voir le sitemap.xml
            </a>
          </p>
          <p>
            <a href="/robots.txt" target="_blank" style={{ color: '#007bff', textDecoration: 'none' }}>
              🤖 Voir le robots.txt
            </a>
          </p>
        </div>
      </section>

      {/* Section 6: Next Steps */}
      <section style={{ padding: '20px', background: '#d4edda', borderRadius: '8px' }}>
        <h2 style={{ color: '#155724' }}>🚀 Prochaines étapes</h2>
        <ol style={{ marginTop: '15px' }}>
          <li>Mettez à jour <code>src/config/seo.config.ts</code> avec vos vraies informations</li>
          <li>Ajoutez les composants SEO dans vos pages de propriétés</li>
          <li>Remplacez les <code>&lt;img&gt;</code> par <code>&lt;PropertyImage&gt;</code></li>
          <li>Testez avec <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer">Google Rich Results Test</a></li>
          <li>Déployez et soumettez le sitemap à Google Search Console</li>
        </ol>
      </section>

      <div style={{ marginTop: '40px', padding: '20px', background: '#f1f3f5', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ margin: 0, color: '#495057' }}>
          📚 Consultez <strong>QUICK_START_SEO.md</strong> pour le guide de démarrage rapide
        </p>
      </div>
    </div>
  );
}
