import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Environment Variables Test',
    data: {
      OPENROUTER_API_KEY: {
        exists: !!env.OPENROUTER_API_KEY,
        length: env.OPENROUTER_API_KEY?.length || 0,
        preview: env.OPENROUTER_API_KEY ? `${env.OPENROUTER_API_KEY.substring(0, 10)}...` : 'Not set'
      },
      GEMINI_API_KEY: {
        exists: !!env.GEMINI_API_KEY,
        length: env.GEMINI_API_KEY?.length || 0,
        preview: env.GEMINI_API_KEY ? `${env.GEMINI_API_KEY.substring(0, 10)}...` : 'Not set'
      },
      GROQ_API_KEY: {
        exists: !!env.GROQ_API_KEY,
        length: env.GROQ_API_KEY?.length || 0,
        preview: env.GROQ_API_KEY ? `${env.GROQ_API_KEY.substring(0, 10)}...` : 'Not set'
      },
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: {
        exists: !!env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        length: env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.length || 0,
        preview: env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? `${env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.substring(0, 10)}...` : 'Not set'
      },
      CLERK_SECRET_KEY: {
        exists: !!env.CLERK_SECRET_KEY,
        length: env.CLERK_SECRET_KEY?.length || 0,
        preview: env.CLERK_SECRET_KEY ? `${env.CLERK_SECRET_KEY.substring(0, 10)}...` : 'Not set'
      },
      NEXT_PUBLIC_SUPABASE_URL: {
        exists: !!env.NEXT_PUBLIC_SUPABASE_URL,
        length: env.NEXT_PUBLIC_SUPABASE_URL?.length || 0,
        preview: env.NEXT_PUBLIC_SUPABASE_URL ? `${env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 20)}...` : 'Not set'
      },
      NEXT_PUBLIC_SUPABASE_ANON_KEY: {
        exists: !!env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        length: env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
        preview: env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? `${env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 10)}...` : 'Not set'
      },
      SUPABASE_SERVICE_ROLE_KEY: {
        exists: !!env.SUPABASE_SERVICE_ROLE_KEY,
        length: env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
        preview: env.SUPABASE_SERVICE_ROLE_KEY ? `${env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 10)}...` : 'Not set'
      },
      SITE_URL: env.SITE_URL,
      NODE_ENV: env.NODE_ENV,
      OPENROUTER_DEFAULT_MODEL: env.OPENROUTER_DEFAULT_MODEL
    },
    timestamp: new Date().toISOString()
  });
}
