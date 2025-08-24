import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/about",
    "/pricing", 
    "/docs",
    "/sign-in",
    "/sign-up",
    "/test-ai",
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/ai-status",
  ],
  
  // Routes that can be accessed while signed out, but also show user content when signed in
  ignoredRoutes: [
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/ai-status",
  ],
  
  // Optional: Customize the redirect behavior
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return Response.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
