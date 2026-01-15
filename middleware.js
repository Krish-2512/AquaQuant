// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     const token = req.nextauth.token;
//     const pathname = req.nextUrl.pathname;

//     // If no token at all, withAuth handles redirect to signIn page automatically
    
//     // Redirect logic for Onboarding
//     if (token && token.isOnboarded === false && pathname !== "/onboarding") {
//       return NextResponse.redirect(new URL("/onboarding", req.url));
//     }
    
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       // If this returns false, it redirects to the signIn page defined below
//       authorized: ({ token }) => !!token,
//     },
//     pages: {
//       signIn: "/auth/signin",
//     },
//   }
// );

// export const config = { 
//   // ONLY protect these routes. This prevents the middleware from 
//   // touching your landing page (/) and causing loops.
//   matcher: ["/dashboard/:path*", "/onboarding", "/problems/:path*"] 
// };




import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // 1. If logged in but NOT onboarded, and NOT on the onboarding page
    // Redirect to /onboarding
    if (token && token.isOnboarded === false && pathname !== "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // 2. If logged in AND onboarded, but trying to access /onboarding
    // Redirect to /dashboard (prevents users from re-filling the form)
    if (token && token.isOnboarded === true && pathname === "/onboarding") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Basic check: if no token exists, withAuth redirects to /auth/signin
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export const config = { 
  /* MATCHING STRATEGY: 
    Only run middleware on protected routes. 
    Exclude public assets, login page, and the landing page (/).
  */
  matcher: [
    "/dashboard/:path*", 
    "/onboarding", 
    "/problems/:path*",
    "/profile/:path*"
  ] 
};