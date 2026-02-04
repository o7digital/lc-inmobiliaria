import { NextApiRequest, NextApiResponse } from 'next';
import { gql } from 'graphql-request';
import {
  DatoProperty,
  getDatoClient,
  getFallbackLocales,
  isDatoConfigured,
  resolveLocale,
} from '@/lib/datocms';

const DATO_PROPERTIES_QUERY = gql`
  query Properties($locale: SiteLocale!, $fallbackLocales: [SiteLocale!], $limit: IntType) {
    allProperties(
      locale: $locale
      fallbackLocales: $fallbackLocales
      first: $limit
      orderBy: _firstPublishedAt_DESC
    ) {
      id
      title
      titleSlug
      adress
      city
      state
      country
      price
      bedrooms
      bathrooms
      parkingspaces
      featured
      description
      amenities
      mainImage {
        url
        alt
      }
      gallery {
        url
        alt
      }
    }
  }
`;

const DATO_PROPERTY_QUERY = gql`
  query Property($locale: SiteLocale!, $fallbackLocales: [SiteLocale!], $id: ItemId, $slug: String) {
    property(
      locale: $locale
      fallbackLocales: $fallbackLocales
      filter: { OR: [{ id: { eq: $id } }, { titleSlug: { eq: $slug } }] }
    ) {
      id
      title
      titleSlug
      adress
      city
      state
      country
      price
      bedrooms
      bathrooms
      parkingspaces
      featured
      description
      amenities
      mainImage {
        url
        alt
      }
      gallery {
        url
        alt
      }
    }
  }
`;

const mapDatoToDirectusShape = (item: DatoProperty) => {
  const images = (item.gallery || []).map((asset) => ({
    directus_files_id: {
      id: asset.url,
      filename_download: asset.alt || '',
      type: 'image',
    },
  }));

  const amenities = Array.isArray(item.amenities)
    ? item.amenities
    : item.amenities
    ? String(item.amenities)
        .split('\n')
        .map((a) => a.trim())
        .filter(Boolean)
    : [];

  return {
    id: Number(item.id) || item.id,
    Title: item.title,
    Slug: item.titleSlug || item.title_slug || item.slug || undefined,
    Address: item.adress || item.address || '',
    City: item.city || '',
    State: item.state || '',
    Country: item.country || '',
    Price: item.price ?? 0,
    Currency: [],
    Bedrooms: item.bedrooms ?? 0,
    Bathrooms: item.bathrooms ?? 0,
    Parking_spaces: item.parkingspaces ?? item.parkingSpaces ?? 0,
    Operation_type: [],
    Property_type: item.propertyType || [],
    Featured: Boolean(item.featured),
    Descripcion: item.description || '',
    Amenidades: amenities,
    Image: item.mainImage?.url,
    images,
  };
};

const applyQueryFilters = (items: any[], query: NextApiRequest['query']) => {
  const { operation_type, property_type, city, min_price, max_price, featured, limit, id, slug } = query;
  let results = [...items];

  if (id) {
    const requestedId = String(id);
    results = results.filter(
      (item) =>
        String(item.id) === requestedId ||
        String(item.Slug || '').toLowerCase() === requestedId.toLowerCase() ||
        String(item.title_slug || '').toLowerCase() === requestedId.toLowerCase()
    );
  }

  if (slug) {
    const requestedSlug = String(slug).toLowerCase();
    results = results.filter(
      (item) =>
        String(item.Slug || '').toLowerCase() === requestedSlug ||
        String(item.title_slug || '').toLowerCase() === requestedSlug
    );
  }

  if (operation_type) {
    const op = String(operation_type).toLowerCase();
    results = results.filter((item) =>
      (item.Operation_type || []).some((value: string) => String(value).toLowerCase() === op)
    );
  }

  if (property_type) {
    const pt = String(property_type).toLowerCase();
    results = results.filter((item) =>
      (item.Property_type || []).some((value: string) => String(value).toLowerCase() === pt)
    );
  }

  if (city) {
    const cityQuery = String(city).toLowerCase();
    results = results.filter((item) => String(item.City || '').toLowerCase().includes(cityQuery));
  }

  const min = min_price ? Number(min_price) : undefined;
  const max = max_price ? Number(max_price) : undefined;
  if (typeof min === 'number' && !Number.isNaN(min)) {
    results = results.filter((item) => Number(item.Price) >= min);
  }
  if (typeof max === 'number' && !Number.isNaN(max)) {
    results = results.filter((item) => Number(item.Price) <= max);
  }

  if (featured === 'true') {
    results = results.filter((item) => Boolean(item.Featured));
  }

  const limitValue = limit ? Number(limit) : undefined;
  if (limitValue && limitValue > 0) {
    results = results.slice(0, limitValue);
  }

  return results;
};

const fetchDatoProperty = async (req: NextApiRequest) => {
  if (!isDatoConfigured()) return null;

  const { id, slug } = req.query;
  if (!id && !slug) return null;

  const locale = resolveLocale((req.query.locale as string) || (req.query.lang as string));
  const fallbackLocales: string[] = []; // éviter les locales non supportées par Dato
  const client = getDatoClient();

  const tryRequest = async (loc: string, fallbacks: string[]) => {
    return client.request<{ property: DatoProperty | null }>(DATO_PROPERTY_QUERY, {
      locale: loc,
      fallbackLocales: fallbacks,
      id,
      slug,
    });
  };

  try {
    const data = await tryRequest(locale, fallbackLocales);
    if (data.property) return mapDatoToDirectusShape(data.property);
  } catch (err) {
    console.error('DatoCMS property fetch failed, retrying with es/default:', err);
    try {
      const data = await tryRequest('es', []);
      if (data.property) return mapDatoToDirectusShape(data.property);
    } catch (err2) {
      console.error('DatoCMS property fallback fetch failed:', err2);
    }
  }

  return null;
};

const fetchFromDato = async (req: NextApiRequest) => {
  if (!isDatoConfigured()) return null;

  const locale = resolveLocale((req.query.locale as string) || (req.query.lang as string));
  const fallbackLocales: string[] = []; // éviter les locales non supportées par Dato
  const limit = req.query.limit ? Number(req.query.limit) : 50;
  const client = getDatoClient();

  const tryRequest = async (loc: string, fallbacks: string[]) => {
    return client.request<{ allProperties: DatoProperty[] }>(DATO_PROPERTIES_QUERY, {
      locale: loc,
      fallbackLocales: fallbacks,
      limit,
    });
  };

  try {
    const data = await tryRequest(locale, fallbackLocales);
    const mapped = (data.allProperties || []).map(mapDatoToDirectusShape);
    return applyQueryFilters(mapped, req.query);
  } catch (err) {
    console.error('DatoCMS fetch failed locale', locale, 'fallback', fallbackLocales, err);
    try {
      const data = await tryRequest('es', []);
      const mapped = (data.allProperties || []).map(mapDatoToDirectusShape);
      return applyQueryFilters(mapped, req.query);
    } catch (err2) {
      console.error('DatoCMS fallback fetch failed:', err2);
      return null;
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!isDatoConfigured()) {
    // Pas de token Dato : retourner une liste vide plutôt qu'une 500 pour ne pas casser le front
    return res.status(200).json([]);
  }

  try {
    const { id, slug } = req.query;

    if (id || slug) {
      const datoProperty = await fetchDatoProperty(req);
      if (datoProperty) {
        return res.status(200).json(datoProperty);
      }

      return res.status(404).json({ message: 'Property not found' });
    }

    const datoResult = await fetchFromDato(req);
    if (datoResult) {
      return res.status(200).json(datoResult);
    }
  } catch (error) {
    console.error('DatoCMS branch failed:', error);
  }

  // En cas d'erreur non bloquante, renvoyer un tableau vide pour éviter l'erreur visible côté client
  return res.status(200).json([]);
}
