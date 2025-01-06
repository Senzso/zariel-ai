const DEXSCREENER_API_BASE = 'https://api.dexscreener.com';

export async function getTokenProfile(tokenAddress: string): Promise<string> {
  try {
    const response = await fetch(`${DEXSCREENER_API_BASE}/token-profiles/latest/v1?address=${tokenAddress}`);
    const data = await response.json();
    
    if (!data || !data.profiles || data.profiles.length === 0) {
      return 'No token profile found.';
    }

    const profile = data.profiles[0];
    return `
Token Profile:
Name: ${profile.name || 'N/A'}
Symbol: ${profile.symbol || 'N/A'}
Description: ${profile.description || 'N/A'}
Website: ${profile.website || 'N/A'}
Twitter: ${profile.twitter || 'N/A'}
Telegram: ${profile.telegram || 'N/A'}
    `.trim();
  } catch (error) {
    console.error('Error fetching token profile:', error);
    return 'Error fetching token profile';
  }
}

export async function getTokenOrders(chainId: string, tokenAddress: string): Promise<string> {
  try {
    const response = await fetch(`${DEXSCREENER_API_BASE}/orders/v1/${chainId}/${tokenAddress}`);
    const data = await response.json();
    
    if (!data || !data.orders || data.orders.length === 0) {
      return 'No token orders found.';
    }

    let ordersText = 'Token Orders:\n';
    data.orders.forEach((order: any, index: number) => {
      ordersText += `
Order ${index + 1}:
Type: ${order.type}
Price: ${order.price}
Amount: ${order.amount}
Value: ${order.value}
      `.trim() + '\n';
    });

    return ordersText.trim();
  } catch (error) {
    console.error('Error fetching token orders:', error);
    return 'Error fetching token orders';
  }
}

export async function getPairInfo(chainId: string, pairId: string): Promise<string> {
  try {
    const response = await fetch(`${DEXSCREENER_API_BASE}/latest/dex/pairs/${chainId}/${pairId}`);
    const data = await response.json();
    
    if (!data || !data.pair) {
      return 'No pair information found.';
    }

    const pair = data.pair;
    return `
Pair Information:
Chain: ${pair.chainId}
DEX: ${pair.dexId}
Base Token: ${pair.baseToken.name} (${pair.baseToken.symbol})
Quote Token: ${pair.quoteToken.name} (${pair.quoteToken.symbol})
Price: ${pair.priceUsd}
Liquidity: $${pair.liquidity.usd}
Volume 24h: $${pair.volume.h24}
    `.trim();
  } catch (error) {
    console.error('Error fetching pair info:', error);
    return 'Error fetching pair info';
  }
}

