# 🛠️ Commandes Utiles - SEO

## 🚀 Développement

### Lancer le serveur de développement
```bash
npm run dev
```
Puis visitez :
- **Site** : http://localhost:3000
- **Test SEO** : http://localhost:3000/test-seo
- **Sitemap** : http://localhost:3000/sitemap.xml
- **Robots** : http://localhost:3000/robots.txt

### Build de production
```bash
npm run build
```

### Tester le build de production localement
```bash
npm run build
npm run start
```

---

## 🔍 Vérification SEO

### 1. Vérifier le sitemap localement
```bash
curl http://localhost:3000/sitemap.xml
```

### 2. Vérifier robots.txt localement
```bash
curl http://localhost:3000/robots.txt
```

### 3. Vérifier les JSON-LD dans le code source
```bash
# Ouvrir le navigateur et :
# Clic droit → Afficher le code source
# Chercher : <script type="application/ld+json">
```

---

## 🧪 Tests SEO en ligne

### Google Rich Results Test
```
https://search.google.com/test/rich-results
```
- Collez l'URL de votre page de propriété
- Vérifiez que Google détecte les données structurées

### Schema.org Validator
```
https://validator.schema.org/
```
- Collez votre JSON-LD
- Vérifiez qu'il est valide

### PageSpeed Insights
```
https://pagespeed.web.dev/
```
- Testez la vitesse de votre site
- Obtenez des recommandations SEO

---

## 📊 Google Search Console

### Soumettre le sitemap
```
1. Aller sur : https://search.google.com/search-console
2. Sélectionner votre propriété
3. Menu : Sitemaps
4. Ajouter : https://votresite.com/sitemap.xml
5. Cliquer sur "Soumettre"
```

### Vérifier l'indexation
```
1. Search Console → Couverture
2. Voir les pages indexées/non indexées
3. Corriger les erreurs éventuelles
```

### Demander une indexation manuelle
```
1. Search Console → Inspection d'URL
2. Entrer l'URL à indexer
3. Cliquer sur "Demander une indexation"
```

---

## 🔧 Snippets VS Code

Les snippets sont déjà configurés dans `.vscode/seo-snippets.code-snippets`

### Utilisation :
1. Dans un fichier `.tsx` ou `.ts`
2. Tapez un des préfixes :
   - `seo-listing` → Schema.org pour propriété
   - `seo-breadcrumb` → Breadcrumb Schema
   - `seo-image` → Image avec alt text
   - `seo-imports` → Imports SEO
   - `seo-metadata` → Metadata Next.js
3. Appuyez sur `Tab` pour compléter

---

## 📦 Installation

Si vous clonez le projet sur une nouvelle machine :

```bash
# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local

# Mettre à jour la configuration SEO
# Éditez : src/config/seo.config.ts

# Lancer
npm run dev
```

---

## 🔄 Déploiement sur Vercel

### Première fois
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel
```

### Déploiements suivants
```bash
# Preview (test)
vercel

# Production
vercel --prod
```

### Variables d'environnement sur Vercel
```
1. Aller sur vercel.com
2. Sélectionner votre projet
3. Settings → Environment Variables
4. Ajouter vos variables
5. Redéployer
```

---

## 🧹 Maintenance

### Nettoyer le cache Next.js
```bash
rm -rf .next
npm run dev
```

### Nettoyer node_modules
```bash
rm -rf node_modules
npm install
```

### Vérifier les erreurs TypeScript
```bash
npx tsc --noEmit
```

---

## 📝 Mise à jour du sitemap

Le sitemap se met à jour automatiquement à chaque build.

Si vous ajoutez des pages dynamiques (propriétés depuis Directus) :

1. Éditez `src/app/sitemap.ts`
2. Ajoutez la logique pour récupérer les propriétés
3. Rebuild et redéployez

---

## 🐛 Debugging

### Vérifier que les composants SEO sont importés
```bash
# Chercher les imports manquants
grep -r "JsonLdSchema" src/app --include="*.tsx"
grep -r "PropertyImage" src/app --include="*.tsx"
```

### Vérifier la configuration SEO
```bash
# Afficher la config
cat src/config/seo.config.ts | grep "siteUrl"
```

### Logs Next.js
```bash
# Mode verbose
npm run dev -- --debug
```

---

## 📊 Monitoring (après lancement)

### Google Search Console - Hebdomadaire
- Vérifier les nouvelles pages indexées
- Corriger les erreurs de crawl
- Surveiller les rich results

### Google Analytics - Mensuel
- Analyser le trafic organique
- Voir les mots-clés qui performent
- Ajuster la stratégie SEO

---

## 🎯 Checklist avant chaque déploiement

```bash
# 1. Tests
npm run dev
# Visiter /test-seo

# 2. Build
npm run build

# 3. Vérifier les erreurs
npx tsc --noEmit

# 4. Tester le build localement
npm run start

# 5. Déployer
vercel --prod

# 6. Vérifier en production
curl https://votresite.com/sitemap.xml
curl https://votresite.com/robots.txt
```

---

## 🆘 Support

### Documentation
- `QUICK_START_SEO.md` - Démarrage rapide
- `SEO_GUIDE.md` - Guide complet
- `SEO_POUR_CLIENT.md` - Explication pour le client

### Outils
- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org](https://schema.org/)

---

**💡 Astuce** : Sauvegardez ce fichier dans vos favoris pour un accès rapide !
