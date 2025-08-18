import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Weda.lk - Sri Lankan Service Marketplace',
  description:
    'Connect with trusted service providers across Sri Lanka. Find verified professionals for all your needs.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
