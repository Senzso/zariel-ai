const SOLSCAN_API_BASE = 'https://public-api.solscan.io';

export async function getSolPrice() {
  try {
    const response = await fetch(`${SOLSCAN_API_BASE}/market/token/SOL`);
    const data = await response.json();
    return `SOL Price: $${parseFloat(data.priceUsdt).toFixed(2)}`;
  } catch (error) {
    console.error('Error fetching SOL price:', error);
    return 'Error fetching SOL price';
  }
}

export async function getTokenInfo(address: string) {
  try {
    const response = await fetch(`${SOLSCAN_API_BASE}/token/meta?token=${address}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching token info:', error);
    return null;
  }
}

export async function getTokenVolume(address: string) {
  try {
    const response = await fetch(`${SOLSCAN_API_BASE}/market/token/${address}`);
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
    const response = await fetch(`${SOLSCAN_API_BASE}/account/${address}`);
    const data = await response.json();
    return `Balance: ${data.lamports / 1e9} SOL`;
  } catch (error) {
    console.error('Error checking balance:', error);
    return 'Error checking balance';
  }
}

export async function getNetworkStatus() {
  try {
    const response = await fetch(`${SOLSCAN_API_BASE}/chaininfo`);
    const data = await response.json();
    return `Network Status: ${data.status}\nBlock Height: ${data.blockHeight}`;
  } catch (error) {
    console.error('Error fetching network status:', error);
    return 'Error fetching network status';
  }
}

