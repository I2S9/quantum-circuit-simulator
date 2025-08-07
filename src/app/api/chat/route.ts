import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Ensure Node.js runtime (OpenAI SDK needs Node, not Edge)
export const runtime = 'nodejs';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const prompt: string | undefined = body?.prompt;
    const incomingMessages: ChatMessage[] | undefined = body?.messages;

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content:
          "You are QubitlyAi, a friendly, concise assistant specialized in quantum computing. Explain clearly, use short paragraphs and bullet points when helpful. If asked for code, provide runnable examples. If you don't know, say so briefly.",
      },
    ];

    if (Array.isArray(incomingMessages) && incomingMessages.length > 0) {
      messages.push(...incomingMessages);
    } else if (typeof prompt === 'string' && prompt.trim().length > 0) {
      messages.push({ role: 'user', content: prompt });
    } else {
      return NextResponse.json(
        { error: 'Missing prompt or messages' },
        { status: 400 }
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    if (!client.apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is not set on the server' },
        { status: 500 }
      );
    }

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.3,
    });

    const text = completion.choices?.[0]?.message?.content?.trim() ?? '';
    return NextResponse.json({ text });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

