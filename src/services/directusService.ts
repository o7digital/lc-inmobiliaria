import { buildDirectusUrl } from '@/lib/directus';

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

export const testDirectusConnection = async (): Promise<{ success: boolean; message: string; url?: string }> => {
  try {
    const url = buildDirectusUrl('/items/propriedades?limit=1');
    
    if (!url) {
      return {
        success: false,
        message: 'Directus URL not configured'
      };
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        success: false,
        message: `HTTP error! status: ${response.status}`,
        url
      };
    }

    const data = await response.json();
    
    return {
      success: true,
      message: `Connection successful. Found ${data.data?.length || 0} properties.`,
      url
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const fetchProperties = async (): Promise<DirectusProperty[]> => {
  try {
    const url = buildDirectusUrl('/items/propriedades');
    
    if (!url) {
      console.error('Directus URL not configured');
      return [];
    }

    console.log('Fetching properties from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Properties fetched successfully:', data);

    return data.data || [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

export const fetchPropertyById = async (id: number): Promise<DirectusProperty | null> => {
  try {
    const url = buildDirectusUrl(`/items/propriedades/${id}`);
    
    if (!url) {
      console.error('Directus URL not configured');
      return null;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
};