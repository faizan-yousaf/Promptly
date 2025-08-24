# 🤖 AI Integration Guide - Promptly

This guide explains how the AI integration works in your Promptly application, including the robust fallback system that ensures your app always works even if one AI service is down.

## 🚀 Features

### ✅ **Multi-Model Support**
- **OpenRouter** - Access to hundreds of AI models (GPT-4, Claude, etc.)
- **Google Gemini** - Google's advanced AI model
- **Groq** - Ultra-fast AI inference

### ✅ **Automatic Fallback System**
- If your primary model fails, the system automatically tries the next available model
- No user intervention required
- Seamless experience even during service outages

### ✅ **Smart Model Selection**
- Automatically detects which models are available based on your API keys
- Provides recommendations for optimal configuration
- Real-time status monitoring

## 🔧 Configuration

### 1. **Environment Variables**

Add these to your `.env.local` file:

```bash
# OpenRouter (Recommended - supports multiple models)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# OpenAI (Alternative to OpenRouter)
OpenAI_Key=your_openai_api_key_here

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key_here

# Groq
GROQ_API_KEY=your_groq_api_key_here

# Application Settings
SITE_URL=http://localhost:3000
OPENROUTER_DEFAULT_MODEL=openai/gpt-4o
```

### 2. **Getting API Keys**

#### **OpenRouter** (Recommended)
1. Visit [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign up and get your API key
3. Provides access to GPT-4, Claude, and many other models

#### **Google Gemini**
1. Visit [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Free tier available

#### **Groq**
1. Visit [https://console.groq.com/keys](https://console.groq.com/keys)
2. Sign up and generate an API key
3. Ultra-fast inference

## 🧪 Testing Your Setup

### **Test Page**
Visit `/test-ai` to:
- Check which models are configured
- Test individual models
- Verify fallback functionality
- Get configuration recommendations

### **API Endpoints**

#### **Check Model Status**
```bash
GET /api/ai-status
```

#### **Generate Prompt**
```bash
POST /api/generate-prompt
{
  "userInput": "Your prompt here",
  "model": "openrouter", // or "gemini", "groq"
  "tone": "professional", // or "friendly", "creative"
  "role": "developer", // or "marketer", "writer", etc.
  "language": "en",
  "agentMode": false
}
```

## 🔄 How Fallback Works

### **Scenario 1: Primary Model Fails**
1. User requests OpenRouter
2. OpenRouter API fails
3. System automatically tries Gemini
4. If Gemini fails, tries Groq
5. Returns response from first successful model

### **Scenario 2: Requested Model Not Available**
1. User requests Gemini but no API key configured
2. System automatically uses OpenRouter
3. Returns response with fallback notification

### **Response Format**
```json
{
  "prompt": "Generated response...",
  "model": "gemini",
  "processingTime": 1250,
  "fallbackUsed": true,
  "fallbackReason": "Primary model openrouter failed, used gemini as fallback"
}
```

## 📊 Model Comparison

| Model | Speed | Cost | Features | Best For |
|-------|-------|------|----------|----------|
| **OpenRouter** | Fast | Low | Multiple models | General use, cost-effective |
| **Gemini** | Medium | Free tier | Good reasoning | Creative tasks |
| **Groq** | Ultra-fast | Low | Fast inference | Real-time applications |

## 🛠️ Troubleshooting

### **No Models Available**
```bash
Error: No AI models are configured. Please check your API keys.
```

**Solutions:**
1. Check your `.env.local` file
2. Ensure API keys are valid
3. Restart your development server
4. Visit `/test-ai` for detailed diagnostics

### **Model Failing**
```bash
Error: Failed to generate response with [model]
```

**Solutions:**
1. Check API key validity
2. Verify account has credits
3. Check service status
4. The system will automatically try other models

### **Rate Limiting**
```bash
Error: Too many requests. Please try again later.
```

**Solutions:**
1. Wait a few minutes
2. Check your API usage limits
3. Consider upgrading your plan

## 🔍 Monitoring & Debugging

### **Console Logs**
The system provides detailed logging:
```
OpenRouter initialization: { hasKey: true, ... }
Trying fallback model: gemini
Fallback successful with gemini
```

### **API Status Endpoint**
```bash
GET /api/ai-status
```
Returns detailed model status and recommendations.

### **Test Page**
Visit `/test-ai` for interactive testing and diagnostics.

## 🚀 Production Deployment

### **Environment Variables**
Set these in your production environment:
```bash
OPENROUTER_API_KEY=your_production_key
GEMINI_API_KEY=your_production_key
GROQ_API_KEY=your_production_key
SITE_URL=https://yourdomain.com
```

### **Monitoring**
- Monitor API usage and costs
- Set up alerts for model failures
- Track fallback usage patterns

### **Security**
- Never commit API keys to version control
- Use environment variables
- Rotate keys regularly
- Monitor for unusual usage

## 📈 Best Practices

### **1. Multiple Models**
Configure at least 2 models for reliability:
```bash
OPENROUTER_API_KEY=your_key
GEMINI_API_KEY=your_key
```

### **2. Cost Optimization**
- Use OpenRouter for cost-effective access to multiple models
- Monitor usage with the status endpoint
- Set up usage alerts

### **3. Performance**
- Groq for ultra-fast responses
- OpenRouter for balanced performance/cost
- Gemini for creative tasks

### **4. Error Handling**
The system handles errors automatically, but you can:
- Monitor fallback usage
- Set up alerts for repeated failures
- Adjust model preferences based on performance

## 🎯 Example Usage

### **Frontend Integration**
```typescript
const generatePrompt = async (userInput: string) => {
  const response = await fetch('/api/generate-prompt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userInput,
      model: 'openrouter',
      tone: 'professional',
      role: 'developer',
      language: 'en'
    })
  });
  
  const data = await response.json();
  
  if (data.fallbackUsed) {
    console.log(`Used fallback: ${data.fallbackReason}`);
  }
  
  return data.prompt;
};
```

## 🔗 Resources

- [OpenRouter Documentation](https://openrouter.ai/docs/quickstart)
- [Google Gemini API](https://ai.google.dev/)
- [Groq Documentation](https://console.groq.com/docs)
- [Test your setup at `/test-ai`](http://localhost:3000/test-ai)

---

**Your Promptly application now has enterprise-grade AI reliability with automatic fallback! 🎉**
