import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - login page
    '/((?!api/auth|_next/static|_next/image|favicon.ico|login).*)',
  ],
};

export async function middleware(request: NextRequest) {
  // Check if the request is for the admin section
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Get the session cookie
    const session = request.cookies.get('admin-session')?.value;
    
    // If no session, redirect to login with the current URL as the 'from' parameter
    // Temporarily disable admin page by redirecting to homepage
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}
