'use client'

import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@/i18n/routing'
import NextLink from 'next/link'

export default function DemoPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Demo Page</CardTitle>
            </CardHeader>
            <CardContent className="py-12 text-center">
              <h3 className="mb-4 text-lg font-medium">Demo Not Available</h3>
              <p className="text-muted-foreground mb-6">
                The demo page has been disabled as this is now a live platform with real users and
                service providers.
              </p>
              <p className="text-muted-foreground mb-6 text-sm">
                To experience our platform, please create an account and browse real service
                providers in your area.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/search">
                  <Button>Find Services</Button>
                </Link>
                <Link href="/become-provider">
                  <Button variant="outline">Become a Provider</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
