// Temporary middleware configuration - will be enabled once Clerk is properly configured
export function middleware() {
  // This will be replaced with Clerk middleware once environment is set up
  return;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
