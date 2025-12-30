#!/bin/bash

# Script de vérification de la configuration Cloudinary
# Usage: ./verify-cloudinary.sh

echo "🔍 Vérification de la configuration Cloudinary pour Directus"
echo "============================================================="
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

DIRECTUS_URL="https://lc-directus-backend-production.up.railway.app"

echo "📡 Test de connexion à Directus..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$DIRECTUS_URL/server/health")

if [ "$STATUS" -eq 200 ]; then
    echo -e "${GREEN}✓${NC} Directus est accessible"
else
    echo -e "${RED}✗${NC} Directus n'est pas accessible (HTTP $STATUS)"
    echo -e "${YELLOW}⚠${NC}  Vérifiez que le serveur Railway est démarré"
    exit 1
fi

echo ""
echo "📸 Test d'upload d'image..."
echo -e "${YELLOW}ℹ${NC}  Cette étape nécessite d'être connecté à Directus"
echo ""
echo "Pour vérifier la configuration Cloudinary :"
echo "1. Connectez-vous à Directus : $DIRECTUS_URL/admin"
echo "2. Allez dans 'File Library'"
echo "3. Uploadez une image"
echo "4. Vérifiez que l'URL contient 'cloudinary.com'"
echo ""
echo "Exemple d'URL Cloudinary :"
echo "  https://res.cloudinary.com/votre-cloud-name/image/upload/..."
echo ""
echo "Si l'URL est :"
echo -e "  ${GREEN}✓${NC} https://res.cloudinary.com/... → Configuration OK !"
echo -e "  ${RED}✗${NC} https://lc-directus-backend...  → Images sur Railway (seront perdues au shutdown)"
echo ""

echo "============================================================="
echo ""
echo "📚 Documentation :"
echo "  - Guide complet : SETUP_CLOUDINARY.md"
echo "  - Solutions : SOLUTION_STOCKAGE_IMAGES.md"
echo ""
