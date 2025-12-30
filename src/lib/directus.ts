const stripSlashes = (value: string) => value.replace(/\/+$/, "");

export const getDirectusBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_DIRECTUS_URL?.trim() ?? "";
  return url ? stripSlashes(url) : "";
};

export const getDirectusToken = (): string => {
  return process.env.NEXT_PUBLIC_DIRECTUS_TOKEN?.trim() ?? "";
};

export const buildDirectusUrl = (path: string): string => {
  const base = getDirectusBaseUrl();
  if (!base) return "";

  const normalizedPath = path.replace(/^\/+/, "");
  return `${base}/${normalizedPath}`;
};

export const buildDirectusAssetUrl = (fileId: string | null | undefined, width: number = 1200, height: number = 800): string => {
  if (!fileId) return "";
  
  // Si l'URL contient déjà cloudinary ou est une URL complète, retourner telle quelle
  if (typeof fileId === 'string' && (fileId.includes('cloudinary.com') || fileId.startsWith('http'))) {
    return fileId;
  }
  
  // Sinon, construire l'URL Directus normale
  const base = typeof window !== 'undefined' 
    ? 'https://lc-directus-backend-production.up.railway.app'
    : getDirectusBaseUrl();
    
  if (!base) return "";

  return `${base}/assets/${fileId}?fit=cover&width=${width}&height=${height}`;
};
