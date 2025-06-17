import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const allowedIps = ['178.208.114.162'];

export function middleware(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const visitorIp = forwardedFor ? forwardedFor.split(',')[0].trim() : null;

  // TEMP: Return IP for debugging
  if (!visitorIp || !allowedIps.includes(visitorIp)) {
    return new NextResponse(`Access Denied. Your IP: ${visitorIp}`, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
