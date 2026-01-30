import { GraphQLClient } from 'graphql-request';

const DATOCMS_API_TOKEN =
  process.env.DATOCMS_API_TOKEN ||
  process.env.DATOCMS_READ_ONLY_TOKEN ||
  process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN;

const DATOCMS_ENDPOINT = process.env.DATOCMS_ENDPOINT || 'https://graphql.datocms.com/';
const DATOCMS_ENVIRONMENT = process.env.DATOCMS_ENVIRONMENT;

const SUPPORTED_LOCALES = (process.env.NEXT_PUBLIC_SUPPORTED_LOCALES || 'es,en')
  .split(',')
  .map((locale) => locale.trim().toLowerCase())
  .filter(Boolean);

const DEFAULT_LOCALE = (process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'es').trim().toLowerCase();

export const isDatoConfigured = (): boolean => Boolean(DATOCMS_API_TOKEN);

export const getDatoClient = (): GraphQLClient => {
  if (!DATOCMS_API_TOKEN) {
    throw new Error('DatoCMS API token is missing. Set DATOCMS_API_TOKEN or DATOCMS_READ_ONLY_TOKEN.');
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${DATOCMS_API_TOKEN}`,
  };

  if (DATOCMS_ENVIRONMENT) {
    headers['X-Environment'] = DATOCMS_ENVIRONMENT;
  }

  return new GraphQLClient(DATOCMS_ENDPOINT, { headers });
};

export const resolveLocale = (requested?: string): string => {
  const normalized = (requested || '').trim().toLowerCase();
  if (normalized && SUPPORTED_LOCALES.includes(normalized)) return normalized;
  return SUPPORTED_LOCALES.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : SUPPORTED_LOCALES[0] || 'es';
};

export const getFallbackLocales = (primary?: string): string[] => {
  const active = resolveLocale(primary);
  return SUPPORTED_LOCALES.filter((locale) => locale !== active);
};

export interface DatoAsset {
  url: string;
  alt?: string | null;
}

export interface DatoProperty {
  id: string;
  title: string;
  title_slug?: string | null; // Dato slug field (user naming)
  titleSlug?: string | null; // camelCase variant
  slug?: string | null; // fallback if renamed later
  adress?: string | null; // note: field name in Dato UI
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  price?: number | null;
  currency?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  parkingspaces?: number | null;
  parkingSpaces?: number | null; // fallback if renamed later
  operation?: any; // modular field in current schema
  operationType?: string[] | null; // fallback if renamed later
  propertyType?: string[] | null;
  featured?: boolean | null;
  description?: string | null;
  amenities?: string | string[] | null;
  main_image?: DatoAsset | null;
  mainImage?: DatoAsset | null; // fallback if renamed later
  gallery?: DatoAsset[] | null;
}
