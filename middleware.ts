import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const token = request.headers.get('authorization')?.split(' ')[1];

  // Paths that require authentication
  const authPaths = [
    '/api/products/create',
    '/api/products/update',
    '/api/products/delete',
    '/api/orders',
    '/api/user/profile',
  ];

  // Check if the current path requires authentication
  const requiresAuth = authPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (requiresAuth) {
    if (!token) {
      return NextResponse.json(
        { error: 'Token tidak ditemukan' },
        { status: 401 }
      );
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET!);
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('user', JSON.stringify(decoded));

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { error: 'Token tidak valid' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/api/products/:path*',
    '/api/orders/:path*',
    '/api/user/:path*',
  ],
};