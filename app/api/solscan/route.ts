import { NextResponse } from 'next/server';

const SOLSCAN_API_BASE = 'https://public-api.solscan.io';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  if (!endpoint) {
    return NextResponse.json({ error: 'No endpoint specified' }, { status: 400 });
  }

  try {
    const response = await fetch(`${SOLSCAN_API_BASE}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Solscan API responded with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from Solscan:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Solscan' }, { status: 500 });
  }
}

