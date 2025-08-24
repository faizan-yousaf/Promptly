import { NextRequest, NextResponse } from 'next/server';
import { generatePromptResponse, PromptRequest, getModelStatus } from '@/lib/ai';
import { PromptOptimizer } from '@/lib/prompt-optimizer';
// import { auth } from '@clerk/nextjs/server'; // Temporarily disabled for testing

// Rate limiting storage (in production, use Redis or a proper rate limiter)
const requestTracker = new Map<string, { count: number; resetTime: number }>();

function rateLimit(clientId: string, maxRequests = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const tracker = requestTracker.get(clientId);
  
  if (!tracker || now > tracker.resetTime) {
    requestTracker.set(clientId, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (tracker.count >= maxRequests) {
    return false;
  }
  
  tracker.count++;
  return true;
}

function sanitizeInput(input: string): string {
  // Remove potential injection patterns and limit length
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
    .substring(0, 5000); // Limit to 5000 characters
}

export async function POST(request: NextRequest) {
  try {
    console.log('API Route called - Starting request processing');
    
    // Check authentication (temporarily disabled for testing)
    // const { userId } = auth();
    // if (!userId) {
    //   return NextResponse.json(
    //     { error: 'Authentication required' },
    //     { status: 401 }
    //   );
    // }
    
    // Temporary: Use a mock user ID for testing
    const userId = 'test-user-id';

    // Rate limiting
    const clientId = userId;
    if (!rateLimit(clientId)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

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

    // Validate input types and sanitize
    if (typeof userInput !== 'string' || userInput.length === 0) {
      return NextResponse.json(
        { error: 'Invalid input format' },
        { status: 400 }
      );
    }

    const sanitizedInput = sanitizeInput(userInput);
    
    if (sanitizedInput.length === 0) {
      return NextResponse.json(
        { error: 'Invalid input content' },
        { status: 400 }
      );
    }

    // Validate allowed values
    const allowedModels = ['gemini', 'groq', 'openrouter'];
    const allowedTones = ['professional', 'friendly', 'creative'];
    const allowedRoles = ['developer', 'marketer', 'writer', 'researcher', 'entrepreneur', 'student'];
    
    if (!allowedModels.includes(model) || !allowedTones.includes(tone) || !allowedRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid parameter values' },
        { status: 400 }
      );
    }
    
    // Optimize the prompt if strategy is provided
    let optimizedInput = sanitizedInput;
    let optimizationMetadata = null;
    
    if (optimizationStrategy) {
      const optimized = PromptOptimizer.optimize(
        sanitizedInput,
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
    
    console.log('API Key check:', {
      OPENROUTER_API_KEY: !!process.env.OPENROUTER_API_KEY,
      OpenAI_Key: !!process.env.OpenAI_Key,
      model: model,
      openRouterModel: openRouterModel
    });
    
    console.log('Calling generatePromptResponse with:', promptRequest);
    const result = await generatePromptResponse(promptRequest);
    console.log('generatePromptResponse result:', { 
      success: true, 
      model: result.model,
      fallbackUsed: result.fallbackUsed,
      fallbackReason: result.fallbackReason
    });

    return NextResponse.json({
      prompt: result.response,
      processingTime: result.processingTime,
      model: result.model,
      usage: result.usage,
      optimization: optimizationMetadata,
      originalInput: sanitizedInput,
      optimizedInput: optimizedInput !== sanitizedInput ? optimizedInput : undefined,
      fallbackUsed: result.fallbackUsed,
      fallbackReason: result.fallbackReason,
    });
      } catch (err) {
      // Log error securely without exposing sensitive details
      console.error('API Error:', err instanceof Error ? err.message : 'Unknown error');
      
      // Check if it's a configuration error
      if (err instanceof Error && err.message.includes('No AI models are configured')) {
        const modelStatus = getModelStatus();
        return NextResponse.json(
          { 
            error: 'No AI models are configured. Please check your API keys.',
            modelStatus 
          },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
}

export async function GET() {
  try {
    // Return model status for debugging
    const modelStatus = getModelStatus();
    return NextResponse.json({
      message: 'Promptly AI API is running',
      modelStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get model status' },
      { status: 500 }
    );
  }
}