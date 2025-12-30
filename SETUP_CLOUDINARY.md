# Configuration Cloudinary - Guide Complet

## 🎯 Objectif
Ne PLUS JAMAIS perdre les images quand Railway shutdown

## ⏱️ Temps estimé : 10 minutes

---

## Étape 1 : Créer un compte Cloudinary (3 min)

1. **Aller sur** https://cloudinary.com/users/register_free

2. **S'inscrire** avec :
   - Email professionnel
   - Mot de passe fort
   - Nom de la compagnie : "LC Inmobiliaria"

3. **Vérifier l'email** et se connecter

4. **Aller dans Dashboard** → https://cloudinary.com/console

5. **Noter ces 3 informations** (IMPORTANT) :
   ```
   Cloud Name: ________________
   API Key: ________________
   API Secret: ________________
   ```

---

## Étape 2 : Configurer Railway (5 min)

1. **Se connecter à Railway** → https://railway.app

2. **Ouvrir votre projet** Directus

3. **Aller dans Variables**
   - Cliquer sur votre service Directus
   - Onglet "Variables"

4. **Ajouter ces variables** (une par une) :

   ```env
   STORAGE_LOCATIONS=cloudinary
   ```
   
   ```env
   STORAGE_CLOUDINARY_DRIVER=cloudinary
   ```
   
   ```env
   STORAGE_CLOUDINARY_CLOUD_NAME=votre-cloud-name-ici
   ```
   ☝️ Remplacer par votre Cloud Name de l'étape 1
   
   ```env
   STORAGE_CLOUDINARY_API_KEY=votre-api-key-ici
   ```
   ☝️ Remplacer par votre API Key de l'étape 1
   
   ```env
   STORAGE_CLOUDINARY_API_SECRET=votre-api-secret-ici
   ```
   ☝️ Remplacer par votre API Secret de l'étape 1
   
   ```env
   STORAGE_CLOUDINARY_FOLDER=lc-inmobiliaria
   ```
   
   ```env
   STORAGE_CLOUDINARY_SECURE=true
   ```

5. **Sauvegarder**

---

## Étape 3 : Redémarrer Directus (1 min)

1. Dans Railway, sur votre service Directus
2. Cliquer sur les **3 points** (⋮)
3. **"Restart"**
4. Attendre ~30 secondes que le service redémarre
5. Vérifier que le status est "Active" ✅

---

## Étape 4 : Tester (5 min)

### Test 1 : Upload d'une image

1. **Se connecter à Directus** :
   ```
   https://lc-directus-backend-production.up.railway.app/admin
   ```

2. **Aller dans "File Library"** (icône image dans le menu)

3. **Upload une image de test** :
   - Cliquer "Upload File"
   - Choisir une image
   - Upload

4. **Vérifier l'URL** :
   - Cliquer sur l'image uploadée
   - Copier l'URL
   - Devrait ressembler à : `https://res.cloudinary.com/votre-cloud-name/...`

### Test 2 : Affichage dans une propriété

1. **Aller dans "Propriedades"**

2. **Créer/Éditer une propriété**

3. **Ajouter une image** dans le champ "Images"

4. **Sauvegarder**

5. **Visiter votre site** :
   ```
   http://localhost:3000/listing_06_directus
   ```

6. **Vérifier que l'image s'affiche** ✅

---

## ✅ Vérification Finale

**Pour être sûr que tout fonctionne :**

1. **Éteindre et rallumer Railway** :
   - Stop → Start votre service Directus
   
2. **Vérifier que l'image est toujours là** :
   - Se reconnecter à Directus
   - Vérifier File Library
   - Les images sont toujours là ✅

3. **C'est bon !** Vos images sont maintenant :
   - ✅ Stockées sur Cloudinary (pas Railway)
   - ✅ Accessibles via CDN mondial
   - ✅ JAMAIS effacées même si Railway shutdown
   - ✅ Optimisées automatiquement

---

## 🎨 Bonus : Optimisations Cloudinary

### Transformations automatiques

Les URLs Cloudinary permettent des transformations :

```
# Image originale
https://res.cloudinary.com/demo/image/upload/sample.jpg

# Redimensionner à 800x600
https://res.cloudinary.com/demo/image/upload/w_800,h_600,c_fill/sample.jpg

# Optimiser qualité
https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/sample.jpg
```

Notre fonction `buildDirectusAssetUrl` devra être adaptée pour Cloudinary.

---

## 🔧 Adapter le Code Frontend

Une fois Cloudinary configuré, les URLs changent. Mettre à jour `buildDirectusAssetUrl` :

```typescript
// src/lib/directus.ts
export const buildDirectusAssetUrl = (
  fileId: string | null | undefined, 
  width: number = 1200, 
  height: number = 800
): string => {
  if (!fileId) return "";
  
  // Si l'ID contient déjà cloudinary, c'est une URL complète
  if (fileId.includes('cloudinary.com')) {
    return fileId;
  }
  
  // Sinon, construire l'URL Directus normale
  const base = typeof window !== 'undefined' 
    ? 'https://lc-directus-backend-production.up.railway.app'
    : getDirectusBaseUrl();
    
  if (!base) return "";
  
  return `${base}/assets/${fileId}?fit=cover&width=${width}&height=${height}`;
};
```

---

## 🆘 Dépannage

### Erreur : "Cloudinary credentials not found"

**Solution :**
- Vérifier que TOUTES les variables sont bien définies
- Pas d'espaces dans les valeurs
- Redémarrer Directus

### Les images ne s'uploadent pas

**Solution :**
1. Vérifier les logs Railway
2. S'assurer que l'API Secret est correct
3. Vérifier les permissions du compte Cloudinary

### Les anciennes images ne s'affichent plus

**C'est normal !** Elles étaient sur Railway et ont été effacées.

**Solution :**
- Re-uploader les images
- Elles seront maintenant sur Cloudinary

---

## 📞 Support

- **Cloudinary Support** : https://support.cloudinary.com
- **Directus Docs** : https://docs.directus.io/self-hosted/config-options.html#file-storage

---

## 🎉 Félicitations !

Vos images sont maintenant **100% sécurisées** et ne seront **JAMAIS** perdues, même si :
- ❌ Railway shutdown
- ❌ Le serveur crashe
- ❌ Vous ne payez pas
- ❌ Vous changez d'hébergeur

Les images sont sur **Cloudinary** = **indépendantes** de Railway ! 🎊
