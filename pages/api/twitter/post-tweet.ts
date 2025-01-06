import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token, message } = req.body

  if (!token || !message) {
    return res.status(400).json({ error: 'Missing token or message' })
  }

  try {
    const response = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Twitter API error:', data)
      return res.status(response.status).json({
        error: 'Failed to post tweet',
        details: data,
        status: response.status
      })
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error('Error posting tweet:', error)
    return res.status(500).json({ error: 'An error occurred while posting the tweet', details: error.message })
  }
}

