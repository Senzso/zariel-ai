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
export async function setTwitterToken(token: string): Promise<void> {
  // This function doesn't need to do anything as we're storing the token in the component state
  // It's here for consistency and potential future use
}

export async function postTweet(token: string, message: string) {
  const response = await fetch('/api/twitter/post-tweet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, message }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to post tweet');
  }

  return await response.json();
}