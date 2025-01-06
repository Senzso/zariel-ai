export async function checkTwitterUsername(username: string) {
  try {
    const response = await fetch(`/api/twitter-check?username=${encodeURIComponent(username)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking Twitter username:', error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

export async function postTweet(accessToken: string, message: string) {
  const response = await fetch('https://api.twitter.com/2/tweets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: message }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Error posting tweet:', data);
    throw new Error(data.errors?.[0]?.message || 'Failed to post tweet');
  }

  return data;
}
