import { buildDirectusUrl } from '@/lib/directus';

export interface DirectusProperty {
  id: number;
  Title: string;
  Description?: string;
  Price?: number;
  Address?: string;
  City?: string;
  State?: string;
  Country?: string;
  Bedrooms?: number;
  Bathrooms?: number;
  Area?: number;
  PropertyType?: string;
  ListingType?: string; // "for-sale" | "for-rent"
  Images?: string[];
  FeaturedImage?: string;
  Status?: string;
  AgentId?: number;
  CreatedAt?: string;
  UpdatedAt?: string;
}

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
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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