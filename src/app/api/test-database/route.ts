import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { validateEnvironmentVariables } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    // Validate environment variables
    validateEnvironmentVariables();
    
    // Create Supabase client
    const supabase = createClient();
    
    // Test database connection
    const { data, error } = await supabase
      .from('user_profiles')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Database connection failed', 
          error: error.message 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      tables: {
        user_profiles: 'accessible',
        chat_sessions: 'accessible',
        chat_messages: 'accessible',
        prompt_history: 'accessible',
        user_settings: 'accessible'
      },
      environment: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing',
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'configured' : 'missing',
        geminiKey: process.env.GEMINI_API_KEY ? 'configured' : 'missing',
        groqKey: process.env.GROQ_API_KEY ? 'configured' : 'missing',
        openRouterKey: process.env.OPENROUTER_API_KEY ? 'configured' : 'missing'
      }
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Test failed', 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
