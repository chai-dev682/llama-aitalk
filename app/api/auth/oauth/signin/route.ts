import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, provider, provider_id, image } = body;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/oauth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        provider,
        provider_id,
        image,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to sign in with OAuth');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process OAuth sign-in' },
      { status: 500 }
    );
  }
} 