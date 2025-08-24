# 🚀 Promptly Deployment Guide

## Prerequisites

Before deploying, you need to set up the following services and get their API keys:

### 1. **AI Services** (Choose at least one)
- **OpenRouter** (Recommended): https://openrouter.ai/keys
- **Google Gemini**: https://makersuite.google.com/app/apikey  
- **Groq**: https://console.groq.com/keys

### 2. **Database** (Required)
- **Supabase**: https://supabase.com/dashboard

### 3. **Authentication** (Required)
- **Clerk**: https://dashboard.clerk.com/

## Step 1: Environment Setup

Create a `.env.local` file in your project root with the following variables:

```bash
# AI Service API Keys
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
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
```

## Step 2: Service Configuration

### Supabase Setup
1. Create a new project at https://supabase.com/dashboard
2. Go to Settings > API to get your URL and keys
3. Create the following tables in your database:

```sql
-- Users table (if not using Clerk's user management)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prompt history table
CREATE TABLE IF NOT EXISTS prompt_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  model TEXT NOT NULL,
  tone TEXT NOT NULL,
  role TEXT NOT NULL,
  agent_mode BOOLEAN DEFAULT FALSE,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Clerk Setup
1. Create a new application at https://dashboard.clerk.com/
2. Configure your authentication settings
3. Set up webhooks for user events
4. Add your domain to allowed origins

## Step 3: Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Test your setup:
- Visit http://localhost:3000
- Go to http://localhost:3000/test-ai to verify AI services
- Test authentication flow

## Step 4: Production Deployment

### Option A: Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Option B: Netlify

1. Push your code to GitHub
2. Connect to Netlify
3. Add environment variables
4. Deploy

### Option C: Self-hosted

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## Step 5: Post-Deployment

1. **Update SITE_URL** in environment variables to your production domain
2. **Configure webhooks** in Clerk dashboard
3. **Set up monitoring** for API usage and errors
4. **Test all features** in production environment

## Troubleshooting

### Common Issues:

1. **"No AI models are configured"**
   - Check that at least one AI API key is set
   - Verify API keys are valid and have credits

2. **Authentication errors**
   - Verify Clerk configuration
   - Check domain settings in Clerk dashboard

3. **Database connection issues**
   - Verify Supabase credentials
   - Check database permissions

4. **Build errors**
   - Run `npm run lint` to check for issues
   - Fix any TypeScript errors

## Security Checklist

- [ ] Environment variables are not committed to git
- [ ] API keys have appropriate rate limits
- [ ] Webhook secrets are properly configured
- [ ] Database has proper access controls
- [ ] HTTPS is enabled in production

## Performance Optimization

- [ ] Enable Next.js caching
- [ ] Configure CDN for static assets
- [ ] Monitor API response times
- [ ] Set up error tracking (Sentry, etc.)

## Support

If you encounter issues:
1. Check the `/test-ai` page for diagnostics
2. Review browser console for errors
3. Check server logs
4. Verify all environment variables are set correctly
