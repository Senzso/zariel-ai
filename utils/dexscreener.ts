const DEXSCREENER_API_BASE = 'https://api.dexscreener.com';

export async function getTokenProfile(tokenAddress: string) {
  try {
    const response = await fetch(`${DEXSCREENER_API_BASE}/token-profiles/latest/v1?address=${tokenAddress}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching token profile:', error);
    return null;
  }
}

export async function getTokenOrders(chainId: string, tokenAddress: string) {
  try {
    const response = await fetch(`${DEXSCREENER_API_BASE}/orders/v1/${chainId}/${tokenAddress}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching token orders:', error);
    return null;
  }
}

export async function getPairInfo(chainId: string, pairId: string) {
  try {
    const response = await fetch(`${DEXSCREENER_API_BASE}/latest/dex/pairs/${chainId}/${pairId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching pair info:', error);
    return null;
  }
}

