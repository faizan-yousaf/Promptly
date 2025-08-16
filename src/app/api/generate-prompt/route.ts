import { NextRequest, NextResponse } from 'next/server';
import { generatePromptResponse } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userInput, model, tone, role, language, agentMode } = body;

    // Validate required fields
    if (!userInput || !model || !tone || !role || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate the prompt using our AI service
    const result = await generatePromptResponse({
      prompt: userInput,
      model,
      tone,
      role,
      language,
      agentMode: agentMode || false,
    });

    return NextResponse.json({
      prompt: result.response,
      processingTime: result.processingTime,
      model: result.model,
    });
  } catch (error) {
    console.error('Error in generate-prompt API:', error);
    return NextResponse.json(
      { error: 'Failed to generate prompt' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests' },
    { status: 405 }
  );
}