import { NextApiRequest, NextApiResponse } from 'next';
import { gql } from 'graphql-request';
import {
  DatoProperty,
  getDatoClient,
  getFallbackLocales,
  isDatoConfigured,
  resolveLocale,
} from '@/lib/datocms';

const FALLBACK_URL = 'https://lc-directus-backend-production.up.railway.app';
const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || FALLBACK_URL;
const DIRECTUS_EMAIL = process.env.NEXT_PUBLIC_DIRECTUS_EMAIL;
const DIRECTUS_PASSWORD = process.env.NEXT_PUBLIC_DIRECTUS_PASSWORD;

// Cache pour le token Directus
let cachedToken: string | null = null;
let tokenExpiry = 0;

const DATO_PROPERTIES_QUERY = gql`
  query Properties($locale: SiteLocale!, $fallbackLocales: [SiteLocale!], $limit: Int) {
    allProperties(
      locale: $locale
      fallbackLocales: $fallbackLocales
      first: $limit
      orderBy: _firstPublishedAt_DESC
    ) {
      id
      title
      title_slug
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
      main_image {
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
      filter: { OR: [{ id: { eq: $id } }, { title_slug: { eq: $slug } }, { slug: { eq: $slug } }] }
    ) {
      id
      title
      title_slug
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
      main_image {
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

  const operationValues = (() => {
    if (!item.operation) return [];
    if (Array.isArray(item.operation)) {
      return item.operation
        .map((op: any) => {
          if (typeof op === 'string') return op;
          if (op && typeof op === 'object') {
            return op.value || op.title || op.label || '';
          }
          return '';
        })
        .filter(Boolean);
    }
    if (typeof item.operation === 'string') return [item.operation];
    return [];
  })();

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
    Slug: item.title_slug || item.slug || undefined,
    Address: item.adress || item.address || '',
    City: item.city || '',
    State: item.state || '',
    Country: item.country || '',
    Price: item.price ?? 0,
    Currency: [],
    Bedrooms: item.bedrooms ?? 0,
    Bathrooms: item.bathrooms ?? 0,
    Parking_spaces: item.parkingspaces ?? item.parkingSpaces ?? 0,
    Operation_type: operationValues,
    Property_type: item.propertyType || [],
    Featured: Boolean(item.featured),
    Descripcion: item.description || '',
    Amenidades: amenities,
    Image: item.main_image?.url || item.mainImage?.url,
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

  try {
    const locale = resolveLocale((req.query.locale as string) || (req.query.lang as string));
    const fallbackLocales = getFallbackLocales(locale);
    const client = getDatoClient();

    const data = await client.request<{ property: DatoProperty | null }>(DATO_PROPERTY_QUERY, {
      locale,
      fallbackLocales,
      id,
      slug,
    });

    if (!data.property) return null;
    return mapDatoToDirectusShape(data.property);
  } catch (error) {
    console.error('DatoCMS property fetch failed:', error);
    return null;
  }
};

const fetchFromDato = async (req: NextApiRequest) => {
  if (!isDatoConfigured()) return null;

  try {
    const locale = resolveLocale((req.query.locale as string) || (req.query.lang as string));
    const fallbackLocales = getFallbackLocales(locale);
    const limit = req.query.limit ? Number(req.query.limit) : 50;
    const client = getDatoClient();

    const data = await client.request<{ allProperties: DatoProperty[] }>(DATO_PROPERTIES_QUERY, {
      locale,
      fallbackLocales,
      limit,
    });

    const mapped = (data.allProperties || []).map(mapDatoToDirectusShape);
    return applyQueryFilters(mapped, req.query);
  } catch (error) {
    console.error('DatoCMS fetch failed, falling back to Directus:', error);
    return null;
  }
};

const getDirectusToken = async (): Promise<string> => {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry - 60000) {
    return cachedToken;
  }
  if (!DIRECTUS_EMAIL || !DIRECTUS_PASSWORD) {
    return '';
  }

  const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: DIRECTUS_EMAIL,
      password: DIRECTUS_PASSWORD,
    }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

  const data = await response.json();
  const { access_token, expires } = data.data;

  cachedToken = access_token;
  tokenExpiry = now + (expires || 900000);

  console.log('Directus token obtained');
  return access_token;
};

const fetchFromDirectus = async (req: NextApiRequest) => {
  const token = await getDirectusToken();

  const url = new URL(`${DIRECTUS_URL}/items/propriedades`);
  url.searchParams.append(
    'fields',
    '*,images.directus_files_id.id,images.directus_files_id.filename_download,images.directus_files_id.type'
  );

  const { operation_type, property_type, city, min_price, max_price, featured, limit } = req.query;

  if (operation_type) {
    url.searchParams.append('filter[Operation_type][_contains]', operation_type as string);
  }

  if (property_type) {
    url.searchParams.append('filter[Property_type][_contains]', property_type as string);
  }

  if (city) {
    url.searchParams.append('filter[City][_icontains]', city as string);
  }

  if (min_price) {
    url.searchParams.append('filter[Price][_gte]', min_price as string);
  }

  if (max_price) {
    url.searchParams.append('filter[Price][_lte]', max_price as string);
  }

  if (featured === 'true') {
    url.searchParams.append('filter[Featured][_eq]', 'true');
  }

  if (limit) {
    url.searchParams.append('limit', limit as string);
  }

  url.searchParams.append('filter[status][_neq]', 'archived');

  console.log('Fetching from Directus:', url.toString());

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      cachedToken = null;
      tokenExpiry = 0;
    }
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  console.log(`Fetched ${data.data?.length || 0} properties from Directus`);
  return data.data || [];
};

const fetchDirectusProperty = async (id?: string, slug?: string) => {
  const token = await getDirectusToken();

  if (id) {
    const url = `${DIRECTUS_URL}/items/propriedades/${id}?fields=*,images.directus_files_id.*`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        cachedToken = null;
        tokenExpiry = 0;
      }
      throw new Error(`Directus property error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || null;
  }

  if (slug) {
    const url = new URL(`${DIRECTUS_URL}/items/propriedades`);
    url.searchParams.append('filter[Slug][_eq]', slug);
    url.searchParams.append('limit', '1');
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Directus property by slug error: ${response.status}`);
    }
    const data = await response.json();
    return data.data?.[0] || null;
  }

  return null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id, slug } = req.query;

    if (id || slug) {
      const datoProperty = await fetchDatoProperty(req);
      if (datoProperty) {
        return res.status(200).json(datoProperty);
      }

      const directusProperty = await fetchDirectusProperty(
        id ? String(id) : undefined,
        slug ? String(slug) : undefined
      );
      if (directusProperty) {
        return res.status(200).json(directusProperty);
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

  try {
    const directusData = await fetchFromDirectus(req);
    return res.status(200).json(directusData);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'Error fetching properties',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
