import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/providers/auth-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Weda.lk - Sri Lankan Service Marketplace',
  description:
    'Connect with trusted service providers across Sri Lanka. Find verified professionals for all your needs.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            suppressHydrationWarning
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
