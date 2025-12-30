# Guide de Débogage - Images Directus

## Problème : Les images ne s'affichent pas

### ✅ Solutions appliquées

1. **Configuration Next.js**
   - Ajout de `remotePatterns` dans `next.config.js` pour autoriser les images de Railway
   - Redémarrage nécessaire après modification

2. **Structure des images dans Directus**
   Les images doivent être stockées dans une relation Many-to-Many :
   - Collection : `propriedades`
   - Champ : `images` (Many-to-Many Files)
   - Relation : `propriedades_files`

### 🔍 Vérifications à faire

#### 1. Vérifier que les images sont uploadées dans Directus
```bash
# Via l'interface Directus
1. Aller dans la collection "propriedades"
2. Ouvrir une propriété
3. Vérifier le champ "images"
4. S'assurer qu'il y a au moins une image associée
```

#### 2. Tester l'URL des assets directement
```
https://lc-directus-backend-production.up.railway.app/assets/{FILE_ID}
```

#### 3. Vérifier la console du navigateur
Ouvrir la console (F12) et chercher :
- Les logs `Property {Title}: { images: ..., Image: ... }`
- Les erreurs 404 ou CORS
- Les erreurs de chargement d'images

### 📝 Structure attendue des données

L'API doit retourner :
```json
{
  "id": 1,
  "Title": "Maison exemple",
  "images": [
    {
      "directus_files_id": {
        "id": "uuid-de-limage",
        "filename_download": "photo.jpg",
        "type": "image/jpeg"
      }
    }
  ]
}
```

### 🛠️ Commandes utiles

#### Redémarrer le serveur de développement
```bash
npm run dev
```

#### Tester la connexion Directus
Visiter : `http://localhost:3000/test-directus`

#### Vérifier les variables d'environnement
```bash
# Créer un fichier .env.local avec :
NEXT_PUBLIC_DIRECTUS_URL=https://lc-directus-backend-production.up.railway.app
NEXT_PUBLIC_DIRECTUS_EMAIL=votre-email
NEXT_PUBLIC_DIRECTUS_PASSWORD=votre-mot-de-passe
```

### 🔧 Configuration Directus requise

#### Dans Directus Admin :

1. **Créer le champ images (si pas encore fait)**
   - Type : `Many-to-Many (M2M)`
   - Related Collection : `directus_files`
   - Junction Collection : `propriedades_files`

2. **Permissions publiques (si nécessaire)**
   - Settings > Roles & Permissions > Public
   - Collection `propriedades` : Read
   - Collection `propriedades_files` : Read
   - Collection `directus_files` : Read

3. **Uploader des images**
   - Ouvrir une propriété
   - Dans le champ "images", cliquer sur "+"
   - Uploader ou sélectionner une image

### 📊 Flux de données

```
Directus API
    ↓
/api/directus/properties (avec fields=*,images.directus_files_id.*)
    ↓
ListingSixAreaDirectus.tsx
    ↓
getDirectusImageUrl() → buildDirectusAssetUrl()
    ↓
<img src="https://lc-directus-backend-production.up.railway.app/assets/{id}" />
```

### ❗ Points importants

1. **Redémarrer après modification de `next.config.js`**
2. **Les images doivent être publiques ou accessible avec le token**
3. **Le champ peut s'appeler `images` ou `Image` (deux systèmes supportés)**
4. **Les URLs sont générées avec `?fit=cover&width=1200&height=800`**

### 🐛 Debug en cas de problème

Ajouter des logs temporaires dans `ListingSixAreaDirectus.tsx` :

```typescript
console.log('All properties:', properties);
console.log('First property images:', properties[0]?.images);
console.log('Generated URL:', getDirectusImageUrl(properties[0]));
```

### 📸 Image par défaut

Si aucune image n'est trouvée, le système utilise :
```
/assets/images/listing/img_large_07.jpg
```
