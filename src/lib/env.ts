import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), '.env.local');
config({ path: envPath });

// Fallback: Direct file reading if dotenv doesn't work
function loadEnvFromFile() {
  if (!fs.existsSync(envPath)) {
    console.warn('⚠️ .env.local file not found');
    return {};
  }

  // Try different encodings to handle the file properly
  let content = '';
  try {
    // First try UTF-8
    content = fs.readFileSync(envPath, 'utf8');
  } catch (error) {
    try {
      // If UTF-8 fails, try UTF-16
      content = fs.readFileSync(envPath, 'utf16le');
    } catch (error2) {
      console.error('Error reading .env.local file:', error2);
      return {};
    }
  }

  // Clean up the content - remove null bytes and normalize
  content = content.replace(/\u0000/g, '');
  
  const lines = content.split('\n');
  const envVars: Record<string, string> = {};

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        // Clean up the key and value
        const cleanKey = key.trim().replace(/\u0000/g, '');
        const cleanValue = value.replace(/\u0000/g, '');
        if (cleanKey && cleanValue) {
          envVars[cleanKey] = cleanValue;
        }
      }
    }
  }

  return envVars;
}

// Get environment variables with fallback
const fileEnv = loadEnvFromFile();

// Export environment variables with validation
export const env = {
  // AI Services
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || fileEnv.OPENROUTER_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || fileEnv.GEMINI_API_KEY,
  GROQ_API_KEY: process.env.GROQ_API_KEY || fileEnv.GROQ_API_KEY,
  OPENROUTER_DEFAULT_MODEL: process.env.OPENROUTER_DEFAULT_MODEL || fileEnv.OPENROUTER_DEFAULT_MODEL || 'openai/gpt-4o',
  
  // Clerk Authentication
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || fileEnv.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || fileEnv.CLERK_SECRET_KEY,
  
  // Supabase Database
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || fileEnv.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fileEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || fileEnv.SUPABASE_SERVICE_ROLE_KEY,
  
  // Application Settings
  SITE_URL: process.env.SITE_URL || fileEnv.SITE_URL || 'http://localhost:3000',
  NODE_ENV: process.env.NODE_ENV || fileEnv.NODE_ENV || 'development',
};

// Validation function
export function validateEnv() {
  const required = [
    'OPENROUTER_API_KEY',
    'GEMINI_API_KEY', 
    'GROQ_API_KEY',
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];
  
  const missing = required.filter(key => !env[key as keyof typeof env]);
  
  if (missing.length > 0) {
    console.warn('⚠️ Missing environment variables:', missing);
    return false;
  }
  
  console.log('✅ All environment variables loaded successfully');
  return true;
}

// Debug function
export function debugEnv() {
  console.log('🔍 Environment Variables Debug:');
  Object.entries(env).forEach(([key, value]) => {
    if (value) {
      console.log(`  ✅ ${key}: ${value.substring(0, 10)}...`);
    } else {
      console.log(`  ❌ ${key}: Not set`);
    }
  });
}
