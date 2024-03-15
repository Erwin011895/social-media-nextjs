import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isCookiesExist = !!request.cookies.get('user_token')

  const guestPages = [
    '/login',
    '/register'
  ]
  const isGuestPage = guestPages.some((page) => pathname.startsWith(page))

  if (!isCookiesExist && !isGuestPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isCookiesExist && isGuestPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
