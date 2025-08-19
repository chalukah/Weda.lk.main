import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ locale }) => {
  // Validate the locale and use it directly
  const validLocale = routing.locales.includes(locale as any) ? locale : routing.defaultLocale
  const messages = (await import(`../../messages/${validLocale}.json`)).default

  return {
    locale: validLocale as string,
    messages,
  }
})
