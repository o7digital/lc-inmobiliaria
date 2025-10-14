import { NextApiRequest, NextApiResponse } from 'next';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;

interface DirectusProperty {
  id: number;
  status: string;
  Title: string;
  Slug?: string;
  Address?: string;
  Neigborohood?: string | null;
  City?: string;
  State?: string;
  Country?: string;
  Zipcode?: string;
  Property_type?: string[];
  Operation_type?: string[];
  Price?: string;
  Currency?: string[];
  Maintenance_fee?: string;
  Bedrooms?: number;
  Bathrooms?: number;
  Half_bathrooms?: string;
  Parking_spaces?: number;
  Construccion_area?: number;
  Land_area?: number;
  Floor?: number | null;
  Year_built?: number | null;
  Descripcion?: string | null;
  highlights?: string | null;
  video_url_?: string | null;
  Virtual_tour_url?: string | null;
  Amenidades?: string[];
  Status?: string | null;
  Pet_Friendly?: boolean | null;
  Featured?: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Vérifier la configuration
    if (!DIRECTUS_URL) {
      throw new Error('NEXT_PUBLIC_DIRECTUS_URL is not configured');
    }

    if (!DIRECTUS_TOKEN) {
      throw new Error('NEXT_PUBLIC_DIRECTUS_TOKEN is not configured');
    }

    // Construire l'URL avec les filtres
    const url = new URL(`${DIRECTUS_URL}/items/propriedades`);
    
    // Ajouter les paramètres de recherche si présents
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

    console.log('Fetching from Directus:', url.toString());

    // Faire l'appel à l'API Directus
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Directus API error: ${response.status} ${response.statusText}`);
      throw new Error(`Directus API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data.data?.length || 0} properties`);

    // Retourner les données
    res.status(200).json(data.data || []);

  } catch (error) {
    console.error('Error fetching Directus properties:', error);
    res.status(500).json({
      message: 'Error fetching properties',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}