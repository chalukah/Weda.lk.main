import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
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
          <Button asChild variant="outline">
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
