import { NextApiRequest, NextApiResponse } from 'next';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;
const DIRECTUS_EMAIL = process.env.NEXT_PUBLIC_DIRECTUS_EMAIL;
const DIRECTUS_PASSWORD = process.env.NEXT_PUBLIC_DIRECTUS_PASSWORD;

// Cache pour le token
let cachedToken: string | null = null;
let tokenExpiry = 0;

const getDirectusToken = async (): Promise<string> => {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry - 60000) {
    return cachedToken;
  }

  if (!DIRECTUS_URL || !DIRECTUS_EMAIL || !DIRECTUS_PASSWORD) {
    throw new Error('Missing Directus configuration');
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = await getDirectusToken();
    
    const url = new URL(`${DIRECTUS_URL}/items/propriedades`);
    
    const { operation_type, property_type, city, min_price, max_price } = req.query;
    
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

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
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
    console.log(`Fetched ${data.data?.length || 0} properties`);

    res.status(200).json(data.data || []);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Error fetching properties',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
