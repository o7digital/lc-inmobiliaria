# 🚀 Quick Start - Démarrage Rapide SEO

## ⚡ 3 étapes pour commencer

### 1️⃣ Mettre à jour la configuration (5 minutes)

Éditez **`src/config/seo.config.ts`** :

```typescript
export const SEO_CONFIG = {
  siteName: 'LC Inmobiliaria',
  siteUrl: 'https://www.votredomaine.com', // ⚠️ CHANGEZ CECI
  
  organization: {
    name: 'LC Inmobiliaria',
    
    // ⚠️ Mettez votre vraie adresse
    address: {
      streetAddress: 'Votre rue et numéro',
      addressLocality: 'Votre ville',
      addressRegion: 'Votre état',
      postalCode: 'Votre code postal',
      addressCountry: 'MX',
    },
    
    // ⚠️ Mettez vos vrais contacts
    contact: {
      telephone: '+52-XX-XXXX-XXXX',
      email: 'contact@votredomaine.com',
    },
    
    // ⚠️ Ajoutez vos réseaux sociaux (ou laissez vide '')
    socialMedia: {
      facebook: 'https://www.facebook.com/votrepage',
      instagram: 'https://www.instagram.com/votrepage',
      twitter: '',
      linkedin: '',
    },
  },
};
```

### 2️⃣ Utiliser dans vos pages de propriétés

Dans vos pages de détails (ex: `src/app/property-directus/[id]/page.tsx`) :

```tsx
import { RealEstateListingSchema } from '@/components/common/JsonLdSchema';
import PropertyImage from '@/components/common/PropertyImage';
import SEO_CONFIG from '@/config/seo.config';

export default function PropertyDetail({ property }) {
  return (
    <>
      {/* Ajoutez le Schema.org */}
      <RealEstateListingSchema
        name={property.title}
        description={property.description}
        url={`${SEO_CONFIG.siteUrl}/property-directus/${property.id}`}
        image={property.images.map(img => `${SEO_CONFIG.siteUrl}${img}`)}
        price={property.price}
        priceCurrency="MXN"
        address={{
          streetAddress: property.address,
          addressLocality: property.city,
          addressRegion: property.state,
          postalCode: property.zipCode,
          addressCountry: 'MX',
        }}
        numberOfRooms={property.bedrooms}
        floorSize={{ value: property.area, unitCode: 'MTK' }}
      />

      {/* Utilisez PropertyImage pour les images avec alt text automatique */}
      <PropertyImage
        src={property.mainImage}
        propertyData={{
          title: property.title,
          location: property.location,
          propertyType: property.type,
          price: property.price,
          bedrooms: property.bedrooms,
        }}
        imageType="main"
        className="property-image"
      />

      {/* Votre contenu existant */}
    </>
  );
}
```

### 3️⃣ Tester et déployer

```bash
# Test local
npm run dev
# Visitez :
# http://localhost:3000/sitemap.xml
# http://localhost:3000/robots.txt

# Build de production
npm run build
npm run start

# Déployez sur Vercel/votre hébergeur
```

---

## ✅ Checklist de validation

Après déploiement :

- [ ] `https://votresite.com/sitemap.xml` est accessible
- [ ] `https://votresite.com/robots.txt` est accessible
- [ ] Testez une page de propriété sur [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Soumettez le sitemap à [Google Search Console](https://search.google.com/search-console)
- [ ] Vérifiez que les images ont des alt texts dans le code source

---

## 📚 Documentation complète

- **Guide complet** : `SEO_GUIDE.md`
- **Détails d'implémentation** : `SEO_IMPLEMENTATION.md`
- **Exemple de code** : `EXAMPLE_SEO_USAGE.tsx`

---

## 🎯 Résultats attendus (dans 2-4 semaines)

- ✅ Rich snippets dans Google (prix, localisation)
- ✅ Meilleure indexation des images
- ✅ Plus de pages indexées
- ✅ Meilleure position dans les résultats de recherche

Bon SEO ! 🚀
