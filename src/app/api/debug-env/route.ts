import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const envPath = path.join(process.cwd(), '.env.local');
  const fileExists = fs.existsSync(envPath);
  
  let fileContent = '';
  let parsedVars: Record<string, string> = {};
  
  if (fileExists) {
    try {
      // Try different encodings
      let content = '';
      try {
        content = fs.readFileSync(envPath, 'utf8');
      } catch (error) {
        content = fs.readFileSync(envPath, 'utf16le');
      }
      
      // Clean up null bytes
      content = content.replace(/\u0000/g, '');
      fileContent = content;
      
      const lines = content.split('\n');
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          const [key, ...valueParts] = trimmedLine.split('=');
          if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim();
            const cleanKey = key.trim().replace(/\u0000/g, '');
            const cleanValue = value.replace(/\u0000/g, '');
            if (cleanKey && cleanValue) {
              parsedVars[cleanKey] = cleanValue;
            }
          }
        }
      }
    } catch (error) {
      console.error('Error reading .env.local:', error);
    }
  }
  
  return NextResponse.json({
    success: true,
    message: 'Environment Debug',
    data: {
      fileExists,
      filePath: envPath,
      fileSize: fileContent.length,
      parsedVariables: Object.keys(parsedVars).length,
      sampleVariables: Object.entries(parsedVars).slice(0, 3).map(([key, value]) => ({
        key,
        value: value.substring(0, 10) + '...',
        length: value.length
      })),
      processEnv: {
        OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY ? 'Set' : 'Not set',
        GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'Set' : 'Not set',
        GROQ_API_KEY: process.env.GROQ_API_KEY ? 'Set' : 'Not set',
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'Set' : 'Not set',
      },
      cwd: process.cwd(),
      nodeEnv: process.env.NODE_ENV
    },
    timestamp: new Date().toISOString()
  });
}
