import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Please provide a valid prompt' }, { status: 400 });
    }

    const completion = await openai.completions.create({
      model: 'text-davinci-002',
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.6,
    });

    if (!completion.choices || completion.choices.length === 0) {
      return NextResponse.json({ error: 'No response from OpenAI' }, { status: 500 });
    }

    return NextResponse.json({ response: completion.choices[0].text.trim() });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    let errorMessage = 'An error occurred during your request.';
    let statusCode = 500;

    if (error.response) {
      console.error(error.response.status, error.response.data);
      errorMessage = error.response.data.error.message || errorMessage;
      statusCode = error.response.status;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}

