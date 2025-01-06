import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.memory.lol/v1/tw/${username}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Format the data as a simple text
    let formattedData = `Twitter Username History for @${username}:\n\n`;
    Object.entries(data).forEach(([date, handle]) => {
      formattedData += `${date}: @${handle}\n`;
    });

    return NextResponse.json({ formattedData });
  } catch (error) {
    console.error('Error checking Twitter username:', error);
    return NextResponse.json({ error: 'Failed to fetch Twitter data' }, { status: 500 });
  }
}

