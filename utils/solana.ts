const API_BASE = '/api/solscan';

export async function getSolPrice() {
  try {
    const response = await fetch(`${API_BASE}?endpoint=/market/token/SOL`);
    if (!response.ok) {
      throw new Error('Failed to fetch SOL price');
    }
    const data = await response.json();
    return `SOL Price: $${parseFloat(data.priceUsdt).toFixed(2)}`;
  } catch (error) {
    console.error('Error fetching SOL price:', error);
    return 'Error fetching SOL price. Please try again later.';
  }
}

export async function getTokenInfo(address: string) {
  try {
    const response = await fetch(`${API_BASE}?endpoint=/token/meta?tokenAddress=${address}`);
    if (!response.ok) {
      throw new Error('Failed to fetch token info');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching token info:', error);
    return null;
  }
}

export async function getTokenVolume(address: string) {
  try {
    const response = await fetch(`${API_BASE}?endpoint=/market/token/${address}`);
    if (!response.ok) {
      throw new Error('Failed to fetch token volume');
    }
    const data = await response.json();
    return {
      volume24h: data.volume24h,
      priceUsdt: data.priceUsdt,
      symbol: data.symbol
    };
  } catch (error) {
    console.error('Error fetching token volume:', error);
    return null;
  }
}

export async function checkBalance(address: string) {
  try {
    const response = await fetch(`${API_BASE}?endpoint=/account/${address}`);
    if (!response.ok) {
      throw new Error('Failed to check balance');
    }
    const data = await response.json();
    return `Balance: ${(data.lamports / 1e9).toFixed(9)} SOL`;
  } catch (error) {
    console.error('Error checking balance:', error);
    return 'Error checking balance. Please try again later.';
  }
}

export async function getNetworkStatus() {
  try {
    const response = await fetch(`${API_BASE}?endpoint=/chaininfo`);
    if (!response.ok) {
      throw new Error('Failed to fetch network status');
    }
    const data = await response.json();
    return `Network Status: ${data.status}\nBlock Height: ${data.blockHeight}`;
  } catch (error) {
    console.error('Error fetching network status:', error);
    return 'Error fetching network status. Please try again later.';
  }
}

