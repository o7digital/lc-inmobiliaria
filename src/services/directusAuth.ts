import { buildDirectusUrl } from '@/lib/directus';

interface DirectusLoginResponse {
  access_token: string;
  expires: number;
  refresh_token: string;
}

export const loginToDirectus = async (email: string, password: string): Promise<string | null> => {
  try {
    const url = buildDirectusUrl('/auth/login');
    
    if (!url) {
      console.error('Directus URL not configured');
      return null;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status} - ${response.statusText}`);
    }

    const data: { data: DirectusLoginResponse } = await response.json();
    return data.data.access_token;
  } catch (error) {
    console.error('Error logging into Directus:', error);
    return null;
  }
};

// Cache du token pour éviter de se reconnecter à chaque requête
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

export const getValidToken = async (): Promise<string | null> => {
  // Vérifier si on a un token valide en cache
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  // Essayer de récupérer les identifiants des variables d'environnement
  const email = process.env.DIRECTUS_SERVICE_EMAIL || process.env.NEXT_PUBLIC_DIRECTUS_EMAIL;
  const password = process.env.DIRECTUS_SERVICE_PASSWORD || process.env.NEXT_PUBLIC_DIRECTUS_PASSWORD;

  if (!email || !password) {
    console.error('Directus credentials not configured');
    return null;
  }

  // Se connecter et récupérer un nouveau token
  const token = await loginToDirectus(email, password);
  
  if (token) {
    cachedToken = token;
    // Définir l'expiration à 1 heure (les tokens Directus expirent généralement après quelques heures)
    tokenExpiry = Date.now() + (60 * 60 * 1000);
  }

  return token;
};