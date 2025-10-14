import { NextRequest, NextResponse } from 'next/server';
import { buildDirectusUrl } from '@/lib/directus';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '10';
    
    const url = buildDirectusUrl(`/items/propriedades?limit=${limit}`);
    
    if (!url) {
      return NextResponse.json(
        { 
          error: 'Directus URL not configured',
          configured: false,
          env_check: process.env.NEXT_PUBLIC_DIRECTUS_URL ? 'Set' : 'Not set'
        }, 
        { status: 500 }
      );
    }

    console.log('API: Fetching from:', url);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      configured: true,
      directus_url: url,
      data: data,
      count: data.data?.length || 0,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
        timestamp: new Date().toISOString(),
      }, 
      { status: 500 }
    );
  }
}