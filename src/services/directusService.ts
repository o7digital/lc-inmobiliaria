import { buildDirectusUrl, getDirectusToken } from '@/lib/directus';
import { getValidToken } from './directusAuth';

export interface DirectusProperty {
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

const getAuthHeaders = async (): Promise<HeadersInit> => {
  // Essayer d'abord le token static depuis les variables d'environnement
  let token: string | null = getDirectusToken();
  
  // Si pas de token static, essayer de se connecter automatiquement
  if (!token) {
    token = await getValidToken();
  }
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export const testDirectusConnection = async (): Promise<{ success: boolean; message: string; url?: string; hasToken: boolean }> => {
  try {
    const url = buildDirectusUrl('/items/propriedades?limit=1');
    const token = getDirectusToken();
    
    if (!url) {
      return {
        success: false,
        message: 'Directus URL not configured',
        hasToken: !!token
      };
    }

    const headers = await getAuthHeaders();
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      if (response.status === 401) {
        errorMessage = 'Authentication failed - Invalid or missing token';
      } else if (response.status === 403) {
        errorMessage = 'Access forbidden - Check permissions';
      }
      
      return {
        success: false,
        message: errorMessage,
        url,
        hasToken: !!token
      };
    }

    const data = await response.json();
    
    return {
      success: true,
      message: `Connection successful. Found ${data.data?.length || 0} properties.`,
      url,
      hasToken: !!token
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      hasToken: !!getDirectusToken()
    };
  }
};

const buildApiBase = () => {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    'http://localhost:3000'
  );
};

export const fetchProperties = async (): Promise<DirectusProperty[]> => {
  try {
    const url = `${buildApiBase()}/api/directus/properties`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching properties (API):', error);
    return [];
  }
};

export const fetchPropertyById = async (id: number): Promise<DirectusProperty | null> => {
  try {
    const url = `${buildApiBase()}/api/directus/properties?id=${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error('Error fetching property (API):', error);
    return null;
  }
};
