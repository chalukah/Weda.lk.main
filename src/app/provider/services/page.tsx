'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from '@/i18n/routing'
import { useEffect } from 'react'

export const dynamic = 'force-dynamic'

import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Briefcase, Plus, Settings, Eye } from 'lucide-react'

export default function ProviderServicesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && session?.user?.role === 'CUSTOMER') {
      router.push('/dashboard')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <main className="pt-16">
          <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <div>Loading...</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (status === 'unauthenticated' || session?.user?.role === 'CUSTOMER') {
    return null
  }

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">Manage Services</h1>
              <p className="text-muted-foreground">Control your service offerings and pricing</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>

          {/* Service Status */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Profile Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Pending Verification</Badge>
                </div>
                <p className="text-muted-foreground mt-2 text-xs">
                  Complete verification to start receiving bookings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-muted-foreground text-xs">Services currently offered</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-muted-foreground text-xs">Bookings received</p>
              </CardContent>
            </Card>
          </div>

          {/* Empty State */}
          <Card>
            <CardContent className="text-muted-foreground py-12 text-center">
              <Briefcase className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <h3 className="mb-2 text-lg font-medium">No Services Yet</h3>
              <p className="mb-4">
                Start by adding the services you offer. You can set pricing, availability, and
                service areas.
              </p>
              <div className="space-y-2">
                <Button className="w-full max-w-xs">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Service
                </Button>
                <p className="text-muted-foreground text-xs">
                  Complete your profile verification to start receiving bookings
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
