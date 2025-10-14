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

export const buildDirectusAssetUrl = (fileId: string | null | undefined): string => {
  // Côté client, utiliser directement l'URL hardcodée
  const base = typeof window !== 'undefined' 
    ? 'https://lc-directus-backend-production.up.railway.app'
    : getDirectusBaseUrl();
    
  if (!base || !fileId) return "";

  return `${base}/assets/${fileId}`;
};
