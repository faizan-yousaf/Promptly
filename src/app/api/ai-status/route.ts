import { NextResponse } from 'next/server';
import { getModelStatus } from '@/lib/ai';

export async function GET() {
  try {
    const modelStatus = getModelStatus();
    
    return NextResponse.json({
      success: true,
      message: 'AI Model Status',
      data: modelStatus,
      timestamp: new Date().toISOString(),
      recommendations: getRecommendations(modelStatus)
    });
  } catch (error) {
    console.error('Error getting AI status:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to get AI model status',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

function getRecommendations(status: any) {
  const recommendations = [];
  
  if (status.availableModels.length === 0) {
    recommendations.push({
      type: 'error',
      message: 'No AI models are configured. Please add at least one API key to your .env.local file.',
      actions: [
        'Add OPENROUTER_API_KEY for OpenRouter access',
        'Add GEMINI_API_KEY for Google Gemini access',
        'Add GROQ_API_KEY for Groq access'
      ]
    });
  } else if (status.availableModels.length === 1) {
    recommendations.push({
      type: 'warning',
      message: 'Only one AI model is configured. Consider adding more for better reliability.',
      actions: [
        'Add additional API keys for fallback support',
        'This ensures your app continues working if one service is down'
      ]
    });
  } else {
    recommendations.push({
      type: 'success',
      message: 'Multiple AI models are configured. Your app has fallback support.',
      actions: [
        'Your app will automatically switch to available models if one fails',
        'This provides better reliability and uptime'
      ]
    });
  }
  
  // Check specific model configurations
  if (!status.gemini && !status.groq && !status.openrouter) {
    recommendations.push({
      type: 'error',
      message: 'No AI models are properly configured.',
      actions: [
        'Check your .env.local file for API keys',
        'Ensure API keys are valid and have sufficient credits',
        'Restart your development server after adding keys'
      ]
    });
  }
  
  return recommendations;
}
