import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Skip all internal paths (_next), static assets, and API routes
    '/((?!_next|api|favicon.ico|favicon.png|icon.png|android-chrome-192x192.png|.*\\.jpg|.*\\.png|.*\\.svg).*)',
  ],
}
