import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const qasm: string | undefined = body?.qasm;
    if (!qasm || typeof qasm !== 'string' || qasm.trim().length === 0) {
      return NextResponse.json({ error: 'Missing QASM code' }, { status: 400 });
    }

    const simulatorUrlEnv = process.env.SIMULATOR_URL;
    const simulatorUrl = simulatorUrlEnv || (process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : undefined);
    if (!simulatorUrl) {
      return NextResponse.json(
        { error: 'SIMULATOR_URL is not configured on the server' },
        { status: 500 }
      );
    }

    const res = await fetch(`${simulatorUrl.replace(/\/$/, '')}/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qasm }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || 'Simulator error' },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

