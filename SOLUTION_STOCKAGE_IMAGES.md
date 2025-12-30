# Solution : Stockage Persistant des Images

## ❌ Problème Actuel

Quand Railway shutdown ou redémarre :
- **Toutes les images uploadées sont PERDUES** 
- Le filesystem du container est éphémère (non-persistant)
- Chaque redémarrage = filesystem vierge

## ✅ Solutions Recommandées

### **Option 1 : Cloudinary (RECOMMANDÉ) ⭐**

**Avantages :**
- ✅ Gratuit jusqu'à 25 GB et 25,000 transformations/mois
- ✅ CDN mondial intégré (images rapides)
- ✅ Transformations d'images automatiques
- ✅ Backup automatique
- ✅ Compatible avec Directus
- ✅ Pas de dépendance à Railway

**Setup :**

1. **Créer un compte Cloudinary**
   - Aller sur https://cloudinary.com
   - S'inscrire (plan gratuit)
   - Noter : Cloud Name, API Key, API Secret

2. **Configurer Directus pour Cloudinary**
   
   Dans Railway, ajouter ces variables d'environnement :
   
   ```env
   # Cloudinary Storage
   STORAGE_LOCATIONS=cloudinary
   STORAGE_CLOUDINARY_DRIVER=cloudinary
   STORAGE_CLOUDINARY_CLOUD_NAME=votre-cloud-name
   STORAGE_CLOUDINARY_API_KEY=votre-api-key
   STORAGE_CLOUDINARY_API_SECRET=votre-api-secret
   STORAGE_CLOUDINARY_FOLDER=lc-inmobiliaria
   ```

3. **Redémarrer Directus**
   - Les nouvelles images seront uploadées sur Cloudinary
   - Plus jamais de perte de données !

---

### **Option 2 : AWS S3 / DigitalOcean Spaces**

**Avantages :**
- ✅ Très fiable
- ✅ Pas cher (~$5/mois pour 250GB)
- ✅ Compatible Directus

**Setup S3-compatible (DigitalOcean Spaces recommandé) :**

```env
# S3-Compatible Storage
STORAGE_LOCATIONS=s3
STORAGE_S3_DRIVER=s3
STORAGE_S3_KEY=votre-access-key
STORAGE_S3_SECRET=votre-secret-key
STORAGE_S3_BUCKET=lc-inmobiliaria-images
STORAGE_S3_REGION=nyc3
STORAGE_S3_ENDPOINT=https://nyc3.digitaloceanspaces.com
```

---

### **Option 3 : Railway Volumes**

**Avantages :**
- ✅ Intégré à Railway
- ✅ Persistant même après shutdown

**Inconvénients :**
- ❌ Coûte $0.25/GB/mois
- ❌ Pas de CDN
- ❌ Si vous changez de serveur, faut migrer

**Setup :**

1. Dans Railway Dashboard :
   - Aller dans votre service Directus
   - Settings > Volumes
   - Create Volume
   - Mount Path : `/directus/uploads`

2. Variables d'environnement :
   ```env
   STORAGE_LOCATIONS=local
   STORAGE_LOCAL_ROOT=/directus/uploads
   ```

---

### **Option 4 : Supabase Storage (Alternative moderne)**

**Avantages :**
- ✅ Gratuit jusqu'à 1GB
- ✅ CDN intégré
- ✅ API moderne

**Setup :**
- Créer projet Supabase
- Configurer avec le storage adapter Directus-Supabase

---

## 🎯 Recommandation Finale

### **Pour LC Inmobiliaria → Cloudinary**

**Pourquoi ?**
1. **Gratuit** pour vos besoins
2. **CDN mondial** = images rapides partout
3. **Zero maintenance**
4. **Transformations automatiques** (resize, crop, optimize)
5. **Backup inclus**

### Configuration Rapide (10 minutes)

1. **Cloudinary :**
   ```bash
   # S'inscrire sur cloudinary.com
   # Récupérer : Cloud Name, API Key, API Secret
   ```

2. **Railway - Variables d'environnement :**
   ```env
   STORAGE_LOCATIONS=cloudinary
   STORAGE_CLOUDINARY_DRIVER=cloudinary
   STORAGE_CLOUDINARY_CLOUD_NAME=votre-cloud-name
   STORAGE_CLOUDINARY_API_KEY=votre-api-key
   STORAGE_CLOUDINARY_API_SECRET=votre-api-secret
   STORAGE_CLOUDINARY_FOLDER=lc-inmobiliaria
   ```

3. **Redémarrer Directus dans Railway**

4. **C'est tout !** Les images sont maintenant sur Cloudinary

---

## 📦 Migration des Images Existantes

Si vous avez besoin de récupérer d'anciennes images :

### Option A : Backup manuel
1. Télécharger toutes les images depuis Directus avant shutdown
2. Re-uploader après configuration Cloudinary

### Option B : Script de migration
```javascript
// Script pour migrer les images vers Cloudinary
// À exécuter une seule fois
```

---

## 🔧 Installation Cloudinary dans Directus

Les dépendances nécessaires sont normalement déjà dans Directus, mais si besoin :

```bash
# Dans le Dockerfile ou package.json de Directus
npm install @directus/storage-driver-cloudinary
```

---

## ⚠️ IMPORTANT

**À NE PAS FAIRE :**
- ❌ Stocker les images dans le filesystem Railway sans volume
- ❌ Compter sur Railway pour garder les fichiers
- ❌ Ne pas avoir de backup

**À FAIRE :**
- ✅ Utiliser un stockage externe (Cloudinary, S3, etc.)
- ✅ Tester l'upload après configuration
- ✅ Vérifier que les images s'affichent correctement

---

## 📊 Comparaison des Coûts

| Solution | Gratuit | Prix après gratuit |
|----------|---------|-------------------|
| **Cloudinary** | 25 GB | $89/mois (mais vous ne dépasserez jamais le gratuit) |
| **S3** | Non | ~$0.023/GB (~$5/mois pour 250GB) |
| **DigitalOcean Spaces** | Non | $5/mois (250GB inclus) |
| **Railway Volumes** | Non | $0.25/GB/mois |
| **Supabase** | 1 GB | ~$25/mois (50GB) |

---

## 🚀 Prochaines Étapes

1. **Créer compte Cloudinary** (5 min)
2. **Ajouter variables d'env dans Railway** (2 min)
3. **Redémarrer Directus** (1 min)
4. **Tester upload d'une image** (2 min)
5. **Vérifier affichage sur le site** (1 min)

**Total : ~10 minutes pour ne plus JAMAIS perdre vos images !**
