const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Environment Variables Loading...\n');

// Method 1: Direct file reading with better parsing
console.log('📁 Method 1: Direct file reading');
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file exists');
  const content = fs.readFileSync(envPath, 'utf8');
  console.log(`📄 File size: ${content.length} characters`);
  
  // Parse the content more carefully
  const lines = content.split('\n');
  const envVars = {};
  let currentKey = null;
  let currentValue = '';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines and comments
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }
    
    // Check if this line starts with a key
    if (trimmedLine.includes('=')) {
      // If we have a previous key, save it
      if (currentKey) {
        envVars[currentKey] = currentValue.trim();
      }
      
      // Start new key-value pair
      const [key, ...valueParts] = trimmedLine.split('=');
      currentKey = key.trim();
      currentValue = valueParts.join('=').trim();
    } else {
      // This is a continuation of the previous value
      if (currentKey) {
        currentValue += ' ' + trimmedLine;
      }
    }
  }
  
  // Save the last key-value pair
  if (currentKey) {
    envVars[currentKey] = currentValue.trim();
  }
  
  console.log('📋 Found variables:');
  Object.keys(envVars).forEach(key => {
    if (envVars[key]) {
      console.log(`  ✅ ${key}: ${envVars[key].substring(0, 10)}...`);
    } else {
      console.log(`  ❌ ${key}: Empty value`);
    }
  });
  
  // Test setting them in process.env
  console.log('\n🔧 Setting variables in process.env...');
  Object.entries(envVars).forEach(([key, value]) => {
    if (value) {
      process.env[key] = value;
      console.log(`  ✅ Set ${key}`);
    }
  });
  
  console.log('\n🔧 Testing process.env after setting...');
  console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? 'Set' : 'Not set');
  console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Set' : 'Not set');
  console.log('GROQ_API_KEY:', process.env.GROQ_API_KEY ? 'Set' : 'Not set');
  console.log('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'Set' : 'Not set');
  
} else {
  console.log('❌ .env.local file not found');
}
