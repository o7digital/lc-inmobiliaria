# DatoCMS setup (ES + EN)

Projet orienté DatoCMS avec fallback Directus si aucun token n'est fourni.

## Locales
- Activer `es` (défaut) et `en` dans Settings → Locales.
- Marquer comme localisés : `title`, `slug`, `description`, `highlights`, `seo` (si présent).

## Modèle Property (API keys suggérées)
- Ce dépôt est mappé sur les clés actuelles vues dans ton admin : `title`, `title_slug` (slug), `adress` (avec un seul “d”), `city`, `state`, `country`, `price`, `bedrooms`, `bathrooms`, `parkingspaces`, `featured`, `description`, `amenities`, `main_image` (Single asset), `gallery` (Asset gallery). Les champs `currency`, `operationType`, `propertyType` ne sont pas requis côté front pour fonctionner, mais peuvent être ajoutés plus tard si besoin.

## Variables d'environnement
- `DATOCMS_API_TOKEN` ou `DATOCMS_READ_ONLY_TOKEN` : token Read-Only.
- `NEXT_PUBLIC_SUPPORTED_LOCALES=es,en`
- `NEXT_PUBLIC_DEFAULT_LOCALE=es`
- `NEXT_PUBLIC_SITE_URL=https://www.lcinmobiliaria.com` (ou l'URL du déploiement)
- Optionnel : `DATOCMS_ENVIRONMENT`, `DATOCMS_ENDPOINT` (par défaut `https://graphql.datocms.com/`).

## API / Front
- `/api/directus/properties` : utilise Dato en priorité (list) et retourne la forme Directus attendue (images transformées en URLs Dato).
  - Paramètres : `locale`, `limit`, `operation_type`, `property_type`, `city`, `featured`, `min_price`, `max_price`.
- `/api/directus/properties?id=XXX` ou `?slug=...` : renvoie un item unique (Dato d'abord, Directus en secours).
- Les composants existants (listing + page de détail) consomment toujours cette route mais peuvent servir des assets Dato (domaine ajouté dans `next.config.js`).
