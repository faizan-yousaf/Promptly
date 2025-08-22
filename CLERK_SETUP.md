# Clerk Authentication Setup

This guide will help you set up Clerk authentication for your Promptly application.

## Prerequisites

1. A Clerk account (sign up at [clerk.com](https://clerk.com))
2. A Next.js application (already set up)

## Setup Steps

### 1. Create a Clerk Application

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Click "Add Application"
3. Choose "Next.js" as your framework
4. Give your application a name (e.g., "Promptly")
5. Select your preferred authentication methods (Email, Google, GitHub, etc.)

### 2. Get Your API Keys

1. In your Clerk Dashboard, go to "API Keys"
2. Copy your **Publishable Key** and **Secret Key**

### 3. Configure Environment Variables

Create a `.env.local` file in your project root and add the following:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### 4. Configure Clerk Dashboard Settings

1. Go to "User & Authentication" → "Email, Phone, Username"
2. Configure your preferred sign-up methods
3. Go to "Paths" and set:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in URL: `/dashboard`
   - After sign-up URL: `/onboarding`

### 5. Test Your Setup

1. Run your development server: `npm run dev`
2. Navigate to `/sign-up` to test the sign-up flow
3. Navigate to `/sign-in` to test the sign-in flow
4. Try accessing `/dashboard` without authentication (should redirect to sign-in)

## Features Implemented

- ✅ Protected routes with middleware
- ✅ Sign-in and sign-up pages with custom styling
- ✅ User authentication state management
- ✅ Navigation with authentication-aware UI
- ✅ User profile component
- ✅ Automatic redirects for unauthenticated users
- ✅ Loading states during authentication checks

## Protected Routes

The following routes require authentication:
- `/dashboard`
- `/onboarding`

The following routes are public:
- `/`
- `/about`
- `/pricing`
- `/docs`
- `/sign-in`
- `/sign-up`

## Customization

### Styling

The authentication components use custom styling that matches your app's design. You can modify the appearance in:
- `src/app/sign-in/[[...sign-in]]/page.tsx`
- `src/app/sign-up/[[...sign-up]]/page.tsx`

### User Profile

The user profile component is located at `src/components/UserProfile.tsx` and can be customized to show additional user information or actions.

## Troubleshooting

### Common Issues

1. **"Invalid API Key" error**: Make sure your environment variables are correctly set
2. **Redirect loops**: Check that your Clerk dashboard paths match your environment variables
3. **Styling issues**: Ensure Tailwind CSS is properly configured

### Getting Help

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Discord](https://discord.gg/clerk)
- [Clerk GitHub](https://github.com/clerkinc/clerk-nextjs)

## Security Notes

- Never commit your `.env.local` file to version control
- Use environment variables for all sensitive configuration
- Regularly rotate your API keys
- Monitor your Clerk dashboard for any suspicious activity
