import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { validateEnvironmentVariables } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    // Check authentication and admin permissions (temporarily disabled for testing)
    // const { userId } = auth();
    // if (!userId) {
    //   return NextResponse.json(
    //     { error: 'Authentication required' },
    //     { status: 401 }
    //   );
    // }
    
    // Temporary: Use a mock user ID for testing
    const userId = 'test-user-id';

    // Only allow in development environment or for specific admin users
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Endpoint not available in production' },
        { status: 403 }
      );
    }

    // Validate environment variables
    validateEnvironmentVariables();
    
    // Create Supabase client
    const supabase = createClient();
    
    // Simple health check without exposing sensitive information
    const { error } = await supabase
      .from('user_profiles')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Database connection failed'
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database test error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Test failed'
      },
      { status: 500 }
    );
  }
}
