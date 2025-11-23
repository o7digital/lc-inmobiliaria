# Guide d'Implémentation SEO - LC Inmobiliaria

Ce guide explique comment utiliser les outils SEO mis en place sur le site.

## 📋 Table des matières

1. [Schema.org JSON-LD](#schemaorg-json-ld)
2. [Alt Text pour les images](#alt-text-pour-les-images)
3. [Sitemap XML](#sitemap-xml)
4. [Robots.txt](#robotstxt)

---

## 1. Schema.org JSON-LD

### Qu'est-ce que c'est ?

Les données structurées JSON-LD aident Google à comprendre votre contenu et afficher des "rich snippets" (extraits enrichis) dans les résultats de recherche.

### Composants disponibles

#### OrganizationSchema
Utilisé dans `layout.tsx` pour décrire votre agence immobilière.

```tsx
<OrganizationSchema
  name="LC Inmobiliaria"
  url="https://www.lcinmobiliaria.com"
  logo="https://www.lcinmobiliaria.com/images/logo.png"
  description="Description de votre agence"
  address={{
    streetAddress: "Votre adresse",
    addressLocality: "Ville",
    addressRegion: "État",
    postalCode: "Code postal",
    addressCountry: "MX"
  }}
  contactPoint={{
    telephone: "+52-XXX-XXX-XXXX",
    contactType: "customer service",
    email: "contact@lcinmobiliaria.com"
  }}
  sameAs={[
    "https://www.facebook.com/lcinmobiliaria",
    "https://www.instagram.com/lcinmobiliaria"
  ]}
/>
```

#### RealEstateListingSchema
À utiliser sur les pages de détails de propriétés.

```tsx
<RealEstateListingSchema
  name="Titre de la propriété"
  description="Description complète"
  url="https://www.lcinmobiliaria.com/property-directus/123"
  image={[
    "https://www.lcinmobiliaria.com/image1.jpg",
    "https://www.lcinmobiliaria.com/image2.jpg"
  ]}
  price={8500000}
  priceCurrency="MXN"
  address={{
    streetAddress: "Rue exacte",
    addressLocality: "Ville",
    addressRegion: "État",
    postalCode: "Code postal",
    addressCountry: "MX"
  }}
  numberOfRooms={3}
  floorSize={{
    value: 250,
    unitCode: "MTK" // m²
  }}
/>
```

#### BreadcrumbSchema
Pour le fil d'Ariane (navigation).

```tsx
<BreadcrumbSchema
  items={[
    { name: 'Inicio', url: 'https://www.lcinmobiliaria.com' },
    { name: 'Propiedades', url: 'https://www.lcinmobiliaria.com/listing_01' },
    { name: 'Casa en Polanco', url: 'https://www.lcinmobiliaria.com/property/123' }
  ]}
/>
```

---

## 2. Alt Text pour les images

### Hook useImageAlt

Ce hook génère automatiquement des alt texts SEO-friendly pour vos images.

### Utilisation de base

```tsx
import useImageAlt from '@/hooks/useImageAlt';

function PropertyCard({ property }) {
  const { generateAlt, generateTitle } = useImageAlt();

  const altText = generateAlt({
    propertyData: {
      title: property.title,
      location: property.location,
      propertyType: property.propertyType,
      price: property.price,
      bedrooms: property.bedrooms,
    },
    imageType: 'main'
  });

  return (
    <img
      src={property.image}
      alt={altText}
      title={generateTitle({ propertyData: { title: property.title } })}
    />
  );
}
```

### Pour une galerie d'images

```tsx
const { generateGalleryAlts } = useImageAlt();

const imageAlts = generateGalleryAlts(
  {
    title: 'Casa en Polanco',
    location: 'Polanco, CDMX',
    propertyType: 'Casa',
    bedrooms: 3,
    price: 8500000,
  },
  5 // nombre d'images
);

// Résultat:
// ["Casa 3 recámaras en Polanco, CDMX - $8,500,000 MXN", 
//  "Casa 3 recámaras en Polanco, CDMX - Foto 2", ...]
```

### Types d'images supportés

- `main` : Image principale
- `gallery` : Images de galerie
- `thumbnail` : Miniatures
- `agent` : Photos d'agents
- `logo` : Logo de l'agence

---

## 3. Sitemap XML

### Fichier : `src/app/sitemap.ts`

Le sitemap est généré automatiquement par Next.js.

### Accès

Une fois déployé, accessible à : `https://www.lcinmobiliaria.com/sitemap.xml`

### Ajouter des URLs dynamiques

Pour ajouter vos propriétés depuis Directus :

```typescript
// Dans src/app/sitemap.ts

import { getProperties } from '@/services/directusService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.lcinmobiliaria.com';
  
  // Récupérer les propriétés depuis Directus
  const properties = await getProperties();
  
  const propertyPages: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${baseUrl}/property-directus/${property.id}`,
    lastModified: new Date(property.date_updated || property.date_created),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...listingPages, ...propertyPages];
}
```

### Priorités recommandées

- Page d'accueil : `1.0`
- Listings de propriétés : `0.9`
- Pages de propriétés : `0.7`
- Pages institutionnelles : `0.8`
- Pages légales : `0.3`

---

## 4. Robots.txt

### Fichier : `src/app/robots.ts`

Indique aux moteurs de recherche quelles pages indexer.

### Accès

Accessible à : `https://www.lcinmobiliaria.com/robots.txt`

### Configuration actuelle

```
User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /api/
Disallow: /private/

Sitemap: https://www.lcinmobiliaria.com/sitemap.xml
```

---

## 📝 Checklist de déploiement

Avant de déployer, vérifiez :

### Dans `src/app/layout.tsx`
- [ ] Mettre à jour le nom de l'organisation
- [ ] Ajouter l'adresse réelle
- [ ] Ajouter le téléphone et email
- [ ] Ajouter les URLs des réseaux sociaux

### Dans `src/app/sitemap.ts`
- [ ] Remplacer `baseUrl` par votre domaine réel
- [ ] Ajouter la récupération dynamique des propriétés depuis Directus

### Dans `src/app/robots.ts`
- [ ] Remplacer `baseUrl` par votre domaine réel

### Après déploiement
- [ ] Vérifier `/sitemap.xml`
- [ ] Vérifier `/robots.txt`
- [ ] Soumettre le sitemap à Google Search Console
- [ ] Tester les données structurées avec [Rich Results Test](https://search.google.com/test/rich-results)

---

## 🔍 Outils de validation

### Google Rich Results Test
- URL : https://search.google.com/test/rich-results
- Coller l'URL de votre page pour voir si Google peut lire les données structurées

### Schema.org Validator
- URL : https://validator.schema.org/
- Valider votre JSON-LD

### Google Search Console
- Soumettre votre sitemap
- Voir l'indexation de vos pages
- Analyser les erreurs d'exploration

---

## 💡 Conseils SEO supplémentaires

### Pour les images
- Utiliser des formats modernes (WebP)
- Compresser les images (max 200KB par image)
- Utiliser des noms de fichiers descriptifs : `casa-polanco-exterior.jpg` au lieu de `IMG_1234.jpg`

### Pour les métadonnées
- Title : 50-60 caractères
- Description : 150-160 caractères
- Inclure des mots-clés pertinents mais naturels

### Pour le contenu
- Utiliser des balises H1, H2, H3 de manière hiérarchique
- Écrire des descriptions uniques pour chaque propriété
- Ajouter du contenu textuel (pas seulement des images)

---

## 📞 Support

Pour toute question sur l'implémentation SEO, consultez :
- [Documentation Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
