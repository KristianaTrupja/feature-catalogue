import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED_IPS = ['178.208.114.162'];

export function middleware(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '0.0.0.0';

  if (!ALLOWED_IPS.includes(ip)) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  return NextResponse.next();
}

// Optional: skip static files and API routes
export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
};
