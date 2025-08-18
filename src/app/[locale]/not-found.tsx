'use client'

import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'
import { useRouter } from '@/i18n/routing'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
        <div className="px-4 text-center">
          <div className="mb-8">
            <div className="mb-4 text-6xl font-bold text-green-800">404</div>
            <h1 className="mb-2 text-2xl font-bold">Page Not Found</h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild variant="default">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-background flex min-h-screen items-center justify-center"
      suppressHydrationWarning
    >
      <div className="px-4 text-center">
        <div className="mb-8">
          <div className="text-primary mb-4 text-6xl font-bold">404</div>
          <h1 className="mb-2 text-2xl font-bold">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild variant="default">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
