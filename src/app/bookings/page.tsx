import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, User } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function BookingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
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
