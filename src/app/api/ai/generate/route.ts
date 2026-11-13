import { NextRequest, NextResponse } from 'next/server';
import { generateBusinessIntelligence, AiGenerationRequest } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const body: AiGenerationRequest = await req.json();

    if (!body || !body.action) {
      return NextResponse.json(
        { error: 'Aksi (action) wajib disediakan.' },
        { status: 400 }
      );
    }

    const response = await generateBusinessIntelligence(body);
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('API Error in /api/ai/generate:', error);
    return NextResponse.json(
      { error: 'Terjadi kegagalan pemrosesan kecerdasan buatan.', details: error.message },
      { status: 500 }
    );
  }
}
