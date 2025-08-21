import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protect /admin paths: ensure `token` cookie is present.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value
    if (!token) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/connexion'
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
