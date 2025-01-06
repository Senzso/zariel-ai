import { Configuration, OpenAIApi } from 'openai'
import { NextResponse } from 'next/server'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  console.log('Received request to /api/openai');
  try {
    if (!configuration.apiKey) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })
    }

    const { prompt } = await req.json()

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Please provide a valid prompt' }, { status: 400 })
    }

    console.log('Calling OpenAI API with prompt:', prompt);
    const completion = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.6,
    })

    console.log('Received response from OpenAI:', completion.data);
    if (!completion.data.choices || completion.data.choices.length === 0) {
      return NextResponse.json({ error: 'No response from OpenAI' }, { status: 500 })
    }

    return NextResponse.json({ response: completion.data.choices[0].text.trim() })
  } catch (error: any) {
    console.error('OpenAI API error:', error)
    console.error('Detailed error:', JSON.stringify(error, null, 2));
    let errorMessage = 'An error occurred during your request.'
    let statusCode = 500

    if (error.response) {
      console.error(error.response.status, error.response.data)
      errorMessage = error.response.data.error.message || errorMessage
      statusCode = error.response.status
    } else if (error.message) {
      errorMessage = error.message
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode })
  }
}

