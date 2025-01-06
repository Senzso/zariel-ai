const SOLSCAN_API_BASE = 'https://public-api.solscan.io/v2';

export async function getSolPrice() {
  try {
    const response = await fetch(`${SOLSCAN_API_BASE}/market/token/SOL`);
    if (!response.ok) {
      throw new Error('Failed to fetch SOL price');
    }
    const data = await response.json();
    return `SOL Price: $${parseFloat(data.data.priceUsdt).toFixed(2)}`;
  } catch (error) {
    console.error('Error fetching SOL price:', error);
    return 'Error fetching SOL price. Please try again later.';
  }
}

export async function getTokenInfo(address: string) {
  try {
    const response = await fetch(`${SOLSCAN_API_BASE}/token/meta?tokenAddress=${address}`);
    if (!response.ok) {
      throw new Error('Failed to fetch token info');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching token info:', error);
    return null;
  }
}

export async function getTokenVolume(address: string) {
  try {
    const response = await fetch(`${SOLSCAN_API_BASE}/market/token/${address}`);
    if (!response.ok) {
      throw new Error('Failed to fetch token volume');
    }
    const data = await response.json();
    return {
      volume24h: data.data.volume24h,
      priceUsdt: data.data.priceUsdt,
      symbol: data.data.symbol
    };
  } catch (error) {
    console.error('Error fetching token volume:', error);
    return null;
  }
}

export async function checkBalance(address: string) {
  try {
    const response = await fetch(`${SOLSCAN_API_BASE}/account/${address}`);
    if (!response.ok) {
      throw new Error('Failed to check balance');
    }
    const data = await response.json();
    return `Balance: ${(data.data.lamports / 1e9).toFixed(9)} SOL`;
  } catch (error) {
    console.error('Error checking balance:', error);
    return 'Error checking balance. Please try again later.';
  }
}

export async function getNetworkStatus() {
  try {
    const response = await fetch(`${SOLSCAN_API_BASE}/chaininfo`);
    if (!response.ok) {
      throw new Error('Failed to fetch network status');
    }
    const data = await response.json();
    return `Network Status: ${data.data.status}\nBlock Height: ${data.data.blockHeight}`;
  } catch (error) {
    console.error('Error fetching network status:', error);
    return 'Error fetching network status. Please try again later.';
  }
}

