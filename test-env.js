const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Environment Variables Loading...\n');

// Method 1: Direct file reading
console.log('📁 Method 1: Direct file reading');
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file exists');
  const content = fs.readFileSync(envPath, 'utf8');
  console.log(`📄 File size: ${content.length} characters`);
  
  // Parse the content
  const lines = content.split('\n');
  const envVars = {};
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        envVars[key.trim()] = value;
      }
    }
  });
  
  console.log('📋 Found variables:');
  Object.keys(envVars).forEach(key => {
    console.log(`  ${key}: ${envVars[key].substring(0, 10)}...`);
  });
} else {
  console.log('❌ .env.local file not found');
}

console.log('\n🔧 Method 2: Process.env check');
console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? 'Set' : 'Not set');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Set' : 'Not set');
console.log('GROQ_API_KEY:', process.env.GROQ_API_KEY ? 'Set' : 'Not set');
console.log('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'Set' : 'Not set');

console.log('\n🔧 Method 3: Try loading with dotenv');
try {
  require('dotenv').config({ path: '.env.local' });
  console.log('✅ dotenv loaded');
  console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? 'Set' : 'Not set');
} catch (error) {
  console.log('❌ dotenv not available:', error.message);
}
