import createMiddleware from 'next-intl/middleware';

import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { routing } from './i18n/routing';

export async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware(routing);
  const res = handleI18nRouting(request);

  // update user's auth session
  return await updateSession(request, res);
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/',
    '/(kz|en)/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
