import { NextRequest, NextResponse } from 'next/server';
import { generatePromptResponse, PromptRequest } from '@/lib/ai';
import { PromptOptimizer, OptimizationStrategy } from '@/lib/prompt-optimizer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      userInput, 
      model, 
      tone, 
      role, 
      language, 
      agentMode,
      optimizationStrategy,
      openRouterModel
    } = body;

    // Validate required fields
    if (!userInput || !model || !tone || !role || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Optimize the prompt if strategy is provided
    let optimizedInput = userInput;
    let optimizationMetadata = null;
    
    if (optimizationStrategy) {
      const optimized = PromptOptimizer.optimize(
        userInput,
        optimizationStrategy,
        { tone, role, language }
      );
      
      optimizedInput = optimized.optimizedPrompt;
      optimizationMetadata = optimized.metadata;
    }

    // Generate the prompt using our AI service
    const promptRequest: PromptRequest = {
      prompt: optimizedInput,
      model,
      tone,
      role,
      language,
      agentMode: agentMode || false,
      openRouterModel
    };
    
    const result = await generatePromptResponse(promptRequest);

    return NextResponse.json({
      prompt: result.response,
      processingTime: result.processingTime,
      model: result.model,
      usage: result.usage,
      optimization: optimizationMetadata,
      originalInput: userInput,
      optimizedInput: optimizedInput !== userInput ? optimizedInput : undefined,
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