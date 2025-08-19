import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import '../globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { Toaster } from 'sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Weda.lk - Sri Lankan Service Marketplace',
  description:
    'Connect with trusted service providers across Sri Lanka. Find verified professionals for all your needs.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/android-chrome-192x192.png',
      },
    ],
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale and load messages
  const supportedLocales = ['en', 'si']
  const validLocale = supportedLocales.includes(locale) ? locale : 'en'

  let messages
  try {
    messages = (await import(`../../../messages/${validLocale}.json`)).default
  } catch (error) {
    // Fallback to English if locale messages not found
    messages = (await import(`../../../messages/en.json`)).default
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster richColors position="top-right" />
            </ThemeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
