#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Promptly Setup Checker\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('❌ .env.local file not found!');
  console.log('\n📝 Create a .env.local file with the following variables:\n');
  
  const envTemplate = `# AI Service API Keys
OPENROUTER_API_KEY=your_openrouter_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here

# Application Settings
SITE_URL=http://localhost:3000
OPENROUTER_DEFAULT_MODEL=openai/gpt-4o

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret`;

  console.log(envTemplate);
  console.log('\n🔗 Get your API keys from:');
  console.log('  • OpenRouter: https://openrouter.ai/keys');
  console.log('  • Google Gemini: https://makersuite.google.com/app/apikey');
  console.log('  • Groq: https://console.groq.com/keys');
  console.log('  • Supabase: https://supabase.com/dashboard');
  console.log('  • Clerk: https://dashboard.clerk.com/');
  
  process.exit(1);
}

// Read and check environment variables
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const trimmedLine = line.trim();
  if (trimmedLine && !trimmedLine.startsWith('#')) {
    const [key, ...valueParts] = trimmedLine.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      envVars[key.trim()] = value;
    }
  }
});

console.log('✅ .env.local file found\n');



// Check required variables
const requiredVars = {
  'AI Services': ['OPENROUTER_API_KEY', 'GEMINI_API_KEY', 'GROQ_API_KEY'],
  'Supabase': ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'],
  'Clerk': ['NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', 'CLERK_SECRET_KEY']
};

let allGood = true;

Object.entries(requiredVars).forEach(([category, vars]) => {
  console.log(`📋 ${category}:`);
  
  const hasAny = vars.some(varName => envVars[varName] && envVars[varName].length > 0);
  
  if (hasAny) {
    console.log('  ✅ At least one variable configured');
  } else {
    console.log('  ❌ No variables configured');
    allGood = false;
  }
  
  vars.forEach(varName => {
    const value = envVars[varName];
    if (value && value.length > 0) {
      console.log(`    ✅ ${varName} (${value.length} chars)`);
    } else {
      console.log(`    ⚠️  ${varName} (not set)`);
    }
  });
  console.log('');
});

if (allGood) {
  console.log('🎉 Setup looks good! You can now run:');
  console.log('  npm run dev');
} else {
  console.log('⚠️  Please configure the missing environment variables before running the app.');
}

console.log('\n📖 For detailed setup instructions, see DEPLOYMENT_GUIDE.md');
