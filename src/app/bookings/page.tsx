'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from '@/i18n/routing'
import { useEffect } from 'react'

export const dynamic = 'force-dynamic'

import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, User } from 'lucide-react'

export default function BookingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

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

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">
              {session?.user?.role === 'PROVIDER' ? 'Service Bookings' : 'My Bookings'}
            </h1>
            <p className="text-muted-foreground">
              {session?.user?.role === 'PROVIDER'
                ? 'Manage your upcoming and completed services'
                : 'Track your service bookings and history'}
            </p>
          </div>

          {/* Empty State */}
          <Card>
            <CardContent className="text-muted-foreground py-12 text-center">
              <Calendar className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <h3 className="mb-2 text-lg font-medium">No Bookings Yet</h3>
              <p>
                {session?.user?.role === 'PROVIDER'
                  ? "You haven't received any bookings yet. Complete your profile verification to start receiving requests."
                  : "You haven't made any bookings yet. Start by searching for services you need."}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
