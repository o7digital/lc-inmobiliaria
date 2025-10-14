# Configuration pour le déploiement Vercel

## Variables d'environnement requises

Pour que l'application fonctionne correctement sur Vercel, vous devez configurer la variable d'environnement suivante dans les paramètres Vercel :

### Variables d'environnement Vercel

1. **NEXT_PUBLIC_DIRECTUS_URL**
   - Valeur: `https://lc-directus-backend-production.up.railway.app`
   - Type: Environment Variable
   - Environnements: Production, Preview, Development

### Comment configurer sur Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Sélectionner votre projet
3. Aller dans Settings → Environment Variables
4. Ajouter la variable:
   - Name: `NEXT_PUBLIC_DIRECTUS_URL`
   - Value: `https://lc-directus-backend-production.up.railway.app`
   - Environments: Cocher Production, Preview, Development

### Redéployer

Après avoir ajouté les variables d'environnement, vous devez redéployer l'application :

1. Aller dans l'onglet "Deployments"
2. Cliquer sur les trois points (...) du dernier déploiement
3. Sélectionner "Redeploy"
4. Ou faire un nouveau push sur votre repository

### Test de la configuration

Une fois déployé, vous pouvez tester la configuration avec ces URLs :

- **Page de test**: `https://votre-app.vercel.app/test-directus`
- **API de test**: `https://votre-app.vercel.app/api/test-directus`

### Vérification locale

Pour tester en local, assurez-vous d'avoir le fichier `.env.local` avec :

```
NEXT_PUBLIC_DIRECTUS_URL=https://lc-directus-backend-production.up.railway.app
```

### Commandes utiles

```bash
# Démarrer en local
npm run dev

# Construire l'application
npm run build

# Tester la version de production localement
npm start
```

### Résolution des problèmes

1. **"Directus no está configurado"** → Vérifier les variables d'environnement Vercel
2. **Erreurs CORS** → S'assurer que votre domaine Vercel est autorisé dans Directus
3. **Données non chargées** → Vérifier les logs Vercel et la console navigateur

## Structure des données Directus

L'application s'attend à une collection `propriedades` avec au minimum ces champs :
- `id` (integer)
- `Title` (string)
- `Description` (text, optionnel)
- `Price` (decimal, optionnel)
- Autres champs selon vos besoins