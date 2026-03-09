import createMiddleware from 'next-intl/middleware';
import { routing } from './app/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(de|zh|en)/:path*']
};
