import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ locale }) => {
  // Use default locale as fallback since the middleware locale passing isn't working properly
  // The actual locale-specific messages are loaded in the layout component
  const finalLocale = routing.defaultLocale
  const messages = (await import(`../../messages/${finalLocale}.json`)).default

  return {
    locale: finalLocale,
    messages,
  }
})
